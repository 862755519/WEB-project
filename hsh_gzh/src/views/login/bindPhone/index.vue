<template>
  <div class="forget">
    <van-nav-bar
      :fixed="true"
      title="绑定手机号"
    >
    </van-nav-bar>
    <div class="mar_top">
      <md-field-group class="foget_view">
        <md-field
          v-model="mobile"
          icon="mobile"
          placeholder="请输入手机号"/>

        <!-- <md-field
          v-model="code"
          icon="lock"
          placeholder="请输入短信验证码"
        >
          <div slot="rightIcon" @click="getCode" class="getCode red">
            <countdown v-if="counting" :time="60000" @countdownend="countdownend">
              <template slot-scope="props">{{ +props.seconds || 60 }}秒后获取</template>
            </countdown>
            <span v-else>获取验证码</span>
          </div>
        </md-field > -->

        <md-field v-model="code" icon="lock" placeholder="请输入验证码">
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

        <div class="foget_submit">
          <van-button size="large" type="danger" @click="submitCode">绑定手机号</van-button>
        </div>
      </md-field-group>
    </div>
  </div>
</template>

<script>
import { authCaptcha, bindMobile} from '@/api/api';
import field from '@/components/field/';
import fieldGroup from '@/components/field-group/';
import Vue from 'vue';
import { NavBar,Toast,CountDown } from 'vant';


export default {
  data() {
    return {
      counting: false,
      mobile: '',
      code: ''
    };
  },

  methods: {
    onClickLeft(){
      this.$router.go(-1);
    },
    submitCode() {
      if(this.mobile == '' || this.code == ''){
        Toast.fail("验证码不能为空")
        return 
      }else{
        bindMobile({mobile:this.mobile,code:this.code}).then(res =>{
          console.log(res);
          
          if(res.data.errno == 0){
            Toast.success(res.data.errmsg)

            this.$router.push(
            { 
              name: 'home',
              params:{
      　　      mobile:this.mobile,
              code:this.code,
      　　    }
            })

            // 存token
            window.localStorage.setItem("Authorization", res.data.data.token);
          }

        })
      }
    },
    
  
    // 倒计时结束
    finished() {
      this.counting = false;
    },
    // 重新获取验证码 
    getCode() {
      if(this.mobile === ''){
        Toast.fail('请输入手机号码');
        return
      }else{
        this.counting = true;
        if (this.counting) {
          authCaptcha({
            mobile: this.mobile,
            type: 'change-password'
          }).then(() => {
            this.$toast.success('发送成功');
            this.counting = true;
          }).catch(error => {
            this.$toast.fail(error.data.errmsg);
            this.counting = false;
          })
        }
      }
    },
    // countdownend() {
    //   this.counting = false;
    // }
  },

  components: {
    [field.name]: field,
    [NavBar.name]: NavBar,
    [fieldGroup.name]: fieldGroup,
    [Toast.name]: Toast,
    [CountDown.name]: CountDown,
  }
};
</script>

<style lang="scss" scoped>
@import '../../../assets/scss/mixin';
.mar_top{
  margin-top:50px;
}
div.foget_view {
  background-color: #fff;
  padding-top: 30px;
}

div.foget_submit {
  padding-top: 30px;
  padding-bottom: 20px;
}

.getCode {
  @include one-border(left);
  text-align: center;
}
.item{
  color:red;
}

.time_down {
  color: $red;
}
</style>
