import request from '@/utils/request'

const IndexUrl = 'wx/home/index'; //首页数据接口
export function getHome() {
    return request({
        url: IndexUrl,
        method: 'get'
    })
}

/*  华商汇 公众号  接口 开始 */
const MapUsersLng = '/mini/map/mapUsersLng'; //通过经纬度获取附件店主
export function mapUsersLng(query) {
    return request({
        url: MapUsersLng,
        method: 'get',
        params:query
    })
}

const GetMap = '/mini/user/getMap'; //通过服务器 获取 当前定位
export function getMap(query) {
    return request({
        url: GetMap,
        method: 'get',
        params:query
    })
}

const MapUsersAddress = '/mini/map/mapUsersAddress'; //通过地址获取附件店主
export function mapUsersAddress(query) {
    return request({
        url: MapUsersAddress,
        method: 'get',
        params:query
    })
}

const MapUser = '/mini/map/mapUser'; //获取用户信息
export function mapUser(query) {
    return request({
        url: MapUser,
        method: 'get',
        params:query
    })
}   



const GetCoupon = 'mini/coupon/getCoupon'; //获取抵扣券
export function getCoupon() {
    return request({
        url: GetCoupon,
        method: 'get'
    })
}

const GetCard = '/mini/vip/card'; //抵扣券支付接口
export function getCard(query) {
    return request({
        url: GetCard,
        method: 'get',
        params:query
    })
}

const GiveCoupon = '/mini/user/giveCoupon'; //赠送抵扣券
export function giveCoupon(query) {
    return request({
        url: GiveCoupon,
        method: 'get',
        params:query
    })
}

const LoginByGzh = '/mini/auth/login_wx_weixin'; // 授权登录
export function loginByGzh(data) {
    return request({
        url: LoginByGzh,
        method: 'post',
        data
    })
}

const GzhLogin = '/mini/auth/gzhLogin'; //授权登录
export function gzhLogin(data) {
    return request({
        url: GzhLogin,
        method: 'post',
        data
    })
}

const GetCouponGoods = '/mini/coupon/getCouponGoods'; //获取抵扣券可兑换商品列表
export function getCouponGoods(data) {
    return request({
        url: GetCouponGoods,
        method: 'post',
        data
    })
}

const GzhBindUser = '/mini/user/bindUser'; //绑定上级
export function gzhBindUser(data) {
    return request({
        url: GzhBindUser,
        method: 'post',
        data
    })
}
/*  华商汇 公众号 接口 结束 */

const GetCouponList = 'mini/coupon/getCouponDetails'; //获取用户抵扣券接列表
export function getCouponList(query) {
    return request({
        url: GetCouponList,
        method: 'get',
        params:query
    })
}

const CatalogList = 'wx/catalog/index'; //分类目录全部分类数据接口
export function catalogList() {
    return request({
        url: CatalogList,
        method: 'get'
    })
}

const CatalogCurrent = 'wx/catalog/current'; //分类目录当前分类数据接口
export function catalogCurrent(query) {
    return request({
        url: CatalogCurrent,
        method: 'get',
        params: query
    })
}

const AuthLogout = 'wx/auth/logout'; //账号登出
export function authLogout() {
    return request({
        url: AuthLogout,
        method: 'post'
    })
}

const AuthInfo = 'wx/auth/info'; //用户信息
export function authInfo() {
    return request({
        url: AuthInfo,
        method: 'get'
    })
}
const BindAuth = 'wx/user/bindAli'; //支付宝授权
export function bindAuth(data) {
    return request({
        url: BindAuth,
        method: 'post',
        data
    })
}
const IsBindAli = 'wx/user/isBindAli'; //判断支付宝授权
export function isBindAli() {
    return request({
        url: IsBindAli,
        method: 'get'
    })
}
const AuthProfile = 'wx/auth/profile'; //账号修改
export function authProfile(data) {
    return request({
        url: AuthProfile,
        method: 'post',
        data
    })
}
const AuthRegister = 'wx/auth/register'; //账号注册
const AuthReset = 'wx/auth/reset'; //账号密码重置
export function authReset(data) {
    return request({
        url: AuthReset,
        method: 'post',
        data
    })
}

const ResetPhone = 'wx/auth/resetPhone'; //忘记密码重置
export function resetPhone(data) {
    return request({
        url: ResetPhone,
        method: 'post',
        data
    })
}
const AuthRegisterCaptcha = 'wx/auth/regCaptcha'; //注册验证码
export function authRegisterCaptcha(data) {
    return request({
        url: AuthRegisterCaptcha,
        method: 'post',
        data
    })
}

