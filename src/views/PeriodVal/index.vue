<template>
  <!-- 时段用量查询 -->
  <div class="periodVal hw100">
    <vxe-toolbar :data="periodValData" setting>
      <template v-slot:buttons>
        <span>起始时间</span>
        <el-date-picker v-model="dateFrom" type="date" size="small" placeholder="选择日期"></el-date-picker>
        <span>结束时间</span>
        <el-date-picker v-model="dateEnd" type="date" size="small" placeholder="选择日期"></el-date-picker>
        <el-button @click="initTable" size="small" icon="el-icon-search">查询</el-button>
        <!-- <vxe-button @click="readMeterFromJzq()">刷新</vxe-button> -->
      </template>
    </vxe-toolbar>
    <div class="table-box" ref="tableBox">
      <vxe-table
        ref="xTable"
        border
        height="auto"
        highlight-hover-row
        highlight-current-row
        resizable
        @cell-click="handleCurrentChange"
        :tree-config="{key: 'Addr', children: 'children', trigger: 'cell'}"
        :radio-config="{labelField: 'Mobile'}"
        :data.sync="list"
        :customs.sync="customColumns"
      >
        <vxe-table-column field="Addr" min-width="120" title="表地址" tree-node>
          <template v-slot="{ row }">
            <span v-html="row.Addr"></span>
          </template>
        </vxe-table-column>
        <vxe-table-column field="UserName" min-width="120" title="用户表名">
          <template v-slot="{ row }">
            <span v-html="row.UserName"></span>
          </template>
        </vxe-table-column>
        <vxe-table-column field="UserNo" min-width="120" title="用户表号">
          <template v-slot="{ row }">
            <span v-html="row.UserNo"></span>
          </template>
        </vxe-table-column>
        <vxe-table-column field="Mobile" min-width="120" title="手机号">
          <template v-slot="{ row }">
            <span v-html="row.Mobile"></span>
          </template>
        </vxe-table-column>
        <vxe-table-column field="UserType" min-width="120" title="用户类型">
          <template v-slot="{ row }">
            <span v-html="row.UserType"></span>
          </template>
        </vxe-table-column>
        <vxe-table-column field="Val0" min-width="120" title="起始时间表底">
          <template v-slot="{ row }">
            <span v-html="row.Val0"></span>
          </template>
        </vxe-table-column>
        <vxe-table-column field="Val1" min-width="120" title="结束时间表底">
          <template v-slot="{ row }">
            <span v-html="row.Val0"></span>
          </template>
        </vxe-table-column>
        <vxe-table-column field="Consume" min-width="120" title="用量">
          <template v-slot="{ row }">
            <span v-html="row.Consume"></span>
          </template>
        </vxe-table-column>
      </vxe-table>
    </div>
    <div class="botoom-box">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handlePageChange"
        :pager-count="5"
        :current-page.sync="currentPage"
        :page-size="pageSize"
        layout="total, prev, pager, next, jumper"
        :total="origin.length"
      ></el-pagination>
      <a id="downlink"></a>
      <el-popover placement="bottom" trigger="click" v-model="visible">
        <template>
          <el-radio-group v-model="radio">
            <el-radio label="用户类型">用户类型</el-radio>
          </el-radio-group>
          <div class="tBtns">
            <el-button size="mini" type="text" @click="reset">重置</el-button>
            <el-button type="text" size="mini" @click="grouping(radio)">确定</el-button>
          </div>
        </template>
        <el-button
          slot="reference"
          size="small"
          class="group btn-fun"
          icon="el-icon-document-copy"
        >分组</el-button>
      </el-popover>
      <el-button
        size="small"
        @click="downloadFile(origin)"
        class="btn-export btn-fun"
        icon="el-icon-upload2"
      >导出</el-button>
    </div>
  </div>
</template>

<script>
import * as Config from "@/config.js";
import XEUtils from "xe-utils";
import store from "@/store/store";
import protoRoot from "@/proto/WsMsg.js";
import { spliceData } from "@/utils/send.js";
import { sendSock } from "@/utils/websocket.js";
import { Notify, downloadExl } from "../../utils/commUtil";
import { getFlagError } from "../../error";

