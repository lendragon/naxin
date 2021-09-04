import Vue from 'vue'
import App from './App.vue'
import {aa} from './globalV'
import {studentData} from './globalV'

Vue.config.productionTip = false
Vue.prototype.$aa = aa;
Vue.prototype.$studentData = studentData
new Vue({
  render: h => h(App),
}).$mount('#app')
