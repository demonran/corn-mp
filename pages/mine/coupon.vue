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
			
						<ul class="box">
							<li  v-for="(item,index) in listItem" v-if="listItem.length > 0" :key="index">
								<div :class="item.status==0?'orange-bg':'grey-bg'">
									<view class="fl">
										<h4 class="a-line"><text>￥</text>{{item.prize}}</h4>
										<p class="time">{{item.des}}</p>
									</view>
									<view v-show="item.status==0" class="icon">未使用</view>
									<view v-show="item.status==1" class="icon">已使用</view>
									<view v-show="item.status==2" class="icon">已过期</view>
								</div>
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
			tabTitle:['未使用','已使用','已过期'], //导航栏格式 --导航栏组件
			currentTab: 0, //sweiper所在页
			toView:'',//回到顶部id
			list: [
				[
					{
						prize:"200.00",
						des:"满2000元可用，到期时间2019年12月30日",
						status:"0"
					},
					{
						prize:"200.00",
						des:"满2000元可用，到期时间2019年12月30日",
						status:"1"
					}
				],
				[
					{
						prize:"200.00",
						des:"满2000元可用，到期时间2019年12月30日",
						status:"2"
					}
				],
				[
					{
						prize:"200.00",
						des:"满2000元可用，到期时间2019年12月30日",
						status:"0"
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

	
	
	.orange-bg{
		background: url(../../static/img/coupon1.png) no-repeat center center;
		background-size: 100%;
	}
	.grey-bg{
		background: url(../../static/img/coupon2.png) no-repeat center center;
		background-size: 100%;
	}

div{
	font-size:24upx;
	color:#fff;
	margin-bottom:20upx;
	position:relative;
	height:188upx;
	.fl{
		text{
			font-size:24upx;
		}
		h4{
			font-size:46upx !important;
		}
		padding:40upx;
	}
	
	.icon{
		position:absolute;
		right:35upx;
		bottom:50upx;
		-webkit-writing-mode: vertical-rl;
		writing-mode: vertical-rl;
		font-size:28upx;
	}
	
}

</style>
