<template>
  <div class="tab_home">
      <van-nav-bar
        :fixed="true"
        title="华商汇"
      />
    <div class="tal_class_searchBox">
      <van-search placeholder="点击前往搜索"
                  @click="$router.push({ name: 'search' })" />
      <div class="tal_class_searchMask"></div>
    </div>

    <div class="mar_top"></div>

    <van-swipe :autoplay="2000"
               indicator-color="white">
      <van-swipe-item v-for="(banner, index) in shopInfos.banner"
                      :key="index">
        <van-image
          width="100%"
          height="230px"
          fit="fit"
          @click="swiper(banner.type, banner.link)"
          :src="banner.url"
        />
      </van-swipe-item>
    </van-swipe>

    <div class="goods-channel">
      <div class="item"
           @click="changeTabbar(channel)"
           v-for="(channel, index) in shopInfos.channel"
           :key="index">
        <img :src="channel.iconUrl"
             background-size="cover" />
        <span>{{channel.name}}</span>
      </div>
    </div>

    <!-- <van-panel title="优惠券"
               style=" padding-bottom: 10px;">
      <div class="van-coupon-item"
           v-for="(coupon,index) in shopInfos.couponList"
           :key="index"
           @click="getCoupon(coupon.id)">
        <div class="van-coupon-item__content">
          <div class="van-coupon-item__head">
            <h2>
              <span>¥</span>
              {{coupon.discount}} 元
            </h2>
            <p>{{coupon.desc }} - {{coupon.tag}}</p>
          </div>
          <div class="van-coupon-item__body">
            <h2>{{coupon.name}}</h2>
            <p>有效期：{{coupon.days}} 天 <span class="minmoney">满{{coupon.min}}元可用</span></p>

          </div>
        </div>

      </div>
    </van-panel> -->

    <!-- 直播导图 -->
    <!-- <van-panel class="show">
        <div slot='header'>
          <van-cell-group>
            <van-cell title="人气直播推荐" isLink>
              <router-link to="/items/live" class="text-desc">更多直播</router-link>
            </van-cell>
          </van-cell-group>
        </div>
      <div class="show_div">
         <div class="show_img"><img src="../../assets/images/group1.png" alt=""></div>
         <div class="show_top">
           <div class="show_state"><span id="bac"><span id ="red">·</span>&nbsp;直播中</span></div>
           <div class="show_icon"><img src="../../assets/images/VIP.png" alt="">56203</div>
          </div>
         <div class="show_name">路虎揽胜运动而仅仅扥觉得预售...</div>
         <div class="show_info"><img src="../../assets/images/VIP.png" alt=""><span>进入直播间>></span></div>
      </div>

      <div class="show_div">
         <div class="show_img"><img src="../../assets/images/group1.png" alt=""></div>
         <div class="show_top">
           <div class="show_state"><span id="bac"><span id ="red">·</span>&nbsp;直播中</span></div>
           <div class="show_icon"><img src="../../assets/images/VIP.png" alt="">56203</div>
          </div>
         <div class="show_name">路虎揽胜运动预售...</div>
         <div class="show_info"><img src="../../assets/images/VIP.png" alt=""><span>进入直播间>></span></div>
      </div>

    </van-panel> -->
    <!-- <van-panel>
      <van-card 
                v-for="(grouponGood ,index) in shopInfos.grouponList"
                :key="index"
                tag="团购"
                :title="grouponGood.name"
                :desc="grouponGood.brief"
                :origin-price="'原价：'+grouponGood.retailPrice"
                :price="'团购价：'+ grouponGood.grouponPrice +'.00'"
                :thumb="grouponGood.picUrl"               
                @click="goMagDetail(grouponGood.id)"
                >
        <div slot="tags" class="card__tags">
         
        </div>
        <div slot="footer">
          <van-button size="mini" >{{grouponGood.grouponMember}}人成团</van-button>
          <van-button size="mini" type="danger">去参团</van-button>
        </div>
      </van-card>
      <div slot='header'>
        <van-cell-group>
          <van-cell title="团购专区" isLink>
            <router-link to="/items/groupon" class="text-desc">更多团购商品</router-link>
          </van-cell>
        </van-cell-group>
      </div>
    </van-panel> -->

    <!-- <van-panel>
      <van-grid clickable
                :column-num="2">
        <van-grid-item v-for="(brand ,index) in shopInfos.brandList"
                       :key="index"
                       :text="brand.name"
                       :url="goBrand(brand.id)">
          <img :src="brand.picUrl"
               style="width: 80%;" />
          
        </van-grid-item>
      </van-grid>
      <div slot='header'>
        <van-cell-group>
          <van-cell title="品牌商直供"
                    isLink>
            <router-link to="/items/brand-list"
                         class="text-desc">更多品牌商</router-link>
          </van-cell>
        </van-cell-group>
      </div>
    </van-panel> -->

    <van-panel>
      <van-row gutter>
        <van-col span="22" offset="1"
                 v-for="(newGood ,index) in shopInfos.newGoodsList"
                 :key="index">
          <router-link :to="{ path: `/items/detail/${newGood.id}`+'?indexBreak=5'}">
                <van-image
                  fit="fill"
                  width="100%"
                  height="150px"
                  :src="newGood.picUrl"
                />
          </router-link>
          <div class="goodPri">
            <span class="goodTitle">{{newGood.name}}</span>
            <span class="goodName">{{newGood.brief}} </span>
            <span class="goodPrice">￥ {{newGood.retailPrice}} <del class="oldPri"> ￥ {{newGood.counterPrice}}</del></span>
          </div>
        </van-col>
      </van-row>
      <div slot='header'>
        <van-cell-group>
          <van-cell title="新品首发"
                    isLink>
            <router-link to="/items/new"
                         class="text-desc">更多新品首发</router-link>
          </van-cell>
        </van-cell-group>
      </div>
    </van-panel>

    <van-panel>
      <van-row gutter>
        <van-col span="22" offset="1"
                 v-for="(groupGood ,index) in shopInfos.hotGoodsList"
                 :key="index">
          <router-link :to="{ path: `/items/detail/${groupGood.id}`+'?indexBreak=5'}">
                <van-image
                  fit="fill"
                  width="100%"
                  height="150px"
                  :src="groupGood.picUrl"
                />
          </router-link>
          <div class="goodPri">
            <span class="goodTitle">{{groupGood.name}}</span>
            <span class="goodName">{{groupGood.brief}} </span>
            <span class="goodPrice">￥ {{groupGood.retailPrice}} <del class="oldPri"> ￥ {{groupGood.counterPrice}}</del></span>
          </div>
        </van-col>
      </van-row>
      <div slot='header'>
        <van-cell-group>
          <van-cell title="人气专区"
                    isLink>
            <router-link to="/items/hot" class="text-desc">更多人气专区</router-link>
          </van-cell>
        </van-cell-group>
      </div>
    </van-panel>

    <!-- <van-panel>
        <van-card
            class="text_img"
            v-for="(groupGood, index) in shopInfos.hotGoodsList"
            :key="index"
            tag="推荐"
            :title="groupGood.name"
            :desc="groupGood.brief"
            :origin-price="groupGood.counterPrice"
            :price="groupGood.retailPrice +'.00'"
            :thumb="groupGood.picUrl"
            @click="goDetail(groupGood.id)"
            >
        </van-card>
      <div slot='header'>
        <van-cell-group>
          <van-cell title="人气专区"
                    isLink>
            <router-link to="/items/hot" class="text-desc">更多人气专区</router-link>
          </van-cell>
        </van-cell-group>
      </div>
    </van-panel> -->

    <!-- <van-panel>
      <van-grid clickable :column-num="2">
        <van-grid-item  v-for="(topic, index) in shopInfos.topicList"
                       :key="index"
                       :url="goTopic(topic.id)">
          <img :src="topic.picUrl" class="top_img" />
          <div style="font-size:14px;color:#ccc;" class="title"> {{ topic.title }}</div>
          <div style="font-size:10px;color:rgb(123, 116, 116);" class="subtitle"> {{ topic.subtitle }}</div>
        </van-grid-item>
      </van-grid>
      <div slot='header'>
        <van-cell-group>
          <van-cell title="公司简介" >
          
          </van-cell>
        </van-cell-group>
      </div>
    </van-panel> -->

  </div>
