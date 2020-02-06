<template>
	<view>
		<scroll-view class="uni-swiper-tab" scroll-x>
				<block v-for="(tab,index) in tabBars" :key="tab.id" :style="scrollStyle">
					<view 
						class="swiper-tab-list" 
						:class="{'active' : tabIndex==index}"
						@tap="tabtap(index)"
						:style="scrollItemStyle"
					>
						{{tab.name}} {{tab.num?tab.num:""}}
					<view class="swiper-tab-line"></view>
					</view>
				</block>
			</scroll-view>
	</view>
</template>

<script>
	export default {
		props:{
			tabBars:Array,
			tabIndex:Number,
			scrollStyle:{
				type:String,
				default:""
			},
			scrollItemStyle:{
				type:String,
				default:""
			}
		},
		data() {
			return {
				tabIndex:0,// 选中的
			}
		},
		methods: {
			//点击切换导航
			tabtap(index){
				// this.tabIndex = index;
				this.$emit('tabtap',index)
			}
		}
	}
</script>

<style>

</style>
