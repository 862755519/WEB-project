<template>
  <div class="container">
    <van-nav-bar title="绑定资料" left-arrow @click-left="onClickLeft" >
      <van-icon color="#333" name="arrow-left" slot="left" />
    </van-nav-bar>
    <div class="head border">
      <div class="head_text">头像</div>
      <div class="head_img" >
        
        <van-uploader :afterRead="afterRead">
          <div class="user_avatar_upload">
            <img
              id = "head_img"
              class="binHead"
              :src="bind.avatar + '?x-oss-process=image/resize,m_fill,h_120,w_120'"
              alt="你的头像"
              v-if="bind.avatar"
            >
            <van-icon name="camera_full" v-else></van-icon>
          </div>
        </van-uploader>
        </div> 
      <!-- <div class="head_img" v-show="img_show"></div> -->
    </div>

    <div class="info">
      <div class="info_title">昵称</div>
      <input type="text" class="info_text" v-model="unick" :placeholder="unick" />
    </div>
    <div class="line"></div>
    <div class="info ">
      <div class="info_title">姓名</div>
      <input type="text" class="info_text" v-model="uname" :placeholder="uname" />
    </div>
    <!-- <div class="info border">
      <div class="info_title">重置密码</div>
      <div class="info_text"></div>
      
    </div>-->

    <div class="info">
      <div class="info_title">手机号</div>
      <div class="info_text">{{tel}}</div>
    </div>
    <div class="line"></div>
    <div class="info ">
      <div class="info_title">生日</div>
      <input type="text" class="info_text" v-model="ubirthday" :placeholder="ubirthday" @click="selecttime"/>
    </div>

    <div class="info ">
      <div class="info_title">性别</div>
      <input type="text" class="info_text" v-model="ugender" :placeholder="ugender" @click="selectGender"/>
    </div>

    <div class="info ">
      <div class="info_title">邮箱</div>
      <input type="text" class="info_text" v-model="uemail" :placeholder="uemail" />
    </div>

    <div class="info">
      <div class="info_title">常住地</div>
      <input type="text" class="info_text" v-model="uaddress" :placeholder="uaddress" />
    </div>

    <router-link class="button_div" to="/Bind" tag="div">
      <button class="button" @click="submit">确认绑定</button>
    </router-link>
      
 <!-- 选择性别 -->
    <van-popup 
  v-model="genderShow"
  round
  position="bottom"
  :style="{ height: '20%' }"
>
<van-radio-group v-model="radio">
  <van-radio name="男" class="gender1" @click="onGender(man)">{{man}}</van-radio>
  <div class="line_gender"></div>
  <van-radio name="女" class="gender2" @click="onGender(wman)">{{wman}}</van-radio>
</van-radio-group>
    </van-popup>

    <!-- 选择日期 -->
    <van-popup class="popup_gender"
  v-model="dateShow"
  round
  position="bottom"
  :style="{ height: '40%' }"
>
<van-datetime-picker
  v-model="currentDate"
  type="date"
  :min-date="minDate"
   :formatter="formatter"
   @confirm = "confirm"
   @cancel = "cancel"
/>
    </van-popup>

  </div>
</template>
<script>
import { findUserinfo, upLoading, bindUser ,changeHead} from '@/api/api';
import Vue from 'vue';
import { Cell, CellGroup, Uploader,Popup,RadioGroup, Radio,DatetimePicker } from 'vant';

