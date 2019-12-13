<template>
  <div class="meter hw100">
    <div ref="toolbar">
      <vxe-toolbar :data="meterData" setting>
        <template v-slot:buttons>
          <vxe-input v-model="searchText" type="search" placeholder="输入关键字搜索"></vxe-input>
          <!-- <vxe-button @click="initTable()">刷新</vxe-button> -->
          <el-button
            @click="$refs.showAddMeter.show()"
            size="small"
            icon="el-icon-circle-plus-outline"
          >新增</el-button>
          <el-button @click="$refs.showEditMeter.show()" size="small" icon="el-icon-edit">修改</el-button>
          <el-button size="small" icon="el-icon-delete" @click="delMeter()">删除</el-button>
          <el-button size="small" icon="el-icon-delete" @click="clearMeterOfJzq()">清空集中器档案</el-button>
          <el-button @click="downloadMeters" size="small" icon="el-icon-bottom-right">下载档案到集中器</el-button>
          <el-button @click="uploadFile()" size="small" icon="el-icon-download">导入</el-button>
          <!-- <vxe-button >档案下载</vxe-button> -->
        </template>
      </vxe-toolbar>
    </div>
    <div class="table-box" ref="tableBox">
      <vxe-table
        ref="xTable"
        border
        height="auto"
        highlight-hover-row
        highlight-current-row
        @select-all="selectAllEvent"
        @select-change="selectChangeEvent"
        :loading="loading"
        resizable
        @cell-click="handleCurrentChange"
        :tooltip-config="{theme: 'light'}"
        :tree-config="{ key: 'Addr', children: 'children', trigger: 'cell' }"
        :data.sync="list"
        :optimization="{scrollY: {gt: 500, oSize: 10, rSize: 30}}"
        :customs.sync="customColumns"
      >
        <vxe-table-column type="selection" width="50" fixed="left"></vxe-table-column>
        <vxe-table-column field="Addr" title="表地址" min-width="120" tree-node sortable>
          <template v-slot="{ row, seq }">
            <!-- <template>
            <span class="jzqStatus online" v-if="onlineOroff"></span>
            <span class="jzqStatus offline" v-else></span>
            </template>-->
            <span v-html="row.Addr"></span>
          </template>
        </vxe-table-column>
        <vxe-table-column field="Protocol" min-width="120" title="通信协议">
          <template v-slot="{ row }">
            <span v-html="row.Protocol"></span>
          </template>
        </vxe-table-column>
        <vxe-table-column
          field="MeterType"
          min-width="120"
          title="类型"
          :filters="meterTypeFilters"
          :filter-method="filterHandler"
        >
          <template v-slot="{ row }">
            <span v-html="row.MeterType"></span>
          </template>
        </vxe-table-column>
        <vxe-table-column field="CtrlPw" min-width="120" title="密码密级">
          <template v-slot="{ row }">
            <span v-html="row.CtrlPw"></span>
          </template>
        </vxe-table-column>
        <vxe-table-column field="PtCt" min-width="120" title="倍率">
          <template v-slot="{ row }">
            <span v-html="row.PtCt"></span>
          </template>
        </vxe-table-column>
        <vxe-table-column field="JzqAddr" min-width="120" title="终端地址" sortable>
          <template v-slot="{ row }">
            <span v-html="row.JzqAddr"></span>
          </template>
        </vxe-table-column>
        <vxe-table-column field="SeqId" min-width="120" title="序号">
          <template v-slot="{ row }">
            <span v-html="row.SeqId"></span>
          </template>
        </vxe-table-column>
        <vxe-table-column field="Port" min-width="120" title="端口">
          <template v-slot="{ row }">
            <span v-html="row.Port"></span>
          </template>
        </vxe-table-column>
        <vxe-table-column field="Mobile" min-width="120" title="手机号" sortable>
          <template v-slot="{ row }">
            <span v-html="row.Mobile"></span>
          </template>
        </vxe-table-column>
        <vxe-table-column field="UserName" min-width="120" title="表名" sortable>
          <template v-slot="{ row }">
            <span v-html="row.UserName"></span>
          </template>
        </vxe-table-column>
        <vxe-table-column field="UserNo" min-width="120" title="表号" sortable>
          <template v-slot="{ row }">
            <span v-html="row.UserNo"></span>
          </template>
        </vxe-table-column>
        <vxe-table-column field="UserTypeText" min-width="120" title="计费标准">
          <template v-slot="{ row }">
            <span v-html="row.UserTypeText"></span>
          </template>
        </vxe-table-column>
        <vxe-table-column field="Site" min-width="120" title="安装地址" sortable>
          <template v-slot="{ row }">
            <span v-html="row.Site"></span>
          </template>
        </vxe-table-column>
        <vxe-table-column field="Max" min-width="120" title="日用量上限" show-overflow>
          <template v-slot="{ row }">
            <span v-html="row.MaxVal"></span>
          </template>
        </vxe-table-column>
        <vxe-table-column field="Min" min-width="120" title="日用量下限" show-overflow>
          <template v-slot="{ row }">
            <span v-html="row.MinVal"></span>
          </template>
        </vxe-table-column>
      </vxe-table>
    </div>
    <div class="botoom-box">
      <el-pagination
        background
        @size-change="handleSizeChange"
        @current-change="handlePageChange"
        :pager-count="5"
        :current-page.sync="currentPage"
        :page-size="pageSize"
        layout="total, prev, pager, next, jumper"
        :total="origin.length"
      ></el-pagination>
      <input
        type="file"
        @change="importFile(this)"
        id="imFile"
        style="display: none"
        accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
      />
      <a id="downlink"></a>
      <!-- <span class="btn-label">表列管理</span> -->
      <!-- <el-button type='text' size="small"  @click="aaa" class="btn-export" icon="el-icon-upload2">改变状态</el-button> -->
      <el-popover placement="bottom" trigger="click" v-model="visible">
        <template>
          <el-radio-group v-model="radio">
            <el-radio label="类型">类型</el-radio>
            <el-radio label="终端地址">终端地址</el-radio>
          </el-radio-group>

          <div class="tBtns">
            <el-button size="mini" type="text" @click="reset">重置</el-button>
            <el-button type="text" size="mini" @click="grouping(radio)">确定</el-button>
          </div>
        </template>
        <el-button
          slot="reference"
          class="btn-fun group"
          size="small"
          icon="el-icon-document-copy"
        >分组</el-button>
      </el-popover>
      <el-button
        class="btn-fun uploadFile"
        @click="downloadFile(origin)"
        size="small"
        icon="el-icon-upload2"
      >导出</el-button>
    </div>
    <AddMeter ref="showAddMeter" :meterData="meterData"></AddMeter>
    <EditMeter ref="showEditMeter" :meterData="meterData" :currentMeter="currentMeter"></EditMeter>
  </div>
