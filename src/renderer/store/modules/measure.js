
const state = {
  temp: '',                // 温度
  currentStep: 0,           //  当前测量处在哪个步骤
  standard: '',
  valueCenter: '',
  valueA: '',
  valueB: '',
  valueC: '',
  valueD: ''
}

const actions = {
  changeTemp (context, { temp }) {
    context.commit('MEASURE_CHANGE_TEMP', { temp })
  },
  nextStep ({ commit }) {
    commit('MEASURE_NEXT_STEP')
  },
  getValue ({ commit }) {
    // window.serialPort.write('S\r\n', function (err) {
    //   if (err) {
    //     console.log(err);
    //   }
    // })
    commit('MEASURE_NEXT_GET_VALUE', { value: 100 })
  }
}

const mutations = {
  MEASURE_CHANGE_TEMP (state, { temp }) {
    state.temp = temp
  },
  MEASURE_NEXT_STEP (state) {
    state.currentStep ++
  },
  MEASURE_NEXT_GET_VALUE (state, { value }) {
    switch(state.currentStep) {
      case 1:
        state.standard = value
        break
      case 2:
        state.valueCenter = value
        break
      case 3:
        state.valueA = value
        break
      case 4:
        state.valueB = value
        break
      case 5:
        state.valueC = value
        break
      case 6:
        state.valueD = value
        break
    } 
  }
}

export default {
  state,
  mutations,
  actions
}