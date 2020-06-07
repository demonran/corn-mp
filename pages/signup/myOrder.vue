<template>
	<view class="contentbox">
		<!-- <uni-segmented-control :current="current" :values="status.map(item=>item.name)" @clickItem="onClickItem" style-type="text"
		 active-color="#4cd964"></uni-segmented-control> -->
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
						<ul class="hot-course">
							<li class="inbox" v-for="(item,index) in orders" :key="index">
								<view class="">
									<h4 class="a-line">{{item.courseInfo.courseName}}</h4>
									<p class="time">{{item.courseInfo.beginDate}}～{{item.courseInfo.endDate}} {{item.courseInfo.startClassTime}}-{{item.courseInfo.endClassTime}}</p>
						
									<view v-if="item.status=='CREATED'" class="icon">待支付</view>
									<view v-else-if="item.status=='PAID'" class="icon studied">已支付</view>
									<view v-else class="icon studied">已完成</view>
								</view>
								<view class="des">
									<h5 class="prize">{{item.totalAmount}}</h5>
									<text class="hour">共{{item.courseInfo.lesson}}课时</text><text class="line">|</text>
									<text class="number">限{{item.courseInfo.limitStudents}}人</text>
								</view>
								<view class="state">
									<view @click="gostudyDetail(item.id)" v-if="item.status=='PAID'||item.status=='FINISHED'" class="btn">查看记录</view>
									<view @click="goSignUp" v-if="item.status=='FINISHED'" class="btn2 btn">报名续费</view>
									<view @click="goMySignDetail(item.id)" v-if="item.status=='CREATED'" class="btn2 btn">去支付</view>
								</view>
							</li>
						</ul>	
				</scroll-view>				
			</swiper-item>
		</swiper> 
<!-- 		<scroll-view scroll-y="true" @scrolltolower="lower1" scroll-with-animation :scroll-into-view="toView">

			<ul class="hot-course">
				<li class="inbox" v-for="(item,index) in orders" :key="index">
					<view class="">
						<h4 class="a-line">{{item.courseInfo.courseName}}</h4>
						<p class="time">{{item.courseInfo.beginDate}}～{{item.courseInfo.endDate}} {{item.courseInfo.startClassTime}}-{{item.courseInfo.endClassTime}}</p>

						<view v-if="item.status=='CREATED'" class="icon">待支付</view>
						<view v-else-if="item.status=='PAID'" class="icon studied">已支付</view>
						<view v-else class="icon studied">已完成</view>
					</view>
					<view class="des">
						<h5 class="prize">{{item.totalAmount}}</h5>
						<text class="hour">共{{item.courseInfo.lesson}}课时</text><text class="line">|</text>
						<text class="number">限{{item.courseInfo.limitStudents}}人</text>
					</view>
					<view class="state">
						<view @click="gostudyDetail(item.id)" v-if="item.status=='PAID'||item.status=='FINISHED'" class="btn">查看记录</view>
						<view @click="goSignUp" v-if="item.status=='FINISHED'" class="btn2 btn">报名续费</view>
						<view @click="goMySignDetail(item.id)" v-if="item.status=='CREATED'" class="btn2 btn">去支付</view>
					</view>
				</li>
			</ul>

		</scroll-view> -->


	</view>
</template>

<script>
	import navTab from '../../components/myOrderTab.vue';
	import orderRes from '@/api/order.js'
	export default {
components: {navTab},
		data() {
			return {
				status: [{
					name: "全部"
				}, {
					status: "PAID",
					name: '已支付'
				}, {
					status: "CREATED",
					name: '未支付'
				}, {
					status: "FINISHED",
					name: '已完成'
				}],
				current: 0, //sweiper所在页
				toView: '', //回到顶部id
				allOrders: [], //数据格式
				orders: [],
				
				//
				currentPage:'index',
				tabTitle:  [{
					name: "全部"
				}, {
					status: "PAID",
					name: '已支付'
				}, {
					status: "CREATED",
					name: '未支付'
				}, {
					status: "FINISHED",
					name: '已完成'
				}], //导航栏格式 --导航栏组件
				currentTab: 0, //sweiper所在页
				noData:false
			};
		},
		onLoad: function(options) {
			this.initMyOrders();
			
		},
		methods: {
			initMyOrders() {
				orderRes.myOrders().then(res => {
					console.log(res)
					this.allOrders = res.data
					this.changeTab(0)
				})
			},
			goMySignDetail: function(orderId) {
				this.$navigateTo(`orderDetail?orderId=${orderId}`);
			},
			//
			changeTab(e){
				this.currentTab = e
				this.orders = this.allOrders.filter(
					item => this.status[e].status ? item.status == this.status[e].status : true)
				      this.$nextTick(function(){
				        console.log('顺序，',this.orders.length)
						if(this.orders.length == 0){
							this.noData = true
						}else{
							this.noData = false
						}
				      });	
			},
				
			// swiper 滑动
			swiperTab: function(e) {
				var i = e.detail.current //获取索引
				this.$refs.navTab.navClick(i)
			},
		}
	};
</script>

<style lang="scss" scoped>
@import "../../static/style/base.scss";

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

	.hot-course {
		li {
			position: relative;
			border-radius: 8upx;

			border-bottom: 1px solid #eee;

			h4 {
				font-size: 36upx;
				;
			}

			.icon {
				font-size: 24upx;
				color: #FF8300;
				width: 88upx;
				height: 36upx;
				border-radius: 18upx 0 0 18upx;
				position: absolute;
				right: 0;
				top: 3vw;
				text-align: center;
			}

			.studied {
				color: #9e9e9e;
			}

			.time {
				font-size: 24upx;
				color: #7e7e7e;
			}

			.des {
				font-size: 24upx;
				color: #7e7e7e;
				margin-top: 20upx;

				.line {
					color: #d8d8d8;
					font-size: 18upx;
					padding: 0 20upx;
				}

				.prize {
					font-size: 36upx;
					color: #f8962e;
				}
			}

			.state {
				position: absolute;
				right: 3vw;
				bottom: 3vw;

				.btn {
					float: right;
					width: 148upx;
					height: 54upx;
					line-height: 54upx;
					border-radius: 8upx;
					text-align: center;
					font-size: 24upx;
					color: #ff8300;
					border: 1px solid #ff8300;
					background-size: 30upx;
					margin-left: 10upx;
				}

				.btn2 {
					color: #fff;
					background: #ff8300;
				}
			}

		}
	}
</style>
