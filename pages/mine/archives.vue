<template>
	<view class="box">
		<child v-for="(item,index) in children" :key="item.id" :child="item"></child>
		<view @click="goArchiveAdd" class="sign-up">添加</view>		
	</view>
</template>

<script>
	import user from '../../api/user.js'
	import child from '../../components/child.vue'
	export default {
		data() {
			return {
				children:[]
			}
		},
		components:{
			child
		},
		onShow() {
			this.list()
		},
		methods: {
			list() {
				user.listChildren().then(res => {
					this.children = res.data
				})
			},
			goArchiveAdd:function(){
				uni.navigateTo({
					url:'archivesAdd'
				})
			}
			
			
		}

	}
</script>

<style lang="scss" >
	@import "../../static/style/base.scss";



.sign-up{
		position:absolute;
		right:5vw;
		bottom:20upx;
		width:90vw;
		height:72upx;
		line-height:72upx;
		border-radius: 8upx;
		text-align: center;
		font-size: 24upx;
		color:#fff;
		background:#ff8300;
	}

</style>
