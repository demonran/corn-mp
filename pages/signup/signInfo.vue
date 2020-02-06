<template>
	<view class="box">

		<view class="cont">
			<dl>
				<dt>学生姓名</dt>
				<dd><input :key="student"  type="text" placeholder="请输入学生姓名" /></dd>
			</dl>
			<dl>
				<dt>家长姓名</dt>
				<dd><input type="text" placeholder="请输入家长姓名" /></dd>
			</dl>
			<dl>
				<dt>联系电话</dt>
				<dd><input type="text"  placeholder="请输入11位手机号码"/></dd>
			</dl>
		</view>

		<view @click="goSignup" class="sign-up">保存</view>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			goSignup:function(){
				uni.setStorage({
					key:'student',
					data:'456',
					success(){
						console.log('success')
					},
					fail(){
						console.log('fail')
					}
				})
				uni.navigateBack({
					delta: 1
				});
				
			}
	}

	}
</script>

<style lang="scss" >
	@import "../../static/style/base.scss";


	.sign-up{
		width:100%upx;
		height:72upx;
		line-height:72upx;
		border-radius: 8upx;
		text-align: center;
		font-size: 24upx;
		color:#fff;
		background:#ff8300;
	}

.cont{
	
	dl{
		font-size:30upx;
		margin:60upx 0;
		border-bottom:1px solid #ededed;
		dt{
			color:#212121;
			margin-top:20upx;
		}
		dd{
			color:#aaaaaa;
			input{
				
				line-height:88upx;
				height: 88upx;
			}
		}
	}
}
	
</style>
