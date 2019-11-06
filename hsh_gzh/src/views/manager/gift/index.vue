<template>
  <div class="item_detail">
    <van-nav-bar
      :fixed="true"
      title="星级会员详情"
      left-arrow
      @click-left="onClickLeft"
    >
      <van-icon color="#333" name="arrow-left" slot="left" />
    </van-nav-bar>

    <!-- <van-swipe class="margin-top" :autoplay="3000">
      <van-swipe-item>
        <img v-lazy="infoList.comIcon" width="100%" height="200px;" />
      </van-swipe-item>
    </van-swipe> -->

    <van-swipe class="margin-top" :autoplay="2000"
               indicator-color="white">
      <van-swipe-item v-for="item in banner"
                      :key="item">
        <van-image
          width="100%"
          height="230px"
          fit="fit"
          @click="swiper(banner.type, banner.link)"
          :src="item"
        />
      </van-swipe-item>
    </van-swipe>

    <van-cell-group class="item_cell_group" v-if="goods">
      <van-cell class="item_info">
        <div>
          <span class="item_price">￥{{infoList.comNowPrice}}</span>
          <span class="item_market_price">￥{{infoList.comPrice}}</span>
        </div>
        <div class="item-title">
          {{ infoList.comName }}
        </div>
        <!-- <div class="item_intro">{{ infoList.comDetails }}</div> -->
      </van-cell>
    </van-cell-group>

    <!-- <div class="item_add" isLink @click="goAddressList()">
      <p class="address">&nbsp;&nbsp;请选择收货地址</p>
      <van-icon class="icon" name="arrow" />
      
      <div class="infoAdd">
        <div slot="">
          <div>
            <span>{{ checkedAddress.name }}</span>
            <span>{{ checkedAddress.tel }} </span>
          </div>
          <div>
            {{ checkedAddress.addressDetail }}
          </div>
        </div>
      </div>
    </div> -->

    <van-cell-group class="item_add">
      <van-cell title="是否使用抵扣积分">
        <van-switch v-model="checked" size="24px" active-color="#ee0a24" v-if="atMyNum > 0" @change="select" />
        <van-switch v-model="checked" size="24px" active-color="#ee0a24" v-else disabled />
      </van-cell>
      <van-cell  title="可抵扣积分(金额)">
        <span v-if="checked" class="red">-{{ atNum  * 100| yuan}}</span>
        <span v-else class="red">-{{ 0 * 100| yuan}}</span>
      </van-cell>
    </van-cell-group>


    <div class="item_desc">
      <div class="item_desc_title">会员详情</div>
      <div
        class="item_desc_wrap"
        v-if="infoList.comDetails"
        v-html="infoList.comDetails"
      ></div>
      <div class="item_desc_wrap" v-else style="text-align: center;">
        <p>无详情</p>
      </div>
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

    <van-goods-action > <!-- 未成为会员 -->
      <div class="payStyle">
        <!-- <van-button type="danger" @click="selectPay">选择支付方式</van-button> -->
        <van-submit-bar
          v-if="this.checked == true"
          :price="(atNum > infoList.comNowPrice?atNum-infoList.comNowPrice:infoList.comNowPrice - atNum) * 100"
          button-text="选择支付方式"
          @submit="selectPay"
        >
        </van-submit-bar>
        <van-submit-bar
          v-if="this.checked == false"
          :price="infoList.comNowPrice * 100"
          button-text="选择支付方式"
          @submit="selectPay"
        >
        <!-- <van-button type="danger">收货地址</van-button> -->
        </van-submit-bar>
      </div>
    </van-goods-action>

  </div>
</template>

<script>

import {
  goodsDetail,
  cartGoodsCount,
  collectAddOrDelete,
  cartAdd,
  cartFastAdd,
  shopInfo,
  toPick,
  goodpay,
  getIntegral,
  shopStatus,
  cartCheckout,
  shopList,
  amountpay,
  AppList,
  selectUser,
} from '@/api/api';


// 引入vant ui样式
import Vue from 'vue';
import {
  Sku,
  SubmitBar,
  Image,
  Swipe,
  SwipeItem,
  GoodsAction,
  GoodsActionButton,
  GoodsActionIcon,
  Popup,
  Dialog,
  Switch,
  Tag,
  Toast,
  DropdownMenu, 
  DropdownItem,
  SwitchCell,
  NavBar,RadioGroup, Radio, Tab, Tabs,
  Cell, CellGroup
} from 'vant';
import { getLocalStorage, setLocalStorage } from '@/utils/local-storage';

