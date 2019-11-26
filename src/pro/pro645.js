import { Sum8Check } from '@/utils/commUtil.js'

// 数据域包括数据标识、密码、操作者代码、数据、帧序号等
var ProChar = {
  Char_Pre: 0xFE,
  Char_Head: 0x68,
  Char_End: 0x16,
  Char_Mask: 0x33,
  Char_Broad: 0x99
}
var ProPos = {
  Pos_Head1: 0,
  Pos_Addr: 1,
  Pos_Head2: 7,
  Pos_Ctrl: 8,
  Pos_Len: 9,
  Pos_Data: 10
}
var ProLen = {
  Len_Max: 255,
  Len_Pre: 2,
  Len_HeadChar: 1,
  Len_EndChar: 1,
  Len_Min: 12,
  Len_NonData: 12,
  Len_Ctrl: 1,
  Len_Len: 1,
  Len_Sum: 1,
  Len_Addr: 6,
  Len_Fn: 4,
  Len_Pw: 4,
  Len_OprCode: 4
}
var ProCtrl = {
  Ctrl_ReadAsk: 0x11,
  Ctrl_ReadHeadOkEnd: 0x91,
  Ctrl_ReadHeadOkNext: 0xB1,
  Ctrl_ReadHeadEx: 0xD1,
  Ctrl_ReadNextAsk: 0x12,
  Ctrl_ReadNextOkEnd: 0x92,
  Ctrl_ReadNextOkNext: 0xB2,
  Ctrl_ReadNextEx: 0xD2,
  Ctrl_WriteAsk: 0x14,
  Ctrl_WriteRetOk: 0x94,
  Ctrl_WriteRetEx: 0xD4,
  Ctrl_WriteCommAddr: 0x15,
  Ctrl_WriteCommAddrOk: 0x95,
  Ctrl_ZeroMeter: 0x1A,
  Ctrl_ZeroMeterOk: 0x9A,
  Ctrl_ZeroMeterEx: 0xDA,
  Ctrl_BroadCollate: 0x8,
  Ctrl_BroadResetSlave: 0x9,
  Ctrl_Switch: 0x1C,
  Ctrl_SwitchOk: 0x9C,
  Ctrl_SwitchEx: 0xDC
}
var Pro07Fn = {
  Fn_ValZuHeYgZ: 0x00000000,
  Fn_ValExtAll: 0x000100FF,
  Fn_ValZyZ: 0x00010000,
  Fn_ValFyZ: 0x00020000,
  Fn_Va: 0x02010100,
  Fn_Ia: 0x02020100,
  Fn_ActivePow: 0x02030000,
  Fn_PowFactor: 0x02060000,
  Fn_BuyCount: 0x03330201, // 购电次数 2
  Fn_BuyQuanSum: 0x03320601, // 累计购电量 4
  Fn_LeftQuan: 0x00900100, // 剩余电量 4
  Fn_OverQuan: 0x00900101, // 透支电量 4
  Fn_LeftFee: 0x00900200, // 剩余金额 4 xxxxxx.xx
  Fn_OverFee: 0x00900201, // 透支金额 4 xxxxxx.xx
  Fn_AlarmQuan: 0x04000F01, // 报警电量 4
  Fn_BuyFeeSum: 0x03330601, // 累计购电金额 4,
  Fn_SwitchOff: 0x1A000000,
  Fn_SwitchOnAllow: 0x1B000000, /* 合闸允许 */
  Fn_SwitchOnNow: 0x1C000000, /* 直接合闸口 */
  Fn_ParamPt: 0x04000306, /* 07Ct */
  // Fn_CtrlParam: 0x04080001,
  Fn_OpenAccount: 0x07010101, // 开户 4
  Fn_Charge: 0x07010201 // 充值 4 明文或密文
}

function BuildPack (pAddr, pCtrl, pDu, pDuLen, pIsPre) {
  let buffer = new ArrayBuffer(ProLen.Len_Max)
  let viewPack = new DataView(buffer)
  let i = 0
  let j
  if (pIsPre) {
    for (j = 0; j < ProLen.Len_Pre; j++) {
      viewPack.setUint8(i++, ProChar.Char_Pre)
    }
  }
  viewPack.setUint8(i++, ProChar.Char_Head)
  viewPack.setUint32(i, parseInt(pAddr, 16), true)
  i = i + 4
  viewPack.setUint16(i, parseInt(pAddr, 16) / 4294967296, true)
  i = i + 2
  viewPack.setUint8(i++, ProChar.Char_Head)
  viewPack.setUint8(i++, pCtrl)
  viewPack.setUint8(i++, pDuLen)
  for (j = 0; j < pDuLen; j++) {
    viewPack.setUint8(i++, pDu.getUint8(j) + ProChar.Char_Mask)
  }
  j = i
  if (pIsPre) {
    viewPack.setUint8(i++, Sum8Check(buffer.slice(ProLen.Len_Pre), j - ProLen.Len_Pre))
  } else {
    viewPack.setUint8(i++, Sum8Check(buffer.slice(ProLen.Len_Pre), j))
  }

  viewPack.setUint8(i++, ProChar.Char_End)
  return new Uint8Array(buffer.slice(0, i))
}

function AddrProIntToUiStr (pIntAddr) {
  return pIntAddr.toString(16)
}

function AddrUiStrToProInt (pStrAddr) {
  return parseInt(pStrAddr, 16)
}

export {
  BuildPack,
  ProCtrl,
  Pro07Fn,
  ProPos,
  AddrProIntToUiStr,
  AddrUiStrToProInt
}
