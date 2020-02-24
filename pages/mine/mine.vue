<template> 
<view class="box content"> 
	<button type="primary" open-type="getUserInfo" @getuserinfo="WX_MP_getuserinfo">微信授权登录</button>

	<navigator class="user" url="mineEdit">
		<view class="agency-logo">
			<image class="null" :src="image"></image>
		</view>
		<view class="agency-des">
			<h1 class="a-line">{{name}}</h1>
			<text class="a-line">{{tel}}</text>
		</view>
	</navigator>
	<view class="nav-list flex shadow">
		<view class="nav-box"  hover-class="nav-hover" v-for="(item,index) in nav" :key="index">
			<navigator :url="item.goUrl">
				<image :src="item.image"></image>
				<view class="text">{{item.title}}</view>
			</navigator>					
		</view>
	</view>
	<view class="cont">
		<navigator url="/pages/mine/archives">
			<dl>
				<dt>学生档案</dt>
			</dl>
		</navigator>
		<navigator url="../share/share">
			<dl>
				<dt>分享课程</dt>
				<dd class="orange-color">送好友优惠券，得200元现金奖励</dd>
			</dl>
		</navigator>
		<navigator url="/pages/mine/about">
			<dl >
				<dt>关于我们</dt>
			</dl>
		</navigator>
		<dl @click="goCall">
			<dt>联系我们</dt>
			<dd>028-9788 0265</dd>
		</dl>
	</view>
</view>
</template>

<script>
	export default {
		data() {
			return {
				image:'',
				name:'张三',
				tel:'13888888888',
				nav:[
					{
					title:"我的报名",
					image:"../../static/img/nav4.png",
					goUrl:"../signup/mySign"
				},{
					title:"我的收藏",
					image:"../../static/img/nav5.png",
					goUrl:"../collection/collection"
				},{
					title:"优惠券",
					image:"../../static/img/nav6.png",
					goUrl:"../mine/coupon"
				}
				]
			}
		},
		onLoad() {
			
		},
		methods: {
			
			// 
			// uni.login({
			//   provider: 'weixin',
			//   success: function (loginRes) {
			// 	
			// 	})
			//   } 
			// });
			WX_MP_getuserinfo(e){
				let that = this;
				let userInfo = e.detail.userInfo;
				this.name = userInfo.nickName;
				this.image = userInfo.avatarUrl;
				uni.login({
				  provider: 'weixin',
				  success: function (loginRes) {
					  that.$api.login(loginRes.code, e.detail.userInfo).then(res =>{
						  console.log(res)
					  	})
				  }
				});
				console.log(e)
			},
			goCall:function(){
				uni.makePhoneCall({
				    phoneNumber: '15281029319' 
				});
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import "../../static/style/base.scss";

	.user{
		padding:60upx 0;
		height:14vw;
		border-radius: 8upx;
		background:#fff url(../../static/img/info-arr.png) no-repeat 85vw center;
		background-size: 40upx;
		.agency-logo{
			width:15vw;
			height:15vw;
			border-radius: 50%;
			overflow: hidden;
			margin-right:2vw;
			float:left;
			image{
				width:100%;
			}
		}
		.agency-des{
		
			h1{
				font-size: 38upx;
				color:#393939;
			}
			text{
				font-size: 24upx;
				color: #7e7e7e;
			}
		}
	
	}
	.nav-list{
		margin-bottom:40upx;
		height:206upx;
		width:100%;
		justify-content: space-around;
		text-align: center;
		font-weight: bold;
		image{
			width: 72upx;
			height: 73upx;
			margin-top: 50upx;
		}
		.nav-box{
			width:33%;
			height: 206upx;
			color: #4b4b4b;
			font-size: 26upx;
		}
	}
	.cont{
		min-height:80vh;
		padding-top:0;
		dl{
			background: url(../../static/img/info-arr.png) no-repeat right center; 
			background-size: 30upx;
			height:108upx;
			line-height:108upx;
			border-bottom:1px solid #ededed;
			width:100%;
			dt{
				font-size:30upx;
				color:#2b2b2b;
				display: inline-block;
				width: 25vw;
				float:left;
				font-weight: bold;
			}
			dd{
				font-size:28upx;
				color:#4b4b4b;
				text-align:right;
				display: inline-block;
				width:60vw;
				
				
			}
		}
		.noIco{
			background: none;
		}
		}
</style>
