<template>
	<view class="box">
		<dl v-for="(item,index) in list" :key="index">
			<dt>
				<h2>{{item.name}}</h2>
				<p class="orange" v-if="item.status==0">提现中</p>
				<p class="green" v-if="item.status==1">已到账</p>
				<h5 class="prize ">￥{{item.prize}}</h5>
			</dt>
			<dd>
				<text class="time">申请时间：{{item.time1}}</text>
				<text class="time">预计到账：{{item.time2}}</text>
			</dd>
		</dl>
	</view>
</template>

<script>

export default {
	
		data() {
			return {
				list:[
					{
						name:'微信提现微信号',
						status:'0',
						time1:'07-16 12:00',
						time2:'07-16 12:00',
						prize:'780'
					},
					{
						name:'微信提现微信号',
						status:'1',
						time1:'07-16 12:00',
						time2:'07-16 12:00',
						prize:'780'
					},
					{
						name:'微信提现微信号',
						status:'0',
						time1:'07-16 12:00',
						time2:'07-16 12:00',
						prize:'780'
					},
					{
						name:'微信提现微信号',
						status:'0',
						time1:'07-16 12:00',
						time2:'07-16 12:00',
						prize:'780'
					}
				]
			}
		}, 	
		methods: {
	
		
		}

		
	}
</script>


<style lang="scss" >
	@import "../../static/style/base.scss";
	dl{
		border-bottom: 1px solid #eee;
		padding:20upx 0;
		position:relative;
		.prize{
			font-size: 40upx;
			position: absolute;
			right:0;
			top:60upx;
			color:#FF8300;
		}
		h2{
			font-size:30upx;
			color:#000;
			display: inline;
			margin-right:20upx;
			line-height:200%;
		}
		p{
			font-size:24upx;
			color:#595959;
		}
		text{
			font-size:24upx;
			color:#595959;
			display: block;
		}
		.orange{
			background: url(../../static/img/orange.png) no-repeat center  center;
			background-size:100%;
			color:#fff;
			text-align: center;
			display: inline-block;
			width:90upx;
			height:32upx;
			line-height: 32upx;
		}
		.green{
			background: url(../../static/img/green.png) no-repeat center  center;
			background-size:100%;
			color:#fff;
			text-align: center;
			display: inline-block;
			width:90upx;
			height:32upx;
			line-height: 32upx;
		}
	}

</style>
