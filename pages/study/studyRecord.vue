<template>
	<view>	
		<view class="bg">
			<view class="box">
				<h5 class="title">{{study.courseName}}</h5>
				<h2 class="time">{{study.studyTime}}</h2>
				<text class="prize">¥{{study.coursePrice}}</text>
				<span class="hour">{{study.totalLesson}}节课</span>
				<span class="status orange-color">{{study.status == 'STUDYING'? '学习中':'已学完'}}</span>
			</view>
			
		</view>
		<view class="box sharebox">
			<view class="shadow">
				<view class="btn" @click="goCourseDetail(study.courseId)">再次报名</view>
				<dl >
					<dt>学生</dt>
					<dd class="orange-color">{{study.studentName}}</dd>
				</dl>
				<view class="flex">
					<dl>
						<dt >已上课时</dt>
						<dd class="orange-color">
							<text>{{study.studiedLesson}}</text>课时
						</dd>
					</dl>
					<dl>
						<dt>剩余课时</dt>
						<dd class="orange-color">
							<text>{{study.totalLesson - study.studiedLesson}}</text>课时
						</dd>
					</dl>
				</view>
			</view>
		</view>
		<view class="box record">
			<view>—— 上课记录 ——</view>
			<ul>
				<li v-for="(item,index) in study.lessons" :Key="index">
					<span class="circle"></span>
					<span class="line"></span>
					<view class="li">
						<text class="fl">{{item.studyDate}} {{item.startTime}} {{item.endTime}}</text>
						<!-- <text class="fr">课件</text> -->
					</view>
				</li>
			</ul>
		</view>
	</view>
</template>

<script>
import studyRes from '@/api/course-study.js'
export default {
	components: {},
		data() {
			return {
				study: {},
				list:[
					{
						time:'2019.09.11   09:00 -12:00'
					}	,
					{
						time:'2019.09.11   09:00 -12:00'
					}	,
					{
						time:'2019.09.11   09:00 -12:00'
					}	,
					{
						time:'2019.09.11   09:00 -12:00'
					}	
				]
			}
		},
		
		onLoad(options) {
			const id = options.id
			this.queryById(id)
		},
		
		methods: {
			queryById(id) {
				studyRes.queryById(id).then(res => {
					this.study = res.data
				})
			},
			goCourseDetail:function(id){
				 uni.navigateTo({	 
					url: `/pages/course/courseDetail?id=`+id,
					success: res => {},
					fail: () => {},
					complete: () => {}
				}); 
			},
		}

		
	}
</script>

<style lang="scss" scoped>
	@import "../../static/style/base.scss";

	.sharebox{
		height:150upx;
	}
.bg{
	background: #FF7E00;
	background-size: 100%;
	height: 360upx;
	color: #fff;
	font-size: 24upx;
	position:relative;
	.title{
		font-size: 48upx;
		padding-top:30upx;
	}
	.time{
		margin-bottom:20upx;
	}
	.prize{
		font-size:36upx;
		margin-right:20upx;
	}
	.status{
		font-size: 22upx;
		position: absolute;
		top:50upx;
		right:0;
		background: #FFEAD4;
		border-radius:18upx 0 0 18upx;
		display: inline-block;
		text-align: center;
		width:85upx;
		height:36upx;
		line-height: 36upx;
		text-indent:5upx;
	}
}
.shadow{
	position:relative;
	top:-150upx;	
	background:#fff;
	border-radius:20upx;
	height:230upx;
	padding:20upx;
	.btn{
		position: absolute;
		right:3vw;
		top:60upx;
	}
}

	dl{		
		height:120upx;
		border-bottom: 1px solid #eee;	
		dt{
			font-size:24upx;
			color:#393939;
			
		}
		dd{
			font-size:48upx;
		}
	}
	
.flex{
	dl{
		width:48%;
		height:75upx;
		margin-top:20upx;
		border:none;
		line-height:40upx;
		dd{
			font-size:24upx;
			text{
				font-size: 40upx;
			}
		}
	}

	dl:last-child{
		text-indent:60upx;
		border-left: 1px solid #eee;
		margin-left:2%;
	}
}

.btn{
	display:inline-block;
	color:#fff;
	background:rgba(255,131,0,1);
	border-radius:4px;
	height:56upx;
	line-height:56upx;
	text-align: center;
	padding:0 40upx;
	font-size:24upx;
}
.record{
	color:#393939;
	view{
		text-align: center;
		font-size:24upx;
	}
	ul{
		li{
			
			line-height:120upx;
			height:120upx;
			font-size:28upx;
			color: #393939;
			position:relative;
			.circle{
				display: inline-block;
				position: absolute;
				left:20upx;
				width:20upx;
				height:20upx;
				border-radius: 50%;
				background: #D2D2D2;
				top:50upx;
			}
			.line{
				display: inline-block;
				width:1px;
				height:120upx;
				border-right:1px solid #D2D2D2;
				position: absolute;
				left:-12upx;
				top:60upx;
			}
			.li{
				width:80vw;
				float:right;
				border-bottom: 1px solid #eee;
				.fr{
					font-size:20upx;
					color:#727272;
					display:inline-block;
					background: url(../../static/img/file.png) no-repeat left center;
					background-size: 30upx;
					padding-left:40upx;
				}
			}
		
		}
	}
}

</style>
