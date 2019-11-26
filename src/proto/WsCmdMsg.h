#ifndef WS_CMD_MSG_H
#define WS_CMD_MSG_H 1

#include "ws/WsMsg/WsMsg.pb.h"
//#include "WsMsg/WsMsg_types.h"
//#include "WsMsg/WsMsg_constants.h"

namespace WsMsg {

#define MSG_FLAG_UNLOGIN -11

struct WsCmd
{
    enum CmdEnum
    {
        Http = 0,
        Inform = 1, SwReg = 2, SmsSend = 3,
        SysOprAdd = 10, SysOprDel = 11, SysOprUpdate = 12, SysOprGetOne = 13, SysOprGetAll = 14,
        SysOprLogin = 15, SysOprGetByRole = 16,
        RoleRightGet = 20, RoleRightUpdate = 21,
        AreaAdd = 30, AreaDel = 31, AreaUpdateName = 32, AreaGetOne = 33, AreaGetAll = 34, AreaGetByParent = 35,
        TerminalAdd = 40, TerminalDel = 41, TerminalUpdate = 42, TerminalGetOne = 43,
        TerminalGetByArea = 44, AreaTerminalTreeGet = 45,
        MeterAdd = 50, MeterDel = 51, MeterUpdate = 52, MeterGetOne = 53, MeterOfAreaTerminal = 54,
        MeterImport = 55, MeterSetPrepay = 56, MeterInitPrepay = 57,
        GeneralStat = 60, OfflineDetail = 61,
        MeterValGridGet = 70, MeterValMerge = 71, MeterValCurveGet = 72, AreaConsumeCurveGet = 73,
        PeriodValQuery = 74, ExLogGet = 75,
        FeePriceGet = 80, FeePriceMerge = 81, FeePriceDel = 82,
        PrepayGet = 90, PayLogAdd = 91, PayLogExtGet = 92, PayExRetry = 93, PayLogUserGet = 94,

        SysConfigGet = 100, SysConfigUpdate = 101,
        SysFeeLogGet = 110, SysFeeLogAdd = 111,
        WsReg = 120,  WsUpdate = 121,
        UserLogin = 130, UserReg = 131, UserGet = 132, UserUpdate = 133,
        MeterOfUserGet = 140, /*MeterValCurveGet = ,*/

        TerminalComm = 255,
    };
};

typedef class SysOpr SysOprAddIn;
//SysOprAddOut Msg.GetBody()=string::empty(), Message.GetFlag = 1成功，0失败, -1异常
//typedef class SysOprDelIn SysOprDelIn; //thrift生成代码已定义
//SysOprDelOut Msg.GetBody()=string::empty(), Message.GetFlag = 1成功，0失败, -1异常
typedef class SysOpr SysOprUpdateIn;
//SysOprUpdateOut Msg.GetBody()=string::empty(), Message.GetFlag = 1成功，0失败, -1异常
//SysOprLoginOut; //Flag=1成功，0SysOpr的Id或Pw不对，-1解码异常 -2WsId云端未注册，-3WsPw不对
typedef class SysOpr SysOprPwUpdateIn; //thrift生成代码已定义
//SysOprPwUpdateOut Msg.GetBody()=string::empty(), Message.GetFlag = 1成功，0失败, -1异常
//struct SysOprGetAllIn 只需Msg.GetCmd()对，Msg.GetBody()为空std::string
//typedef class SysOprGetAllOut SysOprGetAllOut; //thrift生成代码已定义,
typedef class SysOprDelIn SysOprGetOneIn;
typedef class SysOpr SysOprGetOneOut; //没有记录时Msg.GetFlag()=0,Msg.GetBody()=string::empty()
typedef RoleRightGetIn SysOprGetByRoleIn;
typedef SysOprGetAllOut SysOprGetByRoleOut;

//typedef class RoleRightGetIn RoleRightGetIn; //thrift生成代码已定义
//typedef class RoleRightGetOut RoleRightGetOut; //thrift生成代码已定义
//typedef class RoleRightUpdateIn RoleRightUpdateIn; //thrift生成代码已定义
//RoleRightUpdateOut Msg.GetBody()=string::empty(), Message.GetFlag = 1成功，0失败, -1异常

typedef class Area AreaAddIn;
typedef class AreaDelIn AreaAddOut; //Message.GetFlag=1成功，0失败, -1异常
//AreaDelOut Msg.GetBody()=string::empty(), Message.GetFlag = 1成功，0失败, -1异常
typedef class Area AreaUpdateIn;
//AreaUpdateOut Msg.GetBody()=string::empty(), Message.GetFlag = 1成功，0失败, -1异常
//struct AreaGetAllIn 只需Msg.GetCmd()对，Msg.GetBody()为空std::string
//typedef class AreaGetAllOut AreaGetAllOut; //thrift生成代码已定义
typedef class AreaDelIn AreaGetOneIn;
typedef class Area AreaGetOneOut;
typedef class AreaDelIn AreaGetByParentIn;
typedef class AreaGetAllOut AreaGetByParentOut;


typedef class Terminal TerminalAddIn;
//TerminalAddOut Msg.GetBody()=string::empty(), Message.GetFlag = 1成功，0失败, -1异常
//typedef class TerminalDelIn TerminalDelIn; //thrift生成代码已定义
//TerminalDelOut Msg.GetBody()=string::empty(), Message.GetFlag = 1成功，0失败, -1异常
typedef class Terminal TerminalUpdateIn;
//TerminalUpdateOut Msg.GetBody()=string::empty(), Message.GetFlag = 1成功，0失败, -1异常
typedef AreaDelIn TerminalGetByAreaIn;
typedef AreaDelIn AreaTerminalTreeGetIn;
typedef AreaDelIn GeneralStatIn;
typedef AreaDelIn OfflineDetailIn;


typedef MeterValGridIn PeriodValQueryIn;
typedef class MeterValCurveIn MeterValGetIn; //thrift生成代码已定义
//typedef class MeterValCurveOut MeterValCurveOut; //thrift生成代码已定义
//typedef TerminalDelIn MeterDelByTerminalIn;
typedef MeterValCurveOut AreaConsumeCurveOut;

typedef FeePrice FeePriceMergeIn;
typedef FeePrice FeePriceDelIn;
typedef PayLog PayLogAddIn;


}

#endif

