
const state = {
  temp: '',                 // 温度
  isRemear: false,          // 是否在进行重测，重测指点击表格中第一列按钮进行的重测
  currentStep: 0,           // 当前测量处在哪个步骤
  historyBlock: 0,          // 记录历史测量了第几块，用在重测了一块后，继续还原之前的测量流程
  currentMearBlock: 0,      // 当前测量量块组中的第几块，以数组下标方式计算，所以从0开始
  currentValue: 100,        // 当前获取的标准器测量值
  standard: '',
  valueCenter: '',
  valueA: '',
  valueB: '',
  valueC: '',
  valueD: '',
  tableData: []
}

function init (state) {
  state.currentStep = 0
  state.valueCenter = ''
  state.valueA = ''
  state.valueB = ''
  state.valueC = ''
  state.valueD = ''
}
const actions = {
  changeTemp (context, { temp }) {
    context.commit('MEASURE_CHANGE_TEMP', { temp })
  },
  nextStep ({ commit }) {
    commit('MEASURE_NEXT_STEP')
  },
  intervalValue ({ commit }) {
    window.serialPort.send('13\r\n', (res) => {
      console.log('-----', res)
      // let num = res.split(' ')[1].replace('K', '') + res.split(' ')[2].replace('K', '')
      // num = (Number(num.slice(0, 12) + '.' + num.slice(-4)) * 2).toFixed(4)
      // commit('MEASURE_INTERVAL_VALUE', { value: num })
    })
  },
  getValue ({ commit }) {
    // window.serialPort.send('13\r\n', (res) => {
    //   console.log('-----', res)
    //   let num = res.split(' ')[1].replace('K', '') + res.split(' ')[2].replace('K', '')
    //   num = (Number(num.slice(0, 12) + '.' + num.slice(-4)) * 2).toFixed(4)
    //   commit('MEASURE_NEXT_GET_VALUE', { value: num })
    // })
    commit('MEASURE_NEXT_GET_VALUE', { value: 100 })
  },
  setRemearFlag ({ commit }) {
    commit('MEARSURE_SET_REMEAR_FLAG')
  },
  remear ({ commit }, { blockIndex }) {
    commit('MEASURE_REMEAR', { blockIndex })
  },
  nextBlock ({ commit }) {
    commit('MEASURE_NEXT_BLOCK')
  },
  initTableData ({ commit }, { configData }) {
    commit('MEASURE_INIT_TABLE_DATA', { configData })
  },
  setTableData ({ commit }) {
    commit('MEASURE_SET_TABLE_DATA')
  }
}

const mutations = {
  MEASURE_CHANGE_TEMP (state, { temp }) {
    state.temp = temp
  },
  MEARSURE_SET_REMEAR_FLAG (state) {
    state.isRemear = true
  },
  MEASURE_NEXT_STEP (state) {
    state.currentStep ++
  },
  MEASURE_INTERVAL_VALUE (state, { value }) {
    state.currentValue = value
  },
  MEASURE_NEXT_GET_VALUE (state, { value }) {
    switch(state.currentStep) {
      case 1:
        state.standard = state.currentValue
        break
      case 2:
        state.valueCenter = state.currentValue
        break
      case 3:
        state.valueA = state.currentValue
        break
      case 4:
        state.valueB = state.currentValue
        break
      case 5:
        state.valueC = state.currentValue
        break
      case 6:
        state.valueD = state.currentValue
        break
    } 
  },
  MEASURE_NEXT_BLOCK(state) {
    init(state)
    if (state.isRemear) {
      state.isRemear = false
    } else if (state.historyBlock < state.tableData.length - 1) {
      state.historyBlock++
    }
    state.currentMearBlock = state.historyBlock
  },
  MEASURE_REMEAR(state, { blockIndex }) {
    init(state)
    state.currentMearBlock = blockIndex
  },
  MEASURE_INIT_TABLE_DATA (state, { configData }) {
    state.tableData = configData.data.map((item) => {
      return {
        size: item.size,
        fix: item.fix
      }
    })
  },
  MEASURE_SET_TABLE_DATA(state) {
    const currentMearBlock = state.currentMearBlock
    const detaLength = Math.max(state.valueCenter, state.valueA, state.valueB, state.valueC, state.valueD) 
      - Math.min(state.valueCenter, state.valueA, state.valueB, state.valueC, state.valueD)
    const offsetLength = state.valueCenter + Number(state.tableData[currentMearBlock].fix)
    const grade = '5等'
    state.tableData[currentMearBlock] = {
      size: state.tableData[currentMearBlock].size,
      fix: state.tableData[currentMearBlock].fix,
      upface: 'vh',
      downface: 'vh',
      valueCenter: state.valueCenter,
      valueA: state.valueA,
      valueB: state.valueB,
      valueC: state.valueC,
      valueD: state.valueD,
      temp: state.temp,
      detaLength,
      offsetLength,
      grade
    }
    state.tableData = state.tableData.concat([])
  }
}

export default {
  state,
  mutations,
  actions
}