Vue.use(Cell).use(CellGroup);
Vue.use(DropdownMenu).use(DropdownItem);
Vue.use(RadioGroup);
Vue.use(Radio);
Vue.use(Tab).use(Tabs);



export default {

  data() {
    const isLogin = !!localStorage.getItem('Authorization');

    return {
      dengji:"",//果树等级
      usercode:"",//用户等级
      // checkedAddress: {},//地址对象
      addId:0,
      checked:false,

      payPri:0, //支付价格
      payWay: '2',

      isLogin,
      id: '',
      goods: {
        userHasCollect: 0,
        info: {
          gallery: []
        }
      },
      infoList: {
        comPrice:0
      },
      banner:[],
      sku: {
        tree: [],
        list: [],
        price: '1.00' // 默认价格（单位元）
      },
      skuGoods: {
        // 商品标题
        title: '',
        // 默认商品 sku 缩略图
        picture: ''
      },
      atNum:0, //动态注册积分
      atMyNum:0, //静态注册积分
      cartInfo: 0,
      selectSku: {
        selectedNum: 1,
        selectedSkuComb: {
          sku_str: 'aa'
        }
      },
      tock:'',

      payshow: false,
     
      switch1: true,
      switch2: true,
      switch3: false,
      show:true,

      shopState: null,//获取会员状态
      geted: null, //是否领取

      FreeId:0, //免费领取 id

      propsPopup: false,
      showSku: false,

      // 支付属性
      wxChannel: null, // 微信支付   
      aliChannel: null, // 支付宝支付
      channel: null, //支付通道

      // ALIPAYSERVER: process.env.VUE_APP_BASE_API+'/alipay/pay/shopkeepergoodpay?id=',  //支付宝接口
      // WXPAYSERVER: process.env.VUE_APP_BASE_API+'/wx/pay/shopkeepergoodpay?id=',      //微信支付接口

      ALIPAYSERVER: process.env.VUE_APP_BASE_API+'/applepay/alipay?id=',  //支付宝接口
      WXPAYSERVER: process.env.VUE_APP_BASE_API+'/applepay/wxpay?id=',      //微信支付接口
    };
  },
  created() {
    this.tock = window.localStorage.getItem('Authorization');
    const querId = this.$route.params.id;
    if(querId!=null&& querId!=''){
      // alert("created隔壁"+querId)
      localStorage.setItem("ids",querId)
    }
    this.getUser();
    this.getAt();
    this.initData();
    
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
    //获取用户等级
     getUser(){
        selectUser().then(res => {
        this.usercode = res.data.data.level;
      });
     },
    // 获取注册积分
    getAt(){
      getIntegral().then(res =>{
         this.atNum = res.data.data.at;
         this.atMyNum = res.data.data.at;
      })
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
    selectPay(){
        if(this.usercode == 0){
           this.payshow =  true;
        }else if(this.usercode == this.dengji){
           this.payshow =  true;
        }else{
          this.payshow = false;
          Toast.fail("你不可以购买此类型商品");
        }
    },
    // 选择积分
    select(){
      this.atNum = this.atMyNum;
      this.checked != this.checked;
      if(this.checked == true){
        if(this.infoList.comNowPrice < this.atNum){
          this.atNum = this.infoList.comNowPrice;
        }else{
          this.atNum = this.atNum
        }
      }else{
        this.atNum = 0
      }
     
      
    },

    onConfirm(){
        this.$refs.item.toggle();
    },
    // 微信支付
    wxClick() {
      this.pay('wxpay',this.atNum);
      setTimeout(() => {
        this.payshow = false;
      }, 1000);
    },
    // 支付宝支付
    apyClick() {
      
      this.pay('alipay',this.atNum);
      setTimeout(() => {
        this.payshow = false;
      }, 1000);
    },
    // 余额支付
    balanceClick(){
      amountpay({id: this.FreeId, at: this.atNum}).then(res =>{
        console.log(res.data.errno == 0);
        if(res.data.errno == 0){
          Toast.success(res.data.errmsg)
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
    pay(ids,aT) {
      // 从服务器请求支付订单
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
       console.log(xhr);
       
        switch (xhr.readyState) {
          case 4:
            if (xhr.status == 200) {
              let  text= eval('(' + xhr.responseText + ')').data
 
              plus.payment.request(
                channel,  
                //xhr.responseText, 
                text,
                function(result) {
                  plus.nativeUI.Toast('支付成功！', function() {
                    // 成功之后 跳转到订单详情 页面
                    that.$router.push({name: 'manager'});
                  });
                },
                function(error) {
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
     xhr.open('GET', PAYSERVER + id + "&at="+ aT);
     xhr.setRequestHeader('X-Litemall-Token', this.tock);
     xhr.send();
     
    },
   
    // 标题回退 路由
    onClickLeft() {
      this.$router.push({name:'manager'});
    },
    // 获取性情页
    initData() {
      const ids = localStorage.getItem('ids')
      
      shopInfo({ id: ids }).then(res => {
        this.infoList = res.data.data;
        this.FreeId = res.data.data.id  
        this.dengji =  res.data.data.comUpgradeLevel;
        var str = res.data.data.comBanner
        this.banner = str.split(',')

        
      });
      // AppList().thegn( res =>{
      //   console.log(res.data.data);
        
      // })
    }
   
  },

  components: {
    [Popup.name]: Popup,
    [SubmitBar.name]: SubmitBar,
    [Toast.name]:Toast ,
    [Swipe.name]: Swipe,
    [SwipeItem.name]: SwipeItem,
    [Sku.name]: Sku,
    [GoodsAction.name]: GoodsAction,
    [GoodsActionButton.name]: GoodsActionButton,
    [GoodsActionIcon.name]: GoodsActionIcon,
    [DropdownMenu.name]: DropdownMenu,
    [DropdownItem.name]: DropdownItem,
    [SwitchCell.name]: SwitchCell,
    [Tag.name]: Tag,
    [Switch.name]: Switch,
    [Image.name]: Image,
    [NavBar.name]: NavBar
    // [popupProps.name]: popupProps
  }
};
</script>

<style lang="scss" scoped>
.address{
  display: inline-block;
  width: 60%;
  // margin-top:20px;
  margin-right:0;
  // display:block;
  // float: left;
}
.infoAdd{
  // border:1px solid #ccc;
  padding:0 10px;
  box-shadow: 2px solid #ccc;
}
.icon{
  float:right;
  margin-top: 15px;
}
.pay_submit {
  border:1px solid #ccc;
  position: fixed;
  width: 70%;
  margin-left: 10px;
  margin-bottom:10px;
}
.margin-top{
  margin-top:50px;
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
.payStyle{
  text-align: right;
  width:  100%;
}
.btnInfo{
  margin-top:5px;
  width: 50%;
  text-align: center;
  margin-left: 25%;
  border-radius: 20px;
}
.gift_up{
  color: skyblue;
  margin:0 auto;
  // border:1px solid #ccc;
}
.item_detail {
  img {
    max-width: 100%;
  }
}

.item_cell_group {
  margin-bottom: 15px;
}

.item_price {
  font-size: 20px;
  color: $red;
  margin-right: 10px;
}

.item_market_price {
  color: $font-color-gray;
  text-decoration: line-through;
  font-size: $font-size-small;
}

.item-title {
  line-height: 1.4;
}

.item_dispatch {
  font-size: $font-size-small;
  color: $font-color-gray;
}

.item_intro {
  line-height: 18px;
  margin: 5px 0;
  font-size: $font-size-small;
  color: $font-color-gray;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
}

.item_desc {
  background-color: #fff;
  /deep/ p {
    padding: 0 10px;
    margin-block-start: 0 !important;
    margin-block-end: 0 !important;
  }
  /deep/ img {
    max-width: 100%;
    display: block;
  }
}
.item_add{
  // border:1px solid green;
  // margin:10 auto;
  margin-top:10px;
  background-color: #fff;
  // padding: 0 10px;
  margin-bottom:10px;
  // margin-block-start: 0 !important;
  // margin-block-end: 0 !important;
}

.item_desc_title {
  @include one-border;
  padding: 10px 0;
  text-align: center;
}
</style>
