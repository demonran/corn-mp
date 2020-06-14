<template>
	<view class="">
		<view class="null" v-if="children==''">
			<image src="../../static/img/null.jpg" mode=""></image>
			<text>没有数据！</text>
		</view>
	</view>

</template>

<script>
	export default {
		props: [],
		mounted() {
		},

		methods: {

		}

	}
</script>

<style lang="scss">
	@import "../static/style/base.scss";
	.null{
		text-align: center;
		position: absolute;
		top:200upx;
		width: 100%;
		image{
			width:50%;
			margin:40upx auto;
		}
		text{
			margin:0 auto;
		}
	}
</style>
