<template>
  <div class="container">
    <van-nav-bar title="申请提现" :fixed="true" left-arrow @click-left="onClickLeft" >
      <van-icon color="#333" name="arrow-left" slot="left" />
    </van-nav-bar>
    <div class="marg_top">
      <div class="withd">
        <div class="title">提现至</div>
        <div class="text" v-show="show_bank" @click="select">{{selectBankName}}</div>
        <div class="text"  v-show="show_zfb" @click="select">支付宝</div>
      </div>
      <div class="bankerror" v-show="error1">请选择提款方式</div>
      <div class="line"></div>
      <div class="withd">
        <div class="title">可提现金额</div>
        <div class="text">
          {{may}}.00
          <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>元
        </div>
      </div>
      <div class="withd">
        <div class="title">申请提现金额</div>
        <div class="text">
          <input
            class="withd_input"
            type="number"
            v-model="getmoney"
            placeholder="请输入提现金额"
            @input="moneyInput(getmoney)"
          />
          <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>元
        </div>
      </div>
      <div class="bankerror" v-show="error2">提现金额不能为空不能为负</div>
      <div class="bankerror" v-show="error3">提现金额超过可提现金额</div>
      <div class="withd">
        <div class="title">手续费</div>
        <div class="text">
          {{setmoney}}
          <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>元
        </div>
      </div>
      <div class="line"></div>
    
      <div class="state">
        <van-collapse id="state_title" v-model="activeName" accordion>
          <van-collapse-item title="提现说明" name="1">
            ①. 5到7个工作日到账，法定节假日和双休日除外。
            <br />②. 只可对推广奖励到账金额进行提现。
            <br />③. 申请提现后由平台进行核准，通过后即为申请成功。
            <br />
          </van-collapse-item>
        </van-collapse>
      </div>
      <div class="submit">
        <button @click="submit">提 交</button>
      </div>
    </div>


    <!-- 银行卡选择弹出层 -->
    <van-popup v-model="popup_show" position="bottom" :style="{ height: '40%' }">
      <div class="popup_title">提现方式</div>

      <!-- <van-radio-group v-model="radio" >
        <van-radio name="-1" class="popup_radio" @click="selectZFB">支付宝
          <br />
        <span class="radio_span2">账号:({{phone}})</span>
        </van-radio>
      </van-radio-group>
       -->

      <div v-for="(item1,value) in banklist" :key="value">
        <van-radio-group v-model="radio">
          <van-radio
            :name="item1.id"
            class="popup_radio"
            @click="selectBank(item1.id,item1.cardName,item1.bcdNum)"
          >
            <span class="radio_span1">{{item1.cardName}}</span>
            <br />
            <span class="radio_span2">账号:({{item1.bcdNum}})</span>
          </van-radio>
        </van-radio-group>
      </div>
    </van-popup>

    <!-- 支付宝选择弹框 -->
    <van-popup v-model="ZFB_show" position="bottom" class="ZFB_show" :style="{ height: '35%' }">
      <div style="height:30px; weight:100%; text-align:center;" >支付宝授权</div>
      <van-cell-group>
      <van-field label="手机号" v-model="phone"  placeholder="请输入手机号" >
        <van-button slot="button" size="small" type="danger" @click="change">更改</van-button>
        
      </van-field>  
      </van-cell-group>
      <van-cell-group>  
        <van-field
          v-if="show_sms"
          v-model="sms"
          center
          clearable
          label="短信验证"
          placeholder="请输入短信验证码"
        >
          <van-button slot="button" size="small" type="danger" @click="sendMsg">发送验证码</van-button>
        </van-field>
      </van-cell-group>
      <!-- <van-button  slot="button" size="small" type="primary" >确定绑定</van-button> -->
      <van-button type="danger" size="small" style="margin-left:10px;" @click="Determine">确定绑定</van-button>
    </van-popup>
  </div>
</template>
<script>
import { getBank, getMoney,getMaxmoney, bindAuth,isBindAli,authCaptcha} from '@/api/api';
import Vue from 'vue';
import {
  Cell,
  CellGroup,
  Collapse,
  CollapseItem,
  Popup,
  RadioGroup,
  Radio
} from 'vant';

