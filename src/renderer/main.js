import Vue from 'vue'
import axios from 'axios'

import App from './App'
import router from './router'
import store from './store'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import './styles/global.scss'
import '../database/oracle'
import '../common/serialport'

console.log('open', window.serialPort.open('/dev/tty.usbserial'))

// window.serialPort.send('13\r\n', (res) => {
//   let num = res.split(' ')[1].replace('K', '') + res.split(' ')[2].replace('K', '')
//   num = (Number(num.slice(0, 12) + '.' + num.slice(-4)) * 2).toFixed(4)
//   console.log('-----', res, num)
// })

if (!process.env.IS_WEB) Vue.use(require('vue-electron'))
Vue.http = Vue.prototype.$http = axios
Vue.config.productionTip = false

Vue.use(ElementUI)

/* eslint-disable no-new */
new Vue({
  components: { App },
  router,
  store,
  template: '<App/>'
}).$mount('#app')
