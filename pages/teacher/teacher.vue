<template>
	<view>
		<view @click="goTeacherDetail(item.id)" class="teachlist" v-for="(item,index) in teacher" :key="index">
			<view class="agency flex inbox shadow">
				<view class="agency-logo">
					<image class="null" :src="item.avatar"></image>
				</view>
				<view class="agency-des">
					<h1 class="a-line">主讲:{{item.name}}</h1>
					<text class="a-line">
						<text>{{item.categoryName}}</text><text class="line">|</text><text>{{item.experience}}年经验</text>
					</text>
				</view>
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
		onLoad() {
			this.initTeacher()
		},
		methods: {
			initTeacher() {
				this.$api.teacherList().then(res => {
					this.teacher = res.data.content;
					console.log(this.teacher)
				})
			},
			goTeacherDetail:function(id){
				uni.navigateTo({
					url: `/pages/teacher/teacherDetail?id=`+ id,
					success: res => {},
					fail: () => {},
					complete: () => {}
				});
			},

		}

	}
</script>

<style lang="scss" >
	@import "../../static/style/base.scss";
	.teachlist{
		margin-top:30upx;
	}
.line{
	padding:0 20upx;
}
.agency{
		height:14vw;
		margin-left: 5vw;
		border-radius: 8upx;
		background:#fff url(../../static/img/info-arr.png) no-repeat 82vw center;
		background-size: 40upx;
		.agency-logo{
			width:14vw;
			height:14vw;
			border-radius: 50%;
			overflow: hidden;
			margin-right:2vw;
			image{
				width:100%;
				height:100%;
			}
		}
		.agency-des{
			width: 60vw;
			h1{
				font-size: 30upx;
				color:#393939;
			}
			text{
				font-size: 24upx;
				color: #7e7e7e;
			}
		}

	}

</style>
