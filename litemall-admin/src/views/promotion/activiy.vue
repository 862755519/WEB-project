<template>
  <div class="app-container">

    <!-- 查询和其他操作 -->
    <div class="filter-container">
      <el-button v-permission="['POST /admin/coupon/create']" class="filter-item" type="primary" icon="el-icon-edit" @click="handleCreate">添加</el-button>
    </div>

    <!-- 查询结果 -->
    <el-table v-loading="listLoading" :data="list" element-loading-text="正在查询中。。。" border fit highlight-current-row>

      <el-table-column align="center" label="规则ID" prop="id" sortable/>

      <el-table-column align="center" label="名称" prop="siaName"/>

      <el-table-column align="center" label="描述" prop="siaDetail"/>

      <el-table-column align="center" label="规则方案" prop="siName"/>

      <el-table-column align="center" label="开始时间" prop="addTime"/>

      <el-table-column align="center" label="结束时间" prop="endTime"/>

      <!-- <el-table-column align="center" label="操作" width="300" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button  type="info" size="mini" @click="handleUpdate(scope.row)">编辑</el-button>
          <el-button  type="danger" size="mini" @click="handleDelete(scope.row)">删除</el-button>
        </template>
      </el-table-column> -->
    </el-table>

    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />

    <!-- 添加或修改对话框 -->
    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
      <el-form ref="dataForm" :rules="rules" :model="dataForm" status-icon label-position="left" label-width="100px" style="width: 400px; margin-left:50px;">
        <el-form-item label="名称" prop="siaName">
          <el-input v-model="dataForm.siaName">
          </el-input>
        </el-form-item>
        <el-form-item label="描述" prop="siaDetail">
          <el-input
           type="textarea"
            :rows="3"
           v-model="dataForm.siaDetail">
          </el-input>
        </el-form-item>
        
        <el-form-item label="签到规则" prop="siId">
          <el-select v-model="dataForm.siId">
            <el-option
              v-for="type in listSignIn"
              :key="type.id"
              :label="type.siDay"
              :value="type.id"/>
              <template slot="append">天</template>
          </el-select>

        </el-form-item>
         <el-form-item label="选择时间" prop="dataVlues">
        <div class="block">
            <span class="demonstration">默认</span>
                <el-date-picker
                  v-model="dataVlues"
                  type="datetimerange"
                  range-separator="至"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期">
                </el-date-picker>
          </div>
     </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取消</el-button>
        <el-button v-if="dialogStatus=='create'" type="primary" @click="createData">确定</el-button>
        <el-button v-else type="primary" @click="createData">确定</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<style>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #20a0ff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 120px;
  height: 120px;
  line-height: 120px;
  text-align: center;
}
.avatar {
  width: 120px;
  height: 120px;
  display: block;
}
</style>

<script>
import { listActivity, insertOrUpdate, deteleActivity,listSignIn } from '@/api/activiy'
import Pagination from '@/components/Pagination' // Secondary package based on el-pagination

export default {
  name: 'Coupon',
  components: { Pagination },

  data() {
    return {
      dataVlues:'',//时间类型
      listSignIn:[],//可选择活动方案
      list: [],
      total: 0,
      listLoading: true,
      listQuery: {
        page: 1,
        limit: 20,
        sort: 'add_time',
        order: 'desc'
      },
      dataForm: {
        id: undefined,
        siId: null,
      },
      dialogFormVisible: false,
      dialogStatus: '',
      textMap: {
        update: '编辑',
        create: '创建'
      },
      rules: {
        siaName: [
          { required: true, message: '名称不能为空', trigger: 'blur' }
        ],
        siaDetail: [
          { required: true, message: '描述不能为空', trigger: 'blur' }
        ],
      },
      downloadLoading: false
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      this.listLoading = true
      listActivity(this.listQuery)
        .then(response => {
          this.list = response.data.data.list
          this.total = response.data.data.total
          this.listLoading = false
        })
        .catch(() => {
          this.list = []
          this.total = 0
          this.listLoading = false
        })
    },
    getListCoupon() {
      listSignIn()
        .then(response => {
          this.listSignIn = response.data.data
        })
        .catch(() => {
          this.listSignIn = []
        })
    },
    handleFilter() {
      this.listQuery.page = 1
      this.getList()
    },
    resetForm() {
      this.dataForm = {
        id: undefined,
        siId: null,
      }
    },
    handleCreate() {
      this.getListCoupon();
      this.resetForm()
      this.dialogStatus = 'create'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    createData() {
      var valueLen = this.dataVlues.length;
      if(this.valueLen>1){
        this.$notify.error({
                title: '失败',
                message: '请选择时间'
              })
          return;
      }
      if(this.dataForm.siId == null){
        this.$notify.error({
                title: '失败',
                message: '请选择规则'
              })
          return;
      }
     var mydate = this.dataVlues[0];
     var endDate = this.dataVlues[1];
 
    //  alert(mydate.getFullYear());
    //  alert(mydate.getMonth());
    //  alert(mydate.getDay());
    //  alert(mydate.getHours());
    //  alert(mydate.getMinutes());
    this.dataForm.addTime  = mydate.getFullYear()+"-"+this.pasreStr((mydate.getMonth()+1))+"-"+this.pasreStr(mydate.getDate())+" "+this.pasreStr(mydate.getHours())+":"+this.pasreStr(mydate.getMinutes())+":"+this.pasreStr(mydate.getSeconds());
    this.dataForm.endTime = endDate.getFullYear()+"-"+this.pasreStr((endDate.getMonth()+1))+"-"+this.pasreStr(endDate.getDate())+" "+this.pasreStr(endDate.getHours())+":"+this.pasreStr(endDate.getMinutes())+":"+this.pasreStr(endDate.getSeconds());

      this.$refs['dataForm'].validate(valid => {
        if (valid) {
          insertOrUpdate(this.dataForm)
            .then(response => {
              this.getList();
              this.dialogFormVisible = false
              this.$notify.success({
                title: '成功',
                message: '创建优惠券成功'
              })
            })
            .catch(response => {
              this.$notify.error({
                title: '失败',
                message: response.data.errmsg
              })
            })
        }
      })
    },
    pasreStr(str){
      if(str<10){
          str = "0"+str;
      }
      return str;
    },
    handleUpdate(row) {
      this.getListCoupon();
      this.dataForm = Object.assign({}, row)
      this.dialogStatus = 'update'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },

    updateData() {
      this.$refs['dataForm'].validate(valid => {
        if (valid) {
          updateCoupon(this.dataForm)
            .then(() => {
              for (const v of this.list) {
                if (v.id === this.dataForm.id) {
                  const index = this.list.indexOf(v)
                  this.list.splice(index, 1, this.dataForm)
                  break
                }
              }
              this.dialogFormVisible = false
              this.$notify.success({
                title: '成功',
                message: '更新优惠券成功'
              })
            })
            .catch(response => {
              this.$notify.error({
                title: '失败',
                message: response.data.errmsg
              })
            })
        }
      })
    },
    handleDelete(row) {
      deteleSignIn({id:row.id})
        .then(response => {
          this.$notify.success({
            title: '成功',
            message: '删除优惠券成功'
          })
          const index = this.list.indexOf(row)
          this.list.splice(index, 1)
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
