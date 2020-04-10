<template> 
<view> 
	<image class="head" :src="userInfo.avatarUrl" mode=""></image>
</view>
</template>

<script>
	export default {
		data() {
			return {
				userInfo:'',
	
			}
		},
		onLoad() {
			this.initUserInfo();
		},
		methods: {
			initUserInfo() {
				this.$api.userInfo().then(res => {
					this.userInfo = res.data.data;
				})
			},

		}
	}
</script>

<style lang="scss" >
	@import "../../static/style/base.scss";
page{
	background: #000;
}
	
</style>
