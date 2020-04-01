<template>
	<view class="content">
		<!-- banner start -->
		<swiper class="banner" :indicator-dots="true" autoplay="true" circular="true" interval="3000" previous-margin="25" next-margin="25">
			<swiper-item  v-for="(item,index) in banner" :key="index" >
				<view class="pic" @click="goBanner(item.link)">
					<image :src="item.image" mode="widthFix"></image>
				</view>
			</swiper-item>
		</swiper>
		<!-- banner end -->
		<!-- nav start -->
<!-- 		<view class="nav-list flex">
			<view class="nav-box"  hover-class="nav-hover" v-for="(item,index) in nav" :key="index">
				<navigator :url="item.link">
					<image :src="item.image"></image>
					<view class="text">{{item.title}}</view>
				</navigator>					
			</view>
		</view> -->
		<!-- nav end -->
		<!-- nav start -->
				<view class="nav-list flex">
					<view class="nav-box"  hover-class="nav-hover" v-for="(item,index) in nav" :key="index">
						<navigator :url="item.goUrl">
							<image :src="item.image"></image>
							<view class="text">{{item.title}}</view>
						</navigator>					
					</view>
				</view>
				<!-- nav end -->
		<!-- 培训机构信息 start -->
		<view class="section" @tap="goAbout">
			<view class="agency flex inbox shadow">
				<view class="agency-logo">
					<image class="null" :src="trainAgency.image"></image>
				</view>
				<view class="agency-des">
					<h1 class="a-line">{{trainAgency.name}}</h1>
					<text class="a-line">{{trainAgency.address}}</text>
				</view>
			</view>
		</view>
		<!-- 培训机构信息 end -->
		<!-- 推荐公开课 start -->
		<view class="section">
			<view class="box head">
				<h3 class="Btitle fl">推荐公开课</h3>
				<p class="more fr" @click="goStudyOpen()">更多</p>				
			</view>
			<scroll-view class="rec-course "  scroll-x="true" >
				<view @click="goOpenDetail(item.id)" class="shadow rec-box" v-for="(item,index) in recommendCourse" :key="index">
					<view class="rec-pic">
						<image class="btn" src="../../static/img/play-btn.png" mode="widthFix"></image>
						<image :src="item.cover" mode="widthFix"></image>
						<text class="prize">{{item.price ? "¥"+item.price : "免费"}}</text>
					</view>
					<view class="rec-des">
						<h4 class="a-line">{{item.title}}</h4>
						<p class="a-line">{{item.subTitle}}</p>
					</view>
				</view>
			</scroll-view>						
		</view>
		<!-- 推荐公开课 end -->
		<!-- 热门线下课 start -->
		<view class="section">
			<view class="box head">
				<h3 class="Btitle">热门线下课</h3>
			</view>
			<view class="hot-course">
				<ul>
					<li class="shadow inbox" v-for="(item,index) in hotCourse" :key="index">
						<view class="">
							<h4>{{item.courseName}}</h4>
							<p class="time">{{item.beginDate}} ～ {{item.endDate}}</p>
						</view>
						<view class="des">
							<h5 class="prize">{{item.totalAmount ? "¥"+item.totalAmount : "免费"}}</h5>
							<text class="hour">共{{item.lesson}}课时</text><text class="line">|</text>
							<text class="number">限{{item.limitStudents}}人</text>
						</view>
						<view @click="goCourseDetail(item.courseId)" class="sign-up">立即报名</view>
					</li>
				</ul>
				<view class="all-btn" @click="goCourse">
					全部课程
				</view>
			</view>
		</view>	
		<!-- 热门线下课 end -->
		<!-- 优秀作品 start -->
		<view class="section">
			<view class="box head">
				<h3 class="Btitle">优秀作品</h3>
			</view>
			<view class="works">
				<ul class="box flex">
					<li v-for="(item,index) in works" :key="index" 
					@click="goWorkDetail(item.id)" >
						<view class="works-pic">
							<image :src="item.image" mode="widthFix"></image>	
						</view>
						<view class="works-des">
							<h4 class="a-line">{{item.name}}</h4>
							<span>{{item.author}}</span><span class="line">|</span><span>{{item.category.name}}</span>
						</view>
					</li>
				</ul>
				<view class="all-btn" @click="goWorks">
					全部作品
				</view>
			</view>
		</view>	
		<!-- 优秀作品 end -->
		<!-- 最新活动 start -->
		<view class="section">
			<view class="box head">
				<h3 class="Btitle fl">最新活动</h3>
				<p class="more fr" @click="goActivity">更多</p>				
			</view>
			<view class="activity">
				<ul class="box">
					<li @click="goActivityDetail(item.id)" class="shadow " v-for="(item,index) in activity" :index="index">
						<view class="activity-pic">
							<image :src="item.cover" mode="widthFix"></image>	
						</view>
						<view class="des">
							<h4 class="title">{{item.title}}</h4>
							<view class="cont" v-html="item.description"></view>
							<span>{{item.category.name}}</span><span class="line">|</span><span>{{item.createdAt}}</span>
						</view>
					</li>
				</ul>
			</view>
		</view>	
		<!-- 最新活动 end -->
		
	</view>
