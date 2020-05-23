import http from '../common/vmeitime-http/interface'



export default {

	listChildren() {
		interceptor(http)
		return http.get('user/children')
	},

	addChildren(data) {
		interceptor(http)
		return http.post('user/children', data)
	},

	updateChildren(data) {
		interceptor(http)
		return http.put(`user/children/${data.id}`, data)
	},
	getChildren(id) {
		interceptor(http)
		return http.get(`user/children/${id}`)
	},

}

function interceptor(http) {
	//设置请求结束后拦截器
	http.interceptor.response = (response) => {
		//判断返回状态 执行相应操作
		return response.data;
	}
}
