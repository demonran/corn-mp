<template>
	<view>
		<swiper  :autoplay="true" :interval="3000" :duration="1000">
			<swiper-item v-for="(item,index) in about" :key="index" >
				<image :src="item.image" mode="widthFix"></image>
				<view class="num">
					<text>{{index+1}}/{{about.length}}</text>
					<view class="bg"></view>
				</view>
			</swiper-item>
		</swiper>
		<view class="box">
			<view class="">
				<dl @click="goMap">
					<dt>地址</dt>
					<dd>成都市高新区华府大道二段11号</dd>
				</dl>
				<dl @click="goCall">
					<dt>电话</dt>
					<dd>028-66668888</dd>
				</dl>
			</view>
			<view class="des">
				<h4>机构介绍</h4>
				<p>
					刘襄（前201-前179年）汉高祖刘邦长孙，齐悼惠王刘肥长子，西汉宗室、诸侯王。前189年，刘肥去世，刘襄即齐王位。前188年汉惠帝刘盈驾崩，吕后临朝称制。次年，吕台封王，割齐济南郡为吕王奉邑。前186年，其弟刘章入宿卫长安，封朱虚侯，前180年，吕后驾崩，吕产、吕禄准备举行政变，刘章知其谋，阴告他发兵入关诛诸吕，以乘机夺取帝位，刘襄遂举兵西进。吕产闻迅派灌婴率兵迎击，灌婴至荥阳屯兵，使人与齐连和。
				</p>
				<view class="img">
					<image src="../../static/img/banner.png" mode="widthFix"></image>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
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
			}
			
		},
		onLoad:function(){
			goCall();
		}
		
	}
</script>

<style lang="scss" scoped>
	@import "../../static/style/base.scss";
	swiper{
		hegiht:422px;
		swiper-item{
			position: relative;
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
