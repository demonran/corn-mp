<template> 
<view> 

	<input :key="name" @confirm="goBack"  class="box" type="text" 
	 focus="true"
	 v-model="name"/>
	
</view>
</template>

<script>
	export default {
		data() {
			return {
				name:'李四'
			}
		},
		methods: {

			goBack:function(e){
				
				const name = e.detail.value;
				uni.setStorage({
					key:'name',
				    data:name,
					success() {
						console.log(name)
						setTimeout(function() {
							uni.navigateBack({
								delta: -1
							});
						}, 1000);
					},
					fail() {
						console.log('缓存失败了')
					}
				});
				
				
			}

		},
		onShow() {
			uni.setStorage({
			    key: 'name',
			    data: 'hello',
			    success: function () {
			        console.log('success');
			    }
			});
		}
	}
</script>

<style lang="scss" >
	@import "../../static/style/base.scss";
page{
	background: #eee;
}
	view{
		background: #fff;
		
		input{
			height:88upx;
			line-height: 88upx;
		}
	}
</style>
