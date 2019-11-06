import Vue from 'vue';
import App from './App.vue';
import router from './router';
import 'vant/lib/icon/local.css';
import '@/assets/scss/global.scss';
import '@/assets/scss/iconfont/iconfont.css';

import VueCountdown from '@chenfengyuan/vue-countdown';
Vue.component(VueCountdown.name, VueCountdown);

import filters from '@/filter';
Vue.use(filters);

import axios from 'axios'
Vue.prototype.axios = axios;

import Qs from 'qs';
Vue.prototype.qs = Qs;

import TcPlayer from 'vue-tcplayer'
Vue.component(TcPlayer);

import AMap from 'vue-amap';
Vue.use(AMap);

  // 初始化vue-amap
AMap.initAMapApiLoader({
  // 高德key
  key: '你的key',
  // 插件集合 （插件按需引入）
  plugin: ['AMap.Geolocation']
});

import { Lazyload, Icon, Cell, CellGroup, loading, Button, Toast } from 'vant';
Vue.use(Icon);
Vue.use(Cell);
Vue.use(CellGroup);
Vue.use(loading);
Vue.use(Button);
Vue.use(Toast);

Vue.use(Lazyload, {
    preLoad: 1.3,
    error: require('@/assets/images/bgt.png'),
    loading: require('@/assets/images/bgt.png'),
    attempt: 1,
    listenEvents: ['scroll'],
    lazyComponent: true
});


Vue.config.productionTip = false;

new Vue({
    router,
    TcPlayer,
    render: h => h(App)
}).$mount('#app');