

const util = require('../../utils/util.js');
const api = require('../../config/api.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    code:"",//用户code
    phone:"手机号码",
    fid:"",//行业id
    fname:"选择公司",//行业名称
    usertoken:""
  },

  //选择行业
  selectFirm:function(){
    wx.navigateTo({
      url: "/pages/industry/industry",
    })
  },
  // 获取 手机号
  getPhoneNumber: function (e) {
    console.log("获取手机号码")
    const that = this;
    let iv = e.detail.iv
    console.log(e.detail.iv);
    console.log(e.detail.encryptedData);
    let encryptedData = e.detail.encryptedData
    // 获取code
    wx.login({
      success: function (res) {
        console.log(res.code);
        //发送请求
        util.requestJson(api.GetPhone, {
          encryptedData: encryptedData,
          iv: iv,
          code: res.code
        }, 'GET').then(res => {
          console.log(res.data);
          if(res.data == "" ||res.data == undefined){
            wx.showToast({
              title: '系统错误，请重试',
              icon: "none"
            })
          }
          console.log(res);
          that.setData({
            phone:res.data
          })
        }).catch((err) => {
            wx.showToast({
              title: '系统错误，请重试',
              icon:"none"
            })
        });
      },
      fail: function (err) {
        reject(err);
      }
    });

    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let token = wx.getStorageSync("token")
    console.log(token);
    let id = options.id;
    let name = options.name;
    console.log(id)
      this.setData({
        fid:id,
        fname:name,
        usertoken:token
      })
  },

  bindTel:function(){
      var that = this;
      console.log(that.data.fid);
    console.log(that.data.usertoken);
    console.log(that.data.phone);
    //绑定行业
    util.request(api.Tradebind, {
      uid: that.data.usertoken,
      id: that.data.fid,
      mobile:that.data.phone
    }, 'POST').then(res => {
      console.log("绑定成功");
      wx.showToast({
        title: '绑定成功',
        icon:"none"
      })
      wx.switchTab({
        url: "/pages/businessCard/businessCard",
      })
    }).catch((err) => {
      wx.showToast({
        title: "绑定失败，请重试",
        icon: "none"
      })
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
  onReachBottom: function () {
    
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    
  }
})