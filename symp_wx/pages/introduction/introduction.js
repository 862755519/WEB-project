// pages/introduction/introduction.js
var api = require('../../config/api.js');
var util = require('../../utils/util.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    height: 80,
    focus: true,
    text:'',
    nickname:'',
    bcName:'',
    bcLogo:'',
    mobile:'',
    area:'',
  },
  bindFormSubmit: function (e) {
    var that = this;
    that.text = e.detail.value.textarea;
    if( that.text == ''){
      wx.showToast({
        title: '请输入要提交的内容！',
        icon: 'none',
        duration: 2000//持续的时间
      })
    }else{

      util.requestJson(api.KeepBrief,that.text, 'POST').then(res => {
        
          
          wx.showToast({
            title: res.errmsg,
            icon: 'success',
            duration: 2000//持续的时间
          });
          
          wx.switchTab({
            url: "/pages/businessCard/businessCard",
          })  
    
      }).catch( res => {
       
        wx.showToast({
          title: res.errmsg,
          icon: 'none',
          duration: 2000//持续的时间
        })
      })

    }
  },

  // 获取用户信息
  getInfo(){
    var that = this
    wx.getStorage({
      key: 'bcBrief',
      success (res) {
        that.setData({
          text: res.data.bcBrief,
          bcName: res.data.bcName,
          nickname: res.data.nickname,
          bcLogo: res.data.bcLogo,
          mobile: res.data.mobile,
        })
        console.log(res.data)
      }
    })
     const res = wx.getStorageSync("num");
     this.setData({
       area:res
     })
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getInfo()
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