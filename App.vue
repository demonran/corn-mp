<script>
	export default {
		onLaunch: function() {
			console.log('App Launch')
		},
		onShow: function() {
			console.log('App Show')
			this.getHandle()
			console.log('App Show 222')
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
							
		},
	}
</script>

<style>
	/*每个页面公共css */
</style>
