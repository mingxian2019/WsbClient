<template>
  <div class="editPwd">
    <div class="content">
      <div class="content-top">
        <p>
          <span>请注意：</span>修改完密码之后需要重新登录
        </p>
      </div>
      <el-form label-position="left" label-width="80px" :model="editPwdData" :rules="rules" ref="ruleForm" status-icon>
        <el-form-item label="当前密码" prop="currentPwd">
          <el-input v-model="editPwdData.currentPwd" show-password></el-input>
        </el-form-item>
        <el-form-item label="新密码" prop="newPwd">
          <el-input v-model="editPwdData.newPwd" show-password></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="confirmPwd">
          <el-input v-model="editPwdData.confirmPwd" show-password></el-input>
        </el-form-item>
        <el-button type="primary" class="confirm" @click="editPwd('ruleForm')" >确认</el-button>
      </el-form>
    </div>
  </div>
</template>

<script>
import protoRoot from '@/proto/WsMsg.js'
import { spliceData } from '@/utils/send.js'
import { sendSock, websocketclose } from '@/utils/websocket.js'
import { WsCmd } from '@/config.js'
import { getToken } from '@/utils/auth.js'
import { Base64 } from 'js-base64'
export default {
  data () {
    let validatePass = (rule, value, callback) => {
      if (value === '') {
        this.yanzhen = false
        callback(new Error('请输入密码'))
      } else {
        this.yanzhen = true
        value === JSON.parse(Base64.decode(getToken())).Password ? callback() : callback(new Error('密码错误'))
      }
    }
    let validatePass2 = (rule, value, callback) => {
      if (value === '') {
        this.yanzhen = false
        callback(new Error('请输入新密码'))
      } else {
        this.yanzhen = true
        callback()
      }
    }
    let validatePass3 = (rule, value, callback) => {
      if (value === '') {
        this.yanzhen = false
        callback(new Error('请再次输入密码'))
      } else if (value !== this.editPwdData.newPwd) {
        this.yanzhen = false
        callback(new Error('两次输入密码不一致!'))
      } else {
        this.yanzhen = true
        callback()
      }
    }
    return {
      editPwdData: {
        currentPwd: '',
        newPwd: '',
        confirmPwd: ''
      },
      yanzhen: false,
      protpSysOprUpdate: protoRoot.lookup('WsMsg.SysOpr'),
      rules: {
        currentPwd: [{ validator: validatePass, trigger: 'blur' }],
        newPwd: [{ validator: validatePass2, trigger: 'blur' }],
        confirmPwd: [{ validator: validatePass3, trigger: 'blur' }]
      }
    }
  },
  methods: {
    editPwd (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          const logininfo = JSON.parse(Base64.decode(getToken()))
          const editData = {
            Mobile: logininfo.Mobile,
            Name: logininfo.Name,
            AreaId: logininfo.AreaId,
            RoleId: logininfo.RoleId,
            Password: this.editPwdData.confirmPwd
          }
          let createProto = this.protpSysOprUpdate.create(editData)
          let encodeData = this.protpSysOprUpdate.encode(createProto).finish()
          let initialData = spliceData(encodeData.length, WsCmd.sysOprUpdate, encodeData)
          sendSock(initialData, WsCmd.sysOprUpdate, serverData => {
            if (serverData.flag === 1) {
              this.$message({ message: '修改成功！', type: 'success' })
              // this.$router.replace('/login')
              websocketclose()
              // this.$router.push({path: '/login', query: {from: 'editPwd'}})
              // 跳转到登录页
              this.$router.replace('/login')
              window.location.reload()
            } else {
              this.$message.error('修改失败: 请稍后重试')
            }
          })
        } else {
          return false
        }
      })
    }
  }
}
</script>

<style lang='less' scoped>
@import '../../css/editPwd.less';
</style>
