<template>
	<view class="box content">
		<login></login>
		<view class="nav-list flex shadow">
			<view class="nav-box" hover-class="nav-hover" v-for="(item,index) in nav" :key="index">
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
				<dl>
					<dt>关于我们</dt>
				</dl>
			</navigator>
			<dl @click="goCall">
				<dt>联系我们</dt>
				<dd>{{organization.tel}}</dd>
			</dl>
		</view>

	</view>
</template>



<script>
	import login from './login/login';
	export default {
		components: {
			login
		},
		data() {
			return {
				userInfo: '',
				organization: [],
				isAuthorize: false,
				image: '',
				name: '',
				tel: '',
				nav: [{
					title: "我的报名",
					image: "../../static/img/nav4.png",
					goUrl: "../signup/mySign"
				}, {
					title: "我的收藏",
					image: "../../static/img/nav5.png",
					goUrl: "../collection/collection"
				}, {
					title: "优惠券",
					image: "../../static/img/nav6.png",
					goUrl: "../mine/coupon"
				}]
			}
		},
		onLoad() {
			this.getOrganization();
		},

		methods: {
			getOrganization() {
				this.$api.organization().then(res => {
					this.organization = res.data.data;
					console.log('organization:', this.organization)
				})
			},

			goCall: function() {
				uni.makePhoneCall({
					phoneNumber: this.organization.tel
				});
			}
			
		}
	}
</script>

<style lang="scss" scoped>
	@import "../../static/style/base.scss";


	.nav-list {
		margin-bottom: 40upx;
		height: 206upx;
		width: 100%;
		justify-content: space-around;
		text-align: center;
		font-weight: bold;

		image {
			width: 72upx;
			height: 73upx;
			margin-top: 50upx;
		}

		.nav-box {
			width: 33%;
			height: 206upx;
			color: #4b4b4b;
			font-size: 26upx;
		}
	}

	.cont {
		min-height: 80vh;
		padding-top: 0;

		dl {
			background: url(../../static/img/info-arr.png) no-repeat right center;
			background-size: 30upx;
			height: 108upx;
			line-height: 108upx;
			border-bottom: 1px solid #ededed;
			width: 100%;

			dt {
				font-size: 30upx;
				color: #2b2b2b;
				display: inline-block;
				width: 25vw;
				float: left;
				font-weight: bold;
			}

			dd {
				font-size: 28upx;
				color: #4b4b4b;
				text-align: right;
				display: inline-block;
				width: 60vw;


			}
		}

		.noIco {
			background: none;
		}
	}
</style>
