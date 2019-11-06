<template>
  <div class="container">
    <van-nav-bar title="赠送抵扣券" :fixed="true" left-arrow @click-left="onClickLeft" >
      <van-icon color="#333" name="arrow-left" slot="left" />
    </van-nav-bar>
    <div  class="mar_top ">
        <div class="head" >
            <div class="headimg">
                <van-image
                round
                width="100%"
                height="100%"
                fit="cover"
                :src="user.avatar"
                />
            </div>
            <div class="headInfo">
                <div class="head_name">
                    <span>{{user.nickName}}</span>
                </div>
                <div class="headCard">{{user.usertype}}</div>
                <div>剩余抵扣券：{{user.sum}}张</div>
            </div>
        </div>
        <div class="content">
            <div class="inp">
                <van-field label="输入抵扣券码" v-model="value" placeholder="请输入抵扣券码" />
            </div>
            <div class="inp">
                <van-field label="输入手机号码" v-model="phone" placeholder="请输入赠送人手机号码" />
                
            </div>
            <div class="artical">
                <div class="title">
                    <span>兑换抵扣券说明：</span>   
                </div>
                <span>①. 兑换后客服进行抵扣券码核查，可即时到账。<br> ②. 抵扣券码可由好友进行赠送，发送至消息中心查看。 <br> ③. 兑换抵扣券成功后，请及时查看抵扣券剩余数量.</span>
            </div>
        </div>
        <div class="box">
         <van-button class="btn" @click="btn" type="info">确认赠送</van-button>
        </div>
    </div>
  </div>
</template>
<script>
import Vue from 'vue';
import { DropdownMenu, DropdownItem } from 'vant';

Vue.use(DropdownMenu).use(DropdownItem);
import {giveCoupon,selectUser} from '@/api/api';
import scrollFixed from '@/mixin/scroll-fixed';
import _ from 'lodash';

import {
  Dialog,
  Cell,
  CellGroup,
  Collapse,
  CollapseItem,
  Tab,
  Image,
  Tabs,
  Swipe,
  SwipeItem,
  Button,
  NavBar,
  NoticeBar,
  List,
  Tag,
  Field,
  Tabbar,
  Toast,
  TabbarItem,
  DatetimePicker,
  Popup
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
    [Field.name]: Field,
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
    [Toast.name]: Toast,
    [Image.name]: Image,
    [TabbarItem.name]: TabbarItem
  },
  data() {
    return {
      user:{},
      phone:'',
      value:''
    };
  },
  created() {
    this.getUserInfo()
     
  },

  activated() {
    // this.getUserInfo()
  },

  methods: {
    //导航返回
    onClickLeft() {
      this.$router.push({name:'user'});
    },
    // 获取用户信息
    getUserInfo(){
      selectUser().then( res => {
        // console.log(res.data.data);
        this.user = res.data.data;
        var code = res.data.data.level;
        switch (code) {
          case 0:
            this.user.usertype = '普通会员';
            break;
          case 1:
            this.user.usertype = '事业合伙人';
            break;
          case 2:
            this.user.usertype = '华商汇合伙人';
            break;
          case 3:
            this.user.usertype = '运营中心';
            break;
        }
      })
    },
    // 赠送抵扣券
    btn(){
      var that = this;
      if( this.value == ''){
        Toast.fail('抵扣码不能为空!');
        return
      }else{
        if( this.phone == ''){
          Toast.fail('手机号码不能为空!');
          return
        }else{
          if(!(/^1(3|4|5|6|7|8|9)\d{9}$/.test(this.phone))){ 
              Toast.fail("手机号码有误，请重填");  
              return false; 
          }else{
            giveCoupon({mobile:this.phone,code:this.value}).then( res => {
              // console.log(res);
              Toast.fail(res.data.errmsg)
              that.phone = '',
              that.value = ''
            }).catch(res => {
              Toast.fail(res.data.errmsg)
              that.phone = '',
              that.value = ''
            })
          }
        }
      }
    },
  }
};
</script>
<style scoped>
    .mar_top{
        margin-top:50px; 
    }
    .head{
        background-color: #fff;
        /* float: right; */
        /* margin-top:50px;  */
        width: 100%;
        /* margin-top: 8px; */
        height: 100px;
    }
    .headimg{
        margin-top:10px;
        margin-left: 10px; 
        width: 80px;
        height: 80px;   
        float: left;
    }
    .headInfo{
        float: left;
        width: 60%;
        margin-top:10px;
        margin-left: 10px;
        /* height: 100px; */
    }
    .head_name{
        color: #333333;
        float: left;
        width: 40%; 
        margin-bottom:10px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }       
    .headCard{
        width: 45%; 
        border: 1px solid #4761EA;
        border-radius: 10px;
        text-align: center;
        display: inline-block;
        margin-bottom:10px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }
    .content{
        width: 100%;
        float: left;
        margin-top:20px;
        /* height: 300px; */
        background-color: #fff;
    }
    .inp{
        margin-top:10px;        
        display: block;
    }

    .artical{
        padding:10px;
    }
    .title{
        color: #4761EA;
        font-size: 15px;
    }
    .box{
        margin-top: 70px;
        width: 100%;
        height: 60px;
        /* border: 1px solid red; */
        padding: 0 20px;
    }
    .btn{
        border-radius: 10px;
        width: 100%;
        height: 50px;
        text-align: center;   
        margin-top: 60px;  
    }

    


</style>


