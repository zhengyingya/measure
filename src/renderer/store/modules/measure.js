const xlsx = require("node-xlsx");
import comNedb from "../../../database/comNedb";

let gradeList;
let levelList;
let gradeInterval;
let levelInterval;
comNedb.find({ type: "filePath" }).then(res => {
  if (res.length !== 0) {
    gradeList = xlsx.parse(res[0].pathName + "/结论依据/等依据.xlsx");
    levelList = xlsx.parse(res[0].pathName + "/结论依据/级依据.xlsx");

    gradeInterval = gradeList[0].data.map(item => {
      return item[0];
    });
    gradeInterval = gradeInterval.slice(2, gradeInterval.length + 1);
    gradeInterval = gradeInterval.map(item => {
      return Number(item.split(",")[1].replace("]", ""));
    });

    levelInterval = levelList[0].data.map(item => {
      return item[0];
    });
    levelInterval = levelInterval.slice(2, levelInterval.length + 1);
    levelInterval = levelInterval.map(item => {
      return Number(item.split(",")[1].replace("]", ""));
    });

    console.log(gradeList);
  }
});

const state = {
  temp: "", // 温度
  isRemear: false, // 是否在进行重测，重测指点击表格中第一列按钮进行的重测
  detaValue: 0, // 执行清零后的差值，后续读取的值都要与此差值相加后用于显示
  currentStep: 0, // 当前测量处在哪个步骤
  historyBlock: 0, // 记录历史测量了第几块，用在重测了一块后，继续还原之前的测量流程
  currentMearBlock: 0, // 当前测量量块组中的第几块，以数组下标方式计算，所以从0开始
  currentValue: 100, // 当前获取的标准器测量值
  standard: "",
  valueCenter: "",
  valueA: "",
  valueB: "",
  valueC: "",
  valueD: "",
  tableData: [],
  tableDataCopy: []
};

// 清空state中所有的数据，还原至初始状态
function clearAll(state) {
  init(state);
  state.temp = "";
  state.isRemear = false;
  state.detaValue = 0;
  state.currentStep = 0;
  state.historyBlock = 0;
  state.currentMearBlock = 0;
  state.currentValue = 100;
  state.standard = "";
  state.tableData = [];
}

function init(state) {
  state.currentStep = 0;
  state.valueCenter = "";
  state.valueA = "";
  state.valueB = "";
  state.valueC = "";
  state.valueD = "";
}
const actions = {
  changeTemp(context, { temp }) {
    context.commit("MEASURE_CHANGE_TEMP", { temp });
  },
  nextStep({ commit }) {
    commit("MEASURE_NEXT_STEP");
  },
  intervalValue({ commit }) {
    window.serialPort.send("13\r\n", res => {
      console.log("-----", res);
      let symbol = res.slice(11, 12);
      res = res.slice(12, res.length);
      // let num = res.split(' ')[0].replace('K', '') + res.split(' ')[1].replace('K', '')
      let num = res.replace("K", "");
      // console.log('-----', num, symbol)
      num =
        (Number(symbol + num.slice(0, 4) + "." + num.slice(-4)) * 2).toFixed(
          4
        ) * 1000;
      commit("MEASURE_INTERVAL_VALUE", { value: num });
    });
  },
  getValue({ commit }) {
    // window.serialPort.send('13\r\n', (res) => {
    //   console.log('-----', res)
    //   res = res.slice(0, res.length)
    //   let num = res.split(' ')[0].replace('K', '') + res.split(' ')[1].replace('K', '')
    //   num = (Number(num.slice(0, 12) + '.' + num.slice(-4)) * 2).toFixed(4)
    //   commit('MEASURE_NEXT_GET_VALUE', { value: num })
    // })
    commit("MEASURE_NEXT_GET_VALUE", { value: 100 });
  },
  zero({ commit }) {
    commit("MEASURE_NEXT_ZERO");
  },
  setRemearFlag({ commit }) {
    commit("MEARSURE_SET_REMEAR_FLAG");
  },
  remear({ commit }, { blockIndex }) {
    commit("MEASURE_REMEAR", { blockIndex });
  },
  nextBlock({ commit }) {
    commit("MEASURE_NEXT_BLOCK");
  },
  initTableData({ commit }, { configData }) {
    commit("MEASURE_INIT_TABLE_DATA", { configData });
  },
  setTableData({ commit }) {
    commit("MEASURE_SET_TABLE_DATA");
  },
  setNoMearTableData({ commit }) {
    commit("MEASURE_SET_NO_MEAR_TABLE_DATA");
  },
  clearAll({ commit }) {
    commit("MEASURE_CLEAR_ALL");
  },
  setTableDataScrap({ commit }, { key, index, value }) {
    commit("MEASURE_SET_TABLE_DATA_SCRAP", { key, index, value });
  },
  setTableDataRestore({ commit }, { index }) {
    commit("MEASURE_SET_TABLE_DATA_RESTORE", { index });
  }
};

