const RoleTypes = [{
  value: '管理员',
  label: '管理员',
  id: 1
},
{
  value: '抄表员',
  label: '抄表员',
  id: 2
},
{
  value: '收费员',
  label: '收费员',
  id: 3
},
{
  value: '审核员',
  label: '审核员',
  id: 4
}]

const ProtocolMeter = [{
  id: 1,
  value: '3761'
},
{
  id: 11,
  value: '645-07'
},
{
  id: 12,
  value: 'Modbus'
}]

const PortMeter = [{
  id: 1,
  value: '交采'
},
{
  id: 2,
  value: '485'
},
{
  id: 31,
  value: '本地'
}
]

const WsCmd = {
  unLoginFlag: -11, // 注册登录外的其它命令Flag回-11表示未注册登录
  http: 0,
  inform: 1,
  swReg: 2,
  smsSend: 3,
  sysOprAdd: 10,
  sysOprDel: 11,
  sysOprUpdate: 12,
  sysOprGetOne: 13,
  sysOprGetAll: 14,
  sysOprLogin: 15,
  sysOprGetByRole: 16,
  roleRightGet: 20,
  roleRightUpdate: 21,
  areaAdd: 30,
  areaDel: 31,
  areaUpdateName: 32,
  areaGetOne: 33,
  areaGetAll: 34,
  areaGetByParent: 35,
  terminalAdd: 40,
  terminalDel: 41,
  terminalUpdate: 42,
  terminalGetOne: 43,
  terminalGetByArea: 44,
  areaTerminalTreeGet: 45,
  meterAdd: 50,
  meterDel: 51,
  meterUpdate: 52,
  meterGetOne: 53,
  meterOfAreaTerminal: 54,
  meterImport: 55,
  meterSetPrepay: 56,
  meterInitPrepay: 57,
  generalStat: 60,
  offlineDetail: 61,
  meterValGridGet: 70,
  meterValMerge: 71,
  meterValCurveGet: 72,
  areaConsumeCurveGet: 73,
  periodValQuery: 74,
  exLogGet: 75,
  feePriceGet: 80,
  feePriceMerge: 81,
  feePriceDel: 82,
  prepayGet: 90,
  payLogAdd: 91,
  payLogExtGet: 92,
  payExRetry: 93,
  payLogUserGet: 94,
  sysConfigGet: 100,
  sysConfigUpdate: 101,
  sysFeeLogGet: 110,
  sysFeeLogAdd: 111,
  wsReg: 120,
  wsUpdate: 121,
  userLogin: 130,
  userReg: 131,
  userGet: 132,
  userUpdate: 133,
  meterOfUserGet: 140,
  terminalComm: 255
}

const ReadCtrls = [
  { id: 1, value: '日末示值' },
  { id: 2, value: '实时示值' }
]

const MeterTypes = [
  { id: 0, value: '电表' },
  { id: 1, value: '水表' }
]

const MeterReadEx = [
  { id: 0, value: '全部' },
  { id: 1, value: '等待确认客户打款' },
  { id: 2, value: '审核通过' },
  { id: 3, value: '审核不通过' },
]

const UsrFeeState = [
  { id: 0, value: '全部用户' },
  { id: 1, value: '正常用户' },
  { id: 2, value: '预警用户' },
  { id: 3, value: '欠费用户' }
]

const UserTypes = [
  {
    id: 1,
    value: '居民用电'
  },
  {
    id: 2,
    value: '商住用电'
  },
  {
    id: 3,
    value: '商业用电'
  },
  {
    id: 4,
    value: '工业用电'
  },
  {
    id: 5,
    value: '小微用电'
  },
  {
    id: 6,
    value: '居民用水'
  },
  {
    id: 7,
    value: '商住用水'
  },
  {
    id: 8,
    value: '商业用水'
  },
  {
    id: 9,
    value: '工业用水'
  },
  {
    id: 10,
    value: '小微用水'
  }
]
const ProtocolJzq = [{ id: 1, value: '3761' }]

const Resets = [{
  id: 1,
  value: '重启集中器'
}, {
  id: 2,
  value: '清空集中器数据'
}, {
  id: 3,
  value: '恢复出厂设置'
}, {
  id: 4,
  value: '非通信参数初始化'
}]
const PayWay = [
  { id: 1, value: '现金支付' },
  { id: 2, value: '电子支付' }
]

