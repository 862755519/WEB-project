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

      <el-table-column align="center" label="抵扣券名称" prop="couName"/>

      <el-table-column align="center" label="购买价格" prop="couPrice">
        <template slot-scope="scope">{{ scope.row.couPrice }}元</template>
      </el-table-column>


      <el-table-column align="center" label="发行数量" prop="couNum"/>

      <el-table-column align="center" label="剩余数量" prop="couSurplusNum"/>

      <el-table-column align="center" label="是否默认发放" prop="couDefault">
        <template slot-scope="scope">
            <el-tag v-show="scope.row.couDefault == 0">否 </el-tag>
            <el-tag v-show="scope.row.couDefault == 1">是 </el-tag>
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
      <el-form ref="dataForm" :rules="rules" :model="dataForm" status-icon label-position="left" label-width="100px" style="width: 800px; margin-left:50px;">
        <el-form-item label="抵扣券名称" prop="couName">
          <el-input v-model="dataForm.couName"/>
        </el-form-item>
        <el-form-item v-show="dialogStatus=='create'" label="发行数量" prop="couNum">
          <el-input v-model="dataForm.couNum">
            <template slot="append">张</template>
          </el-input>
        </el-form-item>
        <el-form-item v-show="dialogStatus=='update'" label="剩余数量" prop="couSurplusNum">
          <el-input v-model="dataForm.couSurplusNum">
            <template slot="append">张</template>
          </el-input>
        </el-form-item>

        <el-form-item label="购买价格" prop="couPrice">
          <el-input v-model="dataForm.couPrice">
            <template slot="append">元</template>
          </el-input>
        </el-form-item>
        <el-form-item label="可兑换商品" prop="min">
              <el-checkbox-group v-model="checkList">
                <el-row>
                  <el-col  v-for="itme in listGoods" :key="itme" :span="8"><div class="grid-content bg-purple">
                    <el-checkbox :label="itme.id+''" class="over_hid">{{itme.name}}</el-checkbox>
                    </div></el-col>
                </el-row>
              </el-checkbox-group>
        </el-form-item>
        <el-form-item label="默认发放" prop="couDefault">
          <el-radio v-model="radio" label="0">否</el-radio>
          <el-radio v-model="radio" label="1">是</el-radio>
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
import {listGoods,listCoupon,insertOrUpdate,deletCoupon } from '@/api/deduction'
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
      },
      dialogFormVisible: false,
      dialogStatus: '',
      textMap: {
        update: '编辑',
        create: '创建'
      },
      rules: {
        couName: [
          { required: true, message: '抵扣券标题不能为空', trigger: 'blur' }
        ],
        couNum: [
          { required: true, message: '发行数量不能为空', trigger: 'blur' }
        ],
        couSurplusNum: [
          { required: true, message: '剩余数量不能为空', trigger: 'blur' }
        ],
        couPrice: [
          { required: true, message: '购买价格不能为空', trigger: 'blur' }
        ],
      },
      downloadLoading: false,

      // 单选按钮
      radio: '0',
      couSurplusNum:0
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      this.listLoading = true
      listCoupon(this.listQuery)
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
      this.dataForm = {}
    },
    listGoodsAction(){
            listGoods()
              .then(response => {
                this.listGoods = response.data.data
              })
              .catch(() => {
            
      })

    },
    handleCreate() {
      this.resetForm()
      this.listGoodsAction();
      this.dialogStatus = 'create'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    createData() {
      this.dataForm.proIds = '';
      var atr = this.checkList;
      var len = atr.length;
      if(len<=0){
          this.$notify.error({
                title: '失败',
                message: '最少选择一样商品'
          })
          return;
      }
      if(this.dialogStatus=='update'){
         if(this.couSurplusNum > this.dataForm.couSurplusNum){
            this.$notify.error({
                            title: '失败',
                            message: '不能低于剩余数量'
                      })
                return;
         }
      }
      for(var i = 0 ;i<len ;i++){
          if(i==len-1&&len!=0){
              this.dataForm.proIds += atr[i];
          }else{
              this.dataForm.proIds += atr[i]+',';
          }
      }
      
      this.dataForm.couDefault = this.radio;
      this.$refs['dataForm'].validate(valid => {
        if (valid) {
          insertOrUpdate(this.dataForm)
            .then(response => {
              this.getList();
              this.dialogFormVisible = false
              this.$notify.success({
                title: '成功',
                message: '创建抵扣券券成功'
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
      this.couSurplusNum = this.dataForm.couSurplusNum;
      this.listGoodsAction();
      this.checkList = this.dataForm.proIds.split(",");
      this.radio = this.dataForm.couDefault+"";
      this.dialogStatus = 'update'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        if (this.dataForm.days === 0) {
          this.dataForm.daysType = 1
        } else {
          this.dataForm.daysType = 0
        }
        this.$refs['dataForm'].clearValidate()
      })
    },
    handleDelete(row) {
      deletCoupon(row)
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
    },
    handleDetail(row) {
      this.$router.push({ path: '/promotion/couponDetail', query: { id: row.id }})
    }
  }
}
</script>
