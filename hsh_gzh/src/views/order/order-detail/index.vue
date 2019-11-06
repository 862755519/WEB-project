<template>
  <div class="order_detail">
    <van-nav-bar
      :fixed="true"
      left-arrow
      title="买家点评"
      @click-left="onClickLeft"
    >
      <van-icon color="#333" name="arrow-left" slot="left" />
    </van-nav-bar>
    <div class="order-goods">
      <van-card v-for="item in orderGoods"
                :key="item.id"
                :title="item.goodsName"
                desc="暂无描述"
                :num="item.number"
                :price="item.price +'.00'"
                :thumb="item.picUrl">
                
                </van-card>

      <van-cell-group>
        <van-cell title="商品金额">
          <span class="red">{{orderInfo.goodsPrice * 100 | yuan}}</span>
        </van-cell>
        <van-cell title="快递费用">
          <span class="red">{{orderInfo.freightPrice * 100 | yuan}}</span>
        </van-cell>
      </van-cell-group>
    </div>

    <van-cell-group style="margin-top: 20px;">
      <van-cell icon="dingwei"
                :title="`${orderInfo.consignee}  ${orderInfo.mobile}`"
                :label="orderInfo.address" />
    </van-cell-group>

    <van-cell-group style="margin-top: 20px;">
      <van-cell title="下单时间">
        <span>{{orderInfo.addTime }}</span>
      </van-cell>
      <van-cell title="订单编号" >
        <span>{{orderInfo.orderSn }}</span>
      </van-cell>
      <van-cell title="订单备注">
        <span>{{orderInfo.remark }}</span>
      </van-cell>

      <van-cell title="实付款：">
        <span class="red">{{orderInfo.actualPrice * 100 | yuan}}</span>
      </van-cell>
      <!-- 订单动作 -->
      <van-cell>
        <van-button size="small"
                    v-if="handleOption.cancel"
                    @click="cancelOrder(orderInfo.id)"
                    style=" float:right"
                    round
                    type="danger">取消订单</van-button>
        <van-button size="small"
                    v-if="handleOption.pay"
                    @click="payOrder(orderInfo.id)"
                    style=" float:right"
                    round
                    type="danger">去支付</van-button>

        <van-button size="small"
                    v-if="handleOption.delete"
                    @click="deleteOrder(orderInfo.id)"
                    style=" float:right"
                    type="danger">删除订单</van-button>
        <van-button size="small"
                    v-if="handleOption.delete"
                    @click="eval"
                    
                    style=" float:right"
                    >去评价</van-button>
        
       
              
              
        <van-button size="small"
                    v-if="handleOption.confirm"
                    @click="confirmOrder(orderInfo.id)"
                    style=" float:right"
                    type="danger">确认收货</van-button>
        <van-button size="small"
                    v-if="handleOption.confirm"
                    @click="show_wl(orderInfo.id)"
                    style=" float:right"
                    >查看物流</van-button>

        <van-button size="small"
                    v-if="handleOption.refund"
                    @click="refundOrder(orderInfo.id)"
                    style=" float:right"
                    type="danger">退款</van-button>
      </van-cell>
    </van-cell-group>

    <van-cell-group v-if="showExp()"
                    style="margin-top: 20px;">
      <van-cell title="快递公司">
        <span>{{orderInfo.expCode}}</span>
      </van-cell>
      <van-cell title="快递编号">
        <span>{{orderInfo.expNo }}</span>
      </van-cell>
    </van-cell-group>
   
   <!-- 物流 -->
    <van-popup class="wl_popup" 
    v-model="wl_show "  
    >
      <div class="wu_div">
        <div class="wl_title">物流信息</div>
        <div class="quxiao_div" @click="quxiao"><img class="quxiao" src="../../../assets/images/quxiao.png" alt=""></div>
        </div>
      <van-steps direction="vertical" :active="0" class="steps">
  <van-step v-for="(item,value) in addressinfo" :key="value">
    <div class="city">{{item.AcceptStation}}</div>
    <div class="city_time">{{item.AcceptTime}}</div>
  </van-step>
   
  
