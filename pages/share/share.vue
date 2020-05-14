<template>
	<view>
		<view class="bg">
			<view class='detail-rule'>
				<navigator url=""><span>详细规则</span></navigator>
			</view>
			<h2>送好友福利，得现金红包</h2>
			<h5>好友报名成功后即可体现哦</h5>
			<view class="shadow">
				<view class="coupon-title">你可以获得 <span>邀请好友报名可领取</span></view>
				<coupon count=200 tip="红包可体现" type=0></coupon>
				<view class="coupon-title">好友获得优惠 <span>报名即可使用</span></view>
				<coupon count=200 tip="满2000元可使用" type=1></coupon>
				<button open-type="share">立即邀请</button>
			</view>

			<view class="shadow">
				<view class="coupon-title">可体现红包</view>
				<view><span>¥9000.00</span><button>提现</button></view>
				<view>
					<p>成功邀请</p>
					<p>12人</p>
				</view>
				<view>
					<p>成功邀请</p>
					<p>12000.00</p>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import coupon from '../../components/coupon.vue'
	export default {
		components: {
			coupon
		},
		data() {
			return {
				
				
			}
		},
		onLoad: function(options) {
			

		},
		
		mounted() {
		},
		methods: {
			onShareAppMessage(res){
				console.log(res)
				return {
					title:"获取优惠券",
					path: '/pages/share/shareResult'
				}
			}
		}

	}
</script>

<style lang="scss" scoped>
	@import "../../static/style/base.scss";

	.bg {
		position: relative;
		background: #FE8300;
		background-image: url(../../static/img/sharebg1.png), url(../../static/img/sharebg2.png);
		background-repeat: no-repeat;
		background-position: right top, left -100upx top -100upx;
		background-size: 189upx 187upx, 288upx 288upx;
		text-align: center;

		.detail-rule {
			navigator {
				position: absolute;
				top: 24upx;
				right: 0;
				width: 159upx;
				height: 60upx;
				line-height: 60upx;
				text-align: center;
				background: rgba(255, 255, 255, 0.2);
				border-radius: 30upx 0upx 0upx 30upx;
				font-size: 24upx;
			}
		}

		h5 {
			color: #fff;
			font-size: 32upx;
			font-weight: 400;
		}

		h2 {
			color: #fff;
			padding-top: 120upx;
			font-size: 48upx;
			font-weight: 600;
		}


	}

	.shadow {
		margin: 39upx auto 0 auto;
		width: 645upx;
		background: #fff;
		border-radius: 20upx;
		padding: 20upx;
		text-align: left;

		.coupon-title {
			font-size: 32upx;
			color: rgba(36, 36, 36, 1);
			font-weight: 600;
			margin-top: 48upx;
			margin-bottom: 14upx;

			span {
				margin-left: 16upx;
				font-size: 24upx;
				font-weight: 400;
				color: rgba(0, 0, 0, 0.7);
			}
		}

		button {
			margin-top: 60upx;
			width: 615upx;
			height: 80upx;
			background: rgba(255, 126, 0, 1);
			border-radius: 40upx;
			text-align: center;
			font-size: 30upx;
			color: white;
		}
	}
</style>
