<template>
  <div class="container">
  <van-nav-bar
    title="邀请好友"
    left-arrow
    :fixed="true"
    @click-left="onClickLeft"
  >
    <van-icon color="#333" name="arrow-left" slot="left" />
  </van-nav-bar>
  <div class="box"></div>
  <div class="marg_top">
    <div class="qrcode">
      <p class="down_p1">扫码下载</p>
      <div class="down_img" id="qrcode"></div>
      <p class="down_p2">我的邀请码</p>
      <p class="down_p3">{{code}}</p>
    </div>
    <div class="down_but">
        <button  @click="shareHref">分享给好友</button>
        
    </div>
    <div v-show = "false">
      <p>链接地址：</p>
      <input id="sharehref" type="url" :value="link" />
      <p>链接标题：</p>
      <input id="sharehrefTitle" type="text" value="华商汇" />
      <p>链接描述：</p>
      <input id="sharehrefDes" type="text" value="华商汇APP下载" />
    </div>
  </div>
  
   
		<!-- <button type="button" @click="shareHref"> 分享链接</button> -->
  </div>
</template>
<script>
import QRCode from "qrcodejs2";
import {getShare} from '@/api/api';
import Vue from "vue";
import { Cell, CellGroup,Rate  } from "vant";

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
  Toast,
   Tab, Tabs,Row, Col,
} from "vant";
import { log } from 'util';
Vue.use(Cell).use(CellGroup);
export default {
  // 引入的组件
  components: {
    [Row.name]:Row,
    [Col.name]:Col,
    [Tab.name]:Tab,
    [Tabs.name]:Tabs,
    [NavBar.name]: NavBar,
    [Swipe.name]: Swipe,
    [SwipeItem.name]: SwipeItem,
    [NoticeBar.name]: NoticeBar,
    [List.name]: List,
    [Tag.name]: Tag,
    [Tabbar.name]: Tabbar,
    [TabbarItem.name]: TabbarItem,
    [Toast.name]: Toast,
    [QRCode.name]:QRCode,
    [Rate.name]:Rate,
  },
  data() {
    return{
      shares :{},
      active:0,
      code:"",
      link: 'http://www.kmfhi.com',
      value:3,
    }
  },
  mounted(){
        var that=this;
        var Intent=null,File=null,Uri=null,main=null;
        // H5 plus事件处理
        function plusReady(){
          that.updateSerivces();
          if(plus.os.name=="Android"){
              main = plus.android.runtimeMainActivity();
              Intent = plus.android.importClass("android.content.Intent");
              File = plus.android.importClass("java.io.File");
              Uri = plus.android.importClass("android.net.Uri");
          }
        }
        if(window.plus){
            plusReady();
        }else{
            document.addEventListener("plusready",plusReady,false);
        }
  },
 created(){
    this.getShareInfo();
   
 },
  
  methods: {
    
    //导航返回
      onClickLeft() {
        this.$router.go(-1);
      },

      updateSerivces() {
        var that=this;
          plus.share.getServices(function(s) {
            for (var i in s) {
              var t = s[i];
              that.shares[t.id] = t;
            }
          }, function(e) {
            
            // alert("获取分享服务列表失败：" + e.message);
          });
      },
      shareAction(sb, bh) {
				if (!sb || !sb.s) {
					
					return;
				}

				var msg = {
					content: sharehrefDes.value,
					extra: {
						scene: sb.x
					}
				};
				if (bh) {
					msg.href = sharehref.value;
					if (sharehrefTitle && sharehrefTitle.value != "") {
						msg.title = sharehrefTitle.value;
					}
					if (sharehrefDes && sharehrefDes.value != "") {
						msg.content = sharehrefDes.value;
					}
					msg.thumbs = ["_www/logo.png"];
					msg.pictures = ["_www/logo.png"];
				} else {
					if (pic && pic.realUrl) {
						msg.pictures = [pic.realUrl];
					}
				}
				// 发送分享
				if (sb.s.authenticated) {
				
					this.shareMessage(msg, sb.s);
				} else {
				
					sb.s.authorize(function() {
						this.shareMessage(msg, sb.s);
					}, function(e) {
						
						// alert("认证授权失败：" + e.code + " - " + e.message);

					});
        }
        },
        shareMessage(msg, s) {

				// alert(JSON.stringify(msg));
				s.send(msg, function() {
					

				}, function(e) {
				
					// alert("分享到\"" + s.description + "\"失败: " + JSON.stringify(e));

				});
      },
      shareHref() {
        var xx=this;
				var shareBts = [];
				// 更新分享列表
				var ss = this.shares['weixin'];
				ss && ss.nativeClient && (shareBts.push({
						title: '微信朋友圈',
						s: ss,
						x: 'WXSceneTimeline'
					}),
					shareBts.push({
						title: '微信好友',
						s: ss,
						x: 'WXSceneSession'
					}));
				// ss = this.shares['qq'];
				// ss && ss.nativeClient && shareBts.push({
				// 	title: 'QQ',
				// 	s: ss
				// });
				// 弹出分享列表
				shareBts.length > 0 ? plus.nativeUI.actionSheet({
					title: '分享链接',
					cancel: '取消',
					buttons: shareBts
				}, function(e) {
					(e.index > 0) && xx.shareAction(shareBts[e.index - 1], true);
        }) : plus.nativeUI.Toast('当前环境无法支持分享链接操作!');
      },
      //获取二维码信息
      getShareInfo(){
        getShare().then(res => {
          console.log(res);
          console.log(res.data.data);
          console.log(res.data.data.list.toAndroidUrl);
          this.link = res.data.data.list.toDownload;
          // alert(this.link);
          this.code = res.data.data.code;
          this.qrcode();
          
        });
      },

      qrcode() {
          let that = this;
          let qrcode = new QRCode('qrcode', {
              width: 240,
              height: 240,        // 高度
              text: this.link,   // 二维码内容
              render: 'canvas' ,   // 设置渲染方式（有两种方式 table和canvas，默认是canvas）
              background: '#f0f',   // 背景色
              foreground: '#ff0'    // 前景色
          })
      },
      
  }
};
</script>
<style scoped>
.box{
  height: 30px;
}
.marg_top{
  margin-top:70px;
}
.down_but{
    width: 100%;
    height: 50px;
    margin-top: 40px;
    text-align: center;
}
.down_but button{
    width: 80%;
    height: 45px;
    border: 1px solid #db3d3c;
    background: #db3d3c;
    color: white;
    font-size: 16px;
    border-radius: 5px;
}
.down_p1{
    font-size: 18px;
    color: #121922;
    text-align: center;
}
.down_p2{
    font-size: 16px;
    color: #333333;
    text-align: center;
}
.down_p3{
    font-size: 16px;
    color: red;
    text-align: center;
}
.down_img{
    width: 240px;
    height: 240px;
    margin: 20px auto;
}
.down_img img{
    width: 240px;
    height: 240px;
}
.qrcode{
    
    width: 80%;
    height: 400px;
    border: 1px solid #ffffff;
    background: #ffffff;
    border-radius: 10px;
    margin: auto;
    margin-top: 30px;
}
.download{
    width: 90%;
    font-size: 15px;
    text-align: center;
    color: #4492FF;
    margin: auto;
    margin-top: 25px;
    word-wrap:break-word; overflow:hidden;
}
.download a{
    font-size: 15px;
    color: #4492FF;
}

</style>

