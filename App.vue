<script>
	export default {
		onLaunch: function() {
			console.log('App Launch')
		},
		onShow: function() {
			console.log('App Show')
			this.getHandle()
			
		},
		onHide: function() {
			console.log('App Hide')
		},
		globalData: {
			token: '',
			isAuthorize: false,
			
		},
		
		methods: {
			// 授权事件
			getHandle() {
				// 重赋值this
				let _this = this;
				const app = getApp()
				
				// 获取用户授权设置
				uni.getSetting({
					success(res) {
						if (res.authSetting['scope.userInfo']) {
							// 如果要获取的权限已经授权,则直接获取相关信息
							uni.getUserInfo({
								success(res) {
									// 获取相关数据后，进行登录及数据请求
									console.log('请求登陆')
									
									let userInfo = res.userInfo;
									uni.login({
										provider: 'weixin',
										success: function(loginRes) {
											_this.$api.login(loginRes.code, userInfo).then(res => {
												console.log(res)
												uni.setStorageSync('token',res.data.data);
												_this.$options.globalData.isAuthorize = true
																
											})
											
																
										}
									});
								},
								fail(err) {
									// 错误信息
									console.log(err)
									_this.$options.globalData.isAuthorize = false
								}
							})
						} else if (!res.authSetting['scope.userInfo']) {
							// 如果要获取的权限尚未授权,则此时触发授权，打开设置页面
							console.log('没有授权')
						}
					}
				})
	
			},	
			
 //第一授权获取用户信息===》按钮触发.
			autoLogin() {
				let _this = this
				if (!this.isCanUse&&this.isLoginSuc) {
				   //非第一次授权获取用户
				   this.autoLoginPage = true
				   uni.login({
					  provider: 'weixin',
					  success: function (loginRes) {
						console.log(loginRes.authResult);
						let code = loginRes.code
						 uni.getUserInfo({
							   provider: 'weixin',
							   success: function(infoRes) {
		　　　　　　　　　　　　　　　　　　　　　　//获取用户信息后向调用信息更新方法
								   let nickName = infoRes.userInfo.nickName; //昵称
								   let avatarUrl = infoRes.userInfo.avatarUrl; //头像
									_this.nickName = nickName
									_this.avatarUrl = avatarUrl
									_this.authLogo = avatarUrl
									let params = {
										code:code,
										silence: true
									}
									_this.quickLogin(avatarUrl,params)
								  // _this.updateUserInfo();//调用更新信息方法
							   },
							   fail() {
							     _this.autoLoginPage = false
							   	 uni.setStorageSync('isLoginSuc', false);
							   }
						   });
					  },
					  fail() {
					     _this.autoLoginPage = false
					  	 uni.setStorageSync('isLoginSuc', false);
					  }
				   });
				  
			   }
			}, 
							
		},
	}
</script>

<style>
	/*每个页面公共css */
</style>
