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
			
						<!-- 优秀作品 start -->
					
							<view class="works">
								<ul class="box flex">
									<li @click="goWorkDetail" v-for="(item,index) in listItem" :key="index">
										<view class="works-pic">
											<image :src="item.image" mode="widthFix"></image>	
										</view>
										<view class="works-des">
											<h4 class="a-line">{{item.title}}</h4>
											<span>{{item.author}}</span><span class="line">|</span><span>{{item.classify}}</span>
										</view>
									</li>
								</ul>
							
							</view>
		
						<!-- 优秀作品 end -->
		
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
			tabTitle:['全部','分类1','分类2','分类3'], //导航栏格式 --导航栏组件
			currentTab: 0, //sweiper所在页
			list: [
				[
					{
						image:"../../static/img/w1.png",
						title:"作品名称",
						author:"作者姓名",
						classify:"分类1"
					},
					{
						image:"../../static/img/w2.png",
						title:"作品名称",
						author:"作者姓名",
						classify:"分类1"
					}
				],
				[
					{
						image:"../../static/img/w3.png",
						title:"作品名称",
						author:"作者姓名",
						classify:"分类1"
					}
				],
				[
					{
						image:"../../static/img/w3.png",
						title:"作品名称",
						author:"作者姓名",
						classify:"分类1"
					}
				],
				[
					{
						image:"../../static/img/w3.png",
						title:"作品名称",
						author:"作者姓名",
						classify:"分类1"
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
		goWorkDetail:function(){
			uni.navigateTo({
				url: 'worksDetail',
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
		height:150vh;
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
</style>
