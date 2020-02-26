<template> 
<view class="box content"> 
	<view class="cont">
		<navigator url="editHead">
			<dl>
				<dt>头像</dt>
				<dd>
					<image class="head" :src="head" mode=""></image>
				</dd>
			</dl>
		</navigator>
		<navigator url="editName">
			<dl >
				<dt>昵称</dt>
				<dd>
					{{name}}
				</dd>
				
			</dl>
		</navigator>
		<navigator url="editSex">
			<dl >
				<dt>性别</dt>
				<dd>{{sex}}</dd>
			</dl>
		</navigator>
		<navigator url="editTel">
			<dl >
				<dt>手机</dt>
				<dd>{{tel}}</dd>
			</dl>
		</navigator>
		<navigator url="editAddr">
			<dl >
				<dt>地址</dt>
				<dd>{{addr}}</dd>
			</dl>
		</navigator>
	</view>
</view>
</template>

<script>
	export default {
		data() {
			return {
				name:'',
				head:'',
				sex:'',
				tel:'',
				addr:''
				
			}
		},
		methods: {
			getInfo(){
				
			}

		},
		onLoad() {
			let that = this
			wx.getUserInfo({
				
			  success: function(res) {

				let userInfo = res.userInfo;
				that.name= userInfo.nickName
				that.head = userInfo.avatarUrl
				that.addr = userInfo.country + userInfo.province + userInfo.city
				
				 
			    if(userInfo.gender==1){
					that.sex = '男'
				}else if(userInfo.gender==2){
					that.sex = '女'
				}else{
					that.sex = '未知'
				}
				
			/*    var gender = userInfo.gender //性别 0：未知、1：男、2：女
			    var province = userInfo.province
			    var city = userInfo.city
			    var country = userInfo.country */
				
			  }
			})
		},
		onShow:function(){
	
		},
		onHide:function(){
	
		}
	}
</script>

<style lang="scss" scoped>
	@import "../../static/style/base.scss";

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
				color:#616161;
				display: inline-block;
				width: 25vw;
				float:left;
				
			}
			dd{
				font-size:28upx;
				color:#222222;
				text-align:right;
				display: inline-block;
				width:60vw;
				.head{
					width:70upx;
					height:70upx;
					border-radius:50%;
					background: #eee;
					margin-top:20upx;
				}
				input{
					height:108upx;
					line-height:108upx;
				}
				
			}
		}
		.noIco{
			background: none;
		}
		}
</style>
