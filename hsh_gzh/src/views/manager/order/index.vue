<template>
  <div class="container">
     <van-nav-bar title="星级会员订单" :fixed="true" left-arrow @click-left="onClickLeft" >
      <van-icon color="#333" name="arrow-left" slot="left" />
    </van-nav-bar>
     <div class="withe"></div>
     <van-list v-model="loading"
              :finished="finished"
              :immediate-check="false"
              finished-text="没有更多了"
              @load="getNewtList">
      <div v-for="(item,value) in list" :key="value">
            <div class="order">
              <div class="order_row">
                <p class="order_num">订单号：{{item.orderno}}</p>
                <p v-if="item.paystatus == 0" class="order_succeed">待付款</p>
                <p v-if="item.paystatus == 1" class="order_succeed">购买成功</p>
                <p v-if="item.paystatus == 2" class="order_succeed">订单失效</p>
              </div>
              <div class="order_row2">
                <div class="order_img">
                  <img :src="item.comIcon" alt />
                </div>
                <div class="order_name">
                  <p class="name_p1">{{item.comName}}</p>
                  <p class="name_p2">数量：1</p>
                </div>
                <div class="order_price">
                  <p class="price_p1">原 价： <del>￥{{item.comPrice}}.00</del></p>
                  <p class="price_p1">积分抵扣： ￥{{item.point}}.00</p>
                  <P class="price_p2">实付款：￥{{item.actprice}}.00</P>
                  <!-- <p class="price_p1">￥{{item.comPrice}}.00</p>
                  <P class="price_p2">实付款：￥{{item.actprice}}.00</P> -->
                </div>
                <div class="order_time">
                下单时间:&nbsp;&nbsp;{{item.createTime}}
              </div>
              </div>
              
            </div>
          </div>
    </van-list>

       
      </div>

</template>
<script>
import QRCode from 'qrcodejs2';
import { getFreeinfo, getLogis, getRepeat, getWL } from '@/api/api';
import Vue from 'vue';

import {
  NavBar,
  Row,
  Col,
  Collapse,
  CollapseItem,
  Cell,
  CellGroup,
  RadioGroup,
  Radio,
  Tab,
  Tabs,
  Popup,
  Step,
  Steps,
  PullRefresh,
  List,
  Toast,
} from 'vant';
import { log } from 'util';
import { constants } from 'crypto';
export default {
  // 引入的组件
  components: {
    [NavBar.name]: NavBar,
    [PullRefresh.name]: PullRefresh,
    [Step.name]: Step,
    [Steps.name]: Steps,
    [Popup.name]: Popup,
    [Row.name]: Row,
    [Col.name]: Col,
    [Collapse.name]: Collapse,
    [CollapseItem.name]: CollapseItem,
    [Cell.name]: Cell,
    [CellGroup.name]: CellGroup,
    [RadioGroup.name]: RadioGroup,
    [Radio.name]: Radio,
    [Tab.name]: Tab,
    [Tabs.name]: Tabs,
    [List.name]: List,
    [Toast.name]:Toast
  },
  data() {
    return {
      list: [],
      page: 0,
      limit: 10,
      loading: false,
      finished: false
    };
  },

  created() { 
   this.init();
  },
  methods: {
    init() {
      this.page = 0;
      this.list = [];
      this.getNewtList();
    },
   
     getNewtList() {
      this.page++;
      getRepeat({
       
        page: this.page,
        limit: this.limit
      }).then(res => {
        this.list.push(...res.data.data.list);
        this.loading = false;
        let size = res.data.data.total;
        if(this.list.length>=size){
          this.finished = true;
           return;
        }
        if(this.page>=size){
           this.finished = true;
           return;
        }
        
      });
    },


    //导航返回
    onClickLeft() {
       this.$router.push(`/user`);
    }
  }
};
</script>
<style scoped>
.order_time{
  color: #333;
  font-size: 14px;

}
.step_p {
  margin-top: -3px;
}
.line1 {
  width: 100%;
  height: 1px;
  background: rgb(170, 167, 167);
}
.step {
  margin-top: -10px;
}
.address_name {
  font-size: 16px;
  height: 60px;
  width: 30%;
  float: left;
  padding: 5px;
  text-align: right;
  line-height: 40px;
  border-bottom: 1px solid #f2f2f2;
}
.address_text {
  font-size: 14px;
  height: 60px;
  width: 69%;
  float: left;
  padding-left: 5px;
  padding-top: 5px;
  border-bottom: 1px solid #f2f2f2;
}
.table_desc {
  width: 100%;
  margin-top: 220px;
  padding: 0px;
}
.table_name {
  width: 30%;
  height: 45px;
  float: left;
  font-size: 16px;
  line-height: 45px;
  text-align: right;
  padding-right: 5px;
  border-bottom: 1px solid #f2f2f2;
}
.table_text {
  width: 69%;
  height: 45px;
  float: left;
  font-size: 14px;
  line-height: 45px;
  padding-left: 5px;
  border-bottom: 1px solid #f2f2f2;
}
.popup_title {
  text-align: center;
  font-size: 18px;
  color: #333333;
  line-height: 5px;
}
.withe{
  height: 50px;
}
.popup {
  width: 90%;
  height: 500px;
  border-radius: 5px;
  padding: 15px;
}
.order_row3 {
  height: 50px;
  background: #ffffff;
  margin-top: 10px;
}
.wait_but1 {
  width: 80px;
  height: 30px;
  border: 1px solid #333;
  border-radius: 5px;
  background: #ffffff;
  color: #333;
}
.wait_but2 {
  width: 80px;
  height: 30px;
  border: 1px solid #db3c3c;
  border-radius: 5px;
  background: #ffffff;
  color: #db3c3c;
  margin-left: 10px;
}
.wait_but {
  float: left;
  width: 69%;
  text-align: right;
}
.wait {
  font-size: 16px;
  color: #db3c3c;
  float: left;
  width: 30%;
  height: 33px;
  line-height: 30px;
}
.price_p1 {
  margin-top: 0px;
  font-size: 14px;
  text-align: right;
  line-height: 5px;
  color: #797979;
}
.price_p2 {
  margin-top: 0px;
  text-align: right;
  line-height: 20px;
  font-size: 14px;
  color: #db3c3c;
}
.order_price {
  margin-bottom:7px;
  float: left;
  height: 60px;
  width: 46%;
  padding-top: 5px;
}
.name_p1 {
  font-size: 12px;
  color: #333333;
  line-height: 15px;
  margin-top: -10px;
}
.name_p2 {
  font-size: 14px;
  color: #797979;
  line-height: 10px;
}
.order_name {
  width: 30%;
  height: 60px;
  float: left;
  padding-top: 5px;
}
.order_img {
  width: 23%;
  height: 60px;
  float: left;
}
.order_img img {
  width: 65px;
  height: 55px;
  border-radius: 5px;
  margin-top: -10px;
}
.order_row2 {
  border-bottom: 1px solid #f2f2f2;
  height: 90px;
}
.order {
  height: 170px;
  background: #ffffff;
  padding: 15px;
  padding-bottom: 5px;
  margin-top: 10px;
}
.order_row {
  border-bottom: 1px solid #f2f2f2;
  height: 37px;
}
.order_num {
  font-size: 15px;
  color: #333333;
  float: left;
  width: 70%;
  height: 30px;
  line-height: 35px;
  line-height: 8px;
}
.order_succeed {
  color: #db3c3c;
  font-size: 15px;
  text-align: right;
  float: left;
  width: 30%;
  height: 30px;
  line-height: 8px;
}
</style>

