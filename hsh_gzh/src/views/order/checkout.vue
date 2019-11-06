<template>
<div class="order">
  <van-nav-bar
    :fixed='true'
    title="订单详情"
    left-arrow
    @click-left="onClickLeft"
  >
    <van-icon color="#333" name="arrow-left" slot="left" />
  </van-nav-bar>
  
  <van-cell-group class="marg_top">
      <van-cell v-if="checkedAddress" isLink @click="goAddressList()" title="收货地址">
      <div slot="label">
        <div>
          <span>{{ checkedAddress.name }} </span>
          <span>{{ checkedAddress.tel }} </span>
        </div>
        <div>
          {{ checkedAddress.addressDetail }}
        </div>
      </div>
    </van-cell>
  </van-cell-group>

  <van-cell-group>
    <van-cell class="order-coupon" title="优惠券" is-link :value="getCouponValue()"  @click="getCoupons" />
  </van-cell-group>
 
  <div class="dropdown">
    <div class="memo_title">
      抵扣券
    </div>
    <van-dropdown-menu class="memo">
      <van-dropdown-item  v-model="value1" :options="option1"   @change="chageXcxCoupon"/>
    </van-dropdown-menu>
  </div>
  <!-- <van-cell-group> -->
    <!-- <van-cell class="order-coupon" title="抵扣券" is-link :value="getCouponValue()" @click="getCoupon" /> -->
  <!-- </van-cell-group> -->


  <!-- 优惠券列表 -->
  <van-popup v-model="showList" position="bottom">
    <van-coupon-list
      :coupons="coupons"
      :chosen-coupon="chosenCoupon"
      :disabled-coupons="disabledCoupons"
      @change="onChange"
      @exchange="onExchange"
    />
  </van-popup>

  <!-- 抵扣券列表 -->
  <!-- <van-popup v-model="show_List" position="bottom">
    <van-coupon-list
      :coupons="coupons"
      enabled-title="可抵扣"
      disabled-title='不可抵扣'
      input-placeholder="请输入抵扣码"
      :chosen-coupon="chosenCoupon"
      @change="onChange"
      @exchange="onExchange"
    />
  </van-popup> -->

  

    <van-card
      v-for="item in checkedGoodsList"
      :key="item.id"
      :title="item.goodsName"
      :num="item.number"
      :price="item.price +'.00'"
      :thumb="item.picUrl"
    >
      <div slot="desc">
        <div class="van-card__desc">
          <van-tag plain style="margin-right:6px;" v-for="(spec, index) in item.specifications" :key="index">
            {{spec}}
          </van-tag>
        </div>
      </div>
    </van-card>

    <van-cell-group>
      <van-cell title="商品金额">
        <span class="red">{{goodsTotalPrice * 100 | yuan}}</span>
      </van-cell>
      <van-cell title="邮费">
        <span class="red">￥{{freight}}</span>
      </van-cell>
      <van-cell title="服务费">
        <span class="red">￥{{serviceCharge }}</span>
      </van-cell>
      <van-cell title="优惠券">
        <span class="red">-{{ couponPrice * 100| yuan}}</span>
      </van-cell>

      <!-- <van-cell title="我的积分">
        <span class="red">{{ mypoint}}分</span>
      </van-cell>
      <van-cell title="可使用积分">
        <span class="red">{{canUsePoint}}分</span>
      </van-cell>
      <van-cell title="是否使用积分">
        <van-switch v-model="checked" size="24px" active-color="#ee0a24" v-if="canUsePoint>0"      @change="select" />
        <van-switch v-model="checked" size="24px" active-color="#ee0a24" v-else disabled />
      </van-cell>
      <van-cell  title="可抵扣积分(金额)">
        <span v-if="checked" class="red">-{{ canUsePoint * 100| yuan}}</span>
        <span v-else class="red">-{{ 0 * 100| yuan}}</span>
      </van-cell>
      <van-cell title="购买后可获得积分">
        <span class="red">{{ canGetPoint}}分</span>
      </van-cell> -->
      
      <van-field v-model="message" placeholder="请输入备注" label="订单备注">
      <template slot="icon">{{message.length}}/50</template>
      </van-field>      
    </van-cell-group>

    <van-submit-bar  v-show="checkedCoupon == false"
      :price="checked?actualPrice*100 - canUsePoint*100:actualPrice*100"
      label="总计："
      buttonText="提交订单"
      :disabled="isDisabled"
      @submit="onSubmit"
    />
    <van-submit-bar v-show="checkedCoupon == true"
      :price="serviceCharge*100+freight*100"
      label="总计："
      buttonText="提交订单"
      :disabled="isDisabled"
      @submit="onSubmit"
    />