</template>

<script>
import xlsx from "xlsx";
import AddMeter from "./add";
import EditMeter from "./edit";
import store from "@/store/store";
import protoRoot from "@/proto/WsMsg.js";
import { spliceData } from "@/utils/send.js";
import { sendSock } from "@/utils/websocket.js";
import * as Config from "@/config.js";
import * as Pro3761 from "@/pro/pro3761.js";
import * as Pro645 from "@/pro/pro645.js";
import XEUtils from "xe-utils";
import { get3761Error, getFlagError } from "../../error";
import { Notify, downloadExl, sortArr } from "../../utils/commUtil";
export default {
  data() {
    return {
      imFile: "", // 导入文件El
      outFile: "", // 导出文件
      errorDialog: false, // 错误信息弹窗
      errorMsg: "", // 错误信息内容
      searchText: "",
      meterData: [],
      loading: false,
      visible: false,
      protoMeterOfAreaOrTerminalIn: protoRoot.lookup(
        "WsMsg.MeterOfAreaTerminalIn"
      ),
      protoMeterOfAreaOrTerminalMsgOut: protoRoot.lookup(
        "WsMsg.MeterOfAreaTerminalOut"
      ),
      protoMeterDelIn: protoRoot.lookup("WsMsg.MeterDelIn"),
      protoMeterDelOut: protoRoot.lookup("WsMsg.MeterDelOut"),
      protoToFesIn: protoRoot.lookup("WsMsg.ToFesIn"),
      protoToFesOut: protoRoot.lookup("WsMsg.ToFesOut"),
      currentPage: 1,
      pageSize: 13,
      customColumns: [],
      origin: [],
      meterTypeFilters: [
        { label: "电表", value: "电表" },
        { label: "水表", value: "水表" }
      ],
      radio: "",
      selectedMeters: [],
      currentMeter: null,
      online: true,
      // *1 下载任务
      jzqTask: [],
      meterCopy: [],
      MAXDOWNLOAD: 25,
      // *1
      toFesIn: {
        Fes: 0,
        SpanSec: 5,
        Type: 0
      },
      // notifyPromise: Promise.resolve()
      screenHeight: document.documentElement.clientHeight //屏幕高度
    };
  },
  computed: {
    list() {
      let filterName = XEUtils.toString(this.searchText)
        .trim()
        .toLowerCase();
      if (filterName) {
        let filterRE = new RegExp(filterName, "gi");
        let options = { children: "children" };
        let searchProps = [
          "Addr",
          "Protocol",
          "MeterType",
          "CtrlPw",
          "PtCt",
          "JzqAddr",
          "SeqId",
          "Port",
          "Mobile",
          "UserName",
          "UserNo",
          "UserTypeText",
          "Site",
          "MaxVal",
          "MinVal",
          "online"
        ];
        let rest = XEUtils.searchTree(
          this.meterData,
          item =>
            searchProps.some(
              key =>
                XEUtils.toString(item[key])
                  .toLowerCase()
                  .indexOf(filterName) > -1
            ),
          options
        );
        XEUtils.eachTree(
          rest,
          item => {
            searchProps.forEach(key => {
              item[key] = XEUtils.toString(item[key]).replace(
                filterRE,
                match => `<span class="keyword-lighten">${match}</span>`
              );
            });
          },
          options
        );
        return rest;
      }
      return this.meterData;
    },
    getAreaTerSelected() {
      return store.state.currentAreaTerNode;
    }
    // onlineOroff () {
    //   console.log(store.getters.getTerminalFesByAddr(store.state.currentTerAddr))
    //   if ( store.getters.getTerminalFesByAddr(store.state.currentTerAddr) < 0 ) {
    //     return false
    //   }
    //   return true
    // }
  },
  watch: {
    getAreaTerSelected() {
      this.initTable();
    },
    deep: true,
    screenHeight: function(val) {
      //监听屏幕高度变化
      this.$refs.tableBox.style.height = Number(val) - 236 + "px"; //'120'是页面布局调整，可去除
    }
  },
  mounted() {
    this.imFile = document.getElementById("imFile");
    this.outFile = document.getElementById("downlink");
    console.log(this.$refs.toolbar.offsetHeight);
    this.$refs.tableBox.style.height=this.screenHeight -this.$refs.toolbar.offsetHeight -200 +"px";
    var _this = this;
    window.onresize = function() {
      // 定义窗口大小变更通知事件
      _this.screenHeight = document.documentElement.clientHeight; //窗口高度
    };
  },
  created() {
    this.initTable();
  },
  methods: {
    handleCurrentChange(row) {
      this.currentMeter = row.row;
    },
    initTable: function() {
      if (
        store.state.currentAreaTerNode.id === undefined &&
        store.state.currentAreaTerNode.areaId === undefined
      )
        return;
      let meterOfAreaOrTerminalIn = {};
      if (store.state.currentAreaTerNode.isTer) {
        meterOfAreaOrTerminalIn.AreaId = -1;
        meterOfAreaOrTerminalIn.TerminalAddr =
          store.state.currentAreaTerNode.addr;
      } else {
        meterOfAreaOrTerminalIn.AreaId = store.state.currentAreaTerNode.id;
        meterOfAreaOrTerminalIn.TerminalAddr = -1;
      }

      let createProto = this.protoMeterOfAreaOrTerminalIn.create(
        meterOfAreaOrTerminalIn
      );
      let encodeData = this.protoMeterOfAreaOrTerminalIn
        .encode(createProto)
        .finish();
      let initialData = spliceData(
        encodeData.length,
        Config.WsCmd.meterOfAreaTerminal,
        encodeData
      );
      sendSock(initialData, Config.WsCmd.meterOfAreaTerminal, serverData => {
        const aMsg = this.protoMeterOfAreaOrTerminalMsgOut.decode(
          serverData.data
        );
        if (serverData.flag === 1) {
          this.meterData = [];
          for (let i = 0; i < aMsg.Vec.length; i++) {
            this.meterData.push({
              Addr: aMsg.Vec[i].Addr.toString(16),
              Protocol: Config.getMeterProtocolValue(aMsg.Vec[i].Protocol),
              MeterType: Config.getMeterTypeValue(aMsg.Vec[i].MeterType),
              CtrlPw: ("00000000" + aMsg.Vec[i].CtrlPw.toString(16)).slice(-8),
              PtCt: aMsg.Vec[i].PtCt,
              JzqAddr:
                aMsg.Vec[i].Protocol === 1
                  ? parseInt(aMsg.Vec[i].VirAddr / 1024).toString(16)
                  : Pro3761.VirAddrProIntToUiStr(aMsg.Vec[i].VirAddr),
              SeqId: aMsg.Vec[i].VirAddr & 0x03ff,
              Port: Config.getPortValue(aMsg.Vec[i].Port),
              Mobile: aMsg.Vec[i].Mobile,
              UserName: aMsg.Vec[i].UserName,
              UserNo: aMsg.Vec[i].UserNo,
              UserType: aMsg.Vec[i].UserType,
              UserTypeText: store.getters.getFeeNameByUserType(
                aMsg.Vec[i].UserType,
                Config
              ),
              Site: aMsg.Vec[i].Site,
              MaxVal: aMsg.Vec[i].MaxVal,
              MinVal: aMsg.Vec[i].MinVal
            });
          }
          this.origin = Config.deepClone(this.meterData);
          this.meterData = this.origin.slice(0, this.pageSize);
        } else {
          Notify(getFlagError(serverData.flag), "error");
        }
      });
    },
    delMeter() {
      // 删除
      if (this.selectedMeters.length === 0) {
        Notify("请勾选至少一个集中器", "info");
        return;
      }
      let meters = { VirAddrs: [] };
      for (let i = 0; i < this.selectedMeters.length; i++) {
        let addr = 0;
        if (Config.getMeterProtocolId(this.selectedMeters[i].Protocol) === 1) {
          addr = Pro645.AddrUiStrToProInt(this.selectedMeters[i].JzqAddr);
        } else {
          addr = Pro3761.AddrUiStrToProInt(this.selectedMeters[i].JzqAddr);
        }
        meters.VirAddrs.push(
          parseInt(addr * 1024) + parseInt(this.selectedMeters[i].SeqId)
        );
      }
      let createProto = this.protoMeterDelIn.create(meters);
      let encodeData = this.protoMeterDelIn.encode(createProto).finish();
      let initialData = spliceData(
        encodeData.length,
        Config.WsCmd.meterDel,
        encodeData
      );
      sendSock(initialData, Config.WsCmd.meterDel, serverData => {
        if (serverData.flag === 1) {
          for (var i = 0; i < this.selectedMeters.length; i++) {
            var addr = this.selectedMeters[i].Addr;
            this.meterData = this.meterData.filter(function(item) {
              return item.Addr !== addr;
            });
          }
          Notify("删除成功", "success");
        } else {
          Notify(getFlagError(serverData.flag), "error");
        }
      });
    },
    uploadFile: function() {
      // 点击导入按钮
      this.imFile.click();
    },
    downloadFile: function(rs) {
      // 点击导出按钮
      let data = [{}];
      for (let k in rs[0]) {
        data[0][k] = k;
      }
      data = data.concat(rs);
      data[0].Addr = "表地址";
      data[0].Protocol = "通信协议";
      data[0].MeterType = "类型";
      data[0].CtrlPw = "密码密级";
      data[0].PtCt = "倍率";
      data[0].JzqAddr = "终端地址";
      data[0].SeqId = "序号";
      data[0].Port = "端口";
      data[0].Mobile = "手机号";
      data[0].UserName = "表名";
      data[0].UserNo = "表号";
      data[0].UserType = "计费标准";
      data[0].Site = "安装地址";
      data[0].MaxVal = "日用量上限";
      data[0].MinVal = "日用量下限";

      downloadExl(data, "表计管理表", 15, this.outFile);
    },
    importFile: function() {
      // 导入excel
      let obj = this.imFile;
      var f = obj.files[0];
      var reader = new FileReader();
      let $t = this;
      reader.onload = function(e) {
        var data = e.target.result;
        if ($t.rABS) {
          $t.wb = xlsx.read(btoa(this.fixdata(data)), {
            // 手动转化
            type: "base64"
          });
        } else {
          $t.wb = xlsx.read(data, {
            type: "binary"
          });
        }
        let json = xlsx.utils.sheet_to_json($t.wb.Sheets[$t.wb.SheetNames[0]]);
        $t.dealFile($t.analyzeData(json)); // analyzeData: 解析导入数据
      };
      if (this.rABS) {
        reader.readAsArrayBuffer(f);
      } else {
        reader.readAsBinaryString(f);
      }
    },
    analyzeData: function(data) {
      // 此处可以解析导入的数据
      return data;
    },
    dealFile: function(data) {
      // 处理导入的数据
      this.imFile.value = "";
      let keyMap = {
        倍率: "PtCt",
        安装位置: "Site",
        密码密级: "CtrlPw",
        序号: "SeqId",
        手机号: "Mobile",
        用户表号: "UserNo",
        用户表名: "UserName",
        端口: "Port",
        表地址: "Addr",
        表计类型: "MeterType",
        计费标准: "UserType",
        通信协议: "Protocol",
        集中器地址: "JzqAddr"
      };
      if (data.length <= 0) {
        this.errorDialog = true;
        this.errorMsg = "请输入正确信息";
      } else {
        for (let i = 0; i < data.length; i++) {
          let obj = data[i];
          for (var key in obj) {
            let newKey = keyMap[key];
            if (newKey) {
              obj[newKey] = obj[key];
              delete obj[key];
            }
            obj.id = i;
          }
        }
        this.origin = Config.deepClone(data);
        if (this.$refs.xTable) {
          this.meterData = this.origin.slice(0, this.pageSize);
          this.$refs.xTable.loadData(this.meterData);
        }
        this.loading = false;
      }
    },
    fixdata: function(data) {
      // 文件流转BinaString
      var o = "";
      var w = 10240;
      for (var l = 0; l < data.byteLength / w; ++l) {
        o += String.fromCharCode.apply(
          null,
          new Uint8Array(data.slice(l * w, l * w + w))
        );
      }
      o += String.fromCharCode.apply(null, new Uint8Array(data.slice(l * w)));
      return o;
    },
    handleSizeChange(val) {},
    // 分页
    handlePageChange(val) {
      const INTERCEPT = this.origin.slice(
        this.pageSize * (val - 1),
        val * this.pageSize
      );
      this.meterData = INTERCEPT;
    },
    // 筛选
    getFilterData() {},
    // 分组
    grouping(value) {
      let groupData = [];
      let k = 0;
      if (value === "类型") {
        groupData = [];
        for (let i = 0; i < this.meterTypeFilters.length; i++) {
          let meterOpr = {};
          meterOpr.Addr = k++;
          meterOpr.MeterType = this.meterTypeFilters[i].value;
          meterOpr.children = [];
          groupData.push(meterOpr);
          for (let b = 0; b < this.origin.length; b++) {
            let aValue = this.meterTypeFilters[i].value;
            if (this.origin[b].MeterType === aValue) {
              if (!isEmpty(groupData)) {
                for (let j = 0; j < groupData.length; j++) {
                  if (!isEmpty(groupData)) {
                    if (groupData[j].MeterType === this.origin[b].MeterType) {
                      this.origin[b].id =
                        groupData[j].id + "-" + this.origin[b].id;
                      groupData[j].children.push(this.origin[b]);
                    }
                  }
                }
              }
            }
          }
        }
        getSummaries(groupData, "MeterType");
        if (this.$refs.xTable) {
          this.meterData = groupData;
          this.$refs.xTable.loadData(this.meterData);
        }
      }
      if (value === "终端地址") {
        let jzqAdders = sortArr(this.origin, "JzqAddr");
        groupData = [];
        for (let i = 0; i < jzqAdders.length; i++) {
          let meterOpr = {};
          meterOpr.Addr = k++;
          meterOpr.JzqAddr = jzqAdders[i];
          meterOpr.children = [];
          groupData.push(meterOpr);
          for (let b = 0; b < this.origin.length; b++) {
            let aValue = jzqAdders[i];
            if (this.origin[b].JzqAddr === aValue) {
              if (!isEmpty(groupData)) {
                for (let j = 0; j < groupData.length; j++) {
                  if (!isEmpty(groupData)) {
                    if (groupData[j].JzqAddr === this.origin[b].JzqAddr) {
                      // this.origin[b].id = groupData[j].id + '-' + this.origin[b].id
                      groupData[j].children.push(this.origin[b]);
                    }
                  }
                }
              }
            }
          }
        }
        getSummaries(groupData, "JzqAddr");
        if (this.$refs.xTable) {
          this.meterData = groupData;
          this.$refs.xTable.loadData(this.meterData);
        }
      }
      function isEmpty(param) {
        if (
          param === "" ||
          param === "undefined" ||
          param === undefined ||
          param === null ||
          param === "null"
        ) {
          return true;
        } else {
          return false;
        }
      }
      function getSummaries(data, key) {
        for (let i = 0; i < data.length; i++) {
          data[i][key] = `${data[i][key]}(${data[i].children.length}位)`;
        }
      }
      this.visible = false;
    },
    filterHandler({ value, row, column }) {
      let property = column["property"];
      return row[property] === value;
    },
    reset() {
      this.meterData = this.origin;
      this.visible = false;
      this.radio = "";
    },
    selectAllEvent({ checked, selection }) {
      this.selectedMeters = selection;
    },
    selectChangeEvent({ checked, row }) {
      this.selectedMeters = this.$refs.xTable.getSelectRecords();
    },
    downloadMeters() {
      if (this.meterData.length === 0) {
        Notify("没有表计需要下载", "info");
        return;
      }
      // 查找所有集中器
      this.jzqTask.length = 0;
      this.meterCopy.length = 0;
      for (var i = 0; i < this.meterData.length; i++) {
        if (this.jzqTask.indexOf(this.meterData[i].JzqAddr) < 0) {
          this.jzqTask.push(this.meterData[i].JzqAddr);
        }
      }
      this.meterCopy = JSON.parse(JSON.stringify(this.meterData));
      // 开始下载
      this.downloadTask();
    },
    downloadTask() {
      if (this.jzqTask.length === 0) {
        Notify("下载完成", "success");
        return;
      }

      var jzq = this.jzqTask[0];
      this.toFesIn.Addr = Pro3761.AddrUiStrToProInt(jzq);
      var meters = this.findMeters(jzq);
      if (meters.length === 0) {
        this.jzqTask.shift();
        this.downloadTask();
        return;
      }

      let pack = new ArrayBuffer(4 + 2 + 27 * meters.length);
      var dataUnit = new DataView(pack);
      dataUnit.setUint16(0, 0, true);
      dataUnit.setUint16(2, Pro3761.Fn(10), true);
      dataUnit.setUint16(4, meters.length, true);

      for (var i = 0; i < meters.length; i++) {
        dataUnit.setUint16(27 * i + 6, meters[i].SeqId, true);
        dataUnit.setUint16(27 * i + 8, meters[i].SeqId, true);
        dataUnit.setUint8(27 * i + 10, Config.getPortId(meters[i].Port), true);
        dataUnit.setUint8(
          27 * i + 11,
          meters[i].Protocol === "3761"
            ? 30
            : meters[i].Protocol === "97"
            ? 1
            : 2,
          true
        );
        dataUnit.setUint32(27 * i + 12, parseInt(meters[i].Addr, 16), true);
        dataUnit.setUint16(
          27 * i + 16,
          parseInt(meters[i].Addr, 16) / 4294967296,
          true
        );
        dataUnit.setUint8(27 * i + 24, 4, true);
      }

      this.toFesIn.Pack = Pro3761.BuildPack(
        0x4a,
        this.toFesIn.Addr,
        this.toFesIn.Fes,
        Pro3761.ProAfn.Afn_SetParam,
        0x70 + store.getters.getTerminalSeqByAddr(this.toFesIn.Addr),
        dataUnit,
        pack.byteLength
      );
      let createProto = this.protoToFesIn.create(this.toFesIn);
      let encodeData = this.protoToFesIn.encode(createProto).finish();
      let initialData = spliceData(
        encodeData.length,
        Config.WsCmd.terminalComm,
        encodeData
      );
      sendSock(initialData, Config.WsCmd.terminalComm, serverData => {
        if (serverData.flag === 1) {
          let response = this.protoToFesOut.decode(serverData.data);
          if (response.ErrCode === 0) {
            Notify("下载成功", "success");
          } else {
            Notify(get3761Error(response.ErrCode), "error");
          }
        } else {
          Notify(getFlagError(serverData.flag), "error");
        }
        this.downloadTask();
      });
    },
    findMeters(pJzqAddr) {
      var meters = [];
      for (let i = 0; i < this.meterCopy.length; i++) {
        if (meters.length === this.MAXDOWNLOAD) {
          return meters;
        }
        if (this.meterCopy[i].JzqAddr === pJzqAddr) {
          meters.push(this.meterCopy[i]);
          this.meterCopy.splice(i, 1);
          i--;
        }
      }
      return meters;
    },
    // 清空集中器档案
    clearMeterOfJzq() {
      this.jzqTask.length = 0;
      if (store.state.currentAreaTerNode.isTer) {
        this.$confirm("清除当前选中集中器的档案", "清理提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(async () => {
            // 确认
            this.jzqTask.push(store.state.currentAreaTerNode.addr);
            this.clearMeterTask();
          })
          .catch(() => {});
      } else if (store.state.currentAreaTerNode.id > 0) {
        this.$confirm("清除当前区域下所有集中器的档案", "清理提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(async () => {
            // 确认
            this.getJzqOfArea();
            this.clearMeterTask();
          })
          .catch(() => {});
      }
    },
    clearMeterTask() {
      if (this.jzqTask.length === 0) {
        Notify("清除完毕", "success");
        return;
      }
      this.toFesIn.Addr = this.jzqTask[0];
      let pack = new ArrayBuffer((4 + 1) * 3 + 16);
      var dataUnit = new DataView(pack);
      dataUnit.setUint16(0, 0, true);
      dataUnit.setUint16(2, Pro3761.Fn(53), true);
      dataUnit.setUint8(4, 31);

      dataUnit.setUint16(5, 0, true);
      dataUnit.setUint16(7, Pro3761.Fn(53), true);
      dataUnit.setUint8(9, 1);

      dataUnit.setUint16(10, 0, true);
      dataUnit.setUint16(12, Pro3761.Fn(53), true);
      dataUnit.setUint8(14, 2);

      this.toFesIn.Pack = Pro3761.BuildPack(
        0x4a,
        this.toFesIn.Addr,
        this.toFesIn.Fes,
        Pro3761.ProAfn.Afn_Ctrl,
        0x70 + store.getters.getTerminalSeqByAddr(this.toFesIn.Addr),
        dataUnit,
        pack.byteLength
      );
      let createProto = this.protoToFesIn.create(this.toFesIn);
      let encodeData = this.protoToFesIn.encode(createProto).finish();
      let initialData = spliceData(
        encodeData.length,
        Config.WsCmd.terminalComm,
        encodeData
      );
      sendSock(initialData, Config.WsCmd.terminalComm, serverData => {
        if (serverData.flag === 1) {
          let response = this.protoToFesOut.decode(serverData.data);
          if (response.ErrCode === 0) {
            let ret = parseInt(response.Pack[16], 16);
            if (ret === 1) {
              Notify("删除成功", "success");
            } else {
              Notify("删除失败", "error");
            }
          } else {
            Notify(get3761Error(response.ErrCode), "error");
          }
        } else {
          Notify(getFlagError(serverData.flag), "error");
        }
        this.jzqTask.shift();
        this.clearMeterTask();
      });
    },
    getJzqOfArea() {
      if (store.state.currentAreaTerNode.isTer) {
        this.jzqTask.push(store.state.currentAreaTerNode.addr);
      } else {
        this.findTerminals(store.state.currentAreaTerNode.children);
      }
    },
    findTerminals(pVec) {
      for (let i = 0; i < pVec.length; i++) {
        if (pVec[i].isTer) {
          this.jzqTask.push(pVec[i].addr);
          continue;
        } else if (pVec[i].children && pVec[i].children.length > 0) {
          this.findTerminals(pVec[i].children);
        }
      }
    }
  },
  components: {
    AddMeter,
    EditMeter
  }
};
</script>

<style lang='less'>
@import "../../css/meter.less";
</style>
