<template>
	<view class="box">
		
		<radio-group v-if="from">
			<radio :value="item.id" @click="select(item)" child v-for="(item,index) in children" :key="item.id" >
				<child :child="item"></child>	
			</radio>
		</radio-group>
		<child v-else v-for="(item,index) in children" :key="item.id" :child="item"></child>	
		
		
		
		<view @click="goArchiveAdd" class="sign-up">添加</view>		
	</view>
</template>

<script>
	import user from '../../api/user.js'
	import child from '../../components/child.vue'
	
	export default {
		data() {
			return {
				children:[],
				from:''
			}
		},

		components:{
			child
		},
		onLoad(options) {
			this.from = options.from
			this.list()
		},
		methods: {
			select(child) {
				console.log(child)
				uni.$emit("childSelected", child)
				this.$navigateBack()
				
			},
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
