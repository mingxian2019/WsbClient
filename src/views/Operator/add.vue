<template>
  <el-dialog
    class="operator-dialog"
    title="新增管理员"
    :visible.sync="formVisible"
    :close-on-click-modal="false"
    :before-close="handleClose"
  >
    <el-form
      :model="modalValue"
      label-position="top"
      class="clearfix"
      :rules="rules"
      ref="rules"
      status-icon
    >
      <el-form-item label="姓名" prop="Name" class="el-item50">
        <el-input v-model="modalValue.Name" size="small" placeholder="请输入姓名"></el-input>
      </el-form-item>

      <el-form-item label="手机号" prop="Mobile" class="el-item50 p0">
        <el-input v-model="modalValue.Mobile" size="small" placeholder="请输入手机号"></el-input>
      </el-form-item>

      <el-form-item label="区域" prop="Area">
        <treeselect
          :options="AreaData"
          placeholder="请选择区域"
          :searchable="false"
          :clearable="false"
          :clearOnSelect="true"
          v-model="modalValue.AreaId"
          :value="value"
          :defaultExpandLevel="Infinity"
          ref="treeSelect"
        />
      </el-form-item>

      <el-form-item label="角色" prop="Roles" class="el-item50">
        <el-select v-model="modalValue.RoleId" placeholder="请选择角色" size="small">
          <el-option v-for="item in roles" :key="item.id" :label="item.value" :value="item.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="密码" prop="Password" class="el-item50 p0">
        <el-input v-model="modalValue.Password" size="small"></el-input>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="formVisible = false" size="small">取 消</el-button>
      <el-button type="primary" @click="addOperator('rules')" size="small">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import Treeselect from "@riophae/vue-treeselect";
import "@riophae/vue-treeselect/dist/vue-treeselect.css";
import protoRoot from "@/proto/WsMsg.js";
import { spliceData } from "@/utils/send.js";
import { sendSock } from "@/utils/websocket.js";
import { RoleTypes, WsCmd, getRoleValue } from "@/config.js";
import store from "@/store/store.js";
import * as Validate from "../../utils/validate.js";
import { Notify } from "../../utils/commUtil";
import { getFlagError } from "../../error";
export default {
  data() {
    return {
      formVisible: false,
      AreaData: [],
      modalValue: {
        Mobile: "",
        Name: "",
        AreaId: "",
        RoleId: 1,
        Password: ""
      },
      selectedOptions: [],
      value: "",
      valueCurrentArea: -1,
      roles: RoleTypes,
      protoSysOprAdd: protoRoot.lookup("WsMsg.SysOpr"),
      rules: {
        Name: [{ validator: Validate.validateOprName, trigger: "blur" }],
        Mobile: [{ validator: Validate.validateMobile, trigger: "blur" }],
        Password: [{ validator: Validate.validateOprPw, trigger: "blur" }]
      }
    };
  },
  props: ["operatorData"],
  created() {
    this.loadArea();
  },
  methods: {
    show() {
      this.formVisible = true;
      if (this.$refs["rules"] !== undefined) {
        this.$refs[formName].resetFields();
      }
    },
    hide() {
      this.formVisible = false;
    },
    loadArea() {
      let tmpTreeData = JSON.parse(JSON.stringify(store.state.glAreaTerData));
      for (let i = 0; i < tmpTreeData.length; i++) {
        // 删除终端和空子节点
        this.removeTerminals(tmpTreeData);
      }
      this.AreaData = tmpTreeData;
      // 设置默认节点为主节点
      this.modalValue.AreaId = this.AreaData[0].id;
    },
    removeTerminals(pVec) {
      for (let i = 0; i < pVec.length; i++) {
        if (pVec[i].id && pVec[i].children && pVec[i].children.length === 0) {
          delete pVec[i].children;
          continue;
        } else if (pVec[i].areaId) {
          pVec.splice(i, 1);
          i--;
        } else if (pVec[i].children && pVec[i].children.length > 0) {
          this.removeTerminals(pVec[i].children);
          if (pVec[i].children.length === 0) delete pVec[i].children;
        }
      }
    },
    addOperator(pRules) {
      this.$refs[pRules].validate(async valid => {
        if (valid) {
          let createProto = this.protoSysOprAdd.create(this.modalValue);
          let encodeData = this.protoSysOprAdd.encode(createProto).finish();
          let initialData = spliceData(
            encodeData.length,
            WsCmd.sysOprAdd,
            encodeData
          );
          sendSock(initialData, WsCmd.sysOprAdd, serverData => {
            if (serverData.flag === 1) {
              Notify("添加成功", "success");
              // 修改本地
              let currentAreaId = this.modalValue.AreaId;
              let targetArea = store.state.original.find(function(obj) {
                // 查找区域名称
                if (obj.AreaId === currentAreaId) return obj;
              });
              store.state.glSysOprData.push({
                Mobile: this.modalValue.Mobile,
                Name: this.modalValue.Name,
                AreaId: this.modalValue.AreaId,
                RoleId: this.modalValue.RoleId,
                Password: this.modalValue.Password,
                Role: getRoleValue(this.modalValue.RoleId),
                Region: targetArea === undefined ? "" : targetArea.AreaName
              });
              this.hide();
              this.$emit("watchChild");
            } else {
              Notify(getFlagError(serverData.flag), "error");
            }
          });
        } else {
          this.formVisible = true;
        }
      });
    },
    regionRepeatName(Mobile, data) {
      // 检测手机号是否重复
      let stark = [];
      stark = stark.concat(data);
      while (stark.length) {
        let temp = stark.shift();
        if (temp.children) {
          stark = stark.concat(temp.children);
        }
        if (temp.Mobile === Mobile) {
          return true;
        }
      }
      return false;
    },
    handleClose() {
      this.formVisible = false;
    }
  },
  components: { Treeselect }
};
</script>

<style lang='less'>
@import "../../css/operator-dialog.less";
</style>