import {
  Swipe,
  SwipeItem,
  Button,
  NavBar,
  NoticeBar,
  List,
  Tag,
  Tabbar,
  TabbarItem,
  Dialog,
  Toast
} from 'vant';
import { log } from 'util';
Vue.use(Cell).use(CellGroup);
export default {
  // 引入的组件
  components: {
    [NavBar.name]: NavBar,
    [DatetimePicker.name]:DatetimePicker,
    [RadioGroup.name]:RadioGroup,
    [Radio.name]:Radio,
    [Popup.name]:Popup,
    [Dialog.name]: Dialog,
    [Uploader.name]: Uploader,
    [Swipe.name]: Swipe,
    [SwipeItem.name]: SwipeItem,
    [NoticeBar.name]: NoticeBar,
    [List.name]: List,
    [Tag.name]: Tag,
    [Tabbar.name]: Tabbar,
    [TabbarItem.name]: TabbarItem,
    [Toast.name]:Toast,
  },
  data() {
    return {
      minDate: new Date(1900,10,1),
      maxDate: new Date(2050, 10, 1),
      currentDate: new Date(),
      man:"男",
      wman:"女",
      radio: '',
      genderShow:false,
      dateShow:false,
      fileList: [
        { url: '' },
     
      ],
      
      uid: '',
      uhead: '', //头像
      unick: '', //昵称
      uname: '', //姓名
      ubirthday: '', //生日
      ugender: '', //性别
      uemail: '', //邮箱
      uaddress: '', //地址
      tel: '', //手机号码
      up: {
        file: ''
      },
      bind: {
        id: '',
        avatar: '',
        nickname: '',
        birthdays: '',
        gender: '',
        mailbox: '',
        address: '',
        realname: '',
      }
    };
  },
  created() {
    this.getinfo();
  },
  methods: {
    selecttime(){
      this.dateShow = true;
    },
    confirm(e){
      
     
       var date = e;
       var day = e.getDate();
       var month = e.getMonth()+1;
       
       if(day<=9){
      
          day = "0"+day;
       }
       if(month<=9){
       
          month = "0"+month;
       }
        
       var year = e.getFullYear();	
       var time = year+"-"+month+"-"+day;
      
       this.ubirthday = time;
       this.dateShow = false;
    },
    cancel(){
       this.dateShow = false;
    },
    formatter(type, value) {
      if (type === 'year') {
        return `${value}年`;
      } else if (type === 'month') {
        return `${value}月`
      } else if(type === 'day'){
        return `${value}日`
      }
      return value;
    },
    selectGender(){
      this.genderShow = true;
    },
    onGender(e){
     
      this.ugender = e;
      this.genderShow = false;
    },
    //提交
    submit() {
      this.bind.id = this.uid;
      this.bind.avatar = this.uhead;
      this.bind.nickname = this.unick;
      this.bind.birthdays = this.ubirthday;
      if (this.ugender == '男') {
        this.bind.gender = '1';
      } else if (this.ugender == '女') {
        this.bind.gender = '2';
      } else {
        this.bind.gender = '0';
      }
      this.bind.mailbox = this.uemail;
      this.bind.address = this.uaddress;
      this.bind.realname = this.uname;
      console.log(this.uid);
      console.log(this.uname);
      console.log(this.bind);
      console.log(this.uemail);
      this.bindUserinfo();
    },
    //提交用户信息请求
    bindUserinfo() {
      console.log(this.bind);
      bindUser(this.bind).then(res => {
        Dialog.alert({
          message: '提交成功'
        }).then(() => {
          // on close
        });
         this.$router.push(
           {
              path:'/user',
              params: {
                code: 111
              }
          });
      });
    },

    //上传图片调用
    afterRead(file) {
      this.uploadImg(file.file);
    },
    /**
     * 上传图片之前判断图片是否符合条件
     */
    beforeRead(file) {
      if (file.type !== 'image/jpeg' && file.type !== 'image/png') {
        // Toast('请上传 jpg/png 格式图片');
        Toast(
          '请上传jpg/png格式图片'
        )
        return false;
      }
      let isLt1M = file.size / 1024 / 1024 <= 5;
      if (!isLt1M) {
        //  Toast('图片大小5M以内');
       Toast('请上传5M以内图片')        
        return false;
      }
      return true;
    },
    /**
     * 上传图片
     */
    uploadImg(file) {
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
      let url =process.env.VUE_APP_BASE_API+'/wx/storage/upload';
      axiosAjax
        .post(url, formdata1, config)
        .then(res => {
          //这里的url为后端接口
          console.log(res.data.data);
          console.log(res.data.data.url);
          this.uhead = res.data.data.url;
          this.bind.avatar = this.uhead;
          //res 为接口返回值
            // Dialog.alert({
            //   message: '图片上传成功'
            // }).then(() => {
            //   // on close
            // });
        })
        .catch(r => {
          console.log(r);
        });
    },

    //导航返回
    onClickLeft() {
      
      this.$router.go(-1);
    },
    //获取用户信息
    getinfo() {
      findUserinfo().then(res => {
        console.log('获取数据');
        console.log(res);
        console.log(res.data.data);
        this.uhead = res.data.data.avatar;
        this.unick = res.data.data.nickname;
        this.uname = res.data.data.realname;
        this.ubirthday = res.data.data.birthday;
        var genderType = res.data.data.gender;
        this.uemail = res.data.data.mailbox;
        this.uaddress = res.data.data.address;
        this.tel = res.data.data.mobile;
        this.uid = res.data.data.id;
        this.bind.avatar = res.data.data.avatar;
       
        this.fileList[0].url = res.data.data.avatar;
        if (genderType == 1) {
          this.ugender = '男';
        } else if (genderType == 2) {
          this.ugender = '女';
        }
      });
    }
  }
};
</script>
<style scoped>

/* .user_avatar_upload{
  display:block;
  border:1px solid green;
  margin-top: 30px;
  margin-left: 30px;
} */
.binHead{
  display:block;
  width: 100%;
  height: 70px;
  border-radius:10px;
  border:1px solid #ccc;
  
}
.popup_gender{
  padding-top: 15px;
}
.line_gender{
  width: 90%;
  height: 1px;
  background: #e4e4e4;
  margin: auto;
  margin-top: 10px;
}
.gender1{
  width: 60px;
  margin: auto;
  font-size: 18px;
  margin-top: 50px;
  text-align: center;
}
.gender2{
  width: 60px;
  margin: auto;
  font-size: 18px;
  margin-top: 10px;
  text-align: center;
}
.container {
  background: #ffffff;
}
.button_div {
  text-align: center;
  margin-top: 15%;
  widows: 100%;
  height: 50px;
}
.button {
  width: 90%;
  height: 45px;
  background: #db3d3c;
  border: 1px solid #db3d3c;
  border-radius: 5px;
  color: #ffffff;
}
.exit{
   width: 90%;
  height: 45px;
  background: #db3d3c;
  border: 1px solid #db3d3c;
  border-radius: 5px;
  color: #ffffff;
  
}
.line {
  width: 100%;
  height: 10px;
  background: #f9f9f9;
}
.info {
  width: 90%;
  height: 45px;
  margin: auto;
}
/* .border {
  margin-top:50px;
  border-bottom: 1px solid #e4e4e4;
} */
.info_title {
  width: 25%;
  height: 45px;
  float: left;
  line-height: 45px;
  text-align: left;
  color: #666666;
  font-size: 18px;
}
.info_text {
  width: 72%;
  height: 43px;
  float: left;
  line-height: 45px;
  text-align: right;
  color: #333333;
  font-size: 15px;
  border: none;
}
.head {
  width: 90%;
  height: 80px;
  margin: auto;
  border-bottom: 1px solid #e4e4e4;
}
.head_text {
  width: 25%;
  height: 80px;
  line-height: 70px;
  font-size: 16px;
  color: #333333;
  text-align: left;
  float: left;
}
.head_img {
  width: 75px;
  height: 75px;
  float: left;
  border-radius: 8px;
  overflow: hidden;
  margin-left: 48%;
  text-align: center;
  line-height: 75px;
}
</style>

