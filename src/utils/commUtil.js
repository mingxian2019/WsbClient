/*
*  通用工具函数
*/
import { Notification } from 'element-ui'
import _this from '../main'
import xlsx from 'xlsx'

Date.prototype.Format = function (fmt) {
  var o = {
    'M+': this.getMonth() + 1, // 月份
    'd+': this.getDate(), // 日
    'H+': this.getHours(), // 小时
    'm+': this.getMinutes(), // 分
    's+': this.getSeconds(), // 秒
    'z+': this.getMilliseconds() // 毫秒
  }
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (this.getFullYear() + '').substr(4 - RegExp.$1.length))
  }
  for (var k in o) {
    if (new RegExp('(' + k + ')').test(fmt)) {
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1)
              ? (o[k]) : ('00' + o[k]).substr(-RegExp.$1.length))
    }
  }
  return fmt
}

function Sum8Check (buf, len) {
  let ret = BigInt(0)
  let view = new DataView(buf)

  for (let i = 0; i < len; i++) {
    ret += BigInt(view.getUint8(i))
  }
  return new Number(ret & BigInt(0xFF))
}

let notifyPromise = Promise.resolve()

function Notify (msg, type, title) {
  console.log(_this)
  notifyPromise = notifyPromise.then(_this.$nextTick).then(() => {
    _this.$notify({
      title: title || '提示',
      message: msg,
      type: type,
      position: 'bottom-right'
    })
  })
}
function downloadExl (json, downName, sum, outFile, type) { // 导出到excel
  let keyMap = [] // 获取键
  for (let k in json[0]) {
    keyMap.push(k)
  }
  console.info('keyMap', keyMap, json)

  let tmpdata = [] // 用来保存转换好的json
  json.map((v, i) => keyMap.map((k, j) => Object.assign({}, {
    v: v[k],
    position: (j > 25 ? getCharCol(j) : String.fromCharCode(65 + j)) + (i + 1)
  }))).reduce((prev, next) => prev.concat(next)).forEach(function (v) {
    tmpdata[v.position] = {
      v: v.v
    }
  })
  let border = {
    bottom: { style: 'thin', color: { rgb: '000000' } },
    top: { style: 'thin', color: { rgb: '000000' } },
    left: { style: 'thin', color: { rgb: '000000' } },
    right: { style: 'thin', color: { rgb: '000000' } }
  }
  let style0 = {
    border: border,
    lignment: { horizontal: 'center', wrapText: true, vertical: 'center' },
    font: { sz: 18, bold: true, color: { rgb: '000000' }, outline: true },
    fill: { bgColor: { indexed: 64 } } }
  let outputPos = Object.keys(tmpdata) // 设置区域,比如表格从A1到D10
  // tmpdata['!merges'] = [{
  //   s: { c: 0, r: 0 }, // 开始
  //   e: { c: sum, r: 0 } // 结束
  // }]
  // for (let i = 0; i < sum; i++) {
  //   tmpdata['A' + i].s = style0
  // }
  let tmpW = []
  for (let w = 0; w < sum; w++) {
    tmpW.push({ wpx: 100 })
  }
  tmpdata['!cols'] = tmpW
  let tmpWB = {
    SheetNames: ['mySheet'], // 保存的表标题
    Sheets: {
      'mySheet': Object.assign({},
        tmpdata, // 内容
        {
          '!ref': outputPos[0] + ':' + outputPos[outputPos.length - 1] // 设置填充区域
        })
    }
  }
  let tmpDown = new Blob([s2ab(xlsx.write(tmpWB,
    { bookType: (type === undefined ? 'xlsx' : type), bookSST: false, type: 'binary' } // 这里的数据是用来定义导出的格式类型
  ))], {
    type: ''
  }) // 创建二进制对象写入转换好的字节流
  var href = URL.createObjectURL(tmpDown) // 创建对象超链接
  outFile.download = downName + '.xlsx' // 下载名称
  outFile.href = href // 绑定a标签
  outFile.click() // 模拟点击实现下载
  setTimeout(function () { // 延时释放
    URL.revokeObjectURL(tmpDown) // 用URL.revokeObjectURL()来释放这个object URL
  }, 100)
}

function s2ab (s) { // 字符串转字符流
  var buf = new ArrayBuffer(s.length)
  var view = new Uint8Array(buf)
  for (var i = 0; i !== s.length; ++i) {
    view[i] = s.charCodeAt(i) & 0xFF
  }
  return buf
}

function getCharCol (n) { // 将指定的自然数转换为26进制表示。映射关系：[0-25] -> [A-Z]。
  let s = ''
  let m = 0
  while (n > 0) {
    m = n % 26 + 1
    s = String.fromCharCode(m + 64) + s
    n = (n - m) / 26
  }
  return s
}

function sortArr (arr, str) {
  let _arr = []
  let _tmp = []
  if (arr.length) {
    for (let i = 0; i < arr.length; i++) {
      _tmp.push(arr[i][str])
    }
  }
  _arr = Array.from(new Set(_tmp))
  return _arr
}

export {
  Sum8Check,
  Notify,
  downloadExl,
  sortArr
}
