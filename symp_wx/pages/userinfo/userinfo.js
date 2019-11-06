const util = require('../../utils/util.js');
const api = require('../../config/api.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userinfo: "",
    usertoken: "",
    uid:"",
    avatar:"",//头像
    gender:"",//性别
    username:"",//昵称
    tel:"",//电话号码
    wxcode:"",//微信号
    sign:"",//签名
    showimg:""
  },
  //获取用户信息
  getuser: function () {
    var that = this;
    util.request(api.UserInfo, {
      token: that.data.usertoken
    }, 'GET').then(res => {
      console.log(res);
      if (res.data.userInfo.gender=="0"){
        this.setData({
          gender: ""
        })
      }
      if (res.data.userInfo.gender == "1") {
        this.setData({
          gender: "男"
        })
      }
      if (res.data.userInfo.gender == "2") {
        this.setData({
          gender: "女"
        })
      }
      this.setData({
        bcname: res.data.bcName,
        userinfo: res.data.userInfo,
        avatar: res.data.userInfo.avatar,
        uid:res.data.userInfo.id,
       
        username: res.data.userInfo.nickname,
        tel: res.data.userInfo.mobile,
        wxcode: res.data.userInfo.wxCode,
        sign: res.data.userInfo.autograph
      })
    }).catch((err) => {
    });

  },
  //信息修改
  update:function(){
    console.log("提交")
    var that = this;
    let gen;
    console.log(that.data.gender);
    if(that.data.gender == "女"){
      gen = 2
    }
    if (that.data.gender == "男") {
      gen = 1
    }
    if (that.data.gender == "") {
      gen = 0
    }
    console.log(that.data.tel)
    let phone = that.data.tel;
    if (!(/^1[3456789]\d{9}$/.test(phone))) {
       wx.showToast({
         title: '请输入合法的手机号码',
         icon:"none"
       })
       return;
    } 
    util.requestJson(api.UserUpdate, {
      token:that.data.usertoken,
      avatar:that.data.avatar,
      nickname:that.data.username,
      gender:gen,
      mobile:phone,

      wxCode:that.data.wxcode,
      autograph:that.data.sign
    }, 'POST').then(res => {
      console.log(res);
      wx.switchTab({
        url: '/pages/home/home',
      })
      wx.showToast({
        title: '信息修改成功',
        icon: 'none',
        duration: 2000//持续的时间

      })
    }).catch((err) => {
      wx.showToast({
        title: '信息修改失败',
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
    this.setData({
      usertoken: token
    })
    this.getuser();
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

//用户名输入
  setusername:function(e){
    console.log("输入了")
    console.log(e.detail);
    this.setData({
      username : e.detail
    })
  },

  //性别输入
  setgender: function (e) {
    console.log("输入了")
    console.log(e.detail);
    var gen = e.detail;
    this.setData({
      gender: e.detail
    })
  },

  //电话号码输入
  settel: function (e) {
    console.log("输入了")
    console.log(e.detail);
    this.setData({
      tel: e.detail
    })
  },

  //微信号输入
  setwxcode: function (e) {
    console.log("输入了")
    console.log(e.detail);
    this.setData({
      wxcode: e.detail
    })
  },

  //个性签名输入
  setsig: function (e) {
    console.log("输入了")
    console.log(e.detail);
    this.setData({
      sign: e.detail
    })
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
    
  },

  //点击图片选择手机相册或者电脑本地图片
  changeAvatar: function (e) {
    var that = this
    wx.chooseImage({
      count: 1,// 默认9
      sizeType: ['original', 'compressed'],// 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'],// 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        var tempFilePaths = res.tempFilePaths;
        //上传图片操作
        wx.uploadFile({
          url: api.Upload, //仅为示例，非真实的接口地址
          filePath: tempFilePaths[0],
          name: 'file',
          success(res) {
            // that.setData({
            //   showImg: true
            // })
            var data = res.data
            data = JSON.parse(data);
            console.log(data.data.url);
            that.setData({
              avatar: data.data.url,
            })
            wx.showToast({
              title: '头像上传成功',
              icon: 'none',
              duration: 2000//持续的时间
            })
          }
        })
        

        console.log(tempFilePaths);
        that.setData({
          avatar: tempFilePaths
        })
      }
    })
  },


})