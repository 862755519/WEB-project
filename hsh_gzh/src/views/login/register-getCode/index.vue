<template>
  <div class="getC">
      <van-nav-bar title="短信验证" :fixed="true" left-arrow @click-left="onClickLeft" >
        <van-icon color="#333" name="arrow-left" slot="left" />
      </van-nav-bar>
      <div class="mar_top">
        <md-field-group class="register_view">
          
          <div class="send">我们将发送验证码到您的手机</div>
          <md-field
            v-model="mobile"
            icon="mobile"
            placeholder="请输入手机号" 
            @blur="tel_reg"/>
          <div class="error" v-show="error_show">请输入正确的手机号码</div> 
          
          <div class="register_submit">
            <van-button size="large" type="danger" @click="submitCode">下一步</van-button>
          </div>
          <div class="register_footer">
            已有账号?
            <router-link to="/login" class="red">登录</router-link>
          </div>
        </md-field-group>
      </div>
  </div>
</template>

<script>
import Vue from 'vue';
import {findTelcode} from '@/api/api';
import field from '@/components/field/';
import fieldGroup from '@/components/field-group/';
import { log } from 'util';
import { NavBar } from 'vant';

Vue.use(NavBar);

export default {
  data() {
    return {
      mobile: '',
      error_show:false,
      tel:{
        mobile:"",
      },
      telcode:"239049"
    };
  },
  methods: {
    onClickLeft(){
      this.$router.go(-1);
    },
    submitCode() {
      if(this.mobile == null || this.error_show == true){
         this.error_show == true;
      }else{
        this.getTelcode();
        this.$router.push({ name: 'registerSubmit', 
        params:{
　　 　　tel:this.tel.mobile,
        telcode:this.telcode,
　　 }
        });  
      }
    },
    tel_reg(){
      var reg = /^1[3456789]\d{9}$/;
      if(reg.test(this.mobile)){
        this.error_show = false;
      }else{
        this.error_show = true;
      }
    },
    getTelcode(){
      this.tel.mobile = this.mobile;
      console.log(this.tel);
      findTelcode(this.tel).then(res => {
       console.log("返回参数");
       console.log(res);
        console.log(res.data.data);
       
      });
    }

  },

  components: {
    [field.name]: field,
    [fieldGroup.name]: fieldGroup
  }
};
</script>

<style lang="scss" scoped>
.mar_top{
  margin-top:50px;
}
div.register_view {
  background-color: #fff;
  padding-top: 30px;
}

div.register_submit {
  padding-top: 30px;
  padding-bottom: 20px;
}

.register_footer {
  text-align: right;
  color: $font-color-gray;
}
.send{
  padding: 5px;
}
.error{
  width: 100%;
  height: 30px;
  color: red;
}
</style>