const PayCause = [
  { id: 1, value: '开户' },
  { id: 2, value: '充值' },
  { id: 3, value: '销户' }
]

const PrePayType = [
  { id: 0, value: '非预付费' },
  { id: 1, value: '主站预付费' },
  { id: 2, value: '表计算金额' },
  { id: 3, value: '表计算余量' }
]

const PrePayEx = [
  { id: 0, value: '全部结果' },
  { id: 1, value: '未执行' },
  { id: 2, value: '执行失败' }
]

const JzqTaskUnit = [
  { id: 0, value: '分', label: '分' },
  { id: 1, value: '时', label: '时' },
  { id: 2, value: '日', label: '日' },
  { id: 3, value: '月', label: '月' }
]

function getConfigValue (pOrigin, pId) {
  let targetObj = pOrigin.find(function (obj) {
    if (obj.id === pId) return obj
  })
  if (targetObj) {
    return targetObj.value
  }
  return ''
}

function getConfigId (pOrigin, pValue) {
  let targetObj = pOrigin.find(function (obj) {
    if (obj.value === pValue) return obj
  })
  if (targetObj) {
    return targetObj.id
  }
  return -1
}

export function getRoleValue (pId) {
  return getConfigValue(RoleTypes, pId)
}

export function getRoleId (pValue) {
  return getConfigId(RoleTypes, pValue)
}

export function getMeterProtocolValue (pId) {
  return getConfigValue(ProtocolMeter, pId)
}

export function getMeterProtocolId (pValue) {
  return getConfigId(ProtocolMeter, pValue)
}

export function getPortValue (pId) {
  return getConfigValue(PortMeter, pId)
}

export function getPortId (pValue) {
  return getConfigId(PortMeter, pValue)
}

export function getUserTypeValue (pId) {
  return getConfigValue(UserTypes, pId)
}

export function getUserTypeId (pValue) {
  return getConfigId(UserTypes, pValue)
}

export function getPayWayValue (pId) {
  return getConfigValue(PayWay, pId)
}

export function getPayWayId (pValue) {
  return getConfigId(PayWay, pValue)
}

export function getPayCauseValue (pId) {
  return getConfigValue(PayCause, pId)
}

export function getPayCauseId (pValue) {
  return getConfigId(PayCause, pValue)
}

export function getPrePayTypeValue (pId) {
  return getConfigValue(PrePayType, pId)
}

export function getPrePayTypeId (pValue) {
  return getConfigId(PrePayType, pValue)
}

export function getMeterTypeValue (pId) {
  return getConfigValue(MeterTypes, pId)
}

export function getMeterTypeId (pValue) {
  return getConfigId(MeterTypes, pValue)
}

export function getMeterReadExValue (pId) {
  return getConfigValue(MeterReadEx, pId)
}

export function getMeterReadExId (pValue) {
  return getConfigId(MeterReadEx, pValue)
}

export function getUsrFeeStateValue (pId) {
  return getConfigValue(UsrFeeState, pId)
}

export function getUsrFeeStateId (pValue) {
  return getConfigId(UsrFeeState, pValue)
}

export function getJzqProtocolValue (pId) {
  return getConfigValue(ProtocolJzq, pId)
}

export function getJzqProtocolId (pValue) {
  return getConfigId(ProtocolJzq, pValue)
}

// 深拷贝
export function deepClone (initialObj, finalObj, conflict) {
  var i
  if (initialObj && typeof initialObj === 'object' && (i = [Object, Array].indexOf(initialObj.constructor)) !== -1) {
    if (!finalObj) {
      finalObj = initialObj.constructor === Array ? [] : {}
    }
    if (conflict) {
      i = conflict.k.indexOf(initialObj)
      if (i !== -1) {
        return conflict.v[i]
      }
      conflict.k.push(initialObj)
      conflict.v.push(finalObj)
    }
    for (var key in initialObj) {
      finalObj[key] = deepClone(initialObj[key], finalObj[key], conflict)
    }
    return finalObj
  }
  return initialObj
}

export function getResetValue (pId) {
  return getConfigValue(Resets, pId)
}

export {
  RoleTypes,
  ProtocolMeter,
  PortMeter,
  UserTypes,
  MeterTypes,
  ProtocolJzq,
  Resets,
  WsCmd,
  ReadCtrls,
  PayWay,
  PayCause,
  PrePayType,
  PrePayEx,
  JzqTaskUnit,
  MeterReadEx,
  UsrFeeState
}
