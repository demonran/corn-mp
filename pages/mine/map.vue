<template>
	<view>
		<view class="page-body">
			<view class="page-section page-section-gap">
				<map :latitude="latitude" :longitude="longitude" :markers="covers">
				</map>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				title: 'map',
				latitude: 39.909,
				longitude: 116.39742,
				covers: [{
					latitude: 39.909,
					longitude: 116.39742,
					iconPath: '../../static/img/map.png',
				}]
			}
		},
		methods: {
			
		}
	}
</script>

<style lang="scss" scoped>
	@import "../../static/style/base.scss";
	map{
		width:100vw;
		height:100vh;
	}
	
</style>
