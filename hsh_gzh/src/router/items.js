const Tabbar = () => import('@/components/Tabbar/');

export default [
  {
    path: '/items',
    name: 'class',
    meta: {
      keepAlive: true
    },
    components: {
      default: () => import('@/views/items/tabbar-catalog'),
      tabbar: Tabbar
    }
  },
  {
    path: '/items/search',
    name: 'search',
    meta: {
      keepAlive: true
    },
    component: () => import('@/views/items/search')
  },
  {
    path: '/items/detail/:itemId',
    name: 'detail',
    props: true,
    component: () => import('@/views/items/detail')
  },
  {
    path: '/items/category',
    name: 'category',
    component: () => import('@/views/items/category'),
    props: route => route.query
  },
  {
    path: '/items/hot',
    name: 'hot',
    component: () => import('@/views/items/hot'),
    props: route => route.query
  },
  {
    path: '/items/new',
    name: 'new',
    component: () => import('@/views/items/new'),
    props: route => route.query
  },
  {
    path: '/items/groupon',
    name: 'groupon',
    component: () => import('@/views/items/groupon'),
    props: route => route.query
  },
  {
    path: '/items/brand/:brandId',
    name: 'brand',
    props: true,
    component: () => import('@/views/items/brand')
  },
  {
    path: '/items/brand-list',
    name: 'brandList',
    component: () => import('@/views/items/brand-list'),
    props: route => route.query
  },
  {
    path: '/items/topic/:topicId',
    name: 'topic',
    props: true,
    component: () => import('@/views/items/topic')
  },
  {
    path: '/items/live',
    name: 'live',
    props: true,
    component: () => import('@/views/items/live')
  },
  {
    path: '/items/live_video',
    name: 'live_video',
    props: true,
    component: () => import('@/views/items/live_video')
  },
  {
    path: '/items/exchange',
    name: 'exchange',
    props: true,
    component: () => import('@/views/items/exchange')
  },
  {
    path: '/items/purchase',
    name: 'Purchase',
    props: true,
    component: () => import('@/views/items/Purchase')
  },
  {
    path: '/items/bindSpuer',
    name: 'bindSpuer',
    props: true,
    component: () => import('@/views/items/bindSpuer')
  },
  {
    path: '/items/myVoucher',
    name: 'myVoucher',
    props: true,
    component: () => import('@/views/items/myVoucher')
  },
  {
    path: '/items/location',
    name: 'location',
    props: true,
    component: () => import('@/views/items/location')
  },
  {
    path: '/items/topic-list',
    name: 'topicList',
    component: () => import('@/views/items/topic-list'),
    props: route => route.query
  }
];
