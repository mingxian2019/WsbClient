// 区域名称验证规则
export function validateAreaName (rule, value, callback) {
  const reg = /^[\u4E00-\u9FA5A-Za-z0-9]{0,18}$/
  if ((value === '') || (value === undefined) || (value === null)) {
    callback(new Error('手机号码不能为空'))
  } else {
    if (!reg.test(value)) {
      callback(new Error('名称最大长度为 18 位'))
    } else {
      callback()
    }
  }
}

// 表单验证规则
export function validateMobile (rule, value, callback) {
  const reg = /^((1[3,5,8][0-9])|(14[5,7])|(17[0,6,7,8])|(19[7]))\d{8}$/
  if ((value === '') || (value === undefined) || (value === null)) {
    callback(new Error('手机号码不能为空'))
  } else {
    if (!reg.test(value)) {
      callback(new Error('手机号码格式不正确'))
    } else {
      callback()
    }
  }
}

// 操作员名称验证
export function validateOprName (rule, value, callback) {
  const reg = /^[\u4E00-\u9FA5A-Za-z0-9]{0,18}$/
  if ((value === '') || (value === undefined) || (value === null)) {
    callback(new Error('姓名不能为空'))
  } else if (!reg.test(value)) {
    callback(new Error('姓名长度为0~18个字符，支持数字大小写字母'))
  } else {
    callback()
  }
}

// 操作员密码验证
export function validateOprPw (rule, value, callback) {
  const reg = /^[A-Za-z0-9]{0,18}$/
  if (!reg.test(value)) {
    callback(new Error('长度为0~18个字符，支持数字大小写字母'))
  } else {
    callback()
  }
}

// 集中器名称验证规则
export function validateJzqName (rule, value, callback) {
  const reg = /^[\u4E00-\u9FA5A-Za-z0-9]{0,18}$/
  if ((value === '') || (value === undefined) || (value === null)) {
    callback(new Error('集中器名称不能为空'))
  } else if (!reg.test(value)) {
    callback(new Error('名称为0~18个字符，支持数字大小写字母'))
  } else {
    callback()
  }
}

// 集中器行政区划码验证规则
export function validateJzqCode (rule, value, callback) {
  const reg = /^[0-9]+$/
  if ((value === '') || (value === undefined) || (value === null)) {
    callback(new Error('行政区划码不能为空'))
  } else if ((!reg.test(value))) {
    callback(new Error('行政区划码只能包含数字'))
  } else if (value.length > 4) {
    callback(new Error('行政区划码为 4 位 BCD 码'))
  } else {
    callback()
  }
}

// 集中器地址验证规则
export function validateJzqAddr (rule, value, callback) {
  const reg = /^[0-9]+$/
  if ((value === '') || (value === undefined) || (value === null)) {
    callback(new Error('集中器地址不能为空'))
  } else if ((!reg.test(value))) {
    callback(new Error('集中器地址只能为数字'))
  } else if (parseInt(value) > 65535) {
    callback(new Error('集中器地址不能大于 65535'))
  } else {
    callback()
  }
}

// 表计地址验证规则
export function validateMeterAddr (rule, value, callback) {
  const reg = /^[0-9]+$/
  if ((value === '') || (value === undefined) || (value === null)) {
    callback(new Error('表计地址不能为空'))
  } else if ((!reg.test(value))) {
    callback(new Error('表计地址只能为数字'))
  } else if (parseInt(value).toString().length > 12) {
    callback(new Error('表计地址不能大于 12 位数字'))
  } else {
    callback()
  }
}

// 表计序号验证规则
export function validateMeterSeqId (rule, value, callback) {
  const reg = /^[0-9]+$/
  if ((value === '') || (value === undefined) || (value === null)) {
    callback(new Error('表计序号不能为空'))
  } else if ((!reg.test(value))) {
    callback(new Error('表计序号只能为数字'))
  } else if (parseInt(value) > 360) {
    callback(new Error('表计序号不能大于 360'))
  } else {
    callback()
  }
}

// 表计密码/密级验证规则
export function validateMeterPw (rule, value, callback) {
  const reg = /^[0-9]+$/
  if ((value === '') || (value === undefined) || (value === null)) {
    callback(new Error('表计密码/密级不能为空'))
  } else if ((!reg.test(value))) {
    callback(new Error('表计序号只能为数字'))
  } else if (parseInt(value).toString().length > 8) {
    callback(new Error('密码/密级为 8 位有效数字'))
  } else {
    callback()
  }
}

// 表计名称验证规则
export function validateMeterName (rule, value, callback) {
  if ((value === '') || (value === undefined) || (value === null)) {
    callback(new Error('用户表名不能为空'))
  } else {
    callback()
  }
}

// 用户表号验证规则
export function validateMeterNo (rule, value, callback) {
  const reg = /^[0-9]+$/
  if ((value === '') || (value === undefined) || (value === null)) {
    callback(new Error('用户表号不能为空'))
  } else if ((!reg.test(value))) {
    callback(new Error('用户表号只能为数字'))
  } else if (parseInt(value).toString().length > 12) {
    callback(new Error('用户表号最大为 12 位有效数字'))
  } else {
    callback()
  }
}

// 表计倍率验证规则
export function validateMeterPtCt (rule, value, callback) {
  const reg = /^[0-9]+$/
  if ((value === '') || (value === undefined) || (value === null)) {
    callback(new Error('倍率不能为空'))
  } else if ((!reg.test(value))) {
    callback(new Error('倍率只能为数字'))
  } else if (parseInt(value) > 2147483647) {
    callback(new Error('倍率过大'))
  } else {
    callback()
  }
}

