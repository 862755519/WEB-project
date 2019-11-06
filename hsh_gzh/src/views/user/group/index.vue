<template>
  <div class="container">
    <van-nav-bar title="去拼团" :fixed="true" left-arrow @click-left="onClickLeft" >
      <van-icon color="#333" name="arrow-left" slot="left" />
    </van-nav-bar>

    <div class="group_banner">
      <img src="../../../assets/images/group1.png" alt />
    </div>

    <div class="group_div">
      <div class="trade_name">
        纯棉家用毛巾
        <span class="group_span">5人团</span>
      </div>
      <div class="group_desc">可以立即加入拼团也可以邀请好友拼团</div>
      <div class="trade_price">
        拼团价：￥80.00
        <span class="price_span">￥169.00</span>
      </div>
    </div>

    <div class="line"></div>
    <div class="group_div">
      <!-- <div class="person"><span class="person_span">最新拼团</span>已有2人参加拼团<span class="person_but">立即参团</span></div> -->
      <van-row class="person">
        <van-col span="6">
          <span class="person_span">最新拼团</span>
        </van-col>
        <van-col span="9">已有2人参加拼团</van-col>
        <van-col span="9" class="but">
          <span class="person_but" @click="group">立即参团</span>
        </van-col>
      </van-row>
      <div class="end_time">
        <div class="end_div">距离结束还剩</div> 
        <van-count-down :time="time" class="end_span"/>
      </div>

<<<<<<< HEAD
      <van-swipe :autoplay="3000" indicator-color="white" :show-indicators="false" class="swipe">
        <van-swipe-item>
          <div class="proup_head">
            <img class="head_img" id="lasthead" src="../../../assets/images/group_head.png" alt />
            <img class="head_img" src="../../../assets/images/group_head.png" alt />
            <img class="head_img" src="../../../assets/images/group_head.png" alt />
            <img class="head_img" src="../../../assets/images/group_head.png" alt />
            <img class="head_img" src="../../../assets/images/group_head.png" alt />
          </div>
        </van-swipe-item>
        <van-swipe-item>
          <div class="proup_head">
            <img class="head_img" id="lasthead" src="../../../assets/images/group_head.png" alt />
            <img class="head_img" src="../../../assets/images/group_head.png" alt />
            <img class="head_img" src="../../../assets/images/group_head.png" alt />
            <img class="head_img" src="../../../assets/images/group_head.png" alt />
            <img class="head_img" src="../../../assets/images/group_head.png" alt />
          </div>
        </van-swipe-item>
      </van-swipe>
=======
    <van-swipe :autoplay="3000" indicator-color="white" class="swipe" :show-indicators="false">
  <van-swipe-item><div class="proup_head">
        <img class="head_img" id="lasthead" src="../../../assets/images/group_head.png" alt />
        <img class="head_img" src="../../../assets/images/group_head.png" alt />
        <img class="head_img" src="../../../assets/images/group_head.png" alt />
        <img class="head_img" src="../../../assets/images/group_head.png" alt />
        <img class="head_img" src="../../../assets/images/group_head.png" alt />
      </div>
  </van-swipe-item>
  <van-swipe-item>
    <div class="proup_head">
        <img class="head_img" id="lasthead" src="../../../assets/images/group_head.png" alt />
        <img class="head_img" src="../../../assets/images/group_head.png" alt />
        <img class="head_img" src="../../../assets/images/group_head.png" alt />
        <img class="head_img" src="../../../assets/images/group_head.png" alt />
        <img class="head_img" src="../../../assets/images/group_head.png" alt />
      </div>
  </van-swipe-item>
