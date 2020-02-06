<template>
	<view >
		<!-- 优秀作品 start -->
			<view class="works">			
				<view class="works-pic">
					<image :src="image" mode="widthFix"></image>	
				</view>
				<view class="box">
					<h4 class="a-line">{{title}}</h4>
					<span>{{author}}</span><span class="line">|</span><span>{{classify}}</span>
				</view>	
			</view>
		<!-- 优秀作品 end -->		
	</view>
</template>

<script>

export default {
	data() {
		return {
			image:"../../static/img/w1.png",
			title:"作品名称",
			author:"作者姓名",
			classify:"分类1"
		};
	},

	methods: {

	
	}
};
</script>

<style lang="scss">
@import "../../static/style/base.scss";
page{
	background: #000;
}

.works{
	color:#fff;
	.works-pic{
		width:100vw;
		margin-top:200upx;
	}
	h4{
		font-size:36upx;
		margin-top:60upx;
	}
	span{
		font-size:24upx;
	}
}

</style>
