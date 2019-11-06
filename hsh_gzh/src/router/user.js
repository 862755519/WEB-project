const tab_user = () => import('@/views/user/tabbar-user');
const UserCollect = () => import('@/views/user/module-collect');
const UserAddress = () => import('@/views/user/module-address');
const UserAddressEdit = () => import('@/views/user/module-address-edit');
const UserServer = () => import('@/views/user/module-server');
const UserHelp = () => import('@/views/user/module-help');
const UserFeedback = () => import('@/views/user/module-feedback');

const UserInformation = () => import('@/views/user/user-information-set');
const UserInfo_SetMobile = () => import('@/views/user/user-information-set/set-mobile');
const UserInfo_SetNickname = () => import('@/views/user/user-information-set/set-nickname');
const UserInfo_SetPassword = () => import('@/views/user/user-information-set/set-password');

const UserOrderList = () => import('@/views/user/order-list');
const UserCouponList = () => import('@/views/user/coupon-list');
const UserRefundList = () => import('@/views/user/refund-list');
const Integral = () => import('@/views/user/integral');

//银行卡管理路由
const UserBankCard = () => import('@/views/user/bank-card');
const UserBindBank = () => import('@/views/user/bind-bank');
const UserGeneralize = () => import('@/views/user/generalize');
const UserRecord = () => import('@/views/user/record');
const UserWithdraw = () => import('@/views/user/withdraw');
const UserRebate = () => import('@/views/user/rebate');
const UserBindUserInfo = () => import('@/views/user/bind-userinfo');
const UserTeam = () => import('@/views/user/team');
const UserGroup = () => import('@/views/user/group');
const UserMessage = () => import('@/views/user/message');

const UserShare = () => import('@/views/user/share');
const UserShareDown = () => import('@/views/user/share/down');
// 积分转换
const Integral_tran = () => import('@/views/user/integralTran/');

const Tabbar = () => import('@/components/Tabbar/');


export default [
  {
    path: '/user',
    name: 'user',
    meta: {
      keepAlive: true
    },
    components: { default: tab_user, tabbar: Tabbar }
  },
  {
    path: '/user/collect',
    name: 'collect',
    meta: {
      login: true
    },
    component: UserCollect
  },
  {
    path: '/user/inteTran',
    name: 'inteTran',
    meta: {
      login: true
    },
    component: Integral_tran
  },
  {
    path: '/user/address',
    name: 'address',
    meta: {
      login: true
    },
    component: UserAddress
  },
  {
    path: '/user/address/edit',
    name: 'address-edit',
    props: true,
    meta: {
      login: true
    },
    component: UserAddressEdit
  },
  {
    path: '/user/server',
    name: 'user-server',
    component: UserServer
  },
  {
    path: '/user/help',
    name: 'user-help',
    component: UserHelp
  },
  {
    path: '/user/feedback',
    name: 'user-feedback',
    component: UserFeedback
  },
  {
    path: '/user/information',
    name: 'user-information',
    meta: {
      login: true
    },
    component: UserInformation
  },
  {
    path: '/user/information/setMobile',
    name: 'user-info-setMobile',
    component: UserInfo_SetMobile
  },
  {
    path: '/user/information/setNickname',
    name: 'user-info-setNickname',
    component: UserInfo_SetNickname
  },
  {
    path: '/user/information/setPassword',
    name: 'user-info-setPassword',
    component: UserInfo_SetPassword
  },
  {
    path: '/user/order/list/:active',
    name: 'user-order-list',
    props: true,
    component: UserOrderList
  },
  {
    path: '/user/coupon/list/:active',
    name: 'user-coupon-list',
    props: true,
    component: UserCouponList
  },
  {
    path: '/user/refund/list',
    name: 'user-refund-list',
    component: UserRefundList
  },
  {
    path: '/user/bank/card',
    name: 'user-bank-card',
    component: UserBankCard
  },
  {
    path: '/user/bind/bank',
    name: 'user-bind-bank',
    component: UserBindBank
  },
  {
    path: '/user/integral',
    name: 'user-integral',
    component: Integral
  },
  {
    path: '/user/generalize',
    name: 'user-generalize',
    component: UserGeneralize
  },
  {
    path: '/user/record',
    name: 'user-record',
    component: UserRecord
  },
  {
    path: '/user/withdraw',
    name: 'user-withdraw',
    component: UserWithdraw
  },
  {
    path: '/user/rebate',
    name: 'user-rebate',
    component: UserRebate
  },
  {
    path: '/user/bind/userinfo',
    name: 'user-bind-userinfo',
    component: UserBindUserInfo
  },
  {
    path: '/user/team',
    name: 'user-team',
    component: UserTeam
  },
  {
    path: '/user/group',
    name: 'user-group',
    component: UserGroup
  },
  {
    path: '/user/share',
    name: 'user-share',
    component: UserShare
  },
  {
    path: '/user/message',
    name: 'user-message',
    component: UserMessage
  },
  {
    path: '/user/share/down',
    name: 'user-share-down',
    component: UserShareDown
  }
];
