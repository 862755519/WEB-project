<template>
  <div class="user_information">
    <van-nav-bar title="退出登录" :fixed="true" left-arrow @click-left="onClickLeft" >
      <van-icon color="#333" name="arrow-left" slot="left" />
    </van-nav-bar>
    <div class="marg_top">
      <van-cell-group>
        <van-cell title="头像" class="cell_middle">
          <van-uploader :afterRead="avatarAfterRead">
            <div class="user_avatar_upload">
              <!-- <img
                :src="avatar + '?x-oss-process=image/resize,m_fill,h_80,w_80'"
                alt="你的头像"
                v-if="avatar"
              > -->
              <van-image
                width="50"
                height="50"
                fit="fill"
                v-if="avatar"
                :src="avatar + '?x-oss-process=image/resize,m_fill,h_80,w_80'"
              />
              <van-icon name="camera_full" v-else></van-icon>
            </div>
          </van-uploader>
        </van-cell>

        <van-cell title="昵称"  :value="nickName" />
        <van-cell title="性别" :value="genderText" />
        <van-cell title="密码设置" to="/user/information/setPassword" isLink/>
        <van-cell title="手机号"  :value="mobile" ></van-cell>

      </van-cell-group>
      <div class="but_div">
      <van-button size="large" class="user_quit" @click="loginOut">退出当前账户</van-button>
      </div>
      <van-popup v-model="showSex" position="bottom">
        <van-picker
          showToolbar
          :columns="sexColumns"
          title="选择性别"
          @cancel="showSex = false"
          @confirm="onSexConfirm"
        />
      </van-popup>

    </div>

  </div>
</template>

<script>
import { Uploader, Picker, Popup, Button,NavBar,Image  } from 'vant';
import { removeLocalStorage } from '@/utils/local-storage';
import { getLocalStorage } from '@/utils/local-storage';
import { authInfo, authLogout, authProfile,changeHead } from '@/api/api';

export default {
  data() {
    return {
      sexColumns: [
        {
          values: ['保密', '男', '女'],
          defaultIndex: 0
        }
      ],
      showSex: false,
      avatar: '',
      nickName: '',
      gender: 0,
      mobile: ''
    };
  },

  computed: {
    genderText() {
      const text = ['保密', '男', '女'];
      return text[this.gender] || '';
    }
  },

  created() {
    this.getUserInfo();
  },

  methods: {
      //导航返回
    onClickLeft() {
      this.$router.go(-1);
    },
    avatarAfterRead(file) {
     
      this.uploadImg(file.file)
    },
    uploadImg(file) {
      var that=this;
      // 创建form对象
      let formdata1 = new FormData();
      // 通过append向form对象添加数据,可以通过append继续添加数据
      //或formdata1.append('file',file);
      formdata1.append('file', file, file.name);
      //设置请求头
      let config = {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      };
      //this.axios 是因为在main.js写在vue实例里
      const axiosAjax = this.axios.create({
        timeout: 1000 * 60, //时间
        withCredentials: false //跨域携带cookie
      });
      let url = process.env.VUE_APP_BASE_API+'/wx/storage/upload';
      axiosAjax
        .post(url, formdata1, config)
        .then(res => {
          //这里的url为后端接口
          console.log(res.data.data);
          console.log(res.data.data.url);
          let uhead = res.data.data.url;
          that.avatar = uhead;
          //res 为接口返回值
            // Dialog.alert({
            //   message: '图片上传成功'
            // }).then(() => {
            //   // on close
            // });

            that.updateHead(uhead);
        })
        .catch(r => {
          console.log(r);
        });
    },
    updateHead(img){
         changeHead({"image":img}).then(res =>{
           console.log(res);
           
         })


    },
    onSexConfirm(value, index) {
      this.showSex = false;
    },
    getUserInfo() {
      authInfo().then(res => {
        this.avatar = res.data.data.avatar;
        this.nickName = res.data.data.nickName;
        this.gender = res.data.data.gender;
        this.mobile = res.data.data.mobile;
      })
    },
    loginOut() {
      authLogout().then(res => {
        removeLocalStorage('Authorization')
        removeLocalStorage('avatar')
        removeLocalStorage('nickName')
        this.$router.push({ name: 'home' });
      });

    }
  },

  components: {
    [Button.name]: Button,
    [Uploader.name]: Uploader,
    [Picker.name]: Picker,
    [Popup.name]: Popup,
    [Image.name]: Image,
    [NavBar.name]:NavBar
  }
};
</script>


<style lang="scss" scoped>
.marg_top{
  margin-top:50px;
}
.user_information {
  .user_avatar_upload {
    position: relative;
    width: 50px;
    height: 50px;
    border: 1px solid $border-color;
    img {
      max-width: 100%;
      max-height: 100%;
    }
    i {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      font-size: 20px;
      color: $border-color;
    }
  }
  #head_img{
    width: 120px;
    height: 120px;
    border-radius: 5px;
  }
  .user_quit {
    margin-top: 20px;
    width: 80%;
    background: #db3d3c;
    margin: 20px auto;
    color: #fff;
    height: 45px;
    border-radius: 5px;
    font-size: 15px;
  }
  .but_div{
   
    text-align: center;
   
  }
}
</style>
