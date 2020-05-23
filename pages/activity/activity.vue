<template>  
	<view class="contentbox">
		<view class='nav'>	
			<!-- 导航栏 agents导航栏标题 -->
			<navTab ref="navTab" :tabTitle="tabTitle" @changeTab='changeTab'></navTab>
		</view> 
		<!-- swiper切换 swiper-item表示一页 scroll-view表示滚动视窗 -->	
		<swiper  :current="currentTab" @change="swiperTab">
			<swiper-item v-for="(page,i) in tabTitle.length" :key="i">
				<view class="no-data" v-show="noData==true">
					暂时没有数据
				</view>
				<scroll-view  scroll-y="true" >	
					
						 <ul class=" activity">
							<li @click="goActivityDetail(item.id)" class="shadow inbox"  v-for="(item,index) in listItem":key="index">
								<view class="activity-pic">
									<image :src="item.cover" mode="widthFix"></image>	
								</view>
								<view class="des">
									<h4 class="title">{{item.title}}</h4>
									<view class="cont" v-html="item.description"></view>
									<span>{{item.category.name}}</span><span class="line">|</span><span>{{item.createdAt}}</span>
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
			tabTitle:[], //导航栏格式 --导航栏组件
			currentTab: 0, //sweiper所在页
			toView:'',//回到顶部id
			listItem:[],
			noData:false
	
		};
	},

    onLoad: function (options) {
		this.initCourseCategory();
		this.getList('')
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
			uni.startPullDownRefresh();
		},

	methods: {
		getList(id) {
			//index是索引
			
			let _this = this;
			
			console.log('栏目id',id)
			let arr = []
			this.$api.article(id).then(res => {								
				_this.listItem = res.data.content
				for(var i = 0;i<_this.listItem.length;i++){
					var str = _this.listItem[i].title
					console.log(str)
					arr = _this.listItem[i]					
				}
				if(_this.listItem.length == 0){
					_this.noData = true
				}else{
					_this.noData = false
				}
				
				_this.listItem.concat(arr)
					console.log('list',_this.listItem)
				
		
			}) 
			
		},
		initCourseCategory() {
			this.$api.CourseCategory().then(res => {		
				let tab =res.data
				let newTab = {}
				newTab.categoryName = '全部'
				newTab.categoryId = ''
				let tabTitle = []
				tab.unshift(newTab)
				for(var i = 0;i<tab.length;i++){				
					var str = tab[i].categoryName
					tabTitle.push(str)
				}				
				//console.log(tabTitle.categoryId)
				this.tabTitle = tabTitle
				this.tab = tab
				console.log('tab:',this.tab)
			})  
		},

		changeTab(index){
			
			this.currentTab = index
			let id = this.tab[index].categoryId
			this.getList(id)
		},	
		// swiper 滑动
		swiperTab: function(e) {
			let _this = this
			
			var index = e.detail.current //获取索引
			let id = _this.tab[index].categoryId

			if(this.tabTitle.length<=4){
				this.$refs.navTab.navClick(index)
			}else{
				this.$refs.navTab.longClick(index)
			}
			this.getList(id)
		},
		
		goActivityDetail:function(id){
			uni.navigateTo({
				url: `/pages/activity/activityDetail?id=`+id,
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
	margin-top:10vh;
	
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
