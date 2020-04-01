import Vue from 'vue'
import App from './App'
import api from '@/common/vmeitime-http/'


Vue.config.productionTip = false

App.mpType = 'app'

Vue.prototype.$api = api
Vue.prototype.getApp = getApp();



const app = new Vue({
    ...App,
	//挂载
})
app.$mount() 


