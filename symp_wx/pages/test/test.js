//index.js
//获取应用实例
const app = getApp()
const socket = require("../../utils/socket.js")


Page({
  data: {
   
   
  },

  

  onLoad: function () {
    this.secket();
  },

  secket:function(){
    var socket = io('http://192.168.1.11:8003/', {
      transports: ['websocket']
    });

    //连接监听
    socket.on('connect', () => {
      console.log("成功")

      //向服务器发送注册信息
      socket.emit('register_event', params, (data) => {
        console.log(data)

      });

    })

    socket.on('connect_error', d => {
      console.log("connect_error")
    })

    socket.on('connect_timeout', d => {
      console.log("connect_timeout")
    })

    socket.on('disconnect', reason => {
      console.log("disconnect")
    })

    socket.on('reconnect', attemptNumber => {
      console.log("reconnect")
    })

    socket.on('reconnect_attempt', () => {
      socket.io.opts.transports = ['polling', 'websocket'];
    });

    //监听消息
    socket.on('message', (data, cb) => {
      console.log(data);
      //返回ACK给服务器
      cb("ok")
    });
  }
})