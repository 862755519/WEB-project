<template>
  <div class="container">
    <van-nav-bar
      title="邀请好友"
      left-text="返回"
      left-arrow
      @click-left="onClickLeft"
    />
    <div class="down">
        <div class="down_img">
          <img src="../../../assets/images/shop1.jpg" alt="">
        </div>
        <p class="down_name">家居广场</p>
        <div class="button"><a :href="link">立刻下载</a></div>
    </div>
  </div>
</template>
<script>
import QRCode from "qrcodejs2";
import {getShare} from '@/api/api';
import Vue from "vue";
import { Cell, CellGroup } from "vant";

import {
  Swipe,
  SwipeItem,
  Button,
  NavBar,
  NoticeBar,
  List,
  Tag,
  Tabbar,
  TabbarItem,
   Tab, Tabs,Row, Col,
} from "vant";
import { log } from 'util';
Vue.use(Cell).use(CellGroup);
export default {
  // 引入的组件
  components: {
    [Row.name]:Row,
    [Col.name]:Col,
    [Tab.name]:Tab,
    [Tabs.name]:Tabs,
    [NavBar.name]: NavBar,
    [Swipe.name]: Swipe,
    [SwipeItem.name]: SwipeItem,
    [NoticeBar.name]: NoticeBar,
    [List.name]: List,
    [Tag.name]: Tag,
    [Tabbar.name]: Tabbar,
    [TabbarItem.name]: TabbarItem,
    [QRCode.name]:QRCode
  },
  data() {
    return{
      active:0,
      android:"",
      ios:"",
      code:"",
      link:"http://www.baidu.com",
    }
  },
   
 created(){
    this.getShareInfo();
 },
  
  methods: {
    //导航返回
    onClickLeft() {
      this.$router.go(-1);
    },
    //获取二维码信息
    getShareInfo(){
       getShare().then(res => {
        console.log(res);
        console.log(res.data.data);
        this.android = res.data.data.list.toAndroidUrl;
        this.ios = res.data.data.list.toIso;
        this.code = res.data.data.code;
        this.getApptype();
      });
    },

    //检测手机系统
    getApptype() {
        let ua = navigator.userAgent.toLowerCase();
       if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) {
        this.link = this.ios;
        alert("ios")
       } else if (/(Android)/i.test(navigator.userAgent)) {
        this.link = this.android;
        alert("android")
       }
  },
 
  }
};
</script>
<style scoped>
.container{
  margin:0;
}
.down{
    width: 100%;
    height: 640px;
    background-image: url("../../../assets/images/down.png");
    background-size: cover;
    padding-top:60px;
    /* border: 1px solid green; */
}
.down_img img{
   width: 70px;
   height: 70px;
   border-radius: 13px;
}
.down_img{
   
   text-align: center;
   /* margin-top: 50px; */
}
.down_name{
  font-size: 25px;
  color: #fff;
  text-align: center;
  margin-top: 10px;
}
.button{
  width: 80%;
  height: 45px;
  border: 1px solid #333;
  line-height: 45px;
  text-align: center;
  background: #fff;
  border: 1px solid #fff;
  margin: auto;
  border-radius: 5px;
  margin-top: 340px;
}
.button a{
  font-size: 20px;
  color: #FF5E24;
}
</style>