</template>

<script>
import { getHome, goodsCategory, couponReceive, login_wx, loginByGzh, gzhLogin } from '@/api/api';
import scrollFixed from '@/mixin/scroll-fixed';
import { setLocalStorage } from '@/utils/local-storage';
import _ from 'lodash';

import {
  List,
  Swipe,
  SwipeItem,
  Tabbar,
  TabbarItem,
  Search,
  Panel,
  CouponCell,
  CouponList,
  Toast,
  Card,
  Grid,
  GridItem,
  Row,
  Col,
  Tag,
  Image,
  Button,
  NavBar 
} from 'vant';
import { log } from 'util';
export default {
  mixins: [scrollFixed],

  data() {
    return {
      shopInfos: [],
      isLoading: false,
      userInfo:{}
    };
  },

  created() {
    this.getCode();//登录授权
    this.initViews();
  },

  methods: {

    //点击轮播图
    swiper(e,link){
      var that = this;
      if(e == 1){
        that.$router.push({
            name: 'manager_banner',
            params: {
              html:link,
            }
          })
      }
      if(e == 0){
          that.$router.push('items/detail/'+link+"?indexBreak=5");
      }
      if(e == 2){
        window.location.href = link;
      }
    },

     // 微信授权登录
    getCode(){
    //  var openid =  window.sessionStorage.getItem("openid");
    //  openid ="oyxi81afXUNUtlg1qkLpehg-aGiM"; //普通会员
       openid ="oyxi81SuILONCK6CNH0q7f5wk0sY"; //事业合伙人
     // openid ="oyxi81d93Sng5J8BBIozD8gqW_gM"; //华商会合伙人
   
      if(openid){
        //登录授权
        gzhLogin( {openid:openid}).then( res => {
          if(res.data.errno == 0){
             window.localStorage.setItem("Authorization", res.data.data.token);
             setLocalStorage({
                Authorization: res.data.data.token,
              });
              // 判断是否绑定手机 如果没有绑定手机 强制绑定  
              console.log(res.data.data.isBind == true);
           
              if(res.data.data.isBind == true){
                this.$router.push({name:'bindPhone'});
              }   
          }
        })
      }else{
        var code =  this.GetQueryString("code");  
        // sessionStorage.setItem("openid","oyxi81SuILONCK6CNH0q7f5wk0sY");
        // sessionStorage.setItem("openid","oyxi81afXUNUtlg1qkLpehg-aGiM");
        // var openId  = sessionStorage.getItem("openid");
        if(code != null){
          loginByGzh( {code:code} ).then( res =>{
            if(res.data.errno === 0){
              Toast(res.data.errmsg);
              this.userInfo = res.data.data.userInfo;
              
              setLocalStorage({
                avatar: this.userInfo.avatarUrl,
                nickName: this.userInfo.nickName
              });
            
              // sessionStorage.setItem("openid", this.userInfo.weixinOpenid);
              window.sessionStorage.setItem("openid", this.userInfo.weixinOpenid);
              //判断是否绑定手机 如果没有绑定手机 强制绑定  
              console.log(res.data.data.isBind == true);
              
              if(res.data.data.isBind == true){
                this.$router.push({name:'bindPhone'});
              }      
              window.localStorage.setItem("Authorization", res.data.data.token);
              setLocalStorage({
                Authorization: res.data.data.token,
              });

            }else{
              // Toast('服务器发生错误！');
              return false;
            }
          }).catch( res => {
            
            Toast.file(res.data.errmsg)
          })
        }
      }
    },

    // 获取 code的方法
    GetQueryString(name){
        var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
        var r = window.location.search.substr(1).match(reg);
        if(r!=null)return unescape(r[2]); return null;
    },


    goDetail(id) {
      //this.$router.push({name:'detail',params:{itemId:id }});
      this.$router.push(`/items/detail/${id}`+'?indexBreak=5');
    },
    goMagDetail(id){
      //alert(id)
      this.$router.push('manager/magDetail?itemId='+id);
    },
    goBrand(id) {
      return `#/items/brand/${id}`;
    },
    goTopic(id) {
      return `#/items/topic/${id}`;
    },   
    getCoupon(id) {
      couponReceive({ couponId: id }).then(res => {
        if(res.data.errno == 0){
          Toast.success(res.data.errmsg);
        }
      }).catch( res =>{
        if(res.data.errno == 740){
          Toast.fail(res.data.errmsg);
        }

        
      });
    },
    changeTabbar(o) {
      goodsCategory({ id: o.id }).then(res => {
        let categoryId = res.data.data.currentCategory.id;
        this.$router.replace({
          name: 'category',
          query: { itemClass: categoryId }
        });
      });
    },
    initViews() {
      getHome().then(res => {
        this.shopInfos = res.data.data;
        // console.log(this.shopInfos.newGoodsList);
        
      });
    }
  },

  components: {
    [Row.name]: Row,
    [NavBar.name]:NavBar,
    [Col.name]: Col,
    [Card.name]: Card,
    [Toast.name]: Toast,
    [CouponCell.name]: CouponCell,
    [CouponList.name]: CouponList,
    [Search.name]: Search,
    [Panel.name]: Panel,
    [List.name]: List,
    [Swipe.name]: Swipe,
    [SwipeItem.name]: SwipeItem,
    [Tabbar.name]: Tabbar,
    [TabbarItem.name]: TabbarItem,
    [Tag.name]: Tag,
    [Button.name]: Button,
    [Image.name]: Image ,
    [Grid.name]: Grid,
    [GridItem.name]: GridItem
  }
};
</script>


