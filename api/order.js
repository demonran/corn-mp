import http from '../common/vmeitime-http/interface'

export default {

	payment(orderId) {
		return http.post(`wx/payment?orderId=${orderId}`)
	},

}