export default {
  name: "rmAbnormal",
  data() {
    return {
      options: Config.ReadCtrls,
      value: "",
      search: "",
      periodValData: [],
      searchText: "",
      period: "",
      visible: false,
      currentPage: 1,
      pageSize: 13,
      customColumns: [],
      origin: [],
      radio: "",
      dateFrom: "",
      dateEnd: "",
      outFile: "", // 导出文件
      protoperiodValQueryIn: protoRoot.lookup("WsMsg.MeterValGridIn"),
      protoperiodValQueryOut: protoRoot.lookup("WsMsg.PeriodValQueryOut")
    };
  },
  computed: {
    currentAreaTer() {
      return this.$store.state.currentAreaTerNode;
    },
    list() {
      let filterName = XEUtils.toString(this.searchText)
        .trim()
        .toLowerCase();
      if (filterName) {
        let filterRE = new RegExp(filterName, "gi");
        let options = { children: "children" };
        let searchProps = [
          "Addr",
          "UserName",
          "UserNo",
          "Mobile",
          "UserType",
          "Val0",
          "Consume"
        ];
        let rest = XEUtils.searchTree(
          this.periodValData,
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
      return this.periodValData;
    }
  },
  watch: {
    currentAreaTer: function() {
      this.initTable();
    },
    deep: true
  },
  mounted() {
    this.$refs.tableBox.style.height =
      document.documentElement.clientHeight - 236 + "px";
    this.outFile = document.getElementById("downlink");
    this.dateFrom = new Date().setDate(1);
    this.dateEnd = new Date(new Date(new Date().getTime()).toDateString());
    this.initTable();
  },
  methods: {
    handleCurrentChange() {},
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handlePageChange(val) {
      const jiequ = this.origin.slice(
        this.pageSize * (val - 1),
        val * this.pageSize
      );
      this.periodValData = jiequ;
    },
    initTable() {
      if (
        store.state.currentAreaTerNode.id === undefined &&
        store.state.currentAreaTerNode.areaId === undefined
      ) {
        Notify("请选择左侧树节点", "info");
        return;
      }
      let periodValQueryIn = {
        FromTime: 0,
        EndTime: 0,
        ValType: 1,
        AreaId: 0,
        TerminalAddr: 0
      };
      if (store.state.currentAreaTerNode.isTer) {
        periodValQueryIn.AreaId = -1;
        periodValQueryIn.TerminalAddr = store.state.currentAreaTerNode.addr;
      } else {
        periodValQueryIn.AreaId = store.state.currentAreaTerNode.id;
        periodValQueryIn.TerminalAddr = -1;
      }
      periodValQueryIn.FromTime = Date.parse(this.dateFrom) / 1000;
      periodValQueryIn.EndTime =
        (Date.parse(this.dateEnd) + 86400000) / 1000 - 1;
      let createProto = this.protoperiodValQueryIn.create(periodValQueryIn);
      let encodeData = this.protoperiodValQueryIn.encode(createProto).finish();
      let initialData = spliceData(
        encodeData.length,
        Config.WsCmd.periodValQuery,
        encodeData
      );
      sendSock(initialData, Config.WsCmd.periodValQuery, serverData => {
        const aMsg = this.protoperiodValQueryOut.decode(serverData.data);
        if (serverData.flag === 1) {
          this.periodValData = [];
          for (let i = 0; i < aMsg.Vec.length; i++) {
            this.periodValData.push({
              Addr: aMsg.Vec[i].Addr.toString(16),
              UserName: aMsg.Vec[i].UserName,
              UserNo: aMsg.Vec[i].UserNo,
              Mobile: aMsg.Vec[i].Mobile,
              UserType: store.getters.getFeeNameByUserType(
                aMsg.Vec[i].UserType,
                Config
              ),
              Val0:
                aMsg.Vec[i].Val0 === 4294967295
                  ? "--"
                  : (aMsg.Vec[i].Val0 / 100).toFixed(2),
              Val1:
                aMsg.Vec[i].Val1 === 4294967295
                  ? "--"
                  : (aMsg.Vec[i].Val1 / 100).toFixed(2),
              Consume:
                aMsg.Vec[i].Val0 !== 4294967295 &&
                aMsg.Vec[i].Val1 !== 4294967295
                  ? (parseInt(val1 - val0) / 100).toFixed(2)
                  : "无效"
            });
          }
          this.origin = Config.deepClone(this.periodValData);
          this.periodValData = this.origin.slice(0, this.pageSize);
        } else {
          this.$notify({
            title: "提示",
            message: getFlagError(serverData.flag),
            type: "error",
            position: "bottom-right"
          });
        }
      });
    },
    // 筛选
    grouping(value) {
      let groupData = [];
      let k = 0;
      let userTypes = [];
      for (let m = 0; m < this.origin.length; m++) {
        userTypes.push(this.origin[m].UserType);
      }
      if (value === "用户类型") {
        groupData = [];
        for (let i = 0; i < userTypes.length; i++) {
          let sysOpr = {};
          sysOpr.Addr = k++;
          sysOpr.UserType = userTypes[i];
          sysOpr.children = [];
          groupData.push(sysOpr);
          for (let b = 0; b < this.origin.length; b++) {
            let aValue = userTypes[i];
            if (this.origin[b].UserType === aValue) {
              if (!isEmpty(groupData)) {
                for (let j = 0; j < groupData.length; j++) {
                  if (!isEmpty(groupData)) {
                    if (groupData[j].UserType === this.origin[b].UserType) {
                      // this.origin[b].id = groupData[j].id + '-' + this.origin[b].id
                      groupData[j].children.push(this.origin[b]);
                    }
                  }
                }
              }
            }
          }
        }
        getSummaries(groupData, "UserType");
        if (this.$refs.xTable) {
          this.periodValData = groupData;
          this.$refs.xTable.loadData(this.periodValData);
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
    downloadFile: function(rs) {
      // 点击导出按钮
      let data = [{}];
      for (let k in rs[0]) {
        data[0][k] = k;
      }
      data = data.concat(rs);
      data[0].Addr = "表地址";
      data[0].UserName = "用户表名";
      data[0].UserNo = "用户表号";
      data[0].Mobile = "手机号";
      data[0].UserType = "用户类型";
      data[0].Val0 = "起始时间表底";
      data[0].Val1 = "结束时间表底";
      data[0].Consume = "用量";
      downloadExl(data, "时段用量查询", 8, this.outFile);
    },
    reset() {
      this.periodValData = this.origin;
      this.visible = false;
      this.radio = "";
    }
  }
};
</script>

<style lang='less'  type='text/css'>
@import "../../css/periodVal.less";
</style>