const AuthCaptcha = 'wx/auth/regCaptcha'; //验证码
export function authCaptcha(data) {
    return request({
        url: AuthCaptcha,
        method: 'post',
        data
    })
}

const BindMobile = 'wx/auth/bindMobile'; //绑定手机号 
export function bindMobile(data) {
    return request({
        url: BindMobile,
        method: 'post',
        data
    })
}

const GoodsCount = 'wx/goods/count'; //统计商品总数
export function goodsCount() {
    return request({
        url: GoodsCount,
        method: 'get'
    })
}
export const GoodsList = 'wx/goods/list'; //获得商品列表
export function goodsList(query) {
    return request({
        url: GoodsList,
        method: 'get',
        params: query
    })
}
const GoodsCategory = 'wx/goods/category'; //获得分类数据
export function goodsCategory(query) {
    return request({
        url: GoodsCategory,
        method: 'get',
        params: query
    })
}
const GoodsDetail = 'wx/goods/detail'; //获得商品的详情
export function goodsDetail(query) {
    return request({
        url: GoodsDetail,
        method: 'get',
        params: query
    })
}
const GoodsRelated = 'wx/goods/related'; //商品详情页的关联商品（大家都在看）

const BrandList = 'wx/brand/list'; //品牌列表
export function brandList(query) {
    return request({
        url: BrandList,
        method: 'get',
        params: query
    })
}
const BrandDetail = 'wx/brand/detail'; //品牌详情
export function brandDetail(query) {
    return request({
        url: BrandDetail,
        method: 'get',
        params: query
    })
}

const CartList = 'wx/cart/index'; //获取购物车的数据
export function cartList(query) {
    return request({
        url: CartList,
        method: 'get',
        params: query
    })
}
const CartAdd = 'wx/cart/add'; // 添加商品到购物车
export function cartAdd(data) {
    return request({
        url: CartAdd,
        method: 'post',
        data
    })
}
const CartFastAdd = 'wx/cart/fastadd'; // 立即购买商品
export function cartFastAdd(data) {
    return request({
        url: CartFastAdd,
        method: 'post',
        data
    })
}
const CartUpdate = 'wx/cart/update'; // 更新购物车的商品
export function cartUpdate(data) {
    return request({
        url: cartUpdate,
        method: 'post',
        data
    })
}
const CartDelete = 'wx/cart/delete'; // 删除购物车的商品
export function cartDelete(data) {
    return request({
        url: CartDelete,
        method: 'post',
        data
    })
}
const CartChecked = 'wx/cart/checked'; // 选择或取消选择商品
export function cartChecked(data) {
    return request({
        url: CartChecked,
        method: 'post',
        data
    })
}
const CartGoodsCount = 'wx/cart/goodscount'; // 获取购物车商品件数
export function cartGoodsCount() {
    return request({
        url: CartGoodsCount,
        method: 'get'
    })
}
const CartCheckout = 'wx/cart/checkout'; // 下单前信息确认
export function cartCheckout(query) {
    return request({
        url: CartCheckout,
        method: 'get',
        params: query
    })
}

const CollectList = 'wx/collect/list'; //收藏列表
export function collectList(query) {
    return request({
        url: CollectList,
        method: 'get',
        params: query
    })
}
const CollectAddOrDelete = 'wx/collect/addordelete'; //添加或取消收藏
export function collectAddOrDelete(data) {
    return request({
        url: CollectAddOrDelete,
        method: 'post',
        data
    })
}
const CommentList = 'wx/comment/list'; //评论列表
const CommentCount = 'wx/comment/count'; //评论总数
const CommentPost = 'wx/comment/post'; //发表评论

const TopicList = 'wx/topic/list'; //专题列表
export function topicList(query) {
    return request({
        url: TopicList,
        method: 'get',
        params: query
    })
}
const TopicDetail = 'wx/topic/detail'; //专题详情
export function topicDetail(query) {
    return request({
        url: TopicDetail,
        method: 'get',
        params: query
    })
}
const TopicRelated = 'wx/topic/related'; //相关专题
export function topicRelated(query) {
    return request({
        url: TopicRelated,
        method: 'get',
        params: query
    })
}

const SearchIndex = 'wx/search/index'; //搜索关键字
const SearchResult = 'wx/search/result'; //搜索结果
const SearchHelper = 'wx/search/helper'; //搜索帮助
const SearchClearHistory = 'wx/search/clearhistory'; //搜索历史清楚


