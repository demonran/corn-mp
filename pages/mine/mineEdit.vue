<template> 
<view class="box content"> 
	<view class="cont">
		<navigator url="editHead">
			<dl>
				<dt>头像</dt>
				<dd>
					<image class="head" :src="userInfo.avatarUrl" mode=""></image>
				</dd>
			</dl>
		</navigator>
		<navigator url="editName">
			<dl >
				<dt>昵称</dt>
				<dd>
					{{userInfo.nickName}}
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
				<dd>{{userInfo.country}} {{userInfo.province}}  {{userInfo.city}}</dd>
			</dl>
		</navigator>
	</view>
</view>
</template>

<script>
	export default {
		data() {
			return {
				userInfo:'',
				sex:'',
				tel:''
				
			}
		},
		methods: {
			initUserInfo() {
				this.$api.userInfo().then(res => {
					this.userInfo = res.data.data;
					console.log('123')
					console.log(res.data.data)

					if(this.userInfo.gender==1){
						this.sex = '男'
					}else if(this.userInfo.gender==2){
						this.sex = '女'
					}else{
						this.sex = '未知'
					}
				})
			},

		},
		onLoad() {
			this.initUserInfo();
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
