<template>
  <div class="order_list">
    <van-nav-bar
      title="订单页面"
      :fixed="true"
      left-arrow
      @click-left="onClickLeft"
    >
      <van-icon color="#333" name="arrow-left" slot="left" />
    </van-nav-bar>
    <van-tabs class="marg_top" v-model="activeIndex"
              :swipe-threshold="5"
              @click="handleTabClick">
      <van-tab v-for="(tabTitle, index) in tabTitles"
               :title="tabTitle"
               :key="index">
        <van-list v-model="loading"
                  :finished="finished"
                  :immediate-check="false"
                  finished-text="没有更多了"
                  @load="getOrderList">
          <van-panel v-for="(el, i) in orderList"
                     :key="i"
                     :title="'订单编号: ' + el.orderSn"
                     :status="el.orderStatusText"
                     @click.native="toOrderDetail(el.id)">
            <van-card v-for="(goods, goodsI) in el.goodsList"
                      :key="goodsI"
                      :title="goods.goodsName"
                      :num="goods.number"
                      :thumb="goods.picUrl">
              <div slot="desc">
                <div class="desc">
                  <van-tag plain
                           style="margin-right:6px;"
                           v-for="(spec, index) in goods.specifications"
                           :key="index">
                    {{spec}}
                  </van-tag>
                </div>
              </div>
            </van-card>
            <div class="total">合计: {{el.actualPrice * 100 | yuan}}（含运费{{el.post_fee | yuan}}）</div>

            <div slot="footer"
                 class="footer_btn">
              <van-button size="small"
                          v-if="el.handleOption.cancel"
                          @click="cancelOrder(el.id)">取消订单</van-button>
              <van-button size="small"
                          v-if="el.handleOption.pay"
                          type="danger"
                          @click="toPay(el.id)">去支付</van-button>
              <van-button size="small"
                          v-if="el.handleOption.refund"
                          type="danger"
                          @click="refundOrder(el.id)">退款</van-button>

                     
              <van-button size="small"
                          v-if="el.handleOption.confirm"
                          type="danger"
                          @click="confirmOrder(el.id)">查看订单</van-button>
                          
              <van-button size="small"
                          v-if="el.handleOption.delete"
                          @click="delOrder(el.id)">删除订单</van-button>
              <van-button size="small"
                          v-if="el.handleOption.comment"
                          @click="commentOrder(el.id)">去评价</van-button>
            </div>

          </van-panel>

        </van-list>

      </van-tab>
    </van-tabs>

    
  </div>
</template>

<script>
import { orderList, orderDelete, orderConfirm, orderCancel, orderRefund } from '@/api/api';
import _ from 'lodash';
import { Tab, Tabs, Panel, Card, List, Tag, NavBar, Dialog} from 'vant';

export default {
  name: 'order-list',
  wl_show:true,
  props: {
    active: {
      type: [String, Number],
      default: 0
    }
  },
  created() {
    this.init();
  },
  data() {
    return {
      activeIndex: Number(this.active),
      tabTitles: ['全部', '待付款', '待发货', '待收货', '待评价'],
      orderList: [],
      page: 0,
      limit: 10,
      loading: false,
      finished: false
    };
  },

  methods: {
    findwl(){
     
    },
    onClickLeft() {
      this.$router.push({name:'user'});
    },
    init() {
      this.page = 0;
      this.orderList = [];
      this.getOrderList();
    },
    getOrderList() {
      this.page++;
      orderList({
        showType: this.activeIndex,
        page: this.page,
        limit: this.limit
      }).then(res => {
        console.log(res.data.data.list);
        
        this.orderList.push(...res.data.data.list);
        this.loading = false;
        this.finished = res.data.data.page >= res.data.data.pages;
      });
    },
    delOrder(id) {
      let that = this;
      this.$dialog
        .confirm({ message: '确定要删除该订单吗?' })
        .then(() => {
          orderDelete({ orderId: id }).then(() => {
            this.init();
            this.$toast('已删除订单');
            this.$router.push({name:'user'})
          });
        })
        .catch(() => {});
    },
    cancelOrder(id) {
      this.$dialog
        .confirm({ message: '确定要取消该订单吗?' })
        .then(() => {
          orderCancel({ orderId: id }).then(() => {
            this.init();
            this.$toast('已取消该订单');
            this.$router.push({name:'user'})
          });
        })
        .catch(() => {});
    },
    refundOrder(id) {
      
      this.$dialog
        .confirm({ message: '确定要申请退款吗?' })
        .then(() => {
          orderRefund({ orderId: id }).then(() => {
            this.init();
            this.$toast('已申请订单退款');
            this.$router.push({name:'user'})
          });
        })
        .catch(() => {});
    },    
    confirmOrder(id) {
      // this.$dialog
      //   .confirm({
      //     message: '请确认收到货物, 确认收货后无法撤销!'
      //   })
      //   .then(() => {
      //     orderConfirm({ orderId: id }).then(() => {
      //       this.init();
      //       this.$toast('已确认收货');
      //       this.$router.push({name:'user'})
      //     });
      //   })
      //   .catch(() => {});
        this.$router.push({name:'user'})
    },
    commentOrder(id) {},
    toPay(id) {
      this.$router.push({ name: 'payment', params: { orderId: id } });
    },
    handleTabClick() {
      this.page = 0;
      this.orderList = [];
      this.getOrderList();
    },
    toOrderDetail(id) {
      this.$router.push({
        path: '/order/order-detail',
        query: { orderId: id }
      });
    }
  },
  components: {
    [Tab.name]: Tab,
    [Tabs.name]: Tabs,
    [Panel.name]: Panel,
    [Card.name]: Card,
    [List.name]: List,
    [Tag.name]: Tag,
    [Dialog.name]: Dialog,
    [NavBar.name]:NavBar 

  }
};
</script>

<style lang="scss" scoped>
.demo{
  border: 1px solid black;

}
.marg_top{
  margin-top:50px;
}
.order_list {
  .van-panel {
    margin-top: 20px;
  }

  .van-card {
    background-color: #fff;
  }

  .total {
    text-align: right;
    padding: 10px;
  }

  .footer_btn {
    text-align: right;
    .van-button {
      margin-left: 10px;
    }
  }
  .line1{
    width:100%;
    height: 1px;
    background: rgb(170, 167, 167);
}
.step{
    margin-top: -10px;
}
.address_name{
    font-size: 16px;
    height: 60px;
    width: 30%;
    float: left;
    padding: 5px;
    text-align: right;
    line-height: 40px;
    border-bottom: 1px solid #F2F2F2;
}
.address_text{
    font-size: 14px;
    height: 60px;
    width: 69%;
    float: left;
    padding-left: 5px;
    padding-top: 5px;
    border-bottom: 1px solid #F2F2F2;
}
.table_desc{
    width: 100%;
    margin-top: 220px;
    padding: 0px;
}
.table_name{
    width: 30%;
    height: 45px;
    float: left;
    font-size: 16px;
    line-height: 45px;
    text-align: right;
    padding-right: 5px;
    border-bottom: 1px solid #F2F2F2;
}
.table_text{
    width: 69%;
    height: 45px;
    float: left;
    font-size: 14px;
    line-height: 45px;
    padding-left: 5px;
    border-bottom: 1px solid #F2F2F2;
}
.popup_title{
    text-align: center;
    font-size: 18px;
    color: #333333;
    line-height: 5px;
}
.popup{
    width: 90%;
    height: 500px;
    border-radius: 5px;
    padding: 15px;
}
}
</style>