const mutations = {
  MEASURE_CHANGE_TEMP(state, { temp }) {
    state.temp = temp;
  },
  MEARSURE_SET_REMEAR_FLAG(state) {
    state.isRemear = true;
  },
  MEASURE_NEXT_STEP(state) {
    state.currentStep++;
  },
  MEASURE_NEXT_ZERO(state) {
    state.detaValue = Number(state.detaValue) - Number(state.currentValue);
  },
  MEASURE_INTERVAL_VALUE(state, { value }) {
    // console.log(value, state.detaValue)
    state.currentValue = (Number(value) + Number(state.detaValue)).toFixed(1);
  },
  MEASURE_NEXT_GET_VALUE(state, { value }) {
    switch (state.currentStep) {
      case 1:
        state.standard = state.currentValue;
        break;
      case 2:
        state.valueCenter = state.currentValue;
        break;
      case 3:
        state.valueA = state.currentValue;
        break;
      case 4:
        state.valueB = state.currentValue;
        break;
      case 5:
        state.valueC = state.currentValue;
        break;
      case 6:
        state.valueD = state.currentValue;
        break;
    }
  },
  MEASURE_NEXT_BLOCK(state) {
    init(state);
    if (state.isRemear) {
      state.isRemear = false;
    } else if (state.historyBlock < state.tableData.length - 1) {
      state.historyBlock++;
    }
    state.currentMearBlock = state.historyBlock;
  },
  MEASURE_REMEAR(state, { blockIndex }) {
    init(state);
    state.currentMearBlock = blockIndex;
  },
  MEASURE_INIT_TABLE_DATA(state, { configData }) {
    state.tableData = configData.data.map(item => {
      return {
        size: item.size,
        fix: item.fix
      };
    });
  },
  MEASURE_SET_TABLE_DATA(state) {
    const currentMearBlock = state.currentMearBlock;
    const detaLength = (
      Math.max(
        state.valueCenter,
        state.valueA,
        state.valueB,
        state.valueC,
        state.valueD
      ) -
      Math.min(
        state.valueCenter,
        state.valueA,
        state.valueB,
        state.valueC,
        state.valueD
      )
    ).toFixed(1);
    const offsetLength = (
      Number(state.valueCenter) + Number(state.tableData[currentMearBlock].fix)
    ).toFixed(1);
    const size = state.tableData[currentMearBlock].size;

    let grade = "";
    let level = "";

    if (detaLength > 4 + 4 * 0.0006 * size) {
      let grade = "不合格";
      let level = "/";
    } else {
      for (let i = 0, len = gradeInterval.length; i < len; i++) {
        if (Number(size) > gradeInterval[i]) {
        } else {
          let _v = gradeList[0].data[i + 2];
          if (detaLength <= Number(_v[10])) {
            grade = "5等";
          } else {
            grade = "不合格";
          }
          break;
        }
      }

      for (let i = 0, len = levelInterval.length; i < len; i++) {
        if (Number(size) > levelInterval[i]) {
        } else {
          let _v = levelList[0].data[i + 2];
          for (let j = 1; j < _v.length; j += 2) {
            console.log("-------", levelList[0].data[0], _v[j + 1], _v[j], j);
            if (
              Math.abs(offsetLength) <= Number(_v[j]) &&
              detaLength <= Number(_v[j + 1])
            ) {
              level = levelList[0].data[0][j];
              break;
            }
          }
          break;
        }
      }
    }
    state.tableData[currentMearBlock] = {
      size: size,
      fix: state.tableData[currentMearBlock].fix,
      upface: "vh",
      downface: "vh",
      valueCenter: state.valueCenter,
      valueA: state.valueA,
      valueB: state.valueB,
      valueC: state.valueC,
      valueD: state.valueD,
      temp: state.temp,
      detaLength,
      offsetLength: grade === "不合格" ? "不合格" : offsetLength,
      grade,
      level
    };
    state.tableDataCopy[currentMearBlock] = state.tableData[currentMearBlock];
    state.tableData = [].concat(JSON.parse(JSON.stringify(state.tableData)));
    state.tableDataCopy = [].concat(
      JSON.parse(JSON.stringify(state.tableDataCopy))
    );
  },
  MEASURE_SET_NO_MEAR_TABLE_DATA(state) {
    const currentMearBlock = state.currentMearBlock;
    state.tableData[currentMearBlock] = {
      size: state.tableData[currentMearBlock].size,
      fix: "/",
      upface: "/",
      downface: "/",
      valueCenter: "/",
      valueA: "/",
      valueB: "/",
      valueC: "/",
      valueD: "/",
      temp: "/",
      detaLength: "/",
      offsetLength: "/",
      grade: "/",
      level: "/"
    };
  },
  MEASURE_CLEAR_ALL(state) {
    clearAll(state);
  },
  MEASURE_SET_TABLE_DATA_SCRAP(state, { index, key, value }) {
    const _face = {
      [key]: value
    };
    state.tableData[index] = {
      size: state.tableData[index].size,
      fix: "/",
      upface: state.tableData[index].upface,
      downface: state.tableData[index].downface,
      valueCenter: "/",
      valueA: "/",
      valueB: "/",
      valueC: "/",
      valueD: "/",
      temp: "/",
      detaLength: "/",
      offsetLength: "不合格",
      grade: "/",
      level: "/",
      ..._face
    };
    state.tableData = [].concat(JSON.parse(JSON.stringify(state.tableData)));
    // console.log('-------------', state.tableData[index], state.tableDataCopy[index])
  },
  MEASURE_SET_TABLE_DATA_RESTORE(state, { index }) {
    state.tableData[index] = state.tableDataCopy[index];
    state.tableData = [].concat(JSON.parse(JSON.stringify(state.tableData)));
  }
};

export default {
  state,
  mutations,
  actions
};
