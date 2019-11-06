<template>
  <div class="tabbar-user">
    <user-header :isLogin="isLogin"/>
    <order-group/>
    <coupon-group/>
    <user-module/>
      <!-- <div class="share"  @click="$router.push({path: '/user/share'})">
       邀请码
      </div> -->
  </div>
</template>

<script>
import userHeader from './tabbar-user-header';
import orderGroup from './tabbar-user-order';
import couponGroup from './tabbar-user-coupon';
import userModule from './tabbar-user-module';

export default {
  data() {
    return {
      isLogin: false
    };
  },

  activated() {
    this.getLoginStatus();
  },

  methods: {
    getLoginStatus() {
      this.isLogin =
        !!localStorage.getItem('Authorization');
    }
  },

  components: {
    [userHeader.name]: userHeader,
    [orderGroup.name]: orderGroup,
    [couponGroup.name]: couponGroup,
    [userModule.name]: userModule,
  }
};
</script>
<style scoped lang="scss">
.share{
  position:fixed; 
  width: 60px;
  height: 30px;
  line-height: 30px;
  top: 82%;
  left: 80%;
  font-size: 15rpx;
  color: #db3d3c;
  border: 1px solid #db3d3c;;
  background: #fff;;
  text-align: center;
  box-shadow: 10px 10px 5px #888888;
  border: 1px solid #db3d3c;;
  border-radius: 5px;
}
.share img{
  width: 45px;
  height: 45px;
}
.tabbar-user {
  > div {
    margin-bottom: 10px;
  }
  &__quit {
    border: 0;
    border-radius: 0;
  }
}
</style>
