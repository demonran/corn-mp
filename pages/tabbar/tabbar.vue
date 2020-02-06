<template>
	<view class="content">
		<view v-if="tab==0"><index></index></view>
		<view v-if="tab==1"><course></course></view>
		<view v-if="tab==2"><study></study></view>
		<view v-if="tab==3"><mine></mine></view>
		<ul class="tabbar">
			<li :class="tab==0?'active':''" @click="changeTab(0)"><span>首页</span></li>
			<li :class="tab==1?'active':''" @click="changeTab(1)"><span>选课</span></li>
			<li :class="tab==2?'active':''" @click="changeTab(2)"><span>学习</span></li>
			<li :class="tab==3?'active':''" @click="changeTab(3)"><span>我的</span></li>
		</ul>
	</view>
</template>

<script>
	import index from '../index/index.vue'
	import course from '../course/course.vue'
	import study from '../study/study.vue'
	import mine from '../mine/mine.vue'
	export default {
		components:{
			index,
			course,
			study,
			mine
		},
		data() {
			return {
				tab:0
			}
		},
		methods: {
			changeTab(tab){
				this.tab = tab
			}
		}
	}
</script>

<style lang="scss" scoped>
	.tabbar{
		width: 100vw;
		height: 88upx;
		line-height: 88upx;
		background: #fff;
		position: fixed;
		bottom: 0;
		left:0;
		display: flex;
		justify-content: space-between;
		border-top: 1px solid #e5e5e5;
		li{
			color: #8a8a8a;
			font-size: 30upx;
			text-align: center;
			width:25vw;
			font-weight: bold;
		}
		li.active{		
			color:#4b4b4b;
			span{
				background: url(../../static/img/tabbar-line.png) no-repeat bottom center;
				padding-bottom: 6px;
				background-size: 70%;
			}
			
		}
	}
</style>
