<template>
  <div class="container">
    <van-nav-bar title="我的团队" :fixed="true" left-arrow @click-left="onClickLeft" >
      <van-icon color="#333" name="arrow-left" slot="left" />
    </van-nav-bar>

    <van-tabs class='marg_top' v-model="active"  title-active-color="#f44">
      <van-tab title="一级成员">
        <div class="gap"></div>
        <van-list v-model="loading1" :finished="finished1" finished-text="没有更多了" @load="onLoad1">
          <div v-for="(item,index) in list1" :key="index">
            <div class="team_div">
              <van-row>
                <van-col span="4" class="team_head">
                  <img :src="item.avatar" alt />
                </van-col>
                <van-col span="9" class="team_head">
                  <div class="team_name">{{item.nickname}}</div>
                  <div class="team_num">发展一级会员:{{item.count}}人</div>
                </van-col>
                <van-col span="11" class="team_head">
                  <div class="team_time">{{item.addTime}}</div>
                  <div class="team_money">
                    奖励:
                    <span id="team_id">{{item.countPrice}}元</span>
                  </div>
                </van-col>
              </van-row>
              <div class="line"></div>
            </div>
          </div>
        </van-list>
      </van-tab>

      <van-tab title="二级成员" @click="tow">
        <div class="gap"></div>
        <!-- <van-pull-refresh v-model="loading2" @refresh="GetMyTeamInfo()"> -->
            <van-list v-model="loading2" :finished="finished2" finished-text="没有更多了" @load="onLoad2">
              <!-- 数据列表 -->
              <div v-for="(item,index) in list2" :key="index">
                <div class="team_div">  
                  <van-row>
                    <van-col span="4" class="team_head">
                      <img :src="item.avatar" alt />
                    </van-col>
                    <van-col span="9" class="team_head">
                      <div class="team_name">{{item.nickname}}</div>
                      <div class="team_num">发展二级会员{{item.count}}人</div>
                    </van-col>
                    <van-col span="11" class="team_head">
                      <div class="team_time">{{item.addTime}}</div>
                      <div class="team_money">
                        奖励:
                        <span id="team_id">{{item.countPrice}}元</span>
                      </div>
                    </van-col>
                  </van-row>
                  <div class="line"></div>
                </div>
              </div>
            </van-list>
        <!-- </van-pull-refresh> -->
      </van-tab>

    </van-tabs>
  </div>
</template>
<script>
import { getMyTeam } from '@/api/api';
import Vue from 'vue';
import { Cell, CellGroup, PullRefresh } from 'vant';

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
  Tab,
  Tabs,
  Row,
  Col
} from 'vant';
Vue.use(Cell).use(CellGroup);
export default {
  // 引入的组件
  components: {
    [Row.name]: Row,
    [Col.name]: Col,
    [Tab.name]: Tab,
    [Tabs.name]: Tabs,
    [NavBar.name]: NavBar,
    [Swipe.name]: Swipe,
    [SwipeItem.name]: SwipeItem,
    [NoticeBar.name]: NoticeBar,
    [List.name]: List,
    [Tag.name]: Tag,
    [Tabbar.name]: Tabbar,
    [TabbarItem.name]: TabbarItem,
    [PullRefresh.name]: PullRefresh
  },
  data() {
    return {
      
      pageindex1: 0, //一级当前页数
      pageNumber1: 0, //一级总页数

      pageindex2: 0, //二级 当前页数
      pageNumber2: 0, //二级 总页数

      loading1: false, //一级成员 加载
      finished1: false, //一级成员 完成

      loading2: false, //二级成员 加载
      finished2: false, //二级成员 完成
      
      active: 0,

      team1: {
        page: 0,
        limit: 10,
        lev:""
      },
      team2: {
        page: 0,
        limit: 10,
        lev:""
      },
      list1: [],
      list2: []
    };
  },

  created() {
   
    // this.GetMyTeamInfo1()
    // this.GetMyTeamInfo2()
  },
  methods: {

    tow() {
      this.GetMyTeamInfo2();
    },

    //导航返回
    onClickLeft() {
      this.$router.go(-1);
    },

    //获取 一级团队 信息
    GetMyTeamInfo1() {
        this.team1.lev = '1';
        this.team1.page++;
        getMyTeam(this.team1).then(res => {
          // alert( this.team1.page)
          // this.list1 = res.data.data.list;
          console.log(res.data.data.list);
          var len = res.data.data.list.length;
          this.list1.push(...res.data.data.list)

          if(parseInt(len) > 0){
            this.loading1 = false;
            this.finished1 = false;
          }else{
            this.loading1 = false;
            this.finished1 = true;
          }
        });
    },
    // 获取 二级团队 信息
    GetMyTeamInfo2() {
        this.team2.lev = '2';
        this.team2.page++;
        getMyTeam(this.team2).then(res => {
           var len = res.data.data.list.length;
          this.list2.push(...res.data.data.list)

          if(parseInt(len) > 0){
            this.loading2 = false;
            this.finished2 = false;
          }else{
            this.loading2 = false;
            this.finished2 = true;
          }
        });
    }, 

    onLoad1() {
      this.GetMyTeamInfo1();
    },
    onLoad2() {
      this.GetMyTeamInfo2();
    }


  }
};
</script>
<style scoped>
.marg_top{
  /* border:1px solid #ccc; */
  margin-top:50px;
}
.gap {
  width: 100%;
  height: 12px;
  background: #f9f9f9;
}
.team_div {
  margin-top: 10px;
}
.line {
  width: 93%;
  height: 1px;
  background: #dadada;
  margin: auto;
}
#team_id {
  color: red;
  font-size: 15px;
}
.team_time {
  font-size: 13px;
  line-height: 30px;
  height: 30px;
  text-align: left;
  color: #8e8e8e;
  padding-left: 10px;
  overflow: hidden;
}
.team_money {
  font-size: 13px;
  line-height: 30px;
  height: 30px;
  text-align: left;
  color: #333;
  padding-left: 10px;
}
.container {
  background: #ffffff;
}
.team_head {
  height: 70px;
  text-align: center;
  line-height: 100px;
  overflow: hidden;
}
.team_head img {
  width: 50px;
  height: 50px;
  border-radius: 29px;
}
.team_name {
  overflow: hidden;
  font-size: 14px;
  line-height: 30px;
  height: 30px;
  text-align: left;
  color: #000;
}
.team_num {
  width: 100%;
  font-size: 12px;
  line-height: 30px;
  height: 30px;
  text-align: left;
  color: #333;
  overflow: hidden;
}
</style>

