<template>
  <div class="app-container">
    <el-form ref="dataForm" :model="dataForm" status-icon label-width="300px">
      <el-form-item label="基础费率金额（RMB）" prop="litemall_rate_price">
        <el-input-number v-model="dataForm.litemall_rate_price"/>
      </el-form-item>
      <el-form-item label="最低提现金额（RMB）" prop="litemall_rate_small">
        <el-input-number  v-model="dataForm.litemall_rate_small"/>
      </el-form-item>
      <el-form-item label="最高提现金额（RMB）"  prop="litemall_rate_max">
        <el-input-number    v-model="dataForm.litemall_rate_max"/>
      </el-form-item>
      <el-form-item label="100整数倍" prop="litemall_rate_num">
         <el-checkbox v-model="dataForm.litemall_rate_num" :checked="dataForm.litemall_rate_num=='1'?true:false" label="是" true-label="1" false-label="0"></el-checkbox>
      </el-form-item>
      <el-form-item>
        <el-button @click="cancel">取消</el-button>
        <el-button type="primary" @click="update">确定</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { listRate, updateRate } from '@/api/config'
import { isNull, isNumber } from 'util';

export default {
  name: 'ConfigMail',
  data() {
    return {
      dataForm: {
      }
    }
  },
  created() {
    this.init()
  },
  methods: {
    init: function() {
      listRate().then(response => {
        this.dataForm = response.data.data
      })
    },
    cancel() {
      this.init()
    },
    update() {
      updateRate(this.dataForm)
        .then(response => {
          this.$notify.success({
            title: '成功',
            message: '商场配置成功'
          })
        })
        .catch(response => {
          this.$notify.error({
            title: '失败',
            message: response.data.errmsg
          })
        })
    }
  }
}
</script>
