<template>
	<view class="contentbox">
		<view class='nav'>
			<!-- 导航栏 agents导航栏标题 -->
			<navTab ref="navTab" :tabTitle="tabTitle" @changeTab='changeTab'></navTab>
		</view>
		<!-- swiper切换 swiper-item表示一页 scroll-view表示滚动视窗 -->
		<swiper :current="currentTab" @change="swiperTab">
			<swiper-item v-for="(item,listIndex) in tabTitle" :key="listIndex">
				<scroll-view scroll-y="true" @scrolltolower="lower1" scroll-with-animation :scroll-into-view="toView">

					<ul class="box">
						<li v-for="(item,index) in filterByStatusList" :key="index">
							<div :class="item.status=='NOT_USED'?'orange-bg':'grey-bg'">
								<view class="fl">
									<h4 class="a-line"><text>￥</text>{{item.amount}}</h4>
									<p class="time">满{{item.minUsed}}远可用，到期时间{{item.expiryDate}}</p>
								</view>
								<view v-if="item.status=='NOT_USED'" class="icon">未使用</view>
								<view v-if="item.status=='USED'" class="icon">已使用</view>
								<view v-if="item.status=='EXPIRED'" class="icon">已过期</view>
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
	import couponRes from '@/api/coupon.js'
	export default {
		components: {
			navTab
		},
		data() {
			return {
				currentPage: 'index',
				tabTitle: ['未使用', '已使用', '已过期'], //导航栏格式 --导航栏组件
				status: ['NOT_USED', 'USED', 'EXPIRED'],
				currentTab: 0, //sweiper所在页
				toView: '', //回到顶部id
				couponList: [],
				filterByStatusList: []
				
			};
		},
		onLoad: function(options) {
			this.fetchMyCoupon();

		},
		onPullDownRefresh() {
			console.log('refresh');
			setTimeout(function() {
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

			changeTab(index) {
				this.currentTab = index;
				this.filterByStatusList = this.couponList.filter(coupon => coupon.status == this.status[index])
			},

			fetchMyCoupon() {
				couponRes.fetchMyCoupon().then(res => {
					this.couponList = res.data;
					this.filterByStatusList = this.couponList.filter(coupon => coupon.status == this.status[0])
				})
			},

			// swiper 滑动
			swiperTab: function(e) {
				var index = e.detail.current //获取索引
				if (this.tabTitle.length <= 4) {
					this.$refs.navTab.navClick(index)
				} else {
					this.$refs.navTab.longClick(index)
				}
			}
		}
	};
</script>

<style lang="scss">
	@import "../../static/style/base.scss";

	.contentbox {
		margin-top: 140upx;
	}

	swiper {
		height: 150vh;
	}



	.orange-bg {
		background: url(../../static/img/coupon1.png) no-repeat center center;
		background-size: 100%;
	}

	.grey-bg {
		background: url(../../static/img/coupon2.png) no-repeat center center;
		background-size: 100%;
	}

	div {
		font-size: 24upx;
		color: #fff;
		margin-bottom: 20upx;
		position: relative;
		height: 188upx;

		.fl {
			text {
				font-size: 24upx;
			}

			h4 {
				font-size: 46upx !important;
			}

			padding:40upx;
		}

		.icon {
			position: absolute;
			right: 35upx;
			bottom: 50upx;
			-webkit-writing-mode: vertical-rl;
			writing-mode: vertical-rl;
			font-size: 28upx;
		}

	}
</style>
