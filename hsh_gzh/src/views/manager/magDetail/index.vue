<template>
  <div class="item_detail">
    <van-nav-bar
      :fixed="true"
      title="去拼团"
      left-arrow
      @click-left="onClickLeft"
    >
     <van-icon color="#333" name="arrow-left" slot="left" />
    </van-nav-bar>

    <!-- <div class="group_banner">
      <img src="../../../assets/images/group1.png" alt />
    </div> -->

    <!-- 图片模块 -->
    <van-swipe :autoplay="3000" class="mar_top">
      <van-swipe-item v-for="(image, index) in goods.info.gallery" :key="index">
        <img v-lazy="image" width="100%">
      </van-swipe-item>
    </van-swipe>

    <!-- 商品模块 -->
    <van-cell-group class="item_cell_group" v-if="goods">
      <van-cell class="item_info">
        <div>
          <span class="item_price">{{ goods.info.retailPrice*100 | yuan }}</span>
          <span class="item_market_price">{{goods.info.counterPrice*100 | yuan}}</span>
        </div>
        <div class="item-title">
          {{ goods.info.name }}
        </div>
        <div class="item_intro">{{goods.info.brief}}</div>
      </van-cell>
    </van-cell-group>

    <!-- 商品2 -->
    <div class="item_cell_group"  v-if="goods">
      <div class="group_div" >
        <div class="trade_name">
          {{ goods.info.name }}
          <span class="group_span">{{purchase.num}}人团</span>
        </div>
        <div class="group_desc">{{goods.info.brief}}</div>
        <div class="trade_price">优惠：￥{{purchase.discount}}
          <span class="price_span">￥{{purchase.price}}</span>
        </div>
      </div>
    </div>

    <!-- 最新拼团 -->
    <div class="item_cell_group">
      <div class="group_div">
        <van-row class="person">
          <van-col span="6">
            <span class="person_span">最新拼团</span>
          </van-col>
          <van-col span="9">已有{{userAvatar.length}}人参加拼团</van-col>
          <van-col span="9" class="but">
            <span class="person_but" @click="immediate" v-show="userAvatar.length < purchase.num" >立即参团</span>
            <span class="person_but2"  v-show="userAvatar.length >= purchase.num" >团已满</span>
          </van-col>
        </van-row>
        <div class="end_time">
          <div class="end_div">距离结束还剩</div> 
          <van-count-down :time="time" class="end_span"/>
        </div>
        <van-swipe :autoplay="4000" indicator-color="white" :show-indicators="false" class="swipe">
          <van-swipe-item class="proup_head" :loop="false" :width="50" :show-indicators="false" :initial-swipe=0 :duration=10>
              <img   v-for="item in userAvatar" :key="item" class="head_img" id="lasthead" :src="item.avatar" alt />
          </van-swipe-item>
        </van-swipe>
      </div>
    </div>

    <!-- 属性规格模块 -->
    <div class="item_cell_group" v-show="userAvatar.length >= purchase.num && purchase.isJoin == true">
      <van-cell-group>
        <van-cell
          title="规格"
          isLink
          value="请选择"
          @click.native="skuClick"
        />
        <van-cell title="属性" isLink @click.native="propsPopup = true"/>
        <van-cell title="运费" value="满88免邮费"/>
        <van-cell title="可获取积分" :value="goodsDetail.sellScore"/>
        <van-cell title="可使用积分" :value="goodsDetail.sorce"/>
      </van-cell-group>
      <!-- <van-sku
        v-model="showSku"
        :sku="sku"
        :hide-stock="true"
        :goods="skuGoods"
        :show-add-cart-btn="false"
        :goodsId="goods.info.id"
        @buy-clicked="buyGoods"
      />
      <van-popup v-model="propsPopup" position="bottom">
        <popup-props :propsStr="props_str"></popup-props>
      </van-popup> -->
      <van-sku
        v-model="showSku"
        :sku="sku"
        :hide-stock="true"
        :goods="skuGoods"
        :show-add-cart-btn="false"
        :goodsId="goods.info.id"
        @buy-clicked="buyGoods"
        @add-cart="addCart"
      />
      <van-popup v-model="propsPopup" position="bottom">
        <popup-props :propsStr="props_str"></popup-props>
      </van-popup>
    </div>
    <!-- 属性2 -->
    <div class="item_cell_group">
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
    </div>

    <!-- 商品详情模块 -->
    <div class="item_desc">
      <div class="item_desc_title">商品详情</div>
      <div class="item_desc_wrap" v-if="goods.info.detail" v-html="goods.info.detail"></div>
      <div class="item_desc_wrap" v-else style="text-align: center;">
        <p>无详情</p>
      </div>
    </div>

    <!-- 分享链接 -->
    <div v-show = "false">
      <p>链接地址：</p>
      <input id="sharehref" type="url" :value="link" />
      <p>链接标题：</p>
      <input id="sharehrefTitle" type="text" value="华商汇" />
      <p>链接描述：</p>
      <input id="sharehrefDes" type="text" value="华商汇APP下载" />
    </div>

    <!-- 按钮 -->
    <van-goods-action v-show='userAvatar.length < purchase.num' class="invite">
        <button @click="shareHref">邀请好友</button>
    </van-goods-action>

    <van-goods-action v-show='userAvatar.length >= purchase.num && purchase.isJoin == false' class="invite">
        <button >拼团已结束</button>
    </van-goods-action>
    <van-goods-action v-show='userAvatar.length >= purchase.num && purchase.isJoin == true' class="invite">
        <button @click="skuClick">立即付款</button>
    </van-goods-action>

    <van-goods-action v-show='false'>
      <van-goods-action-icon @click="toCart" icon="cart-o" :info="(cartInfo > 0) ? cartInfo : ''"/>
      <van-goods-action-icon @click="addCollect" icon="star-o" :style="(goods.userHasCollect !== 0) ? 'color: #f7b444;':''"/>
      <van-goods-action-button type="warning" @click="skuClick" text="加入购物车"/>
      <van-goods-action-button type="danger" @click="skuClick" text="立即购买"/>
    </van-goods-action>

  </div>
