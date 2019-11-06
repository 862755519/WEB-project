<template>
  <div class="container">
    <van-nav-bar title="提现记录"  left-arrow @click-left="onClickLeft" >
      <van-icon color="#333" name="arrow-left" slot="left" />
    </van-nav-bar>
    <div class="time" @click="slectTime">{{this.selectTime}}</div>
    <van-tabs type="card" background="#ffffff" id="list" color="#db3d3c">
      <van-tab title="未提现">

        <van-list
          v-model="loading1"
          :finished="finished1"
          finished-text="没有更多了"
          @load="load1"
        >
        <div v-for="item1 in list1" :key="item1">
          <div class="card">
            <div class="card_row">
              <div class="row_left title1">申请提现</div>
              <div class="row_right money">+{{item1.caMoney}}</div>
            </div>
            <div class="card_row">
              <div class="row_left title2">申请时间</div>
              <div class="row_right text">{{item1.addTime}}</div>
            </div>
            <div class="card_row">
              <div class="row_left title2">提现状态</div>
              <div class="row_right text">{{item1.caReason}}</div>
            </div>
          </div>
        </div>
        </van-list>

      </van-tab>
      <van-tab title="已提现">
        <van-list
  v-model="loading2"
  :finished="finished2"
  finished-text="没有更多了"
  @load="load2"
>
        <div v-for="item2 in list2" :key="item2">
          <div class="card">
            <div class="card_row">
              <div class="row_left title1">申请提现</div>
              <div class="row_right money">+{{item2.caMoney}}</div>
            </div>
            <div class="card_row">
              <div class="row_left title2">申请时间</div>
              <div class="row_right text">{{item2.addTime}}</div>
            </div>
            <div class="card_row">
              <div class="row_left title2">提现状态</div>
              <div class="row_right text">{{item2.caReason}}</div>
            </div>
          </div>
        </div>
        </van-list>
      </van-tab>
    </van-tabs>

    <!-- 弹出层，选择时间 -->
    <van-popup v-model="popup_show" position="bottom" :style="{ height: '40%' }">
      <van-datetime-picker
        v-model="currentDate"
        type="date"
        :min-date="minDate"
        :formatter="formatter"
        title="选择时间"
        @confirm="confirm"
        @cancel="cancel"
      />
    </van-popup>
  </div>
</template>
<script>
import { findDraw } from '@/api/api';
import Vue from 'vue';
import {
  Cell,
  CellGroup,
  Collapse,
  CollapseItem,
  Tab,
  Tabs,
  Popup,
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
      //选择时间弹出层
      currentDate: new Date(),
      minDate: new Date(1900, 10, 1),
      maxDate: new Date(2219, 10, 1),
      popup_show: false,
      selectTime: '',
      loading1: false,
      finished1: false,
       loading2: false,
      finished2: false,
      form1: {
        page: 0,
        limit: 10,
        level: '1',
        time: ''
      },
       form2: {
        page: 0,
        limit: 10,
        level: '2',
        time: ''
      },
      list1: [],
      list2: []
    };
  },
  created() {
    
    var myDate = new Date();
    this.selectTime = myDate.toLocaleDateString();
    // this.selectTime = myDate.toLocaleString(); 
  },
  methods: {
    //导航返回
    onClickLeft() {
      this.$router.go(-1);
    },
    //时间格式化
    formatter(type, value) {
      if (type === 'year') {
        return `${value}年`;
      } else if (type === 'month') {
        return `${value}月`;
      } else if (type === 'day') {
        return `${value}日`;
      }
      return value;
    },
    //选择时间
    slectTime() {
      this.popup_show = true;
    },
    //点击确认时间按钮事件
    confirm() {
      var date = this.currentDate;
      console.log(date);
      var year = date.getFullYear();
      var month = date.getMonth() + 1;
      var day = date.getDate();
      var week = date.getDay();
      var str = '' + year + '-' + month + '-' + day;
      this.selectTime = str;
      this.popup_show = false;
      this.form1.time = str;
      this.form2.time = str;
      this.list1 = [];
      this.list2 = [];
      this.form1.page = 0;
      this.form2.page = 0;
      this.getDraw1();
      this.getDraw2();
    },
    //点击取消按钮事件
    cancel() {
      this.popup_show = false;
    },
    // 未提现 上拉加载
    load1(){
      this.getDraw1();
    },
    // 已提现 上拉加载
    load2(){
      this.getDraw2();
    },
    //获取未打款记录
    getDraw1() {
      this.form1.page ++;
      findDraw(this.form1).then(res => {
         this.list1.push(...res.data.data.list);
         this.loading1 = false;
          if(res.data.data.list.length == 0){
            this.finished1 = true;
          }
          if(res.data.data.list.length < this.form1.limit){
          this.finished1 = true;
          return
        }
      });
    },
     //获取未打款记录
    getDraw2() {
      this.form2.page ++;
      console.log(this.form2);
      findDraw(this.form2).then(res => {
         this.list2.push(...res.data.data.list);
         this.loading2 = false;
           if(res.data.data.list.length == 0){
            this.finished2 = true;
          }
          if(res.data.data.list.length < this.form2.limit){
          this.finished2 = true;
          return
        }
      });
    }
    
  }
};
</script>
<style scoped>
.text {
  color: #7b7b7b;
  font-size: 14px;
}
.title2 {
  color: #7b7b7b;
  font-size: 15px;
}
.money {
  color: #db3d3c;
  font-size: 20px;
}
.title1 {
  font-size: 15px;
  color: #252525;
}
.row_left {
  width: 30%;
  height: 25px;

  float: left;
  text-align: left;
}
.row_right {
  width: 68%;
  height: 25px;

  float: left;
  text-align: right;
}
.card_row {
  width: 95%;
  height: 26px;
  margin: auto;
  padding: 0px;
  margin-top: 10px;
}

.card {
  width: 100%;
  height: 130px;
  border: 1px solid #c6c6c6;
  padding: 0px;
  margin-top: 20px;
  border-radius: 5px;
  -moz-box-shadow: 2px 2px 10px #c6c6c6;
  -webkit-box-shadow: 2px 2px 10px #c6c6c6;
  box-shadow: 2px 2px 10px #c6c6c6;
  background: #ffffff;
}
.time {
  margin-top:50px;
  width: 100%;
  height: 30px;
  text-align: center;
  line-height: 30px;
  font-size: 18px;
  margin-top: 10px;
}
#list {
  width: 90%;
  margin: auto;
}
</style>


