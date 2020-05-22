import http from '../common/vmeitime-http/interface'



export default {

	listChildren() {
		this.interceptor(http)
		return http.get('user/children')
	},

	addChildren(data) {
		this.interceptor(http)
		return http.post('user/children', data)
	},

	updateChildren(data) {
		this.interceptor(http)
		return http.put(`user/children/${data.id}`, data)
	},
	getChildren(id) {
		this.interceptor(http)
		return http.get(`user/children/${id}`)
	},
	interceptor(http) {
		//设置请求结束后拦截器
		http.interceptor.response = (response) => {
			//判断返回状态 执行相应操作
			return response.data;
		}
	}
}
