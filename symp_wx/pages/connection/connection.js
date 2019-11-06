const util = require('../../utils/util.js');
const api = require('../../config/api.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    usertoken:"",//用户token
    page:1,//当前页数
    limit:10,//每页条数
    cartlist:[],
    show:true,
    status:0

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  },

  //拨打电话
  phone: function (event){
    console.log("拨打电话")
    var telnum = event.currentTarget.dataset.tel;
    console.log(telnum);
    if(telnum == undefined ||telnum == ""){
      wx.showToast({
        title: '无法拨打电话',
        icon:"none"
      })
      return;
    }

    wx.makePhoneCall({
      phoneNumber: telnum,
      success: function () {
        console.log("拨打电话成功！")
      },
      fail: function () {
        console.log("拨打电话失败！")
      }
    })
  },

  //获取名片列表
  getCartlist:function(){
    console.log("列表");
    var that = this;
    util.requestJson(api.CartList, {
      token: that.data.usertoken,
      page:that.data.page,
      limit:that.data.limit
    }, 'GET').then(res => {
      console.log(res);
      that.setData({
        cartlist:res.data.list
      })
      if(res.data.list == undefined || res.data.list.length == 0){
        that.setData({
          show:false
        })
      }
      console.log(1111111111111)
      console.log(that.data.cartlist.length)
      console.log(res.data.total)
      if (that.data.cartlist.length == res.data.total) {
        that.setData({
          show: false
        })
      }

    }).catch((err) => {
      this.setData({
        show: false
      })
       wx.showToast({
         title: '数据请求失败，请稍后重试',
         icon:"none",
         duration: 2000//持续的时间
         
       })
    });
  },


  /**
 * 页面上拉触底事件的处理函数
 */
  onReachBottom: function () {
    console.log("列表");
    var that = this;
    if(that.data.status == 1){
      that.setData({
        show:false
      })
      return;
    }
    that.setData({
      page:that.data.page+1
    })
    util.requestJson(api.CartList, {
      token: that.data.usertoken,
      page: that.data.page,
      limit: that.data.limit
    }, 'GET').then(res => {
      console.log(res);
      that.setData({
        cartlist: that.data.cartlist.concat(res.data.list)
      })
      if (res.data.list == undefined || res.data.list.length == 0) {
        that.setData({
          status:1
        })
      }
      
      if (that.data.cartlist.length == res.data.total) {
        that.setData({
          status: 1
        })
      }

    }).catch((err) => {
      this.setData({
        show: false
      })
      wx.showToast({
        title: '数据请求失败，请稍后重试',
        icon: "none",
        duration: 2000//持续的时间

      })
    });
  },


  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    let token = wx.getStorageSync("token")
    console.log(token);
    this.setData({
      usertoken:token
    })
    this.getCartlist();
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