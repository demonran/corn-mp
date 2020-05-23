<template>
	<view >
		<!-- 优秀作品 start -->
			<view class="works">			
				<view class="works-pic">
					<image :src="detail.image" mode="widthFix"></image>	
				</view>
				<view class="box">
					<h4 class="a-line">{{detail.name}}</h4>
					<span>{{detail.author}}</span><span class="line">|</span><span>{{detail.category.name}}</span>
				</view>	
			</view>
		<!-- 优秀作品 end -->		
	</view>
</template>

<script>

export default {
	data() {
		return {
			detail:[]
		};
	},
	onLoad(options) {
		console.log(options.id)
		this.getDetail(options.id);
		console.log(options.id)
	},
	methods: {
		getDetail(id) {
			this.$api.worksDetail(id).then(res => {
				this.detail = res.data;
				console.log(this.detail)
			})
		},
	
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
