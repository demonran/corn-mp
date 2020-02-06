import Vue from 'vue'
import App from './App'
import api from '@/common/vmeitime-http/'

Vue.config.productionTip = false

App.mpType = 'app'

Vue.prototype.$api = api

const app = new Vue({
    ...App
})
app.$mount()
