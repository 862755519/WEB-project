const util = require('../../utils/util.js');
const api = require('../../config/api.js');
Page({
  /**
   * 页面的初始数据
   */
  data: {
    userinfo:"",
    usertoken:"",
    bcname:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let token = wx.getStorageSync("token")
    console.log(token);
    this.setData({
      usertoken:token
    })
    this.getuser();
  },
  //获取用户信息
  getuser:function(){
    var that = this;
    util.request(api.UserInfo, {
     token:that.data.usertoken
    }, 'GET').then(res => {
      console.log(res);
      this.setData({
        bcname:res.data.bcName,
        userinfo:res.data.userInfo
      })
    }).catch((err) => {
      wx.showToast({
        title: '系统错误，请稍后重试',
        icon: 'none',
        duration: 2000//持续的时间

      })
    });

  },

  setuser:function(){
    console.log("个人信息")
    wx.navigateTo({
      url: '/pages/userinfo/userinfo',
    })
  },

  buyvip:function() {
    console.log("购买会员")
    wx.navigateTo({
      url: '/pages/buyvip/buyvip',
    })
  },

  message:function(){
    console.log("消息中心")
    wx.navigateTo({
      url: '/pages/mescenter/mescenter',
    })
  },

  sing: function () {
    console.log("签到")
    wx.navigateTo({
      url: '/pages/sign/sign',
    })
  },

  showlist: function() {
    console.log("名片列表")
    wx.navigateTo({
      url: '/pages/caller/caller',
    })
  },
  vipcart:function(){
    console.log("名片中心")
    wx.navigateTo({
      url: '/pages/connection/connection',
    })
  },

  uptext: function () {
    console.log("发布文章")
    wx.navigateTo({
      url: '/pages/demo/demo',
    })
  },

 

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    
  }
})