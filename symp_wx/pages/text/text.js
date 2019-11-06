const util = require('../../utils/util.js');
const api = require('../../config/api.js');
Page({

  

  /**
   * 页面的初始数据
   */
  data: {
     userinfo:"",//用户信息
     textinfo:"",//文章信息
     bcname:"",//用户公司
     texthtml:"",//文章内容
     artid:"",//文章id
     isFabulous:false,//判断是否点赞
     count:0,//点赞总数
     userid:"",
     token:""
  },
  bindCard:function(){
    var that =this;
    console.log(that.data.token)
    console.log(that.data.userid)
    if(that.data.token == "" || that.data.userid == ""){
      wx.showToast({
        title: '无法查看',
        icon:"none"
      })
      return;
    }
    wx.setStorageSync("usId", that.data.textinfo.usId);
    wx.switchTab({
      url: '/pages/businessCard/businessCard'
    })
  },
  //点赞
  bindFabulous:function(){
     var that = this;
    util.requestJson( api.GetFabulous,{
      artId: that.data.artid
    },"GET").then(res =>{

      if (that.data.isFabulous){

        that.setData({
          count: that.data.count - 1
        })
        wx.showToast({
          title: "取消点赞",
          icon: 'none',
          duration: 2000//持续的时间
        })
      }else{
        that.setData({
            count: that.data.count + 1
        })
        wx.showToast({
          title: "点赞成功",
          icon: 'none',
          duration: 2000//持续的时间
        })
      }

      that.setData({
        isFabulous: !that.data.isFabulous,
      })

      }).catch(res =>{
        wx.showToast({
          title: res.errmsg,
          icon: 'none',
          duration: 2000//持续的时间
        })
      })
  },
  //获取文章详情
  getText:function(){
    var that = this;
    util.requestJson(api.ShowText, {
      artId: that.data.artid
    }, 'GET').then(res => {
      console.log(res);
      var textbody = res.data.article.artContent;
      var html = textbody.replace(/<img/gi, '<img style="max-width:100%;height:auto;float:left;display:block" ')
        .replace(/<section/g, '<div')
        .replace(/\/section>/g, '\div>');

      that.setData({
        userinfo:res.data.user,
        textinfo:res.data.article,
        count: res.data.article.artSpotCount,
        isFabulous: res.data.isFabulous,
        bcname: res.data.bcName,
        texthtml: html,
        userid: res.data.article.usId
      })

    }).catch((err) => {
      wx.showToast({
        title: '获取文章内容失败',
        icon: 'none',
        duration: 2000//持续的时间
      })
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let token = wx.getStorageSync("token")
    console.log(token);
    let artid = options.id;
    console.log(artid);
    this.setData({
      artid: artid,
      token:token
    })
    this.getText();
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