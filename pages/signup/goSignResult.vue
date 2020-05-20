<template>
	<view>
		报名订单ID 
		<text> {{orderId}}</text>
		<button @click="pay">支付</button>
	</view>
</template>

<script>
	import order from '../../api/order.js'
	export default {
		
		data() {
			return {
				orderId : ''
			}
		},
		
		onLoad(options){
			this.orderId = options.orderId
		},
		
		methods: {
			pay() {
				order.payment(this.orderId).then(res => {
					console.log(res.data.data)
					this.wxPay(res.data.data)
				})
			},
			
			wxPay(options) {
				options.package = options.packageValue
				options.success = res => {
					console.log('success:' + JSON.stringify(res));
				}
				options.fail = err => {
					console.log('fail:' + JSON.stringify(err));
				}
				uni.requestPayment(options);
			}
		}
	}
	
</script>

<style>
</style>
