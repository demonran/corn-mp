<template>
	<view class="contentbox" >
		<view class='nav'>
			<!-- 导航栏 agents导航栏标题 -->
			<navTab ref="navTab" :tabTitle="tabTitle" @changeTab='changeTab'></navTab>
		</view> 
		<!-- swiper切换 swiper-item表示一页 scroll-view表示滚动视窗 -->		
		<swiper  :current="currentTab" @change="swiperTab" >
			<swiper-item v-for="(page,i) in tabTitle.length" :key="i">
				<view class="no-data" v-show="noData==true">
					暂时没有数据
				</view>
				<scroll-view  scroll-y="true" >	
						<ul class="hot-course shadow-box">							
							<li @click="goCourseDetail(item.courseId)" class="shadow inbox" v-for="(item,index) in OfflineCourseList" :key="index">
								<view class="">
									<h4 class="a-line">{{item.courseName}}
									
									</h4>
									<p class="time">{{item.beginDate}} ～ {{item.endDate}} {{item.startClassTime}}-{{item.endClassTime}}</p>
								</view>
								<view class="des">
									<h5 class="prize">{{item.totalAmount ? "¥"+item.totalAmount : "免费"}}</h5>
									<text class="hour">共{{item.lesson}}课时</text><text class="line">|</text>
									<text class="number">限{{item.limitStudents}}人</text>
								</view>
								<view class="sign-up">立即报名</view>
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
			listitem: [] ,//数据格式
			OfflineCourseList:[],
			noData:false
		};
	},
	onLoad: function (options) {
	        setTimeout(function () {
	            console.log('start pulldown');
	        }, 1000);
	        uni.startPullDownRefresh();
			
	    },
	onShow() {
		
		this.initCourseCategory();
		this.initOfflineCourse('');
	},
	onHide() {

	},
	methods: {
		onPullDownRefresh() {
		    console.log('refresh');
		    setTimeout(function () {
		        uni.stopPullDownRefresh();
		    }, 1000);
		},
		initOfflineCourse(id) {
			console.log('栏目id',id)
			let _this = this
			let arr = []
			this.$api.OfflineCourse(id).then(res => {
				_this.OfflineCourseList = res.data; 
				for(var i = 0;i<_this.OfflineCourseList.length;i++){
	
					arr = _this.OfflineCourseList[i]					
				}
				_this.OfflineCourseList.concat(arr)
				if(_this.OfflineCourseList.length == 0){
					_this.noData = true
				}else{
					_this.noData = false
				}

				console.log('data:',_this.OfflineCourseList)
				//
				/* this.OfflineCourse=[];
				for(var i=0;i<res.data.data.length;i++){
				if(this.keyword == res.data.data[i].categoryId  ){
				this.OfflineCourse.push(res.data.data[i]);
				}
				if(this.keyword==''){
				this.OfflineCourse=res.data.data;
				}
				} 
				
				      if(this.OfflineCourseList){
				        // 不区分大小写处理
				        //var reg = new RegExp(_search, 'ig')
				        // es6 filter过滤匹配，有则返回当前，无则返回所有
				        return this.OfflineCourseList.filter(function(e) {
				          // 匹配所有字段
				          return Object.keys(e).some(function(key) {
				            return e[key].match(reg);
				          })
				          // 匹配某个字段
				          // return e.name.match(reg);
				        })
				      }; 
				
			 */
				
				
			}) 
		},
		initCourseCategory() {
			this.$api.CourseCategory().then(res => {		
				let tab =res.data
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
				url: `/pages/course/courseDetail?id=`+id,
				success: res => {},
				fail: () => {},
				complete: () => {}
			}); 
		},
		changeTab(index){
			this.currentTab = index
			let id = this.tab[index].categoryId
			
			this.initOfflineCourse(id)
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
			this.initOfflineCourse(id)
		},


	}
};
</script>

<style lang="scss" scoped>
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
			margin-top:2vh;
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
			margin-bottom: 3vw;
			h4{
				font-size: 36upx;;
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
					padding:0 40upx;
				}
				.prize{
					font-size:36upx;
					color:#f8962e;
				}
			}
			.sign-up{
				position: absolute;
				right: 3vw;
				bottom:3vw;
				width:177upx;
				height:54upx;
				line-height:54upx;
				border-radius: 8upx;
				text-align: center;
				font-size: 24upx;
				color:#fff;
				background:#ff8300 url(../../static/img/arr-white.png) no-repeat 140upx center;
				background-size: 30upx;
			}
		}		
	}
</style>
