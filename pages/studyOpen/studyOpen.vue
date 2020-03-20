<template>
	<view class="contentbox">
		<view class='nav'>			
			<!-- 导航栏 agents导航栏标题 -->
			<navTab ref="navTab" :tabTitle="tabTitle" @changeTab='changeTab'></navTab>
		</view>
		<!-- swiper切换 swiper-item表示一页 scroll-view表示滚动视窗 -->		
		<swiper  :current="currentTab" @change="swiperTab">
			<swiper-item v-for="(page,i) in tabTitle.length">
				<scroll-view  scroll-y="true" @scrolltolower="lower1" scroll-with-animation :scroll-into-view="toView">		
						<ul class="rec-course">
							<li class="shadow rec-box" v-for="(item,index) in list"  :key="index"
								@click="goCourseDetail(item.id)"
							>
								<view class="rec-pic">
									<image class="btn" src="../../static/img/play-btn.png" mode="widthFix"></image>
									<image :src="item.cover" mode="widthFix"></image>			
								</view>
								<view class="rec-des" >
									<h4 class="a-line">{{item.title}}</h4>
									<p class="a-line">{{item.subTitle}}</p>
									<view class="bottom">
										<text class="prize fl" >{{item.price ? "¥"+item.price : "免费"}}</text>
										<text class="fr" >
											<text>{{item.category.name}}</text><text class="line">|</text><text>{{item.watchedCount}}人已观看</text>
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
			tabTitle:[], //导航栏格式 --导航栏组件
			currentTab: 0, //sweiper所在页
			toView:'',//回到顶部id
			pages:[1,1,1,1], //第几个swiper的第几页
			list: [
			] //数据格式
		};
	},
	onLoad: function (options) {
		this.initCourseCategory();
		this.initRecommendCourse('');
		
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
		/* initRecommendCourse(id) {
			console.log('栏目id',id)
			let _this = this
			let arr = []
			this.$api.onlineCourse(id).then(res => {
				_this.list = res.data.data.content;
				for(var i = 0;i<_this.list.length;i++){
							
					arr = _this.list[i]					
				}
				_this.list.concat(arr)
						
				console.log('data:',_this.list)
			})
		}, */
		initRecommendCourse(id) {
			//index是索引
			
			let _this = this;
			
			console.log('栏目id',id)
			let arr = []
			this.$api.onlineCourse(id).then(res => {								
				_this.list = res.data.data.content
				for(var i = 0;i<_this.list.length;i++){
					var str = _this.list[i].title
					console.log(str)
					arr = _this.list[i]					
				}
				_this.list.concat(arr)
					console.log('list',_this.list)
				
		
			}) 
			
		},

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
		goCourseDetail:function(id){
			uni.navigateTo({
				url: `../studyOpen/openDetail?id=${id}`,
				success: res => {},
				fail: () => {},
				complete: () => {}
			});
		},
		changeTab(index){
			this.currentTab = index
			let id = this.tab[index].categoryName
			this.initRecommendCourse(id);
		},
	
		// swiper 滑动
		swiperTab: function(e) {
			var index = e.detail.current //获取索引
			let id = this.tab[index].categoryName
			if(this.tabTitle.length<=4){
				this.$refs.navTab.navClick(index)
			}else{
				this.$refs.navTab.longClick(index)
			}
			this.initRecommendCourse(id);
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
		}
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
