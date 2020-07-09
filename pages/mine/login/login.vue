<template>
	<view class="user">
		<view class="agency-logo">
			<image v-if="image != ''" :src="image"></image>
			<open-data v-if="image == ''" type="userAvatarUrl"></open-data>
		</view>
		<view class="agency-des" v-if="isAuthorize==false">
			<button class="loginBtn" open-type="getPhoneNumber" @getphonenumber="getPhoneNumber">
				<h1>
					登录/注册
				</h1>
				<text class="a-line">点击登陆</text>
			</button>
		</view>
		<view class="agency-des mine" v-if="isAuthorize==true" @click="goMyEdit">
			<h1 class="a-line">
				<open-data type="userNickName" lang="zh_CN"></open-data>
			</h1>
			<text class="a-line">
				{{mobile}}
			</text>
		</view>
	</view>
</template>

<script>
	import {
		mapGetters
	} from 'vuex'
	export default {
		data() {
			return {
				image: '',
				name: '',
				mobile:''
			} 
		},
		computed: {
			...mapGetters([
				'isAuthorize'
			]),
		},
		onShow() {
			console.log('onLoad')
			if (this.isAuthorize) {
				this.getUserInfo();
			} else {
				let that = this;
				uni.login({
					provider: 'weixin',
					success: function(loginRes) {
						console.log('login,',loginRes);
					}
				}) 
			}

		},
		methods: {
			goMyEdit() {
				uni.navigateTo({
					url: 'mineEdit',
					success: res => {},
					fail: () => {},
					complete: () => {}
				});
			}, 
			getUserInfo() {
				this.$api.userInfo().then(res => {
					this.userInfo = res.data;
					console.log(res)
					this.name = this.userInfo.nickName;
					this.image = this.userInfo.avatarUrl;
					this.mobile = this.userInfo.mobile;
					this.$store.commit('SET_USER', this.userInfo)
				})
			},
			getPhoneNumber(e) {
				let that = this;
				console.log('getphone,',e)
				if (e.detail.errMsg == 'getPhoneNumber:ok') {
					uni.checkSession({
						success(res) {
							uni.login({
								provider: 'weixin',
								success: function(loginRes) {
									console.log('loginres,',loginRes)
									that.$api.login(loginRes.code, e.detail.encryptedData, e.detail.iv).then(res => {
										console.log('login result,',res)
										uni.setStorageSync('token', res.data);
										that.$store.commit('SET_AUTHORIZE', true)
										that.getUserInfo();
									})
								}
							})
						},
						fail(e){
							console.log('checksession err')
							uni.login({
								provider: 'weixin',
								success: function(loginRes) {
									console.log(loginRes)
									that.$api.login(loginRes.code, e.detail.encryptedData, e.detail.iv).then(res => {
										console.log('login result,',res)
										uni.setStorageSync('token', res.data);
										that.$store.commit('SET_AUTHORIZE', true)
										that.getUserInfo();
									})
								}
							})
						}
					})
				}
			},
		}
	}
</script>

<style lang="scss" scoped>
	@import "../../../static/style/base.scss";

	.user {
		padding: 60upx 0;
		height: 14vw;
		border-radius: 8upx;
		background: #fff url(../../../static/img/info-arr.png) no-repeat 85vw center;
		background-size: 40upx;

		.mine {
			display: block;
			height: 60upx;

			text {
				font-size: 24upx;
				color: #7e7e7e;
			}
		}

		.agency-logo {
			width: 15vw;
			height: 15vw;
			border-radius: 50%;
			overflow: hidden;
			margin-right: 2vw;
			float: left;

			image {
				width: 100%;
				height: 100%;
			}
		}

		.agency-des {
			.loginBtn {
				background: none;
				border: none;
				text-align: left;
				line-height: 150%;
				padding: 0;

				h1 {
					font-size: 38upx;
					color: #393939;

				}

				text {
					font-size: 24upx;
					color: #7e7e7e;
				}
			}
		}
	}
</style>
