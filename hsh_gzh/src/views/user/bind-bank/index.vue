<template>
  <div class="container">
    <van-nav-bar title="绑定银行卡" :fixed="true" left-arrow @click-left="onClickLeft" >
      <van-icon color="#333" name="arrow-left" slot="left" />
    </van-nav-bar>
    <div class="mar_top">
      <div class="bind">
        <div class="bind_left">持卡人</div>
        <div class="bind_right">
          <van-cell-group>
            <van-field v-model="userName" placeholder="请输入持卡人姓名" />
          </van-cell-group>
        </div>
      </div>
      <div class="bind">
        <div class="bind_left">银行</div>
        <div class="bind_right">
          <van-cell-group>
            <van-field v-model="selectBankName" placeholder="请选择银行" @click="selectBank" />
          </van-cell-group>
        </div>
      </div>
      <div class="bind">
        <div class="bind_left">卡号</div>
        <div class="bind_right">
          <van-cell-group>
            <van-field v-model="bankCode" placeholder="请输入卡号" @blur="bankCodeReg"/>
          </van-cell-group>
        </div>
      </div>
      <div class="error" v-show="error_show">请输入正确的银行卡号</div>
    
      <div class="bind_button">
          <button class="button" @click="sumbit">确认绑定</button>
      </div>
      <div class="error" id="null_error" v-show="null_show">提交信息不能为空</div>
    </div>
    <!-- 弹出层 -->
    <van-popup v-model="popup_show" class="popup">
        <div class="select_title">选择银行</div>
        <div class="select_title2">选择你所绑定银行卡银行</div>
        <van-radio-group v-model="radio" v-for="(item,value) in banklist" :key="value" >
            <van-radio class="radio_row" :name="item.id" label-position="left" @click="radioClick(item.cardName,item.id)">
            <div class="bank_img"><img class="bank_logo" :src="item.cardIcon"></div>
            <div class="bank_name">{{item.cardName}}</div>
            </van-radio>
        </van-radio-group>
    </van-popup>
  </div>
</template>
 
<script>
import {findBank,bindBank} from '@/api/api';
import {
  Swipe,
  SwipeItem,
  Button,
  NavBar,
  NoticeBar,
  List,
  Tag,
  Tabbar,
  Uploader,
  TabbarItem,
  Field,
  Toast,
  DatetimePicker,
  ActionSheet,
  Popup,RadioGroup,Radio 
} from "vant";
import { log } from 'util';
export default {
  // 引入的组件
  components: {
    [Radio.name]:Radio,
    [Toast.name]:Toast,
    [RadioGroup.name]:RadioGroup,
    [Popup.name]:Popup,
    [Uploader.name]: Uploader,
    [NavBar.name]: NavBar,
    [Swipe.name]: Swipe,
    [SwipeItem.name]: SwipeItem,
    [NoticeBar.name]: NoticeBar,
    [List.name]: List,
    [Tag.name]: Tag,
    [Tabbar.name]: Tabbar,
    [TabbarItem.name]: TabbarItem,
    [Field.name]: Field,
    [DatetimePicker.name]: DatetimePicker,
    ActionSheet,
    [ActionSheet.name]: ActionSheet
  },
  data() {
    return {
       popup_show:false,//展示弹出层
       radio: '',
       banklist:[],
       selectBankName:"",//银行卡名称
       userName:"",//持卡人姓名
       bankCode:"",//银行卡号
       bankId:null,
       error_show:false,
       null_show:false,
    };
  },
  created() {
     
  },
  methods: {
       //导航返回
    onClickLeft() {
      this.$router.go(-1);
    },
     //选择银行按钮
     selectBank(){
       this.popup_show = true;
       //选择银行卡接口
        findBank().then(res => {
        this.banklist = res.data.data;
        console.log("**********");
        console.log(res.data.data);
      }); 
     },
     //点击单选框事件
     radioClick(e,c){
       console.log(e);
      
       this.selectBankName = e;
       this.bankId = c;
       this.popup_show = false;
     },
     //验证银行卡号
     bankCodeReg(){
       var code = this.bankCode;
       var reg=/^\d{16,19}$/; 
       if(!reg.test(code)){
        this.error_show = true;
       }
     },
     //点击提交函数
     sumbit(){
       var reg=/^\d{16,19}$/; 
       if(!reg.test(this.bankCode)){
          this.null_show = true;
         return;
        
       }
       if(this.bankCode==null||this.bankId==null||this.userName==""){
         this.null_show = true;
         return;
         
       }
       
       console.log(this.userName);
       console.log(this.bankCode);
        bindBank({bcdName:this.userName,cardId:this.bankId,bcdNum:this.bankCode}).then(res => {  
        console.log(this.userName);
        console.log(this.bankId);
        console.log(this.bankCode);
        Toast('绑定成功');
        this.$router.push({path:'/user/bank/card'});
      }); 
     }
  }
};
</script>
<style scoped>
.mar_top{
  margin-top:50px;
}
#null_error{
  padding-left: 0px;
  text-align: center;
  
}
.error{
  font-size: 15px;
  padding-left: 29%;
  color: #db3d3c;
  widows: 100%;
  height: 30px;
  line-height: 30px;
}
.bank_name{
  width:180px;
  height: 40px;
  font-size: 14px;
  color: #000000;
  line-height: 40px;
  text-align: left;
}
.bank_img{
  width: 40px;
  height:40px;
  
  float: left;
}
.bank_logo{
  width: 23px;
  height: 23px;
  margin-top: 8px;
  
}
.radio_row{
  width: 88%;
  height: 40px;
  border-bottom: 1px solid #e5e5e5;
}
.select_title2{
  width: 100%;
  height: 30px;
  line-height: 20px;
  color: #808080;
  font-size: 13px;
 
}
.select_title{
  width: 100%;
  height: 40px;
  line-height: 40px;
  color: #000000;
  font-size: 16px;
  font-weight:550;
  font-family: Adobe Heiti Std R;
 
}
.popup{
  padding-left: 20px;
  padding-top: 10px;
  width: 80%;
  height: 260px;
  border-radius: 5px;
  background: #FFFFFF;
}
.bind {
  width: 95%;
  height: 50px;
  border-bottom: 1px solid #e5e5e5;
  margin:10px auto;
  background: #FFFFFF;
  margin-top: 30px;
  padding-left:20px;
  border-radius: 5px;
}
.bind_left {
  float: left;
  width: 20%;
  height: 50px;
  line-height: 45px;
  color: #333333;
  font-family: PingFang-SC-Medium;
  padding-left: 10px;
  text-align: left;
}
.bind_right {
  float: left;
  width: 65%;
  height: 50px;
  text-align: left;
  
}
.bind_button{
    width: 100%;
    height: 50px;
    margin-top: 50px;
    text-align: center;
}
.button{
    width: 90%;
    height: 45px;
    background: #db3d3c;
    color: #FFFFFF;
    font-size: 17px;
    border: 1px solid #db3d3c;
    border-radius: 5px;
   
}
</style>

