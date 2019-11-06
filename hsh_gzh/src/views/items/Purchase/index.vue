<template>
  <div class="container">
    <van-nav-bar title="购买抵扣券" :fixed="true" left-arrow @click-left="onClickLeft" >
      <van-icon color="#333" name="arrow-left" slot="left" />
    </van-nav-bar>
    <div  class="mar_top ">
        <div class="head" >
            <div class="headimg">
                <van-image
                round
                width="100%"
                height="100%"
                fit="cover"
                :src="userMode.avatar"
                />
            </div>
            <div class="headInfo">
                <div class="head_name">
                    <span >{{userMode.nickName}}</span>
                </div>
                <div v-show="userMode.level==0" class="headCard">普通会员</div>
                <div v-show="userMode.level==1" class="headCard">事业合伙人</div>
                <div v-show="userMode.level==2" class="headCard">华商合伙人</div>
                <div v-show="userMode.level==3" class="headCard">运营中心</div>
                <div>剩余抵扣券：{{userMode.sum}}张</div>
            </div>
        </div>
        <div class="content">

          <!-- <div v-for="(item,index) in list" v-bind:class="{active:index==isActive}" @click="checkItem(index)>{{item.name}}</div> -->
          <!-- <div class="content_card"  v-show="userMode.level==1 || userMode.level==2 "  @click="ClickEvents(index)" v-for="(item,index) in list" :key="item.id">
                <img class="v_img" src="../../../assets/images/scdkq.png">
                <p style="margin:5px 0;">{{item.couName}}</p>
                <span class="c_pri">¥ 1.00</span>

              <div class="nice" v-if="showNice">
                    <van-icon size="20px" name="checked" />
              </div>
          </div> -->
  
          <div class="content_card"   @click="ClickEvents(index, item.proIds, item.id)" v-for="(item,index) in list" :key="item.id" :class="{checked:index==n}">
                <img class="v_img" src="../../../assets/images/scdkq.png">
                <p style="margin:5px 0;">{{item.couName}}</p>
                <span class="c_pri">¥ 1.00</span>

              <div class="nice" v-if="index==n" >
                    <van-icon size="20px" name="checked" />
              </div>
          </div>
       
            
        </div>
       
    </div>
    <van-submit-bar
      :price="100"
      button-type="info"
      button-text="确认支付"
      @submit="onSubmit"/>

    <!-- 显示弹出框 -->
    <van-popup v-model="showShop" class="vpop" >
        <van-cell class="title">抵扣券可抵扣的商品类目:</van-cell>
        <van-cell class="shopBox" size="large" v-for="item in googsList" :key="item">
           <img class="shopImg" :src="item.picUrl">
           <div class="shopDes">
            <div>{{item.name}}</div>
            <div>价格:{{item.retailPrice}}</div>
           </div>
        </van-cell>
    </van-popup>

  </div>
</template>
<script>
import Vue from 'vue';
import { DropdownMenu, DropdownItem } from 'vant';

Vue.use(DropdownMenu).use(DropdownItem);
import {authInfo,getCoupon,getCard, getCouponGoods} from '@/api/api';
import scrollFixed from '@/mixin/scroll-fixed';
import _ from 'lodash';

import {
  Dialog,
  Cell,
  CellGroup,
  Collapse,
  CollapseItem,
  Tab,
  Image,
  Tabs,
  Swipe,
  SwipeItem,
  Button,
  NavBar,
  NoticeBar,
  List,
  Tag,
  Field,
  Tabbar,
  Toast,
  TabbarItem,
  DatetimePicker,
  GoodsAction,
  GoodsActionIcon,
  GoodsActionButton,
  SubmitBar,
  Popup
} from 'vant';
Vue
  .use(GoodsAction)
  .use(GoodsActionIcon)
  .use(GoodsActionButton)
