<template>
	<view class="popup-coupon">
		<view class="coupon-title"><text class="coupon-title-text">{{title}}</text></view>
		 
		<view class="coupon-content">
			<radio-group>
				<view class='coupon-item' v-for="(item , i) in myCoupons" :key="i">
					<radio  @click.stop="select(item)" />
					<coupon  :count="item.amount" :tip="'满' + item.minUsed+ '元可使用'" type=1></coupon>
				</view>
			</radio-group>
		</view>
	</view>
</template>

<script>
	import couponRes from '@/api/coupon.js'
	export default {
		props: {
			title: {
				type: String,
				default: '选择优惠券'
			}
		},
		data() {
			return {
				myCoupons: []
			}
		},
		created(){
			couponRes.fetchMyCoupon().then(res => {
				this.myCoupons = res.data.filter(coupon => coupon.status == 'NOT_USED')
			})
		},
		methods: {
			select(item) {
				console.log(item)
				this.$emit('select', item)
			}
		}
	}
</script>

<style lang="scss" scoped>
	.popup-coupon {
		background-color: #fff;
		
		.coupon-title{
			align-items: center;
			justify-content: center;
			height: 40px;
			display: flex;
			
			.coupon-title-text {
				font-size: 14px;
				color: #666;
			}
		}
		
	
		.coupon-content {
			justify-content: center;
			padding-top: 10px;
		}
	}
</style>
