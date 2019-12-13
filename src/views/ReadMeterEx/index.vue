<template>
  <!-- 抄表异常管理 -->
  <div class="rmReadMeterEx hw100">
    <div ref="toolbar">
      <vxe-toolbar :data="readExData" setting>
        <template v-slot:buttons>
          <span>起始时间</span>
          <el-date-picker v-model="dateFrom" type="date" size="small" placeholder="选择日期"></el-date-picker>
          <span>结束时间</span>
          <el-date-picker v-model="dateEnd" type="date" size="small" placeholder="选择日期"></el-date-picker>
          <span>异常类型</span>
          <el-select v-model="readExValue" placeholder="请选择" @change="exTypeChange" size="small">
            <el-option
              v-for="item in meterReadEx"
              :key="item.id"
              :label="item.value"
              :value="item.id"
            ></el-option>
          </el-select>
          <el-input
            placeholder="请输入内容"
            prefix-icon="el-icon-search"
            v-model="searchText"
            size="small"
          ></el-input>
          <el-button @click="initTable" size="small" icon="el-icon-search">查询</el-button>
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
        resizable
        :tree-config="{key: 'Addr', children: 'children', trigger: 'cell'}"
        :radio-config="{labelField: 'Mobile'}"
        :data.sync="list"
        :customs.sync="customColumns"
      >
        <vxe-table-column field="Addr" title="表地址" tree-node>
          <template v-slot="{ row }">
            <span v-html="row.Addr"></span>
          </template>
        </vxe-table-column>
        <vxe-table-column field="UserName" title="用户表名">
          <template v-slot="{ row }">
            <span v-html="row.UserName"></span>
          </template>
        </vxe-table-column>
        <vxe-table-column field="Mobile" title="手机号">
          <template v-slot="{ row }">
            <span v-html="row.Mobile"></span>
          </template>
        </vxe-table-column>
        <vxe-table-column field="UserType" title="计费类型">
          <template v-slot="{ row }">
            <span v-html="row.UserType"></span>
          </template>
        </vxe-table-column>
        <vxe-table-column field="ExType" title="异常类型">
          <template v-slot="{ row }">
            <span v-html="row.ExType"></span>
          </template>
        </vxe-table-column>
        <vxe-table-column field="ExTime" title="发生时间">
          <template v-slot="{ row }">
            <span v-html="row.ExTime"></span>
          </template>
        </vxe-table-column>
        <vxe-table-column field="ExInfo" title="异常详情">
          <template v-slot="{ row }">
            <span v-html="row.ExInfo"></span>
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
            <el-radio label="异常类型">异常类型</el-radio>
            <el-radio label="计费类型">计费类型</el-radio>
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
      meterReadEx: Config.MeterReadEx,
      outFile: "",
      readExValue: 0,
      search: "",
      readExData: [],
      searchText: "",
      dateFrom: null,
      dateEnd: null,
      visible: false,
      currentPage: 1,
      pageSize: 13,
      customColumns: [],
      origin: [],
      radio: "",
      startTime: "",
      endTime: "",
      protoExLogGetIn: protoRoot.lookup("WsMsg.ExLogGetIn"),
      protoExLogGetOut: protoRoot.lookup("WsMsg.ExLogGetOut")
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
          "ExTime",
          "ExType",
          "ExInfo",
          "Addr",
          "Mobile",
          "UserType",
          "UserName"
        ];
        let rest = XEUtils.searchTree(
          this.readExData,
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
      return this.readExData;
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
      document.documentElement.clientHeight -
      this.$refs.toolbar.offsetHeight -
      200 +
      "px";
    this.outFile = document.getElementById("downlink");
    this.dateFrom = new Date(
      new Date(new Date().getTime() - 86400000).toDateString()
    );
    this.dateEnd = new Date(new Date(new Date().getTime()).toDateString());
    this.initTable();
  },
  methods: {
    initTable() {
      if (
        store.state.currentAreaTerNode.id === undefined &&
        store.state.currentAreaTerNode.areaId === undefined
      ) {
        Notify("请选择左侧树节点", "info");
        return;
      }
      let exLogGetIn = {
        FromTime: 0,
        EndTime: 0,
        AreaId: 0,
        TerminalAddr: 0
      };
      if (store.state.currentAreaTerNode.isTer) {
        exLogGetIn.AreaId = -1;
        exLogGetIn.TerminalAddr = store.state.currentAreaTerNode.addr;
      } else {
        exLogGetIn.AreaId = store.state.currentAreaTerNode.id;
        exLogGetIn.TerminalAddr = -1;
      }
      exLogGetIn.FromTime = Date.parse(this.dateFrom) / 1000;
      exLogGetIn.EndTime = (Date.parse(this.dateEnd) + 86400000) / 1000 - 1;

      let createProto = this.protoExLogGetIn.create(exLogGetIn);
      let encodeData = this.protoExLogGetIn.encode(createProto).finish();
      let initialData = spliceData(
        encodeData.length,
        Config.WsCmd.exLogGet,
        encodeData
      );
      sendSock(initialData, Config.WsCmd.exLogGet, serverData => {
        const aMsg = this.protoExLogGetOut.decode(serverData.data);
        if (serverData.flag === 1) {
          this.readExData = [];
          for (let i = 0; i < aMsg.Vec.length; i++) {
            this.readExData.push({
              ExTime: new Date(aMsg.Vec[i].ExTime * 1000).Format(
                "yyyy-MM-dd HH:mm"
              ),
              VirAddr: aMsg.Vec[i].VirAddr,
              ExType: Config.getMeterReadExValue(aMsg.Vec[i].ExType),
              ExInfo: aMsg.Vec[i].ExInfo,
              Addr: aMsg.Vec[i].Addr.toString(16),
              Mobile: aMsg.Vec[i].Mobile,
              UserType: store.getters.getFeeNameByUserType(
                aMsg.Vec[i].UserType,
                Config
              ),
              UserName: aMsg.Vec[i].UserName
            });
          }
          this.origin = Config.deepClone(this.readExData);
          this.readExData = this.origin.slice(0, this.pageSize);
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
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handlePageChange(val) {
      const jiequ = this.origin.slice(
        this.pageSize * (val - 1),
        val * this.pageSize
      );
      this.readExData = jiequ;
    },
    // 筛选
    getFilterData() {},
    grouping(value) {
      let groupData = [];
      let k = 0;
      let ExTypes = [];
      let UserTypes = [];
      for (let m = 0; m < this.origin.length; m++) {
        ExTypes.push(this.origin[m].ExType);
        UserTypes.push(this.origin[m].ExType);
      }
      if (value === "异常类型") {
        groupData = [];
        for (let i = 0; i < this.ExTypes.length; i++) {
          let meterOpr = {};
          meterOpr.Addr = k++;
          meterOpr.ExType = this.ExTypes;
          meterOpr.children = [];
          groupData.push(meterOpr);
          for (let b = 0; b < this.origin.length; b++) {
            let aValue = this.ExTypes;
            if (this.origin[b].ExType === aValue) {
              if (!isEmpty(groupData)) {
                for (let j = 0; j < groupData.length; j++) {
                  if (!isEmpty(groupData)) {
                    if (groupData[j].ExType === this.origin[b].ExType) {
                      // this.origin[b].id = groupData[j].id + '-' + this.origin[b].id
                      groupData[j].children.push(this.origin[b]);
                    }
                  }
                }
              }
            }
          }
        }
        getSummaries(groupData, "ExType");
        if (this.$refs.xTable) {
          this.meterData = groupData;
          this.$refs.xTable.loadData(this.meterData);
        }
      }
      if (value === "计费类型") {
        groupData = [];
        for (let i = 0; i < UserTypes.length; i++) {
          let meterOpr = {};
          meterOpr.Addr = k++;
          meterOpr.UserType = UserTypes[i];
          meterOpr.children = [];
          groupData.push(meterOpr);
          for (let b = 0; b < this.origin.length; b++) {
            let aValue = UserTypes[i];
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
    downloadFile: function(rs) {
      // 点击导出按钮
      let data = [{}];
      for (let k in rs[0]) {
        data[0][k] = k;
      }
      data = data.concat(rs);
      data[0].Addr = "表地址";
      data[0].UserName = "用户表名";
      data[0].Mobile = "手机号";
      data[0].UserType = "计费类型";
      data[0].ExType = "异常类型 ";
      data[0].ExTime = "发生时间";
      data[0].ExInfo = "异常详情";

      downloadExl(data, "抄表异常查询表", 7, this.outFile);
    },
    reset() {
      this.readExData = this.origin;
      this.visible = false;
      this.radio = "";
    },
    exTypeChange(val) {
      let filterData = this.readExData.filter((element, index, array) => {
        return val === 0 || Config.getMeterReadExId(element.ExType) === val;
      });
      this.$refs.xTable.loadData(filterData);
    }
  }
};
</script>

<style lang='less'  type='text/css' scoped >
@import "../../css/rmReadMeterEx.less";
</style>
