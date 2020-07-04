<template>
	<view class="page">
		<view class="bg">
			<uni-popup ref="popup" type="center">
			    <uni-popup-box title="详细规则" :content="rules"></uni-popup-box>
			</uni-popup>
			<view class='detail-rule'>
				<button style="" @click="open">详细规则</button>	
				<div class="box"></div>
			</view>
			<view class="title">
				<h2>送好友福利，得现金红包</h2>
				<h5>好友报名成功后即可体现哦</h5>
			</view>			
			<view class="lbox">
				<image src="../../static/img/sharebg1.png" mode="widthFix"></image>
			</view>
		</view>	
			<view class=" inbox">
				<view class="shadow-box">
					<view class="coupon-title">你可以获得 <span>邀请好友报名可领取</span></view>
					<coupon class="share-coupon" v-for="(item , i) in cashCoupons" :key="i" :count="item.amount" tip="红包可体现" type=0></coupon>
					
					<view class="coupon-title">好友获得优惠 <span>报名即可使用</span></view>
					<coupon class="share-coupon" v-for="(item , i) in discountCoupons" :key="i" :count="item.amount" :tip="'满' + item.minUsed+ '元可使用'" type=1></coupon>
					<button open-type="share">立即邀请</button>
				</view>
			</view>

			<view class=" inbox Withdrawal">
				<view class="shadow-box">
					<view class="title">可提现红包</view>
					<view class="price"><span>¥0.00</span>
					<!--<button @click="goCash">提现</button>-->
					<button style="background: #999;">暂未开启</button>
					</view>
					<view class="Statistics">
						<view @click="goInvite">
							<p>成功邀请</p>
							<span>0人</span>
						</view>
						<view @click="goProfit">
							<p>累计获得</p>
							<span>¥0.00</span>
						</view>
					</view>	
				</view>
				
			</view>
		
	</view>
</template>

<script>
	import uniPopupBox from '@/components/uni-popup/uni-popup-box.vue'
	import {
		mapGetters
	} from 'vuex'
	import couponRes from '@/api/coupon.js'
	export default {
		components:{
			 uniPopupBox
		},
		data() {
			return {
				discountCoupons: [],
				cashCoupons: [],
				rules:'00000'

			}
		},
		computed: {
			...mapGetters([
				'user'
			])
		},
		onLoad: function(options) {
			this.fetchCoupon()

		},

		mounted() {},
		methods: {
			fetchCoupon() {
				couponRes.fetchCoupon().then(res => {
					if (res.statusCode == 200) {
						this.cashCoupons = res.data.cashCoupons;
						this.discountCoupons = res.data.discountCoupons
					}

				})
			},
			onShareAppMessage(res) {
				let couponIds = this.discountCoupons.map(coupon => coupon.couponId);
				let path = `/pages/share/shareResult?sharedUserId=${this.user.id}&couponIds=${couponIds}`;
				console.log(path)
				return {
					title: "获取优惠券",
					path: path
				}
			},
			goCash(){
				uni.navigateTo({
					url: `/pages/share/cashOut`,
					success: res => {},
					fail: () => {},
					complete: () => {}
				});
			},
			goInvite(){
				uni.navigateTo({
					url: `/pages/share/totalInvite`,
				});
			},
			goProfit(){
				uni.navigateTo({
					url: `/pages/share/totalProfit`,
				});
			},
			open(){
				 this.$refs.popup.open()
			}
		}

	}
</script>

<style lang="scss" scoped>
	@import "../../static/style/base.scss";
	.page{
		background: #FF7E00;
		padding-bottom: 40upx;
	}
	.bg {
		position: relative;
		text-align: center;
		.rulebox{
			.uni-popup__wrapper-box{
				background: #fff;
			}
		}
		.lbox{
			width:300upx;
			height:300upx;
			position: absolute;
			top:-80upx;
			left:-80upx;
			
		}
		.detail-rule {
			background: url(../../static/img/sharebg2.png) no-repeat right top;
			position:absolute;
			right:0;
			top:0;
			background-size:189upx;
			width:189upx;
			height:189upx;
			line-height: 60upx;
			button {
				position: absolute;
				top: 24upx;
				right: 0;
				text-align: center;					
				font-size: 24upx;				
				color:#fff;
				width: 160upx;
				height: 60upx;
				z-index:9;
				background: none;
			}
			.box{
				background:rgba(255,255,255,1);
				opacity:0.2;
				border-radius: 30upx 0upx 0upx 30upx;
				width: 160upx;
				height: 60upx;
				margin-top:24upx;
			}
		}
		.title{
			position:relative;
			z-index:2;
			padding-bottom:40upx;
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
		


	}

	.shadow-box {
		background: #fff;
		border-radius: 12upx;
		box-shadow:0px 0px 24px rgba(0,0,0,0.08);
		padding:40upx 20upx;
		.coupon-title {
			font-size: 32upx;
			color: rgba(36, 36, 36, 1);
			font-weight: 600;
			margin-top: 10upx;
			margin-bottom: 14upx;

			span {
				margin-left: 16upx;
				font-size: 24upx;
				font-weight: 400;
				color: rgba(0, 0, 0, 0.7);
			}
		}
		.share-coupon{
			position: relative;
			left:5vw;
		}
		button {
			background: rgba(255, 126, 0, 1);
			border-radius: 40upx;
			text-align: center;
			font-size: 30upx;
			color: white;
		}
	}
	.Withdrawal{
		padding-bottom:60upx;
		padding-top:40upx;
		.title{
			color:#979797;
			font-size:28upx;
		}
		.price{
			color:#FE8300;
			font-size:60upx;
			border-bottom:1px solid #eee;
			padding-bottom:10upx;
			button{
				border-radius:12upx;
				display: inline;
				height:70upx;
				line-height:70upx;
				float:right;
			}
		}
		.Statistics{
			padding:40upx 0;
			padding-bottom:80upx;
			font-size:24upx;
			text-align: center;
			view{
				width:50%;
				float:left;			
			}
			p{
				width: 100%;
				color:#979797;
			}
			span{
				color:#333333;
				width: 100%;
				
			}
		}
	}
	
	
</style>
