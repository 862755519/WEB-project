<template>
  <div class="item_detail">
    <van-nav-bar
      :fixed="true"
      title="商品详情"
      left-arrow
      @click-left="onClickLeft"
    >
     <van-icon color="#333" name="arrow-left" slot="left" />
    </van-nav-bar>
    <van-swipe :autoplay="3000" class="mar_top">
      <van-swipe-item v-for="(image, index) in goods.info.gallery" :key="index">
        <van-image
          width="100%"
          height="230px"
          fit="fit"
          :src="image"
        />
      </van-swipe-item>
    </van-swipe>
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

  <div class="item_cell_group">
    <van-cell-group>
      <van-cell
        title="规格"
        isLink
        value="请选择"
        @click.native="skuClick"
      />
      <van-cell title="属性" isLink @click.native="propsPopup = true"/>
      <van-cell title="运费" :value="'￥'+goodsDetail.freight"/>
      <van-cell title="服务费" :value="'￥'+goodsDetail.serviceCharge"/>
      <!-- <van-cell title="可获取积分" :value="goodsDetail.sellScore"/>
      <van-cell title="可抵扣积分" :value="goodsDetail.sorce"/> -->
    </van-cell-group>
    <van-sku
      v-model="showSku"
      :sku="sku"
      :hide-stock="true"
      :goods="skuGoods"
      :hide-quota-text="true"
      :quota=1
      :disable-stepper-input="true"
      :goodsId="goods.info.id"
      @buy-clicked="buyGoods"
      @add-cart="addCart"
    />
    <van-popup v-model="propsPopup" position="bottom">
      <popup-props :propsStr="props_str"></popup-props>
    </van-popup>
  </div>

   <!-- <div class="head">
       <div class="head_left"><img class="head_img" src="../../../assets/images/fw.png" alt=""></div>
       <div class="head_right">
         <div class="head_name">发大萨达撒的</div>
         <div class="head_time">2015522115</div>
       </div>
    </div>
    <div class="head_text">fkalsdska达到了萨迪克鲁大师卡里的凯撒鲁大师了拉萨的拉开</div> -->
     <van-collapse v-model="activeNames" class="apse">
  <van-collapse-item title="商品评价" name="1" >
    <div class="head_con" v-for="(item,value) in evallist" :key="value">
       <div class="head">
       <div class="head_left"><img class="head_img" :src="item.avatar" alt=""></div>
       <div class="head_right">
         <div class="head_name">{{item.nickname}}</div>
         <div class="head_time">{{item.addTime}}</div>
       </div>
    </div>
    <div class="head_text">{{item.content}}</div>
    </div>
    
  </van-collapse-item>
</van-collapse>

    <div class="item_desc">
      <div class="item_desc_title">商品详情</div>
      <div class="item_desc_wrap" v-if="goods.info.detail" v-html="goods.info.detail"></div>
      <div class="item_desc_wrap" v-else style="text-align: center;">
        <p>无详情</p>
      </div>
    </div>
    <van-goods-action>
      <van-goods-action-icon @click="toCart" icon="cart-o" :info="(cartInfo > 0) ? cartInfo : ''"/>
      <van-goods-action-icon @click="addCollect('取消收藏')" icon="star-o" v-if="goods.userHasCollect == 1"  icon-class="red_color"/>
      <van-goods-action-icon @click="addCollect('收藏成功')" icon="star-o" v-else/>
      <van-goods-action-button type="warning" @click="skuClick" text="加入购物车"/>
      <van-goods-action-button type="danger" @click="skuClick" text="立即购买"/>
    </van-goods-action>

  </div>
</template>

<script>

import { goodsDetail, cartGoodsCount, collectAddOrDelete, cartAdd, cartFastAdd } from '@/api/api';

import { Sku,Image, Swipe, SwipeItem, GoodsAction, GoodsActionButton, GoodsActionIcon, Popup,NavBar,Collapse, CollapseItem } from 'vant';
import { setLocalStorage } from '@/utils/local-storage';
import popupProps from './popup-props';
import _ from 'lodash';

