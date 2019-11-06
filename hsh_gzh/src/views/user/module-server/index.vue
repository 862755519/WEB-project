<template>
  <div>
    <van-nav-bar
      title="联系我们"
      :fixed="true"
      left-arrow
      @click-left="onClickLeft"
    >
      <van-icon color="#333" name="arrow-left" slot="left" />
    </van-nav-bar>

    <van-cell-group >
      <van-cell title="联系客服" @click="showKefu = true" isLink></van-cell>
      <van-cell title="意见反馈" to="/user/feedback" isLink></van-cell>
      <van-cell title="常见问题" to="/user/help" isLink/>
    </van-cell-group>
  </div>
</template>

<script>
import { Popup, Cell, CellGroup,NavBar } from 'vant';

export default {
  data() {
    return {
      showKefu: false
    };
  },

  components: {
    [Popup.name]: Popup,
    [Cell.name]: Cell, 
    [CellGroup.name]: CellGroup ,
     [NavBar.name]:NavBar    
  },
  methods: {
    
 onClickLeft() {
      this.$router.go(-1);
    },
  }
};
</script>
<style scoped lang="scss">
  .van-popup {
    width: 80%;
    padding: 20px;
    box-sizing: border-box;

  }
</style>