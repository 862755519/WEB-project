<template>
  <div>
    <van-cell-group class="marg_top">
      <van-cell title="我的订单" isLink>
        <router-link to="/user/order/list/0" class="text-desc">全部订单</router-link>
      </van-cell>
    </van-cell-group>
    <van-row class="order_status">
      <van-col span="6">
        <div class="order_status_icon" @click="$router.push({path: '/user/order/list/1'})">
          <van-icon name="daifukuan" :info="order.unpaid > 0 ? order.unpaid : ''"/>
        </div>
        <div>待付款</div>
      </van-col>
      <van-col span="6">
        <div class="order_status_icon" @click="$router.push({path: '/user/order/list/2'})">
          <van-icon name="daifahuo" :info="order.unship > 0 ? order.unship : ''"/>
        </div>
        <div>待发货</div>
      </van-col>
      <van-col span="6">
        <div class="order_status_icon" @click="$router.push({path: '/user/order/list/3'})">
          <van-icon name="wuliu" :info="order.unrecv > 0 ? order.unrecv : ''"/>
        </div>
        <div>待收货</div>
      </van-col>
      <van-col span="6">
        <div class="order_status_icon" @click="$router.push({path: '/user/order/list/4'})">
          <van-icon name="shouhouguanli" :info="order.uncomment > 0 ? order.uncomment : ''"/>
        </div>
        <div>已完成</div>
      </van-col>
    </van-row>

    <van-cell-group class="marg_top">
      <van-cell title="我的卡券" isLink>
        <router-link to="/user/coupon/list/0" class="text-desc">全部优惠</router-link>
      </van-cell>
    </van-cell-group>
    <van-row class="order_status">
      <van-col span="6">
        <div class="order_status_icon" @click="$router.push({path: '/user/coupon/list/1'})">
          <!-- <van-icon name="daifukuan" :info="order.unpaid > 0 ? order.unpaid : ''"/> -->
          <van-icon name="coupon" />
        </div>
        <div>待使用</div>
      </van-col>
      <van-col span="6">
        <div class="order_status_icon" @click="$router.push({path: '/user/coupon/list/2'})">
          <!-- <van-icon name="daifahuo" :info="order.unship > 0 ? order.unship : ''"/> -->
           <van-icon name="coupon" />
           <van-icon name="coupon-used" />
        </div>
        <div>已使用</div>
      </van-col>
      <van-col span="6">
        <div class="order_status_icon" @click="$router.push({path: '/user/coupon/list/3'})">
          <!-- <van-icon name="wuliu" :info="order.unrecv > 0 ? order.unrecv : ''"/> -->
           <van-icon name="debit-pay"/>
        </div>
        <div>过期关闭</div>
      </van-col>
      <van-col span="6">
        <div class="order_status_icon" @click="$router.push({path: '/user/coupon/list/4'})">
          <!-- <van-icon name="shouhouguanli" :info="order.uncomment > 0 ? order.uncomment : ''"/> -->
            <van-icon name="id-card" />
        </div>
        <div>我的银行卡</div>
      </van-col>
    </van-row>

    <van-cell-group class="marg_top" v-if="level != '0'">
    <!-- <van-cell-group class="marg_top" > -->
      <van-cell title="会员专区" isLink>
        <!-- <router-link to="/user/order/list/0" class="text-desc">全部订单</router-link> -->
      </van-cell>
    </van-cell-group>
    <van-row class="order_status" v-if="level != '0'">
    <!-- <van-row class="order_status" > -->
      <van-col span="6" class="mar_bot">
        <div class="order_status_icon" @click="$router.push({path: '/items/purchase'})">
          <!-- <van-icon name="daifukuan" :info="order.unpaid > 0 ? order.unpaid : ''"/> -->
          <van-icon name="coupon" />
        </div>
        <div>购买抵扣券</div>
      </van-col>
      <!-- <van-col span="6" class="mar_bot">
        <div class="order_status_icon" @click="$router.push({path: '/items/exchange'})">
        
           <van-icon name="coupon" />
           <van-icon name="coupon-used" />
        </div>
        <div>赠送抵扣券</div>
      </van-col> -->
      <van-col span="6" class="mar_bot">
        <div class="order_status_icon" @click="$router.push({path: '/items/location'})">
          <!-- <van-icon name="wuliu" :info="order.unrecv > 0 ? order.unrecv : ''"/> -->
           <van-icon name="dingwei"/>
        </div>
        <div>身边的店主</div>
      </van-col>

      <!-- <van-col span="6" class="mar_bot">
        <div class="order_status_icon" @click="$router.push({path: '/items/myVoucher'})">
            <van-icon name="id-card" />
        </div>
        <div>我的抵扣券</div>
      </van-col> -->

      <van-col span="6" class="mar_bot">
        <div class="order_status_icon" @click="$router.push({path: '/user/generalize'})">
          <!-- <van-icon name="shouhouguanli" :info="order.uncomment > 0 ? order.uncomment : ''"/> -->
            <van-icon name="fenxiang" />
        </div>
        <div>推广中心</div>
      </van-col>
 <!--      <van-col span="6" class="mar_bot">
        <div class="order_status_icon" @click="$router.push({path: '/items/bindSpuer'})">
          <van-icon name="shouhouguanli" :info="order.uncomment > 0 ? order.uncomment : ''"/>
            <van-icon name="id-card" />
        </div>
        <div>绑定上级</div>
      </van-col> -->
    </van-row>

  </div>
</template>

<script>
import { Row, Col } from 'vant';
import { userIndex,selectUser } from '@/api/api';

export default {
  name: 'order-group',

  data() {
    return {
      order: [],
      level: ''
    };
  },

  created(){
    this.getUser()
  },
  
  activated(){
   this.init();
  },
  methods: {
    init() {
      userIndex().then(res => {
       
      this.order = res.data.data.order;
      console.log(this.order);
      });
    },
     //获取个人等级信息及邀请码
    getUser() {
      selectUser().then(res => {
        this.level = res.data.data.level;
      });
    }
  },
  components: {
    [Row.name]: Row,
    [Col.name]: Col
  }
};
</script>


<style scoped lang="scss">
@import '../../assets/scss/mixin';
.marg_top{
  margin-top:10px;
}
.order_status {
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
  .mar_bot{
    // border:1px solid green;
    margin-bottom:10px;
  }
  .order_status_icon {
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
