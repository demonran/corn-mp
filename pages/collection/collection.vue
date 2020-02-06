<template>
	<view class="contentbox">
		<view class='nav'>			
			<!-- 导航栏 agents导航栏标题 -->
			<navTab ref="navTab" :tabTitle="tabTitle" @changeTab='changeTab'></navTab>
		</view>
		<!-- swiper切换 swiper-item表示一页 scroll-view表示滚动视窗 -->		
		<swiper  :current="currentTab" @change="swiperTab">
			<swiper-item >
				<scroll-view  scroll-y="true" @scrolltolower="lower1" scroll-with-animation :scroll-into-view="toView">
			
						<ul class="hot-course">
							<li class="shadow inbox" v-for="(item,index) in list" v-if="list.length > 0" :key="index">
								<view class="">
									<h4 class="a-line">{{item.title}}</h4>
									<p class="time">{{item.time}}</p>
									
								</view>
								<view class="des">
									<h5 class="prize">￥{{item.prize}}</h5>
									<text class="hour">共{{item.hour}}课时</text><text class="line">|</text>
									<text class="number">限{{item.number}}人</text>
								</view>
								<view  class="state">
									<view @click="gostudyDetail" v-show="item.study==1" class="btn1 btn">已报名</view>
									<view @click="gostudyDetail" v-show="item.study==0" class="btn2 btn">立即报名</view>
								</view>
							</li>
						</ul>
		
				</scroll-view>
			</swiper-item>
			<swiper-item class="box">
				<scroll-view  scroll-y="true" @scrolltolower="lower1" scroll-with-animation :scroll-into-view="toView">
			
					<ul class="rec-course">
						<li class="shadow rec-box" v-for="(item,index) in open" v-if="open.length > 0" :key="index"
							@click="goCourseDetail"
						>
							<view class="rec-pic">
								<image class="btn" src="../../static/img/play-btn.png" mode="widthFix"></image>
								<image :src="item.image" mode="widthFix"></image>			
							</view>
							<view class="rec-des" >
								<h4 class="a-line">{{item.title}}</h4>
								<p class="a-line">{{item.des}}</p>
								<view class="bottom">
									<text class="prize fr" >{{item.prize}}</text>
									<text class="fl" >{{item.played}}人已观看</text>
								</view>
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
				
					{
						title:"2019少儿美术周末班0",
						time:"2019.09.01-2019.12.11 周六09：:0-12:00",
						prize:"1680",
						hour:"2",
						number:"35",
						study:0
					},
					{
						title:"2019少儿美术周末班1",
						time:"2019.09.01-2019.12.11 周六09：:0-12:00",
						prize:"1680",
						hour:"12",
						number:"5",
						study:1
					}
				],
			open:[{
						title:"中外美术历史",
						des:"全方位了解中外美术历史，提高素养",
						image:"../../static/img/1.png",
						video:"https://dcloud-img.oss-cn-hangzhou.aliyuncs.com/guide/uniapp/%E7%AC%AC1%E8%AE%B2%EF%BC%88uni-app%E4%BA%A7%E5%93%81%E4%BB%8B%E7%BB%8D%EF%BC%89-%20DCloud%E5%AE%98%E6%96%B9%E8%A7%86%E9%A2%91%E6%95%99%E7%A8%8B@20181126.mp4",
						prize:"免费",
						played:"8327",
					}	,
					{
								title:"中外美术历史",
								des:"全方位了解中外美术历史，提高素养",
								image:"../../static/img/1.png",
								video:"https://dcloud-img.oss-cn-hangzhou.aliyuncs.com/guide/uniapp/%E7%AC%AC1%E8%AE%B2%EF%BC%88uni-app%E4%BA%A7%E5%93%81%E4%BB%8B%E7%BB%8D%EF%BC%89-%20DCloud%E5%AE%98%E6%96%B9%E8%A7%86%E9%A2%91%E6%95%99%E7%A8%8B@20181126.mp4",
								prize:"免费",
								played:"8327",
							}	
				]
	
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
		
	methods: {

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
				
					background-size: 30upx;
					margin-left: 10upx;
					color:#fff;
				}
				.btn2{
					
					background:#ff8300;
				}
				.btn1{
					background: #ccc;
				}
			}
			
		}		
	}
	.rec-course{
		width:90vw;
		
		.rec-box{
			margin-top: 20upx;
			display: flex;
			width:100%;
			height:206upx;	

			overflow: hidden;
			.rec-pic{
				width:45vw;
				height:100%;
				overflow: hidden;
				position: relative;
				float:left;
				
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
				
			}
			.rec-des{
				padding: 2vw;
				font-size: 24upx;
				color: #7e7e7e;
				width:40vw;
				
				position:relative;
				
				h4{
					color:#393939;
					font-size:36upx;
					line-height: 200%;
				}
				.bottom{
					position:absolute;
					bottom:10upx;
					left:2vw;
					width:40vw;
					height:50upx;
					.prize{
						color:#FF8300;
						font-size: 30upx;
						
					}
					.line{
						padding:0 20upx;
					}
				}
				
			}
		}
	}
</style>