</van-steps>
    </van-popup>

    <!-- 评价 -->
    <van-popup class="eval" v-model="eval_show">
         <div class="order-goods" id = "shop">
      <van-card v-for="item in orderGoods"
                :key="item.id"
                :title="item.goodsName"
                 desc="暂无描述"
                :num="item.number"
                :price="item.price +'.00'"
                :thumb="item.picUrl"></van-card>
    </div>
    <div style="margin-top: 15px;"><div class="pj_title">商品:</div>
    <van-rate class="pj_icon" v-model="value1" icon="flag-o" :size="25"
  color="red"
     void-icon="flag-o"/></div>
    <div><div class="pj_title">物流:</div>
    <van-rate class="pj_icon" v-model="value2" icon="flag-o" :size="25"
  color="red"
     void-icon="flag-o"/></div>
     <div><div class="pj_title">服务:</div>
     <van-rate class="pj_icon" v-model="value3" icon="flag-o" :size="25"
  color="red"
     void-icon="flag-o"/></div>
     <div class="text">
        <van-cell-group>
  <van-field
    v-model="message"
    label="评价"
    type="textarea"
    placeholder="请输入评价(150字以内)"
    rows="1"
    autosize
    class="text_input"
    label-width="50px"
    :maxlength="150"
  />
</van-cell-group>
 <div class="button"><button @click="qx" class="button1">取消</button><button @click="qr" class="button2">确认</button></div>
     </div>
    </van-popup>


   
  </div>
</template>

<script>
import { Card, Field, SubmitBar,Icon,Button, Cell, CellGroup, Dialog,NavBar, Popup,Step, Steps,Rate, Toast  } from 'vant';
import _ from 'lodash';
import {
  orderDetail,
  orderDelete,
  orderConfirm,
  orderCancel,
  orderRefund,setMessage
} from '@/api/api';