import { log } from 'util';
Vue.use(Cell).use(CellGroup);
export default {
  // 引入的组件
  components: {
    [Dialog.name]: Dialog,
    [SubmitBar.name]: SubmitBar,
    [DatetimePicker.name]: DatetimePicker,
    [Popup.name]: Popup,
    [Tab.name]: Tab,
    [Field.name]: Field,
    [Tabs.name]: Tabs,
    [Collapse.name]: Collapse,
    [CollapseItem.name]: CollapseItem,
    [NavBar.name]: NavBar,
    [Swipe.name]: Swipe,
    [SwipeItem.name]: SwipeItem,
    [NoticeBar.name]: NoticeBar,
    [List.name]: List,
    [Tag.name]: Tag,
    [Tabbar.name]: Tabbar,
    [Toast.name]: Toast,
    [Image.name]: Image,
    [TabbarItem.name]: TabbarItem
  },
  data() {
    return {
      showShop:false,
      proIds:[],
      googsList:[],

      isActive:-1,
      n:0,
      userMode:{},
      list:[],
      payId:0
    };
  },
  created() {
     this.getUserInfo();
     this.getCoupon();
  },

  activated() {
   
  },

  methods: {
    //导航返回
    onClickLeft() {
      this.$router.push({name:'user'});
    },
    ClickEvents(index, proIds, id){
      this.n = index;
      this.proIds = proIds.split(',');
      this.payId = id;
      this.showShop = !this.showShop;
      getCouponGoods(this.proIds).then( res => {
        this.googsList = res.data.data;
        
      }).catch( res => {
        Toast.file(res.data.errmsg)
      })
		},
    // 获取用户信息
    getUserInfo(){
      authInfo({
      }).then(res => {
        this.userMode=res.data.data;
      }).catch( res => {
        Toast.file(res.data.errmsg)
      });
    },
    // 获取抵扣券
    getCoupon(){
      getCoupon({
      }).then(res => {
        this.list=res.data.data;
        // console.log(this.list[0].proIds.split(","))
      }).catch( res => {
        Toast.file(res.data.errmsg)
      });
    },
    // 支付事件
    onSubmit(){
     var openId =  window.sessionStorage.getItem("openid")
      getCard({
        typeId:1,
        type:1,
        id:this.payId,
        openId:openId
      }).then(res => {
          console.log(res.data.data)
          var data = res.data.data;
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
                      this.$router.push({name:'myVoucher'})
                  } 
          }); 

      }).catch( res => {
        Toast.file(res.data.errmsg)
      })
    }
 
  }
};
</script>
<style scoped>
    
    .content_card{
        text-align: center;
        float: left;
        width: 48%;
        margin-left:5px;
        margin-top:10px;
        height: 160px;
        border:1px solid #ccc;
        border-radius: 10px;
        position: relative;
    }

    .checked{
      border:1px solid #4761EA;

    }
    .shopBox{
      width: 100%;
      text-align: center;
      justify-content: center;
    }
    .shopImg{
      float: left;
      width: 40px;
      height: 40px;
    }
    .shopDes{
      float: left;
      margin-left: 10px;
    }
    .title{
      font-size: 16px;
      font-weight: 700;
    }
    .vpop{
      width: 80%;
      justify-content: center;
      /* border:1px solid green; */
    }
    .mar_top{
        margin-top:50px; 
    }
    .head{
        background-color: #fff;
        /* float: right; */
        /* margin-top:50px;  */
        width: 100%;
        /* margin-top: 8px; */
        height: 100px;
    }
    .headimg{
        margin-top:10px;
        margin-left: 10px; 
        width: 80px;
        height: 80px;   
        float: left;
    }
    .headInfo{
        float: left;
        width: 60%;
        margin-top:10px;
        margin-left: 10px;
        /* height: 100px; */
    }
    .head_name{
        color: #333333;
        float: left;
        width: 40%; 
        margin-bottom:10px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }       
    .headCard{
        width: 45%; 
        border: 1px solid #4761EA;
        border-radius: 10px;
        text-align: center;
        display: inline-block;
        margin-bottom:10px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }
    .content{
        width: 100%;
        float: left;
        margin-top:20px;
        padding: 20px;
        /* height: 300px; */
        background-color: #fff;
    }
   
    .v_img{
      width:70%;
      height:40%;
      margin-top:20px;
    }
    .c_pri{
        color: #FF3D3D;
        font-size: 20px;
    }
    .van-submit-bar__text{
        padding-left:10px;
        text-align: left;
    }
    .nice{
        /* position:absolute; */
        width: 20px;
        height: 20px;
        margin-right:10px;
        margin-bottom: 10px;
        float: right;
        color: #4761EA;
    }
</style>


