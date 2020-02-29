<template>
	<view class="contentbox" >
		<view class='nav'>
			<!-- 导航栏 agents导航栏标题 -->
			<navTab ref="navTab" :tabTitle="tabTitle" @changeTab='changeTab'></navTab>
		</view> 
		<!-- swiper切换 swiper-item表示一页 scroll-view表示滚动视窗 -->		
		<swiper  :current="currentTab" @change="swiperTab" >
			<swiper-item >
				<scroll-view  scroll-y="true" >	
						<ul class="hot-course"> 
							<li  class="shadow inbox" v-for="(item,index) in OfflineCourse" :key="index">
								<view class="">
									<h4 class="a-line">{{item.courseName}}</h4>
									<p class="time">{{item.beginDate}} ～ {{item.endDate}} {{item.startClassTime}}-{{item.endClassTime}}</p>
								</view>
								<view class="des">
									<h5 class="prize">{{item.price ? "¥"+item.price : "免费"}}</h5>
									<text class="hour">共{{item.lesson}}课时</text><text class="line">|</text>
									<text class="number">限{{item.limitStudents}}人</text>
								</view>
								<view @click="goCourseDetail(item.courseId)" class="sign-up">立即报名</view>
							</li>
						</ul>	
				</scroll-view>
				
			</swiper-item>
			<swiper-item >
				<scroll-view  scroll-y="true" >
						222
				</scroll-view>
			</swiper-item>
			<swiper-item >
				<scroll-view  scroll-y="true" >
						333
				</scroll-view>
			</swiper-item>

		</swiper> 
		
	</view>
</template>

<script>


import navTab from '../../components/navTab.vue';
export default {
	components: {navTab},
	data() {
		return {
			currentPage:'index',
			tabTitle:['全部','美术','少儿'], //导航栏格式 --导航栏组件
			currentTab: 0, //sweiper所在页

			OfflineCourse: [] //数据格式
		};
	},
	onLoad: function (options) {
	        setTimeout(function () {
	            console.log('start pulldown');
	        }, 1000);
	        uni.startPullDownRefresh();
			
	    },
	onShow() {
		this.initOfflineCourse();
		this.initCourseCategory();
	},
	onHide() {},
	methods: {
		onPullDownRefresh() {
		    console.log('refresh');
		    setTimeout(function () {
		        uni.stopPullDownRefresh();
		    }, 1000);
		},
		initOfflineCourse() {
			this.$api.OfflineCourse().then(res => {
				this.OfflineCourse = res.data.data; 
			}) 
		},
		initCourseCategory() {
			this.$api.CourseCategory().then(res => {
				/* this.tabTitle.push('全部')				
				this.tabTitle.concat(res.data.data);*/ 
				console.log(this.tabTitle) 
			})  
		},

		goCourseDetail(courseId){
			uni.navigateTo({
				url: `/pages/course/courseDetail?id=`+ courseId,
				success: res => {},
				fail: () => {},
				complete: () => {}
			});
		},
		changeTab(index){
			this.currentTab = index
		},
	
		// swiper 滑动
		swiperTab: function(e) {
			var index = e.detail.current //获取索引
			if(this.tabTitle.length<=4){
				this.$refs.navTab.navClick(index)
			}else{
				this.$refs.navTab.longClick(index)
			}
		},


	}
};
</script>

<style lang="scss">
@import "../../static/style/base.scss";
.contentbox{
	margin-top:10vh;
	
}
	swiper{
		height: 90vh;
		overflow: scroll;
		swiper-item{
			width:100vw;
			height:84vh;
			padding:3vh 0 ;
			overflow: scroll;
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
</style>
