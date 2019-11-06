// 以下是业务服务器API地址
// 本机开发时使用
// var WxApiRoot = 'http://localhost:8080/wx/';
// 局域网测试使用
var WxApiRoot = 'http://hapi.kmfhi.com/mini/';
var WxApiRootUp = 'http://hapi.kmfhi.com/';

// 云平台部署时使用
// var WxApiRoot = 'http://118.24.0.153:8080/wx/';
// 云平台上线时使用
// var WxApiRoot = 'https://www.menethil.com.cn/wx/';

module.exports = {

  AuthLoginByWeixin: WxApiRoot + 'auth/login_by_weixin', //微信登录
  AuthLoginByAccount: WxApiRoot + 'auth/login', //账号登录
  AuthLogout: WxApiRoot + 'auth/logout', //账号登出
  AuthRegister: WxApiRoot + 'auth/register', //账号注册
  AuthReset: WxApiRoot + 'auth/reset', //账号密码重置
  AuthRegisterCaptcha: WxApiRoot + 'auth/regCaptcha', //验证码
  AuthBindPhone: WxApiRoot + 'auth/bindPhone', //绑定微信手机号

  // 授权管理
  Auth_Auth: WxApiRoot+'auth/auth', //用户授权
  Auth_Info: WxApiRoot+'auth/info', //用户信息
  Auth_Login: WxApiRoot + 'auth/login', //登录权限
 
  // 行业管理
  Tradelist: WxApiRoot + 'trade/list', //行业列表 
  Tradebind: WxApiRoot+'trade/bind', //绑定公司信息
  TradecardList: WxApiRoot + 'trade/cardList', //通过行业id查询名片列表

  // 文章管理

  Artlist: WxApiRoot +'/art/artlist', //文章列表
  Report: WxApiRoot + '/art/report', //发表文章
  TextTag: WxApiRoot + '/art/queryCards', //发表标签
  ShowText: WxApiRootUp +'/mini/art/queryArtDetail',//文章详情

  //个人名片页面
  UserCart: WxApiRoot + '/user/queryObjBusinessCard', //个人名片
  CartList: WxApiRootUp + '/mini/user/queryMyCard',//名片中心列表
  ReturnCart: WxApiRootUp + '/mini/user/returnCard',//名片中心列表
  
  // 名片简介
  KeepBrief: WxApiRootUp + '/mini/user/keepBrief',//名片中心列表

  //个人中心
  UserInfo: WxApiRoot + '/user/findMyInfo',//个人信息查询
  UserUpdate: WxApiRoot + '/user/update',//个人信息修改

  // 文件上传
  Upload: WxApiRootUp + '/wx/storage/upload',//
  Share: WxApiRootUp + '/mini/user/xcxShare',//

  //购买会员
  VipList: WxApiRootUp + '/mini/vip/queryListBuyVip',//会员卡列表
  PayVip: WxApiRootUp + '/mini/vip/card',
  Showlist: WxApiRootUp +'/mini/art/queryVisitor',//访客列表


  //消息中心
  GetMess: WxApiRootUp + '/mini/user/queryNews',

  //签到
  SingInfo: WxApiRootUp + '/mini/vip/querySiginActivity',//签到信息
  SetSing: WxApiRootUp + '/mini/vip/sendSignIn',

  Artlist: WxApiRoot+'/art/artlist', //文章列表
  Report: WxApiRoot+'/art/report', //发表文章
  //文章点赞
  GetFabulous: WxApiRoot + '/art/getFabulous',

  // 文件上传
  Upload: WxApiRootUp + 'wx/storage/upload', 

  //获取登录授权手机号码
  GetPhone: WxApiRootUp + '/mini/auth/getPhone'



};