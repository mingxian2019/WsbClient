<template>
  <!-- 抄表异常管理 -->
  <div class="rmReadMeterEx hw100 invoiceInquiry">
    <el-collapse v-model="activeNames" @change="handleChange">
      <el-collapse-item title="重要注意事项" name="1">
        <p class="paragraph">一、根据国税规定，从2016年1月16日起，立创商城发票开具将作相应调整。</p>
        <p class="paragraph">二、立创商城可以开两种类型的增值税发票：<br>

          1、增值税专用发票，可以抵扣，不能随订单发出：<br>

          具体说明：<br>

          1）开票时间：每月8日至25日统一开出<br>

          2）开票规则：开票时间内开具开票日期之前所有已发货的订单累计总金额对应的发票（累计超过200元才会开具发票），每月每个客户统一开具一次发票，当月已开票后产生的已发货订单货款金额顺延累计到下个月统一开票。（当月仅有在8-25号发货需开票的订单，顺延至下月开出）<br>

          <span style=" color: #f00">注意：</span>每月开票时间内统一开具发票并单独寄出（即发票不能长时间无限制积累再开票）<br>

          3）发票运费：单独寄出，运费我司付<br>

          4）其余事项：开票累计总货款金额在200元以下的，本月暂不开出（自动累计到次月超200元再开出，建议您预计长时间发票累计不超过200元时，在下单选择普通发票随货发类型，另需提前开出可联系我司工作人员QQ：4000800709，运费需到付，有特殊情况开票需求的，统一安排在每月25日-27日开出）<br>

          2、增值税普通发票，不能抵扣，随订单发出：<br>

          具体说明：普通发票会随您的订单一起发货，绑定一起发货的订单发票统一开在一起，如果有特殊的开票方式（分开开票），请务必在订单中备注。</p>
          <p class="paragraph">三、需要增值税专用发票的客户，除了原有的增值税开票资料外，还需要上传相应的证明文件：加盖公章的 ①一般纳税人资格证书或认定文件复印件 ②税务登记证副本复印件<br>【三证合一的公司请提供营业执照复印件，正副本均可】</p>
      </el-collapse-item>
    </el-collapse>
    <vxe-toolbar :data="readExData">
      <template v-slot:buttons>
        <!-- <span>审核状态</span> -->
        <el-select
          v-model="inTypeValue"
          placeholder="显示全部订单"
          @change="InTypeChange"
          size="small"
          class="auditStatus"
        >
          <el-option
            v-for="item in InvoiceType"
            :key="item.id"
            :label="item.value"
            :value="item.id"
          ></el-option>
        </el-select>
        <!-- <span>审核状态</span> -->
        <el-select
          v-model="speInvoice"
          placeholder="显示全部订单"
          @change="SpeInChange"
          size="small"
          class="auditStatus"
        >
          <el-option
            v-for="item in SpecialInvoice"
            :key="item.id"
            :label="item.value"
            :value="item.id"
          ></el-option>
        </el-select>
        <span>起始时间</span>
        <el-date-picker v-model="dateFrom" type="date" size="small" placeholder="选择日期"></el-date-picker>
        <span>结束时间</span>
        <el-date-picker v-model="dateEnd" type="date" size="small" placeholder="选择日期"></el-date-picker>
        <span>订单号</span>
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
      <vxe-table-column field="orderNo" title="订单编号" tree-node>
        <template v-slot="{ row }">
          <span v-html="row.orderNo"></span>
        </template>
      </vxe-table-column>
      <vxe-table-column field="orderCreatTime" title="下单时间">
        <template v-slot="{ row }">
          <span v-html="row.orderCreatTime"></span>
        </template>
      </vxe-table-column>
      <vxe-table-column field="invRecharge" title="开票金额">
        <template v-slot="{ row }">
          <span v-html="row.serviceCharge"></span>
        </template>
      </vxe-table-column>
      <vxe-table-column field="rechargeType" title="开票类型">
        <template v-slot="{ row }">
          <span v-html="row.rechargeType"></span>
        </template>
      </vxe-table-column>
      <vxe-table-column field="isInvoice" title="是否已开票">
        <template v-slot="{ row }">
          <span v-html="row.isInvoice"></span>
        </template>
      </vxe-table-column>
      <vxe-table-column field="invoiceTime" title="开票时间">
        <template v-slot="{ row }">
          <span v-html="row.invoiceTime"></span>
        </template>
      </vxe-table-column>
      <vxe-table-column field="expressInfo" title="快递方式/快递单号">
        <template v-slot="{ row }">
          <span v-html="row.expressInfo"></span>
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
      style="margin-right:15px!important"
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
      activeNames: ["1"],
      InvoiceType: Config.InvoiceType,
      SpecialInvoice: Config.SpecialInvoice,
      outFile: "",
      inTypeValue: "显示全部订单",
      speInvoice:'显示全部订单',
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
          "orderNo",
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
    console.log(this)
  },
  methods: {
    handleChange(val) {
      console.log(val);
    },
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
      data[0].orderNo = "订单编号";
      data[0].orderCreatTime = "下单时间";
      data[0].invRecharge = "开票金额";
      data[0].rechargeType = "开票类型";
      data[0].isInvoice = "是否已开票";
      data[0].invoiceTime = "开票时间";
      data[0].expressInfo = "快递方式/快递单号";

      downloadExl(data, "开票明细查询表", 7, this.outFile);
    },
    InTypeChange(val) {
      let filterData = this.readExData.filter((element, index, array) => {
        return val === 0 || Config.getInvoiceTypeId(element.ExType) === val;
      });
      this.$refs.xTable.loadData(filterData);
    },
    SpeInChange(val) {
      let filterData = this.readExData.filter((element, index, array) => {
        return val === 0 || Config.getSpecialInvoiceId(element.ExType) === val;
      });
      this.$refs.xTable.loadData(filterData);
    }
  }
};
</script>

<style lang='less'  type='text/css' scoped>
@import "../../css/rmReadMeterEx.less";
.invoiceInquiry {
  position: relative;
  overflow-y: auto;
  // .vxe-toolbar .vxe-custom--wrapper {
  //   position: absolute !important;
  //   bottom: -3px !important;
  //   right: 20px;
  //   //  bottom: -83px !important;
  // }
  .vxe-table:after {
    bottom: 1px;
  }
  .auditStatus {
    width: 178px !important;
    .el-input {
      width: 178px !important;
    }
  }
  .el-collapse {
    border-top: none;
  }
  .el-collapse-item__header {
    width: 140px;
  }
  .el-collapse-item__header{
    color: #f00 !important;
  }
  .paragraph{
    margin-bottom: 40px;
  }
}
.invoiceInquiry::-webkit-scrollbar {
  width: 6px;
  height: 6px;
  background-color: #f5f5f5;
}
.invoiceInquiry::-webkit-scrollbar-track {
  box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  border-radius: 10px;
  background-color: #f5f5f5;
}
.invoiceInquiry::-webkit-scrollbar-thumb {
  border-radius: 10px;
  box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  background-color: rgb(223, 221, 221);
}
.vxe-toolbar{
  margin-top: 20px;
}
</style>
