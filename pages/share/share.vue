<template>
	<view>
		
		<view class="bg">
			<h5>—— 送好友优惠券 ——</h5>
			<h2>好友报名返现金最高200元/人</h2>
			<navigator url="">详细规则 ></navigator>
		</view>
		<view class="box sharebox">
			<view class="shadow">
				<navigator class="btn" url="cashOut">提现</navigator>
				<dl >
					<dt>我的奖励金</dt>
					<dd class="orange-color">￥800</dd>
				</dl>
				<view class="flex">
					<dl @click="goInvite">
						<dt >累计邀请</dt>
						<dd class="orange-color">48人</dd>
					</dl>
					<dl @click="goProfit">
						<dt>累计收益</dt>
						<dd class="orange-color">￥800</dd>
					</dl>
				</view>
			</view>
		</view>
		<view >
			<view class='nav'>
				<!-- 导航栏 agents导航栏标题 -->
				<navTab ref="navTab" :tabTitle="tabTitle" @changeTab='changeTab'></navTab>
			</view>
			<view class="box">
				
			
			<!-- swiper切换 swiper-item表示一页 scroll-view表示滚动视窗 -->		
			<swiper  :current="currentTab" @change="swiperTab" >
				<swiper-item v-for="(listItem,listIndex) in list" :key="listIndex">
					
					<scroll-view  scroll-y="true" @scrolltolower="lower1" scroll-with-animation :scroll-into-view="toView">
				
						<ul class="rec-course">
							<li class=" rec-box" v-for="(item,index) in listItem" v-if="listItem.length > 0" :key="index"
								@click="goCourseDetail"
							>
								<view class="rec-pic">
									<image :src="item.image" mode="widthFix"></image>			
								</view>
								<view class="rec-des" >
									<h4 class="a-line">{{item.title}}</h4>
									<view class="">
										<text class="a-line">￥{{item.prize}}</text>
										<text>共{{item.time}}课时</text>
									</view>
									<view class="bottom">
										<text class="prize fl" >最高返 {{item.coupon}}</text>
										<text class="fr btn" >去分享</text>
									</view>
								</view>
							</li>
						</ul>
						
					</scroll-view>
				</swiper-item>
			</swiper>
			</view>
		</view>
	</view>
</template>

<script>
import navTab from '../../components/navTab.1.vue';
export default {
	components: {navTab},
		data() {
			return {
				currentPage:'index',
				tabTitle:['推荐','少儿','初级','高考'], //导航栏格式 --导航栏组件
				currentTab: 0, //sweiper所在页
				current: 0,  
				items: [],
				list:[
						[{
							title:"少儿美术周末班",
							image:"../../static/img/1.png",
							prize:"1680",
							time:"20",
							coupon:"200",
						}	,
						{
							title:"少儿美术周末班",
							image:"../../static/img/1.png",
							prize:"1680",
							time:"20",
							coupon:"200",
						},
						{
							title:"少儿美术周末班",
							image:"../../static/img/1.png",
							prize:"1680",
							time:"20",
							coupon:"200",
						}
					],
					[
						{
							title:"少儿美术周末班",
							image:"../../static/img/1.png",
							prize:"1680",
							time:"20",
							coupon:"200",
						}	
					],
					[{
							title:"少儿美术周末班",
							image:"../../static/img/1.png",
							prize:"1680",
							time:"20",
							coupon:"200",
						}	],
					[
						{
							title:"少儿美术周末班",
							image:"../../static/img/1.png",
							prize:"1680",
							time:"20",
							coupon:"200",
						}	
					]
			]
			}
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
		mounted() {  
		            uni.createSelectorQuery().selectAll('.swiper-item').boundingClientRect(data => this.items = data).exec()  
		        },  	
		methods: {
		
			changeTab(e){
				this.currentTab = e
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
			goInvite:function(){
				uni.navigateTo({
					url: 'totalInvite',
					success: res => {},
					fail: () => {},
					complete: () => {}
				});
			},
			goProfit:function(){
				uni.navigateTo({
					url: 'totalProfit',
					success: res => {},
					fail: () => {},
					complete: () => {}
				});
			}
		}

		
	}
</script>

<style lang="scss" scoped>
	@import "../../static/style/base.scss";
	swiper{
		height:100vh;
	}
	.sharebox{
		height:150upx;
	}
.bg{
	background:#eee url(../../static/img/sharebg.png) no-repeat center top;
	background-size: 100%;
	height: 360upx;
	color: #fff;
	text-align: center;
	h5{
		font-size: 30upx;
		line-height: 300%;
		padding-top:40upx;
		font-weight:lighter;
	}
	h2{
		font-size: 40upx;
		font-weight: normal;
	}
	navigator{
		font-size: 24upx;
		position: absolute;
		top:20upx;
		right:3vw;
	}
}
.shadow{
	position:relative;
	top:-150upx;	
	background:#fff;
	border-radius:20upx;
	height:250upx;
	padding:20upx;
	.btn{
		position: absolute;
		right:3vw;
		top:80upx;
	}
}

	dl{		
		height:140upx;
		border-bottom: 1px solid #eee;	
		dt{
			font-size:24upx;
			color:#393939;
			
		}
		dd{
			font-size:72upx;
		}
	}
	
.flex{
	dl{
		width:48%;
		height:75upx;
		margin-top:20upx;
		background: url(../../static/img/info-arr.png) no-repeat right center; 
		background-size: 30upx;
		border:none;
		line-height:40upx;
		dd{
			font-size:40upx;
		}
	}

	dl:last-child{
		text-indent:60upx;
		border-left: 1px solid #eee;
		margin-left:2%;
	}
}

.btn{
	display:inline-block;
	color:#fff;
	background:rgba(255,131,0,1);
	border-radius:4px;
	height:56upx;
	line-height:56upx;
	text-align: center;
	padding:0 40upx;
	font-size:24upx;
}

.rec-course{
		width:90vw;
		.rec-box{
			padding: 40upx 0;
			border-bottom: 1px solid #eee;
			display: flex;
			width:100%;
			height:206upx;	
			overflow: hidden;
			.rec-pic{
				width:45vw;
				height:100%;
				overflow: hidden;
				position: relative;
				float:left;
			
			}
			.rec-des{
				padding: 2vw;
				font-size: 24upx;
				color: #7e7e7e;
				width:45vw;
				position:relative;
				.btn{
					bottom:0;
					right:-50upx;
					position:absolute;
				}
				text{
					margin-right: 20upx;
				}
				h4{
					color:#393939;
					font-size:36upx;
					line-height: 200%;
				}
				.bottom{
					position:absolute;
					bottom:10upx;
					left:2vw;
					width:40vw;
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
		.rec-box:last-child{
			boder:none;
		}
	}
</style>
