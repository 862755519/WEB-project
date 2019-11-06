var api = require('../../../config/api.js');
var util = require('../../../utils/util.js');
var user = require('../../../utils/user.js');

var app = getApp();
Page({
  data:{
    sessionKey:'',
    openid:'',
    iv:'',
    encryptedData:''
  },
  onLoad: function(options) {
    // 页面初始化 options为页面跳转所带来的参数
    // 页面渲染完成
  },
  onReady: function() {
  },
  onShow: function() {
    // 页面显示
  },
  onHide: function() {
    // 页面隐藏
  },
  onUnload: function() {
    // 页面关闭
  },


  

  // 获取用户返回的信息
  wxLogin: function (e) {
    wx.getUserInfo({
      withCredentials: 'true',
      lang: 'zh_CN',
      timeout: 10000,
      success: (result) => {
        console.log(result)
        // 获取 code 
        wx.login({
          success: function (ress) {
            if (ress.code) {
              // 获取地理位置 
              wx.getLocation({
                type: 'wgs84',
                success(res) {
                  const latitude = res.latitude
                  const longitude = res.longitude
                  console.log(longitude)
                  console.log(latitude)
                  console.log(ress.code)
                  console.log(result.encryptedData)
                  console.log(result.iv)
                  // 获取用户信息接口
                  util.request(api.Auth_Info,
                    {
                      longitude: longitude,
                      latitude: latitude,
                      encryptedData: result.encryptedData,
                      iv: result.iv,
                      code: ress.code
                    }, 'POST').then(res => {
                     console.log(res)
                  
                      if (res.errno == 0) {
                        if (res.data.token == undefined) {
                          
                        } else {
                          wx.setStorageSync('openid', res.data.userInfo.openId);
                          console.log(res.data.userInfo.openId);
                          wx.setStorageSync('token', res.data.token)
                          if (res.data.isbind == 0) { //未绑定
                            wx.navigateTo({
                              url: '/pages/register/register'
                            })
                          } else if (res.data.isbind == 1) { //已经绑定 跳首页
                          console.log("已经绑定了")
                            wx.switchTab({
                              url: '/pages/businessCard/businessCard'
                            });
                          }
                        }
                      }

                    })
                },
                fail: function (err) {
                }
              })
            } else {
            }
          },
          fail: function (err) {
            reject(err);
          }
        });
      },
      fail: () => { },
      complete: () => { }
    });


    if (e.detail.userInfo == undefined) {
      app.globalData.hasLogin = false;
      wx.showToast({
        title: '微信登录失败',
        icon:"none",
      })
      return;
    }
    console.log(e);



    user.checkLogin().catch(() => {

    });
  },
  
  
  
  accountLogin: function() {
    wx.navigateTo({
      url: "/pages/auth/accountLogin/accountLogin"
    });
  }
})