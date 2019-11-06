<template>
  <div class="goods_topic">
    <van-nav-bar
      :fixed='true'
      title="专题详情"
      left-arrow
      @click-left="onClickLeft"
    >
    
     <van-icon color="#333" name="arrow-left" slot="left" />
    </van-nav-bar>
    <div class="mar_top">
      <div class="topic-detail"
          v-html="htmltext" >
      </div>
     

      <!-- <van-row gutter >
        <van-col span="12"
                v-for="(goods ,index) in topicGoods"
                :key="index">
          <router-link :to="{ path: `/items/detail/${goods.id}`}">
            <img :src="goods.picUrl"
                style="width:150px;height:150px;">
          </router-link>
          <div style="margin-left: 20px; rgb(123, 116, 116);">{{goods.name}}</div>
          <div style="margin-left: 20px; color:#ab956d">￥ {{goods.retailPrice}}</div>
        </van-col>
      </van-row> -->
    </div>

  </div>
</template>

<script>
import { topicDetail, topicRelated } from '@/api/api';
import { Card, Row, Col,NavBar } from 'vant';

export default {
 
  data() {
    return {
     htmltext:"",
    };
  },

  created() {
  let htmlstring =  this.$route.params.html;
  this.htmltext = htmlstring;
  },

  methods: {
    
 onClickLeft() {
      this.$router.go(-1);
    },
    
   
  },

  components: {
    [Card.name]: Card,
     [NavBar.name]:NavBar, 
    [Row.name]: Row,
    [Col.name]: Col
  }
};
</script>

<style lang="scss" scoped>
.mar_top{
  margin-top:50px;
}
.goods_topic {
  .topic-detail {
    /deep/ p {
      padding: 0 10px;
      margin-block-start: 0 !important;
      margin-block-end: 0 !important;
    }
    /deep/ img {
      max-width: 100%;
      width: 100% !important;
      height: 100% !important;
      display: block;
    }
  }
}
</style>