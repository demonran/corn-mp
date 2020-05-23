<template>
	<view>
		<view class="top">
			<view class="agency">
				<view class="agency-logo">
					<image class="null" :src="teacher.avatar"></image>
				</view>
				<view class="agency-des">
					<h1 class="a-line">{{teacher.name}}</h1>
					<view class="a-line">
						<text>{{teacher.categoryName}}</text><text class="line">|</text><text>{{teacher.experience}}年经验</text>
					</view>
				</view>
			</view>
			<image class="tbg" :src="teacher.avatar" mode="widthFix"></image>
		</view>
		
		
		<view class="box">
			<view class="des">
				<h4>教师介绍</h4>
				
				<rich-text :nodes="teacher.description"></rich-text>	
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				teacher:[]
			}
		},
		onLoad(options) {
			this.getTeacherDetail(options.id);
		},
		methods: {
			getTeacherDetail(id) {
				this.$api.teacherDetail(id).then(res => {
					this.teacher = res.data;
					console.log(this.teacher)
				})
			},
		}
	}
</script>

<style lang="scss" scoped>
	@import "../../static/style/base.scss";
	.top{
		position:relative;
		height: 750upx;
		background:#000;
		.tbg{
				min-height: 750upx;
				position:absolute;
				top:0;
				left:0;
				min-width: 100%;
				opacity: .3;

			}
		.agency{
				text-align: center;
				padding-top:130upx;
				position:relative;
				z-index:2;
				.agency-logo{
					width:200upx;
					height:200upx;
					margin:60upx auto;
					border-radius: 50%;
					overflow: hidden;
					
					border: 2px solid #fff;
					image{
						width:100%;
						height:100%;
					}
				}
				.agency-des{
					color:#fff;
					h1{
						font-size: 48upx;
					}
					text{
						font-size: 24upx;
						
					}
					.line{
						padding:0 20upx;
					}
				}
		
			}
	}


	.des{
		margin-top:10upx;
		h4{
			font-size:30upx;
			color: #393939;
			padding: 20upx 0;
		}
		p{
			font-size:24upx;
			color:#7e7e7e;
			line-height:36upx;
		}
		.img{
			padding:20upx 0;
		}
	}
	
</style>
