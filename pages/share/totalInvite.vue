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
						<ul>
							<li class=" inbox" v-for="(item,index) in listItem" v-if="listItem.length > 0" :key="index">
								<image class="null head" :src="item.headimg"></image>				
								<view>
									<view class="">
										<h2>{{item.name}}</h2>
										<span class="orange" v-if="item.status==0">未使用</span>
										<span class="green" v-if="item.status==1">已使用</span>
									</view>
									
									<p class="orange" v-if="item.status==0">{{item.time}}领取了优惠券</p>
									<p class="green" v-if="item.status==1">{{item.time}}使用了优惠券</p>
									<text class="prize orange-color">￥{{item.prize}}</text>
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
			tabTitle:['全部','已使用','未使用'], //导航栏格式 --导航栏组件
			currentTab: 0, //sweiper所在页
			toView:'',//回到顶部id
			list: [
				[
					{
						headimg:"",
						name:"小李",
						time:"2018.06.06",
						prize:"200",
						status:0
					},
					{
						headimg:"",
						name:"小李",
						time:"2018.06.06",
						prize:"200",
						status:1
					},
					{
						headimg:"",
						name:"小李",
						time:"2018.06.06",
						prize:"200",
						status:1
					}
				],
				[
					{
						headimg:"",
						name:"小李",
						time:"2018.06.06",
						prize:"200",
						status:0
					}
				],
				[
					{
						headimg:"",
						name:"小李",
						time:"2018.06.06",
						prize:"200",
						status:0
					}
				],
				
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
	margin-top:100upx;
}
	swiper{
		height:100vh;
		padding-bottom:140upx;
	
	}
li{
	position:relative;
	border-bottom:1px solid #eee;
	padding:40upx 0;
	.head{
		width:96upx;
		height:96upx;
		border-radius: 50%;
		float:left;
		margin-right:20upx;
	}
	h2{
		color:#000;
		font-size:28upx;
		display: inline-block;
		margin-right: 20upx;
	}
	p{
		color:#595959;
		font-size:24upx;
	}
	.prize{
		font-size: 40upx;
		position: absolute;
		right:0;
		top:60upx;
	}
	span{
		font-size: 24upx;
		color:#fff;
		text-align: center;
		display: inline-block;
		width:90upx;
		height:32upx;
		line-height: 32upx;
	}
	span.orange{
		background: url(../../static/img/orange.png) no-repeat center  center;
		background-size:100%;
	}
	span.green{
		background: url(../../static/img/green.png) no-repeat center  center;
		background-size:100%;		
	}
}
</style>
