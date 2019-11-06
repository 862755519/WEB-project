<template>
  <div class="register">
    <van-nav-bar title="注册" :fixed="true" left-arrow @click-left="onClickLeft" >
			<van-icon color="#333" name="arrow-left" slot="left" />
    </van-nav-bar>
    <div class="body">
      <md-field-group class="register_submit">
        <md-field v-model="mobile" icon="mobile" placeholder="请输手机号">
          
        </md-field>
        <md-field v-model="telcode" icon="lock" placeholder="请输入验证码">
          <div slot="rightIcon"  class="item">
            <van-count-down
              v-if="counting"
              ref="countDown"
              millisecond
              :time="60000"
              :auto-start="true"
              format="ss"
              @finish="finished"
            >
              <template slot-scope="props">
              <span class="item">{{ +props.seconds || 60 }}秒后获取</span>
            </template>
            </van-count-down>

            <span v-else class="reGetCode" @click="getCode" >获取验证码</span>
          </div>
        </md-field>
        <div class="error" v-show="error_tel">验证码不能为空</div>
      
        <md-field v-model="uname" icon="wode1" placeholder="请输入用户名"/>
        <md-field v-model="pw" icon="lock" placeholder="请输入密码" :type="visiblePass ? 'text' : 'password'"/>
        <md-field v-model="confirm" icon="lock" placeholder="请输入密码"
        :type="visiblePass ? 'text' : 'password'" 
        @blur="password_reg"
        />
        <div class="error" v-show="error_password">两次输入的密码不一致，请从新输入</div>
        <md-field v-model="ucode" icon="shoucang" placeholder="请输入邀请码"/>

        <div class="register_submit_btn">
          <van-button type="danger" size="large" @click="registerSubmit">确定</van-button>
        </div>
      </md-field-group>
    </div>
  </div>
</template>

<script>
import Vue from 'vue';
import {submitTable, findTelcode} from '@/api/api';
import field from '@/components/field/';
import fieldGroup from '@/components/field-group/';
import { Col, NavBar, CountDown, Toast} from 'vant';

Vue.use(NavBar);

export default {
  data() {
    return {
      counting: false,
      uname:"",
      telcode: null,
      mobile:'',
      tel:{
        mobile:""
      },
      pw: '',
      confirm: null,
      ucode:"",
      error_password:false,
      error_tel:false,
      form:{
        mobile:"",
        username:"",
        password:"",
        code:"",
        wxCode:"",
        qCode:"",
      }
    };
  },
  methods: {
    onClickLeft(){
      this.$router.go(-1);
    },
    //确认密码验证
    password_reg(){
      if(this.pw == this.confirm){
        this.error_password = false;
      }else{
        this.error_password = true;
      }
    },

    registerSubmit() {
        if(this.telcode == null){
        this.error_tel = true;
        return;
      }
      if(this.confirm == null || this.pw != this.confirm){
        this.error_password = true;
        return;
      }
    
      var pagecode = this.$route.params.telcode;
      if(this.telcode != null){
      this.submit();
      } 
    },

    //提交表单请求
    submit(){
      this.form.mobile = this.mobile;
      this.form.username = this.uname;
      this.form.password = this.confirm;
      this.form.code = this.telcode;
      this.form.qCode = this.ucode;
      submitTable(this.form).then(res => {
        
          if(res.data.errno == "0"){
                this.$router.push({path:'/login/registerStatus/success'});
          } 
        }).catch(r =>{
        Toast(r.data.errmsg);
        });

    },
    // 重新获取验证码 
    getCode(){
      if( this.mobile == ''){
        Toast.fail('手机号不能为空')
        return
      }else{
        this.counting = true;
        this.tel.mobile = this.mobile;
        findTelcode(this.tel).then(res => {
          Toast.success(res.data.errmsg)
        });
      }
    },
    // 倒计时结束
    finished() {
      this.counting = false;
    }
  },
  components: {
    [field.name]: field,
    [Toast.name]: Toast,
    [CountDown.name]: CountDown,
    [fieldGroup.name]: fieldGroup
  }
};
</script>


<style lang="scss" scoped>
@import '../../../assets/scss/mixin';
.body{
  margin-top:50px;
}
.register_submit {
  padding-top: 40px;
  background-color: #fff;
}

.register_submit_btn {
  padding-top: 30px;
}
.item{
  color:red;
}
.error{
  width: 100%;
  height: 20px;
  color: red;
  padding-left: 40px;
}
.getCode {
  @include one-border(left);
  text-align: center;
}

.time_down {
  color: $red;
}

</style>
