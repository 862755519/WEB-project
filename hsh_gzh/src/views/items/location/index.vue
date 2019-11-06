<template>
  <div class="container">
    <van-nav-bar title="身边的店主"  left-arrow @click-left="onClickLeft" >
      <van-icon color="#333" name="arrow-left" slot="left" />
    </van-nav-bar>
      <van-search
        class="search"
        v-model="value"
        placeholder="请输入搜索关键词"
        show-action
        shape="round" 
        @search="onSearch"
      >
        <div slot="action" @click="onSearch">搜索</div>
      </van-search>
    <div id="allmap"></div>
    <div class="box" id="container">
    </div>
    <div class="userInfo" v-if="show_info">
      <van-panel title="人员信息" > 
        <!-- <div>内容</div> -->
        <van-cell-group>
          <van-cell  title="昵称：" :value="userMode.nickname" />
          <!-- <van-cell class="cell2" title="账号：" value="内容" /> -->
          <van-cell title="手机号：" :value="userMode.mobile"  />
          <van-cell title="最近位置更新：" :value="userMode.birthdays"  />
          <van-cell title="最近上报位置：" :value="userMode.address"  />
        </van-cell-group>
        <div class="u_btn">
          <van-button class="btn_go" id="glob" @click="go_in" type="info" size="normal">点击进入商铺</van-button>
        </div>
        <div class="position">
          <!-- <img src="" > -->
          <van-image
            round
            width="100%"
            height="100%"
            :src="userMode.avatar"
          />
        </div>
      </van-panel>
    </div>
  </div>
