/**
 * 该函数用来拼装请求
 * @param {number} size -传入需要发送的数据的字节长度
 * @param {number} cmd -传入需要发送的请求的类型码
 * @param {number} flag -传入需要发送的请求的状态
 * @param {Uint8Array} body -传入需要发送的数据
 */

export function spliceData (size, cmd, data) {
  let buffer = new ArrayBuffer(8 + size)
  let dataview = new DataView(buffer)
  dataview.setUint32(0, size, true)
  dataview.setUint8(3, 0, true)
  dataview.setInt16(4, cmd, true)

  let Chk = 0
  for (let i = 0; i < 6; i++) {
    Chk += dataview.getUint8(i)
  }
  dataview.setUint16(6, Chk, true)
  let body = new Uint8Array(buffer, 8)
  for (let j = 0; j < body.length; j++) {
    body[j] = data[j]
  }

  return buffer
}