export default {
  data() {
    return {
      isSubmit: false,
     
      wl_show:false,
      eval_show:false,
      isDisabled: false,
      value1:3,
      value3:3,
      value2:3,
      orderInfo: {},
      orderGoods: [],
      handleOption: {},
      expressInfo: {},
      addressinfo:[],
      message:"",
      evalinfo:{
        star:4,
        type:0,
        valueId:0,
        content: "",
      }
    };
  },
  created() {
    this.init();
  },

  methods: {
    quxiao(){
      this.wl_show = false;
    },
    qx(){
     this.eval_show = false;
    },
    qr(){
      this.evalinfo.valueId = this.orderGoods[0].goodsId;
     
      this.evalinfo.content = this.message;
     
      if(this.evalinfo.content==''){
         Toast("请输入评论信息");
         return;
      } 
       setMessage(this.evalinfo).then(res => {
         Toast("评论成功");
         this.eval_show = false;
         this.$router.push({path: '/user/order/list/0'})
       
      });
    },
    eval(){
      this.eval_show = true;
    },
    eval2(){
      Toast("你一评价过此商品，不能重复评价");
    },
    //去支付
    payOrder(){
             
          this.$router.push({
          name: 'payment',
          params: {orderInfo : this.orderInfo}
        });
    },


    // 返回按钮
    onClickLeft(){
      this.$router.push({name:'user-order-list'});
    },
    showExp() {
      return _.has(this.orderInfo, 'expNo');
    },
    // 点击 跳转到 支付页面
    payOrder(id){
      this.$router.push({ name: 'payment', params: { orderId: id } });
    },
    deleteOrder(id) {
      let that = this;
      this.$dialog
        .confirm({ message: '确定要删除该订单吗?' })
        .then(() => {
          orderDelete({ orderId: id }).then(() => {
            this.$toast('已删除订单');
             this.$router.push({name:'user-order-list'});
          });
        })
        .catch(() => {});
    },
    cancelOrder(id) {
      this.$dialog
        .confirm({ message: '确定要取消该订单吗?' })
        .then(() => {
          orderDelete({ orderId: id }).then(() => {
            this.init();
            this.$toast('已取消该订单');
            this.$router.push({name:'user-order-list'})
          });
        }).catch(() => {});
    },

   //查看物流
   show_wl(){
     
     if(this.addressinfo == "" || this.addressinfo == null){
      Toast("暂无物流信息！")
      return;
     }
      this.wl_show = true;


   },

    confirmOrder(id) {
      this.$dialog
        .confirm({
          message: '请确认收到货物, 确认收货后无法撤销!'
        })
        .then(() => {
          orderConfirm({ orderId: id }).then(() => {
            this.init();
            this.$toast('已确认收货');
            this.$router.push({name:'user-order-list'})
          });
        })
        .catch(() => {});
    },
    refundOrder(id) {
      this.$dialog
        .confirm({ message: '确定要申请退款吗?' })
        .then(() => {
          orderRefund({ orderId: id }).then(() => {
            this.init();
            this.$toast('已申请订单退款');
            this.$router.push({name:'user-order-list'})
          });
        })
        .catch(() => {});
    },
    commentOrder(id) {},
    toPay(id) {
      this.$router.push({ name: 'payment', params: { orderId: id } });
    },
    init() {
      let orderId = this.$route.query.orderId;
      orderDetail({ orderId: orderId }).then(res => {
        var data = res.data.data;
        
        this.orderInfo = data.orderInfo;
        this.orderGoods = data.orderGoods;
        this.handleOption = data.orderInfo.handleOption;
        this.expressInfo = data.expressInfo;
        console.log(data.expressInfo.ShipperCode);
        if(data.expressInfo.ShipperCode == 'ZTO'){
          this.orderInfo.expCode = '中通快递'
        }else if(data.expressInfo.ShipperCode == 'STO'){
          this.orderInfo.expCode = '申通快递'
        }else if(data.expressInfo.ShipperCode == 'YD'){
          this.orderInfo.expCode = '韵达'
        }else if(data.expressInfo.ShipperCode == 'YTO'){
          this.orderInfo.expCode = '圆通速递'
        }
        let arr = data.expressInfo.Traces;
        let array = arr.reverse();
        this.addressinfo = array;
      });
    }
  },

  components: {
    [Dialog.name]: Dialog,
    [CellGroup.name]: CellGroup,
    [Cell.name]: Cell,
    [Button.name]: Button,
    [SubmitBar.name]: SubmitBar,
    [Card.name]: Card,
    [NavBar.name]: NavBar,
    [Field.name]: Field,
    [Popup.name]:Popup,
    [Step.name]:Step,
    [Steps.name]:Steps,
    [Rate.name]:Rate,
    [Icon.name]:Icon,
  }
};
</script>


<style lang="scss" scoped>

.steps{
  
  width: 100%;
  margin-top: 10px;
}
.wu_div{
 
  height: 30px;
  width: 100%;
}
.quxiao_div{
  float: left;
  width: 10%;
}
.quxiao{
  width: 30px; height: 30px;
}
.wl_title{
 
  text-align: center;
  font-size: 17px;
  padding: 5px;
  float: left;
  width: 90%;
  
}
.button{
 
  height: 40px;
  text-align: right;
  padding-right: 15px;
  margin-top: 30px;
}
.button1{
  width: 60px;
  height: 30px;
  border: 1px solid #db3d3c;
  background-color: #ffffff;
  color: #db3d3c;
  border-radius: 5px;
  
}
.button2{
  width: 60px;
  height: 30px;
  border: 1px solid #db3d3c;
  background-color: #db3d3c;
  color: #fff;
  border-radius: 5px;
  margin-left: 15px;
}
.text_input{
 
  height: 150px;
}
.text{
  
  margin-top: 150px;
  height: 230px;
}
.pj_title{
  float: left;
  height: 40px;
  font-size: 17px;
  width: 70px;
  line-height: 30px;
  padding-left: 15px;
}
.pj_icon{
 
  float: left;
  height: 40px;
  font-size: 15px;
  width: 70%;
  line-height: 40px;
}
#shop{

  padding: 0px;
  margin-top: 10px;
}
.eval{
  width: 90%;
  height: 500px;
  border-radius: 8px;
}
.wl_popup{
  width: 90%;
  height: 500px;
  border-radius: 8px;
  padding: 20px;
}
.order-goods{
  margin-top:50px;
}
.order_detail {
  padding-bottom: 70px;
}
</style>
