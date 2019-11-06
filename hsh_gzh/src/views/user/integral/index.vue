<template>
  <div class="container">
    <van-nav-bar title="我的积分" :fixed="true" left-arrow @click-left="onClickLeft">
      <van-icon color="#333" name="arrow-left" slot="left" />
    </van-nav-bar>
    <div class="head">
      <van-row>
        <van-col span="5" class="head_img">
          <img :src="userinfo.avatar" alt />
        </van-col>
        <van-col span="19" class="head_right">
          <div class="name">
            {{userinfo.nickName}}
            <span v-if="userinfo.level == 0" id="span_head">普通会员</span>
            <span v-if="userinfo.level == 1" id="span_head">一星会员</span>
            <span v-if="userinfo.level == 2" id="span_head">二星会员</span>
            <span v-if="userinfo.level == 3" id="span_head">三星会员</span>
          </div>
          <div>
            <van-row>
              <van-col span="12" class="num">邀请码:{{userinfo.code}}</van-col>
              <van-col span="12" class="button_div">
                <button class="but"  @click="$router.push({path: '/user/inteTran'})">积分兑换</button>
              </van-col>
            </van-row>
          </div>
        </van-col>
      </van-row>
      <van-row>
        <van-col span="6" class="score_div">
          <div class="score">{{userinfo.at}}</div>
          <div class="scorename">注册积分</div>
        </van-col>
        <van-col span="6" class="score_div">
          <div class="score">{{userinfo.ac}}</div>
          <div class="scorename">回馈积分</div>
        </van-col>
        <van-col span="6" class="score_div">
          <div class="score">{{userinfo.ar}}</div>
          <div class="scorename">购物积分</div>
        </van-col>
        <van-col span="6" class="score_div">
          <div class="score">{{userinfo.ai}}</div>
          <div class="scorename">AI</div>
        </van-col>
      </van-row>
    </div>

    <!-- 积分列表导航 -->
    <van-tabs v-model="active" @click="selecttab(active)">
      <!-- 活动积分列表 -->
      <van-tab title="注册积分">
        
          <van-list v-model="loading1" :finished="finished1" finished-text="没有更多了" @load="getnewlist1">
            <van-row class="list_row" v-for="(item,value) in list1" :key="value">
              <van-col span="5" class="list_img">
                <img v-if="item.rrMoney<0" src="../../../assets/images/out.png" alt />
                <img v-if="item.rrMoney>0" src="../../../assets/images/int.png" alt />
              </van-col>
              <van-col span="14" class="list_center">
                <div class="list_name">{{item.rrRemark}}</div>
                <div class="list_time">{{item.addTime}}</div>
              </van-col>
              <van-col v-if="item.rrMoney>0" span="5" class="list_num">+{{item.rrMoney}}</van-col>
              <van-col v-if="item.rrMoney<0" span="5" class="list_num">{{item.rrMoney}}</van-col>
            </van-row>
          </van-list>
      
      </van-tab>
      <!-- 反馈积分列表 -->
      <van-tab title="回馈积分" >
      
          <van-list v-model="loading2" :finished="finished2" finished-text="没有更多了" @load="getnewlist2">
            <van-row class="list_row" v-for="(item,value) in list2" :key="value">
              <van-col span="5" class="list_img">
                <img v-if="item.rrMoney<0" src="../../../assets/images/out.png" alt />
                <img v-if="item.rrMoney>0" src="../../../assets/images/int.png" alt />
              </van-col>
              <van-col span="14" class="list_center">
                <div class="list_name">{{item.rrRemark}}</div>
                <div class="list_time">{{item.addTime}}</div>
              </van-col>
              <van-col v-if="item.rrMoney>0" span="5" class="list_num">+{{item.rrMoney}}</van-col>
              <van-col v-if="item.rrMoney<0" span="5" class="list_num">{{item.rrMoney}}</van-col>
            </van-row>
          </van-list>
       
      </van-tab>
      <!-- 购物积分 -->
      <van-tab title="购物积分">
        <van-list
          v-model="loading3"
          :finished="finished3"
          finished-text="没有更多了"
          @load="getnewlist3"
        >
          <van-row class="list_row" v-for="(item,value) in list3" :key="value">
            <van-col span="5" class="list_img">
              <img v-if="item.rrMoney<0" src="../../../assets/images/out.png" alt />
              <img v-if="item.rrMoney>0" src="../../../assets/images/int.png" alt />
            </van-col>
            <van-col span="14" class="list_center">
              <div class="list_name">
                {{item.rrRemark}}
              </div>
              <div class="list_time">{{item.addTime}}</div>
            </van-col>
            <van-col v-if="item.rrMoney>0" span="5" class="list_num">+{{item.rrMoney}}</van-col>
            <van-col v-if="item.rrMoney<0" span="5" class="list_num">{{item.rrMoney}}</van-col>
          </van-row>
        </van-list>
      </van-tab>

      <!-- 购物积分 -->
      <van-tab title="AI积分">
        <van-list
          v-model="loading4"
          :finished="finished4"
          finished-text="没有更多了"
          @load="getnewlist4"
        >
          <van-row class="list_row" v-for="(item,value) in list4" :key="value">
            <van-col span="5" class="list_img">
              <img v-if="item.rrMoney<0" src="../../../assets/images/out.png" alt />
              <img v-if="item.rrMoney>0" src="../../../assets/images/int.png" alt />
            </van-col>
            <van-col span="14" class="list_center">
              <div class="list_name">
                {{item.rrRemark}}
              </div>
              <div class="list_time">{{item.addTime}}</div>
            </van-col>
            <van-col v-if="item.rrMoney>0" span="5" class="list_num">+{{item.rrMoney}}</van-col>
            <van-col v-if="item.rrMoney<0" span="5" class="list_num">{{item.rrMoney}}</van-col>
          </van-row>
        </van-list>
      </van-tab>

    </van-tabs>
  </div>
