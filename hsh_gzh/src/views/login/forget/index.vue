<template>
  <div class="forget">
    <van-nav-bar
      :fixed="true"
      title="忘记密码"
      left-arrow
      @click-left="onClickLeft"
    >
      <van-icon color="#333" name="arrow-left" slot="left" />
    </van-nav-bar>
    <div class="mar_top">
      <md-field-group class="foget_view">
        <md-field
          v-model="mobile"
          icon="mobile"
          placeholder="请输入手机号"/>

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
          <van-button size="large" type="danger" @click="submitCode">下一步</van-button>
        </div>
      </md-field-group>
    </div>
  </div>
</template>

<script>
import { authCaptcha} from '@/api/api';
import field from '@/components/field/';
import fieldGroup from '@/components/field-group/';
import Vue from 'vue';
import { NavBar,CountDown, Toast } from 'vant';
Vue.use(NavBar);
Vue.use(CountDown);
Vue.use(Toast);

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
        this.$router.push(
         { 
          name: 'forgetReset',
          params:{
  　　      mobile:this.mobile,
            code:this.code,
  　　    }
         });
      }
    },
    getCode() {
      // 获取验证码
      if(this.mobile === ''){
        this.$toast.fail('请输入手机号码');
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
    // 倒计时结束
    finished() {
      this.counting = false;
    },
  },

  components: {
    [field.name]: field,
    [fieldGroup.name]: fieldGroup
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
.item{
  color:red;
}

div.foget_submit {
  padding-top: 30px;
  padding-bottom: 20px;
}

.getCode {
  @include one-border(left);
  text-align: center;
}

.time_down {
  color: $red;
}
</style>
