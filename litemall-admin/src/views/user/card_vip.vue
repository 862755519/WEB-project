<template>
  <div class="app-container">

    <!-- 查询和其他操作 -->
    <div class="filter-container">
      <el-input v-model="listQuery.couName" clearable class="filter-item" style="width: 200px;" placeholder="请输入抵扣券名称"/>
      <el-button v-permission="['GET /admin/coupon/list']" class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">查找</el-button>
      <el-button v-permission="['POST /admin/coupon/create']" class="filter-item" type="primary" icon="el-icon-edit" @click="handleCreate">添加</el-button>
    </div>

    <!-- 查询结果 -->
    <el-table v-loading="listLoading" :data="list" element-loading-text="正在查询中。。。" border fit highlight-current-row>

      <el-table-column align="center" label="名称" prop="bcvName"/>

      <el-table-column align="center" label="价格" prop="bcvPrice">
        <template slot-scope="scope">{{ scope.row.bcvPrice }}元</template>
      </el-table-column>


      <el-table-column align="center" label="有效天数" prop="bcvDay"/>

      <el-table-column align="center" label="是否限购一次" prop="bcvOnce">
        <template slot-scope="scope">
            <el-tag v-show="scope.row.bcvOnce == 0">否 </el-tag>
            <el-tag v-show="scope.row.bcvOnce == 1">是 </el-tag>
        </template>
      </el-table-column>

      <el-table-column align="center" label="是否超值" prop="bcvSuperValue">
        <template slot-scope="scope">
            <el-tag v-show="scope.row.bcvSuperValue == 0">否 </el-tag>
            <el-tag v-show="scope.row.bcvSuperValue == 1">是 </el-tag>
        </template>
      </el-table-column>

      <el-table-column align="center" label="操作" width="300" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button v-permission="['POST /admin/coupon/update']" type="primary" size="mini" @click="handleUpdate(scope.row)">编辑</el-button>
          <el-button v-permission="['POST /admin/coupon/delete']" type="danger" size="mini" @click="handleDelete(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />

    <!-- 添加或修改对话框 -->
    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
      <el-form ref="dataForm" :rules="rules" :model="dataForm" status-icon label-position="left" label-width="100px" style="width: 400px; margin-left:50px;">
        <el-form-item label="名称" prop="bcvName">
          <el-input v-model="dataForm.bcvName"/>
        </el-form-item>
        <el-form-item label="有效天数" prop="bcvDay">
          <el-input v-model="dataForm.bcvDay">
            <template slot="append">天</template>
          </el-input>
        </el-form-item>
        <el-form-item label="价格" prop="bcvPrice">
          <el-input v-model="dataForm.bcvPrice">
            <template slot="append">元</template>
          </el-input>
        </el-form-item>
        <el-form-item label="是否限购一次" prop="bcvOnce">
          <el-radio v-model="dataForm.bcvOnce" label="0">否</el-radio>
          <el-radio v-model="dataForm.bcvOnce" label="1">是</el-radio>
        </el-form-item>
        <el-form-item label="是否超值" prop="bcvSuperValue">
          <el-radio v-model="dataForm.bcvSuperValue" label="0">否</el-radio>
          <el-radio v-model="dataForm.bcvSuperValue" label="1">是</el-radio>
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
.over_hid{
  width: 95%;
  /* border:1px solid #ccc; */
  overflow: hidden;
  text-overflow:ellipsis;
  white-space: nowrap;
}
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
import {listCardVip,insertOrUpdate,deteleCardVip } from '@/api/card_vip'
import Pagination from '@/components/Pagination' // Secondary package based on el-pagination

export default {
  name: 'Coupon',
  components: { Pagination },
  data() {
    return {
      checkList: [],
      list: [],
      listGoods: [],
      total: 0,
      listLoading: true,
      listQuery: {
        page: 1,
        limit: 20,
        couName: undefined,
        sort: 'add_time',
        order: 'desc'
      },
      dataForm: {
          bcvOnce:'0',
          bcvSuperValue:'0',
      },
      dialogFormVisible: false,
      dialogStatus: '',
      textMap: {
        update: '编辑',
        create: '创建'
      },
      rules: {
        bcvName: [
          { required: true, message: '名称不能为空', trigger: 'blur' }
        ],
        bcvDay: [
          { required: true, message: '天数不能为空', trigger: 'blur' }
        ],
        bcvPrice: [
          { required: true, message: '价格不能为空', trigger: 'blur' }
        ],
      },
      downloadLoading: false,
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      this.listLoading = true
      listCardVip(this.listQuery)
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
    handleFilter() {
      this.listQuery.page = 1
      this.getList()
    },
    resetForm() {
      this.dataForm = {
         bcvOnce:'0',
          bcvSuperValue:'0',
      }
    },
    handleCreate() {
      this.resetForm()
      this.dialogStatus = 'create'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    createData() {
      this.$refs['dataForm'].validate(valid => {
        if (valid) {
          insertOrUpdate(this.dataForm)
            .then(response => {
              this.getList();
              this.dialogFormVisible = false
              this.$notify.success({
                title: '成功',
                message: '创建成功'
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
    handleUpdate(row) {
      this.dataForm = Object.assign({}, row)
      this.dataForm.bcvOnce = this.dataForm.bcvOnce+'';
      this.dataForm.bcvSuperValue = this.dataForm.bcvSuperValue+'';
      this.dialogStatus = 'update'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    handleDelete(row) {
      deteleCardVip({id:row.id})
        .then(response => {
          this.$notify.success({
            title: '成功',
            message: '删除成功'
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