</div>
</template>

<script>
import { Card, Tag, ard, Field, SubmitBar, DropdownMenu, DropdownItem , Toast, NavBar, CouponCell, CouponList, Popup, Switch } from 'vant';
import { cartCheckout, orderSubmit, couponSelectList} from '@/api/api';
import { getLocalStorage, setLocalStorage } from '@/utils/local-storage';
import dayjs from 'dayjs';
import Vue from 'vue';
import { Checkbox, CheckboxGroup } from 'vant';
import { log } from 'util';
Vue.use(Checkbox).use(CheckboxGroup);

export default {
  data() {
    return {
      serviceCharge:0,
      freight:0,
      checkedGoodsList: [],
      checkedAddress: {},
      availableCouponLength: 0, // 可用的优惠券数量
      goodsTotalPrice: 0, //商品总价
      freightPrice: 0, //快递费
      couponPrice: 0, //优惠券的价格
      grouponPrice: 0, //团购优惠价格
      orderTotalPrice: 0, //订单总价
      actualPrice: 0, //实际需要支付的总价
      message: '',

      maxcanUsePoint:0,
      canUsePoint:0,
      canGetPoint:0,
      mypoint:0,

      isDisabled: false,
      showList: false,
      show_List: false,
      chosenCoupon: -1,
      coupons: [],
      disabledCoupons: [],

      value1: 0,
      option1: [
        { cdCode: '全部商部商部商品', id: 1 },
        { cdCode: '新部商部商款商品', id: 2 },
        { cdCode: '活部商部商动商品', id: 56 }
      ],
      checkedCoupon:false,
      checked:false
    };
  },
  created() {
    var car = this.$route.query.car;
    if(car!=undefined && car !=null){
       sessionStorage.setItem("car",car)
    }else{
        //sessionStorage.setItem("car",-1);
    }
    
    var ids = this.$route.query.grouponLinkId;
    if(ids!=undefined && ids !=null){
       sessionStorage.setItem("grouponLinkId",ids)
    }else{
      sessionStorage.setItem("grouponLinkId",-1)
    }
    sessionStorage.setItem("itemId",this.$route.query.itemId)
    this.init();
  },

  methods: {
    // 返回按钮
    onClickLeft(){
      ///var g = sessionStorage.getItem("grouponLinkId");
      var c = sessionStorage.getItem("car");
       if(c == 1){
        this.$router.push('/order');
      }else{
        this.$router.push('/items/detail/'+this.$route.query.itemId);
        // if(g!=-1){
        //   this.$router.push('/manager/magDetail?itemId='+sessionStorage.getItem("itemId"));
        // }else{
         
        //}
      }
      
    },
    select(){
      this.checked != this.checked;
    
    },
    //现在抵扣券
    chageXcxCoupon(){
        if(this.value1>0){
          this.checkedCoupon = true;
        }else{
          this.checkedCoupon = false;
        }
    },
    onSubmit() {     
      const {AddressId, CartId, CouponId} = getLocalStorage('AddressId', 'CartId', 'CouponId');
      if (AddressId == 0 || AddressId == null || AddressId == '' || AddressId == undefined ) {
        Toast.fail('请设置收货地址');
        return;
      }else{
          //优惠券
          if(CouponId>0&&this.value1>0){
              Toast.fail('优惠券和抵扣券不能同时使用');
              return;
          }
        this.isDisabled = true;
        var ids = this.$route.query.grouponLinkId;
        if(this.checked==true){
            this.canUsePoint = this.maxcanUsePoint;
        }else if(this.checked==false){
            this.canUsePoint = 0;
        }

        orderSubmit({
          couId:this.value1,
          grouponLinkId:ids,
          addressId: AddressId,
          cartId: CartId,
          couponId: CouponId,
          grouponRulesId: 0,
          point: this.canUsePoint,
          message: this.message
        }).then(res => {
          
          //下单成功，重置下单参数。
          // setLocalStorage({AddressId: 0, CartId: 0, CouponId: 0});
  
          let orderId = res.data.data.orderId;
          this.$router.push({
            name: 'payment',
            params: { orderId: orderId }
          });
        }).catch(res => {
          this.isDisabled = false;
          this.$toast(res.data.errmsg);
        })

      }

    },
    
    goAddressList() {
      this.$router.push('/user/address?itemId='+this.$route.query.itemId+"&center=3");
    },
    getCouponValue() {
      if(this.couponPrice !== 0 ){
        return "-¥" + this.couponPrice + ".00元"
      }
      if(this.availableCouponLength !== 0){
        return this.availableCouponLength + "张可用"
      }
      return '没有可用优惠券'
    },
    getCoupons() {
      const {AddressId, CartId, CouponId} = getLocalStorage('AddressId', 'CartId', 'CouponId');
      couponSelectList({cartId: CartId, grouponRulesId: 0}).then(res => {
        var cList = res.data.data.list
  
        this.coupons = []

        for(var i = 0; i < cList.length; i++){
          var c = cList[i]
          var coupon = {
            id: c.id,
            name: c.name,
            condition: c.min,
            value: c.discount * 100,
            description: c.desc,
            startAt: new Date(c.startTime).getTime()/1000,
            endAt: new Date(c.endTime).getTime()/1000,
            valueDesc: c.discount,
            unitDesc: '元'            
          }
          this.coupons.push(coupon)
          if(c.id === this.couponId){
            this.chosenCoupon = i;
            break;
          }
        }
        
        this.showList = true
        
      })
    },
    getCoupon() {
      const {AddressId, CartId, CouponId} = getLocalStorage('AddressId', 'CartId', 'CouponId');
      couponSelectList({cartId: CartId, grouponRulesId: 0}).then(res => {
        var cList = res.data.data.list
  
        this.coupons = []

        for(var i = 0; i < cList.length; i++){
          var c = cList[i]
          var coupon = {
            id: c.id,
            name: c.name,
            condition: c.min,
            value: c.discount * 100,
            description: c.desc,
            startAt: new Date(c.startTime).getTime()/1000,
            endAt: new Date(c.endTime).getTime()/1000,
            valueDesc: c.discount,
            unitDesc: '元'            
          }
          this.coupons.push(coupon)
          if(c.id === this.couponId){
            this.chosenCoupon = i;
            break;
          }
        }
        
        this.show_List = true

      })
    },
    init() {
      const {AddressId, CartId, CouponId} = getLocalStorage('AddressId', 'CartId', 'CouponId');
     
      cartCheckout({cartId: CartId, addressId: AddressId, couponId: CouponId, grouponRulesId: 0}).then(res => {
          var data = res.data.data
          console.log(data);
          
          this.checkedGoodsList = data.checkedGoodsList;
          this.checkedAddress= data.checkedAddress;
          this.availableCouponLength= data.availableCouponLength;
          this.actualPrice= data.actualPrice;
          this.couponPrice= data.couponPrice;
          this.grouponPrice= data.grouponPrice;
          this.freightPrice= data.freightPrice;
          this.goodsTotalPrice= data.goodsTotalPrice;
          this.orderTotalPrice= data.orderTotalPrice;
          this.option1 = data.xcxCoupon;
          this.maxcanUsePoint= data.maxcanUsePoint;
          this.canUsePoint= data.canUsePoint;
          this.canGetPoint= data.canGetPoint;
          this.mypoint= data.mypoint;
          this.serviceCharge= data.serviceCharge;
          this.freight= data.freight;

          setLocalStorage({AddressId: data.addressId, CartId: data.cartId, CouponId: data.couponId});
      }).catch(res=>{
          Toast.fail(res.data.errmsg)
      });

    },
    onChange(index) {
      this.showList = false;
      this.show_List = false;
      this.chosenCoupon = index;
      
      if(index === -1 ){
        setLocalStorage({CouponId: -1});
      }
      else{
        const couponId = this.coupons[index].id;
        setLocalStorage({CouponId: couponId});  
      }

      this.init()
    },
    onExchange() {
      this.$toast("兑换暂不支持");
    }    
  },

  components: {
    [Toast.name]: Toast ,
    [SubmitBar.name]: SubmitBar,
    [Card.name]: Card,
    [Field.name]: Field,
    [Tag.name]: Field,
    [CouponCell.name]: CouponCell,
    [CouponList.name]: CouponList,
    [NavBar.name]: NavBar,
    [Switch.name]: Switch,
    [DropdownMenu.name]: DropdownMenu,
    [DropdownItem.name]: DropdownItem,
    [Popup.name]: Popup
  }
};
</script>


<style lang="scss" scoped>

.memo{
  // float: right;
  text-align: right;
  margin-bottom:0px;
  width: 60%;
  padding-left:12%;
  // border:1px solid red;

}
.memo_title{
  background-color: #fff;
  text-align: left;
  padding: 0 10px;
  height: 50px;
  line-height: 50px;
  float: left;
  width: 40%;
  //  border:1px solid blue;
}
.dropdown{
  margin:10px 0;
  
  text-align: right;
  // border:1px solid #ccc;
}
#inputNum{
  width: 50px;
  text-align: center;
// padding-right: 2px;
// border:none;
}
.marg_top{
  margin-top:50px;
}
.order-coupon {
  margin-top: 10px;
}
</style>