</template>
<style>
</style>
<script>
import { mapUsersLng,mapUsersAddress,mapUser,getMap} from '@/api/api';
import Vue from 'vue';
import {
  Cell,
  CellGroup,
  Collapse,
  CollapseItem,
  Tab,
  Tabs,
  Toast,
  Popup,
  Swipe,
  SwipeItem,
  Button,
  NavBar,
  NoticeBar,
  List,
  Panel,
  Tag,
  Image,
  Tabbar,
  Search,
  TabbarItem,
  DatetimePicker
} from 'vant';
import axios from 'axios'
import { timingSafeEqual } from 'crypto';
import { log } from 'util';
export default {
  // 引入的组件
  components: {
    [DatetimePicker.name]: DatetimePicker,
    [Popup.name]: Popup,
    [Tab.name]: Tab,
    [Tabs.name]: Tabs,
    [Image.name]: Image,
    [Search.name]: Search,
    [Collapse.name]: Collapse,
    [CollapseItem.name]: CollapseItem,
    [NavBar.name]: NavBar,
    [Swipe.name]: Swipe,
    [SwipeItem.name]: SwipeItem,
    [NoticeBar.name]: NoticeBar,
    [List.name]: List,
    [Tag.name]: Tag,
    [Tabbar.name]: Tabbar,
    [Cell.name]: Cell,
    [Panel.name]: Panel,
    [Toast.name]: Toast,
    [CellGroup.name]: CellGroup,
    [TabbarItem.name]: TabbarItem
  },
  data() {
    return {
      mapObj:null,
      value:'',
      marker:{},
      markers:[],

      lat:'',
      lng:'',

      show_info:false,
      userMode:{}
    };
  },
  created() {
    
  },
  mounted(){
    // this.getLoc();
    this.bdGetLocation();
  },
  methods: {
    //导航返回
    onClickLeft(){
      this.$router.push({name:'user'});
    },
    // 点击商铺
    go_in(){
      this.$router.push({name:'home'});
    },

    // 地址搜索
    onSearch(){
      mapUsersAddress({address:this.value}).then( res => {
        // console.log(res);
      }).catch( res => {
        Toast.fail(res.data.errmsg)
      })
    },

    // 获取地图
    getMap(lat, lng){
      // AMap是高德地图的构造函数，这里.Map是创建地图，.Marker是创建坐标点
      this.mapObj = new AMap.Map('container', {//'container'是对应页面盒子的id
          resizeEnable: true, //自适应大小
          zoom: 8,//初始视窗
          center: [lng, lat],//中心点
      });
       this.markerOne(lat, lng);
    },

    // 显示自己的点标记
    markerOne(lat, lng){
      var marker = new AMap.Marker({
        map: this.mapObj,
        position: new AMap.LngLat(lng, lat), //此处根据页面数据可以直接传入经纬度进行描点
        icon: 'http://vdata.amap.com/icons/b18/1/2.png'
      }) 
     this.clickHandler(lng,lat);
      marker.on('click', function(e) {
            // console.log(e.target);
            Toast('这是你自己的定位')
         });
    },

    // 显示附件店家点标记
    addMarkes(lng,lat,icon,id){
      var that = this;
      var aciontlng = parseFloat(lng);
      var aciontlat = parseFloat(lat);  
      var marker = new AMap.Marker({
        map: this.mapObj,
        position: new AMap.LngLat(aciontlng, aciontlat), //此处根据页面数据可以直接传入经纬度进行描点
      })   
    //得到的数据
      marker.id=id;
      marker.on('click',  function(e) {
          that.show_info = true;  
        // console.log(e.target.id);
        mapUser({usId:e.target.id}).then( res => {
          // console.log(res.data.data);  
          that.userMode =res.data.data; 
        })
      });
    },

    // 点击点标记事件
    clickHandler(id){
      var that = this;
      mapUsersLng({longitude:that.lng, latitude: that.lat}).then( res =>{
        var dataMarkes = res.data.data;
        for(var data in dataMarkes){
            that.addMarkes(dataMarkes[data].longitude,dataMarkes[data].latitude,dataMarkes[data].avatar,dataMarkes[data].id);
        }
      })
    },

    // 通过百度地图 获取地理定位
    bdGetLocation(){
        var that = this;
        var map = new BMap.Map("allmap");
        var point = new BMap.Point(116.331398,39.897445);
        map.centerAndZoom(point,20);
        var geolocation = new BMap.Geolocation();
        geolocation.getCurrentPosition(function(r){
            if(this.getStatus() == BMAP_STATUS_SUCCESS){       
                var mk = new BMap.Marker(r.point);
                map.addOverlay(mk);
                map.panTo(r.point);
                map.enableScrollWheelZoom(true);
                Toast.success('定位成功！')
                that.lat = r.latitude;
                that.lng = r.longitude;
                // 调地图接口
                that.getMap(that.lat, that.lng)
            }
            else {
                Toast.fail('定位失败!请重新定位')
            }        
        },{ enableHighAccuracy : true});
    },

    // 服务器  IP定位
    getLoc(){
      alert('getMap接口跑起来了')
      getMap().then( res => {
        console.log(res);
        
      })
    }
  }
};
</script>
<style scoped>
.amap-geo{
  border:1px solid #ccc;
  float: left;
}
.search{
  width: 100%;
  position: fixed;
  top:47px;
  /* border:1px solid red; */
  z-index: 999;
  float: left;
  opacity: 0.9;
}
.van-cell{
  padding:5px 16px;
}
.cell1 .van-cell__title{
  width: 10px;
}
.van-cell__value{
  text-align: left;
  width: 100%;
}
.amap-logo{
  display: none;
  z-index: -10;
}
 .box{
     width: 100%;
     height: 500px;
 }
 .userInfo{ 
    position: fixed;
    bottom: 0px;
    width: 100%;
 }
 .u_btn{
   width: 100%;
   padding: 0 50px;
 }
 .btn_go{
   z-index: 999;
   width: 100%;
   margin:15px 0;
   border-radius: 20px;

 }
 .position{
   width: 80px;
   height: 80px;
   /* border:1px solid red; */
   position: absolute;;
   top: -45px;
   right: 10px;
   border-radius: 50%;
 }




</style>