import {
  Swipe,
  Field,
  SwipeItem,
  Button,
  NavBar,
  NoticeBar,
  List,
  Tag,
  Tabbar,
  Toast,
  TabbarItem,Dialog 
} from 'vant';
import { log } from 'util';
import { closeSync } from 'fs';
Vue.use(Cell).use(CellGroup);
export default {
  // 引入的组件
  components: {
    [Dialog.name]:Dialog,
    [Field.name]:Field,
    [RadioGroup.name]: RadioGroup,
    [Radio.name]: Radio,
    [Popup.name]: Popup,
    [Collapse.name]: Collapse,
    [CollapseItem.name]: CollapseItem,
    [NavBar.name]: NavBar,
    [Swipe.name]: Swipe,
    [SwipeItem.name]: SwipeItem,
    [NoticeBar.name]: NoticeBar,
    [List.name]: List,
    [Tag.name]: Tag,
    [Toast.name]: Toast,
    [Tabbar.name]: Tabbar,
    [TabbarItem.name]: TabbarItem
  },
  data() {
    return {
      banklenght:"0",
      activeName: '1', //折叠面板
      popup_show: false,
      radio: '1',
      banklist: [],
      tail: '',
      selectBankName: '请选择银行',
      bankid: '',
      getmoney: '',
      form: {
        money: '',
        id: ''
      },
      serviceMoney: '',
      may: '0',
      phone:'',
      sms:'',
      isBand:'',
      setmoney:"",
      error1: false,
      error2: false,
      error3: false,

      show_zfb: false,
      show_bank: true,
      ZFB_show: false,
      show_sms:false
    };
  },
  created(){
      this.getMax();
      this.getPhone();
     
  },
  methods: {
    //获取可提现金额
    getMax(){
      getMaxmoney().then(res => {
        console.log(res.data);
        console.log(res.data.data.list);
        this.serviceMoney = res.data.data.fee;
        this.may = res.data.data.money;
        this.banklist = res.data.data.list;
        console.log(this.banklist);
        
        console.log(this.banklist.length);
        
      });
    },
    //导航返回
    onClickLeft() {
      this.$router.go(-1);
    },
    // 验证是否绑定支付宝
    getPhone(){
      isBindAli().then( res =>{
        console.log(res.data.data.bind);
        this.isBand = res.data.data.bind
        if(res.data.data.bind == false){
          // alert(res.data.data.mobile)
          this.phone = res.data.data.mobile;
        }
      })
    },
    // 选择支付宝
    selectZFB(){
      this.show_bank = false;
      this.show_zfb = true;
      if(this.isBand == false){
        this.ZFB_show = true;
      }
      
    },
     // 绑定支付宝
     Determine(){
      if(!(/^1[3456789]\d{9}$/.test(this.phone))){ 
        Toast.fail("手机号码有误，请重填");  
        return false; 
      } else{
        bindAuth({mobile:this.phone}).then( res =>{
          console.log(res);
        })
      }

     },
    //短信验证
    sendMsg(){
      if(!(/^1[3456789]\d{9}$/.test(this.phone))){ 
        Toast.fail("手机号码有误，请重填");  
        return false; 
      }else{
        authCaptcha({mobile: this.phone}).then( res => {
          console.log(res);
        })
      }
    },
    // 支付宝 更改
    change(){
      // 校验手机号码
      this.show_sms = !this.show_sms;
    },

    selectBank(event1, event2, event3) {
      this.show_bank = true;
      this.show_zfb = false;
      var endnum = event3.substring(event3.length - 4);
      this.tail = endnum;
      var str = '' + event2 + '尾号:(' + this.tail + ')';
      this.selectBankName = str;
      this.bankid = event1;
      this.popup_show = false;
    },

    select() {
      
       if(this.banklist.length<=0){
         Dialog.alert({
          message: '请先绑定银行卡'
        }).then(() => {
          this.$router.push({
          path: '/user/bind/bank'
        });
        });
        this.popup_show = false;
      }else{
         this.popup_show = true;
         
      }
     
     
    },
    //获取银行卡信息
    // getBankInfo(){
    //   getBank().then(res => {
    //     console.log(res.data.data);
    //     this.banklist = res.data.data.list;
    //     alert(this.banklenght.length);
    //     var str = res.data.data[0].bcdNum;
    //     this.banklenght = res.data.data.list.length;
        
    //   });
    // },
    //提交信息
    submit() {
      this.error1 = false;
      this.error2 = false;
      this.error3 = false;
      if (this.getmoney == ''|| this.getmoney <= "0") {
        this.error2 = true;
        return;
      }
      var s1 = parseInt(this.getmoney);
      var s2 = parseInt(this.may);
      if (s1 > s2) {
        this.error3 = true;
        return;
      }

      this.form.id = this.bankid;
      this.form.money = this.getmoney;

      if (this.form.id == '') {
        this.error1 = true;
        return;
      }
      getMoney(this.form).then(res => {
        Dialog.alert({
          message: '申请提现成功，等待工作人员处理'
        }).then(() => {
          // on close
        });
        this.$router.push({
          path: '/user/record'
        });
      }).catch(error => {
            this.$toast.fail(error.data.errmsg);
            // this.$router.push({
            //   path: '/user/record'
            // });
          })
;
    },
    moneyInput(e) {
      var a = e;
      this.setmoney = a * this.serviceMoney;
    }
  }
};
</script>
<style scoped>
.ZFB_show{
  padding:10px 10px 5px 10px;
}
.marg_top{
  margin-top: 50px;
}
.bankerror {
  width: 90%;
  height: 25px;
  color: red;
  margin: auto;
}
.radio_span1 {
  font-size: 16px;
}
.radio_span2 {
  font-size: 14px;
  line-height: 15px;
  color: red;
}
.popup_radio {
  width: 90%;
  height: 50px;
  font-size: 16px;
  padding: 20px;
  border-bottom: 1px solid #dddddd;
  margin: auto;
}
.popup_title {
  width: 100%;
  height: 45px;
  border-bottom: 1px solid #dddddd;
  margin: auto;
  text-align: center;
  line-height: 45px;
  font-size: 17px;
}
.container {
  background: #fff;
}
.submit {
  width: 100%;
  height: 50px;
  text-align: center;
  margin-top: 20px;
}
.submit button {
  width: 90%;
  height: 45px;
  background: #db3d3c;
  color: #fff;
  font-size: 16px;
  font-family: PingFang-SC-Medium;
  border: 1px solid #db3d3c;
  border-radius: 5px;
}
.state {
  width: 99%;
  height: 200px;
  margin: auto;
  text-align: left;
}
#password {
  text-align: left;
}
.password_input {
  border: none;
  padding-left: 10px;
  height: 47px;
}
.withd_input {
  width: 100px;
  text-align: right;
  border: none;
}
.withd {
  width: 90%;
  height: 50px;
  margin: 0 auto;
}
.title {
  width: 35%;
  height: 50px;
  font-size: 16px;
  color: #333333;
  line-height: 50px;
  text-align: left;
  float: left;
}
.text {
  float: left;
  width: 62%;
  height: 50px;
  font-size: 14px;
  color: #333333;
  line-height: 50px;
  text-align: right;
}
.line {
  width: 100%;
  height: 13px;
  background: #f9f9f9;
}
</style>


