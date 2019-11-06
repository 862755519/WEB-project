var Utils = require('../../utils/util.js');
var check = require('../../utils/check.js');
var api = require('../../config/api.js');

Page({
  data: {
    time: "2019-12-16",
    content: '',

    textTitle:'',

    height: 500,
    width: 300,
    imgIndex: 0,
    imageLength: 0,
    firstCon: '',
    dataList: [],

    dataImg:'',

    showImg: false
  },

  // 发布文章事件

  shenqing:function(){
    if(check.isEmpty(this.data.textTitle)){

      wx.showModal({
        title: '提示',
        content: '标题不能为空',
        confirmText: "我知道了",
        confirmColor: "#2492F4",
      })
      return;
    }

    if(check.isEmpty(this.data.dataImg)){

      wx.showModal({
        title: '提示',
        content: '图片不能为空',
        confirmText: "我知道了",
        confirmColor: "#2492F4",
      })
      return;
    }

    if(check.isEmpty(this.data.firstCon)){

      wx.showModal({
        title: '提示',
        content: '内容不能为空',
        confirmText: "我知道了",
        confirmColor: "#2492F4",
      })
      return;
    }
    var that = this;
    console.log(that.data.textTitle);

    Utils.request(api.Report,{
      title: that.data.textTitle, 
      content: that.data.firstCon,
      img: that.data.dataImg
    },'POST').then(res => {

      /* 成功之后可以跳转 */
    })
  },

  onLoad: function (options) {


  },

  // 获取 标题输入的标题值

  inputtitle:function(e){
    this.setData({
      textTitle:e.detail

    })
  },


  onShow: function (e) {
    var that = this;
    //动态获取屏幕尺寸
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          height: res.windowHeight,
          width: res.windowWidth,
        })
      },
      fail: function (res) { },
      complete: function (res) { },
    })
  },
  /**
   * 输入监听
   */
  inputCon: function (e) {
    let that = this;
    if (0 === e.currentTarget.id - 0) {//第一个文本框的输入监听
      that.data.firstCon = e.detail.value;
    } else {
      that.data.dataList[e.currentTarget.id - 1].value = e.detail.value;
    }
  },
  /**
   * 失去焦点监听
   * 根据失去监听的input的位置来判断图片的插入位置
   */
  outBlur: function (e) {
    let that = this;
    that.data.imgIndex = e.currentTarget.id - 0;
  },
  /**
   * 添加图片
   */
  addImg: function () {
    // wx.uploadFile({  
    //   url: api.Upload,  
    //   filePath: api.Upload,  
    //   name: 'content',  
    //   formData: adds,   
    //   success: function (res) {  
    //     console.log(res)  
    //     if (res) {  
    //       wx.showToast({  
    //         title: '已提交发布！',  
    //         duration: 3000  
    //       });  
    //     }  
    //   }  
    // })  

    var that = this;
    //这里考虑到性能，对于图片张数做了限制
    if (that.data.dataList.length >= 1) {//超过四张
      wx.showModal({
        title: '提示',
        content: '最多只能添加1张封面图片哦',
        confirmText: "我知道了",
        confirmColor: "#2492F4",
        showCancel: false,
        success: function (res) {
          if (res.confirm) {
          } else if (res.cancel) {
          }
        }
      })
    } else {//添加图片
      // wx.showActionSheet({
      //   itemList: ['从相册选择', '拍照'],
      //   itemColor: '#2492F4',
      //   success: function (res) {
      //     var choseType = res.tapIndex == 0 ? "album" : res.tapIndex == 1 ? "camera" : "";
      //     if (choseType != "") {
      //       wx.chooseImage({
      //         sizeType: ['original'],//原图
      //         sourceType: [choseType],
      //         count: 1,//每次添加一张
      //         success: function (res) {
      //           console.log("==============================================")
      //           console.log(res)
      //           var info = {
      //             pic: res.tempFiles,//存储本地地址
      //             temp: true,//标记是否是临时图片
      //             value:' ',//存储图片下方相邻的输入框的内容
      //           }
      //           that.data.dataList.splice(that.data.imgIndex, 0, info);//方法自行百度
      //           that.setData({
      //             // dataImgdataImg: that.data.dataList,
      //             dataImg: res.tempFiles[0],
      //           })

            
      //         }
      //       })
      //     }
      //   },
      //   fail: function (res) {
      //     console.log(res.errMsg)
      //   }
      // })

      wx.chooseImage({

        
        success (res) {
          const tempFilePaths = res.tempFilePaths

          wx.uploadFile({
            url: api.Upload, //仅为示例，非真实的接口地址
            filePath: tempFilePaths[0],
            name: 'file',

            success (res){
              that.setData({
                showImg:true
              })
              var data = res.data
             data=  JSON.parse(data);

              console.log(data.data.url);
              that.setData({
                dataImg: data.data.url,
              })
            }

          })   

        }
      })

      // wx.chooseImage({
      //   count: 1, // 默认9
      //   sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      //   sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      //   success: function (res) {
      //     // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
      //     var tempFilePaths = res.tempFilePaths;
      //     wx.uploadFile({
      //       url: api.Upload,      //此处换上你的接口地址
      //       filePath: tempFilePaths[0],
      //       name: 'img',
      //       header: {  
      //         "Content-Type": "multipart/form-data",
      //         'accept': 'application/json',
      //         'Authorization': 'Bearer ..'    //若有token，此处换上你的token，没有的话省略
      //       },
      //       formData:{
      //         'user':'test'  //其他额外的formdata，可不写
      //       },
      //       success: function(res){
      //         var data=res.data;
      //         console.log(data);
      //       },
      //       fail: function(res){
      //         console.log(res);


      //       },
      //     })
      //   }
      // })
    }
  },
  /**
   * 删除图片
   */
  deletedImg: function (e) {
    let that = this;
    let index = e.currentTarget.dataset.index;
    wx.showActionSheet({
      itemList: ['删除图片'],
      success: function (res) {
        if (res.tapIndex === 0) {//点击删除图片
          if (index === 0 && that.data.dataList[index].value != null) {//删除第一张，要与最上方的textarea合并
            that.data.firstCon = that.data.firstCon + that.data.dataList[index].value;
          } else if (index > 0 && that.data.dataList[index].value != null) {
            that.data.dataList[index - 1].value = that.data.dataList[index - 1].value + that.data.dataList[index].value;
          }
          that.data.dataList.splice(index, 1);
          that.setData({
            firstCon: that.data.firstCon,
            dataList: that.data.dataList
          })
        }
      },
      fail: function (res) {
        console.log(res.errMsg)
      }
    })
  },
  //失败警告
  do_fail: function (a) {
    wx.showToast({
      title: a,
      icon: 'none',
      duration: 1000
    })
  },
})
