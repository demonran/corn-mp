<template>
	<view class="box">
		<image src="../../static/img/success.png" mode="widthFix"></image>
		<h1>恭喜您，报名成功！</h1>
		<view class="addr">
			<view class="">
				地址：{{organization.address}}
			</view>
			<view class="">
				电话：{{organization.tel}}
			</view>
		</view>
		<!-- <button open-type="share" class=" btn">分享课程</button> -->
		<!-- <span class="orange-color">成功邀请一位各得200元</span> -->
	</view>
</template>

<script>
	export default {
		data() {
			return {			
				organization: [],
				id:''
			}
		},
		onLoad(options) {
			this.getOrganization();
			//this.id = options.id
		},

		methods: {
			getOrganization() {
				this.$api.organization().then(res => {
					this.organization = res.data;
					console.log('organization:', this.organization)
				})
			},
/* 
			onShareAppMessage(res) {
			    if (res.from === 'button') {// 来自页面内分享按钮
			      console.log(res.target)
			    }
			    return {
			      title: this.CourseDetail.courseName,
			      path: `/pages/course/courseDetail?id=${this.id}`
			    }
			  } */

			
		}
	}
</script>


<style lang="scss" scoped>
	@import "../../static/style/base.scss";

.box{
	margin-top:150upx;
	.addr{
		color:#666;
		text-align: left;
		line-height: 60upx;
		display: inline-block;
		margin:0 auto;
	}
	image{
		width:20vw;
		margin-top: 100upx;
	}
	text-align: center;
	
	h1{
		font-size:40upx;
		color:#393939;
		line-height: 300%;
	}
	text{
		font-size:24upx;
		color:#595959;

	}
	p{
		font-size: 28upx;
		color:#2e2e2e;
		line-height:100%;
	}
	span{
		font-size:24upx;
	}
	navigator{
		background:rgba(255,131,0,1);
		color:#fff;
		border-radius:4px;
		height:88upx;
		line-height:88upx;
		text-align: center;
		width:500upx;
		margin:40upx auto;
		font-size:24upx;
	}

}



	.btn{
		color:#fff;
		background:rgba(255,131,0,1);
		border-radius:4px;
		height:88upx;
		line-height:88upx;
		text-align: center;
		font-size:30upx;
		margin:40upx 0;
	}
	

</style>

