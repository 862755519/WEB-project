<template>
  <div class="payment">
    <van-nav-bar
      :fixed="true"
      title="支付页面"
      left-arrow
      @click-left="onClickLeft"
    >
      <van-icon color="#333" name="arrow-left" slot="left" />
    </van-nav-bar>
    
    <div class="time_down payment_group">
      请在
      <span class="red">半小时内</span>
      完成付款，否则系统自动取消订单
    </div>

    <van-cell-group class="payment_group">
      <van-cell title="订单编号" :value="order.orderInfo.orderSn"/>
      <van-cell title="实付金额">
        <span class="red">{{order.orderInfo.actualPrice *100 | yuan}}</span>
      </van-cell>
    </van-cell-group>

    <div class="pay_way_group">
      <div class="pay_way_title">选择支付方式</div>
      <van-radio-group v-model="payWay">
        <van-cell-group>
          <!-- <van-cell>
            <template slot="title">
              <img src="../../../assets/images/ali_pay.png" alt="支付宝" width="82" height="29">
            </template>
            <van-radio name="ali"/>
          </van-cell> -->
          
          <van-cell>
            <template slot="title">
              <img src="../../../assets/images/wx_pay.png" alt="微信支付" width="113" height="23">
            </template>            
            <van-radio name="wx"/>
          </van-cell>

          <!-- <van-cell>
            <template slot="title">
              <img class="ye" src="../../../assets/images/yeb.png" alt="余额支付" width="113" height="23">
              <span class="yezf">&nbsp;余额支付</span>
            </template>            
            <van-radio name="balance"/>
          </van-cell> -->
        </van-cell-group>
      </van-radio-group>
    </div>

    <van-button class="pay_submit" @click="paySubmit" type="danger" bottomAction>去支付</van-button>
  </div>
</template>

<script>
import { Radio, RadioGroup, Dialog, NavBar, Toast} from 'vant';
import { orderDetail, orderPrepay, goodpay, wx_pay } from '@/api/api';
import _ from 'lodash';

export default {
  name: 'payment',

  data() {
    return {
      payWay: 'wx',
      order: {
        orderInfo: {},
        orderGoods: []
      },
      orderId: 0,
      tock:'',

      // 支付属性
      wxChannel: null, // 微信支付   
      aliChannel: null, // 支付宝支付
      channel: null,  //支付通道

      // ALIPAYSERVER:process.env.VUE_APP_BASE_API+'/alipay/pay/goodpay?id=',  //支付宝接口
      // WXPAYSERVER: process.env.VUE_APP_BASE_API+'/wx/pay/goodpay?id=',      //微信支付接口
                                                
    };
  },
  created() {
    this.order.orderInfo = this.$route.params.orderInfo;

    this.tock = window.localStorage.getItem('Authorization')
    if (_.has(this.$route.params, 'orderId')) {
      this.orderId = this.$route.params.orderId;
      this.getOrder(this.orderId);
    }
  },
  methods: {

    // 返回按钮
    onClickLeft(){
      this.$router.go(-1); 
    },
    
    getOrder(orderId) {
      orderDetail({orderId: orderId}).then(res => {
        this.order = res.data.data;
        
      });
    },

    // 支付模块
    paySubmit() {
      var that = this;
      var openId =  window.sessionStorage.getItem("openid")
      wx_pay({
        id:this.orderId,
        openId:openId
      }).then(res => {
          var data = res.data.data;
          console.log(data);
          
          WeixinJSBridge.invoke(//支付
              'getBrandWCPayRequest',
              {
                  "appId":data.appId,
                  "nonceStr":data.nonceStr,
                  "package":data.package,
                  "signType": data.signType,
                  "timeStamp":data.timeStamp,
                  "paySign":data.paySign
              },
              function(res){
                  if(res.err_msg == "get_brand_wcpay_request:ok" ){
                      // 使用以上方式判断前端返回,微信团队郑重提示：
                      //res.err_msg将在用户支付成功后返回ok，但并不保证它绝对可靠。
                      that.$router.push({ path: '/user/order/list/0' });
                  } 
          }); 

      }).catch( res => {
        Toast.file(res.data.errmsg)
      })
    }
    
  },
  components: {
    [Radio.name]: Radio,
    [RadioGroup.name]: RadioGroup,
    [NavBar.name]: NavBar,
    [Toast.name]: Toast,
    [Dialog.name]: Dialog
  }
};
  function onBridgeReady(obj){
      WeixinJSBridge.invoke(
          'getBrandWCPayRequest', {
              "appId":obj.appId,     //公众号名称，由商户传入     
              "timeStamp":obj.timeStamp,         //时间戳，自1970年以来的秒数     
              "nonceStr":obj.nonceStr, //随机串     
              "package":obj.package,     
              "signType":obj.signType,         //微信签名方式：     
              "paySign":obj.paySign //微信签名 
          },
          function(res){
          if(res.err_msg == "get_brand_wcpay_request:ok" ){
          // 使用以上方式判断前端返回,微信团队郑重提示：
                  //res.err_msg将在用户支付成功后返回ok，但并不保证它绝对可靠。
          } 
      }); 
  }
</script>

<style lang="scss" scoped>
.payment_group {
  margin-bottom: 10px;
}

.time_down {
  margin-top:50px;
  background-color: #fffeec;
  padding: 10px 15px;
}

.pay_submit {
  position: fixed;
  bottom: 20px;
  width: 90%;
  left:5%;
  border-radius:5px;
  font-size: 17px;
}

.pay_way_group img {
  vertical-align: middle;
}

.pay_way_title {
  padding: 15px;
  background-color: #fff;
}

.ye{
  width:30px;
  height:30px;
}
.yezf{
  font-size:18px;
  font-weight:400;
}
</style>
