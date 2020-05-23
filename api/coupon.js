import http from '../common/vmeitime-http/interface'

export default {

	fetchMyCoupon() {
		interceptor(http)
		return http.get('coupon/my')
	},

	fetchCouponByIds(userId, ids) {
		interceptor(http)
		return http.get('coupon/list', {
			userId: userId,
			couponIds: ids
		});
	},

	receiveCoupon(mobile, couponIds, sharedUserId) {
		interceptor(http)
		return http.post('coupon', {
			mobile: mobile,
			couponIds: couponIds,
			sharedUserId: sharedUserId
		})
	},
	//查询可分享优惠券
	fetchCoupon() {
		interceptor(http)
	    return http.get('coupon')
	}
	
}

function interceptor(http) {
	//设置请求结束后拦截器
	http.interceptor.response = (response) => {
		console.log(http,'interceptor')
		//判断返回状态 执行相应操作
		return response.data;
	}
}
