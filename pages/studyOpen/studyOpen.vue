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
						<ul class="rec-course">
							<li class="shadow rec-box" v-for="(item,index) in listItem" v-if="listItem.length > 0" :key="index"
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
										<text class="prize fl" >{{item.prize}}</text>
										<text class="fr" >
											<text>{{item.course}}</text><text class="line">|</text><text>{{item.played}}人已观看</text>
										</text>
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
const util = require('../../utils/util.js');
import navTab from '../../components/navTab.vue';
export default {
	components: {navTab},
	data() {
		return {
			currentPage:'index',
			tabTitle:['全部','分类1','分类2'], //导航栏格式 --导航栏组件
			currentTab: 0, //sweiper所在页
			toView:'',//回到顶部id
			pages:[1,1,1,1], //第几个swiper的第几页
			list: [
				[
					{
						title:"中外美术历史",
						des:"全方位了解中外美术历史，提高素养",
						image:"../../static/img/1.png",
						video:"https://dcloud-img.oss-cn-hangzhou.aliyuncs.com/guide/uniapp/%E7%AC%AC1%E8%AE%B2%EF%BC%88uni-app%E4%BA%A7%E5%93%81%E4%BB%8B%E7%BB%8D%EF%BC%89-%20DCloud%E5%AE%98%E6%96%B9%E8%A7%86%E9%A2%91%E6%95%99%E7%A8%8B@20181126.mp4",
						prize:"免费",
						course:"美术课程",
						played:"8327",
					},
					{
						title:"中外美术历史",
						des:"全方位了解中外美术历史，提高素养",
						image:"../../static/img/1.png",
						video:"https://dcloud-img.oss-cn-hangzhou.aliyuncs.com/guide/uniapp/%E7%AC%AC1%E8%AE%B2%EF%BC%88uni-app%E4%BA%A7%E5%93%81%E4%BB%8B%E7%BB%8D%EF%BC%89-%20DCloud%E5%AE%98%E6%96%B9%E8%A7%86%E9%A2%91%E6%95%99%E7%A8%8B@20181126.mp4",
						prize:"免费",
						course:"美术课程",
						played:"8327",
					}
				],
				[
					{
						title:"中外美术历史",
						des:"全方位了解中外美术历史，提高素养",
						image:"../../static/img/1.png",
						video:"https://dcloud-img.oss-cn-hangzhou.aliyuncs.com/guide/uniapp/%E7%AC%AC1%E8%AE%B2%EF%BC%88uni-app%E4%BA%A7%E5%93%81%E4%BB%8B%E7%BB%8D%EF%BC%89-%20DCloud%E5%AE%98%E6%96%B9%E8%A7%86%E9%A2%91%E6%95%99%E7%A8%8B@20181126.mp4",
						prize:"免费",
						course:"美术课程",
						played:"8327",
					}
				],
				[
					{
						title:"中外美术历史",
						des:"全方位了解中外美术历史，提高素养",
						image:"../../static/img/1.png",
						video:"https://dcloud-img.oss-cn-hangzhou.aliyuncs.com/guide/uniapp/%E7%AC%AC1%E8%AE%B2%EF%BC%88uni-app%E4%BA%A7%E5%93%81%E4%BB%8B%E7%BB%8D%EF%BC%89-%20DCloud%E5%AE%98%E6%96%B9%E8%A7%86%E9%A2%91%E6%95%99%E7%A8%8B@20181126.mp4",
						prize:"免费",
						course:"美术课程",
						played:"8327",
					}
				]
			] //数据格式
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
			uni.pageScrollTo({
			    scrollTop: 0,
			    duration: 300
			});
		},
	methods: {
		goCourseDetail:function(){
			uni.navigateTo({
				url: 'openDetail',
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
		height:120vh;
	}
	.rec-course{
		width:90vw;
		
		.rec-box{
			margin-top: 20upx;
			display: inline-block;
			width:100%;
			height:600upx;	
			margin-left: 5vw;
			border-radius: 10upx;
			overflow: hidden;
			.rec-pic{
				width:100%;
				height:395upx;
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
				
			}
			.rec-des{
				padding: 3vw;
				font-size: 24upx;
				color: #7e7e7e;
				height: 165upx;
				width:78vw;
				position:relative;
				h4{
					color:#393939;
					font-size:36upx;
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
					.line{
						padding:0 20upx;
					}
				}
				
			}
		}
	}
</style>
