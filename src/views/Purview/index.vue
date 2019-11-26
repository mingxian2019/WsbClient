<template>
  <div class="purview">
    <div class="content">
      <div class="content-left">
        <div class="content-title">
          <i class="fas fa-user-tie"></i>角色
        </div>
        <div class="content-left-b">
          <el-menu
            default-active="2"
            @select='selectRole'
            class="el-menu-vertical-demo">
            <el-menu-item index="1" >
              <span slot="title">管理员</span>
            </el-menu-item>
            <el-menu-item index="2">
              <span slot="title">抄表员</span>
            </el-menu-item>
            <el-menu-item index="3">
              <span slot="title">收费员</span>
            </el-menu-item>
            <el-menu-item index="4">
              <span slot="title">审核员</span>
            </el-menu-item>
          </el-menu>
        </div>
      </div>
      <div class="content-right">
        <div class="content-title">
          <i class="fas fa-key"></i>权限
          <el-button size='mini' class='content-title-btn'>提交</el-button>
        </div>
          <div class="content-right-b clearfix">
            <div class="content-tree">
              <el-tree
                :data="flie"
                :props="defaultProps"
                node-key="id"
                show-checkbox
                :default-expanded-keys="[0]"
                :default-checked-keys="flieRights"
                @check="handleNodeClick">
              </el-tree>
              <el-tree :data="readMeter"
                :props="defaultProps"
                node-key="id"
                show-checkbox
                :default-expanded-keys="[0]"
                :default-checked-keys="readMeterRights"
                @check="handleNodeClick">
              </el-tree>
              <el-tree :data="toll"
                :props="defaultProps"
                node-key="id"
                show-checkbox
                :default-expanded-keys="[0]"
                :default-checked-keys="tollRights"
                @check="handleNodeClick">
              </el-tree>
              <el-tree :data="setting"
                :props="defaultProps"
                node-key="id"
                show-checkbox
                :default-expanded-keys="[0]"
                :default-checked-keys="settingRights"
                @check="handleNodeClick">
              </el-tree>
              <el-tree :data="hellpe"
                :props="defaultProps"
                node-key="id"
                show-checkbox
                :default-expanded-keys="[0]"
                :default-checked-keys="hellpeRights"
                @check="handleNodeClick">
              </el-tree>
            </div>
            <!-- <div class="explain">
              <div class="explain-true clearfix">以选中</div>
              <div class="explain-false clearfix">未选中</div>
            </div> -->

          </div>
      </div>
    </div>
  </div>
</template>

<script>
import { WsCmd } from '@/config.js'
import protoRoot from '@/proto/WsMsg.js'
import { spliceData } from '@/utils/send.js'
import { sendSock } from '@/utils/websocket.js'
export default {
  data () {
    return {
      flie: [{
        label: '档案',
        id: 0,
        children: [
          { label: '区域管理', id: 1 },
          { label: '操作员管理', id: 2 },
          { label: '集中器管理', id: 3 },
          { label: '表计管理', id: 4 }
        ]
      }],
      readMeter: [{
        label: '抄表',
        id: 0,
        children: [
          { label: '抄表与查询', id: 1 },
          { label: '抄表综合统计', id: 2 },
          { label: '抄表异常查询', id: 3 },
          { label: '时段用量查询', id: 4 }
        ]
      }],
      toll: [{
        label: '收费',
        id: 0,
        children: [
          { label: '预付费', id: 1 },
          { label: '充值异常管理', id: 2 },
          { label: '单价设置', id: 3 },
          { label: '缴费查询', id: 4 },
          { label: '收费查询', id: 5 }
        ]
      }],
      setting: [{
        label: '系统',
        id: 0,
        children: [
          { label: '系统设置', id: 1 },
          { label: '更改登录密码', id: 2 },
          { label: '角色权限管理', id: 3 },
          { label: '注销登录', id: 4 }
        ]
      }],
      hellpe: [{
        label: '帮助',
        id: 0,
        children: [
          { label: '说明书', id: 1 },
          { label: '关于', id: 2 }
        ]
      }],
      defaultProps: {
        children: 'children',
        label: 'label',
        id: 'id'
      },
      protoRoleRightGetIn: protoRoot.lookup('WsMsg.RoleRightGetIn'),
      ModuleRight: protoRoot.lookup('WsMsg.ModuleRight'),
      roleRightGetMsgOut: protoRoot.lookup('WsMsg.RoleRightGetOut'),
      roleRightUpdateIn: protoRoot.lookup('WsMsg.RoleRightUpdateIn'),
      flieRights: [1, 2, 3, 4],
      readMeterRights: [1, 2, 3, 4],
      tollRights: [1, 2, 3, 4, 5],
      settingRights: [1, 2, 3, 4],
      hellpeRights: [1, 2]

    }
  },
  created () {
    this.initRight()
  },
  methods: {
    initRight (id) {
      let roleRightGetIn = {
        // RoleId: SYSOPR.RoleId
      }
      let createProto = this.protoRoleRightGetIn.create(roleRightGetIn)
      let encodeData = this.protoRoleRightGetIn.encode(createProto).finish()
      let initialData = spliceData(encodeData.length, WsCmd.roleRightGet, encodeData)
      sendSock(initialData, WsCmd.roleRightGet, serverData => {
        const MESBODY = this.roleRightGetMsgOut.decode(serverData.data)
        console.log(MESBODY)
      })
    },
    selectRole (index, indexPath) {
      console.log(index)
    },
    handleNodeClick (checkedNodes, checkedKeys) {
      console.log(checkedNodes)
      console.log(checkedKeys)
    }
  }
}
</script>

<style lang='less'>
@import '../../css/purview.less';
</style>
