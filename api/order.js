import http from '../common/vmeitime-http/interface'

export default {

	payment(orderId) {
		interceptor(http)
		return http.post(`wx/payment?orderId=${orderId}`)
	},
	
	getById(orderId) {
		interceptor(http)
		return http.get(`orders/${orderId}`)
	},
	
	// 课程报名
	createOrder(data){
		interceptor(http)
	    return http.post('orders',data)
	},
	// 我的报名
	 myOrders() {
		interceptor(http)
	    return http.get('orders')
	}

}

function interceptor(http) {
	//设置请求结束后拦截器
	http.interceptor.response = (response) => {
		//判断返回状态 执行相应操作
		return response.data;
	}
}