</template>

<script>
import Vue from 'vue';
import { goodsDetail, cartGoodsCount, collectAddOrDelete, cartAdd, cartFastAdd,getShare, groupBuy,groupAdd } from '@/api/api';

import { Sku,Row, Col, Swipe, SwipeItem,CountDown,GoodsAction, GoodsActionButton, GoodsActionIcon, Popup,NavBar, Collapse, CollapseItem, Toast } from 'vant';

import { setLocalStorage } from '@/utils/local-storage';
import popupProps from './popup-props';
import _ from 'lodash';
Vue.use(Collapse).use(CollapseItem);
Vue.use(Row).use(Col);

export default {
  // props: {
  //   itemId: [String, Number]
  // },
  data() {
    const isLogin = !!localStorage.getItem('Authorization');

    return {
      time: 30 * 60 * 60 * 1000,
      activeNames: ['1'],
      
      isLogin,
      goods: {
        userHasCollect: 0,
        info: {
          gallery: []
        }
      },
      sku: {
        tree: [],
        list: [],
        price: "1.00",  // 默认价格（单位元）
      },
      skuGoods: {
        // 商品标题
        title: '',
        // 默认商品 sku 缩略图
        picture: ''
      },
      cartInfo: 0,
      selectSku: {
        selectedNum: 1,
        selectedSkuComb: {
          sku_str: 'aa'
        }
      },
      propsPopup: false,
      showSku: false,

      goodsDetail:{}, //商品描述信息
      groupList:[], 

      purchase:{},  //团购信息
      peopleId: '', // 团长pId
      userId: '', // 团长pId
      userAvatar:[], //用户头像


      // 分享好友的属性
      shares :{},
      active:0,
      code:"",
      link: 'http://www.kmfhi.com',
    };
  },
  // 加载周期初始化 分享功能
  mounted(){
        var that=this;
        var Intent=null,File=null,Uri=null,main=null;
        // H5 plus事件处理
        function plusReady(){
          that.updateSerivces();
          if(plus.os.name=="Android"){
              main = plus.android.runtimeMainActivity();
              Intent = plus.android.importClass("android.content.Intent");
              File = plus.android.importClass("java.io.File");
              Uri = plus.android.importClass("android.net.Uri");
          }
        }
        if(window.plus){
            plusReady();
        }else{
            document.addEventListener("plusready",plusReady,false);
        }
  },

  computed: {
    props_str() {
      let props_arr = [];
      _.each(this.goods.attribute, json => {
        props_arr.push([json['attribute'], json['value']]);
      });
      return props_arr || [];
    }
  },

  created() {
   
    const isLogin = !!localStorage.getItem('Authorization');

    this.getBroupBuy();
    this.initData();
    // 获取分享链接
    this.getShareInfo();
  },

  methods: {
    // 立即参团
    immediate(){
      
      groupAdd({id:this.peopleId}).then( res =>{
        console.log(res.data.data.child);
        this.userAvatar = res.data.data.child
        Toast(res.data.errmsg)
        
      }).catch(res =>{
          Toast(res.data.errmsg)

      })

    },
    
    // 路由导航回退
    onClickLeft() {
      this.$router.push({name:'home'});
    },
    skuClick() {
      const userAva = this.userAvatar.length
      for(var i = 0; i<userAva; i++){
        if(this.userAvatar[i].isSelf == true){
  
          if(this.userAvatar[i].isPay==true){
              Toast("不能重复购买");
              return;
            }
        }
   
      }
      this.showSku = true;
    },
    initData() {
      groupBuy({ id: this.itemId }).then(res => {
        this.goods = res.data.data;
        this.userAvatar = res.data.data.purchase.child
        
        // if(res.errno!=0){
        //   Toast(res.errmsg)
        // }

        this.goodsDetail = res.data.data.info;
        
         const times =res.data.data.purchase.expireTime;
         const endtime = times.replace(/\-/g, '/');

         var oldTime = (new Date(endtime)).getTime();
        
         var mydata = new Date().getTime()
         this.time = oldTime - mydata
         
         this.purchase = res.data.data.purchase;
         this.peopleId = res.data.data.purchase.pId;
        
        this.skuAdapter();
      });

      cartGoodsCount().then(res => {
        this.cartInfo = res.data.data;
      });
    },
    toCart() {
      this.$router.push({
        name: 'cart'
      });
    },
    addCollect() {
      collectAddOrDelete({ valueId: this.itemId, type: 0 }).then(res => {
        if (this.goods.userHasCollect === 1) {
          this.goods.userHasCollect = 0;
        } else {
          this.goods.userHasCollect = 1;
          this.$toast({
            message: '收藏成功',
            duration: 1500
          });
        }
      });
    },
    getProductId(s1, s2) {
      var productId;
      var s1_name;
      var s2_name;
      _.each(this.goods.specificationList, specification => {
        _.each(specification.valueList, specValue => {
          if (specValue.id === s1) {
            s1_name = specValue.value;
          } else if (specValue.id === s2) {
            s2_name = specValue.value;
          }
        });
      });

      _.each(this.goods.productList, v => {
        let result = _.without(v.specifications, s1_name, s2_name);
        if (result.length === 0) {
          productId = v.id;
        }
      });
      return productId;
    },
    getProductIdByOne(s1) {
      var productId;
      var s1_name;
      _.each(this.goods.specificationList, specification => {
        _.each(specification.valueList, specValue => {
          if (specValue.id === s1) {
            s1_name = specValue.value;
            return;
          }
        });
      });

      _.each(this.goods.productList, v => {
        let result = _.without(v.specifications, s1_name);
        if (result.length === 0) {
          productId = v.id;
        }
      });
      return productId;
    },
    addCart(data) {
      let that = this;
      let params = {
        goodsId: data.goodsId,
        number: data.selectedNum,
        productId: 0
      };
      if (_.has(data.selectedSkuComb, 's3')) {
        this.$toast({
          message: '目前仅支持两规格',
          duration: 1500
        });
        return;
      } else if (_.has(data.selectedSkuComb, 's2')) {
        params.productId = this.getProductId(
          data.selectedSkuComb.s1,
          data.selectedSkuComb.s2
        );
      } else {
        params.productId = this.getProductIdByOne(data.selectedSkuComb.s1);
      }
      cartAdd(params).then(() => {
        this.cartInfo = this.cartInfo + data.selectedNum;
        this.$toast({
          message: '已添加至购物车',
          duration: 1500
        });
        that.showSku = false;
      });
    },
    buyGoods(data) {
      const userAva = this.userAvatar.length

      for(var i = 0; i<userAva; i++){
        if(this.userAvatar[i].isSelf == true){
          this.userId = this.userAvatar[i].id
        }
      }

      let that = this;
      let params = {
        goodsId: data.goodsId,
        number: data.selectedNum,
        productId: 0
      };
      if (_.has(data.selectedSkuComb, 's3')) {
        this.$toast({
          message: '目前仅支持两规格',
          duration: 1500
        });
        return;
      } else if (_.has(data.selectedSkuComb, 's2')) {
        params.productId = this.getProductId(
          data.selectedSkuComb.s1,
          data.selectedSkuComb.s2
        );
      } else {
        params.productId = this.getProductIdByOne(data.selectedSkuComb.s1);
      }
      cartFastAdd(params).then(res => {
        let cartId = res.data.data;
        setLocalStorage({ CartId: cartId });
        that.showSku = false;
        this.$router.push('/order/checkout?grouponLinkId=' + that.userId+'&itemId='+this.itemId );
      });
    },
    skuAdapter() {
      const tree = this.setSkuTree();
      const list = this.setSkuList();
      const skuInfo = {
        price: parseInt(this.goods.info.retailPrice), // 未选择规格时的价格
        stock_num: 0, // TODO 总库存
        collection_id: '', // 无规格商品skuId取collection_id，否则取所选sku组合对应的id
        none_sku: false, // 是否无规格商品
        hide_stock: true
      };
      this.sku = {
        tree,
        list,
        ...skuInfo
      };
      this.skuGoods = {
        title: this.goods.info.name,
        picture: this.goods.info.picUrl
      };
    },
    setSkuList() {
      var sku_list = [];
      _.each(this.goods.productList, v => {
        var sku_list_obj = {};
        _.each(v.specifications, (specificationName, index) => {
          sku_list_obj['s' + (~~index + 1)] = this.findSpecValueIdByName(
            specificationName
          );
        });

        sku_list_obj.price = v.price * 100;
        sku_list_obj.stock_num = v.number;
        sku_list.push(sku_list_obj);
      });

      return sku_list;
    },
    findSpecValueIdByName(name) {
      let id = 0;
      _.each(this.goods.specificationList, specification => {
        _.each(specification.valueList, specValue => {
          if (specValue.value === name) {
            id = specValue.id;
            return;
          }
        });
        if (id !== 0) {
          return;
        }
      });
      return id;
    },
    setSkuTree() {
      let that = this;
      let specifications = [];
      _.each(this.goods.specificationList, (v, k) => {
        let values = [];
        _.each(v.valueList, vv => {
          vv.name = vv.value;
          values.push({
            id: vv.id,
            name: vv.value,
            imUrl: vv.picUrl
          });
        });

        specifications.push({
          k: v.name,
          v: values,
          k_s: 's' + (~~k + 1)
        });
      });

      return specifications;
    },
    // 获取团购列表
    getBroupBuy(){
      const querId = this.$route.query.itemId;
      this.itemId = querId;
      // groupBuy({id:querId}).then( res =>{

      // })
    },
    // 点击链接分享
    updateSerivces() {
      var that=this;
        plus.share.getServices(function(s) {
          for (var i in s) {
            var t = s[i];
            that.shares[t.id] = t;
          }
        }, function(e) {
          
          // alert("获取分享服务列表失败：" + e.message);
        });
    },
    shareAction(sb, bh) {
      if (!sb || !sb.s) {
        
        return;
      }

      var msg = {
        content: sharehrefDes.value,
        extra: {
          scene: sb.x
        }
      };
      if (bh) {
        msg.href = sharehref.value;
        if (sharehrefTitle && sharehrefTitle.value != "") {
          msg.title = sharehrefTitle.value;
        }
        if (sharehrefDes && sharehrefDes.value != "") {
          msg.content = sharehrefDes.value;
        }
        msg.thumbs = ["_www/logo.png"];
        msg.pictures = ["_www/logo.png"];
      } else {
        if (pic && pic.realUrl) {
          msg.pictures = [pic.realUrl];
        }
      }
      // 发送分享
      if (sb.s.authenticated) {
      
        this.shareMessage(msg, sb.s);
      } else {
      
        sb.s.authorize(function() {
          this.shareMessage(msg, sb.s);
        }, function(e) {
          // alert("认证授权失败：" + e.code + " - " + e.message);
        });
      }
      },
      shareMessage(msg, s) {

      // alert(JSON.stringify(msg));
      s.send(msg, function() {
        

      }, function(e) {
      
        // alert("分享到\"" + s.description + "\"失败: " + JSON.stringify(e));

      });
    },
    shareHref() {
      var xx=this;
      var shareBts = [];
      // 更新分享列表
      var ss = this.shares['weixin'];
      ss && ss.nativeClient && (shareBts.push({
          title: '微信朋友圈',
          s: ss,
          x: 'WXSceneTimeline'
        }),
        shareBts.push({
          title: '微信好友',
          s: ss,
          x: 'WXSceneSession'
        }));
      // ss = this.shares['qq'];
      // ss && ss.nativeClient && shareBts.push({
      // 	title: 'QQ',
      // 	s: ss
      // });
      // 弹出分享列表
      shareBts.length > 0 ? plus.nativeUI.actionSheet({
        title: '分享链接',
        cancel: '取消',
        buttons: shareBts
      }, function(e) {
        (e.index > 0) && xx.shareAction(shareBts[e.index - 1], true);
      }) : plus.nativeUI.Toast('当前环境无法支持分享链接操作!');
    },
    //获取二维码信息
    getShareInfo(){
      getShare().then(res => {
        this.link = res.data.data.list.toAndroidUrl;
      });
    }
  },

  components: {
    [Popup.name]: Popup,
    [Swipe.name]: Swipe,
    [SwipeItem.name]: SwipeItem,
    [Sku.name]: Sku,
    [CountDown.name]:CountDown,
    [GoodsAction.name]: GoodsAction,
    [GoodsActionButton.name]: GoodsActionButton,
    [GoodsActionIcon.name]: GoodsActionIcon,
    [popupProps.name]: popupProps,
    [NavBar.name]:NavBar 
  }
};
</script>

<style lang="scss" scoped>
// 引入样式
// 商品价格模块
.group_div {
  width: 100%;
  padding: 15px;
  background: #ffffff;
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
.price_span {
  font-size: 17px;
  color: #a5a5a5;
  margin-left: 10px;
  text-decoration: line-through;
  font-weight: 300px;
}
// 规格部分
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
  display:inline-block;
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
.person_but2 {
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

.swipe{
  margin-top: 40px;
  // border:1px solid green;
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
.invite button {
  margin-top:20px;
  width: 100%;
  height: 45px;
  background: #db3c3c;
  color: #fff;
  font-size: 16px;
  border: 1px solid #db3c3c;
}
.group_banner {
  // border:1px solid green;
  margin-top:50px;
  width: 100%;
  height: 200px;
}
.group_banner img {
  width: 100%;
  height: 200px;
}
// .mar_top{
//   // margin-top:50px;
// }
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

.item_desc_title {
  @include one-border;
  padding: 10px 0;
  text-align: center;
}
.van-toast .van-toast--middle .van-toast--text{
  display:none;
}
</style>
