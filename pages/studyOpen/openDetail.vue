<template>
	<view>
		<video id="myVideo" 
		:src="course.videoUrl"
			@error="videoErrorCallback"  controls>
		</video>		
		<view class="rec-des" >
			<h4 class="a-line">{{course.title}}</h4>
			<p class="a-line">{{course.subTitle}}</p>
				<button open-type="share" class="share">分享</button>
		
			<view class="bottom">
				<text class="prize fl" >{{course.price ? "¥"+course.price : "免费"}}</text>
				<text class="fr" >
					<text>{{course.category.name}}</text><text class="line">|</text><text>{{course.watchedCount}}人已观看</text>
				</text>
			</view>
		</view>
		<view class="agency flex inbox shadow" @click="goTeacherDetail(course.teacher.id)">
			<view class="agency-logo">
				<image class="null" :src="course.teacher.avatar"></image>
			</view>
			<view class="agency-des">
				<h1 class="a-line">主讲:{{course.teacher.name}}</h1>
				<text class="a-line">
					<text>{{course.category.name}}</text><text class="line">|</text><text>{{course.teacher.experience}}年经验</text>
				</text>
			</view>
		</view>
		<view class="box details">
			<h6>课程介绍</h6>
			<rich-text style="padding-bottom:100upx;" mode="widthFix" :nodes="course.content"></rich-text>
		</view>
<!-- 		<view class="bottomBar">
			<text class="service">客服</text>
			<text class="collection">收藏</text>
			<view @click="goSignup(course.id)" class="sign-up">购买学习</view>
		</view> -->
	</view>
</template>

<script>
	export default {
		data() {
			return {
				course: {}
			}
		},
		onLoad(options) {
			console.log(options)
			this.initOnlineCourseDetail(options.id);
		},
		methods: {
			videoErrorCallback: function(e) {
				uni.showModal({
					content: e.target.errMsg,
					showCancel: false
				})
			},
			initOnlineCourseDetail(id) {
				this.$api.onlineCourseDetail(id).then(res => {
					this.course = res.data.data;
				})
			},
			goSignup:function(id){
				 uni.navigateTo({
					url: `/pages/signup/signup?id=`+id,
					success: res => {},
					fail: () => {},
					complete: () => {}
				}); 
			},
			goTeacherDetail:function(id){
				uni.navigateTo({
					url: `/pages/teacher/teacherDetail?id=`+ id,
					success: res => {},
					fail: () => {},
					complete: () => {}
				});
			},
		},
		onShareAppMessage(res) {
		    if (res.from === 'button') {// 来自页面内分享按钮
		      console.log(res.target)
		    }
		    return {
		      title: '这是一个分享',
		      path: '/pages/studyOpen/openDetail'
		    }
		  }
	}
</script>

<style lang="scss" scoped>
	@import "../../static/style/base.scss";
video{
	width:100vw;
}
.rec-des{
	padding: 3vw;
	font-size: 24upx;
	color: #7e7e7e;
	height: 165upx;
	width:84vw;
	margin-left:2vw;
	position:relative;
	h4{
		color:#393939;
		font-size:36upx;
	}
	.share{
		position: absolute;
		right:0;
		top:3vw;
		display: inline;
		width:150upx;
		height:100upx;
		font-size: 24upx;
		color: #7e7e7e;
		background:url(../../static/img/share.png) no-repeat top right;
		background-size: 40upx;
		text-align: right;
		line-height: 130upx;
		padding:0;
		margin-right:-20upx;
	}
	.bottom{
		position:absolute;
		bottom:20upx;
		left:20upx;
		width:100%;
		height:50upx;
		.prize{
			color:#FF8300;
			font-size: 30upx;
			
		}
		
	}
	
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
.details{
	padding-bottom:200upx;
	margin-top:60upx;
	h6{
		font-size: 30upx;
		color: #393939;
		margin-bottom: 20upx;
	}

}
.bottomBar{
	position: fixed;
	background: #fff;
	width:100vw;
	height:95upx;
	z-index:9;
	right: 0;
	bottom:0;
	font-size:20upx;
	color:#787878;
	text{
		display: inline-block;
		width:130upx;
		height:95upx;
		text-align: center;
		line-height: 140upx;
		
	}
	.service{
		background:url(../../static/img/service.png) no-repeat center 10upx;		
		background-size: 40upx;
	}
	.collection{
		background:url(../../static/img/collect.png) no-repeat center 10upx;
		background-size: 40upx;
	}
	.sign-up{
		position:absolute;
		right:5vw;
		bottom:10upx;
		width:405upx;
		height:72upx;
		line-height:72upx;
		border-radius: 8upx;
		text-align: center;
		font-size: 24upx;
		color:#fff;
		background:#ff8300;
	}
}
</style>
