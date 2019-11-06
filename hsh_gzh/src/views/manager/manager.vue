<template>
<div class="container">
  <van-nav-bar
    title="星级会员"
  />
  <div class="member" @click="selectmember(item.id)" v-for="(item,value) in shop" :key="value">
    <div class=""><img :src="item.comIcon" alt=""></div>
    <div class="member_name">{{item.comName}}</div>
    <van-row class="member_row">
  <van-col span="14">
    <div><span class="price1">￥{{item.comNowPrice}}</span><span class="price2">&nbsp;&nbsp;&nbsp;<del>￥{{item.comPrice}}</del></span></div>
  </van-col>
  <van-col span="10">
    <div v-if="item.comUpgradeLevel==1" class="membere_desc">购买成为一星会员</div>
    <div v-if="item.comUpgradeLevel==2" class="membere_desc">购买成为二星会员</div>
    <div v-if="item.comUpgradeLevel==3" class="membere_desc">购买成为三星会员</div>
  </van-col>
</van-row>
  </div>

  <van-tabbar
    v-model="active"
    active-color="#07c160"
    inactive-color="#000"
  >
    <van-tabbar-item icon="home-o">首页</van-tabbar-item>
    <van-tabbar-item icon="apps-o">分类</van-tabbar-item>
    <van-tabbar-item icon="diamond-o">掌柜中心</van-tabbar-item>
    <van-tabbar-item icon="shopping-cart-o">购物车</van-tabbar-item>
    <van-tabbar-item icon="manager-o">个人</van-tabbar-item>
  </van-tabbar>
</div>
</template>

<script>
import {shopList, shopStatus, toPick, shopkeeperpay, shopkeepergoodpay, amountshopkeeperpay} from '@/api/api';
import Vue from 'vue'
import {  Row, Col, Image, Grid, GridItem, NavBar, Tabbar, TabbarItem, Icon, Toast, List,Popup,Cell, CellGroup ,RadioGroup, Radio} from 'vant'
Vue.use(Row).use(Col);
Vue.use(Grid).use(GridItem);
Vue.use(Tabbar).use(TabbarItem);
Vue.use(Cell).use(CellGroup);
Vue.use(RadioGroup);
Vue.use(Radio);
export default {
//import引入的组件需要注入到对象中才能使用
components: {
  [Row.name]: Row,
  [Col.name]: Col,
  [Image.name]: Image,
  [Grid.name]: Grid,
  [NavBar.name]: NavBar,
  [Icon.name]: Icon,
  [Toast.name]: Toast,
  [List.name]: List,
  [Popup.name]: Popup,
  [GridItem.name]: GridItem
},
data() {
  return {
    active:2,
    shop:"",
   
  };
},
activated() {
    this.tock = window.localStorage.getItem('Authorization')
    this.getState();
},

created() {
 this.getlist();
},

//方法集合
methods: {
  selectmember(id){
    this.$router.push({name:'manager_gift',params:{id: id}})
  },
  
 //获取等级商品接口
  getlist(){
     shopList().then(res =>{
         this.shop = res.data.data.list;
      })
  },
  
  // 选择支付方式
    paySubmit(){
      if(this.payWay == '1'){
        this. wxClick();
      }else if(this.payWay == '2'){
        this.balanceClick();
      }else{
        this.apyClick();
      }
    },
  // 微信支付
    wxClick() {
      this.pay('wxpay');
      setTimeout(() => {
        this.payshow = false;
      }, 1000);
      
    },
    // 支付宝支付
    apyClick() {
      this.pay('alipay');
      setTimeout(() => {
        this.payshow = false;
      }, 1000);
    },
    // 余额支付
    balanceClick(){
      //余额支付
      amountshopkeeperpay().then(res =>{
        if(res.data.errno == 0){
          Toast(res.data.errmsg);       
          //this.$router.push({name: 'manager'});
        }
          this.getState();
          this.onLoad();
      }).catch(res =>{
        console.log(res.data.errmsg);
        
         Toast(res.data.errmsg);         
         //this.$router.push({name: 'manager'});        
      })
      setTimeout(() => {
        this.payshow = false;
      }, 1000);
    },
    pay(ids) {
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

      var that = this;
      xhr.onreadystatechange = function() {
        switch (xhr.readyState) {
          case 4:
            if (xhr.status == 200) {
              plus.payment.request(
                channel,
                xhr.responseText,
                function(result) {						
                  plus.nativeUI.Toast('支付成功!', function() {
                    // 成功之后 跳转到订单详情 页面
                    //that.$router.push({name: 'manager'});
                   // that.$router.go(0)
                    // back();
                    that.getState();
                    that.onLoad();
                  });
                },
                function(error) {
                  // plus.nativeUI.Toast('支付失败：' + JSON.stringify(error));
                  plus.nativeUI.Toast('支付失败!');
                 // that.$router.push({name: 'manager'});
                // that.$router.go(0)
                that.getState();
                that.onLoad();
                });
            } else {
              Toast('获取订单信息失败！');
            }
            break;
          default:
            break;
        }
      }
     xhr.open('GET', PAYSERVER );
     xhr.setRequestHeader('X-Litemall-Token', this.tock);
     xhr.send();
     
    },

},
}
</script>
<style >
.member_row{
  height: 30px;
  padding-left: 15px;
  padding-right: 15px;
}
.member{
  height: 207px;
  width: 90%;
  margin: 15px auto;
  background: #ffffff;
  border-radius: 5px;
}
.member_name{
  font-size: 16px;
  color: #333333;
  padding-left: 15px;
}
.price2{
  font-size: 14px;
  color: #A5A5A5;
  line-height: 30px;
}
.price1{
  font-size: 16px;
  color: red;
  line-height: 30px;
}
.member img{
  width: 100%;
  height: 150px;
  border-radius: 5px;
}
.membere_desc{
  text-align: right;
   font-size: 14px;
  color: #A5A5A5;
  line-height: 30px;
  height: 30px;
}

</style>