
const util = require('../../utils/util.js');
const api = require('../../config/api.js');
Page({
  /**
   * 页面的初始数据
   */
  data: {
    active: 0,
    page:1,//当前页
    limit:10,//每页条数
    usertoken:"",
    list:[],//精彩内容推荐
    show: true,
    show:true,
    state: 0,
    taglist:[],
    textlist:[],
    status:0
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
    console.log(token);
    this.getlist();
    this.getTag();
  },

  //查看详情
  showtext:function(e){
    let textid =  e.currentTarget.dataset.id;
    console.log(textid)
    wx.navigateTo({
      url: '/pages/text/text?id=' +textid
      })
    
  
  },
  //获取精彩文章列表
  getlist:function(){
    console.log("获取精彩文章列表");
    var that = this;
    console.log(that.data.state)
    util.request(api.Artlist, {
      pageNo:that.data.page,
      pageSize:that.data.limit,
      artRecommend:"1",
    }, 'GET').then(res => {
      console.log(res);
      this.setData({
        list: res.data.data.list
      })
      if(res.data.data.list.length == 0){
        console.log("没有更多了")
        that.setData({
          show: false
        }) 
        
      }
      if (that.data.list.length == res.data.data.total){
        that.setData({
          show: false
        }) 
      }
      
    }).catch((err) => {
      that.setData({
        show: false
      })
        wx.showToast({
          title: '数据请求失败',
        })
    });
  },

  //获取文章标签
  getTag:function(){
    console.log("文章标签")
    util.request(api.TextTag, {
    }, 'GET').then(res => {
      console.log(res);
      this.setData({
       taglist:res.data
      })
    }).catch((err) => {

    });
  },

  //点击标签事件
  change:function(e){
    var that = this;
    this.setData({
      show:true
    })
     let id = e.detail.name;
     console.log("点击了")
     console.log(e.detail.name)
    util.request(api.Artlist, {
      pageNo: that.data.page,
      pageSize: that.data.limit,
      bcId: id,
    }, 'GET').then(res => {
      console.log()
      this.setData({
        textlist: res.data.data.list
      })
      console.log(that.data.textlist.length);
      if (that.data.textlist.length == 0) {
        console.log("没有更多了")
        that.setData({
          show:false
        })
      }
      console.log()
      if (that.data.textlist.length == res.data.data.total) {
        that.setData({
          show: false
        })
      }
      console.log(res);
    
    }).catch((err) => {
      that.setData({
        show: false
      })
      wx.showToast({
        title: '没有更多了',
        icon:"none"
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
    var that = this;
    console.log(that.data.state);
    if (that.data.state == false) {
      console.log("没有更多了")
      this.setData({
        show: false
      })
      return;
    }
    console.log("上拉刷新");
    this.setData({
      page: that.data.page + 1,
      searchLoading: "true"
    })
    console.log(that.data.list);
    util.request(api.Artlist, {
      pageNo: that.data.page,
      pageSize: that.data.limit,
      artRecommend: "1",
    }, 'GET').then(res => {
      this.setData({
        list: that.data.list.concat(res.data.data.list),
        searchLoading: "false"

      })
      if (res.data.data.list.length == 0 || res.data.data.list.length <= 10) {
        console.log("没有数据了");
        this.setData({
          state: false,
          searchLoading: ""
        })

      }
      console.log(that.data.list);
    }).catch((err) => {
      this.setData({
        searchLoading: "false"
      })
    }); 
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    
  }
})