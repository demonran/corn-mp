<template>
	<view class="popup-coupon">
		<view class="coupon-title"><text class="coupon-title-text">{{title}}</text></view>
		 
		<view v-if="hasCoupons" class="popup-coupon-content">
		<!-- 	<radio-group >
				<view class='coupon-item' v-for="(item , i) in myCoupons" :key="i">
					<label for="">
					<radio class="radio" @click.stop="select(item)" />
					<coupon  :count="item.amount" :tip="'满' + item.minUsed+ '元可使用'" type=1></coupon>
					</label>
				</view>
			</radio-group> -->
			<view class="inbox">
			<radio-group @change="radioChange">
				<label class="uni-list-cell uni-list-cell-pd" v-for="(item , i) in myCoupons" :key="item.i">
					<view class='coupon-item'>
						<radio :value="i" :checked="i === current" class="radio" />
						<coupon  :count="item.amount" :tip="'满' + item.minUsed+ '元可使用'" type=1></coupon>
					</view>
				</label>
			</radio-group>
			</view>
		</view>
		<view v-else class="coupon-none">
			您没有优惠券！
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
			},
			current: 0,
			current2:0
		},
		data() {
			return {
				myCoupons: [],
				hasCoupons:false
			}
		},
		created(){
			couponRes.fetchMyCoupon().then(res => {
				this.myCoupons = res.data.filter(coupon => coupon.status == 'NOT_USED')
				console.log('coupon res,',res.data)
				if(res.data != ''){
					this.hasCoupons = true
				}else{
					this.hasCoupons = false
				}
			})
		},
		methods: {
			radioChange: function(evt) {				
				for (var i = 0; i < this.myCoupons.length; i++) {
					if (this.myCoupons[i].value === evt.target.value) {
						this.current = i;
						break;
					}
				}
				let coupon = this.myCoupons[evt.target.value]
				this.$emit('select', coupon)
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
			height: 80upx;
			display: flex;
			
			.coupon-title-text {
				font-size: 28upx;
				color:#666;
			}
		}

		.popup-coupon-content {
			justify-content: center;
			padding-top: 20upx;
			.coupon-item{
				position: relative;
				.radio{
					position: absolute;
					right:-5vw;
					top:50%;
					margin-top:-30upx;
				}
			
			}
			
		}
		.coupon-none{
			text-align: center;
			padding:40upx 0;
		}
	}
</style>
