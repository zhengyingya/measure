import oracleManage from "../../../database/oracle";

const keys = [
  "certCode",
  "typeRule",
  "fantoryCode",
  "makeUnit",
  "nodeStatus",
  "clientName",
  "entrustDate",
  "sampleName"
];
const state = {
  sampleHead: [], //  表头
  sampleList: [] //  表数据内容
};

const actions = {
  getSampleList({ commit }) {
    oracleManage
      .execute(
        "SELECT \
      CERT_CODE, \
      TYPE_RULE, \
      FANTORY_CODE, \
      MAKE_UNIT,\
      NODE_STATUS,\
      CLIENTNAME,\
      ENTRUST_DATE,\
      SAMPLE_NAME from EMC.TASK_SAMPLES INNER JOIN EMC.TASK_ORDER\
      ON TASK_SAMPLES.TASK_SAMPLE_ORDER = TASK_ORDER.ID\
      where SAMPLE_NAME = '量块' and NODE_STATUS='TESTSAMPLE'"
      )
      .then(result => {
        console.log(result);
        commit("LIST_GET_SAMPLE_LIST", {
          sampleHead: result.metaData,
          sampleList: result.rows
        });
      });
  }
};

const mutations = {
  LIST_GET_SAMPLE_LIST(state, { sampleHead, sampleList }) {
    state.sampleHead = sampleHead;
    state.sampleList = sampleList.map(array => {
      let _map = {};
      for (let i = 0, len = array.length; i < len; i++) {
        _map[keys[i]] = array[i];
      }
      return _map;
    });
    if (sampleList.length === 0) {
      state.sampleList = [
        {
          certCode: "0001",
          typeRule: "",
          fantoryCode: "",
          makeUnit: "",
          nodeStatus: "",
          clientName: "温州计量院（测试）",
          entrustDate: new Date(),
          sampleName: "测试"
        }
      ];
    }
    console.log(state.sampleList);
  }
};

export default {
  state,
  mutations,
  actions
};
