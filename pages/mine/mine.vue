<template> 
<view class="box content"> 
	
	
	<div class="user">
		<view class="agency-logo">
			<image class="null" :src="image"></image>
		</view>
		<view class="agency-des" v-if="isAuthorize==false">
			<button class="loginBtn"  open-type="getUserInfo" @getuserinfo="getHandle">
			<h1 class="a-line">
				未登录
			</h1>
			<text class="a-line">点击登陆</text>
			</button>
		</view>
		<view class="agency-des" v-if="isAuthorize==true">
			<navigator url="mineEdit">
			<h1 class="a-line">{{name}}</h1>
			<text class="a-line">{{tel}}</text>
			</navigator>
		</view>
	</div>
	

	<view class="nav-list flex shadow">
		<view class="nav-box"  hover-class="nav-hover" v-for="(item,index) in nav" :key="index">
			<navigator :url="item.goUrl">
				<image :src="item.image"></image>
				<view class="text">{{item.title}}</view>
			</navigator>					
		</view>
	</view>
	<view class="cont">
		<navigator url="/pages/mine/archives">
			<dl>
				<dt>学生档案</dt>
			</dl>
		</navigator>
		<navigator url="../share/share">
			<dl>
				<dt>分享课程</dt>
				<dd class="orange-color">送好友优惠券，得200元现金奖励</dd>
			</dl>
		</navigator>
		<navigator url="/pages/mine/about">
			<dl >
				<dt>关于我们</dt>
			</dl>
		</navigator>
		<dl @click="goCall">
			<dt>联系我们</dt>
			<dd>028-9788 0265</dd>
		</dl>
	</view>
</view>
</template>

<script>
	export default {
		data() {
			return {
				isAuthorize:false,
				image:'',
				name:'张三',
				tel:'13888888888',
				nav:[
					{
					title:"我的报名",
					image:"../../static/img/nav4.png",
					goUrl:"../signup/mySign"
				},{
					title:"我的收藏",
					image:"../../static/img/nav5.png",
					goUrl:"../collection/collection"
				},{
					title:"优惠券",
					image:"../../static/img/nav6.png",
					goUrl:"../mine/coupon"
				}
				]
			}
		},
		onLoad() {
			// 初始时获取用户设置
			            this.accessPermission();
		},
		methods: {
			// 执行获取用户设置的函数
			accessPermission() {
				// 赋值this指向
				var _this=this;
				// 获取授权信息
				uni.getSetting({
				    success(res) {
						// 判断scope后对应的scope.userInfo是否授权
				        if (res.authSetting['scope.userInfo']) {
				            // 如果已经授权,则获取用户信息
				            uni.getUserInfo({
				                success(res){
									console.log("获取用户信息成功")
				                    // 获取信息后执行登录
									console.log(res)
									_this.isAuthorize=true
				                     _this.WX_MP_getuserinfo(res);
				                },
				                fail(err){
				                    console.log("获取用户信息失败")
										_this.isAuthorize=false
				                    }
				                })
				        } else if (!res.authSetting['scope.userInfo']) {
				            // 如果没有授权则进行提前授权--进入页面时弹出
				            // 不配置此项初次进入页面不会弹出申请权限窗口
				            uni.authorize({
				                // 配置授权选项--用户账号信息
				                scope:'scope.userInfo',
				                success(res){
				                    // 授权成功后可以直接获取用户相关信息
				                    console.log("授权成功")
				                },
				                fail(err){
				                    // 提前授权失败时,等待用户手动点击授权
				                    console.log("授权失败")
				                }
				            })
				        };
				    }
				})
			},
            // 点击按钮激发授权事件
             getHandle() {
                 // 重赋值this
                 var _this=this;
                 // 获取用户授权设置
                 uni.getSetting({
                     success(res){
                         if(res.authSetting['scope.userInfo']){
                             // 如果要获取的权限已经授权,则直接获取相关信息
                             uni.getUserInfo({
                                 success(res){
                                     // 获取相关数据后，进行登录及数据请求
									 console.log('请求登陆')
									 _this.isAuthorize=true
                                     _this.WX_MP_getuserinfo(res);
                                 },
                                 fail(err){
                                     // 错误信息
                                     console.log(err)
									 _this.isAuthorize=false
                                 }
                             })
                         }else if(!res.authSetting['scope.userInfo']){
                             // 如果要获取的权限尚未授权,则此时触发授权，打开设置页面
                             uni.showModal({
                                 //弹出提示框
                                 title: '是否打开设置页？',
                                 content: '需要在设置中获取个人信息和微信登陆权限',
                                 success(res) {
                                     if (res.confirm) {
                                         uni.openSetting({
                                             // 弹出框，确认后打开设置页面
                                             success(res) {
                                                 console.log(res.authSetting)
												 _this.isAuthorize=true
                                             },    
                                         })
                                     } else if (res.cancel) {
                                         console.log('用户点击取消');
										 _this.isAuthorize=false
                                     }
                                 }
                             });    
                         }
                     }
                 })    
             },							
			WX_MP_getuserinfo(e){
				let that = this;
				let userInfo = e.userInfo;
				this.name = userInfo.nickName;
				this.image = userInfo.avatarUrl;
				uni.login({
				  provider: 'weixin',
				  success: function (loginRes) {
					  that.$api.login(loginRes.code, e.userInfo).then(res =>{
						  console.log(res)
					  	})
				  }
				});
				console.log(e)
			},
			goCall:function(){
				uni.makePhoneCall({
				    phoneNumber: '15281029319' 
				});
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import "../../static/style/base.scss";

	.user{
		padding:60upx 0;
		height:14vw;
		border-radius: 8upx;
		background:#fff url(../../static/img/info-arr.png) no-repeat 85vw center;
		background-size: 40upx;
		.agency-logo{
			width:15vw;
			height:15vw;
			border-radius: 50%;
			overflow: hidden;
			margin-right:2vw;
			float:left;
			image{
				width:100%;
				height:100%;
			}
		}
		.agency-des{
			.loginBtn{
				background: none;
				border:none;
				text-align: left;
				line-height: 150%;
				padding: 0;

				h1{
					font-size: 38upx;
					color:#393939;
					
				}
				text{
					font-size: 24upx;
					color: #7e7e7e;
				}
			}
			
			
		}
	
	}
	.nav-list{
		margin-bottom:40upx;
		height:206upx;
		width:100%;
		justify-content: space-around;
		text-align: center;
		font-weight: bold;
		image{
			width: 72upx;
			height: 73upx;
			margin-top: 50upx;
		}
		.nav-box{
			width:33%;
			height: 206upx;
			color: #4b4b4b;
			font-size: 26upx;
		}
	}
	.cont{
		min-height:80vh;
		padding-top:0;
		dl{
			background: url(../../static/img/info-arr.png) no-repeat right center; 
			background-size: 30upx;
			height:108upx;
			line-height:108upx;
			border-bottom:1px solid #ededed;
			width:100%;
			dt{
				font-size:30upx;
				color:#2b2b2b;
				display: inline-block;
				width: 25vw;
				float:left;
				font-weight: bold;
			}
			dd{
				font-size:28upx;
				color:#4b4b4b;
				text-align:right;
				display: inline-block;
				width:60vw;
				
				
			}
		}
		.noIco{
			background: none;
		}
		}
</style>