</van-swipe>

      
>>>>>>> d6bd34a5cd530c3aa30f1b647ba208f73d5b0192
    </div>

    <div class="line"></div>
    <van-collapse v-model="activeNames" class="play">
      <van-collapse-item title="活动规则" name="1">
        <p class="play_text">
          1.请在拼团有效期内完成拼团，如果在有效期内，未达成相应参团人数，则拼团失败。如果距离活动结束时间小于拼团有效期时，则以拼团有效期为准。
          <br />2.拼团有效期内，支付的用户达到参团人数，则拼团成功
          <br />3.拼团有效期后，未达成相应参团人数的团，则该团失败，拼团失败的课程订单，系统会在1-7个 工作日内处理退款，系统处理后1-10个工作日内原路退回原支付账户中
          <br />4.拼团中状态暂不支持退款申请，若拼团失败后会自动退回
        </p>
      </van-collapse-item>
    </van-collapse>

    <div class="line"></div>
    <div class="group_div">
      <p class="trade_desc">商品详情</p>
      <img class="trade_img" src="../../../assets/images/tared.png" alt />
    </div>

    <div class="invite">
      <button>邀请好友</button>
    </div>

    <!--选择支付 弹出框 -->
    <van-popup v-model="payshow" class="payShow">
        <p class="payway">选择支付方式</p>
        <van-radio-group v-model="payWay">
        <van-cell-group>

          <van-cell  clickable >
            <div class="pay_div" >
              <div class="pay_div1"><img class="pay_img"  src="../../../assets/images/wx.png"></div> 
              <div class="pay_div2"><span class="pay_span">微信付款</span></div>
            </div>
            <van-radio slot="right-icon" name="1" />
          </van-cell>

          <van-cell  clickable >
            <div class="pay_div"  >
              <div class="pay_div1"><img class="pay_img"  src="../../../assets/images/ye.png"></div> 
              <div class="pay_div2"><span class="pay_span">余额支付</span></div>
            </div>
            <van-radio slot="right-icon" name="2" />
          </van-cell>

          <van-cell  clickable >
            <div class="pay_div" >
              <div class="pay_div1"><img class="pay_img"  src="../../../assets/images/zfb.png"></div> 
              <div class="pay_div2"><span class="pay_span">支付宝支付</span></div>
            </div>
            <van-radio slot="right-icon" name="3" />
          </van-cell>

          <van-cell  clickable >
            <van-button size="small" class="pay_submit" @click="paySubmit" type="danger" bottomAction>去支付</van-button>
          </van-cell>


        </van-cell-group>
      </van-radio-group>
    </van-popup>

  </div>
