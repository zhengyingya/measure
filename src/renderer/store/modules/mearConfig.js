import nedbManage from '../../../database/nedb'
const state = {
  configData: []
}

const actions = {
  getConfigData (context) {
    nedbManage.find({})
      .then((data) => {
        context.commit('MEARCONFIG_GET_CONFIG_DATA', { data })
      })
  },
  updateConfigData({ commit, dispatch }, { id, name, tableData }) {
    console.log(id, tableData)
    return nedbManage.update({
        _id: id
      }, {
          $set: {
            name: name,
            data: tableData,
            date: Number(new Date)
          }
        })
        .then((data) => {
          dispatch('getConfigData')
          return data
        })
  },
  insertConfigData({ commit, dispatch }, { name, tableData }) {
    console.log(tableData)
    return nedbManage.insert({
      name: name,
      data: tableData,
      date: Number(new Date)
    })
      .then((data) => {
        dispatch('getConfigData')
        return data
      })
  },
  deleteConfigData({ dispatch }, { id }) {
    return nedbManage.remove({
      _id: id
    })
      .then((data) => {
        dispatch('getConfigData')
        return data
      })
  }
}

const mutations = {
  MEARCONFIG_GET_CONFIG_DATA(state, { data }) {
    state.configData = data
  }
}

export default {
  state,
  mutations,
  actions
}