<style lang="scss" scoped>

.subtitle{
  width: 100%;
  height: 50px;
  // border:1px solid yellow;
  // overflow: hidden;
  display: -webkit-box; 
  display: -moz-box;  
  white-space: pre-wrap; 
  word-wrap: break-word;
  overflow: hidden; 
  text-overflow: ellipsis; 
  -webkit-box-orient: vertical; 
  -webkit-line-clamp:3;   /*显示行数*/
}
.title{
  width: 100%;
  height:20px;
  text-align: center;
  // border:1px solid red;
  overflow: hidden; 
  white-space: nowrap; 
  text-overflow: ellipsis;
}
.top_img{
  margin-top:0px;
  // border:1px solid red;
  width: 100%; 
  height: 150px;
  float: left;
}

#red{
  color: red;
  font-weight: 900px;
}
.show_icon{
  color: #333;
  font-size: 13px;
  text-align: right;
  padding-right: 5px;
  line-height: 23px;
}
.show_icon img{
  width: 15px;
  height: 15px;
  margin-right: 5px;
}
#bac{
  color: #fff;
  padding-left: 10px;
  padding-right: 10px;
  border-radius: 10px;
  padding-bottom: 1px;
  font-size: 13px;
  background-color:rgba(10, 10, 10, 0.4);
}
.show_icon{
  width: 50%;
  float: left;
}
.show_state{
 
  float: left;
  width: 50%;
}
.show_top{
  height: 23px;
}
.show_info span{  
  font-size: 13px;
  color: #005AFF;
  line-height: 2px;
  margin-left: 5px;
}
.show_info img{
  width: 20px;
  height: 20px;
}
.show_name{
  
  width: 100%;
  font-size: 14px;
  color: #333;
  overflow: hidden;
  height: 23px;
}
.show_div{
  width: 50%;
  
  height: 200px;
  float: left;
  padding-left: 10px;
  padding-right: 10px;
}
.show_img{
 
  text-align: center;
};
.show_img img{
  width: 100%;
  height: 120px;
  
}
.show{
  width: 100%;
  height: 250px;
  
}
.minmoney{
  color: #f44;
  font-size: 15px;
  margin-left: 10px;
}
.tal_class_searchBox{
  // border:1px solid green;
  position: fixed;
  top:45px;
  opacity:0.8;
  z-index: 99999;
  width: 100%;
}
.mar_top{
  margin-top:100px;
}
// 商品详情页面
.box{
  width: 100%;
  margin-top:5px;
  // border-bottom:1px solid #ccc;
  border-top:1px solid #ccc;
  height:120px;
  padding: 0 20px;
  .left{
    width: 36%;
    // border:1px solid #ccc;
    // border:1px solid yellow;
    float: left;
    height:120px;
  }
  .right{
    // border:1px solid red;
    width: 60%;
    float:right;
    height:120px;
  }
}
.price_mar{
  display: inline-block;
  margin-bottom: 10px;
  color:red;
}
.title1{
  font-size:13px;
  color:#333333;
  margin-top:0px;
  margin-bottom:10px;
  width: 100%;
  height: 20px;
  overflow: hidden;
  // border:1px solid #ccc;
}
.cantuan{
  margin-left: 10px;
}
// 人气推挤
.goodPri{
  width: 100%;
  height: 50px;
  margin-bottom: 10px;
}
.goodTitle{
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  width: 100%;
  float: left;
  height: 25px;
  color: #333333;
}
.goodName{
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  width: 50%;
  height: 25px;
  color: #A5A5A5;
  float: right;
  text-align: right;
  padding-right:10px;
}
.oldPri{
  color: #A5A5A5;
}
.goodPrice{
  width: 48%;
  height: 25px;
  float: left;
  // padding-left: 80px;
  // position: relative;
  // bottom: 10px; 
  color:#f44
}
// 商品详情页面 end

