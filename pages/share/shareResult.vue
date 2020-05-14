<template>
    <view>
        <view class="bg">
            <view class='detail-rule'>
                <navigator url=""><span>详细规则</span></navigator>
            </view>
            <image src=""></image>
            <text>张三</text>
            <h2>你的好友送来学习福利</h2>
            <h5>报名即可抵扣相应现金哦</h5>
            <view class="shadow">
                <coupon count=200 tip="满2000元可使用" type=1></coupon>
                <input v-model="mobile" class="mobile-input"  placeholder-style="text-align:center" type="number" placeholder="输入手机号" />
                <button @click="receiveCoupon">立即领取</button>
            </view>

        </view>
    </view>
</template>

<script>
    import coupon from '../../components/coupon.vue'
    export default {
        components: {
            coupon
        },
        data() {
            return {
				mobile: ''

            }
        },
        mounted() {
        },
        methods: {
            onShareAppMessage(res){
                console.log(res)
                return {
                    title:"test",
                    path: '/pages/study/studyDetail'
                }
            },
			receiveCoupon() {
				console.log("click")
				this.$api.receiveCoupon(this.mobile, "").then(res => {
					if(res.data.statusCode == 200){
						uni.showToast({
							icon: 'success',
							title:'领取成功'
						})
					}else{
						uni.showToast({
							icon:'none',
							title: res.data.errorMessage
						})
					}
				})
			
			}
        }
		
		

    }
</script>

<style lang="scss" scoped>
    @import "../../static/style/base.scss";

    .bg {
        position: relative;
        background: #FE8300;
        background-image: url(../../static/img/sharebg1.png), url(../../static/img/sharebg2.png);
        background-repeat: no-repeat;
        background-position: right top, left -100upx top -100upx;
        background-size: 189upx 187upx, 288upx 288upx;
        text-align: center;

        .detail-rule {
            navigator {
                position: absolute;
                top: 24upx;
                right: 0;
                width: 159upx;
                height: 60upx;
                line-height: 60upx;
                text-align: center;
                background: rgba(255, 255, 255, 0.2);
                border-radius: 30upx 0upx 0upx 30upx;
                font-size: 24upx;
            }
        }

        h5 {
            color: #fff;
            font-size: 32upx;
            font-weight: 400;
        }

        h2 {
            color: #fff;
            padding-top: 120upx;
            font-size: 48upx;
            font-weight: 600;
        }


    }

    .shadow {
        margin: 39upx auto 0 auto;
        width: 645upx;
        background: #fff;
        border-radius: 20upx;
        padding: 20upx;
        text-align: left;

       .mobile-input{
		   margin-top: 60upx;
           border: 1px solid rgba(254, 131, 0, 1);
           height: 80upx;
		   border-radius: 40upx;
		   font-size: 40upx;
		   text-align: center;
       }

        button {
            margin-top: 60upx;
            width: 615upx;
            height: 80upx;
            background: rgba(255, 126, 0, 1);
            border-radius: 40upx;
            text-align: center;
            font-size: 30upx;
            color: white;
        }
    }
</style>
