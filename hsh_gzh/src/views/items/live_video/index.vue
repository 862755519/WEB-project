<template>
  <div class="live">
    <van-nav-bar
      :fixed="true"
      :z-index='999'
      title="直播"
      left-arrow
      @click-left="onClickLeft"
    >
      <van-icon color="#333" name="arrow-left" slot="left"/>
    </van-nav-bar>      
    <div class="box">
        <!-- 视频直播 -->
         <!-- 1. 使用video视频播放 -->
        <!-- <video class="video" autoplay loop  muted  poster="../../../assets/images/group_head.png" >   
            <source class="source" src="./movie.mp4"  type="video/mp4">
        </video> -->
        
        <!-- 2. 使用TcPlayer.js -->
        <div id="videoBox" style="width:100%; height:auto;"></div>

        <!-- 3.使用 TcPlayer 播放器  -->
        <!-- <TcPlayer 
          :width="width" 
          :height="height" 
          :options="options" 
          :autoplay="autoplay" 
          :volume="volume"
          @playerTarget="watchPlayer" 
          ref="player">
        </TcPlayer> -->

        <!-- 用户头像 -->   
        <div class="user_info">     
            <div class="head_left">
                <img  class="user_img" :src="userInfo.user.avatar" >
            </div>
            <div class="head_right">
                <div class="nickNme">{{userInfo.user.nickname}}</div>
                <div class="number"><van-icon   color="red" name="fire-o" /> {{userInfo.broadcast.bdCount}}人</div>
                <div class="tubiao">
                    <van-icon v-show="userInfo.state == 1" size="30px" color="red" name="add-o" />
                    <van-icon v-show="userInfo.state == 0" size="30px" color="red" name="fire-o" />
                </div>
            </div>  
        </div>
        <!-- 粉丝头像 -->
        <div class="ches">
            <div class="ches_img">
                <img class="c_img" v-for="item in userInfo.images" :key="item" :src="item.picUrl" >              
            </div>
            <div class="del_icon">
                <van-icon size="30px"  color="red" name="close" />
            </div>
        </div>
        <!-- 底部爱心模块 -->
        <div class="box_love">
            <!-- 爱心 -->
            <div class="love" @click="loveing">
                <img v-show="userInfo.state == 1" class="love_img" src="../../../assets/images/ax.png" alt="">
                <img v-show="userInfo.state == 0" class="love_img2" src="../../../assets/images/ax.png" alt="">
            </div>

            <!-- 礼物 -->
            <div class="gift">
                <img  class="gift_img" src="../../../assets/images/gift.png" alt="">
            </div>
        </div>
        
    </div>
  </div>
</template>

