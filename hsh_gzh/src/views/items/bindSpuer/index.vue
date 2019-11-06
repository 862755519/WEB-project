<template>
  <div class="container">
    <van-nav-bar title="绑定上级" :fixed="true" left-arrow @click-left="onClickLeft" >
      <van-icon color="#333" name="arrow-left" slot="left" />
    </van-nav-bar>
    <div  class="mar_top ">
        <div class="head" >
            <div class="head_til">
                <span>输入邀请码:</span>
            </div>
            <div class="pass-input">
                <van-password-input
                :value="value"
                :length="6"
                :gutter="15"
                :mask="false"
                :focused="showKeyboard"
                @focus="showKeyboard = true"
                />
            </div>
            <div class="headimg">
                <van-image
                round
                width="100%"
                height="100%"
                fit="cover"
                src="https://img.yzcdn.cn/vant/cat.jpeg"
                />
            </div>
            <div class="headInfo">
                <div class="head_name">
                    <span>嘟嘟嘟</span>
                </div>
                <div class="headCard">华商合伙人</div>
                <div class="syhh_people">
                    <span>事业合伙人名额：9个</span>
                </div>
                <div class="hsh_people">
                    <span>华商合伙人名额：9个</span>
                </div>
            </div>
        </div>
        <div class="content">
            <!-- <div class="inp">
                <van-field label="输入抵扣券码" v-model="value" placeholder="请输入抵扣券码" />
            </div> -->
            <div class="artical">
                <div class="title">
                    <span>绑定上级说明：</span>   
                </div>
                <span>
                    ①. 绑定上级需上级成为华商合伙人或运营中心。<br>
                    ②. 绑定上级需上级华商合伙人下属事业合伙人名额大于0。<br>
                    ③. 绑定成功后身份自动提升.            
                </span>
               
            </div>
        </div>
        <div class="box">
         <van-button class="btn" @click="btn" >立即绑定</van-button>
        </div>
    </div>

    <!-- 显示弹出框 -->
    <!-- <van-popup v-model="show" class="vpop">
        <van-cell  size="large" title="选择积分类型"  />
        <van-cell  size="large" title="活动积分" @click="beType" />
        <van-cell  size="large" title="回馈积分" @click="type" />
        <van-cell  size="large" title="购物积分" @click="beType" />
    </van-popup> -->
  </div>
</template>
<script>
import Vue from 'vue';
import { DropdownMenu, DropdownItem } from 'vant';

Vue.use(DropdownMenu).use(DropdownItem);
import {GzhBindUser} from '@/api/api';
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
  PasswordInput, 
  NumberKeyboard,
  Popup
} from 'vant';

import { log } from 'util';
Vue.use(Cell).use(CellGroup);
Vue.use(PasswordInput).use(NumberKeyboard);

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
       value: '123',
       showKeyboard: true
    };
  },
  created() {
     
  },

  activated() {
    // this.getBankInfo();
    this.getUpInfo()
  },

  methods: {
    //导航返回
    onClickLeft() {
      this.$router.push({name:'user'});
    },

    getUpInfo(){
      GzhBindUser( {code:code} ).then( res => {
        console.log( res );
        
      })
    },

    btn(){
        alert('这是绑定事件')
    },
 
  }
};
</script>
<style scoped>
    .mar_top{
        margin-top:45px; 
    }
    .head{
        background-color: #fff;
        /* float: right; */
        /* margin-top:50px;  */
        width: 100%;
        /* margin-top: 8px; */
        height: 210px;
    }
    .pass-input{
        background-color: #F7F7F7;
        padding-top:8px;
        padding-bottom:8px;
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
    .head_til{
        padding:10px 20px 10px 20px;
        font-size: 16px;
        font-family:PingFang SC;
        font-weight:500;
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
    .syhh_people{
        margin-bottom: 5px;
        /* border:1px solid #ccc; */
       
    }
    /* .hsh_people{
    } */
    .content{
        width: 100%;
        float: left;
        margin-top:20px;
        /* height: 300px; */
        background-color: #fff;
    }
    .inp{
        margin-top:20px;        
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
        background-color: #4761EA;
        color: #fff;
    }

    


</style>


