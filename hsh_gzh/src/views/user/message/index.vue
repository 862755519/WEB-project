<template>
  <div class="container">
    <van-nav-bar title="消息中心" :fixed="true" left-arrow @click-left="onClickLeft" >
      <van-icon color="#333" name="arrow-left" slot="left" />
    </van-nav-bar>
    <div class="box"></div>
    <div class="head"></div>
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <div class="marg_top" v-for="item in notfyList" :key="item">
        <div class="mess_div">
            <p class="mess_title">{{item.title}}</p>
            <p class="mess_time">{{item.createtime}}</p>
            <p class="mess_text">{{item.content}}</p>
        </div>
      </div>
    </van-list>
   
  </div>
</template>
<script>
import QRCode from 'qrcodejs2';
import { getShare, notfyList} from '@/api/api';
import Vue from 'vue';

import {
  NavBar,
  Row,
  Col,
  Collapse,
  CollapseItem,
  Popup,
  Cell,
  CellGroup,
  RadioGroup,
  Radio,
  List
} from 'vant';
import { log } from 'util';
import { constants } from 'crypto';
export default {
  // 引入的组件
  components: {
    [NavBar.name]: NavBar,
    [Row.name]: Row,
    [Col.name]: Col,
    [Collapse.name]: Collapse,
    [CollapseItem.name]: CollapseItem,
    [Popup.name]: Popup,
    [Cell.name]: Cell,
    [CellGroup.name]: CellGroup,
    [RadioGroup.name]: RadioGroup,
    [List.name]: List,
    [Radio.name]: Radio
  },
  data() {
    return {
      activeNames: ['1'],
      popup_show: true,
      radio: '1',
      notfyList:[],
      parent:{
        page:1,
        limit:10
      },

      // 上拉刷新
      loading: false,
      finished: false,
      pageindex: 0, // 分页的页数
      totalPage: 1, //总页的页数
    };
  },
  created() {
    // this.getNotfyList();
  },

  methods: {
    //导航返回
    onClickLeft() {
      this.$router.go(-1);
    },
    
    //加载按钮
    onLoad(){	 
        if(this.pageindex < this.totalPage){
            this.pageindex++;
          //加载中
          notfyList( {page:this.pageindex, limit: 5}).then(res =>{
            
            var notfyList = res.data.data.list
            console.log(notfyList);
            
            //加载后
            if(notfyList == null){
                Toast("后台请求数据失败");
            } else{
                for(var i=0; i< notfyList.length; i++){
                    this.notfyList.push(notfyList[i]);
                }
                this.totalPage = res.data.data.pages;
                // 加载状态结束
                this.loading = false;
                // 数据全部加载完成
                if (res.data.data.page == res.data.data.pages) {
                    this.finished = true;
                }
            }
          })
        }
        // 加载状态结束
        this.loading = false;
    },
    
   
  }
};
</script>
<style scoped>
.box{
  border: 1px solid #fff;
  height: 20px;
}
.head{
  margin-top:50px;
}
.marg_top{
  margin-top:15px;
}
.mess_title{
    font-size: 18px;
    color: black;
}
.mess_time{
    color: #818181;
    line-height: 5px;
    margin-top: -5px;
}
.mess_text{
    color: #818181;
}
.mess_div{
    width: 90%;
    /* border:1px solid red; */
    background: #ffffff;
    margin: 10px auto;
    padding-left: 10px;
    padding-right: 10px;
    padding-top: 2px;
    padding-bottom: 5px;
    border-radius: 5px;

}
</style>

