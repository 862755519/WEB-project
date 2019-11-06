<template>
	<div>
		<!-- <van-cell-group>
			<van-cell title="我的卡券" isLink>
				<router-link to="/user/coupon/list/0" class="text-desc">全部优惠券</router-link>
			</van-cell>
		</van-cell-group>

		<van-row class="coupon_status">
			<van-col span="6">
				<div class="coupon_status_icon" @click="$router.push({path: '/user/coupon/list/0'})">
					<van-icon name="coupon" />
				</div>
				<div>待使用</div>
			</van-col>
			<van-col span="6">
				<div class="coupon_status_icon" @click="$router.push({path: '/user/coupon/list/1'})">
					<van-icon name="coupon-used" />
				</div>
				<div>已使用</div>
			</van-col>

			<van-col span="6">
				<div class="coupon_status_icon" @click="$router.push({path: '/user/coupon/list/2'})">
					<van-icon name="debit-pay"/>
				</div>
				<div>过期关闭</div>
			</van-col>

      <van-col span="6">
				<div class="coupon_status_icon" @click="$router.push({path: '/user/bank/card'})">
					<van-icon name="id-card" />
				</div>
				<div>我的银行卡</div>
			</van-col>
		</van-row> -->

   <!--********************************-->
    <!-- <van-cell-group class="boss">
			<van-cell title="会员订单" isLink>
				<router-link to="/manager/order" class="text-desc">会员订单</router-link>
			</van-cell>
		</van-cell-group> -->

		<!-- <van-row class="coupon_status">
			<van-col span="6">
				<div class="coupon_status_icon" @click="$router.push({path: '/manager/order'})">
					<van-icon name="tubiao215" />
				</div>
				<div>免费领取</div>
			</van-col>
			<van-col span="6">
				<div class="coupon_status_icon" @click="onRepeat">
					<van-icon name="list" />
				</div>
				<div>重复购买</div>
			</van-col> 

		
		</van-row>
    -->
	</div>
</template>

<script>
import { Row, Col,Icon} from 'vant';

export default {
  name: 'coupon-group',
  components: {
    [Icon.name]:Icon,
    [Row.name]: Row,
    [Col.name]: Col
  },
  methods:{
     onRepeat(){
		 let a = 1;
		 this.$router.push({
          path: '/manager/order',
          query: {
            id: a,
          }
        })
	 }
  }
};
</script>


<style scoped lang="scss">
.boss{
  margin-top: 10px;
}
@import '../../assets/scss/mixin';
.coupon_status {
  background-color: #fff;
  text-align: center;
  padding: 10px 0;
  font-size: 12px;

  > div {
    @include one-border;
    &::after {
      top: 50%;
      left: 50%;
      border-bottom: 0;
      border-right: 1px solid $border-color;
      height: 150%;
      transform: scale(0.5) translate3d(-50%, -50%, 0);
      transform-origin: 0 0;
    }
    &:last-child::after {
      border: 0;
    }
  }
   
  .coupon_status_icon {
    position: relative;
    width: 36px;
    height: 36px;
    border-radius: 50%;
    display: inline-block;
    i {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate3d(-50%, -50%, 0);
      font-size: 24px;
      color: #000;
    }
  }
}
</style>
