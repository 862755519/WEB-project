<template>
  <div class="reset">
    <van-nav-bar
      :fixed="true"
      title="重置密码"
      left-arrow
      @click-left="onClickLeft"
    >
      <van-icon color="#333" name="arrow-left" slot="left" />
    </van-nav-bar>
    <!-- type="password" -->
    <div class="mar_top">
      <md-field-group class="foget_view">
        <md-field
          v-model="password"
          type="password"
          icon="lock"
          :is-error="isErrow"
          placeholder="请输入新密码"/>

        <md-field
          v-model="passwordRepeat"
          type="password"
          icon="lock"
          :is-error="isErrow"
          @blur="keyUp"
          placeholder="请再次输入密码" />
        <div class="red" v-show="isErrow">两次密码输入不一致</div>

        <div class="foget_submit">
          <van-button size="large" type="danger" @click="submitCode">重置</van-button>
        </div>
      </md-field-group>
    </div>
  </div>
</template>

<script>
import { resetPhone,authReset} from '@/api/api';
import field from '@/components/field/';
import fieldGroup from '@/components/field-group/';
import Vue from 'vue';
import { Toast } from 'vant';
Vue.use(Toast);
import { NavBar } from 'vant';
Vue.use(NavBar);

export default {
  data() {
    return {
      isErrow: false,
      password: '',
      passwordRepeat: '',
      parement:{
        password:'',
        mobile:'',
        code:''
      }
    };
  },
  created(){
  },
  methods: {
    onClickLeft(){
      this.$router.go(-1);
    },
    keyUp(){
      if( this.password != this.passwordRepeat ){
        this.isErrow = true;
      }else{
        this.isErrow = false;
      }
    },
    submitCode(){
      this.parement.mobile = this.$route.params.mobile
      this.parement.code = this.$route.params.code
      this.parement.password = this.passwordRepeat;
      console.log(this.parement);
      if( this.parement.mobile == '' || this.parement.code == "" || this.parement.password == ''){
        Toast.fail("提交信息不能为空")
      }else{
        authReset(this.parement).then( res => {
          Toast.success(res.data.errmsg)
          this.$router.push({name:'login'})
        })

      }
    }
  },

  components: {
    [field.name]: field,
    [fieldGroup.name]: fieldGroup
  }
};
</script>

<style lang="scss" scoped>
div.foget_view {
  background-color: #fff;
  padding-top: 30px;
}
.mar_top{
  margin-top:50px;
}

div.foget_submit {
  padding-top: 30px;
  padding-bottom: 20px;
}
</style>
