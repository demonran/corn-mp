<template>
	<view class="box">
		<view class="null" v-if="children==''">
			<no-data></no-data>
		</view>
		<radio-group v-if="from">
			<radio class="radio" :value="item.id" @click="select(item)" child v-for="(item,index) in children" :key="item.id" >
				<child :child="item"></child>	
			</radio>
		</radio-group>
		<child v-else v-for="(item,index) in children" :key="item.id" :child="item"></child>	
		<view class="sign-up">
			<button @click="goArchiveAdd" >添加</button>
		</view>		
	</view>
</template>

<script>
	import user from '../../api/user.js'
	import child from '../../components/child.vue'
	import noData from '../../components/noData.vue'
	
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
			uni.$on("childrenUpdated", this.list)
			this.from = options.from
			this.list()
		},
		methods: {
			select(child) {
				uni.$emit("childSelected", child)
				this.$navigateBack()
				
			},
			list() {
				
				user.listChildren().then(res => {
					this.children = res.data
				})
			},
			goArchiveAdd(){
				this.$navigateTo('archivesAdd')
			},
			
			onUnload() {
				console.log("onUnload")
				uni.$off("childrenUpdated")
			}
			
			
		}

	}
</script>

<style lang="scss" scoped>
	@import "../../static/style/base.scss";
	.box{
		position: relative;
		min-height:90vh;
	}
	.null{
		text-align: center;
		position: absolute;
		top:200upx;
		width: 100%;
	}
.radio{
	width:100%;
	border-bottom: 1px solid #eee;
	position: relative;
}


.sign-up{
		position:absolute;
		right:0;
		bottom:-8vh;
		padding-bottom: 40upx;
		button{
			height:6vh;
			width:90vw;
			line-height:6vh;
			border-radius: 8upx;
			text-align: center;
			font-size: 24upx;
			color:#fff;
			background:#ff8300;
		}
	}

</style>
