<template>
	<view>
		<swiper  :autoplay="true" :interval="3000" :duration="1000">
			<swiper-item v-for="(item,index) in imageUrl" :key="index" >
				<image :src="item.image" mode="widthFix"></image>
				<view class="num">
					<text>{{index+1}}/{{course.length}}</text>
					<view class="bg"></view>
				</view>
			</swiper-item>
		</swiper>		 
		<view class="rec-des" >
			<h4 class="a-line">{{CourseDetail.courseName}}</h4>
			<p class="a-line">{{CourseDetail.courseSubTitle}}</p>
			<button open-type="share" class="share">分享</button>		
			<view class="bottom">
				<text class="fl">
					<text class="prize" >
					{{CourseDetail.price ? "¥"+CourseDetail.price : "免费"}}
					</text>
					<text class="classHour">共{{CourseDetail.lesson}}课时</text>
				</text>
				<text class="fr" >
					<text>限{{CourseDetail.limitStudents}}人</text>
				</text>
			</view>
		</view>
		<view class="cont">
			<dl @click="goCall" class="noIco">
				<dt>时间</dt>
				<dd>
				{{CourseDetail.beginDate}}～{{CourseDetail.endDate}} 
				{{CourseDetail.startClassTime}}-{{CourseDetail.endClassTime}}
				</dd>
			</dl>
			<dl @click="goMap">
				<dt>地址</dt>
				<dd>{{organization.address}}</dd>
			</dl>
			<dl @click="goCall">
				<dt>电话</dt>
				<dd>{{organization.tel}}</dd>
			</dl>
		</view>
		<view class="agency flex  ">
			<view class="agency-logo">
				<image class="null" :src="CourseDetail.headimg"></image>
			</view>
			<view class="agency-des">
				<h1 class="a-line">主讲:{{CourseDetail.teacher.name}}</h1>
				<text class="a-line">
					<text>{{CourseDetail.courseCategory.name}}</text><text class="line">|</text><text>{{CourseDetail.teacher.experience}}年经验</text>
				</text>
			</view>
		</view>
		<view class=" details">
			<view class="box">
				<h6>课程介绍</h6>
				<view v-html="CourseDetail.content"></view>		
			</view>

		</view>
		<view class="bottomBar">
			<text class="service">客服</text>
			<text class="collection">收藏</text>
			<view @click="goSignup(CourseDetail.courseId)" class="sign-up">立即报名</view>
		</view>
	</view>
</template>

<script>
	
	
	export default {
		data() {
			return {	
				CourseDetail:[],
				organization:[]
			}
		}, 
		onLoad(options) {			
			this.initCourseDetail(options.id);
			this.getOrganization();
		},
		methods: {
			getOrganization(){
				this.$api.organization().then(res => {
					this.organization = res.data.data;
					console.log('organization:',this.organization)
				})
			},
			initCourseDetail(id) {
				this.$api.CourseDetail(id).then(res => {
					this.CourseDetail = res.data.data; 
				}) 
			},
			goMap:function(){
				uni.navigateTo({
					url: '../map/map',
					success: res => {},
					fail: () => {},
					complete: () => {}
				});
			},
			goCall:function(){
				uni.makePhoneCall({
				    phoneNumber: this.organization.tel 
				});
			},
			goSignup:function(id){
				 uni.navigateTo({
					url: `/pages/signup/signup?id=`+id,
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
		      path: '/pages/study/studyDetail'
		    }
		  }
	}
</script>

<style lang="scss" >
	@import "../../static/style/base.scss";
	page{
		background: #F7F7F7;
	}
swiper{
	hegiht:422px;
	swiper-item{
		position: relative;
		.num{
			font-size: 18upx;
			color:#fff;
			position:absolute;
			right:5vw;
			bottom:20upx;
			width:76upx;
			height:38upx;
			line-height:38upx;
			text-align: center;
			text{
				position:relative;
				left:0;
				z-index: 3;
			}
			.bg{
				position:absolute;
				left:0;
				top:0;
				width:100%;
				height:100%;
				background:#000;
				opacity:0.3;
				border-radius:19upx;
			}
		}
	}
}
.rec-des{
	padding: 3vw;
	font-size: 24upx;
	color: #7e7e7e;
	height: 165upx;
	width:94vw;
	margin-bottom: 20upx;
	position:relative;
	background:#fff;
	h4{
		color:#393939;
		font-size:36upx;
	}
	.share{
		position: absolute;
		right:5vw;
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
		bottom:3vw;
		left:3vw;
		width:94vw;
		height:50upx;
		.prize{
			color:#FF8300;
			font-size: 30upx;
			
			margin-right:40upx;
		}
	}
}
.cont{
	background: #fff;
	padding:3vw;
	margin-bottom: 20upx;
}
.agency{
	height:14vw;
	padding: 5vw 0;
	width:100vw;
	background:#fff url(../../static/img/info-arr.png) no-repeat 92vw center;
	background-size: 40upx;
	margin-bottom: 20upx;
	.agency-logo{
		width:14vw;
		height:14vw;
		border-radius: 50%;
		overflow: hidden;
		margin-right:2vw;
		margin-left:3vw;
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
	
	background:#fff;
	h6{
		font-size: 30upx;
		color: #393939;
		
		padding:40upx 0
	}
	padding-bottom:200upx;
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
dl{
	background: url(../../static/img/info-arr.png) no-repeat right center; 
	background-size: 30upx;
	height:68upx;
	line-height:68upx;
			
	dt{
		font-size:28upx;
		color:#7e7e7e;
		display: inline-block;
		width: 100upx;
	}
	dd{
		font-size:28upx;
		color:#343434;
		display: inline;
	}
}
.noIco{
	background: none;
}
.line{
	padding:0 20upx;
}
</style>