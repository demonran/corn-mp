<template>
	<view class="contentbox">
		<view class='nav'>			
			<!-- 导航栏 agents导航栏标题 -->
			<navTab ref="navTab" :tabTitle="tabTitle" @changeTab='changeTab'></navTab>
		</view>
		<!-- swiper切换 swiper-item表示一页 scroll-view表示滚动视窗 -->		
		<swiper  :current="currentTab" @change="swiperTab">
			<swiper-item v-for="(item,index) in worklist" :key="index">
				<scroll-view  scroll-y="true" @scrolltolower="lower1" scroll-with-animation :scroll-into-view="toView">
			
						<!-- 优秀作品 start -->
					
							<view class="works">
								<ul class="box flex">
									<li @click="goWorkDetail(item.id)" >
										<view class="works-pic">
											<image :src="item.image" mode="widthFix"></image>	
										</view>
										<view class="works-des">
											<h4 class="a-line">{{item.name}}</h4>
											<span>{{item.author}}</span><span class="line">|</span><span>{{item.category.name}}</span>
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
			tabTitle:[], //导航栏格式 --导航栏组件
			currentTab: 0, //sweiper所在页
			worklist: [] //数据格式
		};
	},
	onLoad: function (options) {
	    this.initWorksList()	
		this.initCourseCategory();
	    },
		onShow() {
			uni.pageScrollTo({
			    scrollTop: 0,
			    duration: 300
			});
		},
	methods: {
		initCourseCategory() {
			this.$api.CourseCategory().then(res => {		
				let title =res.data.data
				let tabTitle = []
				//tabTitle.unshift('全部')
				for(var i = 0;i<title.length;i++){				
					var str = title[i].categoryName
					tabTitle.push(str)
				}				
				console.log(tabTitle)
				this.tabTitle = tabTitle				
			})  
		},
		initWorksList(){
			this.$api.worksList().then(res => {
				this.worklist = res.data.data.content;
				console.log(this.worklist)
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
		goWorkDetail:function(id){
			uni.navigateTo({
				url: `/pages/works/worksDetail?id=`+ id,
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
