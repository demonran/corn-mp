<template>
	<view>
		<view @click="goTeacherDetail" class="teachlist" v-for="(item,index) in teacher" :key="index">
			<view class="agency flex inbox shadow">
				<view class="agency-logo">
					<image class="null" :src="item.headimg"></image>
				</view>
				<view class="agency-des">
					<h1 class="a-line">主讲:{{item.teacher}}</h1>
					<text class="a-line">
						<text>{{item.teacherType}}</text><text class="line">|</text><text>{{item.year}}年经验</text>
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
				teacher:[
					{
						headimg:'',
						teacher:'郭老师',
						teacherType:'美术教师',
						year:'8'
					},
					{
						headimg:'',
						teacher:'李老师',
						teacherType:'美术教师',
						year:'2'
					},
					{
						headimg:'',
						teacher:'郭老师',
						teacherType:'美术教师',
						year:'8'
					}
				]
				
			}
		},
		methods: {
			goTeacherDetail:function(){
				uni.navigateTo({
					url: 'teacherDetail',
					success: res => {},
					fail: () => {},
					complete: () => {}
				});
			}
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