.interval_bot {
  margin-bottom: 10px;
}
.van-panel {
  margin-top: 20px;
}
.goods-channel {
  background: #fff;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  padding-bottom: 0px;
  padding-bottom: 25px;
  padding-top: 15px;
}

.goods-channel .item {
  width: 80px;
  height: 80px;
  margin-left: 10px;
 
}

.goods-channel img {
  display: block;
  width: 60px;
  height: 60px;
  margin: 0 auto;
}

.goods-channel span {
  display: block;
  font-size: 15px;
  text-align: center;
  margin-top: 5px;
  margin-bottom: 10px;
  color: #333;
}
.van-coupon-cell--selected {
  color: #323233;
}
.van-coupon-list {
  height: 100%;
  position: relative;
  background-color: #f8f8f8;
}
.van-coupon-list__field {
  padding: 7px 15px;
}
.van-coupon-list__exchange {
  height: 32px;
  line-height: 30px;
}
.van-coupon-list__list {
  overflow-y: auto;
  padding: 15px 0;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  -webkit-overflow-scrolling: touch;
}
.van-coupon-list__close {
  left: 0;
  bottom: 0;
  position: absolute;
  font-weight: 500;
}
.van-coupon-list__empty {
  padding-top: 100px;
  text-align: center;
}
.van-coupon-list__empty p {
  color: #969799;
  margin: 15px 0;
  font-size: 14px;
  line-height: 20px;
}
.van-coupon-list__empty img {
  width: 80px;
  height: 84px;
}
.van-coupon-item {
  overflow: hidden;
  border-radius: 4px;
  margin: 0 15px 15px;
  background-color: #fff;
  -webkit-box-shadow: 0 0 4px rgba(0, 0, 0, 0.1);
  box-shadow: 0 0 4px rgba(0, 0, 0, 0.1);
}
.van-coupon-item:active {
  background-color: #e8e8e8;
}
.van-coupon-item__content {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  height: 100px;
  padding: 24px 0 0 15px;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
 
}
.van-coupon-item h2,
.van-coupon-item p {
  margin: 0;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.van-coupon-item h2 {
  height: 34px;
  font-weight: 500;
  line-height: 34px;
}
.van-coupon-item p {
  font-size: 12px;
  line-height: 16px;
  color: #969799;
}
.van-coupon-item__head {
  min-width: 90px;
}
.van-coupon-item__head h2 {
  color: #f44;
  font-size: 24px;
}
.van-coupon-item__head h2 span {
  font-size: 50%;
}
.van-coupon-item__body {
  -webkit-box-flex: 1;
  -ms-flex: 1;
  flex: 1;
  position: relative;
  border-radius: 0 4px 4px 0;
}
.van-coupon-item__body h2 {
  font-size: 16px;
}
.van-coupon-item__corner {
  top: 16px;
  right: 15px;
  position: absolute;
}
.van-coupon-item__corner .van-icon {
  border-color: #f44;
  background-color: #f44;
}
.van-coupon-item__reason {
  padding: 7px 15px;
  border-top: 1px dashed #ebedf0;
  background-color: #fafafa;
}
.van-coupon-item--disabled:active {
  background-color: #fff;
}
.van-coupon-item--disabled .van-coupon-item__content {
  height: 90px;
}
.van-coupon-item--disabled h2,
.van-coupon-item--disabled p,
.van-coupon-item--disabled span {
  color: #969799;
}
</style>
