<template>
  <div class="container">
    <van-nav-bar title="推广中心" :fixed="true" left-arrow @click-left="onClickLeft">
        <van-icon color="#333" name="arrow-left" slot="left" />
    </van-nav-bar>

    <div class="money">
        <div class="sum">
            <p class="sum_p1">全部收益</p>
            <p class="sum_p2">{{monthsum}}</p>
        </div>
        <div class="money_but">
            <button @click="$router.push({path: '/user/withdraw'})">申请提现</button>
        </div>
    </div>
     <div class="rebate">
         <div class="rebate_text">
             <p class="rebate_p">昨日收益</p>
             <p class="rebate_p">{{yesterday}}</p>
         </div>
         <div class="rebate_text">
             <p class="rebate_p">今日收益</p>
             <p class="rebate_p">{{today}}</p>
         </div>
         <div class="rebate_text">
             <p class="rebate_p">本月收益</p>
             <p class="rebate_p">{{month}}</p>
         </div>
     </div>
     <div class="line"></div>

     <div class="menu" @click="$router.push({path: '/user/record'})">
         <div class="icon"><img src="../../../assets/images/icon1.png" alt=""></div>
         <div class="menu_text">提现记录</div>
         <div class="icon_left"><van-icon class="vicon" name="arrow" /></div>
         <!-- <div class="icon_left"><img src="../../../assets/images/left.png" alt=""></div> -->
     </div>
     <div class="menu" @click="$router.push({path: '/user/rebate'})">
         <div class="icon"><img src="../../../assets/images/icon2.png" alt=""></div>
         <div class="menu_text">返利明细</div>
         <div class="icon_left"><van-icon class="vicon" name="arrow" /></div>
         <!-- <div class="icon_left"><img src="../../../assets/images/left.png" alt=""></div> -->
     </div>
     <div class="menu" @click="$router.push({path: '/user/team'})">
         <div class="icon"><img src="../../../assets/images/icon3.png" alt=""></div>
         <div class="menu_text">我的团队</div>
         <div class="icon_left"><van-icon class="vicon" name="arrow" /></div>
         <!-- <div class="icon_left"><img src="../../../assets/images/left.png" alt=""></div> -->
     </div>
     <div class="menu" @click="$router.push({path: '/user/bind/userinfo'})">
         <div class="icon"><img src="../../../assets/images/icon4.png" alt=""></div>
         <div class="menu_text">实名认证</div>
         <div class="icon_left"><van-icon class="vicon" name="arrow" /></div>
         <!-- <div class="icon_left"><img src="../../../assets/images/left.png" alt=""></div> -->
     </div>
     <div class="menu" @click="$router.push({path: '/user/bank/card'})">
         <div class="icon"><img src="../../../assets/images/icon4.png" alt=""></div>
         <div class="menu_text">我的银行卡</div>
         <div class="icon_left"><van-icon class="vicon" name="arrow" /></div>
         <!-- <div class="icon_left"><img src="../../../assets/images/left.png" alt=""></div> -->
     </div>
     <!-- <div class="menu" @click="$router.push({path: '/user/bank/card'})">
         <div class="icon"><img src="../../../assets/images/icon4.png" alt=""></div>
         <div class="menu_text">绑定上级</div>
         <div class="icon_left"><van-icon class="vicon" name="arrow" /></div>
     </div> -->
  </div>
</template>
<script>
import { getStatistics } from '@/api/api';
import Vue from "vue";
import { Cell, CellGroup, Icon} from "vant";

import {
  Swipe,
  SwipeItem,
  Button,
  NavBar,
  NoticeBar,
  List,
  Tag,
  Tabbar,
  TabbarItem
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
    [Icon.name]: Icon,
    [Tabbar.name]: Tabbar,
    [TabbarItem.name]: TabbarItem
  },
  data() {
    return {
        today:"0",
        yesterday:"0",
        month:"0",
        monthsum:"0"

    };
  },
  created() {
   
    this.getRebate();
  },
  methods: {
    //导航返回
    onClickLeft() {
      this.$router.go(-1);
    },
    getRebate(){
        getStatistics().then(res => {
        
        console.log(res);
        console.log(res.data.data);
        this.today = res.data.data.today;
        this.yesterday = res.data.data.yesterday;
        this.month = res.data.data.sameMonth;
        this.monthsum = res.data.data.whole;

      });
    }
  }
};
</script>
<style scoped>
.container{
    background: #ffffff;
}
.menu{
    width: 90%;
    height: 45px;
    border-bottom: 1px solid #DADADA;
    margin: 0 auto;
    margin-top: 20px;
}
.icon{
    width: 15%;
    height: 45px;
    float: left;   
}
.icon img{
    width: 20px;
    height: 20px;
     line-break: 45px;
     margin-top: 13px;
}
.menu_text{
    width: 73%;
    height: 45px;
  
    font-size: 16px;
    color: #261900;
    line-height: 45px;
    text-align: left;
    font-family: PingFang-SC-Medium;
    float: left;
}
.icon_left{
    width: 10%;
    height: 45px;
    line-height: 45px;
    float: left;
    padding-left: 20px;
}
/* .icon_left img{
    width: 14px;
    height: 16px;
} */
.line{
    background: #F9F9F9;
    width: 100%;
    height: 12px;
}
.rebate_p{
    color: #333;
    font-size: 14px;
    font-family: PingFang-SC-Medium;
    line-height: 15px;
                        
}
.rebate{
    width: 100%;
    height: 80px;
   
}
.rebate_text{
    width: 33%;
    height: 80px;
    float: left;
    text-align: center;
}
.sum_p1{
    color: #333333;
    font-size: 14px;
    text-align: left;
}
.sum_p2{
    color: #db3d3c;
    font-size: 30px;
    text-align: left;
    line-height: 0px;
}
.money{
    width: 90%;
    height: 100px;
    margin: 0 auto;
    margin-top:50px;
}
.sum{
    width:60%;
    height: 100px;
  
    float: left;
}
.money_but{
    width: 37%;
    height: 100px;
    float: left;
    line-height: 100px;
    text-align: right;
}
.money_but button{
    width: 80px;
    height: 30px;
    color: #ffffff;
    background: #db3d3c;
    border: 1px solid #db3d3c;
    font-size: 13px;
    border: 1px solid ;
    border-radius: 15px;
    line-height: 20px; 
    font-family: KozGoPr6N-Regular;
}
</style>

