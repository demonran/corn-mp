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
			
					<view class="activity">
						<ul class="box">
							<li @click="goActivityDetail" class="shadow " v-for="(item,index) in listItem" :key="index">
								<view class="activity-pic">
									<image :src="item.image" mode="widthFix"></image>	
								</view>
								<view class="des">
									<h4 class="title">{{item.title}}</h4>
									<view class="cont">{{item.des}}</view>
									<span>{{item.classify}}</span><span class="line">|</span><span>{{item.date}}</span>
								</view>
							</li>
						</ul>
					</view>
					
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
			tabTitle:['全部','新闻','活动'], //导航栏格式 --导航栏组件
			currentTab: 0, //sweiper所在页
			toView:'',//回到顶部id
			list: [
				[
					{
						image:"../../static/img/w5.png",
						title:"中央积极投身粤港澳大湾区建设",
						des:"2019年2月18日，中共中央、国务院印发了《粤港澳大湾区发展规划纲要》全文中共中央、国务院印发了《粤港澳大湾区发展规划纲要》全文 ",
						classify:"机构新闻",
						date:"2019-02-16"
					},
					{
						image:"../../static/img/w5.png",
						title:"中央积极投身粤港澳大湾区建设",
						des:"2019年2月18日，中共中央、国务院印发了《粤港澳大湾区发展规划纲要》全文中共中央、国务院印发了《粤港澳大湾区发展规划纲要》全文 ",
						classify:"机构新闻",
						date:"2019-02-16"
					}
				],
				[
					{
						image:"../../static/img/w5.png",
						title:"中央积极投身粤港澳大湾区建设",
						des:"2019年2月18日，中共中央、国务院印发了《粤港澳大湾区发展规划纲要》全文中共中央、国务院印发了《粤港澳大湾区发展规划纲要》全文 ",
						classify:"机构新闻",
						date:"2019-02-16"
					}
				],
				[
					{
						image:"../../static/img/w5.png",
						title:"中央积极投身粤港澳大湾区建设",
						des:"2019年2月18日，中共中央、国务院印发了《粤港澳大湾区发展规划纲要》全文中共中央、国务院印发了《粤港澳大湾区发展规划纲要》全文 ",
						classify:"机构新闻",
						date:"2019-02-16"
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
		
		goActivityDetail:function(){
			uni.navigateTo({
				url: '../activity/activityDetail',
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
.activity{
	padding-top: 40upx;
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
