<template>
	<view class="box">
		<view class="sign-des" @click="goArchiveEdit">
			<h5>学生：{{name}}</h5>
			<view>
				<text>家长：{{parent}}</text><text class="line">|</text><text>电话：{{tel}}</text>
			</view>
		</view>
		<view @click="goArchiveAdd" class="sign-up">添加</view>		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				name:'李莉莉',
				parent:'李丽',
				tel:'13888888888'
			}
		},
		methods: {

			goArchiveAdd:function(){
				uni.navigateTo({
					url:'archivesAdd'
				})
			}
			
			
		}

	}
</script>

<style lang="scss" >
	@import "../../static/style/base.scss";

.sign-des{
	font-size: 36upx;
	padding:40upx 0;
	line-height:50upx;
	border-bottom: 1px solid #eee;
	background:url(../../static/img/edit.png) no-repeat right center;
	background-size: 40upx;
	text{
		color:#7e7e7e;
		font-size:30upx;
	}
}

.sign-up{
		position:absolute;
		right:5vw;
		bottom:20upx;
		width:90vw;
		height:72upx;
		line-height:72upx;
		border-radius: 8upx;
		text-align: center;
		font-size: 24upx;
		color:#fff;
		background:#ff8300;
	}

</style>
