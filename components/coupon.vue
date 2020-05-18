<template>
	<view class="coupon">
		<view>
			<h2>¥{{count}}</h2>
			<h6>{{tip}}</h6>
		</view>
		<view class="type">{{typeStr}}</view>
	</view>
</template>

<script>
	export default {
		props: ['count', 'type', 'tip'],
		data() {
			return {

			};
		},
		computed: {
			typeStr() {
				if (this.type == 0) {
					return '现金'
				} else if (this.type == 1) {
					return '优惠券'
				}else{
					return 'error'
				}
			}

		}
	}
</script>

<style lang="scss">
	.coupon {
		position: relative;
		background: url(../static/img/coupon1.png) no-repeat;
		background-size: 100% 100%;
		// border: 1px solid rgba(254, 131, 0, 1);
		padding: 36upx 40upx;
		margin-bottom: 25upx;

		h2 {
			height: 84upx;
			font-size: 60upx;
			font-family: PingFang SC;
			font-weight: 600;
			line-height: 84upx;
			color: rgba(254, 131, 0, 1);
		}

		h6 {
			height: 33upx;
			font-size: 24upx;
			font-family: PingFang SC;
			font-weight: 400;
			line-height: 33upx;
			color: rgba(0, 0, 0, 0.6);
		}

		.type {
			position: absolute;
			line-height: 40upx;
			top: 40upx;
			right: 25upx;
			width: 24upx;
			font-size: 24upx;
			font-weight: 400;
			color: #fe10be;
		}
	}
</style>
