<script>
	import api from '@/common/vmeitime-http/'
	export default {
		globalData: {
			userInfo: {}
		},
		onLaunch: function() {
			console.log('App Launch')
			this.getUserInfo()
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		},
		methods: {
			getUserInfo() {
				return new Promise((resolve, reject) => {
					const info = this.globalData.userInfo
					const that = this
					if (info.id) {
						// 本地已有登录信息
						resolve(info)
					} else {
						// 重新获取
						uni.getSetting({
							success: (res) => {
								if (res.authSetting['scope.userInfo']) {
									//已经授权，可以直接调用 getUserInfo 获取头像昵称
									uni.getUserInfo({
										success(userSourceData) {
											// 调用登录
											const info = userSourceData.userInfo
											uni.login({
												success: (res) => {
													// that.$ 无法调用挂载的全局变量
													api.login(res.code, info).then(res => {
														console.log(res)
														that.globalData.userInfo = info
														uni.setStorageSync('token', res.data.data);
														resolve(info)
													}).catch(e => {
														reject(e)
													})
												},
												fail: (e) => {
													reject(e)
												}
											})
											// that.login(info).then(res => {
											// 	resolve(res)
											// 	that.globalData.userInfo = res
											// }).catch(e => {
											// 	reject(e)
											// })
										},
										fail(e) {
											resolve()
										}
									})
								} else {
									// 未授权
									reject()
								}
							}
						})
					}
				})
			},
		}
	}
</script>

<style>
	/*每个页面公共css */
</style>
