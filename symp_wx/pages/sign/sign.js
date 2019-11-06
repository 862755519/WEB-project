const util = require('../../utils/util.js');
const api = require('../../config/api.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    
  },
  onChange(event) {
    this.setData({
      activeNames: event.detail
    });
  },


  /**
   * 生命周期函数--监听页面加载
   */


  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})

// components/calendar/calendar.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    currentYear: { // 当前显示的年
      type: Number,
      value: new Date().getFullYear()
    },
    currentMonth: { // // 当前显示的月
      type: Number,
      value: new Date().getMonth() + 1
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    currentMonthDateLen: 0, // 当月天数
    preMonthDateLen: 0, // 当月中，上月多余天数
    allArr: [], // 当月所有数据
    activeNames: ['1'],
    usertoken: "",
    active: "",//活动信息
    time: "",
    date: "",
    signlist: [],//签到记录
    count:0,//签到天数

  },
  ready() {
  // this.getAllArr()
  },

  //获取当前时间

  /**
   * 组件的方法列表
   */
  methods: {
    //页面加载
    onLoad: function(options) {
      console.log("111111")
      let token = wx.getStorageSync("token")
      console.log(token);
      this.setData({
        usertoken: token
      })
      this.getDate();
      this.getSign();
    },

    //获取签到列表信息
    getSign: function() {
      console.log("获取信息");
      var that = this;
      util.requestJson(api.SingInfo, {
        token: that.data.usertoken,
        endTime:that.data.time
      }, 'GET').then(res => {
        console.log(res);
        this.setData({
          active: res.activity,
          signlist: res.record,
          count:res.count
        })
        that.getAllArr();
        
      }).catch((err) => {
        wx.showToast({
          title: err.errmsg,
          icon: 'none',
          duration: 2000//持续的时间
        })
      });
    },

    //获取当前系统时间格式化
    getDate: function() {
      var date = new Date();
      var month = date.getMonth() + 1;
      var strDate = date.getDate();
      var h = date.getHours();
      var m = date.getMinutes();
      if (month >= 1 && month <= 9) {
        month = "0" + month;
      }
      if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
      }
      console.log(h)
      if (h >= 0 && h <= 9) {
        
        h = "0" + h;
      
      }
      if (m >= 0 && m <= 9) {
        m = "0" + m;
      }
      var currentDate = date.getFullYear() + "-" + month + "-" + strDate
        + " " + h + ":" + m + ":" + "00";
      var data = date.getFullYear() + "-" + month + "-" + strDate+" "+"00:00:00"
       console.log(currentDate);
      this.setData({
        time:currentDate,
        date:data
      })
    },

   //签到函数
    sign: function() {
      var that =this;
       console.log("签到");
       console.log(that.data.date);
      util.requestJson(api.SetSing, {
        token: that.data.usertoken,
        crtTime:that.data.date
      }, 'GET').then(res => {
        console.log(res);
        console.log("签到成功");
        wx.switchTab({
          url: '/pages/home/home'
        })
        wx.showToast({
          title: res.errmsg,
          icon: 'none',
          duration: 2000//持续的时间
        })
      }).catch((err) => {
        wx.showToast({
          title: '签到失败',
          icon: 'none',
          duration: 2000//持续的时间
        })
      });
    },
   
    // 获取某年某月总共多少天
    getDateLen(year, month) {
      let actualMonth = month - 1;
      let timeDistance = +new Date(year, month) - +new Date(year, actualMonth);
      return timeDistance / (1000 * 60 * 60 * 24);
    },
    // 获取某月1号是周几
    getFirstDateWeek(year, month) {
      return new Date(year, month - 1, 1).getDay()
    },
    // 上月 年、月
    preMonth(year, month) {
      if (month == 1) {
        return {
          year: --year,
          month: 12
        }
      } else {
        return {
          year: year,
          month: --month
        }
      }
    },
    // 下月 年、月
    nextMonth(year, month) {
      if (month == 12) {
        return {
          year: ++year,
          month: 1
        }
      } else {
        return {
          year: year,
          month: ++month
        }
      }
    },
    // 获取当月数据，返回数组
    getCurrentArr() {
      let currentMonthDateLen = this.getDateLen(this.data.currentYear, this.data.currentMonth) // 获取当月天数
      let currentMonthDateArr = [] // 定义空数组
      if (currentMonthDateLen > 0) {
        for (let i = 1; i <= currentMonthDateLen; i++) {
          currentMonthDateArr.push({
            month: 'current', // 只是为了增加标识，区分上下月
            date: i
          })
        }
      }
      this.setData({
        currentMonthDateLen
      })
      return currentMonthDateArr
    },
    // 获取当月中，上月多余数据，返回数组
    getPreArr() {
      let preMonthDateLen = this.getFirstDateWeek(this.data.currentYear, this.data.currentMonth) // 当月1号是周几 == 上月残余天数）
      let preMonthDateArr = [] // 定义空数组
      if (preMonthDateLen > 0) {
        let {
          year,
          month
        } = this.preMonth(this.data.currentYear, this.data.currentMonth) // 获取上月 年、月
        let date = this.getDateLen(year, month) // 获取上月天数
        for (let i = 0; i < preMonthDateLen; i++) {
          preMonthDateArr.unshift({ // 尾部追加
            month: 'pre', // 只是为了增加标识，区分当、下月
            date: date
          })
          date--
        }
      }
      this.setData({
        preMonthDateLen
      })
      return preMonthDateArr
    },
    // 获取当月中，下月多余数据，返回数组
    getNextArr() {
      let nextMonthDateLen = 42 - this.data.preMonthDateLen - this.data.currentMonthDateLen // 下月多余天数
      let nextMonthDateArr = [] // 定义空数组
      if (nextMonthDateLen > 0) {
        for (let i = 1; i <= nextMonthDateLen; i++) {
          nextMonthDateArr.push({
            month: 'next', // 只是为了增加标识，区分当、上月
            date: i
          })
        }
      }
      return nextMonthDateArr
    },
    // 整合当月所有数据
    getAllArr() {
     
      var that = this;
      let preArr = this.getPreArr()
      let currentArr = this.getCurrentArr()
      let nextArr = this.getNextArr()
      var num = 0;
      let allArr = [...preArr, ...currentArr, ...nextArr,...num];
      let list = that.data.signlist;
      console.log(list)
      console.log(allArr);
      for (var i = 0; i < allArr.length; i++) {
        allArr[i]['num'] = num;
        console.log(allArr[i]);
         for(var j = 0; j<list.length;j++){
           console.log(allArr[i].date+"本月数");
           console.log(list[j].day+"签到数");
           if (allArr[i].date == list[j].day){
             console.log("一样一样的");
             allArr[i].num = 1;
           }
          
         }
        
      }
      console.log(allArr)
      this.setData({
        allArr
      })

      let sendObj = {
        currentYear: this.data.currentYear,
        currentMonth: this.data.currentMonth,
        allArr: allArr
      }
      // console.log(sendObj)
      this.triggerEvent('sendObj', sendObj)
    },
    // 点击 上月
    gotoPreMonth() {
      let {
        year,
        month
      } = this.preMonth(this.data.currentYear, this.data.currentMonth)
      this.setData({
        currentYear: year,
        currentMonth: month
      })
      this.getAllArr()
    },
    // 点击 下月
    gotoNextMonth() {
      let {
        year,
        month
      } = this.nextMonth(this.data.currentYear, this.data.currentMonth)
      this.setData({
        currentYear: year,
        currentMonth: month
      })
      this.getAllArr()
    }
  }
})