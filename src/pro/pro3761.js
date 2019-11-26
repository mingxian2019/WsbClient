import { Sum8Check } from '@/utils/commUtil.js'

var ProChar = {
  Char_Head: 0x68,
  Char_End: 0x16,
  Char_Fail: 0xEE,
  Char_StringEnd: 0x0d,
  Char_AckYes: 0,
  Char_AckNo: 1
}

var ProPos = {
  Pos_Head1: 0,
  Pos_DataLen: 1,
  Pos_Head2: 5,
  Pos_Ctrl: 6,
  Pos_A1Rgn: 7,
  Pos_A2Addr: 9,
  Pos_A3FesGroupFlag: 11,
  Pos_Afn: 12,
  Pos_Seq: 13,
  Pos_DuId: 14,
  Pos_Fn: 16
}

var ProLen = {
  Len_Max: 2048,
  Len_Min: 18,
  Len_NonData: 8,
  Len_Ctrl: 1,
  Len_A1Rgn: 2,
  Len_A2Addr: 2,
  Len_Addr: 5,
  Len_Afn: 1,
  Len_Seq: 1,
  Len_DuId: 4,
  Len_Pn: 2,
  Len_Fn: 2,
  Len_Pw: 16,
  Len_Ec: 2,
  Len_Tp: 6,
  Len_Tdd: 3,
  Len_Tdm: 2,
  Len_Tdc: 7,
  Len_Tdh: 2,
  Len_ReadTime: 5,
  Len_Err: 1
}

var CtrlFn = {
  CtrlFn_Prm_Any: 0,
  CtrlFn_Prm_Reset_SendAck: 1,
  CtrlFn_Prm_UserData_SendNoAck: 4,
  CtrlFn_Prm_LinkChk_AskAck: 9,
  CtrlFn_Prm_NowData_AskAck: 10,
  CtrlFn_Prm_PastData_AskAck: 11,
  CtrlFn_Reply_Ack: 0,
  CtrlFn_Reply_UserData: 8,
  CtrlFn_Reply_NoData: 9,
  CtrlFn_Reply_LinkState: 11
}

var ProAfn = {
  Afn_AckDeny: 0,
  Afn_Reset: 1,
  Afn_Link: 2,
  Afn_Relay: 3,
  Afn_SetParam: 4,
  Afn_Ctrl: 5,
  Afn_UpMsgAck: 6,
  Afn_AskLinkedUp: 8,
  Afn_AskTerminalConfig: 9,
  Afn_ReadParam: 0xA,
  Afn_AskTaskData: 0xB,
  Afn_AskNowVal: 0xC,
  Afn_AskPastVal: 0xD,
  Afn_AskEvent: 0xE,
  Afn_FileTransfer: 0xF,
  Afn_DataTransmit: 0x10
}

function Fn (pSeqFn) {
  return (((pSeqFn - 1) / 8) << 8) | (1 << ((pSeqFn - 1) & 0x7))
}

function SeqIdToPn (pSeqId) {
  return pSeqId ? (((pSeqId - 1) / 8 + 1) << 8) | (1 << ((pSeqId - 1) & 0x7)) : 0
}

function PnToSeqId (pPn) {
  if (!pPn) return pPn
  let tmp = pPn & 0xFF
  let i = 0
  while ((tmp >> i) > 0) i++
  return ((pPn >> 8) - 1) * 8 + i
}

function BuildPack (pCtrl, pAddr, pFes, pAfn, pSeq, pDu, pDuLen) {
  let buffer = new ArrayBuffer(ProLen.Len_Max)
  let viewPack = new DataView(buffer)

  let tmp = pDuLen + ProLen.Len_Ctrl + ProLen.Len_Addr + ProLen.Len_Afn + ProLen.Len_Seq
  tmp = ((tmp << 2) | 2) // D0=0、D1=1：为本协议使用

  let i = 0
  viewPack.setInt8(i++, ProChar.Char_Head)
  viewPack.setInt8(i++, (tmp & 0xFF))
  viewPack.setInt8(i++, ((tmp >> 8) & 0xFF))
  viewPack.setInt8(i++, (tmp & 0xFF))
  viewPack.setInt8(i++, ((tmp >> 8) & 0xFF))
  viewPack.setInt8(i++, ProChar.Char_Head)
  viewPack.setInt8(i++, pCtrl)
  viewPack.setInt32(i, pAddr, true)
  i += ProLen.Len_A1Rgn + ProLen.Len_A2Addr
  viewPack.setInt8(i++, pFes)
  viewPack.setInt8(i++, pAfn)
  viewPack.setInt8(i++, pSeq)
  for (let j = 0; j < pDuLen; j++) {
    viewPack.setInt8(i + j, pDu.getUint8(j))
  }
  i += pDuLen

  tmp = Sum8Check(buffer.slice(ProPos.Pos_Ctrl), i - ProPos.Pos_Ctrl)
  viewPack.setInt8(i++, (tmp & 0xFF))
  viewPack.setInt8(i++, ProChar.Char_End)
  return new Uint8Array(buffer.slice(0, i))
}

function AddrProIntToUiStr (pIntAddr) {
  var addrStr = parseInt(pIntAddr).toString(16)
  return addrStr.slice(-4) + ('00000' + parseInt(addrStr.slice(0, addrStr.length - 4), 16)).slice(-5)
}

function VirAddrProIntToUiStr (pIntAddr) {
  var addrStr = (BigInt(pIntAddr) >> BigInt(10)).toString(16)
  return addrStr.slice(-4) + ('00000' + parseInt(addrStr.slice(0, addrStr.length - 4), 16)).slice(-5)
}

function AddrUiStrToProInt (pStrAddr) {
  var fullAddr = ('000000000' + pStrAddr).slice(-9)
  return parseInt(parseInt(fullAddr.slice(-5)).toString(16) + fullAddr.slice(0, 4), 16)
}

export {
  AddrProIntToUiStr,
  AddrUiStrToProInt,
  VirAddrProIntToUiStr,
  BuildPack,
  ProAfn,
  Fn,
  SeqIdToPn,
  PnToSeqId
}
