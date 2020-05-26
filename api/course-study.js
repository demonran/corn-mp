import http from '@/common/vmeitime-http/interface'

export default {

	// 我的学习列表
	list() {
		interceptor(http)
	    return http.get('study/my')
	},
	// 根据课程ID查询
	queryById(id) {
		interceptor(http)
	    return http.get(`study/${id}`)
	}
}

function interceptor(http) {
	//设置请求结束后拦截器
	http.interceptor.response = (response) => {
		//判断返回状态 执行相应操作
		return response.data;
	}
}
