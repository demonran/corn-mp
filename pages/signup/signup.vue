<template>
	<view>
		<uni-popup ref="popup" type="share">
			<popup-coupon @select="couponSelected"></popup-coupon>
		</uni-popup>
		<view class="sign">
			<view class="boxwhite edit" @click="goSignInfo" v-if="child != undefined">
				<view class="sign-des orange-color">
					<view class="student">
						学生：{{child.studentName}}
					</view>
					<view class="parent">
						<text>家长：{{child.patriarchName}}</text>
						<text class="line">|</text>
						<text>电话：{{child.tel}}</text>
					</view>
				</view>
			</view>
			<view class="boxwhite" @click="goSignInfo" v-else>
				<view class="sign-des orange-color">请填写报名信息</view>
			</view>

			<view class="rec-des boxwhite">
				<view class="">
					<view class="word">
						<h4 class="a-line">{{CourseDetail.courseName||course.title}}</h4>
						<p class="a-line">{{CourseDetail.beginDate}}～{{CourseDetail.endDate}}
							{{CourseDetail.startClassTime}}-{{CourseDetail.endClassTime}}</p>
					</view>
					<text class="prize">¥{{CourseDetail.totalAmount||course.totalAmount}}</text>
				</view>
				<view class="bottom">
					<view class="fl teacherbox">
						<image class="null head" :src="CourseDetail.teacher.avatar||course.teacher.avatar"></image>
						<view class="teacher">
							<text>{{CourseDetail.courseCategory.name||course.category.name}}</text>
							<h1 class="a-line">{{CourseDetail.teacher.name||course.teacher.name}}</h1>
						</view>
					</view>
					<text class="fr">
						<text class="classHour">共{{CourseDetail.lesson}}课时</text><text class="line">|</text><text>限{{CourseDetail.limitStudents}}人</text>
					</text>
				</view>
			</view>
			<view class="cont boxwhite">
				<dl class="noIco">
					<dt>课程费用</dt>
					<dd>¥{{CourseDetail.totalAmount||course.totalAmount}}</dd>
				</dl>
				<dl @click="popCouponSelect">
					<dt>优惠券</dt>
					<dd class="orange-color" >{{ coupon ? coupon.amount : '请选择优惠券'}}</dd>
				</dl>
				<dl class="noIco">
					<dt>备注说明</dt>
					<dd><input type="text" v-model="remark" value="" placeholder="请输入备注说明" /></dd>
				</dl>
			</view>
			<view class="bottomBar">
				<view class="fl">
					<view class="prize orange-color">应付：¥{{totalPrice}}</view>
					<view v-if="coupon != undefined" class="coupon">优惠群优惠：{{coupon && coupon.amount}}元</view>
				</view>
				<view @click="goOrder(CourseDetail)" class="sign-up">提交报名</view>
			</view>
		</view>


	</view>
</template>
 
<script>
	import {
		mapGetters
	} from 'vuex'
	import popupCoupon from './popup-coupon/popup-coupon.vue'
	import orderRes from '@/api/order.js'
	import courseRes from '@/api/course.js'
	export default {
		components: {
			popupCoupon
		},
		data() {
			return {
				CourseDetail: {},
				child: undefined,
				course: [],
				coupon: undefined  
			}
		},
		computed: {
			totalPrice() {
				return this.coupon? this.CourseDetail.totalAmount - this.coupon.amount : this.CourseDetail.totalAmount
			},
			...mapGetters([
				'isAuthorize'
			]),			
		},
		onLoad(options) {
			this.initCourseDetail(options.id);
		},
		methods: {
			couponSelected(coupon){
				this.coupon = coupon
				console.log('this.coupon,',coupon)
				this.$refs.popup.close()
			},
			childSelected(child) {
				uni.$off('childSelected')
				this.child = child
			},
			initCourseDetail(id) {
				courseRes.detail(id).then(res => {
					this.CourseDetail = res.data;
					console.log(res)
				})
			},
			goSignInfo: function() {
				if (this.isAuthorize) {
					uni.$on('childSelected', this.childSelected)
					this.$navigateTo("../mine/archives?from=order")
				}else{
					uni.showModal({
						title: '提示？',
						content: '您还有没有登陆，请先登陆',
						success(res) {
							if (res.confirm) {
								console.log('用户点击确定');
						
							} else if (res.cancel) {
								console.log('用户点击取消');
							}
						}
					});
				}
			},
			popCouponSelect() {
				this.$refs.popup.open()
			},
			goOrder(data) {
				//判断是否登陆，没有登陆，则先登陆
				if (this.isAuthorize) {
					let that = this
					if (this.child) {
						//console.log(data)
						var a = {
							courseId: data.courseId,
							courseName: data.courseName,
							patriarchName: this.child.patriarchName,
							studentName: this.child.studentName,
							tel: this.child.tel,
							totalAmount: this.totalPrice,
							remark:this.remark,
							couponId: this.coupon ? this.coupon.id : undefined
						}
						orderRes.createOrder(a).then(res => {
							if(res.statusCode == 200) {				
								this.$navigateTo(`orderDetail?orderId=${res.data.id}`)
							}else {
								uni.showToast({
									icon:'none',
									title: res.errorMessage
								})
							}			
						})
					} else {
						// 如果要获取的权限尚未授权,则此时触发授权，打开设置页面
						uni.showModal({
							//弹出提示框
							title: '提示',
							content: '请填写报名信息',
							success(res) {
								if (res.confirm) {
									console.log('用户点击确定');

								} else if (res.cancel) {
									console.log('用户点击取消');
								}
							}
						});
					}
				} else {
					//this.isAuthorize = false
					//app.globalData.isAuthorize = false
					let _this = this
					// 如果要获取的权限尚未授权,则此时触发授权，打开设置页面
					uni.showModal({
						//弹出提示框
						title: '是否打开设置页授权登陆？',
						content: '需要在设置中获取个人信息和微信登陆权限',
					});
				}
			},
		},
		onShareAppMessage(res) {
			if (res.from === 'button') { // 来自页面内分享按钮
				console.log(res.target)
			}
			return {
				title: '这是一个分享',
				path: '/pages/study/studyDetail'
			}
		},
	}