</template>
<script>
import QRCode from 'qrcodejs2';
import { getShare } from '@/api/api';
import Vue from 'vue';
import {
  NavBar,
  CountDown,
  Row,
  Col,
  Collapse,
  CollapseItem,
  Popup,
  Cell,
  CellGroup,
  RadioGroup,
  Radio,
  Swipe, 
  SwipeItem,
  NoticeBar,
  Tab,
  Tabs
} from 'vant';
Vue.use(Tab).use(Tabs);
import { log } from 'util';
import { constants } from 'crypto';
export default {
  // 引入的组件
  components: {
    [NavBar.name]: NavBar,
    [NoticeBar.name]:NoticeBar,
    [Row.name]: Row,
    [Col.name]: Col,
    [Collapse.name]: Collapse,
    [CollapseItem.name]: CollapseItem,
    [Popup.name]: Popup,
    [Cell.name]: Cell,
    [CellGroup.name]: CellGroup,
    [RadioGroup.name]: RadioGroup,
    [Radio.name]: Radio,
    [Swipe.name]:Swipe,
    [SwipeItem.name]:SwipeItem,
    [CountDown.name]:CountDown 
  },
  data() {
    return {
      activeNames: ['1'],
      time: 30 * 60 * 60 * 1000,
      
      payshow: false,
      payWay: '1',

      // 支付属性
      wxChannel: null, // 微信支付   
      aliChannel: null, // 支付宝支付
      channel: null, //支付通道

      ALIPAYSERVER: process.env.VUE_APP_BASE_API+'/alipay/pay/shopkeepergoodpay?id=',  //支付宝接口
      WXPAYSERVER: process.env.VUE_APP_BASE_API+'/wx/pay/shopkeepergoodpay?id=',      //微信支付接口
    };
  },
  created() {
    var that=this;
    mui.init({
      swipeBack: true //启用右滑关闭功能
    }),
    mui.plusReady(function() {
        // 获取支付通道
        plus.payment.getChannels(function(channels) {
         
            for (var i in channels) {
                if (channels[i].id == "wxpay") {
                    that.wxChannel = channels[i];
                } else {
                    that.aliChannel = channels[i];
                }
            }
        }, function(e) {
            Toast("获取支付通道失败：" + e.message);
        });     
    })
  },
  methods: {
    //导航返回
    onClickLeft() {
      this.$router.go(-1);
    },
    //立即拼团
    group() {
      this.payshow =  true;
    },
    // 选择支付
    paySubmit(){
      if(this.payWay === '1'){
        this.wxClick()
      }else if(this.payWay === '2'){
        this.balanceClick()
      }else{
         this.apyClick()
      }
    },
    // 微信支付
    wxClick() {
      if (AddressId == 0) {
        Toast.fail('请设置收货地址');
        return;
      }
      this.pay('wxpay',this.addId);
      setTimeout(() => {
        this.payshow = false;
      }, 1000);
    },
    // 支付宝支付
    apyClick() {
      if (AddressId == 0) {
        Toast.fail('请设置收货地址');
        return;
      }
      this.pay('alipay',this.addId);
      setTimeout(() => {
        this.payshow = false;
      }, 1000);
    },
    // 余额支付
    balanceClick(){
      if (AddressId == 0) {
        Toast.fail('请设置收货地址');
        return;
      }
      shopkeepergoodpay({id: this.FreeId, aId: this.addId}).then(res =>{
        console.log(res.data.errno == 0);
        if(res.data.errno == 0){
          Toast(res.data.errmsg)
          this.$router.push({name: 'manager'});
        }
      }).catch(res =>{
         this.$router.push({name: 'manager'});
         Toast(res.data.errmsg)
         
      })
      setTimeout(() => {
        this.payshow = false;
      }, 0);
    },
    // 微信 与 支付宝 支付接口
    pay(ids,aId) {
      // 从服务器请求支付订单
	    // console.log(id)
      var PAYSERVER = '';
	    var channel='';
      if (ids == 'alipay') {
        PAYSERVER = this.ALIPAYSERVER;
        channel = this.aliChannel;
      } else if (ids == 'wxpay') {
        PAYSERVER = this.WXPAYSERVER;
        channel = this.wxChannel;
      } else {
        // plus.nativeUI.alert('不支持此支付通道！', null, '捐赠');
        return;
      }
      var xhr = new XMLHttpRequest();
      var id = this.FreeId;

      var that = this;
      xhr.onreadystatechange = function() {
        switch (xhr.readyState) {
          case 4:
            if (xhr.status == 200) {
              plus.payment.request(
                channel,
                xhr.responseText,
                function(result) {						
                  plus.nativeUI.Toast('支付成功！', function() {
                    // 成功之后 跳转到订单详情 页面
                    that.$router.push({name: 'manager'});
                    
                  });
                },
                function(error) {
                  // plus.nativeUI.alert('支付失败：' + JSON.stringify(error));
                  plus.nativeUI.Toast('支付失败');
                  that.$router.push({name: 'manager'});
                });
            } else {
              Toast('获取订单信息失败！');
            }
            break;
          default:
            break;
        }
      }
     xhr.open('GET', PAYSERVER + id + "&aId="+ aId);
     xhr.setRequestHeader('X-Litemall-Token', this.tock);
     xhr.send();
     
    },
  }
};
</script>
<style scoped>
.payway{
  font-size: 18px;
  text-align: center;
  margin-top: 20px;
}
.payShow{
  border-radius: 5px;
  width: 80%;
  height: 300px;
  margin: center center;
  padding-left: 20px;
  padding-right: 20px;
}
.pay_div1{
  width: 50px;
  height: 40px;
  float: left;
  
  line-height: 40px;
}
.pay_div2{
  float: left;
  width: 60%;
  height: 40px;
  font-size: 15px;
  line-height: 40px;
}
.pay_div{
  height: 40px;
}

