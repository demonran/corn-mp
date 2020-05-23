<template>
    <view class="page">
		<view class="bg">
			<view class='detail-rule'>
				<navigator url="">详细规则</navigator>
				<div class="box"></div>
			</view>
			<view class="user">
				<image :src="sharedUser.avatarUrl"></image>
				<text>{{sharedUser.nickName}}</text>
			</view>
			<view class="title">
				<h2>你的好友送来学习福利</h2>
				<h5>报名即可抵扣相应现金哦</h5>
			</view>			
			<view class="lbox">
				<image src="../../static/img/sharebg1.png" mode="widthFix"></image>
			</view>
		</view>
		<view class="shadow-box inbox">
				<view class="coupon-content coupon-content2">
					<view class="left">
						<view class="price">
							¥<span>200</span>		
						</view>
						<text>满2000可使用</text>
					</view>				
				</view>
				<input v-model="mobile" class="mobile-input"  placeholder-style="text-align:center" type="number" placeholder="输入手机号" />
				<button @click="receiveCoupon">立即领取</button>
		</view>
		<view class="rules inbox">
			<view class="title">
				- 使用规则 -
			</view>
			<view class="cont">
				1.该用户仅限未注册用户领取
				1.现金红包为报名红包，报名可抵扣相应费用。
				4.报名使用红包时，需要领取红包的手机号注册的微信支付。
				4.红包不找零，不兑现，不转让，退款后不返还。
				5,机构保留法律范围内允许的对活动的解释权。
			</view>
		</view>
    </view>
</template>

<script>
	import couponRes from '@/api/coupon.js'
    export default {
       
        data() {
            return {
				sharedUser: {},
				mobile: '',
				couponId: '',
				sharedUserId: '',
				coupons:[]

            }
        },
		onLoad(options) {
			this.couponIds = options.couponIds;
			this.sharedUserId = options.sharedUserId;
			this.fetchCoupon(this.sharedUserId, this.couponIds)
		},
       
        methods: {
            fetchCoupon(userId, couponIds) {
				couponRes.fetchCouponByIds(userId, couponIds).then(res => {
					this.sharedUser = res.data.user;
					this.coupons = res.data.coupons;
				})
			},
			receiveCoupon() {
				couponRes.receiveCoupon(this.mobile, this.couponIds.split(','), this.sharedUserId).then(res => {
					if(res.statusCode == 200){
						uni.showToast({
							icon: 'success',
							title:'领取成功'
						})
					}else{
						uni.showToast({
							icon:'none',
							title: res.errorMessage
						})
					}
				})
			
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
			navigator {
				position: absolute;
				top: 24upx;
				right: 0;
				text-align: center;					
				font-size: 24upx;				
				color:#fff;
				width: 150upx;
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
				padding-top: 60upx;
				font-size: 48upx;
				font-weight: 600;
			}
		}
		.user{
			padding-top: 103upx;
			text-align:center;
			image {
				display: block;
				margin:0 auto;
				width: 132upx;
				height: 132upx;
				border-radius: 50%;
			}
			text {
				color: white;
				font-size:36upx;
			}
		}
	}
	.shadow-box {
		background: #fff;
		border-radius: 12upx;
		box-shadow:0px 0px 24px rgba(0,0,0,0.08);
		margin-bottom:60upx;
		padding-top:60upx;
		padding-bottom:60upx;
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
		.coupon-content{
			&.coupon-content2{
				background: url(../../static/img/coupon4.png) no-repeat center center;
				background-size: 100% 100%;
			}
			background: url(../../static/img/coupon3.png) no-repeat center center;
			background-size: 100% 100%;
			position: relative;
			color:#FE8300;
			font-size:24upx;
			margin-bottom:40upx;
			.left{
				margin-left:40upx;
				padding:20upx 0;
				.price{
					span{
						font-size:60upx;
					}
				}
				text{
					color:#979797;
				}
			}
	
		}
		button {
			background: rgba(255, 126, 0, 1);
			border-radius: 40upx;
			text-align: center;
			font-size: 30upx;
			color: white;
		}
		.mobile-input{
		    border: 1px solid rgba(254, 131, 0, 1);
		    height: 80upx;
			border-radius: 40upx;
			font-size: 28upx;
			text-align: center;
			margin-bottom:40upx;
		}
	}
	.rules{
		color:#fff;
		.title{
			font-size:28upx;
			text-align: center;
			margin-bottom: 40upx;;
		}
		.cont{
			font-size:24upx;
		}
	}
</style>
