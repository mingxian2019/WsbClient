<template>
  <div class='basicInfo hw100'>
    <div class='basicInfo-block '>
      <h2 class='basicInfo-block-title'>账号信息</h2>
      <div class='basicInfo-block-item item40'>
        <span class='item-label'>企业名称：</span>
        <span class='item-content' v-show='setShowName'>{{ wsData.Name }}</span>
        <input class='edit-input' v-show='setShowInput' id='js-name' :placeholder='wsData.Name' type='text' v-model='newName'>
        <el-button type="text" icon="el-icon-edit" @click='showEdit' v-show='setShowName'></el-button>
        <div class="item-bts" v-show='setShowInput'>
          <el-button type="text"  @click='editName'>保存</el-button>
          <el-button type="text"  @click='showInput = false'>取消</el-button>
        </div>
      </div>
      <div class='basicInfo-block-item item60'>
        <span class='item-label long-label'>账户标识 - 使用者手机号：</span>
        <span class='item-content'>{{ wsData.Id }}</span><br/>
      </div>
      <div class='basicInfo-block-item item40'>
        <span class='item-label'>所在地：</span>
        <span class='item-content'>{{ wsData.DistrictId  }}</span><br/>
      </div>
      <div class='basicInfo-block-item item60'>
        <span class='item-label long-label'>账号状态：</span>
        <span class='item-content' id='js-status'>{{ accountStatus }}</span>
        <el-button type="text" v-show='setShowStatus' @click="editState">激活</el-button>
      </div>
      <div class='basicInfo-block-item' v-show='setShowStatus'>
        <span class='item-label'>停用时间：</span>
        <span class='item-content'>{{ wsData.StateTime }}</span>
      </div>

      <h2 class='basicInfo-block-title mt25'>修改密码</h2>
      <el-input placeholder="请输入旧密码"  v-model="wsData.Password" show-password></el-input>
      <el-input placeholder="请输入新密码" v-model="newPW" show-password></el-input>
      <el-input placeholder="确认密码" v-model="confirmPW" show-password></el-input>
      <el-button type="primary" class='btn-submit' size="small" @click='editPW'>确认修改</el-button>
      <!-- <div class='basicInfo-block-item '>
        <span class='item-label'>修改密码</span>
      </div> -->
    </div>
    <!-- <div class='basicInfo-block'> -->

    <!-- </div> -->

  </div>
</template>

<script>
import { spliceData } from '@/utils/send.js'
import { sendSock } from '@/utils/websocket.js'
import protoRoot from '@/proto/WsMsg.js'
import { regionData } from 'element-china-area-data'
export default {
  data () {
    return {
      wsData: {
        Name: '当代力天物业',
        DistrictId: '湖北省武汉市洪山区',
        Id: 18327887102,
        Password: '123456',
        State: 0,
        Type: 0,
        StateTime: '0',
      },
      showInput: false,
      showBtn: true,
      showStatus: false,
      newName: '',
      newPW: '',
      confirmPW: '',
      accountStatus: '',
      WsUpdateIn: protoRoot.lookup('WsMsg.WorkStation'),
      WsUpdateOut: protoRoot.lookup('WsMsg.WsUpdateOut'),
      WsUpdateInData: null
    }
  },
  created () {
    this.wsData.State === 0 ? this.accountStatus = '已启用' : this.accountStatus = '已停用'
  },
  mounted () {
    const DOM_STATUS = document.getElementById('js-status')
    if (DOM_STATUS.innerText === '已启用') DOM_STATUS.classList.add('inUsing')
    else DOM_STATUS.classList.add('disable')
  },
  computed: {
    setShowInput () {
      return this.showInput
    },
    setShowName () {
      return !this.showInput
    },
    setShowStatus () {
      if (this.accountStatus === '已启用') {
        return false
      } else {
        return true
      }
    }

  },
  methods: {
    editName () {
      this.wsData.Name = this.newName
      let createProto = this.WsUpdateIn.create(this.wsData)
      let encodeData = this.WsUpdateIn.encode(createProto).finish()
      let initialData = spliceData(encodeData.length, 101, 0, encodeData)
      sendSock(initialData, 101, (serverData) => {
        // const MSGDAtA = this.WsUpdateOut.decode(serverData.data)
        console.log(serverData)
        if (serverData.flag > 0) {
          this.$notify({
            title: '提示',
            message: '修改成功！',
            type: 'success',
            position: 'bottom-right'
          })
        } else {
          this.$notify.error({
            title: '提示',
            message: '服务器繁忙！ 请稍后重试',
            position: 'bottom-right'
          })
        }
      })
      this.showInput = false
    },
    editPW () {
      if (this.newPW === this.wsData.Password) {
        this.$notify.error({
          title: '提示',
          message: '不要与旧密码一致',
          position: 'bottom-right'
        })
      } else {
        this.wsData.Password = this.newPW
        let createProto = this.WsUpdateIn.create(this.wsData)
        let encodeData = this.WsUpdateIn.encode(createProto).finish()
        let initialData = spliceData(encodeData.length, 101, 0, encodeData)
        sendSock(initialData, 101, (serverData) => {
          // const MSGDAtA = this.WsUpdateOut.decode(serverData.data)
          console.log(serverData)
          if (serverData.flag > 0) {
            this.$notify({
              title: '提示',
              message: '修改成功！',
              type: 'success',
              position: 'bottom-right'
            })
          } else {
            this.$notify.error({
              title: '提示',
              message: '服务器繁忙！ 请稍后重试',
              position: 'bottom-right'
            })
          }
        })
      }
    },
    editState () {
      this.wsData.State = 0
      this.wsData.Name = this.newName
      let createProto = this.WsUpdateIn.create(this.wsData)
      let encodeData = this.WsUpdateIn.encode(createProto).finish()
      let initialData = spliceData(encodeData.length, 101, 0, encodeData)
      sendSock(initialData, 101, (serverData) => {
        // const MSGDAtA = this.WsUpdateOut.decode(serverData.data)
        console.log(serverData)
        if (serverData.flag > 0) {
          this.$notify({
            title: '提示',
            message: '激活成功',
            type: 'success',
            position: 'bottom-right'
          })
        } else {
          this.$notify.error({
            title: '提示',
            message: '服务器繁忙！ 请稍后重试',
            position: 'bottom-right'
          })
        }
      })
      this.showInput = false
    },
    showEdit () {
      this.showBtn = false
      this.showInput = true
    }
  }
}
</script>

<style lang='less' type='text/css'>
@import '../../css/basicInfo.less';
</style>
