export let menu = [
  {
    id: 0,
    authName: '档案',
    path: 'file',
    children: [{
      id: 1,
      authName: '区域管理',
      path: 'region',
      children: []
    },
    {
      id: 2,
      authName: '操作员管理',
      path: 'operator',
      children: []
    },
    {
      id: 4,
      authName: '集中器管理',
      path: 'concentrantor',
      children: []
    },
    {
      id: 8,
      authName: '表计管理',
      path: 'meter',
      children: []
    }
    ]
  },
  {
    id: 1,
    authName: '抄表',
    path: 'readmeter',
    children: [
      {
        id: 1,
        authName: '抄表与查询',
        path: 'inquiry',
        children: []
      },
      {
        id: 2,
        authName: '抄表异常查询',
        path: 'readMeterEx',
        children: []
      },
      {
        id: 4,
        authName: '时段用量查询',
        path: 'periodVal',
        children: []
      }
    ]
  },
  {
    id: 2,
    authName: '收费',
    path: 'toll',
    children: [
      {
        id: 1,
        authName: '预付费',
        path: 'prepay',
        children: []
      },
      {
        id: 2,
        authName: '充值异常管理',
        path: 'payLogEx',
        children: []
      },
      {
        id: 4,
        authName: '单价设置',
        path: 'price',
        children: []
      },
      {
        id: 8,
        authName: '缴费查询',
        path: 'payLogFee',
        children: []
      },
      {
        id: 16,
        authName: '收费查询',
        path: 'payLogUsr',
        children: []
      }
    ]
  }
]

export function getAuthName (pId) {
  switch (pId) {
    case 0:
      return '档案'
    case 1:
      return '抄表'
    case 2:
      return '收费'
  }
}
export function getPath (pId) {
  switch (pId) {
    case 0:
      return 'file'
    case 1:
      return 'readmeter'
    case 2:
      return 'toll'
  }
}

export function getMenuItemAuthName (pMenuId, pId) {
  let targetMenu = menu.find(function (element) {
    return element.id === pMenuId
  })
  if (!targetMenu) {
    return ''
  }
  let targetMenuItem = targetMenu.children.find(function (element) {
    return element.id === pId
  })
  if (!targetMenuItem) {
    return ''
  }
  return targetMenuItem.authName
}
export function getMenuItemPath (pMenuId, pId) {
  let targetMenu = menu.find(function (element) {
    return element.id === pMenuId
  })
  if (!targetMenu) {
    return ''
  }
  let targetMenuItem = targetMenu.children.find(function (element) {
    return element.id === pId
  })
  if (!targetMenuItem) {
    return ''
  }
  return targetMenuItem.path
}
export function getMenuItemCount (pMenuId) {
  switch (pMenuId) {
    case 0:
      return 4
    case 1:
      return 3
    case 2:
      return 5
  }
}
