<template>
	<view class="sign-des">
		<view class="info">
			<h5>学生：{{child.studentName}}</h5>
			<view>
				<text>家长：{{child.patriarchName}}</text><text class="line">|</text><text>电话：{{child.tel}}</text>
			</view>
		</view>
		<image src='../static/img/edit.png' @click.stop="goArchiveEdit"></image>
	</view>

</template>

<script>
	import user from '../api/user.js'
	export default {
		props: ['child'],

		mounted() {
			console.log(this.child)
		},

		methods: {

			goArchiveEdit: function() {
				this.$navigateTo(`/pages/mine/archivesAdd?id=${this.child.id}`)
			}


		}

	}
</script>

<style lang="scss">
	@import "../static/style/base.scss";

	.sign-des {
		font-size: 36upx;
		padding: 40upx 0;
		line-height: 50upx;
		text {
			color: #7e7e7e;
			font-size: 30upx;
		}

		display: flex;
		align-items: center;

		image {
			width: 50upx;
			height: 50upx;
			position: absolute;
			right: 40upx;
		}
	}
</style>
