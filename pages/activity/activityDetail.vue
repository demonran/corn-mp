<template>
	<view class="box">
			<view class="title">
				<h3>{{article.title}}</h3>
				<span>{{article.category.name}}</span><span class="line">|</span><span>{{article.createdAt}}</span>
			</view>
			<view class="img" v-html="article.description">
				
			</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				article:[]
			}
		},
		onLoad(options) {
			this.getArticle(options.id);
			console.log(options.id)
		},
		methods: {
			getArticle(id) {
				this.$api.articleDetail(id).then(res => {
					this.article = res.data.data;
					console.log('res:',res)
				})
			},
			/* initCourseDetail(id) {
				this.$api.CourseDetail(id).then(res => {
					this.CourseDetail = res.data.data; 
				}) 
			}, */
		}
	}
</script>

<style lang="scss" scoped>
	@import "../../static/style/base.scss";
.title{
	padding:30upx 0;
	border-bottom:1px solid #eee;
	margin-bottom:40upx;
	h3{
		font-size:48upx;
		color: #393939;
		padding: 20upx 0;
	}
	span{
		font-size:24upx;
		color:#acacac;
	}
}
		
		p{
			font-size:24upx;
			color:#7e7e7e;
			line-height:36upx;
		}
		.img{
			padding:20upx 0;
		}

</style>
