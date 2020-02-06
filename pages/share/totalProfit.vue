<template>
	<view >
		<view class="sharebox">	
			<dl >
				<dt>累计收益</dt>
				<dd class="orange-color">￥800</dd>
			</dl>
		</view>
		<view class="ul">
		<view class="box" >
			<view class="li" v-for="(item,index) in list" v-if="list.length > 0" :key="index">
				<image class="null head" :src="item.headimg"></image>				
				<view>
					<h2>{{item.name}}</h2>
					<p class="orange" v-if="item.status==0">{{item.time}}领取了优惠券</p>
					<p class="green" v-if="item.status==1">{{item.time}}使用了优惠券</p>
					<text class="prize orange-color">+{{item.prize}}</text>
				</view>					
			</view>
		</view>
		</view>

	</view>
</template>

<script>
export default {
	
	data() {
		return {
		
			list: [
				
					{
						headimg:"",
						name:"小李",
						time:"2018.06.06",
						prize:"200",
						status:0
					},
					{
						headimg:"",
						name:"小李",
						time:"2018.06.06",
						prize:"200",
						status:1
					},
					{
						headimg:"",
						name:"小李",
						time:"2018.06.06",
						prize:"200",
						status:1
					}
				]
		};
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
		
	methods: {

		changeTab(index){
			this.currentTab = index
		},
	
		// swiper 滑动
		swiperTab: function(e) {
			var index = e.detail.current //获取索引
			if(this.tabTitle.length<=4){
				this.$refs.navTab.navClick(index)
			}else{
				this.$refs.navTab.longClick(index)
			}
		}

	}
};
</script>

<style lang="scss">
@import "../../static/style/base.scss";
page{
	background: #eee;
}
.sharebox{
		
		padding:50upx 0;
		background:#fff;
		text-align:center;
		margin-bottom:20upx;
		dl{
			height:140upx;
			
			dt{
				font-size:24upx;
				color:#393939;
				
			}
			dd{
				font-size:72upx;
			}
		}
	}
.ul{
	
	background:#fff;
	.li{
		position:relative;
		border-bottom:1px solid #eee;
		padding:40upx 0;
	}
	.head{
		width:96upx;
		height:96upx;
		border-radius: 50%;
		float:left;
		margin-right:20upx;
	}
	h2{
		color:#000;
		font-size:28upx;
		display: inline-block;
		margin-right: 20upx;
	}
	p{
		color:#595959;
		font-size:24upx;
	}
	.prize{
		font-size: 40upx;
		position: absolute;
		right:0;
		top:60upx;
	}
	span{
		font-size: 24upx;
		color:#fff;
		text-align: center;
		display: inline-block;
		width:90upx;
		height:32upx;
		line-height: 32upx;
	}
	span.orange{
		background: url(../../static/img/orange.png) no-repeat center  center;
		background-size:100%;
	}
	span.green{
		background: url(../../static/img/green.png) no-repeat center  center;
		background-size:100%;		
	}
}
</style>