export default {
  props: {
    itemId: [String, Number]
  },

  data() {
    const isLogin = !!localStorage.getItem('Authorization');
    return {
      activeNames: ['0'],
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
        price: '1.00' // 默认价格（单位元）
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
      evallist:[],

    };
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
    this.initData();
    // this.itemId = this.$route.query.indexBreak
    // 商品分类1  购物车2 搜索3 收藏4  首页5 
   var indexBreak =  this.$route.query.indexBreak;
   if(indexBreak!=undefined && indexBreak !=null){
      sessionStorage.setItem("indexBreak",indexBreak);
      if(parseInt(indexBreak)==1){
        var categoryId =  this.$route.query.categoryId;
        sessionStorage.setItem("categoryId",categoryId);
      }
   }
 
  },

  methods: {
     onClickLeft() {
       // 商品分类1  购物车2 搜索3 收藏4  首页5 
      var indexBreak = sessionStorage.getItem("indexBreak");
      switch(parseInt(indexBreak)){
        case 1:
          var categoryId = sessionStorage.getItem("categoryId");
         // this.$router.push({name:'category'});
          this.$router.replace({
              name: 'category',
              query: { itemClass: categoryId }
            })
        break;
        case 2:
          this.$router.push({name:'cart'});
        break;
        case 3:
          this.$router.push({name:'search'});
        break;
        case 4:
           this.$router.push({name:'collect'});
        break;
        case 5:
          this.$router.push({name:'home'});
        break;
      }

    },
    skuClick() {
      this.showSku = true;
    },
    initData() {
      goodsDetail({ id: this.itemId }).then(res => {
        this.goods = res.data.data;
        this.goodsDetail = res.data.data.info;
        this.evallist = res.data.data.comment.data;
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
    addCollect(msg) {
      collectAddOrDelete({ valueId: this.itemId, type: 0 }).then(res => {
        if (this.goods.userHasCollect === 1) {
          this.goods.userHasCollect = 0;
          this.$toast({
            message: msg,
            duration: 1500
          });
        } else {
          this.goods.userHasCollect = 1;
          this.$toast({
            message: msg,
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
      }).catch(res =>{
          this.$toast({
            message: res.data.errmsg,
            duration: 1500
          });
      });
    },
    buyGoods(data) {
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
        this.showSku = false;
        this.$router.push('/order/checkout?itemId=' + this.itemId +'&car=2');
      }).catch( res => {
        this.$toast({
            message: res.data.errmsg,
            duration: 1500
        });
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
    }
  },

  components: {
    [Popup.name]: Popup,
    [Swipe.name]: Swipe,
    [SwipeItem.name]: SwipeItem,
    [Sku.name]: Sku,
    [GoodsAction.name]: GoodsAction,
    [GoodsActionButton.name]: GoodsActionButton,
    [GoodsActionIcon.name]: GoodsActionIcon,
    [popupProps.name]: popupProps,
    [Image.name]: Image,
    [NavBar.name]:NavBar,
    [Collapse.name]:Collapse,
    [CollapseItem.name]:CollapseItem
  }
};
</script>

<style lang="scss" scoped>
.red_color{
  background-color: red;
  color: red;
}
.head_con{
  margin-top: 10px;
  border: 1px solid rgb(216, 220, 221);
  height: 115px;
  border-radius: 8px;
  padding: 10px;
 
}
.apse{
  background: #fff;
}

.head_left{
  float: left;
  width: 55px;
}
.head_img{
  width: 50px;
  height: 50px;
  border-radius: 25px;
}
.head_right{
  float: left;
  width: 80%;
  height: 55px;
  padding-top: 3px;
}
.head_text{
  float: left;
  width: 100%;
  height: 45px;
  font-size: 14px;
  line-height: 17px;
  overflow: hidden;
}
.head_name{
  font-size: 15px;
  color: #333;
}.head_time{
  font-size: 14px;
}
.mar_top{
  margin-top:50px;
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
  margin-top: 15px;
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
</style>
