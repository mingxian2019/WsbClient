<template>
  <!-- 抄表异常管理 -->
  <div class="rmReadMeterEx hw100 rechargeRecord">
    <vxe-toolbar :data="readExData" setting>
      <template v-slot:buttons>
        <span>起始时间</span>
        <el-date-picker v-model="dateFrom" type="date" size="small" placeholder="选择日期"></el-date-picker>
        <span>结束时间</span>
        <el-date-picker v-model="dateEnd" type="date" size="small" placeholder="选择日期"></el-date-picker>
        <span>审核状态</span>
        <el-select
          v-model="readExValue"
          placeholder="请选择"
          @change="exTypeChange"
          size="small"
          class="auditStatus"
        >
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

    <vxe-table
      ref="xTable"
      border
      highlight-hover-row
      highlight-current-row
      resizable
      :tree-config="{key: 'submitTime', children: 'children', trigger: 'cell'}"
      :radio-config="{labelField: 'rechargeType'}"
      :data.sync="list"
      :customs.sync="customColumns"
    >
      <vxe-table-column field="submitTime" title="提交时间" tree-node>
        <template v-slot="{ row }">
          <span v-html="row.submitTime"></span>
        </template>
      </vxe-table-column>
      <vxe-table-column field="rechargeAmount" title="充值金额">
        <template v-slot="{ row }">
          <span v-html="row.rechargeAmount"></span>
        </template>
      </vxe-table-column>
      <vxe-table-column field="serviceCharge" title="手续费">
        <template v-slot="{ row }">
          <span v-html="row.serviceCharge"></span>
        </template>
      </vxe-table-column>
      <vxe-table-column field="rechargeType" title="充值方式">
        <template v-slot="{ row }">
          <span v-html="row.rechargeType"></span>
        </template>
      </vxe-table-column>
      <vxe-table-column field="auditStatus" title="审核状态">
        <template v-slot="{ row }">
          <span v-html="row.auditStatus"></span>
        </template>
      </vxe-table-column>
      <vxe-table-column field="bankName" title="转账银行">
        <template v-slot="{ row }">
          <span v-html="row.bankName"></span>
        </template>
      </vxe-table-column>
      <vxe-table-column field="bankAccount" title="转账人卡号">
        <template v-slot="{ row }">
          <span v-html="row.bankAccount"></span>
        </template>
      </vxe-table-column>
    </vxe-table>

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
    <el-button
      size="small"
      @click="downloadFile(origin)"
      class="btn-export btn-fun uploadFile"
      icon="el-icon-upload2"
      style="margin-right:58px!important"
    >导出</el-button>
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
      readExValue: "",
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
    list() {
      let filterName = XEUtils.toString(this.searchText)
        .trim()
        .toLowerCase();
      if (filterName) {
        let filterRE = new RegExp(filterName, "gi");
        let options = { children: "children" };
        let searchProps = [
          "bankName",
          "auditStatus",
          "bankAccount",
          "submitTime",
          "serviceCharge",
          "rechargeType",
          "rechargeAmount"
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
    deep: true
  },
  mounted() {
    this.outFile = document.getElementById("downlink");
    this.dateFrom = new Date(
      new Date(new Date().getTime() - 86400000).toDateString()
    );
    this.dateEnd = new Date(new Date(new Date().getTime()).toDateString());
    this.initTable();
    console.log(this.meterReadEx)
  },
  methods: {
    initTable() {
      let exLogGetIn = {
        FromTime: 0,
        EndTime: 0,
        // AreaId: 0,
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
              bankName: new Date(aMsg.Vec[i].ExTime * 1000).Format(
                "yyyy-MM-dd HH:mm"
              ),
              VirAddr: aMsg.Vec[i].VirAddr,
              auditStatus: Config.getMeterReadExValue(aMsg.Vec[i].ExType),
              bankAccount: aMsg.Vec[i].ExInfo,
              submitTime: aMsg.Vec[i].Addr.toString(16),
              serviceCharge: aMsg.Vec[i].Mobile,
              rechargeType: store.getters.getFeeNameByUserType(
                aMsg.Vec[i].UserType,
                Config
              ),
              rechargeAmount: aMsg.Vec[i].UserName
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
      data[0].submitTime = "提交时间";
      data[0].rechargeAmount = "充值金额";
      data[0].serviceCharge = "手续费";
      data[0].rechargeType = "充值方式";
      data[0].auditStatus = "审核状态 ";
      data[0].bankName = "转账银行";
      data[0].bankAccount = "转账人卡号";

      downloadExl(data, "充值记录查询表", 7, this.outFile);
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

<style lang='less'  type='text/css' scoped>
@import "../../css/rmReadMeterEx.less";
.rechargeRecord {
  position: relative;
  // .vxe-toolbar .vxe-custom--wrapper {
  //   position: absolute !important;
  //   bottom: 44px !important;
  //   right: 20px;
  // }
  .vxe-table:after {
    bottom: 1px;
  }
  .auditStatus {
      width: 200px!important;
      .el-input{
        width: 200px!important;
      }
  }
}
</style>
