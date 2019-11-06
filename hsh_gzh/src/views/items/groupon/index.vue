<template>
  <div class="goods_groupon">
    <van-nav-bar
      :fixed="true"
      title="团购中心"
      left-arrow
      @click-left="onClickLeft"
    >
      <van-icon color="#333" name="arrow-left" slot="left" />
    </van-nav-bar>

    <div class="banner">
      <div class="title">团购列表</div>
    </div>

    <van-list v-model="loading"
              :finished="finished"
              :immediate-check="false"
              finished-text="没有更多了"
              @load="getGrouponList">
      <van-card v-for="(item, i) in list"
                :key="i"
                tag="团购"
                :desc="item.brief"
                :title="item.name"
                :thumb="item.picUrl"
                :origin-price="'原价：'+item.retailPrice"
                :price="'团购价：'+ item.grouponPrice +'.00'"
                @click="itemClick(item.id)">
        <div slot="tags">
          <!-- <van-tag plain
                   type="primary">
            {{item.grouponMember}}人成团
          </van-tag>
          <van-tag plain
                   type="danger"
                   style="margin-left:5px;">
            {{item.grouponDiscount}}元再减
          </van-tag> -->
        </div>
        <div slot="footer">
          <van-button size="mini" >{{item.grouponMember}}人成团</van-button>
          <van-button size="mini" type="danger">去参团</van-button>
        </div>
      </van-card>
    </van-list>

  </div>
</template>

<script>
import { grouponList } from '@/api/api';
import { Card, Tag, List,NavBar} from 'vant';
import scrollFixed from '@/mixin/scroll-fixed';

export default {
  mixins: [scrollFixed],

  data() {
    return {
      list: [],
      page: 0,
      limit: 10,
      loading: false,
      finished: false
    };
  },

  created() {
    this  .init();
  },

  methods: {
    init() {
      this.page = 0;
      this.list = [];
      this.getGrouponList();
    },
    getGrouponList() {
      this.page++;
      grouponList({
        page: this.page,
        limit: this.limit
      }).then(res => {
        this.list.push(...res.data.data.list);
        this.loading = false;
        this.finished = res.data.data.page >= res.data.data.pages;
      });
    },
    itemClick(id) {
      this.$router.push('/manager/magDetail?itemId='+id);
    },
     onClickLeft() {
      this.$router.go(-1);
    },
  },

  components: {
    [List.name]: List,
    [Tag.name]: Tag,
    [Card.name]: Card,
    [NavBar.name]:NavBar 
  },
  
};
</script>

<style lang="scss" scoped>
.goods_groupon {
  // padding: 20px;
  .banner {
    margin-top:50px;
    height: 250px;
    background-image: url('../../../assets/images/tgzq.png');
    background-size: cover;
    margin-bottom: 20px;
    .title {
      text-align: center;
      line-height: 200px;
      color: #ffffff;
      font-size: 40px;
    }
  }
}
</style>