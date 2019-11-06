<template>

 
  <div class="user_header" :style="{backgroundImage: `url(${background_image})`}">
   
    <!-- <van-icon name="set" class="user_set" @click="toSetting" /> -->

    <div class="head_img">
      <img :src="headimg" alt />
    </div>
    <div class="head_info">
        <span class="span1">{{username}}</span>
        <span class="span2">{{usertype}}</span>
      <p class="head_p">邀请码：{{usercode}}</p>
      <p class="head_p" v-if="quota">{{quota}}</p>
      <!-- <p class="head_p">一级会员名额：{{amount}} &nbsp; 个</p> -->
      <p class="head_p">抵扣券：{{sum}} &nbsp;张</p>
    </div>

    <div class="box">
      <div class="box_left">

      </div>
      <div  v-if="status" class="head_share" @click="$router.push({path: '/user/generalize'})">
        <img src="../../assets/images/tg.png" alt />推广中心
      </div>
    </div>
   
    
  </div>
</template>

<script>
import { selectUser } from '@/api/api';
import avatar_default from '@/assets/images/avatar_default.png';
import bg_default from '@/assets/images/user_head_bg.png';
import { getLocalStorage } from '@/utils/local-storage';
import {
  NavBar 
} from 'vant';

export default {
  components: {
   
    [NavBar.name]:NavBar,
  },
  name: 'user-header',

  props: {
    isLogin: {
      type: Boolean,
      default: false
    }
  },

  data() {
    return {
      nickName: '昵称',
      avatar: avatar_default,
      background_image: bg_default,
      username: '用户0001',
      usercode: 0,
      sum:0,
      quota:'',
      usertype: '普通会员',
      headimg: '',
      amount: 0,
      point:'',
      code:'',
      status:false//会员显示状态

    };
  },

  activated() {
    // this.getUserInfo();
    this.getUser();
  },
  created() {
    // this.getUser();
    this.getUser();
  },

  methods: {
    //退出登录
    toSetting() {
      this.$router.push({ name: 'user-information' });
    },

    // getUserInfo() {
    //   const infoData = getLocalStorage('nickName', 'avatar');
    //   this.avatar = infoData.avatar || avatar_default;
    //   this.nickName = infoData.nickName || '昵称';
    // },
    // toSetting() {
    //   this.$router.push({ name: 'user-information' });
    // },

    //获取个人等级信息及邀请码
    getUser() {
      selectUser().then(res => {
        this.username = res.data.data.nickName;
        this.point = res.data.data.point;
        this.usercode = res.data.data.code;
        this.sum = res.data.data.sum;
        this.quota = res.data.data.quota;
        this.headimg = res.data.data.avatar;
        this.amount = res.data.data.amount;
        var code = res.data.data.level;
        sessionStorage.setItem("level",code);
        switch (code) {
          case 0:
            this.usertype = '普通会员';
            this.status = false;
            break;
          case 1:
            this.usertype = '事业合伙人';
            this.status = true;
            break;
          case 2:
            this.usertype = '华商汇合伙人';
            this.status = true;
            break;
          case 3:
            this.usertype = '运营中心';
            this.status = true;
            break;
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.share{

 position:fixed;
  width: 100%;
  height: 40px;
 top: 550px;
 text-align: right;
 
 border: 1px solid red;
}
.share img{
  width: 60px;height: 60px;
}
.user_set {
  position: absolute;
  top: 10px;
  right: 10px;
  font-size: 24px;
}
.user_header {
  background-repeat: no-repeat;
  background-size: cover;
  height: 170px;
  color: #fff;
  
}

.head_share img {
  width: 18px;
  height: 16px;
}
.head_p { 
  width: 100%;
  height: 20px;
  margin-bottom:0;
  font-size: 12px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.span1 {
  // float: left;
  display: inline-block;
  width: 50%;
  font-size: 15px;
  // width:120px;
  overflow: hidden; 
  white-space: nowrap; 
  text-overflow: ellipsis;
}
.span2 {
  float: right;
  border: 1px solid #fff;
  display: block;
  width: 43%;
  font-size: 14px;
  border-radius: 10px;
  text-align: center;
 
  float: right;
}
.head_info {
  // border:2px solid #fff;
  // padding: 3px;
  margin-left: 5px;
  width: 70%;
  height: 100px;
  // padding-left: 10px;
  float: left;
  margin-top: 35px;
  text-align: left;
}
.box{
  
  width: 100%;
  float: left;
  height: 28px;
  // border:1px solid green;
}
.box_left{
  width: 70%;
  float: left;
  height: 25px;
  // border:1px solid #fff;
}
.head_share {

  width: 26%;
  height: 23px;
  border: 1px solid #ffffff;
  // margin-top: 120px;
 
  margin-right:10px;
  font-size: 13px;
  float: left;
  border-radius: 18px;
  display: flex;
  text-align: center;
  align-items: center;
  justify-content: center;
}

.head_img {
  width: 20%;
  height: 70px;
  float: left;
  margin-right: 10px;
  margin-top: 50px;

}
.head_img img {
  width: 60px;
  height: 60px;
  margin-left: 15px;
  border-radius: 30px;
}
</style>
