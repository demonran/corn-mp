<template>
	<view class="box">
			<view class="title">
				<h3>{{title}}</h3>
				<span>{{classify}}</span><span class="line">|</span><span>{{date}}</span>
			</view>
			<p>
				刘襄（前201-前179年）汉高祖刘邦长孙，齐悼惠王刘肥长子，西汉宗室、诸侯王。前189年，刘肥去世，刘襄即齐王位。前188年汉惠帝刘盈驾崩，吕后临朝称制。次年，吕台封王，割齐济南郡为吕王奉邑。前186年，其弟刘章入宿卫长安，封朱虚侯，前180年，吕后驾崩，吕产、吕禄准备举行政变，刘章知其谋，阴告他发兵入关诛诸吕，以乘机夺取帝位，刘襄遂举兵西进。吕产闻迅派灌婴率兵迎击，灌婴至荥阳屯兵，使人与齐连和。
			</p>
			<view class="img">
				<image src="../../static/img/banner.png" mode="widthFix"></image>
			</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
				title:"中央积极投身粤港澳大湾区建设澳大湾区建设",				
				classify:"机构新闻",
				date:"2019-02-16"
			}
		},
		methods: {
			
		}
	}
</script>

<style lang="scss" scoped>
	@import "../../static/style/base.scss";
.title{
	padding:30upx 0;
	border-bottom:1px solid #eee;
	margin-bottom:40upx;
	h3{
		font-size:48upx;
		color: #393939;
		padding: 20upx 0;
	}
	span{
		font-size:24upx;
		color:#acacac;
	}
}
		
		p{
			font-size:24upx;
			color:#7e7e7e;
			line-height:36upx;
		}
		.img{
			padding:20upx 0;
		}

</style>
