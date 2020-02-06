<template>
	<view class="contentbox" @touchstart="refreshStart" @touchmove="refreshMove" @touchend="refreshEnd">
		<!-- 刷新事件isRefresh需要异步操作返回resolve -->
		<refresh ref="refresh" @isRefresh='isRefresh'></refresh>
		<view class='nav'>			
			<!-- 导航栏 agents导航栏标题 -->
			<navTab ref="navTab" :tabTitle="tabTitle" @changeTab='changeTab'></navTab>
		</view>
		<!-- swiper切换 swiper-item表示一页 scroll-view表示滚动视窗 -->		
		<swiper  :current="currentTab" @change="swiperTab">
			<swiper-item v-for="(listItem,listIndex) in list" :key="listIndex">
				<scroll-view  scroll-y="true" >			
						<ul class="hot-course">
							<li class="shadow inbox" v-for="(item,index) in listItem" v-if="listItem.length > 0" :key="index">
								<view class="">
									<h4 class="a-line">{{item.title}}</h4>
									<p class="time">{{item.time}}</p>
								</view>
								<view class="des">
									<h5 class="prize">{{item.prize}}</h5>
									<text class="hour">{{item.hour}}</text><text class="line">|</text>
									<text class="number">{{item.number}}</text>
								</view>
								<view @click="goSign" class="sign-up">立即报名</view>
							</li>
						</ul>		
				</scroll-view>
			</swiper-item>
		</swiper>
		
	</view>
</template>

<script>
const util = require('../../utils/util.js');
import refresh from '../../components/refresh.vue';
import navTab from '../../components/navTab.vue';
export default {
	components: {refresh,navTab},
	data() {
		return {
			currentPage:'index',
			tabTitle:['全部','少儿','初级','高考'], //导航栏格式 --导航栏组件
			currentTab: 0, //sweiper所在页
			pages:[1,1], //第几个swiper的第几页
			list: [
				[
					{
						title:"2019少儿美术周末班0",
						time:"2019.09.01-2019.12.11 周六09：:0-12:00",
						prize:"￥1680",
						hour:"共20课时",
						number:"限60人"
					},
					{
						title:"2019少儿美术周末班1",
						time:"2019.09.01-2019.12.11 周六09：:0-12:00",
						prize:"￥680",
						hour:"共20课时",
						number:"限60人"
					},{
						title:"2019少儿美术周末班2",
						time:"2019.09.01-2019.12.11 周六09：:0-12:00",
						prize:"￥680",
						hour:"共20课时",
						number:"限60人"
					},{
						title:"2019少儿美术周末班3",
						time:"2019.09.01-2019.12.11 周六09：:0-12:00",
						prize:"￥680",
						hour:"共20课时",
						number:"限60人"
					},{
						title:"2019少儿美术周末班4",
						time:"2019.09.01-2019.12.11 周六09：:0-12:00",
						prize:"￥680",
						hour:"共20课时",
						number:"限60人"
					},{
						title:"2019少儿美术周末班5",
						time:"2019.09.01-2019.12.11 周六09：:0-12:00",
						prize:"￥680",
						hour:"共20课时",
						number:"限60人"
					},
				],
				[
					{
						title:"2019少儿美术周末班0000000000000",
						time:"2019.09.01-2019.12.11 周六09：:0-12:00",
						prize:"￥1680",
						hour:"共20课时",
						number:"限60人"
					}
					,{
						title:"2019少儿美术周末班222222222222222222222222222222222222",
						time:"2019.09.01-2019.12.11 周六09：:0-12:00",
						prize:"￥680",
						hour:"共20课时",
						number:"限60人"
					},{
						title:"2019少儿美术周末班3333333333333",
						time:"2019.09.01-2019.12.11 周六09：:0-12:00",
						prize:"￥680",
						hour:"共20课时",
						number:"限60人"
					}
				],
				[
					{
						title:"2019少儿美术周末班3333333333333",
						time:"2019.09.01-2019.12.11 周六09：:0-12:00",
						prize:"￥680",
						hour:"共20课时",
						number:"限60人"
					}
				],
				[
					{
						title:"2019少儿美术周末班3333333333333",
						time:"2019.09.01-2019.12.11 周六09：:0-12:00",
						prize:"￥680",
						hour:"共20课时",
						number:"限60人"
					}
				],
			] //数据格式
		};
	},
	onLoad(e) {
		
	},
	onHide() {},
	methods: {
		goSign:function(){
			uni.navigateTo({
				url: '../signup/signup',
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
		},

		// 刷新touch监听
		refreshStart(e) {
			this.$refs.refresh.refreshStart(e);
		},
		refreshMove(e){
			this.$refs.refresh.refreshMove(e);
		},
		refreshEnd(e) {
			this.$refs.refresh.refreshEnd(e);
		},
		isRefresh(){
				setTimeout(() => {
					uni.showToast({
						icon: 'success',
						title: '刷新成功'
					})
					this.$refs.refresh.endAfter() //刷新结束调用
				}, 1000)
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
