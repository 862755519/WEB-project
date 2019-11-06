<template>
  <div class="container">
    <van-nav-bar title="我的抵扣券"  left-arrow @click-left="onClickLeft" >
      <van-icon color="#333" name="arrow-left" slot="left" />
    </van-nav-bar>
    <van-tabs v-model="active">
        <van-tab :title="total">
            <van-list
              v-model="loading1"
              :finished="finished1"
              finished-text="没有更多了"
              @load="onLoad1">
            <div class="cardInfo" v-for="(item,value) in list1" :key="value">
                <div class="bgimg"> 商城抵扣券</div>
                <div class="bginfo">
                    <div class="indstry">
                        <span class="indstry_title">用于抵扣商城指定商品，一张抵 扣券可抵扣一个商品  用于抵扣商城指定商品，一张用于抵扣商城指定商品，一张用于抵扣商城指定商品，一张用于抵扣商城指定商品，一张 </span>
                    </div>
                    <div class="offsetCode">
                        <span class="off_p" >抵扣码:{{item.cdCode}}</span>
                        <span class="copy" :data-clipboard-text="item.cdCode" @click="copy">复制</span>
                    </div>
                </div>
            </div>
            </van-list>
        </van-tab>

        <van-tab title="可赠送">
            <van-list
              v-model="loadingSend"
              :finished="finishedSend"
              finished-text="没有更多了"
              @load="onLoad2"
            >
            <div class="cardInfo" v-for="(item,value) in list2" :key="value">
                <div class="bgimg"> 商城抵扣券</div>
                <div class="bginfo">
                    <div class="indstry">
                        <span class="indstry_title">用于抵扣商城指定商品，一张抵 扣券可抵扣一个商品  用于抵扣商城指定商品，一张用于抵扣商城指定商品，一张用于抵扣商城指定商品，一张用于抵扣商城指定商品，一张 </span>
                    </div>
                    <div class="offsetCode">
                        <span class="off_p"  >抵扣码:{{item.cdCode}}</span>
                        <button class="copy" :data-clipboard-text="item.cdCode" @click="copy">复制</button>
                    </div>
                </div>
            </div>
            </van-list>
            <div class="btn">
                <div class="sss" @click="getCrateCoupon">+ 生成抵扣券</div>
            </div>
        </van-tab>
        <van-tab title="已使用">
              <van-list
                v-model="loadingOver"
                :finished="finishedOver"
                finished-text="没有更多了"
                @load="onLoad3">
                <div class="cardInfo" v-for="(item,value) in list3" :key="value">
                    <div class="bgimg" id="bgimg"> 商城抵扣券</div>
                    <div class="bginfo">
                        <div class="indstry">
                            <span class="indstry_title">用于抵扣商城指定商品，一张抵 扣券可抵扣一个商品  用于抵扣商城指定商品，一张用于抵扣商城指定商品，一张用于抵扣商城指定商品，一张用于抵扣商城指定商品，一张 </span>
                        </div>
                        <div class="offsetCode">
                            <span class="off_p"   id="off_p">抵扣码：{{item.cdCode}}</span>
                            <span class="copy" id="copy">已用</span>
                        </div>
                    </div>
                </div>
              </van-list>
        </van-tab>

    </van-tabs>
    
  </div>
