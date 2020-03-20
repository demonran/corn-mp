<template>
	<view class="contentbox">
		<view class='nav'>			
			<!-- 导航栏 agents导航栏标题 -->
			<navTab ref="navTab" :tabTitle="tabTitle" @changeTab='changeTab'></navTab>
		</view>
		<!-- swiper切换 swiper-item表示一页 scroll-view表示滚动视窗 -->		
		<swiper  :current="currentTab" @change="swiperTab">
			<swiper-item v-for="(page,i) in tabTitle.length">
				<view class="no-data" v-show="noData==true">
					暂时没有数据
				</view>
				<scroll-view  scroll-y="true" @scrolltolower="lower1" scroll-with-animation :scroll-into-view="toView">
			
						<!-- 优秀作品 start -->
					
							<view class="works">
								<ul class="box flex">
									<li @click="goWorkDetail(item.id)" v-for="(item,index) in worklist" :key="index">
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
			worklist: [] ,//数据格式
			noData:false
		};
	},
	onLoad: function (options) {
	    this.initWorksList('')	
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
				let tab =res.data.data
				let tabTitle = []				
				tab.unshift({categoryName:'全部',categoryId:''})
				for(var i = 0;i<tab.length;i++){				
					var str = tab[i].categoryName
					tabTitle.push(str)
				}				
				this.tabTitle = tabTitle	
				this.tab = tab
				console.log('tab:',this.tab)			
			})  
		},
		initWorksList(id){
			let _this = this;
			console.log('栏目id',id)
			let arr = []
			this.$api.worksList(id).then(res => {
				_this.worklist = res.data.data.content;
				for(var i = 0;i<_this.worklist.length;i++){
					arr = _this.worklist[i]					
				}			
				_this.worklist.concat(arr)
				if(_this.worklist.length == 0){
					_this.noData = true
				}else{
					_this.noData = false
				}
				console.log('this.worklist',this.worklist)
			})
		},
		changeTab(index){
			this.currentTab = index
			let id = this.tab[index].categoryId
			this.initWorksList(id)	
		},
	
		// swiper 滑动
		swiperTab: function(e) {
			var index = e.detail.current //获取索引
			let id = this.tab[index].categoryId
			if(this.tabTitle.length<=4){
				this.$refs.navTab.navClick(index)
			}else{
				this.$refs.navTab.longClick(index)
			}
			this.initWorksList(id)	
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