<script>
    import Vue from 'vue';
    import TcPlayer from 'vue-tcplayer';
    import { read, spotFollow } from '@/api/api';
    import { Card, List,NavBar,Image,Icon   } from 'vant';
    import { Swipe, SwipeItem } from 'vant';

    Vue.use(Swipe).use(SwipeItem);
    import scrollFixed from '@/mixin/scroll-fixed';

    export default {
    mixins: [scrollFixed],
    data() {
        return {
            liveId:'',
            userInfo:{
                state:''
            },
            love_show: false,
            love_show1: true,
        };
    },

    created() {
        this.liveId = this.$route.query.id;
        this.init();
        // var player =  new TcPlayer('id_test_video', {
        // "m3u8": "http://1258903788.vod2.myqcloud.com/293d5dd5vodcq1258903788/347ae9ae5285890794412503359/playlist.m3u8",
        // "flv": "resources/mov_bbb.flv", //增加了一个 flv 的播放地址，用于PC平台的播放 请替换成实际可用的播放地址
        // "autoplay" : true,      //iOS 下 safari 浏览器，以及大部分移动端浏览器是不开放视频自动播放这个能力的
        // "poster" : "resources/kqyx.png", 
        // "width" :  '100%',//视频的显示宽度，请尽量使用视频分辨率宽度
        // "height" : '100%'//视频的显示高度，请尽量使用视频分辨率高度
        // });
   },

    methods: {

        // play(){
        //     this.$refs.player.play()
        // },
        // setCurrentTime(){
        //     this.$refs.player.setCurrentTime(60*12)
        // },
        // isFullScreen(){
        //     console.log(this.$refs.player.isFullScreen());
        // },
        // watchPlayer(player){
        //     player.on("loadstart",(msg)=>{
        //             console.log("开始加载视频了");
        //     }) 
        //     player.on("resolutionswitched",(msg)=>{
        //         console.log("清晰度切换了");
        //     })
        //     player.on("pause",(msg)=>{
        //         console.log("视频已暂停");
        //     })
        //     player.on("error",(msg)=>{
        //         console.log(msg);
        //     })
        //     player.on("timeupdate",(msg)=>{
        //         console.log(msg);
        //     })
        //     player.on("ended",(msg)=>{
        //         console.log("视频结束了");
        //     })
        // },

        onClickLeft() {
            this.$router.go(-1);    
        },
        // 直播页面数据
        init(){
            read({id:this.liveId}).then(res =>{
                this.userInfo = res.data.data; 
                console.log(res.data.data);
            })
        },
        // 点击爱心关注
        loveing(){
            spotFollow({id:this.liveId}).then( res => {
                console.log(res.data.data);

                if(this.userInfo.state == 0){
                    this.userInfo.state = 1
                }else{
                    this.userInfo.state = 0
                }  
                this.init();
            }) 
        }
       
    },

    components: {
        [List.name]: List,
        [Icon.name]: Icon,
        [Image.name]: Image,
        [NavBar.name]:NavBar, 
        [Card.name]: Card,
        TcPlayer
        // [TcPlayer.name]: TcPlayer
    }
    };
</script>

<style lang="scss" scoped>
.live {
 .box{
        margin-top: 10%;
    .video{ 
        width: 100%;
        height: 94.3%;
        // border:1px solid block;    
        // background-color: green;
        z-index: 1;
        position: absolute;
    }
    .source{
        width: 100%;
        height: 100%;
    }
 }
  
  .user_info{
      float: left;
      width: 50%;
      height: 40px;
      border: 1px solid #fff;
      border-radius: 15px;
      padding-left: 5px;
      z-index: 9999;
      position: relative;
      top: 20px;
      left: 10px;
      opacity: 1;
    //   background-color: #000000;
      color: #000;
      .head_left{
          float: left;
          .user_img{
              width: 37px;
              height: 37px;
              border-radius: 50%;
          }
      }
      .head_right{
          width: 70%;
          float: left;
          margin-left: 5px;
          .tubiao{
            //   border:1px solid #fff;
              color: red;
              font-size: 20px;
              margin-top:-30px;
              float: right;
          }
      }
  }
  .ches{
      float: right;
      width: 42%;
      height: 40px;
    //   border: 1px solid #FFF;
      z-index: 9999;
      position: relative;
      top: 20px;
      left: 0px;
      opacity: 1;

      .ches_img{
          
        float: left;
        width: 73.5%;
        overflow-x: scroll;  
        overflow-y: hidden;  /* 超出内容不可见 */ 
        white-space: nowrap; 

      }
      .c_img{
          margin-left: 8px;
          width: 36px;
          height: 36px;
          border-radius: 50%;
      }
      .del_icon{
        float: right;
        margin-top: 10px;
        margin-right:5px;
      }
  }
  
  .box_love{
      width: 100%;
      height: 50px;
      position: fixed;
      bottom: 90px;
      z-index: 9999;
        .love{
            margin-left: 10px;
            float: left;
            // border: 1px solid red;
        }
        .love_img{
            // border: 1px solid green;
            width: 42px;
            height: 42px;
        }
        .love_img2{
            // border: 1px solid green;
            width: 42px;
            height: 42px;
            // margin-left:20px;
            background-color:red;   
            border-radius: 50%;
        }
        
        .gift{
            margin-right: 10px;
            float: right;
            // border: 1px solid red;
        }
        .gift_img{
            width: 42px;
            height: 42px;
        }
  }
  .nickNme{
            width: 70%;
            height: 20px;
            color: #969696;
            color: 12px;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          }
    .number{
         width: 70%;
        height: 20px;
        color: #969696;
        color: 12px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }

 

    
 
}
</style>