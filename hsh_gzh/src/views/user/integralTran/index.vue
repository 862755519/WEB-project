<template>
  <div class="container">
    <van-nav-bar title="积分转换" :fixed="true" left-arrow @click-left="onClickLeft" >
      <van-icon color="#333" name="arrow-left" slot="left" />
    </van-nav-bar>
    <div class="mar_top">
        <van-cell-group  >
            <van-cell  size="large" title="转换积分类型"  >
                <van-dropdown-menu class="addd" :overlay="false" active-color="#ee0a24">
                    <van-dropdown-item  class="dorpdown" v-model="value1"  @change="type_change" :options="option1" />
                </van-dropdown-menu>
            </van-cell>
            <van-cell  size="large" title="被转换积分类型"  >
                <van-dropdown-menu class="addd" :overlay="false" active-color="#ee0a24">
                    <van-dropdown-item class="dorpdown" v-model="value2" @change="be_type" :options="option2" />
                </van-dropdown-menu>
            </van-cell>
            <van-cell  size="large" title="转换积分数量" >
                <!-- <div class="text">123dfgvbd</div> -->
                <input class="cell_input" placeholder="请输入积分数量" type="number" v-model="number1">
            </van-cell>
            <van-cell  size="large"  title="转换比例" >
              <div class="text">1 : 1</div>
             <!-- <input class="cell_input" type="text" value="1 : 1"> -->
            </van-cell>

        </van-cell-group>

        <div class="box">
         <van-button class="btn" @click="btn" type="danger">确认转化</van-button>
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
import {convey} from '@/api/api';
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
  Toast,
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
    [Toast.name]: Toast,
    [TabbarItem.name]: TabbarItem
  },
  data() {
    return {
      show:false,

      convey:{
        type:0,
        num:0
      },

      value1: 0,
      value2:  'c',
      option1: [
        { text: '注册积分', value: 0 },
        { text: '回馈积分', value: 1 }
      ],
      option2: [
        { text: '购物积分', value: 'c'}
      ],
      option3: [
        { text: '购物积分', value: 'c'}
      ],
      option4: [
        { text: '注册积分', value: 'a' },
        { text: '购物积分', value: 'c'}
      ],
      
      number1: null,
    };
  },
  created() {
     
  },

  activated() {
    // this.getBankInfo();
  },

  methods: {
    //导航返回
    onClickLeft() {
      this.$router.push({name:'user-integral'});
    },
    type(){
        this.show = true;
    },
    beType(){
        this.show = true;
    },
    type_change(){
      if(this.value1 == 0){
        this.value2 = 'c'
        this.option2 = this.option3
      }else if(this.value1 == 1){
        this.value2 = 'c'
        this.option2 = this.option4
      }
    },
    be_type(){
  
    },
    btn(){
      if(this.value1 == 0 && this.value2 == 'c'){
        // alert('活动 -> 购物')
        this.convey.type = 2;
      }else if( this.value1 == 1 && this.value2 == 'c'){
        // alert('回馈 -> 购物')
        this.convey.type = 1;
      }else if(this.value1 == 1 && this.value2 == 'a'){
        // alert('回馈 -> 活动')
        this.convey.type = 0;
      }
      
      this.convey.num = parseInt(this.number1);
      if(this.convey.num == 0 || this.convey.num == undefined || this.convey.num == null){
        Toast.fail('请输入转换积分');
        return
      }
      convey(this.convey).then( res => {
        Toast.success(res.data.errmsg); 
         this.$router.push({name:'user-integral'})     
      }).catch(res => {
        Toast.fail(res.data.errmsg);
         this.$router.push({name:'user-integral'})  
      })
    }
 
  }
};
</script>
<style scoped>
    .mar_top{
    margin-top:50px;
    }
    .text{
        /* border:1px solid red; */
        width: 100%;
        height: 25px; 
        padding-right: 15px; 
    }
    .vpop{
        width: 70%;
        height: 300px;
        border-radius: 20px;    
        padding: 20px;
    }
    .addd{
        width: 100px;
        height: 25px;
        /* border: 1px solid red; */
        float: right;
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
    }

    .cell_input{
      border:none;
      /* border:1px dashed #ccc; */
      text-align: right;
      width: 100%;
      padding-left: 10px; 
      padding-right:10px; 
    }
    .dorpdown{
      /* border:1px solid #ccc; */
      height: 132px;
      width: 50%;
      /* float: right; */
      margin-left: 50%;
    }


</style>