</template>
<script>
import { getCouponList,createCoupon } from '@/api/api';
import Clipboard from 'clipboard';
import Vue from 'vue';
import {
  Cell,
  CellGroup,
  Collapse,
  CollapseItem,
  Tab,
  Tabs,
  Popup,
  Toast,
  Swipe,
  SwipeItem,
  Button,
  NavBar,
  NoticeBar,
  List,
  Tag,
  Image,
  Tabbar,
  TabbarItem,
  DatetimePicker
} from 'vant';
import { timingSafeEqual } from 'crypto';
import { log } from 'util';
Vue.use(Cell).use(CellGroup);
export default {
  // 引入的组件
  components: {
    [DatetimePicker.name]: DatetimePicker,
    [Popup.name]: Popup,
    [Tab.name]: Tab,
    [Tabs.name]: Tabs,
    [Image.name]: Image,
    [Collapse.name]: Collapse,
    [CollapseItem.name]: CollapseItem,
    [NavBar.name]: NavBar,
    [Swipe.name]: Swipe,
    [SwipeItem.name]: SwipeItem,
    [NoticeBar.name]: NoticeBar,
    [List.name]: List,
    [Tag.name]: Tag,
    [Tabbar.name]: Tabbar,
    [TabbarItem.name]: TabbarItem
  },
  data() {
    return {
        loading1: false,
        finished1: false,
        finishedSend: false,
        loadingSend: false,
        finishedOver: false,
        loadingOver:false,
        active:0,
        list1:[],//未使用优惠券
        list2:[],//以使用优惠券
        list3:[],
        param1:{
          limit:10,
          page:0,
          state:0
        },//请求参数1
        param2:{
          limit:10,
          page:0,
          state:3
        },//请求参数2
        param3:{
          limit:10,
          page:0,
          state:1
        },//请求参数2
        total:0,
    };
  },
  created() {
  
  },
  methods: {
    //导航返回
    onClickLeft() {
      this.$router.go(-1);
    },

    // 获取可赠送抵扣券的列表
    getCoupon(){
      // alert(this.param2.page)
      this.param2.page = 1;
      // alert(this.param2.page)
      getCouponList(this.param2).then(res => {
        this.list2 = res.data.data.list;  
      }).catch(res =>{ 
        this.loadingSend = false;
      });
    },

    //上拉加载1
     onLoad2() {
        this.param2.page++;
      getCouponList(this.param2).then(res => {
        console.log(res.data.data.list);
        this.list2.push(...res.data.data.list);
        if(res.data.data.list.length == 0 ){
             this.finishedSend = true;
             this.loadingSend = false;
        }else{
             this.loadingSend = false;
        }
      }).catch(res =>{ 
           this.loadingSend = false;
      });
     },
      copy() {
        var clipboard = new Clipboard('.copy');
        clipboard.on('success', e => {
          Toast('复制成功')
          // 释放内存
          clipboard.destroy()
        })
        clipboard.on('errorerror', e => {
          // 不支持复制
          console.log('该浏览器不支持自动复制')
            Toast('不支持复制')
          // 释放内存
          clipboard.destroy()
        })
      },
     onLoad1() {
        this.loading1 = true;
        this.param1.page++;
      getCouponList(this.param1).then(res => {
        this.list1.push(...res.data.data.list);
        this.total = res.data.data.total;
        this.total = "未使用 ("+this.total+")";
        if(res.data.data.list.length == 0){
          this.finished1= true
          this.loading1 = false;
        }else{
           this.loading1 = false;
        }
      }).catch(res =>{
          this.loading1 = false;
      });
     },
    //上拉刷新1
     onLoad3() {
       this.param3.page++;
        getCouponList(this.param3).then(res => {
        console.log(res.data.data.list);
        this.list3.push(...res.data.data.list);
        if(res.data.data.list.length == 0 ){
             this.finishedOver = true;
             this.loadingOver = false;
        }else{
             this.loadingOver = false;
        }
        
      }).catch(res =>{
            
           this.loadingOver = false;
      });
     },
     //生成抵扣券
     getCrateCoupon(){
       var that = this;
        createCoupon().then(res =>{
           Toast(res.data.errmsg)
           that.getCoupon();
        }).catch(res => {
          // console.log(res.data.errmsg);
           Toast(res.data.errmsg)
        })

        
     }
  }
};
</script>
<style scoped>
.cardInfo{
    margin:10px auto;
    width: 96%;
    height: 100px;
    /* border:1px solid red; */
    background-color: #fff;
    /* border: 1px solid red; */
}
.bgimg{
    width: 30%;
    height: 100px;
    padding: 10px;
    font-size: 20px;
    justify-content: center;
    text-align: center;
    color: #fff;
    float: left;
    border:1px solid #ccc;
    background-color: #0088FF;
    overflow: hidden;

    text-overflow: -o-ellipsis-lastline;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
}
#bgimg{
    background-color: #ccc;
}
.bginfo{
    width: 68%;
    /* padding: 10px; */
  float: right;
}
.btn{
    width: 100%;
    height: 40px;
    position: fixed;
    bottom:10px;   
    padding: 0 30px; 
    
    /* margin: auto; */
}
.sss{
    line-height: 40px;
    border:1px solid  #309EFF;
    color: #309EFF;
    text-align: center;
    border-radius: 20px;
    text-align: center;
    background: #fff;
}

.offsetCode{
    margin-top:2px;
    width: 100%;
    height: 30px;
    /* border:1px solid #2E9EFF; */
}
.off_p{
    color: #999999;
    margin:0;
    float: left;
    width: 75%;
    /* border:1px solid green; */
    overflow:hidden;
    text-overflow:ellipsis;
    white-space: nowrap;
}
#off_p{
  
  width: 75%;
  overflow:hidden;
  text-overflow:ellipsis;
  white-space: nowrap;
}
.copy{
    border:1px solid #2E9EFF;
    color: #2E9EFF; 
    background-color: #fff;
    float: right;
    width: 25%;
    text-align: center;
    /* margin-right:10px; */
}
#copy{
    border:1px solid #ccc;
    color: #ccc; 
    width: 25%;
}
.indstry{
    border-bottom:1px solid #ccc;
    height: 66px;
    padding:6px;
    margin-top:5px;

    text-overflow: -o-ellipsis-lastline;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
}




</style>


