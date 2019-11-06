<template>
  <div class="live">
    <van-nav-bar
      :fixed="true"
      z-index=1000
      title="直播列表"
      left-arrow
      @click-left="onClickLeft"
    >
      <van-icon color="#333" name="arrow-left" slot="left" />
    </van-nav-bar>
    <div class="banner"></div>

    <van-list v-model="loading"
              :finished="finished"
              :immediate-check="false"
              finished-text="没有更多了"
              @load="getNewtList">

        <div class="box" v-for="item in liveList" :key="item">
          <!-- 视频截图 -->
          <div class="box_left" @click="go_video(item.id)">
            <van-image
              fit="fill"
              class="live_img"
              :src="item.bdBanner"
            />
            <div class="live_ing" v-show="item.bdState == 1"><van-icon class="live_icon" color="red" name="logistics" />&nbsp;直播中</div>
            <div class="live_ing" v-show="item.bdState == 0"><van-icon class="live_icon" color="red" name="replay" />&nbsp;直播未开始</div>
            <div class="live_ing" v-show="item.bdState == -1"><van-icon class="live_icon" color="red" name="stop" />&nbsp;回放中</div>
          </div>
          <!-- 右侧顶部头像 -->
          <div class="box_right">
            <p class="title">{{item.bdTitle}}</p>
            <div class="head">
              <div class="head_left">
                <van-image
                  round
                  fit="fill"
                  width="100%"
                  height="100%"
                  :src="item.user.avatar"
                />
              </div>
              <div class="head_right">
                <div class="nickNme">{{item.user.nickname}}</div>
                <div class="number"><van-icon class="fire" color="red" name="fire-o" />{{item.bdCount}}人</div>
                <div class="store">主播的小店></div>
              </div>
            </div>
            <!-- 右侧底部商品列表 --> 
            <div class="goods" >
              <van-image
                v-for="items in item.litemallGoods" :key="items"
                class="good_img"
                width="32%"
                height="57"
                fit="contain"
                @click="go_search(item.uId)"
                :src="items.picUrl"
              />
            </div>
          </div>
        </div>
     
       </van-list>
  </div>
</template>

<script>
import Vue from 'vue';
import { bdList } from '@/api/api';
import { Card, List,NavBar,Image,Icon   } from 'vant';
import { Swipe, SwipeItem } from 'vant';

Vue.use(Swipe).use(SwipeItem);
import scrollFixed from '@/mixin/scroll-fixed';

export default {
  mixins: [scrollFixed],

  data() {
    return {
      liveList: [],
      page: 0,
      limit: 10,
      loading: false,
      finished: false
    };
  },

  created() {
    this.init();
    // this.getNewtList();
  },

  methods: {
    onClickLeft() {
      this.$router.go(-1);
    },
    // 点击跳转 到 直播
    go_video(id){
      // this.$router.push({name:'live_video',params:{id:id}})
      this.$router.push('/items/live_video?id=' + id)
    },
    go_search(uId){
      // this.$router.push({name:'search'})
    },
    init() {
      this.page = 0;
      this.list = [];
      this.getNewtList();
    },  
    getNewtList() {
 
      this.page++;
      // goodsList({
      //   isNew: true,
      //   page: this.page,
      //   limit: this.limit
      // }).then(res => {
      //   this.list.push(...res.data.data.list);
      //   this.loading = false;
      //   this.finished = res.data.data.page >= res.data.data.pages;
      // });
      bdList({page: this.page, limit: this.limit}).then( res => {
        // this.liveList = res.data.data.list;
        if( this.page <= res.data.data.pages ){

          this.liveList.push(...res.data.data.list)
        }else{
          this.finished= true;
        }
        this.loading = false;
        // this.finished = res.data.data.page >= res.data.data.pages;
        // alert(res.data.data.pages )
      })
    },
    itemClick(id) {
      this.$router.push(`/items/detail/${id}`);
    }
  },

  components: {
    [List.name]: List,
    [Icon.name]: Icon,
    [Image.name]: Image,
    [NavBar.name]:NavBar, 
    [Card.name]: Card
  }
};
</script>

<style lang="scss" scoped>
.live {
  .swip_img{
    height: 60px;
    display:inline-block;
  }
  .banner{
    margin-top:50px;
  }
  .box{
    width: 100%;
    height: 150px;
    margin-top: 20px;
    // border:1px solid #ccc;
    padding: 0 10px;
    .box_left{
      position: relative;
      width: 30%;
      float: left;
      height: 100%;
      // border:1px solid yellow;
      .live_img{
        width: 100%;
        height:100%
      }
      .live_ing{ 
        background-color: #fff;
        opacity:0.7;
        width: 90px;
        position: absolute;
        top: 10px;
        left: 10px;
        // border:1px solid #ccc;
        border-radius: 5px;
        // color: red;
        position: absolutenm ;
        z-index: 999;
        .live_icon{
          font-size:10px;
        }

      }
    }
    .box_right{
      padding: 0 10px;
      width: 69%;
      height: 150px;
      float:right;
      // border:1px solid green;
      .head{
        // border:1px solid red;
        height: 52px;
        width: 100%;
        .head_right{
          width: 70%;
          height: 100%;
          float: right;
          // border:1px solid blue;
          .store{
            font-size: 9px;
            float: right;
            margin-top:-40px;
            color: #005AFF;
          }
          .nickNme{
            width: 50%;
            height: 20px;
            // border: 1px solid green;
            color: #969696;
            color: 12px;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          }
          .number{
            margin-top: 5px;
            font-size: 12px;
          }
          .fire{
            margin-top: 5px;
            color: orange;
            font-size: 13px;
          }
        }
        .head_left{
          width: 30%; 
          height: 100%;
          float: left;
        }
      }
      
      
      .title{
        margin-top:5px;
        margin-bottom:5px;
        font-size: 14px;
        font-weight: 700;
        width: 100%;
        height:20px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
    }
    .goods{
      margin-top: 10px;
      width: 100%;
      height: 60px;  
      overflow-x: scroll;  
      overflow-y: hidden;  /* 超出内容不可见 */ 
      white-space: nowrap; 
      // border:1px solid green;
        
      .good_img{  
        margin-left:10px;  
      }
    }
      
  }

}
</style>