</script>

<style lang="scss">
	@import "../../static/style/base.scss";

	page {
		background: #F7F7F7;
	}

	.sign {
		.edit {
			.student {
				font-size: 36upx;
				font-family: PingFang SC;
				color: rgba(57, 57, 57, 1);
				line-height: 50upx;
				font-weight: bold;
			}

			.parent {
				font-size: 30upx;
				font-family: PingFang SC;
				color: rgba(126, 126, 126, 1);
				line-height: 36upx;
			}
		}

		.sign-des {
			font-size: 36upx;
			height: 88upx;
			line-height: 88upx;
			background: url(../../static/img/edit.png) no-repeat right center;
			background-size: 40upx;
			;
		}

		.rec-des {
			font-size: 24upx;
			color: #7e7e7e;
			height: 165upx;
			position: relative;

			h4 {
				color: #393939;
				font-size: 36upx;
			}

			.share {
				position: absolute;
				right: 5vw;
				top: 3vw;
				display: inline;
				width: 150upx;
				height: 100upx;
				font-size: 24upx;
				color: #7e7e7e;
				background: url(../../static/img/share.png) no-repeat top right;
				background-size: 40upx;
				text-align: right;
				line-height: 130upx;
				padding: 0;
				margin-right: -20upx;
			}

			.prize {
				font-size: 30upx;
				position: absolute;
				right: 3vw;
				top: 3vw;
			}

			.bottom {
				position: absolute;
				bottom: 0;
				left: 3vw;
				width: 94vw;
				height: 80upx;

				.teacherbox {
					width: 300upx;
					overflow: hidden;

					.head {
						width: 60upx;
						height: 60upx;
						border-radius: 50%;
						overflow: hidden;
						margin-right: 2vw;

						image {
							width: 100%;
						}

						float:left;
					}

					.teacher {
						width: 50vw;

						h1 {
							font-size: 24upx;
							color: #393939;
							font-weight: normal;
							line-height: 100%;
						}

						text {
							font-size: 20upx;
							color: #7e7e7e;
						}
					}
				}

				.fr {
					margin-top: 20upx;
				}


			}

		}


		.bottomBar {
			position: fixed;
			box-shadow: 0px 0px 18px 0px rgba(0, 0, 0, 0.09);
			background: #fff;
			width: 100vw;
			height: 95upx;
			z-index: 9;
			right: 0;
			bottom: 0;
			font-size: 20upx;
			color: #787878;

			.fl {
				display: inline-block;
				width: 280upx;
				height: 80upx;
				line-height: 35upx;
				text-align: left;
				margin-left: 5vw;
				margin-top: 20upx;
			}

			.prize {
				font-size: 30upx;
				;
			}

			.sign-up {
				position: absolute;
				right: 5vw;
				bottom: 10upx;
				width: 405upx;
				height: 72upx;
				line-height: 72upx;
				border-radius: 8upx;
				text-align: center;
				font-size: 24upx;
				color: #fff;
				background: #ff8300;
			}
		}

		.cont {
			min-height: 80vh;
			padding-top: 0;

			dl {
				background: url(../../static/img/info-arr.png) no-repeat right center;
				background-size: 30upx;
				height: 88upx;
				line-height: 88upx;
				border-bottom: 1px solid #ededed;

				dt {
					font-size: 28upx;
					color: #7e7e7e;
					display: inline-block;
					width: 30vw;
					float: left;
				}

				dd {
					font-size: 28upx;
					color: #343434;
					display: inline-block;
					width: 60vw;

					input {
						display: inline-block;
						height: 88upx;
						line-height: 88upx;
						width: 100%;
					}
				}
			}

			.noIco {
				background: none;
			}
		}

		.line {
			padding: 0 20upx;
		}


	}

	.goSignInfo {
		position: absolute;
		top: 0;
		left: 0;
		width: 90vw;
		height: 100vh;
		background: #fff;
		margin: 0;
		padding: 5vw;


		.sign-up {
			width: 100%upx;
			height: 72upx;
			line-height: 72upx;
			border-radius: 8upx;
			text-align: center;
			font-size: 24upx;
			color: #fff;
			background: #ff8300;
		}

		.cont {

			dl {
				font-size: 30upx;
				margin: 60upx 0;
				border-bottom: 1px solid #ededed;

				dt {
					color: #212121;
					margin-top: 20upx;
				}

				dd {
					color: #aaaaaa;

					input {

						line-height: 88upx;
						height: 88upx;
					}
				}
			}
		}
	}
</style>
