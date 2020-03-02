<template>
	<view>
		<view class="boxwhite" @click="goSignInfo">
			<view class="sign-des orange-color">请填写报名信息</view>
		</view>
		<view class="rec-des boxwhite" >
			<view class="">
				<view class="word">
					<h4 class="a-line">{{CourseDetail.courseName}}</h4>
					<p class="a-line">{{CourseDetail.beginDate}}～{{CourseDetail.endDate}} 
				{{CourseDetail.startClassTime}}-{{CourseDetail.endClassTime}}</p>
				</view>			
				<text class="prize" >¥{{CourseDetail.price}}</text>
			</view>
			<view class="bottom">
				<view class="fl teacherbox">
					<image class="null head" :src="headimg"></image>				
					<view class="teacher">
						<text>{{CourseDetail.teacherType}}</text>
						<h1 class="a-line">{{CourseDetail.teacher}}</h1>
					</view>					
				</view>
				<text class="fr" >
					<text class="classHour">共{{CourseDetail.lesson}}课时</text><text class="line">|</text><text>限{{CourseDetail.limitStudents}}人</text>
				</text>
			</view>
		</view>
		<view class="cont boxwhite">
			<dl class="noIco">
				<dt>课程费用</dt>
				<dd>¥{{CourseDetail.price}}</dd>
			</dl>
			 <!-- <dl @click="">
				<dt>优惠券</dt>
				<dd class="orange-color">-200</dd>
			</dl>
			<dl class="noIco">
				<dt>备注说明</dt>
				<dd><input type="text" value="" placeholder="请输入备注说明"/></dd>
			</dl> -->
		</view>
		<view class="bottomBar">
			<view class="fl">
				<view class="prize orange-color">应付：¥{{CourseDetail.price}}</view>
				<!-- <view class="coupon">优惠群优惠：{{coupon}}元</view> -->
			</view>
			
			<view @click="initOrder(CourseDetail)" class="sign-up">提交报名</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				CourseDetail:{},
				
			} 
		},
		onLoad(options) {
			this.initCourseDetail(options.id);
			
		},
		methods: {
			initCourseDetail(id) {
				this.$api.CourseDetail(id).then(res => {
					this.CourseDetail = res.data.data; 
				}) 
			},
			goMap:function(){
				uni.navigateTo({
					url: '../map/map',
					success: res => {},
					fail: () => {},
					complete: () => {}
				});
			},
			goCall:function(){
				uni.makePhoneCall({
				    phoneNumber: '15281029319' 
				});
			},
			goSignInfo:function(){
				uni.navigateTo({
					url:'signInfo'
				})
			},
			initOrder(data) {
				//console.log(data)		
				  var a = {		
					 // "id":data.courseId,
					"courseId": data.courseId,
					"courseName": data.courseName,
					"patriarchName": "123",
					"studentName": "123",
					"tel": "13555555555",
					"totalAmount": data.price
				} 
				//let b = JSON.stringify(a) 	
				/* var send = {
					"command":b
				} */
				this.$api.orders(JSON.stringify(a) 	).then(res => {					
					
				}) 
			},

			goSignResult(){
				uni.redirectTo({
					url:`/pages/signup/goSignResult`
				})
			}

			
		},
		onShareAppMessage(res) {
		    if (res.from === 'button') {// 来自页面内分享按钮
		      console.log(res.target)
		    }
		    return {
		      title: '这是一个分享',
		      path: '/pages/study/studyDetail'
		    }
		  },
	}
</script>

<style lang="scss" >
	@import "../../static/style/base.scss";
	page{
		background: #F7F7F7;
	}
.sign-des{
	font-size: 36upx;
	height: 88upx;
	line-height: 88upx;
	background:url(../../static/img/edit.png) no-repeat right center;
	background-size: 40upx;;
}
.rec-des{	
	font-size: 24upx;
	color: #7e7e7e;
	height: 165upx;
	position:relative;	
	h4{
		color:#393939;
		font-size:36upx;
	}
	.share{
		position: absolute;
		right:5vw;
		top:3vw;
		display: inline;
		width:150upx;
		height:100upx;
		font-size: 24upx;
		color: #7e7e7e;
		background:url(../../static/img/share.png) no-repeat top right;
		background-size: 40upx;
		text-align: right;
		line-height: 130upx;
		padding:0;
		margin-right:-20upx;
	}
	.prize{
		font-size: 30upx;
		position: absolute;
		right:3vw;
		top:3vw;
	}
	.bottom{
		position:absolute;
		bottom:0;
		left:3vw;
		width:94vw;
		height:80upx;
		.teacherbox{
			
			.head{
				width:60upx;
				height:60upx;
				border-radius: 50%;
				overflow: hidden;
				margin-right:2vw;
				image{
					width:100%;
				}
				float:left;
			}
			.teacher{
				width: 50vw;
				h1{
					font-size: 24upx;
					color:#393939;
					font-weight: normal;
					line-height: 100%;
				}
				text{
					font-size: 20upx;
					color: #7e7e7e;
				}
			}
		}
		.fr{
			margin-top: 20upx;
		}
		
		
	}
	
}


.bottomBar{
	position: fixed;
	box-shadow:0px 0px 18px 0px rgba(0, 0, 0, 0.09);
	background: #fff;
	width:100vw;
	height:95upx;
	z-index:9;
	right: 0;
	bottom:0;
	font-size:20upx;
	color:#787878;
	.fl{
		display: inline-block;
		width:280upx;
		height:80upx;
		line-height:35upx;
		text-align: left;
		margin-left: 5vw;
		margin-top:20upx;
	}
	.prize{
		font-size: 30upx;;
	}
	.sign-up{
		position:absolute;
		right:5vw;
		bottom:10upx;
		width:405upx;
		height:72upx;
		line-height:72upx;
		border-radius: 8upx;
		text-align: center;
		font-size: 24upx;
		color:#fff;
		background:#ff8300;
	}
}
.cont{
	min-height:80vh;
	padding-top:0;
	dl{
		background: url(../../static/img/info-arr.png) no-repeat right center; 
		background-size: 30upx;
		height:88upx;
		line-height:88upx;
		border-bottom:1px solid #ededed;
		dt{
			font-size:28upx;
			color:#7e7e7e;
			display: inline-block;
			width: 30vw;
			float:left;
		}
		dd{
			font-size:28upx;
			color:#343434;
			display: inline-block;
			width:60vw;
			input{
				display: inline-block;
				height:88upx;
				line-height:88upx;
				width:100%;
			}
		}
	}
	.noIco{
		background: none;
	}
	}
	
	.line{
		padding:0 20upx;
	}
	
</style>
