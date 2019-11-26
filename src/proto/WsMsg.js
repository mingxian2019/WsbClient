/* eslint-disable block-scoped-var, id-length, no-control-regex, no-magic-numbers, no-prototype-builtins, no-redeclare, no-shadow, no-var, sort-vars */
'use strict'

var $protobuf = require('protobufjs/light')

var $root = ($protobuf.roots['default'] || ($protobuf.roots['default'] = new $protobuf.Root())).addJSON({
  WsMsg: {
    nested: {
      SwRegIn: {
        fields: {
          RegCode: {
            type: 'fixed64',
            id: 1
          }
        }
      },
      User: {
        fields: {
          Mobile: {
            type: 'uint64',
            id: 1
          },
          Name: {
            type: 'string',
            id: 2
          },
          Password: {
            type: 'string',
            id: 3
          },
          Account: {
            type: 'string',
            id: 4
          },
          LoginTime: {
            type: 'fixed32',
            id: 5
          },
          State: {
            type: 'uint32',
            id: 6
          }
        }
      },
      UserLoginIn: {
        fields: {
          Mobile: {
            type: 'uint64',
            id: 1
          },
          Password: {
            type: 'string',
            id: 2
          }
        }
      },
      UserLoginOut: {
        fields: {
          Name: {
            type: 'string',
            id: 1
          },
          Account: {
            type: 'string',
            id: 2
          },
          State: {
            type: 'uint32',
            id: 3
          }
        }
      },
      MeterOfUserIn: {
        fields: {
          WsId: {
            type: 'uint64',
            id: 1
          },
          Mobile: {
            type: 'uint64',
            id: 2
          },
          Role: {
            type: 'uint32',
            id: 3
          }
        }
      },
      MeterOfUserOut: {
        fields: {
          Vec: {
            rule: 'repeated',
            type: 'MeterOfUser',
            id: 1
          }
        },
        nested: {
          MeterOfUser: {
            fields: {
              VirAddr: {
                type: 'uint64',
                id: 1
              },
              TerminalProtocol: {
                type: 'uint32',
                id: 2
              },
              Port: {
                type: 'uint32',
                id: 3
              },
              Fes: {
                type: 'int64',
                id: 4
              },
              MeterAddr: {
                type: 'uint64',
                id: 5
              },
              MeterProtocol: {
                type: 'uint32',
                id: 6
              },
              MeterType: {
                type: 'uint32',
                id: 7
              },
              Mobile: {
                type: 'uint64',
                id: 8
              },
              UserName: {
                type: 'string',
                id: 9
              },
              Price: {
                type: 'uint32',
                id: 10
              },
              PayLeft: {
                type: 'int32',
                id: 11
              },
              CalVal: {
                type: 'uint32',
                id: 12
              }
            }
          }
        }
      },
      HomeMeterUpdateIn: {
        fields: {
          VirAddr: {
            type: 'uint64',
            id: 1
          },
          MeterType: {
            type: 'uint32',
            id: 2
          },
          UserMobile: {
            type: 'uint64',
            id: 3
          },
          UserName: {
            type: 'string',
            id: 4
          },
          Price: {
            type: 'uint32',
            id: 5
          }
        }
      },
      PayLogUserGetIn: {
        fields: {
          FromTime: {
            type: 'fixed32',
            id: 1
          },
          EndTime: {
            type: 'fixed32',
            id: 2
          },
          Addr: {
            type: 'uint64',
            id: 3
          }
        }
      },
      PayLogUserGetOut: {
        fields: {
          Vec: {
            rule: 'repeated',
            type: 'PayLogUser',
            id: 1
          }
        },
        nested: {
          PayLogUser: {
            fields: {
              PayTime: {
                type: 'fixed32',
                id: 1
              },
              PayWay: {
                type: 'uint32',
                id: 3
              },
              Fee: {
                type: 'int32',
                id: 4
              },
              Amount: {
                type: 'int32',
                id: 5
              },
              Cause: {
                type: 'uint32',
                id: 6
              },
              Receiver: {
                type: 'string',
                id: 7
              },
              TradeNo: {
                type: 'string',
                id: 8
              },
              ActRet: {
                type: 'int32',
                id: 9
              },
              ActTime: {
                type: 'fixed32',
                id: 10
              },
              Mobile: {
                type: 'uint64',
                id: 11
              },
              UserName: {
                type: 'string',
                id: 12
              },
              OutState: {
                type: 'uint32',
                id: 14
              },
              OutAccount: {
                type: 'string',
                id: 15
              }
            }
          }
        }
      },
      MeterValCurveIn: {
        fields: {
          VirAddr: {
            type: 'uint64',
            id: 1
          },
          ValType: {
            type: 'uint32',
            id: 2
          },
          FromTime: {
            type: 'fixed32',
            id: 3
          },
          Interval: {
            type: 'uint32',
            id: 4
          },
          Count: {
            type: 'uint32',
            id: 5
          },
          Day: {
            type: 'uint32',
            id: 6
          }
        }
      },
      MeterValTimePair: {
        fields: {
          Time: {
            type: 'fixed32',
            id: 1
          },
          Val0: {
            type: 'uint32',
            id: 2
          }
        }
      },
      MeterValCurveOut: {
        fields: {
          Vec: {
            rule: 'repeated',
            type: 'MeterValTimePair',
            id: 1
          }
        }
      },
      WorkStation: {
        fields: {
          Id: {
            type: 'uint64',
            id: 1
          },
          Name: {
            type: 'string',
            id: 2
          },
          Password: {
            type: 'string',
            id: 3
          },
          DistrictId: {
            type: 'uint64',
            id: 4
          },
          Type: {
            type: 'uint32',
            id: 5
          },
          State: {
            type: 'uint32',
            id: 6
          },
          StateTime: {
            type: 'uint32',
            id: 7
          }
        }
      },
      SysFeeLog: {
        fields: {
          TimeItem: {
            type: 'uint64',
            id: 1
          },
          Fee: {
            type: 'int32',
            id: 2
          },
          LeftFee: {
            type: 'int32',
            id: 3
          },
          PayWay: {
            type: 'uint32',
            id: 4
          },
          TradeNo: {
            type: 'string',
            id: 5
          },
          Receiver: {
            type: 'string',
            id: 6
          },
          Memo: {
            type: 'string',
            id: 7
          }
        }
      },
      SysFeeLogGetIn: {
        fields: {
          FromTime: {
            type: 'fixed32',
            id: 1
          },
          EndTime: {
            type: 'fixed32',
            id: 2
          }
        }
      },
      SysFeeLogGetOut: {
        fields: {
          Vec: {
            rule: 'repeated',
            type: 'SysFeeLog',
            id: 1
          }
        }
      },
      SysConfig: {
        fields: {
          Services: {
            type: 'uint32',
            id: 1
          },
          SmsAppId: {
            type: 'string',
            id: 2
          },
          SmsAppKey: {
            type: 'string',
            id: 3
          },
          SmsTplIds: {
            type: 'string',
            id: 4
          },
          SmsTime: {
            type: 'uint32',
            id: 5
          },
          AutoReadTime: {
            type: 'uint32',
            id: 6
          },
          OweSwitchTime: {
            type: 'uint32',
            id: 7
          },
          RechargeTime: {
            type: 'uint32',
            id: 8
          },
          LastLoginTime: {
            type: 'uint32',
            id: 9
          },
          LastOnlineTime: {
            type: 'uint32',
            id: 10
          }
        }
      },
      SysOprLoginIn: {
        fields: {
          WsId: {
            type: 'uint64',
            id: 1
          },
          Mobile: {
            type: 'uint64',
            id: 2
          },
          Password: {
            type: 'string',
            id: 3
          }
        }
      },
      SysOprLoginOut: {
        fields: {
          OprName: {
            type: 'string',
            id: 1
          },
          AreaId: {
            type: 'uint32',
            id: 2
          },
          RoleId: {
            type: 'uint32',
            id: 3
          },
          RecogId: {
            type: 'uint32',
            id: 4
          },
          WsName: {
            type: 'string',
            id: 5
          },
          WsPw: {
            type: 'string',
            id: 6
          },
          Type: {
            type: 'uint32',
            id: 7
          },
          SvrId: {
            type: 'uint64',
            id: 8
          },
          State: {
            type: 'uint32',
            id: 9
          },
          StateTime: {
            type: 'uint32',
            id: 10
          }
        }
      },
      SysOpr: {
        fields: {
          Mobile: {
            type: 'uint64',
            id: 1
          },
          Name: {
            type: 'string',
            id: 2
          },
          AreaId: {
            type: 'uint32',
            id: 3
          },
          RoleId: {
            type: 'uint32',
            id: 4
          },
          Password: {
            type: 'string',
            id: 5
          }
        }
      },
      SysOprDelIn: {
        fields: {
          Mobile: {
            type: 'uint64',
            id: 1
          }
        }
      },
      SysOprGetAllOut: {
        fields: {
          Vec: {
            rule: 'repeated',
            type: 'SysOpr',
            id: 1
          }
        }
      },
      RoleRightGetIn: {
        fields: {
          RoleId: {
            type: 'uint32',
            id: 1
          }
        }
      },
      ModuleRight: {
        fields: {
          ModuleId: {
            type: 'uint32',
            id: 1
          },
          HasRight: {
            type: 'uint32',
            id: 2
          }
        }
      },
      RoleRightGetOut: {
        fields: {
          Vec: {
            rule: 'repeated',
            type: 'ModuleRight',
            id: 1
          }
        }
      },
      RoleRightUpdateIn: {
        fields: {
          RoleId: {
            type: 'uint32',
            id: 1
          },
          Vec: {
            rule: 'repeated',
            type: 'ModuleRight',
            id: 2
          }
        }
      },
      Area: {
        fields: {
          Id: {
            type: 'uint32',
            id: 1
          },
          ParentId: {
            type: 'uint32',
            id: 2
          },
          IdChain: {
            type: 'string',
            id: 3
          },
          Name: {
            type: 'string',
            id: 4
          }
        }
      },
      AreaDelIn: {
        fields: {
          Id: {
            type: 'uint32',
            id: 1
          }
        }
      },
      AreaUpdateNameIn: {
        fields: {
          Id: {
            type: 'uint32',
            id: 1
          },
          Name: {
            type: 'string',
            id: 2
          }
        }
      },
      AreaGetAllOut: {
        fields: {
          Vec: {
            rule: 'repeated',
            type: 'Area',
            id: 1
          }
        }
      },
      Terminal: {
        fields: {
          Addr: {
            type: 'uint64',
            id: 1
          },
          Name: {
            type: 'string',
            id: 2
          },
          AreaId: {
            type: 'uint32',
            id: 3
          },
          Protocol: {
            type: 'uint32',
            id: 4
          },
          Fes: {
            type: 'int64',
            id: 5
          }
        }
      },
      TerminalDelIn: {
        fields: {
          Addr: {
            type: 'uint64',
            id: 1
          }
        }
      },
      TerminalGetByAreaOut: {
        fields: {
          Vec: {
            rule: 'repeated',
            type: 'Terminal',
            id: 1
          }
        }
      },
      AreaTerminal: {
        fields: {
          Addr: {
            type: 'uint64',
            id: 1
          },
          Name: {
            type: 'string',
            id: 2
          },
          AreaId: {
            type: 'uint32',
            id: 3
          },
          AreaParentId: {
            type: 'uint32',
            id: 4
          },
          AreaName: {
            type: 'string',
            id: 5
          },
          Protocol: {
            type: 'uint32',
            id: 6
          },
          Fes: {
            type: 'int64',
            id: 7
          }
        }
      },
      AreaTerminalTreeGetOut: {
        fields: {
          Vec: {
            rule: 'repeated',
            type: 'AreaTerminal',
            id: 1
          }
        }
      },
      Meter: {
        fields: {
          Addr: {
            type: 'uint64',
            id: 1
          },
          Protocol: {
            type: 'uint32',
            id: 2
          },
          MeterType: {
            type: 'uint32',
            id: 3
          },
          CtrlPw: {
            type: 'uint32',
            id: 4
          },
          PtCt: {
            type: 'uint32',
            id: 5
          },
          AreaId: {
            type: 'uint32',
            id: 6
          },
          VirAddr: {
            type: 'uint64',
            id: 7
          },
          Port: {
            type: 'uint32',
            id: 8
          },
          Mobile: {
            type: 'uint64',
            id: 9
          },
          UserType: {
            type: 'uint32',
            id: 10
          },
          UserNo: {
            type: 'uint64',
            id: 11
          },
          UserName: {
            type: 'string',
            id: 12
          },
          Site: {
            type: 'string',
            id: 13
          },
          MinVal: {
            type: 'uint32',
            id: 14
          },
          MaxVal: {
            type: 'uint32',
            id: 15
          }
        }
      },
      MeterOfAreaTerminalIn: {
        fields: {
          AreaId: {
            type: 'int32',
            id: 1
          },
          TerminalAddr: {
            type: 'uint64',
            id: 2
          }
        }
      },
      MeterOfAreaTerminalOut: {
        fields: {
          Vec: {
            rule: 'repeated',
            type: 'Meter',
            id: 1
          }
        }
      },
      MeterImportIn: {
        fields: {
          Vec: {
            rule: 'repeated',
            type: 'Meter',
            id: 1
          }
        }
      },
      MeterImportRet: {
        fields: {
          Addr: {
            type: 'uint64',
            id: 1
          },
          Ret: {
            type: 'int32',
            id: 2
          }
        }
      },
      MeterImportOut: {
        fields: {
          NewTerminalCount: {
            type: 'uint32',
            id: 1
          },
          Vec: {
            rule: 'repeated',
            type: 'MeterImportRet',
            id: 2
          }
        }
      },
      MeterDelIn: {
        fields: {
          VirAddrs: {
            rule: 'repeated',
            type: 'uint64',
            id: 1
          }
        }
      },
      MeterDelOut: {
        fields: {
          Vec: {
            rule: 'repeated',
            type: 'MeterImportRet',
            id: 1
          }
        }
      },
      MeterSetPrepayIn: {
        fields: {
          VirAddr: {
            type: 'uint64',
            id: 1
          },
          UserType: {
            type: 'uint32',
            id: 2
          },
          PayType: {
            type: 'uint32',
            id: 3
          },
          AlarmVal: {
            type: 'uint32',
            id: 4
          }
        }
      },
      MeterInitPrepayIn: {
        fields: {
          VirAddr: {
            type: 'uint64',
            id: 1
          },
          SwitchSta: {
            type: 'uint32',
            id: 2
          },
          PayLeft: {
            type: 'int32',
            id: 3
          },
          CalVal: {
            type: 'uint32',
            id: 4
          },
          PayCount: {
            type: 'uint32',
            id: 5
          }
        }
      },
      GeneralStatOut: {
        fields: {
          TotalMeterCount: {
            type: 'uint32',
            id: 1
          },
          OnlineMeterCount: {
            type: 'uint32',
            id: 2
          },
          EnergyMeterCount: {
            type: 'uint32',
            id: 3
          },
          WaterMeterCount: {
            type: 'uint32',
            id: 4
          },
          EMeterReadCount: {
            type: 'uint32',
            id: 5
          },
          WMeterReadCount: {
            type: 'uint32',
            id: 6
          },
          EnergyDayConsume: {
            type: 'uint32',
            id: 7
          },
          WaterDayConsume: {
            type: 'uint32',
            id: 8
          },
          EnergyMonthConsume: {
            type: 'uint32',
            id: 9
          },
          WaterMonthConsume: {
            type: 'uint32',
            id: 10
          }
        }
      },
      MeterValGridIn: {
        fields: {
          FromTime: {
            type: 'fixed32',
            id: 1
          },
          EndTime: {
            type: 'fixed32',
            id: 2
          },
          ValType: {
            type: 'uint32',
            id: 3
          },
          AreaId: {
            type: 'int32',
            id: 4
          },
          TerminalAddr: {
            type: 'uint64',
            id: 5
          }
        }
      },
      MeterValGridOut: {
        fields: {
          Vec: {
            rule: 'repeated',
            type: 'MeterValGrid',
            id: 1
          }
        },
        nested: {
          MeterValGrid: {
            fields: {
              Addr: {
                type: 'uint64',
                id: 1
              },
              Protocol: {
                type: 'uint32',
                id: 2
              },
              VirAddr: {
                type: 'uint64',
                id: 3
              },
              Port: {
                type: 'uint32',
                id: 4
              },
              Mobile: {
                type: 'uint64',
                id: 5
              },
              UserType: {
                type: 'uint32',
                id: 6
              },
              UserNo: {
                type: 'uint64',
                id: 7
              },
              UserName: {
                type: 'string',
                id: 8
              },
              ValTime: {
                type: 'fixed32',
                id: 9
              },
              Val0: {
                type: 'uint32',
                id: 10
              },
              Val1: {
                type: 'uint32',
                id: 11
              },
              Val2: {
                type: 'uint32',
                id: 12
              },
              Val3: {
                type: 'uint32',
                id: 13
              },
              Val4: {
                type: 'uint32',
                id: 14
              },
              Val5: {
                type: 'int32',
                id: 15
              },
              ReadTime: {
                type: 'fixed32',
                id: 16
              },
              Site: {
                type: 'string',
                id: 17
              }
            }
          }
        }
      },
      PeriodValQueryOut: {
        fields: {
          Vec: {
            rule: 'repeated',
            type: 'PeriodValInfo',
            id: 1
          }
        },
        nested: {
          PeriodValInfo: {
            fields: {
              Addr: {
                type: 'uint64',
                id: 1
              },
              Protocol: {
                type: 'uint32',
                id: 2
              },
              VirAddr: {
                type: 'uint64',
                id: 3
              },
              Port: {
                type: 'uint32',
                id: 4
              },
              Mobile: {
                type: 'uint64',
                id: 5
              },
              UserType: {
                type: 'uint32',
                id: 6
              },
              UserNo: {
                type: 'uint64',
                id: 7
              },
              UserName: {
                type: 'string',
                id: 8
              },
              PtCt: {
                type: 'uint32',
                id: 9
              },
              Val0: {
                type: 'uint32',
                id: 10
              },
              Val1: {
                type: 'uint32',
                id: 11
              }
            }
          }
        }
      },
      AreaConsumeCurveIn: {
        fields: {
          AreaId: {
            type: 'uint32',
            id: 1
          },
          FromTime: {
            type: 'fixed32',
            id: 2
          },
          EndTime: {
            type: 'fixed32',
            id: 3
          },
          MeterType: {
            type: 'uint32',
            id: 4
          }
        }
      },
      ExLogGetIn: {
        fields: {
          FromTime: {
            type: 'fixed32',
            id: 1
          },
          EndTime: {
            type: 'fixed32',
            id: 2
          },
          AreaId: {
            type: 'int32',
            id: 3
          },
          TerminalAddr: {
            type: 'uint64',
            id: 4
          }
        }
      },
      ExLogGetOut: {
        fields: {
          Vec: {
            rule: 'repeated',
            type: 'ExLogExt',
            id: 1
          }
        },
        nested: {
          ExLogExt: {
            fields: {
              ExTime: {
                type: 'fixed32',
                id: 1
              },
              VirAddr: {
                type: 'uint64',
                id: 2
              },
              ExType: {
                type: 'uint32',
                id: 3
              },
              ExInfo: {
                type: 'string',
                id: 4
              },
              Addr: {
                type: 'uint64',
                id: 5
              },
              Mobile: {
                type: 'uint64',
                id: 6
              },
              UserType: {
                type: 'uint32',
                id: 7
              },
              UserName: {
                type: 'string',
                id: 8
              }
            }
          }
        }
      },
      FeePrice: {
        fields: {
          Type: {
            type: 'uint32',
            id: 1
          },
          Price: {
            type: 'uint64',
            id: 2
          },
          Alias: {
            type: 'string',
            id: 3
          }
        }
      },
      FeePriceGetOut: {
        fields: {
          Vec: {
            rule: 'repeated',
            type: 'FeePrice',
            id: 1
          }
        }
      },
      PrepayGetIn: {
        fields: {
          AreaId: {
            type: 'int32',
            id: 1
          },
          TerminalAddr: {
            type: 'uint64',
            id: 2
          }
        }
      },
      PrepayInfo: {
        fields: {
          Addr: {
            type: 'uint64',
            id: 1
          },
          Protocol: {
            type: 'uint32',
            id: 2
          },
          CtrlPw: {
            type: 'uint32',
            id: 3
          },
          PtCt: {
            type: 'uint32',
            id: 4
          },
          VirAddr: {
            type: 'uint64',
            id: 5
          },
          Port: {
            type: 'uint32',
            id: 6
          },
          Mobile: {
            type: 'uint64',
            id: 7
          },
          UserType: {
            type: 'uint32',
            id: 8
          },
          UserName: {
            type: 'string',
            id: 9
          },
          UserNo: {
            type: 'uint64',
            id: 10
          },
          PayType: {
            type: 'uint32',
            id: 11
          },
          AlarmVal: {
            type: 'uint32',
            id: 12
          },
          SwitchSta: {
            type: 'uint32',
            id: 13
          },
          PayLeft: {
            type: 'int32',
            id: 14
          },
          FeeTime: {
            type: 'fixed32',
            id: 15
          },
          CalVal: {
            type: 'uint32',
            id: 16
          },
          ValTime: {
            type: 'fixed32',
            id: 17
          },
          PayCount: {
            type: 'uint32',
            id: 18
          }
        }
      },
      PrepayGetOut: {
        fields: {
          Vec: {
            rule: 'repeated',
            type: 'PrepayInfo',
            id: 1
          }
        }
      },
      PayLog: {
        fields: {
          PayTime: {
            type: 'fixed32',
            id: 1
          },
          VirAddr: {
            type: 'uint64',
            id: 2
          },
          PayWay: {
            type: 'uint32',
            id: 3
          },
          Fee: {
            type: 'int32',
            id: 4
          },
          Amount: {
            type: 'int32',
            id: 5
          },
          Cause: {
            type: 'uint32',
            id: 6
          },
          Receiver: {
            type: 'string',
            id: 7
          },
          TradeNo: {
            type: 'string',
            id: 8
          },
          Auditor: {
            type: 'string',
            id: 9
          }
        }
      },
      PayLogAddOut: {
        fields: {
          EndLeft: {
            type: 'int32',
            id: 1
          }
        }
      },
      PayLogExtGetIn: {
        fields: {
          FromTime: {
            type: 'fixed32',
            id: 1
          },
          EndTime: {
            type: 'fixed32',
            id: 2
          },
          AreaId: {
            type: 'int32',
            id: 3
          },
          TerminalAddr: {
            type: 'int64',
            id: 4
          },
          Mobile: {
            type: 'uint64',
            id: 5
          },
          IsOnlyEx: {
            type: 'bool',
            id: 6
          }
        }
      },
      PayLogExt: {
        fields: {
          PayTime: {
            type: 'fixed32',
            id: 1
          },
          VirAddr: {
            type: 'uint64',
            id: 2
          },
          PayWay: {
            type: 'uint32',
            id: 3
          },
          Fee: {
            type: 'int32',
            id: 4
          },
          Amount: {
            type: 'int32',
            id: 5
          },
          Cause: {
            type: 'uint32',
            id: 6
          },
          Receiver: {
            type: 'string',
            id: 7
          },
          TradeNo: {
            type: 'string',
            id: 8
          },
          Auditor: {
            type: 'string',
            id: 9
          },
          ActRet: {
            type: 'int32',
            id: 10
          },
          ActTime: {
            type: 'fixed32',
            id: 11
          },
          MeterAddr: {
            type: 'uint64',
            id: 12
          },
          Mobile: {
            type: 'uint64',
            id: 13
          },
          UserType: {
            type: 'uint32',
            id: 14
          },
          UserName: {
            type: 'string',
            id: 15
          },
          PayType: {
            type: 'uint32',
            id: 16
          }
        }
      },
      PayLogExtGetOut: {
        fields: {
          Vec: {
            rule: 'repeated',
            type: 'PayLogExt',
            id: 1
          }
        }
      },
      PayExRetryIn: {
        fields: {
          PayTime: {
            type: 'fixed32',
            id: 1
          },
          VirAddr: {
            type: 'uint64',
            id: 2
          },
          Val: {
            type: 'int32',
            id: 3
          },
          PayType: {
            type: 'uint32',
            id: 4
          }
        }
      },
      ToFesIn: {
        fields: {
          Fes: {
            type: 'uint64',
            id: 1
          },
          Addr: {
            type: 'uint64',
            id: 2
          },
          SpanSec: {
            type: 'uint32',
            id: 3
          },
          Type: {
            type: 'uint32',
            id: 4
          },
          Pack: {
            type: 'bytes',
            id: 5
          }
        }
      },
      ToFesOut: {
        fields: {
          ErrCode: {
            type: 'int32',
            id: 1
          },
          Type: {
            type: 'uint32',
            id: 2
          },
          Pack: {
            type: 'bytes',
            id: 3
          }
        }
      },
      FesBroadcastIn: {
        fields: {
          Pack: {
            type: 'bytes',
            id: 1
          }
        }
      },
      FesBroadcastOut: {
        fields: {}
      },
      FesCloseTerminalIn: {
        fields: {
          Addr: {
            type: 'uint64',
            id: 1
          }
        }
      },
      FesCloseTerminalOut: {
        fields: {}
      },
      FesTerminalAddDelIn: {
        fields: {
          Addr: {
            type: 'uint64',
            id: 1
          },
          Act: {
            type: 'uint32',
            id: 2
          }
        }
      },
      FesTerminalAddDelOut: {
        fields: {
          IsOnline: {
            type: 'bool',
            id: 1
          }
        }
      },
      SendSmsIn: {
        fields: {
          NationCode: {
            type: 'string',
            id: 1
          },
          Mobiles: {
            rule: 'repeated',
            type: 'string',
            id: 2
          },
          TemplateId: {
            type: 'uint32',
            id: 3
          },
          Params: {
            rule: 'repeated',
            type: 'string',
            id: 4
          },
          Ext: {
            type: 'string',
            id: 5
          }
        }
      },
      SendSmsOut: {
        fields: {
          Vec: {
            rule: 'repeated',
            type: 'SendSmsRet',
            id: 1
          },
          Ext: {
            type: 'string',
            id: 2
          }
        },
        nested: {
          SendSmsRet: {
            fields: {
              Mobile: {
                type: 'string',
                id: 1
              },
              Result: {
                type: 'int32',
                id: 2
              }
            }
          }
        }
      }
    }
  }
})

module.exports = $root
