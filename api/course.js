import http from '@/common/vmeitime-http/interface'

export default {

	// 线下课程详情
	detail(id) {
		interceptor(http)
	    return http.get('offline-course/'+ id)
	}
}

function interceptor(http) {
	//设置请求结束后拦截器
	http.interceptor.response = (response) => {
		//判断返回状态 执行相应操作
		return response.data;
	}
}
