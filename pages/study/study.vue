<template>
	<view class="contentbox">
		<view class='nav'>			
			<!-- 导航栏 agents导航栏标题 -->
			<navTab ref="navTab" :tabTitle="tabTitle" @changeTab='changeTab'></navTab>
		</view> 
		<!-- swiper切换 swiper-item表示一页 scroll-view表示滚动视窗 -->		
		<swiper  :current="currentTab" @change="swiperTab">
			<swiper-item v-for="(listItem,listIndex) in list" :key="listIndex">
				<scroll-view  scroll-y="true" @scrolltolower="lower1" scroll-with-animation :scroll-into-view="toView">
			
						<ul class="hot-course">
							<li class="shadow inbox" v-for="(item,index) in listItem" v-if="listItem.length > 0" :key="index">
								<view class="">
									<h4 class="a-line">{{item.title}}</h4>
									<p class="time">{{item.time}}</p>
									
									<view v-show="item.study==0" class="icon">学习中</view>
									<view v-show="item.study==1" class="icon studied">已学完</view>
								</view>
								<view class="des">
									<h5 class="prize">{{item.name}}</h5>
									<text class="hour">已上课时:{{item.hour}}</text><text class="line">|</text>
									<text class="number">剩余:{{item.number}}</text>
								</view>
								<view  class="state">
									<view @click="gostudyRecord"  class="btn">查看记录</view>
									<view @click="gostudyDetail" v-show="item.study==1" class="btn2 btn">再次报名</view>
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
			tabTitle:['线下课','公开课'], //导航栏格式 --导航栏组件
			currentTab: 0, //sweiper所在页
			toView:'',//回到顶部id
			list: [
				[
					{
						title:"2019少儿美术周末班0",
						time:"2019.09.01-2019.12.11 周六09：:0-12:00",
						name:"小李",
						hour:"2",
						number:"35",
						study:0
					},
					{
						title:"2019少儿美术周末班1",
						time:"2019.09.01-2019.12.11 周六09：:0-12:00",
						name:"王星",
						hour:"12",
						number:"5",
						study:1
					}
				],
				[
					{
						title:"2019少儿美术周末班1",
						time:"2019.09.01-2019.12.11 周六09：:0-12:00",
						name:"王星",
						hour:"12",
						number:"5",
						study:1
					}
				],
			] //数据格式
		};
	},
	onLoad: function (options) {
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
		gostudyDetail:function(){
			uni.navigateTo({
				url: 'studyDetail',
				success: res => {},
				fail: () => {},
				complete: () => {}
			});
		},
		gostudyRecord:function(){
			uni.navigateTo({
				url: 'studyRecord',
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
		height:100vh;
	}
	.hot-course{
		li{
			position: relative;
			border-radius: 8upx;
			margin-bottom: 3vw;
			h4{
				font-size: 36upx;;
			}
			.icon{
				font-size:24upx;
				background: #fee6cd;
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
				background: #ebebeb;
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
