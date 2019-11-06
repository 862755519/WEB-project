const util = require('../../utils/util.js');
const api = require('../../config/api.js');
Page({
  /**
   * 页面的初始数据
   */
  data: {
    show: false, //支付弹出层
    state: "",
    tatol: "0.00",
    cartCss: "vip_cart",
    cardid:"",
    usertoken: "",
    openid:"",
    userinfo: "",
    viplist: [],

    //微信支付参数
    timeStamp:"",
    nonceStr:"",
    package:"",
    paySign:"",
    signType:""
  },

 //提交支付
  submit: function() {
    var that = this;
    console.log(that.data.tatol)
    if (that.data.tatol == "0.00" || that.data.tatol == "" || that.data.tatol == undefined) {
      console.log("请选择购买会员")
      wx.showToast({
        title: '请选择购买会员套餐',
        icon:"none"
      })
      return;
    }
    //支付
    util.requestJson(api.PayVip, {
      token: that.data.usertoken,
      id:that.data.cardid,
      openId:that.data.openid,
      typeId:"0",
      type:"0"
    }, 'GET').then(res => {
      console.log(res);
      console.log(res.errno);
      console.log(res.errmsg);
      if(res.errno!=0){
        console.log("限制购买")
        wx.showToast({
          title: res.errmsg,
          duration: 2000,
          icon:"none"
        }) 
        return;
      }
      console.log(res.data.timeStamp);
      var date = res.data.timeStamp;
      var time = date+"";
      console.log(time);
      this.setData({
        timeStamp: time,
        nonceStr: res.data.nonceStr,
        package: res.data.package,
        paySign: res.data.paySign,
        signType: res.data.signType
      })
      this.doWxPay();
     
    }).catch((err) => {

    });




     
  },

  //调用微信支付接口

  doWxPay() {
    console.log("调用微信支付")
    //小程序发起微信支付
    var that = this;
    wx.requestPayment({
      timeStamp: this.data.timeStamp,//记住，这边的timeStamp一定要是字符串类型的，不然会报错
      nonceStr: that.data.nonceStr,
      package: that.data.package,
      signType: that.data.signType,
      paySign: that.data.paySign,
      success: function (event) {
        console.log("购买成功")
        // success
        
        that.setData({
          show:true
        })
        console.log(event);
        wx.showToast({
          title: '购买会员成功',
          duration: 2000,
          icon:"none"
        });

      },

      fail: function (error) {
        console.log("支付失败")
        console.log(error)
        wx.showToast({
          title: '支付失败',
          duration: 2000,
          icon:"none"
        });
      },

      complete: function () {
        // complete
        console.log("pay complete")

      }

    });

  },

  onClose: function() {
    this.setData({
      show: false
    });
  },
  off: function() {
    this.setData({
      show: false
    });
  },

  //获取用户信息
  getuser: function() {
    var that = this;
    util.request(api.UserInfo, {
      token: that.data.usertoken
    }, 'GET').then(res => {
      console.log(res);
      this.setData({
        userinfo: res.data.userInfo
      })
    }).catch((err) => {});
  },

  //会员卡列表
  getviplist: function() {
    util.requestJson(api.VipList, {

    }, 'GET').then(res => {
      console.log(res);
      this.setData({
        viplist: res.data
      })
    }).catch((err) => {

    });
  },

  //选择vip套餐
  selectCart(e) {
    var dataid = e.currentTarget.dataset;
    var id = dataid.id;
    var price = dataid.price;
    console.log(id);
    console.log(price);
    this.setData({
      state: e.currentTarget.dataset.key,
      tatol: price,
      cardid:id
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let token = wx.getStorageSync("token")
    let open = wx.getStorageSync("openid")
    console.log(token);
    console.log(open);
    this.setData({
      usertoken: token,
      openid:open
    })
    this.getuser();
    this.getviplist();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})