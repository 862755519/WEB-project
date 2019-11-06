// pages/demo/demo.js
const util = require('../../utils/util.js');
const api = require('../../config/api.js');

Page({
  /**
   * 页面的初始数据
   */
  data: {
     texttitle:"",//文章标题
     texthtml:"",//文章html
     textimg:"",//文章封面
  },

//上传文章
  uptext:function(){
    var that = this;
    console.log("上传文章")
    console.log(that.data.texttitle);
    console.log(that.data.texthtml);
    if(that.data.texttitle == "" || that.data.texttitle == undefined){
      wx.showToast({
        title: '请输入文章标题',
        duration: 2000,//持续的时间
        icon: "none"
      })
        return;
    }
    if (that.data.textimg == "" || that.data.textimg == undefined) {
      wx.showToast({
        title: '请添加文章封面',
        duration: 2000//持续的时间
      })
      return;
    }
    if (that.data.texthtml == "" || that.data.texthtml == undefined) {
      wx.showToast({
        title: '请输入文章内容',
        duration: 2000,//持续的时间
        icon: "none"
      })
      return;
    }

    //发表请求
    util.request(api.Report, {
      title:that.data.texttitle,
      content:that.data.texthtml,
      img:that.data.textimg
    }, 'POST').then(res => {
      console.log(res);
      wx.switchTab({
        url: '/pages/home/home'
      })
      wx.showToast({
        title: '文章发布成功',
        duration: 2000,//持续的时间
        icon:"none"
      })
      
    }).catch((err) => {
      if (err.data!=null){
        wx.showToast({
          title: err.data.message,
          duration: 2000,//持续的时间
          icon: "none"
        })
      }else{
        wx.showToast({
          title: err.data.errmsg,
          duration: 2000,//持续的时间
          icon: "none"
        })
      }
    });
    
  },
  //添加封面图片
  addimg:function(){
    var that = this;
   console.log("添加图片")
    wx.chooseImage({
      success(res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        const tempFilePaths = res.tempFilePaths
        console.log(tempFilePaths[0])
        //执行上传文件操作
        wx.uploadFile({
          url: api.Upload, //仅为示例，非真实的接口地址
          filePath: tempFilePaths[0],
          name: 'file',
          success(res) {
            // wx.hideLoading();
            const data = JSON.parse(res.data);//获取到的json 转成数组格式 进行赋值 和渲染 
            console.log(data.data.url);
            that.setData({
              textimg: data.data.url
            })
          },
          fail(e) {
            wx.hideLoading();
            console.log(e);
          },
          complete(e) {
            wx.hideLoading();
            console.log(e);
          }
        })
      }
    })
  },
//标题输入
  titleInput:function(e){
    console.log("标题输入");
    console.log(e.detail);
    this.setData({
      texttitle:e.detail
    })
  },
  //文本框开始
  /** editor 部分 **/
  getEditorValue(e) {
    console.log("文本编辑")
    console.log(e);
    this.setData({
      texthtml: e.detail.html
    })
    // this.setData({
    //   ['formData.content']: e.detail.html
    // })
  },
  onEditorReady() {
    const that = this
    wx.createSelectorQuery().select('#editor').context(function (res) {
      that.editorCtx = res.context;
     
      setTimeout(function () {
        let data = that.data;
        wx.hideLoading();
        that.editorCtx.setContents({
          html: data.pageData ? data.pageData.content : '',
          success: (res) => {
            console.log(res)
          },
          fail: (res) => {
            console.log(res)
          }
        })
      }, 1000)
    }).exec()
  },
  insertDivider() {
    this.editorCtx.insertDivider({
      success: function () {
        console.log('insert divider success')
      }
    })
  },
  format(e) {
    let { name, value } = e.target.dataset
    if (!name) return
    // console.log('format', name, value)
    this.editorCtx.format(name, value)
  },
  insertImage() {

    var _this = this;
  
    wx.chooseImage({
      success(res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        const tempFilePaths = res.tempFilePaths
        console.log(tempFilePaths[0])
        //执行上传文件操作
        wx.uploadFile({
          url: api.Upload, //仅为示例，非真实的接口地址
          filePath: tempFilePaths[0],
          name: 'file',
         
          success(res) {
            // wx.hideLoading();
         
            const data = JSON.parse(res.data);//获取到的json 转成数组格式 进行赋值 和渲染图片           
            console.log(data.data.url);
            _this.editorCtx.insertImage({
              src: data.data.url,
              data: {
                id: 'abcd',
                role: 'god'
              },
              success: function () {
                console.log('insert image success')
              }
            })
          },
          fail(e) {
            wx.hideLoading();
            console.log(e);
          },
          complete(e) {
            wx.hideLoading();
            console.log(e);
          }
        })
      }
    })
  },
    /** editor 部分结束 **/


  //文本框结束

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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