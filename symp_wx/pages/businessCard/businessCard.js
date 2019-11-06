var api = require('../../config/api.js');
var util = require('../../utils/util.js');
var user = require('../../utils/user.js');
var index = 0;
// pages/businessCard/businessCard.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    timer: "",
    load: "",//定时器
    show: false,//展示时间
    showlist: [],//展示的文字数组
    index: 0,
    showtext: "",
    usercart: "",
    usertext: "",
    usertoken: "",
    uid: "",
    returntoken: "",
    returnId: "",
    tel: "",
    usertel: "",
    socketStatus: 'closed',//scoket状态
    useropenid: "",//用户openid
    p1: "",
    p2: "",
    fenxiangshow:0

  },

  showtime: function () {

    let that = this
    console.log("改变")



    var list = that.data.showlist;
    var load = that.data.load;

 
    if (list.length != 0) {
      if (that.data.index == list.length) {
        that.setData({
          index: 0
        })
      }
      console.log(that.data.index)
      console.log(list.length)
      let text = list[that.data.index].nickname;
      console.log(text)

      console.log("==============" + index)
      console.log(index % 2)
      if (index % 2 == 0) {
        that.setData({
          showtext: text,
          show: !that.data.show,
          index: that.data.index + 1
        });
      } else {
        that.setData({
          showtext: text,
          show: !that.data.show,
        });
      }
    }
    index = index + 1;;
  },

  //点击跳转到文章详情
  ontext: function (e) {
    console.log("点击了")
    let artid = e.currentTarget.dataset.artid;
    console.log(artid);
    wx.navigateTo({
      url: '/pages/text/text?id=' + artid,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log("onload")
    var that = this;
    console.log(options)
    const open = wx.getStorageSync("openid");
    console.log("openid" + open);
    that.setData({
      useropenid: open
    })
    let num = options.data1;
    wx.setStorageSync("num", num);
    let utoken = options.data2;
    that.setData({
      p1: num,
      p2: utoken
    })
    this.getUserInfo(num);

    that.setData({
      load: setInterval(function () {
        that.showtime();
      }, 4000)
    })

    this.fenxiang();
  },

  getUserInfo: function (num) {
    var that = this;
    if (num == undefined || num == '' || num == null) {
      console.log("登录进入")
      that.getuserinfo();
    } else {
      console.log("分享进入");
      util.request(api.UserCart, {
        returnId: num
      }, 'GET').then(res => {
        console.log(res.data);
        let tel = res.data.card.mobile;
        var str2 = tel.substr(0, 3) + "****" + tel.substr(7);
        this.setData({
          usercart: res.data.card,
          usertext: res.data.art,
          tel: res.data.card.mobile,
          usertel: str2
        })
        that.openSocket();

      }).catch((err) => {

      });


    }
  },

  //回传名片
  retcart: function () {
    console.log("回传名片")
    var that = this;
   

    if (that.data.p1 == undefined || that.data.p1 == "" || that.data.p1 == null) {
      wx.showToast({
        title: '无法回传名片',
        icon: "none"
      })
      return;
    }
    util.requestJson(api.ReturnCart, {
      token: that.data.p1,
      returnId: that.data.p1
    }, 'GET').then(res => {
      console.log(res);
      wx.showToast({
        title: '回传名片成功',
        icon: "none"
      })
    }).catch((err) => {
      if (err.data != null) {
        wx.showToast({
          title: err.data.message,
          duration: 2000,//持续的时间
          icon: "none"
        })
      } else {
        wx.showToast({
          title: err.data.errmsg,
          duration: 2000,//持续的时间
          icon: "none"
        })
      }
    });
  },

  // 点击名片简介
  introduction() {
    wx.redirectTo({
      url: "/pages/introduction/introduction",
    })
  },


  getuserinfo: function () {
    console.log("获取用户信息")
    var that = this;
    util.request(api.UserCart, {
      token: that.data.usertoken,
    }, 'GET').then(res => {
      let tel = res.data.card.mobile;
      var str2 = tel.substr(0, 3) + "****" + tel.substr(7);
      console.log(res.data);


      wx.setStorageSync('bcBrief', res.data.card)

      this.setData({
        usercart: res.data.card,
        usertext: res.data.art,
        tel: res.data.card.mobile,
        usertel: str2
      })

      if (that.data.socketStatus == 'closed') {
        that.openSocket();
      }
    }).catch((err) => {

    });
  },




  //拨打电话
  call: function () {
    var that = this;
    let phone = that.data.tel;
    console.log(phone)
    if (phone == "" || phone == undefined) {
      wx.showToast({
        title: '没有可以拨打的电话',
        icon: 'none',
        duration: 2000//持续的时间
      })
      return;
    }
    wx.makePhoneCall({
      phoneNumber: phone,
      success: function () {
        console.log("拨打电话成功！")
      },
      fail: function () {
        console.log("拨打电话失败！")
      }
    })


  },


  //复制微信号
  copyText: function (e) {
    console.log(e.currentTarget.dataset.text)
    console.log("复制号码")
    if (e.currentTarget.dataset.text == "" || e.currentTarget.dataset.text == undefined) {
      wx.showToast({
        title: '没有可以复制的内容！',
        icon: 'none',
        duration: 2000//持续的时间
      })
      return;
    }
    wx.setClipboardData({
      data: e.currentTarget.dataset.text,
      success: function (res) {
        wx.getClipboardData({
          success: function (res) {
            wx.showToast({
              title: '复制成功',
              icon: 'none',
              duration: 2000//持续的时间
            })
          },
          fail: function () {
            console.log("复制失败")
            wx.showToast({
              title: '复制失败',
              icon: 'none',
              duration: 2000//持续的时间
            })
          }
        })
      }
    })
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
    console.log("onshow")
    var usId = wx.getStorageSync("usId")
    if (usId != null && usId != undefined && usId != '') {
      this.getUserInfo(usId);
      wx.setStorageSync("usId", null);
      return;
    }
    var p1 = this.data.p1;
    if (p1 == null || p1 == undefined || p1 == '') {
      this.getuserinfo();
    }
  },
  dianji: function () {
    console.log("点击了");
    wx.redirectTo({
      url: "pages/textlist/textlist",
    })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    clearInterval(this.data.load)
    this.closeSocket();
    this.setData({
      p1: undefined
    })

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

  openSocket() {
    console.log("打开scoket")
    //打开时的动作
    wx.onSocketOpen(() => {
      console.log('WebSocket 已连接')
      this.setData({
        socketStatus: "connected"
      })
      this.sendMessage();
    })
    //断开时的动作
    wx.onSocketClose(() => {
      console.log('WebSocket 已断开')
      this.setData({
        socketStatus: "connected"
      })
    })
    //报错时的动作
    wx.onSocketError(error => {
      console.error('socket error:', error)
    })
    // 监听服务器推送的消息
    wx.onSocketMessage(message => {
      //把JSONStr转为JSON
      message = message.data.replace(" ", "");
      if (typeof message != 'object') {
        message = message.replace(/\ufeff/g, ""); //重点
        var jj = JSON.parse(message);
        message = jj;
      }
      console.log("【websocket监听到消息】内容如下：");
      console.log(message);
      var that = this;
      that.setData({
        showlist: message
      })

    })
    // 打开信道
    wx.connectSocket({
      url: "ws://" + "hapi.kmfhi.com" + ":8888",
    })
  },

  //关闭信道
  closeSocket() {
    console.log("关闭连接");
    if (this.data.socketStatus == 'connected') {
      wx.closeSocket({
        success: () => {
          this.setData({
            socketStatus: "connected"
          })
        }
      })
    }
  },

  //发送消息函数
  sendMessage() {
    console.log(this.data.usercart.usId)
    let userid = this.data.usercart.usId
    console.log("用户id" + userid)
    if (this.data.socketStatus === 'connected') {
      //自定义的发给后台识别的参数 ，我这里发送的是name
      wx.sendSocketMessage({
        data: "{\"name\":\"" + this.data.useropenid + "," + userid + "\"}"
      })
    }
  },

  fenxiang:function(){
    var that = this;
    util.requestJson(api.Share, {

    }, 'GET').then(res => {
         that.setData({
           fenxiangshow:0
         })
      }).catch((err) => {
        that.setData({
          fenxiangshow: 1
        })
        if (err.data != null) {
          console.log(err.data.message)
          wx.showToast({
            title: err.data.message,
            duration: 2000,//持续的时间
            icon: "none"
          })
          return;
        } else {
          wx.showToast({
            title: err.data.errmsg,
            duration: 2000,//持续的时间
            icon: "none"
          })
        }
      });
  },

  noshare:function(){
    wx.showToast({
      title: '分享次数受限',
      icon:"none"
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function (ops) {
    var that = this;
   
      console.log("可以分享");
      let uid = that.data.usercart.usId;
      console.log(uid)
      let token = that.data.usertoken;
      if (ops.from === 'button') {
        // 来自页面内转发按钮
        console.log(ops.target)
      }
      return {
        title: "个人名片",  // 分享名称
        desc: "华商汇事业名片小程序",
        path: 'pages/businessCard/businessCard?data1=' + uid + '&data2=' + token,  // 点击分享后的链接要来到的页面的路径已经对应需要的参
        success: function (res) {  // 分享成功之后的操作
          console.log("分享成功:" + JSON.stringify(res));
          wx.showToast({
            title: '分享成功',
            icon: "none"
          })
        },
        fail: function (res) {  // 分享失败之后的操作
          console.log("分享失败:" + JSON.stringify(res));
        }
      }

  }
})