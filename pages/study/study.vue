<template>
	<view class="contentbox">
		<!-- <uni-segmented-control :current="current" :values="tabTitle" @clickItem="changeTab" style-type="text" activeColor="#ff8300"></uni-segmented-control> -->
		<view class="no-data inbox" v-show="noData==true">
			<view class="pic">
				<image src="../../static/img/null.png" mode="widthFix"></image>
			</view>
			<view class="">您还没有相关学习</view>
			<navigator class="btn" url="../course/course" open-type="switchTab">去选课</navigator>
		</view>
		<scroll-view scroll-y="true" @scrolltolower="lower1" scroll-with-animation :scroll-into-view="toView">

			<ul class="hot-course">
				<li class="shadow inbox" v-for="(item,index) in list" v-if="list.length > 0" :key="index">
					<view class="">
						<h4 class="a-line">{{item.courseName}}</h4>
						<p class="time">{{item.studyTime}}</p>

						<view v-if="item.status=='STUDYING'" class="icon">学习中</view>
						<view v-else class="icon studied">已学完</view>
					</view>
					<view class="des">
						<h5 class="prize">{{item.studentName}}</h5>
						<text class="hour">已上课时:{{item.studiedLesson}}</text><text class="line">|</text>
						<text class="number">剩余:{{item.totalLesson - item.studiedLesson}}</text>
					</view>
					<view class="state">
						<view @click="gostudyRecord(item.id)" class="btn">查看记录</view>
						<view @click="gostudyDetail" v-show="item.study==1" class="btn2 btn">再次报名</view>
					</view>
				</li>
			</ul>

		</scroll-view>

	</view>
</template>

<script>
	import navTab from '../../components/navTab.vue';
	import courseStudyRes from '@/api/course-study.js'
	export default {
		components: {
			navTab
		},
		data() {
			return {
				currentPage: 'index',
				tabTitle: ['线下课', '公开课'], //导航栏格式 --导航栏组件
				currentTab: 0, //sweiper所在页
				toView: '', //回到顶部id
				list: [] ,//数据格式
				noData:false
			};
		},
		onLoad: function(options) {
			this.fetchCourseStudy()

		},


		methods: {
			fetchCourseStudy() {
				courseStudyRes.list().then(res => {
					this.list = res.data;
					if(res.data == ''){
						this.noData = true
					}else{
						this.noData = false
					}
				})
			},
			onPullDownRefresh() {
				this.fetchCourseStudy();
				setTimeout(function() {
					uni.stopPullDownRefresh();
				}, 1000);
			},
			changeTab(index) {
				this.currentTab = index
			},

			// swiper 滑动
			swiperTab: function(e) {
				var index = e.detail.current //获取索引
				if (this.tabTitle.length <= 4) {
					this.$refs.navTab.navClick(index)
				} else {
					this.$refs.navTab.longClick(index)
				}
			},
			gostudyDetail: function() {
				uni.navigateTo({
					url: 'studyDetail',
					success: res => {},
					fail: () => {},
					complete: () => {}
				});
			},
			gostudyRecord(id) {
				console.log(id)
				this.$navigateTo(`studyRecord?id=${id}`);
			},
	
		}
	};
</script>

<style lang="scss">
	@import "../../static/style/base.scss";
.contentbox{
	margin-top:10vh;
	
}
.no-data{
	text-align: center;
	margin-top:50upx;
	color:#666;
	.pic{
		width:50%;
		margin:50upx auto;
	}
	.btn{
		border-radius: 16upx;
		height:88upx;
		line-height: 88upx;
		text-align: center;
		font-size: 30upx;
		color: #fff;
		background: #ff8300;
		margin:40upx 0;
	}
}
	swiper{
		height: 90vh;
		overflow: scroll;
		swiper-item{
			width:100vw;
			height:84vh;
			margin-top:2vh;
			overflow: scroll;
			
		}
	}
	.hot-course {
		li {
			position: relative;
			border-radius: 8upx;
			margin-bottom: 3vw;

			h4 {
				font-size: 36upx;
				;
			}

			.icon {
				font-size: 24upx;
				background: #fee6cd;
				color: #FF8300;
				width: 88upx;
				height: 36upx;
				border-radius: 18upx 0 0 18upx;
				position: absolute;
				right: 0;
				top: 3vw;
				text-align: center;
			}

			.studied {
				color: #9e9e9e;
				background: #ebebeb;
			}

			.time {
				font-size: 24upx;
				color: #7e7e7e;
			}

			.des {
				font-size: 24upx;
				color: #7e7e7e;
				margin-top: 20upx;

				.line {
					color: #d8d8d8;
					font-size: 18upx;
					padding: 0 20upx;
				}

				.prize {
					font-size: 36upx;
					color: #f8962e;
				}
			}

			.state {
				position: absolute;
				right: 3vw;
				bottom: 3vw;

				.btn {
					float: right;
					width: 148upx;
					height: 54upx;
					line-height: 54upx;
					border-radius: 8upx;
					text-align: center;
					font-size: 24upx;
					color: #ff8300;
					border: 1px solid #ff8300;
					background-size: 30upx;
					margin-left: 10upx;
				}

				.btn2 {
					color: #fff;
					background: #ff8300;
				}
			}

		}
	}
</style>