// 表计用量上限验证规则
export function validateMeterMaxVal (rule, value, callback) {
  const reg = /^\d+(.\d{0,2})?$/
  if ((value === '') || (value === undefined) || (value === null)) {
    callback(new Error('表计用量上限不能为空'))
  } else if ((!reg.test(value))) {
    callback(new Error('表计用量上限为数字，且最大有两位小数'))
  } else if (parseInt(value) > 2147483647) {
    callback(new Error('表计用量上限最大为 2147483647'))
  } else {
    callback()
  }
}

// 表计用量下限验证规则
export function validateMeterMinVal (rule, value, callback) {
  const reg = /^\d+(.\d{0,2})?$/
  if ((value === '') || (value === undefined) || (value === null)) {
    callback(new Error('表计用量下限不能为空'))
  } else if ((!reg.test(value))) {
    callback(new Error('表计用量下限为数字，且最大有两位小数'))
  } else if (parseInt(value) > 2147483647) {
    callback(new Error('表计用量下限最大为 2147483647'))
  } else {
    callback()
  }
}

// 充值金额验证规则
export function validateMoney (rule, value, callback) {
  const reg = /^(-?)\d+(.\d{0,2})?$/
  if ((value === '') || (value === undefined) || (value === null)) {
    callback(new Error('充值金额不能为空'))
  } else if ((!reg.test(value))) {
    callback(new Error('充值金额为数字，且最大有两位小数'))
  } else if (parseInt(value) > 100000) {
    callback(new Error('充值金额单次最大为 100000'))
  } else {
    callback()
  }
}

// 表计余量验证规则
export function validatePayLeft (rule, value, callback) {
  const reg = /^\d+(.\d{0,2})?$/
  if ((value === '') || (value === undefined) || (value === null)) {
    callback(new Error('表计余量不能为空'))
  } else if ((!reg.test(value))) {
    callback(new Error('表计余量为数字，且最大有两位小数'))
  } else if (parseInt(value) > 2147483647) {
    callback(new Error('充表计余量最大为 2147483647'))
  } else {
    callback()
  }
}

// 集中器时间验证规则
export function validateTime (rule, value, callback) {
  let date = new Date(value)
  if ((value === '') || (value === undefined) || (value === null)) {
    callback(new Error('时间不能为空'))
  } else if (date instanceof Date && isNaN(date.getTime())) {
    callback(new Error('时间格式错误'))
  } else {
    callback()
  }
}

// ip 地址验证规则
export function validateIp (rule, value, callback) {
  const reg = /^((25[0-5]|2[0-4]\d|1\d{2}|[1-9]?\d)\.){3}(25[0-5]|2[0-4]\d|1\d{2}|[1-9]?\d)$/
  if ((value === '') || (value === undefined) || (value === null)) {
    callback(new Error('ip地址不能为空'))
  } else if ((!reg.test(value))) {
    callback(new Error('ip地址格式错误'))
  } else {
    callback()
  }
}

// Port 地址验证规则
export function validatePort (rule, value, callback) {
  const reg = /^\d+$/
  if ((value === '') || (value === undefined) || (value === null)) {
    callback(new Error('端口不能为空'))
  } else if ((!reg.test(value))) {
    callback(new Error('端口只支持数字'))
  } else if (parseInt(value) > 65535) {
    callback(new Error('端口最大为 65535'))
  } else {
    callback()
  }
}

// Heart 心跳周期验证规则
export function validateHeart (rule, value, callback) {
  const reg = /^\d+$/
  if ((value === '') || (value === undefined) || (value === null)) {
    callback(new Error('心跳周期不能为空'))
  } else if ((!reg.test(value))) {
    callback(new Error('心跳周期只支持数字'))
  } else if (parseInt(value) > 255) {
    callback(new Error('心跳周期最大为 255'))
  } else {
    callback()
  }
}

// 集中器上线参数 APN 验证规则
export function validateApn (rule, value, callback) {
  const reg = /^[\x20-\xff]{0,16}$/
  if ((!reg.test(value))) {
    callback(new Error('Apn 不支持中文, 且最大长度为 16'))
  } else {
    callback()
  }
}

// 集中器上线参数用户名验证规则
export function validateJzqUserName (rule, value, callback) {
  const reg = /^[\x20-\xff]{0,16}$/
  if ((!reg.test(value))) {
    callback(new Error('用户名不支持中文, 且最大长度为 16'))
  } else {
    callback()
  }
}

// 集中器上线参数用户密码验证规则
export function validateJzqUserPw (rule, value, callback) {
  const reg = /^[\x20-\xff]{0,16}$/
  if ((!reg.test(value))) {
    callback(new Error('用户密码不支持中文, 且最大长度为 16'))
  } else {
    callback()
  }
}

// 电价验证规则
export function validatePrice (rule, value, callback) {
  const reg = /^\d+(.\d{0,4})?$/
  if ((value === '') || (value === undefined) || (value === null)) {
    callback(new Error('单价不能为空'))
  } else if ((!reg.test(value))) {
    callback(new Error('单价只支持数字，且最多支持4位小数'))
  } else if (parseInt(value) > 6.5535) {
    callback(new Error('单价最大为 6.5535'))
  } else {
    callback()
  }
}
