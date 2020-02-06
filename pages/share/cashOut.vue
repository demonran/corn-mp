<template>
	<view>
		<view class="top">
			<text>可提现金额</text>
			<p class="orange-color">￥800</p>
			<navigator class="btn" url="cashRecord">提现记录</navigator>
		</view>
		<view class="bottom">
			
		
		<view class="box">
			<form @submit="formSubmit" >
				<view class="uni-form-item uni-column">
					<view class="title">到账微信号</view>
					<input class="uni-input" name="tel" placeholder="13888888888" />
					<text class="fr">切换账号 ></text>
				</view>
				<view class="uni-form-item uni-column">
					<view class="title">提现金额</view>
					<input class="uni-input" name="prize" placeholder="请输入提现金额" />
					<text class="fr">全部提现</text>
				</view>
				<view class="sub">
					<button class="btn" form-type="submit">立即提现</button>	
					<view>预计3-5个工作日到账</view>
				</view>
				
			</form>
		</view>
		</view>
	</view>
</template>

<script>

export default {
	
		data() {
			return {
				
			}
		}, 	
		methods: {
			 formSubmit: function(e) {
				console.log('form发生了submit事件，携带数据为：' + JSON.stringify(e.detail.value))
				uni.navigateTo({
					url: 'cashSuccess',
					success: res => {},
					fail: () => {},
					complete: () => {}
				});
			},
		
		}

		
	}
</script>


<style lang="scss" >
	@import "../../static/style/base.scss";
	page{
		background: #F7F7F7;
	}
.top{
	text-align: center;
	padding:80upx 0 40upx 0;
	background: #fff;
	position: relative;
	text{
		font-size:24upx;
		color:#595959;

	}
	p{
		font-size: 60upx;
		font-weight: bold;
	}
	navigator{
		position: absolute;
		top:20upx;
		right:3vw;
		color:#595959;
		border:1px solid #ababab;
		display:inline-block;
		color:#595959;
		border-radius:4px;
		height:56upx;
		line-height:56upx;
		text-align: center;
		padding:0 40upx;
		font-size:24upx;
	}

}




.bottom{
	background: #fff;
	margin-top:20upx;
	height:80vh;
	padding-top:20upx;
	form{
		
		.uni-form-item{
			border-bottom:1px solid #eee;
			font-size:24upx;
			color:#3A3A3A;
			line-height:200%;
			padding:20upx 0;
	
			.title{
				color:#595959;
			}
			input{
				display: inline-block;
				font-size:36upx;
			}
			
		}
		
	}
	.sub{
		width:100%;
		text-align: center;
		padding-top:40upx;
		.btn{
			color:#fff;
			background:rgba(255,131,0,1);
			border-radius:4px;
			height:88upx;
			line-height:88upx;
			text-align: center;
			font-size:30upx;
		}
		view{
			display: inline-block;
			width:100%;
			color:#595959;
			font-size:24upx;
		}
	}
	
}
</style>
