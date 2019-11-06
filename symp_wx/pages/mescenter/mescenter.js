const util = require('../../utils/util.js');
const api = require('../../config/api.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    usertoken:"",
    page:1,//当前页
    limit:10,
    list:[],//每页显示条数
    show:true,
    status:0//加载完成显示
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
    this.getMesslist();
  },

  //获取消息列表
   getMesslist:function(){
     var that = this;
     console.log("获取列表")
     util.requestJson(api.GetMess, {
       token: that.data.usertoken,
       page:that.data.page,
       limit:that.data.limit
     }, 'GET').then(res => {
       console.log(res);
       this.setData({
         list:res.data.list
       })
       if (res.data.list.length < that.data.limit) {
         this.setData({
           show: false
         })
         return;
       }
       if (that.data.list.length == 0) {
         this.setData({
           show: false
         })
         return;
       }
     }).catch((err) => {

     });
   },

   //上拉刷新
  onReachBottom: function () {
    
    console.log("下拉加载");
     var that = this;
     console.log(that.data.status);
    if (that.data.list.length == 0) {
      this.setData({
        show: false
      })
      return;
    }
     if(that.data.status == 1){
       this.setData({
         show:false
       })
       return;
     }
     let page = that.data.page+1;
     console.log(page);
    util.requestJson(api.GetMess, {
      token: that.data.usertoken,
      page: page,
      limit: that.data.limit
    }, 'GET').then(res => {
      if(res.data.list.length<=that.data.limit){
        console.log("加载完成");
        this.setData({
          status : 1
        })
      }
      console.log(res);
      this.setData({
        list: that.data.list.concat(res.data.list)
      })
      console.that.data.list;
    }).catch((err) => {

    });

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
  

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    
  }
})