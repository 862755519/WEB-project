<template>
  <div class="tab_class">
    <van-nav-bar
      title="商品分类"
    />
    <div class="tal_class_searchBox">
      <van-search placeholder="点击前往搜索"/>
      <div class="tal_class_searchMask" @click="$router.push({ name: 'search' })"></div>
    </div>

    <div class="class_tree clearfix">
      <ul class="class_tree_nav">
        <li
          v-for="(item, index) in categoryList"
          :key="index"
          :class="{active_nav: currentCategory.id == item.id}"
          @click="changeCatalog(item.id)"
        >{{item.name}}</li>
      </ul>
      <div class="class_tree_content">
        <div class="class_tree_all">
          <img style="width:95%; height:100%" v-lazy="currentCategory.picUrl">
        </div>
        <div class="box">
          <span>{{currentCategory.desc}}</span>
        </div>
        <div class="class_tree_items_wrap clearfix">
          <div @click="toItemList(item.id)" :key="i" v-for="(item, i) in currentSubCategoryList">
            <div class="class_tree_item_img">
              <img :src="item.picUrl" :alt="item.name">
            </div>
            <div class="class_tree_item_name">{{item.name}}</div>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import { catalogList, catalogCurrent } from '@/api/api';

import { Search,NavBar  } from 'vant';

export default {
  data() {
    return {
      categoryList: [],
      currentCategory: {},
      currentSubCategoryList: []
    };
  },

  created() {
    this.initData();
  },

  methods: {
    initData() {
      catalogList().then(res => {
        let data = res.data.data;
        this.categoryList = data.categoryList;
        this.currentCategory = res.data.data.currentCategory;
        this.currentSubCategoryList = data.currentSubCategory;
      });
    },
    changeCatalog(id) {
      catalogCurrent({ id: id}).then(res => {
        let data = res.data.data;
        this.currentCategory = data.currentCategory;        
        this.currentSubCategoryList = data.currentSubCategory;
        console.log(this.currentSubCategoryList);
        
      });
    },
    toItemList(id) {
      this.$router.push({
        name: 'category',
        query: { keyword: '', itemClass: id }
      });
    }
  },
  components: {
    [Search.name]: Search,
    [NavBar.name]:NavBar,
  }
};
</script>


<style lang="scss" scoped>
@import '../../assets/scss/mixin';
.tab_class {
  overflow: hidden;
  background-color: #fff;
}

.height-fix {
  padding-bottom: 42px;
}

.tal_class_searchBox {
  position: relative;
  
}

.tal_class_searchMask {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 9;
}


.box {
  width: 100%;
  height: 20px;
  text-align: center;
  background: #fff;
  //font-family: PingFangSC-Light, helvetica, 'Heiti SC';
  // margin-top: 90px;
  font-size: 13px;
  // position: relative;
  // top: 125px;
}
.box span {
  line-height: 20px;
}
.class_tree {
  position: relative;
  background-color: #fff;
  overflow-x: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  height: 100%;
  box-sizing: border-box;
}
.class_tree_nav {
  float: left;
  width: 100px;
  height: 100%;
  background-color: #fff;
  overflow: scroll;
  > li {
    @include one-border;
    height: 40px;
    line-height: 40px;
    text-align: center;
    border-left: 2px solid $bg-color;
  }
  > li.active_nav {
    background-color: #fff;
    border-left: 2px solid $red;
    color: $red;
  }  
}
.class_tree_content {
  margin-left: 100px;
  height: 100%;
  overflow-x: hidden;
  overflow-y: scroll;
  .class_tree_all {
    // border:1px solid green;
    text-align: right;
    padding-right: 10px;
    height: 125px;
    line-height: 40px;
    color: $font-color-gray;
    font-size: $font-size-small;
  }
  .van-icon-arrow {
    font-size: $font-size-small;
  }
  .class_tree_items_wrap {
    // border:1px solid blue;
    width: 100%;
    padding: 10px 20px;
    margin-right: -3%;
    // margin-top: 10px;
    text-align: center;
    margin-bottom:70px;
    > div {
      // border:1px solid red;
      float: left;
      padding-right: 3%;
      box-sizing: border-box;
      width: 33.333%;
      margin-bottom: 20px;
    }
    img {
      max-width: 100%;
    }

    .class_tree_item_img {
      display: inline-block;
      // border:1px solid yellow;
      max-width: 100%;
      width: 70px;
      height: 70px;
      margin-top:0px;
    }
    .class_tree_item_name {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }
}
</style>
