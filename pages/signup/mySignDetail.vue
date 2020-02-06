<template>
	<view>
		<view v-if="status==0" class="boxwhite top">
			<h3>待支付</h3>
			<p class="orange-color">未支付的报名将在15分钟后取消</p>
		</view>
		<view v-if="status==1" class="boxwhite top top2">
			<h3>已支付</h3>
			<p>已上0课时，剩余20课时</p>
		</view>
		<view class="student ">	
			<view class="box">
				<image class="fl" src="../../static/img/student.png" mode="widthFix"></image>
				<h5>学生：{{name}}</h5>
				<view>
					<text>家长：{{parent}}</text><text class="line">|</text><text>电话：{{tel}}</text>
				</view>
			</view>		
		</view>
		<view class="rec-des boxwhite" >
			<view class="">
				<view class="word">
					<h4 class="a-line">{{title}}</h4>
					<p class="a-line">{{time}}</p>
				</view>			
				<text class="prize" >{{prize}}</text>
			</view>
			<view class="bottom">
				<view class="fl teacherbox">
					<image class="null head" :src="headimg" mode="widthFix"></image>				
					<view class="teacher">
						<text>{{teacherType}}</text>
						<h1 class="a-line">{{teacher}}</h1>
					</view>					
				</view>
				<text class="fr" >
					<text class="classHour">共{{classHour}}课时</text><text class="line">|</text><text>限{{num}}人</text>
				</text>
			</view>
		</view>
		<view class="cont boxwhite">
			<dl class="noIco">
				<dt>课程费用</dt>
				<dd>¥1880</dd>
			</dl>
			<dl>
				<dt>优惠券</dt>
				<dd>-200</dd>
			</dl>
			<dl>
				<dt>应付金额</dt>
				<dd class="orange-color">¥1880</dd>
			</dl>
			<dl>
				<dt>备注说明</dt>
				<dd>无</dd>
			</dl>
			<dl>
				<dt>提交时间</dt>
				<dd>2019.09.09 12:00:00</dd>
			</dl>
		</view>
		<view  v-if="status==0" class="bottomBar">
			<view class="btn sign-up">立即支付</view>
			<view class="btn">取消订单</view>			
		</view>
		<view  v-if="status==1" class="bottomBar">
			<view class="btn sign-up">报名续费</view>
			<view class="btn">查看课表</view>			
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				status:1,
				name:'李莉莉',
				parent:'李丽',
				tel:'13888888888',
				title:'2019少儿美术周末班',
				time:'2019.09.01 - 2019.12.11 周六 09:00 - 12:00 拷贝 9',
				prize:'1880',
				coupon:'200',
				classHour:'20',
				num:'60',
				headimg:'',
				teacher:'郭老师',
				teacherType:'美术教师',
				year:'8',
				course:[
					{
						image:"../../static/img/banner.png"
					},
					{
						image:"../../static/img/banner.png"
					},
					{
						image:"../../static/img/banner.png"
					},
					{
						image:"../../static/img/banner.png"
					},
					{
						image:"../../static/img/banner.png"
					},
					{
						image:"../../static/img/banner.png"
					}
				]
			}
		},
		methods: {
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
		onLoad() {
			uni.getStorage({
			    key: 'student',
			    success: function (res) {
			        console.log(res.data);
			    }
			});
		}
	}
</script>

<style lang="scss" >
	@import "../../static/style/base.scss";
	page{
		background: #F7F7F7;
	}
	.top{
		h3{
			font-size:40upx;
			color:#393939;
		}
		p{
			font-size: 24upx;
		}
	}
	.top2{
		h3,p{
			color:#767676;
		}
	}
	.student{
		background: #fff;
		margin-bottom:20upx;
		font-size: 36upx;
		padding:40upx 0;
		line-height:50upx;
		background-size: 40upx;
		image{
			width:60upx;
			margin-right:20upx;
			margin-top:20upx;
		}
		text{
			color:#7e7e7e;
			font-size:30upx;
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
				width: 60vw;
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
	
	.btn{
		border-radius: 8upx;
		text-align: center;
		font-size: 28upx;
		border:1px solid #ccc;
		color:#767676;
		height:72upx;
		line-height:72upx;
		display: inline-block;
		padding:0 40upx;
		float:right;
		margin-top:10upx;
		margin-right:20upx;
	}
	.sign-up{
		padding:0 80upx;
		color:#fff;
		background:#ff8300;
		border:none;
		margin-right:3vw;
	}
}
.cont{
	min-height:80vh;
	padding-top:0;
	dl{
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
			text-align: right;
			color:#343434;

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
