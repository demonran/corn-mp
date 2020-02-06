<template>
	<view>
		<view class="top">
			<view class="agency   ">
				<view class="agency-logo">
					<image class="null" :src="headimg"></image>
				</view>
				<view class="agency-des">
					<h1 class="a-line">{{teacher}}</h1>
					<view class="a-line">
						<text>{{teacherType}}</text><text class="line">|</text><text>{{year}}年经验</text>
					</view>
				</view>
			</view>
			<image class="tbg" src="" mode="widthFix"></image>
		</view>
		
		
		<view class="box">
			<view class="des">
				<h4>教师介绍</h4>
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
				headimg:'',
				teacher:'郭老师',
				teacherType:"美术教师",
				year:'8'
			}
		},
		methods: {
			
		}
	}
</script>

<style lang="scss" scoped>
	@import "../../static/style/base.scss";
	.top{
		position:relative;
		height: 750upx;
		.tbg{
				background: #666;
				height: 750upx;
				position:absolute;
				top:0;
				left:0;
				z-index: -1;
			}
		.agency{
				text-align: center;
				padding-top:130upx;
				.agency-logo{
					width:200upx;
					height:200upx;
					margin:60upx auto;
					border-radius: 50%;
					overflow: hidden;
					
					border: 2px solid #fff;;
				}
				.agency-des{
					color:#fff;
					h1{
						font-size: 48upx;
					}
					text{
						font-size: 24upx;
						
					}
					.line{
						padding:0 20upx;
					}
				}
		
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
