/**
 * 用户相关服务
 */
const util = require('../utils/util.js');
const api = require('../config/api.js');

/**
 * Promise封装wx.checkSession
 */
function checkSession() {
  return new Promise(function(resolve, reject) {
    wx.checkSession({
      success: function() {
        resolve(true);
      },
      fail: function() {
        reject(false);
      }
    })
  });
}

/**
 * Promise封装wx.login
 */
function login() {
  return new Promise(function(resolve, reject) {
    wx.login({
      success: function(res) {
        if (res.code) {
          resolve(res);
        } else {
          reject(res);
        }
      },
      fail: function(err) {
        reject(err);
      }
    });
  });
}
 // 获取微信地理位置
function getLocation(){
  return new Promise(function(resolve,reject){
    wx.getLocation({
      type: 'wgs84',
      success (res) {
        // const latitude = res.latitude
        // const longitude = res.longitude
      },
      fail: function(err) {
        reject(err);
      }
    })
  })
}
/**
 * 调用微信登录
 */
function loginByWeixin() {
  return new Promise(function(resolve, reject) {
    return login().then((res) => {
      console.log(res);
      //登录远程服务器
      util.request(api.Auth_Auth, {
        code: res.code,
        // appId:'wx4649ce43e5231128',
        // secret:'2885b07a600d9e73c7bb13c5f05ba7b6',
        // userInfo: userInfo
      },'POST').then(res => {
        if (res.errno === 0) {
          
          //存储用户信息
          // wx.setStorageSync('userInfo', res.data.userInfo);
          wx.setStorageSync('token', res.data.token);
          resolve(res);
        } else {
          reject(res);
        }
      }).catch((err) => {
        reject(err);
      });
    }).catch((err) => {
      reject(err);
    })
  });
}

/**
 * 判断用户是否登录
 */
function checkLogin() {
  return new Promise(function(resolve, reject) {
    if (wx.getStorageSync('userInfo') && wx.getStorageSync('token')) {
      checkSession().then(() => {
        resolve(true);
      }).catch(() => {
        reject(false);
      });
    } else {
      reject(false);
    }
  });
}

module.exports = {
  loginByWeixin,
  checkLogin,
  getLocation
};