const AddressList = 'wx/address/list'; //收货地址列表
export function addressList(query) {
    return request({
        url: AddressList,
        method: 'get',
        params: query
    })
}

const AddressDetail = 'wx/address/detail'; //收货地址详情
export function addressDetail(query) {
    return request({
        url: AddressDetail,
        method: 'get',
        params: query
    })
}
const AddressSave = 'wx/address/save'; //保存收货地址
export function addressSave(data) {
    return request({
        url: AddressSave,
        method: 'post',
        data
    })
}
const AddressDelete = 'wx/address/delete'; //保存收货地址
export function addressDelete(data) {
    return request({
        url: AddressDelete,
        method: 'post',
        data
    })
}

const ExpressQuery = 'wx/express/query'; //物流查询

const OrderSubmit = 'wx/order/submit'; // 提交订单
export function orderSubmit(data) {
    return request({
        url: OrderSubmit,
        method: 'post',
        data
    })
}

const OrderPrepay = 'wx/order/prepay'; // 订单的预支付会话
export function orderPrepay(data) {
    return request({
        url: OrderPrepay,
        method: 'post',
        data
    })
}
export const OrderList = 'wx/order/list'; //订单列表
export function orderList(query) {
    return request({
        url: OrderList,
        method: 'get',
        params: query
    })
}
const OrderDetail = 'wx/order/detail'; //订单详情
export function orderDetail(query) {
    return request({
        url: OrderDetail,
        method: 'get',
        params: query
    })
}
const OrderCancel = 'wx/order/cancel'; //取消订单
export function orderCancel(data) {
    return request({
        url: OrderCancel,
        method: 'post',
        data
    })
}
const OrderRefund = 'wx/order/refund'; //退款取消订单
export function orderRefund(data) {
    return request({
        url: OrderRefund,
        method: 'post',
        data
    })
}
const OrderDelete = 'wx/order/delete'; //删除订单
export function orderDelete(data) {
    return request({
        url: OrderDelete,
        method: 'post',
        data
    })
}
const OrderConfirm = 'wx/order/confirm'; //确认收货
export function orderConfirm(data) {
    return request({
        url: OrderConfirm,
        method: 'post',
        data
    })
}
const OrderGoods = 'wx/order/goods'; // 代评价商品信息
const OrderComment = 'wx/order/comment'; // 评价订单商品信息

const FeedbackAdd = 'wx/feedback/submit'; //添加反馈
export function feedbackAdd(data) {
    return request({
        url: FeedbackAdd,
        method: 'post',
        data
    })
}

const FootprintList = 'wx/footprint/list'; //足迹列表
const FootprintDelete = 'wx/footprint/delete'; //删除足迹

const UserFormIdCreate = 'wx/formid/create'; //用户FromId，用于发送模版消息

const GrouponList = 'wx/groupon/list'; //团购列表
export function grouponList(query) {
    return request({
        url: GrouponList,
        method: 'get',
        params: query
    })
}
const GroupOn = 'wx/groupon/query'; //团购API-查询
const GroupOnMy = 'wx/groupon/my'; //团购API-我的团购
const GroupOnDetail = 'wx/groupon/detail'; //团购API-详情
const GroupOnJoin = 'wx/groupon/join'; //团购API-详情

const CouponList = 'wx/coupon/list'; //优惠券列表
export function couponList(query) {
    return request({
        url: CouponList,
        method: 'get',
        params: query
    })
}
export const CouponMyList = 'wx/coupon/mylist'; //我的优惠券列表
export function couponMyList(query) {
    return request({
        url: CouponMyList,
        method: 'get',
        params: query
    })
}
const CouponSelectList = 'wx/coupon/selectlist'; //当前订单可用优惠券列表
export function couponSelectList(query) {
    return request({
        url: CouponSelectList,
        method: 'get',
        params: query
    })
}
const CouponReceive = 'wx/coupon/receive'; //优惠券领取
export function couponReceive(data) {
    return request({
        url: CouponReceive,
        method: 'post',
        data
    })
}
const CouponExchange = 'wx/coupon/exchange'; //优惠券兑换

const StorageUpload = 'wx/storage/upload'; //图片上传,

const UserIndex = 'wx/user/index'; //个人页面用户相关信息
export function userIndex() {
    return request({
        url: UserIndex,
        method: 'get'
    })
}
const IssueList = 'wx/issue/list'; //帮助信息
export function issueList() {
    return request({
        url: IssueList,
        method: 'get'
    })
}

