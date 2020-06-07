<template>
	<view>
		<swiper  :autoplay="true" :interval="3000" :duration="1000">
			<swiper-item v-for="(item,index) in organization.images" :key="index" >
				<image :src="item" mode="widthFix"></image>
				<view class="num">
					<text>{{index+1}}/{{organization.images.length}}</text>
					<view class="bg"></view>
				</view>
			</swiper-item>
		</swiper> 
		<!-- <view class="banner">
			<image :src="organization.cover" ></image>
		</view> -->
		
		<view class="box">
			<view class="">
				<dl @click="goMap">
					<dt>地址</dt>
					<dd>{{organization.address}}</dd>
				</dl>
				<dl @click="goCall">
					<dt>电话</dt>
					<dd>{{organization.tel}}</dd>
				</dl>
			</view>
			<view class="des">
				<h4>机构介绍</h4>
				<view v-html="organization.description"></view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				organization:[],
				about:[
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
		onLoad() {
			this.getOrganization();
		},
		methods: {
			getOrganization(){
				this.$api.organization().then(res => {
					this.organization = res.data;
					console.log('organization:',this.organization)
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
				    phoneNumber: this.organization.tel
				});
			}
			
		},
		/* onLoad:function(){
			goCall();
		} */
		
	}
</script>

<style lang="scss" scoped>
	@import "../../static/style/base.scss";
	swiper{
		hegiht:800upx;
		swiper-item{
			position: relative;
			hegiht:800upx;
			.num{
				font-size: 18upx;
				color:#fff;
				position:absolute;
				right:5vw;
				bottom:20upx;
				width:76upx;
				height:38upx;
				line-height:38upx;
				text-align: center;
				text{
					position:relative;
					left:0;
					z-index: 3;
				}
				.bg{
					position:absolute;
					left:0;
					top:0;
					width:100%;
					height:100%;
					background:#000;
					opacity:0.3;
					border-radius:19upx;

				}
			}
			
		}
		
	}
	.banner{
		hegiht:420upx;
		width:100%;
		overflow: hidden;
	}
	dl{
		background: url(../../static/img/info-arr.png) no-repeat right center; 
		background-size: 30upx;;
		border-bottom: 1px solid #eee;
		height:88upx;
		line-height:88upx;
		dt{
			font-size:28upx;
			color:#7e7e7e;
			display: inline-block;
			width: 100upx;
		}
		dd{
			font-size:28upx;
			color:#343434;
			display: inline;
		}
	}
	.des{
		margin-top:10upx;
		h4{
			font-size:30upx;
			color: #393939;
			padding: 20upx 0;
		}
		p{
			font-size:24upx;
			color:#7e7e7e;
			line-height:36upx;
		}
		.img{
			padding:20upx 0;
		}
	}
	
</style>
