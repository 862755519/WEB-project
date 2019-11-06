<template>
  <div class="user_module">
    <van-cell-group>
      <van-cell icon="shoucang" title="我的收藏" to="/user/collect" isLink/>
      <van-cell icon="dingwei" title="收货地址" to="/user/address?center=2" isLink/>
      <van-cell icon="kefu" title="服务中心" to="/user/server" isLink/>
      <!-- <van-cell icon="send-gift" title="购买抵扣券" to="/items/purchase" isLink/> -->
      <van-cell icon="coupon" title="赠送抵扣券" to="/items/exchange" isLink/>
      <van-cell icon="coupon" title="我的抵扣券" to="/items/myVoucher" isLink/>
      <!-- <van-cell icon="location" title="身边的店主" to="/items/location" isLink/> -->
    </van-cell-group>
  </div>
</template>

<script>
export default {
  name: 'user-module'
};
</script>


<style scoped lang="scss">
.share{
 margin-top: 20px;
 width: 100%;
 height: 100px;
 text-align: right;
 background: #f2f2f2;
 border: 1px solid red;
 padding-top: 50px;
}
.share img{
  width: 40px;height: 40px;
}
.user_module {
  background-color: #fff;
}
</style>
