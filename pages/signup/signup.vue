<template>
	<view>
		<view class="sign">
		<view class="boxwhite" @click="goSignInfo"  v-show="signInfo == 0">
			<view class="sign-des orange-color">请填写报名信息</view>
		</view>
		<view class="boxwhite edit" @click="goSignInfo"  v-show="signInfo == 2">
			<view class="sign-des orange-color">
				<view class="student">
					学生：{{studentName}}
				</view>
				<view class="parent">
					<text>家长：{{patriarchName}}</text> 
					<text class="line">|</text>
					<text>电话：{{tel}}</text>
				</view>
			</view>
		</view>
		<view class="rec-des boxwhite" >
			<view class="">
				<view class="word">
					<h4 class="a-line">{{CourseDetail.courseName||course.title}}</h4>
					<p class="a-line">{{CourseDetail.beginDate}}～{{CourseDetail.endDate}} 
				{{CourseDetail.startClassTime}}-{{CourseDetail.endClassTime}}</p>
				</view>			
				<text class="prize" >¥{{CourseDetail.price||course.price}}</text>
			</view>
			<view class="bottom">
				<view class="fl teacherbox">
					<image class="null head" :src="CourseDetail.teacher.avatar||course.teacher.avatar"></image>				
					<view class="teacher">
						<text>{{CourseDetail.courseCategory.name||course.category.name}}</text>
						<h1 class="a-line">{{CourseDetail.teacher.name||course.teacher.name}}</h1>
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
				<dd>¥{{CourseDetail.price||course.price}}</dd>
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
		<view class="bottomBar" v-show="signInfo == 0 || signInfo == 2">
			<view class="fl">
				<view class="prize orange-color">应付：¥{{CourseDetail.price}}</view>
				<!-- <view class="coupon">优惠群优惠：{{coupon}}元</view> -->
			</view>		
			<view @click="goOrder(CourseDetail)" class="sign-up">提交报名</view>
		</view>
		</view>
		
		<view v-show="signInfo==1" class="box goSignInfo">	
			<view class="cont">
				<dl>
					<dt>学生姓名</dt>
					<dd><input :key="student" v-model="studentName"  type="text" placeholder="请输入学生姓名" /></dd>
				</dl>
				<dl>
					<dt>家长姓名</dt>
					<dd><input type="text" v-model="patriarchName" placeholder="请输入家长姓名" /></dd>
				</dl>
				<dl>
					<dt>联系电话</dt>
					<dd><input type="number" maxlength="11" v-model="tel"  placeholder="请输入11位手机号码"/></dd>
				</dl>
			</view>
		
			<view @click="goSignup" class="sign-up">保存</view>
		
		</view>
		
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				CourseDetail:{},
				signInfo:0,
				patriarchName:'',
				studentName:'',
				tel:'',
				course:[]
				
				
			} 
		},
		onLoad(options) {
			this.initCourseDetail(options.id);
			this.initOnlineCourseDetail(options.id);
			
		},
		methods: {
			initOnlineCourseDetail(id) {
				this.$api.onlineCourseDetail(id).then(res => {
					this.course = res.data.data;
				})
			},
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
				this.signInfo = 1
				
			},
			goSignup(){
				this.signInfo = 2
			},
			goOrder(data) {
				let that = this
				//console.log(data)		
				  var a = {		
					 // "id":data.courseId,
					"courseId": data.courseId,
					"courseName": data.courseName,
					"patriarchName": this.patriarchName,
					"studentName": this.studentName,
					"tel": this.tel, 
					
					"totalAmount": data.price
				} 

				this.$api.orders(a).then(res => {					
					console.log(res)
					that.goSignResult()
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
	.sign{
		.edit{
			.student{
				font-size:36upx;
				font-family:PingFang SC;
				color:rgba(57,57,57,1);
				line-height:50upx;
				font-weight:bold;
			}
			.parent{
				font-size:30upx;
				font-family:PingFang SC;
				color:rgba(126,126,126,1);
				line-height:36upx;
			}	
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
			width:300upx;
			overflow:hidden;
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


}
.goSignInfo{
	position: absolute;
	top: 0;
	left: 0;
	width: 90vw;
	height: 100vh;
	background: #fff;
	margin: 0;
	padding: 5vw;

		
		.sign-up{
			width:100%upx;
			height:72upx;
			line-height:72upx;
			border-radius: 8upx;
			text-align: center;
			font-size: 24upx;
			color:#fff;
			background:#ff8300;
		}
	
	.cont{
		
		dl{
			font-size:30upx;
			margin:60upx 0;
			border-bottom:1px solid #ededed;
			dt{
				color:#212121;
				margin-top:20upx;
			}
			dd{
				color:#aaaaaa;
				input{
					
					line-height:88upx;
					height: 88upx;
				}
			}
		}
	}
}	
</style>
