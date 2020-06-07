<template>
	<view class="navTabBox">
		<!-- 标题数量小于4 -->
		<view class="shortTab" v-if="tabTitle.length<=4">
			<!-- 导航栏 -->
			<view class='navTab'>
					<view v-for="(item,index) in tabTitle" :key="index" class='navTabItem'  @click='navClick(index)'>
						<text :class="index===tabClick?'click':''">
							{{item.name}}
						</text>
				
					</view>			
			</view>
		</view>
		<!-- 标题数量大于4 开启长导航栏模式 -->
		<view class="longTab" v-if="tabTitle.length>4">
			<scroll-view scroll-x="true"  scroll-with-animation  :scroll-into-view="toView">
				<view class="longItem" :data-index="index" :class="index===tabClick?'click':''" v-for="(item,index) in tabTitle" :key="index" :id="'id'+index" @click="longClick(index)">{{item}}</view>
			</scroll-view>

		</view>
	</view>
</template>

<script>
	export default {
		name: 'navTab',
		props: {
			tabTitle: {
				type: Array,
				default: []
			}

		},
		data() {
			return {
				tabClick: 0, //导航栏被点击
				toView:'',
				isLongWidth:0
				
			};
		},
		created() {
			var that = this
			this.toView = 'id0'
		},
		methods: {
			// 导航栏点击
			navClick(index) {
				// this.$parent.currentTab = index 
				this.$emit('changeTab', index);//设置swiper的第几页
				this.tabClick = index //设置导航点击了哪一个
		
			},
			longClick(index){
				    var tempIndex = index - 2
					tempIndex = tempIndex<=0 ? 0 : tempIndex 
					this.toView = `id${tempIndex}` //动画滚动,滚动至中心位置
					this.tabClick = index //设置导航点击了哪一个
					this.$emit('changeTab', index);//设置swiper的第几页
					// this.$parent.currentTab = index //设置swiper的第几页
			}
		}

	}
</script>

<style lang="scss">
	.navTabBox{
		border-bottom: 1px solid #eee;
		width:100vw;
		height:100upx;
		line-height: 100upx;
		font-size:30upx;
		color:#7d7d7d;	
		.navTab{
			display:flex;
			white-space:nowrap;
			justify-content:center;
			.navTabItem{
				width:25vw;
				text-align:center;
				.click{
					color:#212121;
					line-height: 100upx;
					display: inline-block;
					height:100upx;
					font-weight: bold;
					border-bottom: 2px solid #ff8300;	
				}
			}
		}
		
			
			
		
		
	}	
	
	
	
</style>
