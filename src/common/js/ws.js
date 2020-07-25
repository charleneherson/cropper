// socket已经连接成功
var socketOpen = false
// socket已经调用关闭function
var socketClose = false
// socket发送的消息队列
var socketMsgQueue = []
// 判断心跳变量
var heart = ''
// 心跳失败次数
var heartBeatFailCount = 0
// 错误重连次数
var errorCount = 0
// 终止心跳
var heartBeatTimeOut = null;
// 终止重新连接
var connectSocketTimeOut = null;

var webSocket = {
  connectSocket: function(options) {
    socketOpen = false
    socketClose = false
    socketMsgQueue = []
    // 打开信道
    wx.connectSocket({
      url: "ws://172.30.12.22:8888/gop2/ws/speech",
      // url: "wss://api.cloud.ssapi.cn/en.sent.score?connectid=7ab059fc547c5e77bdd076070ea23b47",
      // header:{
      //   'content-type': 'audio/x-raw',
      //   'Transfer-Encoding': 'chunked'
      // },
      // method: 'PUT',
      // protocols: ['protocol1'],
      tcpNoDelay: false, // 建立TCP 连接的时候的 TCP_NODELAY 设置	
      perMessageDeflate: false, // 是否开启压缩扩展	
      timeout: 60000,
      success(res) {
        console.log('-------打开信道-----');
        console.log(res);
      }
    })
  },
  sendSocketMessage: function(options) {
    if (socketOpen) {
      wx.sendSocketMessage({
        data: options.data,
        success: function(res) {
          if (options) {
            options.success && options.success(res);
          }
        },
        fail: function(res) {
          if (options) {
            options.fail && options.fail(res);
          }
        }
      })
    } else {
      socketMsgQueue.push(options.msg)
    }
  },
  closeSocket: function(options) {
    errorCount = 0;
    if (connectSocketTimeOut) {
      clearTimeout(connectSocketTimeOut);
      connectSocketTimeOut = null;
    }
    socketClose = true;
    var self = this;
    self.stopHeartBeat();
    wx.closeSocket({
      success: function(res) {
        console.log('-------关闭信道-----');
        if (options) {
          options.success && options.success(res);
        }
      },
      fail: function(res) {
        if (options) {
          options.fail && options.fail(res);
        }
      }
    })
  },

  // 收到消息回调
  onSocketMessageCallback: function(msg) {

  },
  // 链家到服务器回调
  onSocketConnectSuccessCallback: function(msg) {

  },

  // 开始心跳
  startHeartBeat: function() {
    console.log('socket开始心跳')
    var self = this;
    heart = 'heart';
    self.heartBeat();
  },

  // 结束心跳
  stopHeartBeat: function() {
    console.log('socket结束心跳')
    var self = this;
    heart = '';
    if (heartBeatTimeOut) {
      clearTimeout(heartBeatTimeOut);
      heartBeatTimeOut = null;
    }
    if (connectSocketTimeOut) {
      clearTimeout(connectSocketTimeOut);
      connectSocketTimeOut = null;
    }
  },

  // 心跳
  heartBeat: function() {
    var self = this;
    if (!heart) {
      return;
    }
    self.sendSocketMessage({
      data: JSON.stringify({
        'msg_type': '心跳'
      }),
      success: function(res) {
        if (heart) {
          heartBeatTimeOut = setTimeout(() => {
            self.heartBeat();
          }, 7000);
        }
      },
      fail: function(res) {
        console.log('socket心跳失败');
        if (heartBeatFailCount > 2) {
        //重连
        self.connectSocket();
        }
        if (heart) {
          heartBeatTimeOut = setTimeout(() => {
            self.heartBeat();
          }, 7000);
        }
        heartBeatFailCount++;
      },
    });
  }
}

// 监听WebSocket连接打开事件。callback 回调函数
wx.onSocketOpen(function(res) {
  console.log('WebSocket连接已打开!')
  // 如果已经调用过关闭function
  webSocket.onSocketConnectSuccessCallback(res)
  if (socketClose) {
    webSocket.closeSocket();
  } else {
    socketOpen = true
    for (var i = 0; i < socketMsgQueue.length; i++) {
      webSocket.sendSocketMessage({data:socketMsgQueue[i]})
    }
    socketMsgQueue = []
    webSocket.startHeartBeat();
  }
})

// 监听WebSocket接受到服务器的消息事件。
wx.onSocketMessage(function(res) {
  console.log('收到服务器内容：' + res.data);
  //把JSONStr转为JSON
  let message = res.data.replace(" ", "");
  if (typeof message != 'object') {
    message = message.replace(/\ufeff/g, ""); //重点
    var jj = JSON.parse(message);
    message = jj;
  }
  webSocket.onSocketMessageCallback(message)
})
// 监听WebSocket错误。
wx.onSocketError(function(res) {
  console.log('WebSocket连接打开失败，请检查！', res)
  if(errorCount > 3) {
    socketClose = true;
    return;
  }
    webSocket.connectSocket();
  
  errorCount++;
})
// 监听WebSocket关闭。
wx.onSocketClose(function(res) {
  console.log('WebSocket 已关闭！')
  if (!socketClose) {
    clearTimeout(connectSocketTimeOut)
    connectSocketTimeOut = setTimeout(() => {
      webSocket.connectSocket();
    }, 3000);
  }
})

module.exports = webSocket;