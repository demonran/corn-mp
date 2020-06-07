<template>
	<view class="box">
		<image src="../../static/img/success.png" mode="widthFix"></image>
		<h1>提交成功！</h1>
		<p>预计<text class="orange-color">2019年12月7号09：00</text>前到账</p>
		<navigator class="btn" url="">继续邀请</navigator>
		<span class="orange-color">成功邀请一位各得200元</span>
	</view>
</template>

<script>

export default {
	
		data() {
			return {
				
			}
		}, 	
		methods: {
	
		
		}

		
	}
</script>


<style lang="scss" scoped>
	@import "../../static/style/base.scss";

.box{
	image{
		width:20vw;
		margin-top: 100upx;
	}
	text-align: center;
	
	h1{
		font-size:40upx;
		color:#393939;
		line-height: 300%;
	}
	text{
		font-size:24upx;
		color:#595959;

	}
	p{
		font-size: 28upx;
		color:#2e2e2e;
		line-height:100%;
	}
	span{
		font-size:24upx;
	}
	navigator{
		background:rgba(255,131,0,1);
		color:#fff;
		border-radius:4px;
		height:88upx;
		line-height:88upx;
		text-align: center;
		width:500upx;
		margin:40upx auto;
		font-size:24upx;
	}

}



	.btn{
		color:#fff;
		background:rgba(255,131,0,1);
		border-radius:4px;
		height:88upx;
		line-height:88upx;
		text-align: center;
		font-size:30upx;
	}
	

</style>
