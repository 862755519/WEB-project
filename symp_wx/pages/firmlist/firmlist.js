const util = require('../../utils/util.js');
const api = require('../../config/api.js');
Page({
  /**
   * 页面的初始数据
   */
  data: {
    show:true,
    state:0,
    id:"",//行业id
    list:[],
    limit:10,//每页显示条数
    page:1,//当前页数
    usertoken:""
  },

  //选择公司
  select: function(e){
    var that = this;
    let num = e.currentTarget.dataset.id;
    let name = e.currentTarget.dataset.name;
   console.log(num);
    wx.navigateTo({
      url: '/pages/register/register?id=' + num + '&name=' + name
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log("页面加载")
    let token = wx.getStorageSync("token")
     console.log(token);
    let data = options.id;
    console.log(options.id)
    this.setData({
      id:data,
      usertoken:token
    })
    this.getlist();
  },

  //通过行业ID获取公司列表
  getlist(){
    console.log("获取公司信息");
    var that = this;
    let num = that.data.id;
    if(num == undefined ||num == ""){
      wx.showToast({
        title: '数据请求失败',
        icon:"none"
      })
      this.setData({
        show: false
      })
      return;
    }
    util.request(api.TradecardList, {
      id:num,
      pageNo:that.data.page,
      pageSize:that.data.limit,
    }, 'GET').then(res => {
      console.log(res);
      if (res.data.total == 0) {
        this.setData({
          show: false
        })
      }
      this.setData({
        list: res.data.list
      })
     
    }).catch((err) => {
      wx.showToast({
        title: '数据请求失败',
        icon:"none"
      })
      this.setData({
        show: false
      })
      return;
    });
  },

  /**
  * 页面上拉触底事件的处理函数
  */
  onReachBottom: function () {
    console.log("上拉加载")
     var that = this;
     if(that.data.state == 1){
       this.setData({
         show: false
       })
       return;
     }
     that.setData({
       page:that.data.page+1
     })
     console.log(that.data.page) 

    util.request(api.TradecardList, {
      id: that.data.id,
      pageNo: that.data.page,
      pageSize: that.data.limit,
    }, 'GET').then(res => {
      console.log(res);
      if (res.data.list.length == 0) {
        that.setData({
          state : 1,
        })
      }
      if(res.data.list.length<=that.data.limit){
        that.setData({
          state : 1,
        })
      }
      this.setData({
        list: that.data.list.concat(res.data.list)
      })

    }).catch((err) => {
      wx.showToast({
        title: '数据请求失败',
      })
      this.setData({
        show: false
      })
      return;
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
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    
  }
})