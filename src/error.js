// error informations

export function get3761Error (pErrCode) {
  switch (pErrCode) {
    case -1:
      return '集中器离线'
    case -2:
      return '集中器响应超时'
    case -3:
      return '前置服务未启动'
    case -4:
      return '断开或退出等导致的未能执行'
    case -5:
      return '表计执行失败'
    case -6:
      return 'Esam失败'
    case -7: // 客户端自定义
      return '无有效数据'
  }
}

export function getFlagError (pErrorCode) {
  switch (pErrorCode) {
    case 0:
      return '命令出现错误'
    case -1:
      return '命令出现异常'
    default:
      return '命令超时或未知错误'
  }
}

export function getChargeFlagError (pErrorCode) {
  switch (pErrorCode) {
    case -1:
      return '通信报文编解码错误'
    case -2:
      return '数据库操作失败'
    case -3:
      return '离线无法执行'
    case -5:
      return '表计执行失败'
    default:
      return '命令超时或未知错误'
  }
}

export function getLoginFlagError (pErrorCode) {
  switch (pErrorCode) {
    case 0:
      return '用户名不存在或密码错误'
    case -1:
      return '解码异常'
    case -2:
      return 'WsId云端未注册'
    case -3:
      return 'WsPw不正确'
    case -4:
      return '云登录时wsId不能为0'
    case -5:
      return '已在本机登录'
    case -6:
      return '已在别处登录'
    default:
      return '命令超时或未知错误'
  }
}

export function get645Error (pErrorCode) {
  switch (pErrorCode) {
    case 1:
      return '其他错误'
    case 2:
      return '无请求数据'
    case 4:
      return '密码错/未授权'
    case 8:
      return '通讯速率不能更改'
    case 16:
      return '年时区数超'
    case 32:
      return '日时段数超'
    case 64:
      return '费率数超'
    default:
      return '命令超时或未知错误'
  }
}

export function getSmsError (pErrorCode) {
  switch (pErrorCode) {
    case -1:
      return '发送包错'
    case -2:
      return '200条'
    case -3:
      return '短信服务失败'
    default:
      return '命令超时或未知错误'
  }
}

export function getRegError (pErrorCode) {
  switch (pErrorCode) {
    case 0:
      return '注册码错误'
    case -1:
      return '解码异常'
    default:
      return '命令超时或未知错误'
  }
}

export function getMeterAddError (pErrorCode) {
  switch (pErrorCode) {
    case -1:
      return '解码失败'
    case -2:
      return '空数据库连接'
    case -4:
      return '数据库插入失败'
    default:
      return '添加电表失败，请注意电表地址、集中器地址及编号的唯一性'
  }
}

export function getMeterModifyError (pErrorCode) {
  switch (pErrorCode) {
    case -1:
      return '解码失败'
    case -2:
      return '空数据库连接'
    case -3:
      return '更新不存在记录，'
    case -4:
      return '数据库插入失败'
    default:
      return '修改电表失败，请注意电表地址、集中器地址及编号的唯一性'
  }
}

export function getTerminalAddError (pErrorCode) {
  switch (pErrorCode) {
    case -1:
      return '解码异常'
    case -2:
      return '数据库插入失败'
    default:
      return '集中器添加失败，请注意集中器地址的唯一性'
  }
}

export function getToFesError (pErrorCode) {
  switch (pErrorCode) {
    case -1:
      return '集中器离线'
    case -2:
      return '集中器响应超时'
    case -3:
      return '前置服务未启动'
    case -4:
      return '断开或退出等导致的未能执行'
    case -5:
      return '表计执行失败'
    case -6:
      return 'Esam验证失败'
    default:
      return '命令超时或未知错误'
  }
}
