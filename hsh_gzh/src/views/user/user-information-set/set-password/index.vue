<template>
  <div>
    <van-nav-bar
      :fixed="true"
      title="修改密码"
      left-arrow
      @click-left="onClickLeft"
    >
      <van-icon color="#333" name="arrow-left" slot="left" />
    </van-nav-bar>
    <van-cell-group class="mar-top">

      <van-field
        label="手机号"
        v-model="mobile"
        type="mobile"
        placeholder="请输入手机号码"
      />

			<van-field
				label="验证码"
				v-model="code"
				@click-icon="getCode"
				placeholder="请输入验证码">

        <van-button slot="button" size="small" type="danger" 	@click="getCode">
          <countdown v-if="counting" :time="60000" @countdownend="countdownend">
            <template slot-scope="props">{{ +props.seconds || 60 }}秒后获取</template>
          </countdown>
          <span v-else>获取验证码</span>
        </van-button>
			</van-field>

      <van-field
        label="新密码"
        v-model="password"
        type="password"
        placeholder="请输入新密码"
      />
    </van-cell-group>

    <div class="bottom_btn">
      <van-button size="large" type="danger" @click="modifypassword">保存</van-button>
    </div>
  </div>
</template>


<script>
import { authCaptcha, authReset, authLogout } from '@/api/api';
import { removeLocalStorage } from '@/utils/local-storage';
import { Field ,NavBar} from 'vant';

export default {
  data: () => ({
    password: '',
    mobile: '',
    code: '',
    counting: false
  }),

  methods: {
    //路由回退
    onClickLeft(){
      this.$router.go(-1);
    },
    // 保存按钮
    modifypassword() {
      if (this.passwordValid()) {
        authReset({
          password: this.password,
          mobile: this.mobile,
          code: this.code
        })
        .then((res) => {
          this.$toast.success(res.data.errmsg);
          this.$router.push({name:'login'});
          authLogout();
        }).catch( (res) =>{
          this.$toast.fail(res.data.errmsg);
        });
      }
    },
    passwordValid() {
      return true;
    },
    // 获取验证码
    getCode() {
      if(this.mobile === ''){
        this.$toast.fail('请输入手机号码');
        return false;
      }
      if(!(/^1[3456789]\d{9}$/.test(this.mobile))){ 
        this.$toast.fail("手机号码有误，请重填");  
        return false; 
      }

      if (!this.counting) {
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
    },
  },

  components: {
    [Field.name]: Field,
    [NavBar.name]: NavBar
  }
};
</script>


<style lang="scss" scoped>
@import '../../../../assets/scss/var';
@import '../../../../assets/scss/mixin';
.bottom_btn {
  padding: 30px 15px 0 15px;
}
.mar-top{
  margin-top:50px;
}
.verifi_code {
  @include one-border;
  padding-left: 10px;
  &::after {
    border-bottom: 0;
    border-left: 1px solid $border-color;
  }

  &_counting {
    color: $font-color-gray;
  }
}
</style>