</template>
<script>
import Vue from 'vue';
import { getIntegral} from '@/api/api';
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
  Popup,
  Row,
  Col,
  Toast
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
  DatetimePicker,
  PullRefresh
} from 'vant';
import { log } from 'util';
import { userInfo } from 'os';
Vue.use(Cell).use(CellGroup);
export default {
  // 引入的组件
  components: {
    [Row.name]: Row,
    [PullRefresh.name]: PullRefresh,
    [Col.name]: Col,
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
      active: 0, //导航标签
      isLoading1: false, //活动积分下拉属性
      isLoading2:false,
      isLoading3:false,
      isLoading4:false,
      userinfo: '',
      list1: [], //注册积分
      list2: [], //反馈积分
      list3: [], //购物积分
      list4: [], //AI积分
      loading1: false,//注册积分分页
      finished1: false,//注册积分分页
      loading2: false,//反馈积分分页
      finished2: false,//反馈积分分页
      loading3: false,//购物积分分页
      finished3: false,//购物积分分页
      loading4: false,//AI积分分页
      finished4: false,//AI积分分页
      parmes1: {
        //注册积分参数
        type: 1,
        pageNo: 0,
        pageSize: 10,
      },
       parmes2: {
        //反馈接口参数
        type: 0,
        pageNo: 0,
        pageSize: 10,
      },
       parmes3: {
        //购物接口参数
        type: 2,
        pageNo: 0,
        pageSize: 10,
      },
       parmes4: {
        //购物接口参数
        type: 3,
        pageNo: 0,
        pageSize: 10,
      }
    };
  },
 
  methods: {
    //导航返回
    onClickLeft() {
      this.$router.push({ name: 'user' });
    },
  
   //注册积分列表
     getnewlist1() {
      this.parmes1.pageNo++;
      getIntegral(this.parmes1).then(res => {
        this.userinfo = res.data.data;
        this.list1.push(...res.data.data.list);
        this.loading1 = false;
        if(res.data.data.list.length == 0){
          this.finished1 = true;
        }
        if(this.list1.length>=res.data.data.total){
          this.finished1 = true;
          return;
        }  
      });
    },

    //反馈积分列表
     getnewlist2() {
      this.parmes2.pageNo++;
      getIntegral(this.parmes2).then(res => {
       
        this.list2.push(...res.data.data.list);
        this.loading2 = false;
       
        if(this.list2.length>=res.data.data.total){
          this.finished2 = true;
          return;
        }
         
      });
    },

    //购物积分列表
    getnewlist3() {
      this.parmes3.pageNo++;
      getIntegral(this.parmes3).then(res => {
        this.userinfo = res.data.data;
        this.list3.push(...res.data.data.list);
        this.loading3 = false;
       
        if(this.list3.length>=res.data.data.total){
          this.finished3 = true;
          return;
        }
         
      });
    },

    //AI积分列表
    getnewlist4() {
      this.parmes4.pageNo++;
      getIntegral(this.parmes4).then(res => {
        this.userinfo = res.data.data;
        this.list4.push(...res.data.data.list);
        this.loading4 = false;
       
        if(this.list4.length>=res.data.data.total){
          this.finished4 = true;
          return;
        }
         
      });
    },
 
    
  }
};
</script>
<style scoped>
.list_num {
  font-size: 18px;
  color: #f4323a;
  text-align: center;
  line-height: 75px;
  height: 75px;
}
.blue {
  font-size: 18px;
  color: #3d7cfb;
  text-align: center;
  line-height: 75px;
  height: 75px;
}
.list_name {
  font-size: 16px;
  line-height: 40px;
  height: 40px;
}
.list_time {
  font-size: 14px;
  color: #999999;
}
.list_center {
  height: 75px;
  padding-left: 10px;
}
.list_img {
  height: 80px;
  text-align: center;
}
.list_img img {
  height: 60px;
  width: 60px;
  border-radius: 30px;
  margin-top: 8px;
}
.list_row {
  border-bottom: 1px solid #e6e6e6;
  width: 90%;
  height: 80px;
  margin: 10px auto;
}
.container {
  background: #ffffff;
}
.score_div {
  border-right: 1px solid #ffffff;
  text-align: center;
  height: 70px;
  margin-top: 15px;
}
.score {
  color: #ffffff;
  font-size: 16px;
  line-height: 35px;
  height: 35px;
}
.scorename {
  color: #ffffff;
  font-size: 15px;
  line-height: 35px;
  height: 35px;
}
.button_div {
  height: 50px;
  text-align: right;
  padding-right: 15px;
}
.but {
  color: red;
  font-size: 14px;
  width: 100px;
  height: 27px;
  background: #ffffff;
  border: 1px solid #ffffff;
  border-radius: 5px;
  margin-top: 10px;
}
.num {
  height: 50px;
  font-size: 14px;
  color: #ffffff;
  line-height: 50px;
}
#span_head {
  font-size: 14px;
  border: 1px solid #ffffff;
  padding-left: 15px;
  padding-right: 15px;
  border-radius: 10px;
  margin-left: 15px;
}
.name {
  font-size: 17px;
  color: #ffffff;
  margin-top: 20px;
  height: 30px;
  line-height: 30px;
}
.head {
  width: 100%;
  height: 200px;
  margin-top: 47px;
  background: #f4323a;
}
.head_img {
  text-align: center;
  height: 100px;
}
.head_img img {
  width: 65px;
  height: 65px;
  border-radius: 35px;
  margin-top: 27px;
}
.head_right {
  height: 100px;
}
</style>


