import { Notice } from 'iview'

/*
定义websocket模块
*/


var  websocket=null
// var globalCallback = null
// var lastCmd = ''
var dataArray=[]

// 初始化 websocket
function initWebSocket () {
  console.log("===============initWebSocket=================")
  let wsuri = 'ws://127.0.0.1:33334'

  websocket = new WebSocket(wsuri)
  websocket.onmessage = function (e) {
    websocketonmessage(e)
  }
  websocket.onclose = function (e) {
    websocketclose(e)
    console.log('websocket已关闭')
  }
  websocket.onopen = function () {
    websocketOpen()
  }
  // 连接发生错误的回调方法
  websocket.onerror = function () {
    Notice.error({ title: '与服务器连接发生错误' })
  }
  websocket.binaryType = 'arraybuffer'
  return  websocket;
  // var hearCheck = {
  //   timeout: 10 * 1000, // 心跳检测时长
  //   timeoutObj: null, // 定时变量
  //   reset: function () { // 重置定时
  //     clearTimeout(this.timeoutObj)
  //   },
  //   start: function () { // 开启定时
  //     let self = this
  //     this.timeoutObj = setTimeout(() => {
  //       websocket.close()
  //     }, this.timeout)
  //   }
  // }
}

const _websocketObj=initWebSocket();

// function reconnect (url) {
//   if (reconnect.lockReconnect) return
//   reconnect.lockReconnect = true
//   setTimeout(function () {     // 没连接上会一直重连，设置延迟避免请求过多
//     createWebSocket(url)
//     reconnect.lockReconnect = false
//   }, 2000);
// }

/**
 * @param {ArrayBuffer} agentData -发送给服务器的数据
 * @param {number} pLastCmd -请求码
 * @param {function} callback -发送后的回调，用来接收服务器的消息
 */
function sendSock (agentData, pLastCmd, callback) {
  
  var dataAbj={
    'lastCmd':pLastCmd,
    'globalCallback':callback,
  }
  // lastCmd = pLastCmd
  // globalCallback = callback
  let hasData=false;
  for(var i=0;i<dataArray.length;i++){
    if (dataArray[i].lastCmd==pLastCmd) {
      hasData=true
    } 
  }
  if(hasData==false){
    dataArray.push(dataAbj)
  }
  
  if (websocket === null) {
    return
  }
  if (websocket.readyState === websocket.OPEN) {
    // 若是ws开启状态
    websocketsend(agentData)
  } else if (websocket.readyState === websocket.CONNECTING) {
    // 若是 正在开启状态，则等待1s后重新调用
    setTimeout(function () {
      sendSock(agentData, pLastCmd, callback)
    }, 1000)
  } else {
    // 若未开启 ，则等待1s后重新调用
    setTimeout(function () {
      sendSock(agentData, pLastCmd, callback)
    }, 1000)
  }
}

// 数据接收
function websocketonmessage (e) {
  let dataview = new DataView(e.data)
  // let size = dataview.getUint8(0, true)
  let flag = dataview.getInt8(3, true)
  let datacmd = dataview.getInt16(4, true)
  const databody = new Uint8Array(e.data, 8)
  // if (e.data.byteLength - 8 === size) {
  let hasData=false;
  for(var i=0;i<dataArray.length;i++){
    if (parseInt(datacmd) === dataArray[i].lastCmd) {
      dataArray[i].globalCallback({
        flag: flag,
        data: databody
      })
      hasData=true;
      dataArray.splice(i,1);
    } else {
      hasData=false;
    }
 }
 if(hasData=false){
  console.log('请求码不对')
 }
  // } else {
  //   console.log('包不完整')
  // }
}

// 数据发送
function websocketsend (data) {
  websocket.send(data)
}

// 关闭
function websocketclose (e) {
  // console.log(websocket.readyState)
  websocket.close()
  websocket = null
  Notice.error({ title: '与服务器断开连接' })
}

function websocketOpen (e) {
  Notice.success({ title: '已连接服务器'})
}


export {
  websocket,
  _websocketObj,
  sendSock,
  initWebSocket,
  websocketclose,
  websocketOpen
}
