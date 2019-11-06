<template>
  <div class="container">
    <van-nav-bar title="我的银行卡" :fixed="true" left-arrow @click-left="onClickLeft" >
      <van-icon color="#333" name="arrow-left" slot="left" />
    </van-nav-bar>
    <div class="mar_top">
      <div  v-for="(item,value) in banklist" :key="value">
        <div class="card" v-bind:style="{backgroundImage:'url(' + item.cardBg + ')'}">
          <div class="card_row1">
            <div class="type_name">银行卡类型</div>
            <div class="bank_name">
              <img class="bank_img" :src="item.cardIcon" alt />
              <span style="margin-left: 10px;">{{item.cardName}}</span>
            </div>
          </div>
          <div class="update" @click="updateBank(item.id)">
            <img src="../../../assets/images/update1.png" alt />
          </div>

          <div class="card_row1">
            <div class="type_name" id="type">储蓄卡</div>
            <div class="bank_name" id="num">{{item.id}}/10</div>
          </div>
          <div class="card_code">卡号:{{item.bcdNum}}</div>
        </div>
      </div>

      <div class="add_card">
        <button @click="$router.push({path: '/user/bind/bank'})">+添加银行卡</button>
      </div>
    </div>

    <!-- 确认信息弹出层 -->

  </div>
</template>
<script>
import Vue from 'vue';
import { getBank,updateCard } from '@/api/api';
import scrollFixed from '@/mixin/scroll-fixed';
import _ from 'lodash';
import {
  Dialog,
  Cell,
  CellGroup,
  Collapse,
  CollapseItem,
  Tab,
  Tabs,
  Popup
} from 'vant';

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
  DatetimePicker
} from 'vant';
import { log } from 'util';
Vue.use(Cell).use(CellGroup);
export default {
  // 引入的组件
  components: {
    [Dialog.name]: Dialog,
    [DatetimePicker.name]: DatetimePicker,
    [Popup.name]: Popup,
    [Tab.name]: Tab,
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
    [TabbarItem.name]: TabbarItem
  },
  data() {
    return {
      banklist: [],
      isRouterAlive: true,
    };
  },
  created() {
     this.getBankInfo();
  },

  activated() {
    // this.getBankInfo();
  },

  methods: {
   
    //导航返回
    onClickLeft() {
      this.$router.go(-1);
    },
    getBankInfo() {
     
      getBank().then(res => {
        console.log(res.data.data);
        this.banklist = res.data.data.list;
        console.log(banklist[0].bcdNum);
      });
    },

    //点击删除银行卡按钮
    updateBank(e) {
      let bankid = e;
      this.$dialog.alert({
         title: "解除绑定", //加上标题
         message: "确认解除此张银行卡绑定吗", //改变弹出框的内容
         showCancelButton: true, //展示确定按钮按钮
})
.then(() => { //点击确认按钮后的调用
         console.log("点击了确认按钮噢");
          updateCard({id:bankid}).then(res => {  
          // this.$router.go(0);
          this.getBankInfo();
      }); 

})
.catch(() => { //点击取消按钮后的调用
         console.log("点击了取消按钮噢");
         return;
})
      
    }
  }
};
</script>
<style scoped>
.mar_top{
  margin-top:50px;
}
.update {
  width: 25px;
  height: 25px;
  position: absolute;
  left: 90%;
  top: 13px;
}
.update img {
  width: 25px;
  height: 25px;
}
.bank_img {
  width: 26px;
  height: 26px;
  background: #fff;
  border-radius: 13px;
  border: 1px solid #fff;
}
.add_card {
  width: 100%;
  height: 50px;
  text-align: center;
  margin-top: 30px;
}
.add_card button {
  width: 90%;
  height: 45px;
  border: 1px solid #db3d3c;
  color: #db3d3c;
  font-size: 20px;
  background: #fff;
  border-radius: 25px;
}
.card_code {
  width: 100%;
  height: 60px;
  line-height: 60px;
  padding-left: 20px;
  text-align: left;
}
#num {
  font-size: 16px;
}
#type {
  font-size: 30px;
}
.type_name {
  float: left;
  height: 45px;
  width: 37%;
  line-height: 45px;
  font-size: 13px;
  padding-left: 20px;
  text-align: left;
}
.bank_name {
  float: left;
  height: 45px;
  width: 53%;
  line-height: 45px;
  padding-right: 10px;
  display: flex;

  align-items: center;
  justify-content: center;
}
.card_row1 {
  width: 100%;
  height: 45px;
  margin-top: 5px;
}
.card {
  width: 95%;
  height: 180px;
  margin: 10px auto;
  position: relative;
  background-size: cover;
  color: #fff;
  padding-top: 10px;
  border-radius: 10px;
}
</style>


