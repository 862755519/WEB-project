
// pages/industry/industry.js
const util = require('../../utils/util.js');
const api = require('../../config/api.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
     list:[],//行业列表
     state: '',//选择状态
     id:"",
     searchLoading: false, //"上拉加载"的变量，默认false，隐藏  
     searchLoadingComplete: false  //“没有数据”的变量，默认false，隐藏  
  },

  //获取行业列表
  getlist:function(){
    util.request(api.Tradelist, {
      // userInfo: userInfo
    }, 'GET').then(res => {
      console.log(res);
      this.setData({
         list:res
      })
    }).catch((err) => {
      console.log(err);
    });
  },
  //选择行业列表
  select: function(e){
    var that = this;
    let name = e.currentTarget.dataset.name;
    console.log("选择了" + name + e.currentTarget.dataset.id);
    this.setData({
             id: e.currentTarget.dataset.id,
             state: e.currentTarget.dataset.key,
          }); 
  },
  confirm:function(){
    var that = this;
    console.log(that.data.id);
    let num = that.data.id;
    console.log(num);
    if(num == "" || num == undefined){
      wx.showToast({
        title: '请选择行业',
        duration: 1000,
        icon:"none"
      })
      return;
    }
    wx.navigateTo({
      url: '/pages/firmlist/firmlist?id=' + num 
    })

    console.log("222222222");
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
     this.getlist();
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