.pay_img{
  margin-top: 5px;
  width: 30px;
  height: 30px;
  
}
.pay_submit {
  border:1px solid #ccc;
  position: fixed;
  width: 70%;
  margin-left: 10px;
  margin-bottom:10px;
}
/*  */
.swipe{
  margin-top: 40px;
  /* border:1px solid green; */
}
#lasthead{
  margin-left: 0px;
}
.proup_head{
  /* border:1px solid #db3c3c; */
  text-align: center;
}
.notice{
 
  height: 150px;
  padding: 0px;
}
.bank_name{
  width:180px;
  height: 40px;
  font-size: 14px;
  color: #000000;
  line-height: 40px;
  text-align: left;
}
.bank_img{
  width: 40px;
  height:40px;
  
  float: left;
}
.bank_logo{
  width: 23px;
  height: 23px;
  margin-top: 8px;
  
}
.radio_row{
  width: 88%;
  height: 40px;
  border-bottom: 1px solid #e5e5e5;
}

.pay_text{
    width: 80%;
    height: 30px;
   
    float: left;
}
.pay_radio{
    width: 100%;
    line-height: 30px;
}
.pay_img{
    width: 30px;
    height: 30px;
    border-radius: 15px;
}
.pay_title {
  font-size: 18px;
  text-align: center;
}
.popup {
  width: 90%;
  padding: 15px;
  border-radius: 5px;
}
.invite button {
  width: 100%;
  height: 45px;
  background: #db3c3c;
  color: #fff;
  font-size: 16px;
  border: 1px solid #db3c3c;
}
.trade_img {
  width: 100%;
  height: 450px;
}
.trade_desc {
  text-align: center;
  font-size: 17px;
  color: #333333;
}
.play_text {
  font-size: 14px;
  color: #a5a5a5;
  line-height: 25px;
}
.play {
  background: #fff;
}
.head_img {
  /* border:1px solid red; */
  width: 15%;
  height: 50px;
  border-radius: 10px;
  margin-left: 4%;
}
.end_time {
  font-size: 15px;
  color: #a5a5a5;
  line-height: 40px;
}
.end_span {
  color: #db3c3c;
  line-height: 40px;
  margin-left: 15px;
  float: left;
}
.end_div{
  float: left;
}
.but {
  text-align: right;
}
.person_but {
  border: 1px solid #db3c3c;
  background: #db3c3c;
  color: #fff;
  padding-left: 15px;
  padding-right: 15px;
  padding-top: 5px;
  padding-bottom: 5px;
  font-size: 14px;
  border-radius: 3px;
  margin-left: 15%;
}
.person_span {
  font-size: 16px;
  color: #db3c3c;
  margin-right: 15px;
}
.person {
  font-size: 16px;
  color: #333333;
}
.line {
  width: 100%;
  height: 10px;
  background: #f9f9f9;
}
.price_span {
  font-size: 17px;
  color: #a5a5a5;
  margin-left: 10px;
  text-decoration: line-through;
  font-weight: 300px;
}
.group_span {
  font-size: 13px;
  color: #db3c3c;
  padding-left: 10px;
  padding-right: 10px;
  padding-top: 2px;
  padding-bottom: 2px;
  border-radius: 18px;
  margin-left: 30px;
  border: 1px solid #db3c3c;
}
.trade_price {
  font-size: 17px;
  color: #db3c3c;
  line-height: 40px;
}
.group_desc {
  font-size: 15px;
  color: #a5a5a5;
  line-height: 35px;
}
.trade_name {
  font-size: 18px;
  color: #333333;
}
.group_div {
  width: 100%;
  padding: 15px;
  background: #ffffff;
}
.group_banner {
  margin-top:50px;
  width: 100%;
  height: 200px;
}
.group_banner img {
  width: 100%;
  height: 200px;
}
.container {
  background: #ffffff;
}
</style>

