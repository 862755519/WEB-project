
const util = require('../../utils/util.js');
const api = require('../../config/api.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
     list:[],
     page:1,
     limit:10,
     token:"",
    show:true,
    status:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    let token = wx.getStorageSync("token")
    console.log(token);
    that.setData({
      token:token
    })
    that.getlist()
  },

  getlist:function(){
    var that = this;
    util.requestJson(api.Showlist, {  
      limit:that.data.limit,
      token:that.data.token,
      page:that.data.page
    }, 'GET').then(res => {
      console.log(res);
      that.setData({
        list:res.data.list
      })
      if(that.data.list.length == 0){
        console.log("没有更多了")
        that.setData({
          show:false
        })
      }
    }).catch((err) => {

    });
  },

  /**
 * 页面上拉触底事件的处理函数
 */
  onReachBottom: function () {
    console.log("下拉刷新")
    var that = this;
    if(that.data.status == 1){
      console.log("无")
      that.setData({
        show:false
      })
      return;
    }
    that.setData({
      page:that.data.page+1
    })
    util.requestJson(api.Showlist, {
      limit: that.data.limit,
      token: that.data.token,
      page: that.data.page
    }, 'GET').then(res => {
      console.log(res);
      var arr = res.data.list;
      var arrlist = that.data.list.concat(arr)
      that.setData({
        list: arrlist
      })
      if (that.data.page == res.data.pages) {
        console.log("没有更多了")
        that.setData({
          status:1
        })
      }
    }).catch((err) => {

    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    var that = this;

    
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
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    
  }
})