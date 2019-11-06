<template>
  <div class="app-container">

    <!-- 查询和其他操作 -->
    <div class="filter-container">
      <el-input v-model="listQuery.usName" clearable class="filter-item" style="width: 200px;" placeholder="请输入会员名称或电话"/>
      <el-button v-permission="['GET /admin/ad/list']" class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">查找</el-button>
    </div>

    <!-- 查询结果 -->
    <el-table v-loading="listLoading" :data="list" element-loading-text="正在查询中。。。" border fit highlight-current-row>
      <el-table-column align="center" label="会员名称" prop="usName"/>

      <el-table-column align="center" label="会员电话" prop="mobile"/>

      <el-table-column align="center" label="抵扣券名称" prop="couName"/>

      <el-table-column align="center" label="抵扣码" prop="cdCode"/>

      <el-table-column align="center" label="领取时间" prop="addTime"/>

      <el-table-column align="center" label="数量" prop="id">
        <template slot-scope="scope">
            <p v-if="scope.row.id"> 1</p>
        </template>
      </el-table-column>

      <el-table-column align="center" label="领取方式" prop="cdWay">
        <template slot-scope="scope">
            <el-tag type ="success" v-if="scope.row.cdWay==1">商城购买</el-tag>
            <el-tag type="success" v-if="scope.row.cdWay==0">自动发放</el-tag>
        </template>
      </el-table-column>
      <el-table-column align="center" label="状体" prop="cdState">
        <template slot-scope="scope">
            <el-tag v-if="scope.row.cdState==1">使用</el-tag>
            <el-tag v-if="scope.row.cdState==0">未使用</el-tag>
        </template>
      </el-table-column>

      <!-- <el-table-column align="center" label="操作" width="200" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button v-permission="['POST /admin/ad/update']" type="primary" size="mini" @click="handleUpdate(scope.row)">编辑</el-button>
          <el-button v-permission="['POST /admin/ad/delete']" type="danger" size="mini" @click="handleDelete(scope.row)">删除</el-button>
        </template>
      </el-table-column> -->
    </el-table>

    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />

  </div>
</template>

<style>
.form{
  border: 1px solid gold;
  width: 888px;
}
.dia{
  /* border: 1px solid red; */
  width: 100%;
}
.avatar-uploader .el-upload {
  /* border: 1px dashed #d9d9d9; */
  /* border: 1px solid red; */
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
  width: 145px;
  height: 145px;
  display: block;
}
</style>

<script>
import { listCouponDetails } from '@/api/receive_mem'
import { createStorage,uploadPath } from '@/api/storage'
import { getToken } from '@/utils/auth'
import Editor from '@tinymce/tinymce-vue'
import Pagination from '@/components/Pagination' // Secondary package based on el-pagination

export default {
  name: 'Ad',
  components: { Pagination,Editor},
  data() {
    return {
      uploadPath,
      list: [],
      total: 0,
      listLoading: true,
      listQuery: {
        page: 1,
        limit: 20,
        name: undefined,
        content: undefined,
        sort: 'add_time',
        order: 'desc'
      },
    }
  },
  computed: {
    headers() {
      return {
        'X-Litemall-Admin-Token': getToken()
      }
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      this.listLoading = true
      listCouponDetails(this.listQuery)
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
  }
}
</script>
