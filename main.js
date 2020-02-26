import Vue from 'vue'
import App from './App'
import api from '@/common/vmeitime-http/'
/* import store from './store/index.js'

//把vuex定义成全局组件
Vue.prototype.$store = store */
Vue.config.productionTip = false

App.mpType = 'app'

Vue.prototype.$api = api

const app = new Vue({
    ...App,
	//挂载
	//store
})
app.$mount() 


