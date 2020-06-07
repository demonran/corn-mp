<template>
	<view :class="'coupon-content coupon-content-' + type">
		<view class="left">
			<view class="price">
				¥<span>{{count}}</span>		
			</view>
			<text>{{tip}}</text>
		</view>				
	</view>
</template>

<script>
	export default {
		props: ['count', 'type', 'tip'],
		data() {
			return {

			};
		},
	}
</script>

<style lang="scss" scoped>

	
	.coupon-content{
		&.coupon-content-0{
			background: url(../../static/img/coupon3.png) no-repeat center center;
			background-size: 100% 100%;
		}
		&.coupon-content-1{
			background: url(@/static/img/coupon4.png) no-repeat center center;
			background-size: 100% 100%;
		}
		position: relative;
		left:-5vw;
		color:#FE8300;
		font-size:24upx;
		margin-bottom:40upx;
		.left{
			margin-left:40upx;
			padding:20upx 0;
			.price{
				span{
					font-size:60upx;
				}
			}
			text{
				color:#979797;
			}
		}
	}
	
</style>
