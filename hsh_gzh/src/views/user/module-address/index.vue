<template>
  <div>
    <van-nav-bar title="收货地址" :fixed="true" left-arrow @click-left="goback">
      <van-icon color="#333" name="arrow-left" slot="left" />
    </van-nav-bar>
    <div class="marg_top">
      <van-address-list v-model="chosenAddressId" :list="addressList" 
      @add="onAdd" 
      @edit="onEdit"
      @select="onSelect"/>
    </div>
  </div>
</template>

<script>
import { addressList, addressDetail, addressSave, addressDelete } from '@/api/api';
import { AddressList, NavBar } from 'vant';
import { setLocalStorage } from '@/utils/local-storage';

export default {
  data() {
    return {
      chosenAddressId: '1',
      addressList: [],
    };
  },

  created() {
    this.loadAddress();

    var center = this.$route.query.center;
    if(center != undefined && center!= '' && center!='undefined'){
        sessionStorage.setItem("center",center)
    }
  },
  mounted(){
    },
  activated(){
    this.loadAddress()

  },
  methods: {
    onAdd() {
      if(this.$route.query.center == '1'){
        this.$router.push({ name: 'address-edit', query: { addressId: -1, center:1} });
      }else if(this.$route.query.center == '2') {
        this.$router.push({ name: 'address-edit', query: { addressId: -1,center:2} });
      
      }else {
        this.$router.push({ name: 'address-edit', query: { addressId: -1,itemId:this.$route.query.itemId} });
      }
    },
    onEdit(item, index) {
   
      if(this.$route.query.center == '1'){
 
        this.$router.push({ name: 'address-edit', query: { addressId: this.addressList[index].id, center:1} });
      }else if(this.$route.query.center == '2'){
     
        this.$router.push({ name: 'address-edit', query: { addressId: this.addressList[index].id,center:2} });
      }else{
     
        this.$router.push({ name: 'address-edit', query: { addressId: this.addressList[index].id,itemId:this.$route.query.itemId} });
      }
      
    },
    onSelect(item, index) {
      setLocalStorage({ AddressId: item.id });
        const that = this 
        setTimeout(() => {
    
          // if(that.$route.query.center == 1){
          //   that.$router.push({name:'manager_gift'})
          // }else 
          var center = sessionStorage.getItem("center");
          if(center == 2){
             that.$router.push({name:'user'})
          } else if(center == 3){
            that.$router.push('/order/checkout?itemId='+this.$route.query.itemId)
          }      
        }, 1000);
    },         
    goback() {
      // if(this.$route.query.center == 1){
      //   this.$router.push({name:'manager_gift'})
      // }else 
      if(this.$route.query.center == 2){
        this.$router.push({name:'user'})
      }else if(this.$route.query.center == 3){
        this.$router.push('/order/checkout?itemId='+this.$route.query.itemId)
      }
    },
    loadAddress() {
      addressList().then(res => {
        var list = res.data.data.list;
        console.log(list);
        
        for(var i = 0; i < list.length; i++ ){
          var item = list[i]
          this.addressList.push({
            id: item.id,
            name: item.name,
            tel: item.tel,
            address: item.province + item.city + item.county + " " + item.addressDetail
          })
        }
      })
    }
  },

  components: {
    [NavBar.name]: NavBar,
    [AddressList.name]: AddressList 
  }
};
</script>


<style lang="scss" scoped>
.marg_top{
  margin-top:50px;
}
.addressGroup {
  margin-bottom: 10px;
  &:last-child {
    margin-bottom: 0;
  }
}

.bottom_btn {
  position: fixed;
  bottom: 0;
}
</style>