//获取我的积分信息
const GetIntegral = 'apple/info';
export function getIntegral(query) {
    return request({
        url: GetIntegral,
        method: 'get',
        params: query
    })
}



//银行卡信息相关接口
const GetBank = 'wx/bindCard/list';
export function getBank() {
    return request({
        url: GetBank,
        method: 'get'
    })
}
//选择银行卡
const FindBank = 'wx/card/queryAll';
export function findBank() {
    return request({
        url: FindBank,
        method: 'get'
    });
}
//提交信息绑定银行卡
const BindBank = '/wx/bindCard/insert';
export function bindBank(data) {
    return request({
        url: BindBank,
        method: 'post',
        data
    });
}
//解除银行卡绑定
const UpdateBank = '/wx/bindCard/delete';
export function updateCard(query) {
    return request({
        url: UpdateBank,
        method: 'get',
        params: query
    });
}

//获取手机验证码
const FindTelcode = '/wx/auth/regCaptcha';
export function findTelcode(data) {
    return request({
        url: FindTelcode,
        method: 'post',
        data
    });
}

//提交注册信息
const SubmitTable = '/wx/auth/register';
export function submitTable(data) {
    return request({
        url: SubmitTable,
        method: 'post',
        data
    });
}

//我的社区  
const CommInfo = '/wx/comm/info';
export function commInfo(query) {
    return request({
        url: CommInfo,
        method: 'get',
        params: query
    });
}

//我的团队信息获取
const FindTeam = '/wx/shopkeeper/team';
export function findTeam(query){
    return request({
        url: FindTeam,
        method: 'get',
        params: query
    });
}


//公众号信息获取
const GetMyTeam = '/mini/rebate/getMyTeam';
export function getMyTeam(query) {
    return request({
        url: GetMyTeam,
        method: 'get',
        params: query
    });
}

//返利明细查询
const FindRebate = '/wx/shopkeeper/rebatedetail';
export function findRebate(query) {
    return request({
        url: FindRebate,
        method: 'get',
        params: query
    });
}
const GetRebateDetail = '/mini/rebate/getRebateDetail';
export function getRebateDetail(query) {
    return request({
        url: GetRebateDetail,
        method: 'get',
        params: query
    });
}

//提现记录查询
const FindDraw = '/wx/shopkeeper/withdraw';
export function findDraw(query) {
    return request({
        url: FindDraw,
        method: 'get',
        params: query
    });
}

//推广中心返利金额
const SelectRebate = '/wx/shopkeeper/center';
export function selectRebate(query) {
    return request({
        url: SelectRebate,
        method: 'get',
        params: query
    });
}
// 推广中心
const GetStatistics = '/mini/rebate/getStatistics';
export function getStatistics(query) {
    return request({
        url: GetStatistics,
        method: 'get',
        params: query
    });
}

//个人中心个人信息获取
const SelectUser = '/wx/auth/info';
export function selectUser() {
    return request({
        url: SelectUser,
        method: 'get',
    })
}

//银行卡提现接口
const GetMoney = '/wx/shopkeeper/towithdraw';
export function getMoney(data) {
    return request({
        url: GetMoney,
        method: 'post',
        data
    });
}

//用户信息查询
const GetUserinfo = '/wx/user/info';
export function findUserinfo(query) {
    return request({
        url: GetUserinfo,
        method: 'get',
        params: query
    });
}

//文件上传
const Upload = '/wx/storage/upload'
export function upLoading(data) {
    return request({
        url: Upload,
        method: 'post',
        data
    });
}
//绑定信息
const BindUserInfo = '/wx/user/update'
export function bindUser(data) {
    return request({
        url: BindUserInfo,
        method: 'post',
        data
    });
}

//可提现金额获取
const GetMax = '/wx/bindCard/list'
export function getMaxmoney() {
    return request({
        url: GetMax,
        method: 'get'
    });
}

//二维码分享
const ShareInfo = '/wx/shopkeeper/toUpdate'
export function getShare() {
    return request({
        url: ShareInfo,
        method: 'get'
    });
}

//会员中心商品列表
const ShopList = '/apple/list';
export function shopList(query) {
    return request({
        url: ShopList,
        method: 'get',
        params: query
    });
}

