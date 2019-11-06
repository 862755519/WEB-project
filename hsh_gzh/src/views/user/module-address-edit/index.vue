<template>
  <div>
    <van-nav-bar :title="addressId==-1?'添加收货地址':'编辑收货地址'"  left-arrow @click-left="goback">
      <van-icon color="#333" name="arrow-left" slot="left" />
    </van-nav-bar>
    <div v-if="addressId == -1" class="marg_top" >
      <van-address-edit
        style="background-color: #fff;"
        :areaList="areaList"
        :addressInfo="addressInfo"
        show-set-default
        @save="onSave"
      />
    </div>
    <div v-else class="marg_top" >
      <van-address-edit
        style="background-color: #fff;"
        :areaList="areaList"
        :addressInfo="addressInfo"
        show-set-default
        show-delete
        @save="onSave"
        @delete="onDelete"
      />
    </div>
  </div>
</template>

<script>
import { AddressEdit, NavBar } from 'vant';
import areaList from './area.json';
import { addressDetail, addressSave, addressDelete } from '@/api/api';
import { removeLocalStorage } from '@/utils/local-storage';

export default {
  name: 'address-edit',

  data() {
    return {
      areaList,
      addressId: 0,
      addressInfo: {},
      back:''
    };
  },
  created() {
    this.addressId = this.$route.query.addressId;
    this.back = this.$route.query.center;
    if (this.addressId != -1 && this.addressId != 0) {
      this.init();
    }
  },

  methods: {
    init() {
      addressDetail({id: this.addressId}).then(res => {
        this.addressInfo = res.data.data;
      });
    },

    // 地址编辑页面 保存
    onSave(content) {
      addressSave(content).then(res => {
        this.$toast('成功');
        this.$router.push({ path: '/user/address?center='+this.$route.query.center+'&itemId='+this.$route.query.itemId });
      });
    },

    // 地址编辑页面 删除
    onDelete(content) {
      addressDelete({ id: content.id }).then( res =>{
        this.$router.go(-1);
        removeLocalStorage('AddressId')

      });
    },

    goback() {
      if(this.$route.query.center == '1'){
        this.$router.push({name:'manager_gift'})
      }else{
        this.$router.go(-1);
      }
    }
  },

  components: {
    [NavBar.name]: NavBar,
    [AddressEdit.name]: AddressEdit
  }
};
</script>
