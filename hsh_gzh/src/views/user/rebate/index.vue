<template>
  <div class="container">
    <van-nav-bar title="返利明细" :fixed="true" left-arrow @click-left="onClickLeft" >
      <van-icon color="#333" name="arrow-left" slot="left" />
    </van-nav-bar>
   <div class="today">
      <p class="today_p1">&nbsp;&nbsp;</p>
      <p class="today_p2" @click="slectTime">{{select_time}}</p>
   </div>

    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="load"
    >
      <div v-for="(item,value) in list" :key="value" class="box" >
        <div class="rebate">
            <div class="rebate_left">
                <img src="../../../assets/images/blue.png" alt="">
            </div>
            <div class="rebate_right">
                <div class="text">
                    <p class="text_p1">{{item.rrDetali}}</p>
                    <p class="text_p1">{{item.mobile}} 佣金</p>
                    <!-- <p v-if="item.rrType == 0" class="text_p2">回馈积分</p>
                    <p v-if="item.rrType == 1" class="text_p2">注册积分</p>
                    <p v-if="item.rrType == 2" class="text_p2">购物积分</p> -->
                    <p class="text_p3">{{item.addTime}}</p>
                </div>
                <div class="money">+{{item.rrPrice}}</div>
                <!-- <div class="money">+{{item.mobile}}</div> -->
            </div>
        </div>
      </div>

      
    </van-list>
    
    <!-- 弹出层，选择时间 -->
    <van-popup v-model="time_show" position="bottom" :style="{ height: '40%' }">
        <van-datetime-picker
         v-model="currentDate"
         type="date"
         :min-date="minDate"
         :formatter="formatter"
         title="选择时间"
         @confirm = "confirm"
         @cancel = "cancel"
    />
    </van-popup>

  </div>
</template>
<script>
import {getRebateDetail} from '@/api/api';
import Vue from "vue";
import { Cell, CellGroup,DatetimePicker  } from "vant";

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
  Popup 
} from "vant";
Vue.use(Cell).use(CellGroup);
export default {
  // 引入的组件
  components: {
    [NavBar.name]: NavBar,
    [Swipe.name]: Swipe,
    [SwipeItem.name]: SwipeItem,
    [NoticeBar.name]: NoticeBar,
    [List.name]: List,
    [Tag.name]: Tag,
    [Tabbar.name]: Tabbar,
    [TabbarItem.name]: TabbarItem,
    [Popup.name]:Popup,
    [DatetimePicker.name]:DatetimePicker 
  },
  data() {
    
    return {
        time_show:false,
        currentDate: new Date(),
        minDate: new Date(1900,10,1),
        maxDate: new Date(2219, 10, 1),
        select_time:"2019-1-1",
     
        list:[],
        loading: false,
        finished: false,
        rebate:{
            page: 0,
            limit: 10,
            addTime: '',     
        }
    };
  },
  created() {
     var myDate = new Date();
     let newTime = myDate.toLocaleDateString(); 
     this.select_time = newTime;        //获取日期与时间
  },
  methods: {
    // 上拉加载
    load(){
      this.getHotList();
    },
    //数据列表
     getHotList() {
      this.rebate.page++;
      getRebateDetail(
       this.rebate
      ).then(res => {
        let len = res.data.data.list.lenght
        this.list.push(...res.data.data.list);
        
        if(parseInt(len) > 0){
          this.loading = false;
          this.finished = false;
        }else{
          this.loading = false;
          this.finished = true;
        }
        
        // this.finished = res.data.data.page >= res.data.data.pages;
      });
    },

     //获取返利信息列表
    // getRebateinfo(){
    //     findRebate(this.rebate).then(res => {
    //     console.log(res);
    //     console.log(res.data.data);
    //     this.list = res.data.data.list;
    //     console.log(res.data.data.list);
    //   });
    // }
    
    
    //导航返回
    onClickLeft() {
      this.$router.go(-1);
    },

     //时间格式化
    formatter(type, value) {
      if (type === 'year') {
        return `${value}年`;
      } else if (type === 'month') {
        return `${value}月`
      } else if (type === 'day'){
        return `${value}日`
      }
      return value;
    },
    //选择时间
    slectTime(){
        this.time_show = true;
    },
    //点击确认时间按钮事件
    confirm(e){
        var date = e;
        console.log(date);
        var year = date.getFullYear();
        var month = date.getMonth()+1;
        var day = date.getDate();
        var week = date.getDay();
        var time = year + "-" + month + "-"+day;
        console.log("选择时间为："+time);
        this.select_time = time;
        this.time_show = false;
        this.rebate.addTime = time;
        this.list = [];
        this.rebate.page = 0;
        this.getHotList();    
    },
    //点击取消按钮事件
    cancel(){
        this.time_show = false;
    },
  }
};
</script>
<style scoped>
.container{
    background: #ffffff;
}
.text{
  width: 65%;
  height: 120px;
  float: left;
}
.text_p1{
  font-size: 16px;
  color: #333333;
  text-align: left;
  line-height: 15px;
   padding-left: 10px;
}
.text_p2{
  color: #666666;
  font-size: 14px;
  text-align: left;
  line-height: 15px;
   padding-left: 10px;
}
.text_p3{
  color: #999999;
  font-size: 14px;
  text-align: left;
  line-height: 15px;
  padding-left: 10px;
}
.money{
  width:30%;
  height: 100px;
  float: left;
 
  font-size: 20px;
  color: #db3d3c;
  line-height: 100px;
}
.box{
  /* border: 1px solid green; */
  height: 140px;
  width: 100%;
  height:140px;
}
.rebate{
    width: 90%;
    height: 120px;
   border: 1px solid #ccc;
   border-radius: 5px;
    margin: 5px auto;
    padding:0px;
}
.rebate_left{
  width: 20%;
  height: 120px;
  text-align: center;
  line-height: 120px;
  
  float: left;
  padding: 0px;
}
.rebate_right{
  width: 78%;
  height: 120px;
  /* border-bottom: 1px solid #DADADA; */
  float: left;
}
.rebate_left img{
  width: 36px;
  height: 36px;
}
.today{
    margin-top:50px;
    width: 100%;
    height: 40px;
    border-bottom: 1px solid #DADADA;
}
.today_p1{
    width: 50%;
    height: 30px;
    font-size: 13px;
    color: #333333;
    float: left;
   line-height: 30px;
   text-align: center;
}
.today_p2{
    width: 50%;
    height: 30px;
    font-size: 13px;
    color: #333333;
    float: left;
    text-align: center;
    padding-right: 13px;
    line-height: 30px;

}

</style>