//会员中心查看状态
const ShopStatus = '/wx/shopkeeper/status';
export function shopStatus(query) {
    return request({
        url: ShopStatus,
        method: 'get',
        params: query
    });
}

//会员中心详情页面
const ShopInfo = '/wx/shopkeeper/info';
export function shopInfo(query) {
    return request({
        url: ShopInfo,
        method: 'get',
        params: query
    });
}

//领取物品接口
const ToPick = '/wx/shopkeeper/toPick';
export function toPick(data) {
    return request({
        url: ToPick,
        method: 'post',
        data
    });
}

//开通会员 余额支付
const Shopkeeperpay = '/amount/pay/shopkeeperpay';
export function amountshopkeeperpay(query) {
    return request({
        url: Shopkeeperpay,
        method: 'get',
        params: query
    });
}

//会员中心余额支付
const Shopkeepergoodpay = '/amount/pay/shopkeepergoodpay';
export function shopkeepergoodpay(query) {
    return request({
        url: Shopkeepergoodpay,
        method: 'get',
        params: query
    });
}


//商品余额支付
const Goodpay = '/amount/pay/goodpay';
export function goodpay(query) {
    return request({
        url: Goodpay,
        method: 'get',
        params: query
    });
}


//苹果树余额支付
const Amountpay = '/applepay/amountpay';
export function amountpay(query) {
    return request({
        url: Amountpay,
        method: 'get',
        params: query
    });
}



//商品微信支付
const WxGoodpay = '/wx/pay/goodpay';
export function wxgoodpay(query) {
    return request({
        url: WxGoodpay,
        method: 'get',
        params: query
    });
}
// 微信公众号支付
const WxPay = '/alipay/pay/prepay';
export function wx_pay(query) {
    return request({
        url: WxPay,
        method: 'get',
        params:query
    });
}
//修改头像
const ChangeHead = '/wx/user/updateImage';
export function changeHead(query) {
    return request({
        url: ChangeHead,
        method: 'get',
        params: query
    });
}

//免费领取
const Free = '/wx/receive/list';
export function getFreeinfo() {
    return request({
        url: Free,
        method: 'get',
    });
}
//查看物流接口
const Logis = '/wx/receive/express';
export function getLogis(query) {
    return request({
        url: Logis,
        method: 'get',
        params: query
    });
}

//查重复购买接口
const Repeat = '/wx/shopkeeper/shopkeeperOrder';
export function getRepeat(query) {
    return request({
        url: Repeat,
        method: 'get',
        params: query
    });
}

//查重复购买物流
const Repeatwl = '/wx/shopkeeper/skOrder';
export function getWL(query) {
    return request({
        url: Repeatwl,
        method: 'get',
        params: query
    });
}

//评价信息
const SetMessage = '/wx/comment/post';
export function setMessage(data) {
    return request({
        url: SetMessage,
        method: 'post',
        data
    });
}

//团购列表
const GroupBuy = '/wx/tmp/list';
export function groupBuy(query) {
    return request({
        url: GroupBuy,
        method: 'get',
        params: query
    });
}

//消息中心
const NotfyList = '/wx/shopkeeper/notfyList';
export function notfyList(query) {
    return request({
        url: NotfyList,
        method: 'get',
        params: query
    });
}

//加入团购
const GroupAdd = 'wx/tmp/add';
export function groupAdd(data) {
    return request({
        url: GroupAdd,
        method: 'post',
        data
    });
}



//直播列表
const BdList = '/wx/bd/bdList';
export function bdList(query) {
    return request({
        url: BdList,
        method: 'get',
        params: query
    });
}

//直播页面数据
const Read = 'wx/bd/read';
export function read(query) {
    return request({
        url: Read,
        method: 'get',
        params: query
    });
}

//直播关注
const SpotFollow = 'wx/bd/spotFollow';
export function spotFollow(query) {
    return request({
        url: SpotFollow,
        method: 'get',
        params: query
    });
}

//转换积分
const Convey = '/apple/convey';
export function convey(query) {
    return request({
        url: Convey,
        method: 'post',
        params: query
    });
}

//转换积分
const AppList = '/apple/list';
export function appList(query) {
    return request({
        url: AppList,
        method: 'post',
        params: query
    });
}

//生成抵扣券
const CreateCoupon = '/mini/user/createCoupon';
export function createCoupon() {
    return request({
        url: CreateCoupon,
        method: 'GET',
    });
}


export function getList(api, query) {
    return request({
        url: api,
        method: 'get',
        params: query
    });
}




export const REFUND_LIST = '';