</template>

<script>
	
	export default {
		data() {
			
			return {

				banner: [],
				trainAgency:[],
				recommendCourse:[],
				hotCourse:[],
				works:[],
				activity:[],
				nav:[
						{
							title:"公开课",
							image:"../../static/img/nav1.png",
							goUrl:"../studyOpen/studyOpen"
						},{
							title:"优秀教师",
							image:"../../static/img/nav2.png",
							goUrl:"../teacher/teacher"
						},{
							title:"作品展示",
							image:"../../static/img/nav3.png",
							goUrl:"../works/workslist"
						},{
							title:"最新活动",
							image:"../../static/img/nav7.png",
							goUrl:"../activity/activity"
						},
					],
			}
		},

		onLoad() {
			this.initBanner()
			this.initRecommendCourse() 
			this.initHotOfflineCourse();
			this.initWorks();
			this.getOrganization();
			this.initArticle();
			
			setTimeout(function () {
			    console.log('start pulldown');
			}, 1000);
			uni.startPullDownRefresh();
		},

		methods: {
			onPullDownRefresh() {
			    console.log('refresh');
			    setTimeout(function () {
			        uni.stopPullDownRefresh();
			    }, 1000);
			},
			getOrganization(){
				this.$api.organization().then(res => {
					this.trainAgency = res.data.data;
				})
			},
			initArticle() {
				this.$api.articleRecommend().then(res => {
					this.activity = res.data.data;
					console.log('active',this.activity)
				})
			},
			initWorks() {
				this.$api.worksRecommend().then(res => {
					this.works = res.data.data;
				})
			},
			initBanner() {
				this.$api.banner().then(res => {
					this.banner = res.data.data;
				})
			},
			goBanner(link){
				
				/* plus.runtime.openURL(link, function(res) {  
				    console.log(res);  
				}); */ 
				/* uni.navigateTo({
					url: link,
					success: res => {},
					fail: () => {},
					complete: () => {
						console.log(link)
					}
				}); */
				
			},
			initRecommendCourse() { 
				this.$api.recommendCourse().then(res => {
					this.recommendCourse = res.data.data;
				})
			}, 
			initHotOfflineCourse() {
				this.$api.hotOfflineCourse().then(res => {
					this.hotCourse = res.data.data; 
				}) 
			},

			goCourse:function(){
				uni.switchTab({
					url: '../course/course',
					success: res => {},
					fail: (e) => {console.log(e)},
					complete: () => {}
				});
			},
			goCourseDetail:function(id){						 
				 uni.navigateTo({	 
					url: `/pages/course/courseDetail?id=`+id,
					success: res => {},
					fail: () => {},
					complete: () => {}
				}); 
			},
			goOpenDetail:function(id){
				uni.navigateTo({
					url: `../studyOpen/openDetail?id=${id}`,
					success: res => {},
					fail: () => {},
					complete: () => {}
				});
			},
			goAbout:function(){
				uni.navigateTo({
					url:'../mine/about'
				})
			},
			goStudyOpen:function(){
				uni.navigateTo({
					url:'../studyOpen/studyOpen'
				})
			},
			goWorks:function(){
				//uni.navigateTo({
				uni.switchTab({
					url: '../works/works',
					success: res => {},
					fail: () => {},
					complete: () => {}
				});
			},
			goWorkDetail:function(id){
				uni.navigateTo({
					url: `/pages/works/worksDetail?id=`+ id,
					success: res => {},
					fail: () => {},
					complete: () => {}
				});
			},
			goActivity:function(){
				uni.navigateTo({
					url: '../activity/activity',
					success: res => {},
					fail: () => {},
					complete: () => {}
				});
			},
			goActivityDetail:function(id){
				uni.navigateTo({
					url: `/pages/activity/activityDetail?id=`+ id,
					success: res => {},
					fail: () => {},
					complete: () => {}
				});
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import "../../static/style/base.scss";

	.banner{
		height: 320upx;
		.pic{
			width:610upx;
			height:310upx;
			display:block;
			border-radius: 8upx;
			overflow: hidden;
			image{
				width:100%;
				height:100%;
				}
		}
	}
	.nav-list{
		height: 150upx;
		justify-content: space-around;
		text-align: center;
		font-weight: bold;
		image{
			width: 72upx;
			height: 73upx;
			margin-top: 50upx;
		}
		.nav-box{
			width:25%;
			height: 100%;
			color: #4b4b4b;
			font-size: 26upx;
		}
	}
	.section{
		margin-top: 60upx;
		width:100%;
		height: auto;
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
				font-size: 38upx;
				color:#393939;
			}
			text{
				font-size: 24upx;
				color: #7e7e7e;
			}
		}

	}
	.box{
		color:#4b4b4b;
		.Btitle{
			font-size:30upx;	
			font-weight: bold;
		}
		.more{
			font-size: 24upx;
			background: url(../../static/img/info-arr.png) no-repeat right center;
			background-size:30upx;
			padding-right: 40upx;
		}
	}
	.head{
		padding-bottom: 20upx;
	}
	.rec-course{
		height:368upx;
		width:100vw;
		white-space: nowrap;
		.rec-box{
			margin-top: 20upx;
			display: inline-block;
			width:365upx;
			height:328upx;	
			margin-left: 5vw;
			border-radius: 10upx;
			overflow: hidden;
			.rec-pic{
				width:100%;
				height:206upx;
				overflow: hidden;
				position: relative;
				.btn{
					position:absolute;
					width:80upx;
					hegiht:80upx;
					left:50%;
					top:50%;
					margin-top:-40upx;
					margin-left:-40upx;
					z-index:0;
				}
				.prize{
					width:88upx;
					height:36upx;
					line-height:36upx;
					background:#f6613c;
					opacity: 0.9;
					border-radius:8upx 0 8upx 0;
					color:#fff;
					font-size: 20upx;
					text-align: center;
					position: absolute;
					top:0;
					left:0;
					z-index:2;
				}
			}
			.rec-des{
				padding: 20upx;
				font-size:30upx;
				p{
					font-size: 22upx;
					color: #7e7e7e;
				}
			}
		}
	}
	.hot-course{
		li{
			position: relative;
			border-radius: 8upx;
			margin-bottom: 3vw;
			h4{
				font-size: 36upx;;
			}
			.time{
				font-size:24upx;
				color:#7e7e7e;
			}
			.des{
				font-size:24upx;
				color:#7e7e7e;
				margin-top:20upx;
				.line{
					color:#d8d8d8;
					font-size:18upx;
					padding:0 40upx;
				}
				.prize{
					font-size:36upx;
					color:#f8962e;
				}
			}
			.sign-up{
				position: absolute;
				right: 3vw;
				bottom:3vw;
				width:177upx;
				height:54upx;
				line-height:54upx;
				border-radius: 8upx;
				text-align: center;
				font-size: 24upx;
				color:#fff;
				background:#ff8300 url(../../static/img/arr-white.png) no-repeat 140upx center;
				background-size: 30upx;
			}
		}		
	}
	.all-btn{
		color:#ff8300;
		font-size:24upx;
		border: 1px solid #ff8300;
		border-radius: 30upx;
		display: block;
		width:218upx;
		height: 60upx;
		line-height: 60upx;
		text-align:center;
		margin:0 auto;
		background: url(../../static/img/arr-orange.png) no-repeat 170upx center;
		background-size:30upx;
	}
	.title{
		font-size:30upx;
		color:#393939;
	}
	.line{
		font-size:12upx;
		padding:0 20upx;
	}
	.works{
		ul{
			flex-wrap:wrap;
			justify-content: space-between;
			li{
				width:320upx;
				height:auto;
				overflow:hidden;
				margin-bottom: 40upx;
				.works-pic{
					width:320upx;
					height:310upx;
					border-radius: 8upx;
					background: #eee;
					overflow:hidden;
					margin-bottom:30upx;
				}
				span{
					font-size:24upx;
					color:#acacac;
					
				}
			}
		}
	}
	.activity{
		padding-top: 40upx;
		padding-bottom: 110upx;
		li{
			margin-bottom: 5vw;
			border-radius: 8upx;
			overflow: hidden;
			.activity-pic{
				height:390upx;
				width:100%;
				overflow:hidden;
			}
			.title{
				marign-bottom:20upx;
			}
			.des{
				font-size:24upx;
				color:#7e7e7e;
				padding:20upx;
				.cont{
					marign:20upx 0;
					height: 70upx;
					text-overflow: ellipsis;
					overflow:hidden;
					white-space: normal;
				}
			}
			span{
				font-size:18upx;
				color:#acacac;
				
			}
		}
	}
	
</style>
