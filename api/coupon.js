import http from '../common/vmeitime-http/interface'

export default {

	fetchMyCoupon() {
		return http.get('coupon/my')
	},

	fetchCouponByIds(userId, ids) {
		return http.get('coupon/list', {
			userId: userId,
			couponIds: ids
		});
	},

	receiveCoupon(mobile, couponIds, sharedUserId) {
		return http.post('coupon', {
			mobile: mobile,
			couponIds: couponIds,
			sharedUserId: sharedUserId
		})
	}
}
