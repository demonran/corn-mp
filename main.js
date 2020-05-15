import Vue from 'vue'
import App from './App'
import api from '@/common/vmeitime-http/'
import store from './store/index.js'


Vue.config.productionTip = false

App.mpType = 'app'

Vue.prototype.$api = api
Vue.prototype.getApp = getApp();



const app = new Vue({
    ...App,
	//挂载
	store
})
app.$mount() 


