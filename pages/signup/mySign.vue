<template>
	<view class="contentbox">
		<view class='nav'>			
			<!-- 导航栏 agents导航栏标题 -->
			<navTab ref="navTab" :tabTitle="tabTitle" @changeTab='changeTab'></navTab>
		</view>
		<!-- swiper切换 swiper-item表示一页 scroll-view表示滚动视窗 -->		
		<swiper  :current="currentTab" @change="swiperTab">
			<swiper-item>
				<scroll-view  scroll-y="true" @scrolltolower="lower1" scroll-with-animation :scroll-into-view="toView">
			
						<ul class="hot-course">
							<li class="inbox" v-for="(item,index) in list" v-if="list.length > 0" :key="index">
								<view class="">
									<h4 class="a-line">{{item.courseInfo.courseName}}</h4>
									<p class="time">{{item.time}}</p>
									
									<view v-show="item.study==0" class="icon">待支付</view>
									<view v-show="item.study==1" class="icon studied">已支付</view>
									<view v-show="item.study==2" class="icon studied">已学完</view>
								</view>
								<view class="des">
									<h5 class="prize">{{item.totalAmount}}</h5>
									<text class="hour">共{{item.courseInfo.lesson}}课时</text><text class="line">|</text>
									<text class="number">限{{item.courseInfo.limitStudents}}人</text>
								</view>
								<view  class="state">
									<view @click="gostudyDetail" v-show="item.study==1||item.study==2" class="btn">查看记录</view>
									<view @click="goSignUp" v-show="item.study==2" class="btn2 btn">报名续费</view>
									<view @click="goMySignDetail" v-show="item.study==0" class="btn2 btn">去支付</view>
								</view>
							</li>
						</ul>
		
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
			tabTitle:["全部",'已支付','未支付','已完成'], //导航栏格式 --导航栏组件
			currentTab: 0, //sweiper所在页
			toView:'',//回到顶部id
			list: [] //数据格式
		};
	},
	onLoad: function (options) {
		
	        setTimeout(function () {
	            console.log('start pulldown');
	        }, 1000);
	        uni.startPullDownRefresh();
			
			
	    },
	    onPullDownRefresh() {
	        console.log('refresh');
	        setTimeout(function () {
	            uni.stopPullDownRefresh();
	        }, 1000);
	    },
		onShow() {
			this.initMyOrders();
			uni.pageScrollTo({
			    scrollTop: 0,
			    duration: 300
			});
		},
	methods: {
		initMyOrders(){
			this.$api.myOrders().then(res => {
				this.list = res.data.data; 
			}) 
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
		goMySignDetail:function(){
			uni.navigateTo({
				url: 'mySignDetail',
				success: res => {},
				fail: () => {},
				complete: () => {}
			});
		}
	}
};
</script>

<style lang="scss">
@import "../../static/style/base.scss";
.contentbox{
	margin-top:140upx;
}
	swiper{
		height: 90vh;
		overflow: scroll;
		swiper-item{
			width:100vw;
			height:84vh;
			overflow: scroll;
			.no-data{
				text-align: center;
				margin-top:50upx;
			}
		}
	}
	.hot-course{
		li{
			position: relative;
			border-radius: 8upx;
			
			border-bottom: 1px solid #eee;
			h4{
				font-size: 36upx;;
			}
			.icon{
				font-size:24upx;
				color: #FF8300;
				width:88upx;
				height: 36upx;
				border-radius:18upx 0 0 18upx;
				position: absolute;
				right:0;
				top:3vw;
				text-align: center;
			}
			.studied{
				color: #9e9e9e;
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
					padding:0 20upx;
				}
				.prize{
					font-size:36upx;
					color:#f8962e;
				}
			}
			.state{
				position: absolute;
				right: 3vw;
				bottom:3vw;
				.btn{
					float:right;
					width:148upx;
					height:54upx;
					line-height:54upx;
					border-radius: 8upx;
					text-align: center;
					font-size: 24upx;
					color:#ff8300;
					border: 1px solid #ff8300;
					background-size: 30upx;
					margin-left: 10upx;
				}
				.btn2{
					color:#fff;
					background:#ff8300;
				}
			}
			
		}		
	}
</style>
