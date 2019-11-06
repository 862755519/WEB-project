<template>
  <div class="app-container">

    <!-- 查询和其他操作 -->
    <div class="filter-container">
      <!-- <el-input v-model="listQuery.title" clearable class="filter-item" style="width: 200px;" placeholder="请输入专题标题"/> -->
      <!-- <el-input v-model="listQuery.subtitle" clearable class="filter-item" style="width: 200px;" placeholder="请输入专题子标题"/> -->
      <!-- <el-button v-permission="['GET /litemallcard/list']" class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">查找</el-button> -->
     <!--  <el-button v-permission="['POST /admin/upgrade/create']" class="filter-item" type="primary" icon="el-icon-edit" @click="handleCreate">添加</el-button> -->
      <!-- <el-button :loading="downloadLoading" class="filter-item" type="primary" icon="el-icon-download" @click="handleDownload">导出</el-button> -->
    </div>

    <!-- 查询结果 -->
    <el-table v-loading="listLoading" :data="list" element-loading-text="正在查询中。。。" border fit highlight-current-row>
     
      <el-table-column align="center" label="等级" prop="level">
        <template slot-scope="scope">
          <label width="80" v-if="scope.row.level==0">{{'普通用户'}}</label>
          <label width="80" v-if="scope.row.level==1">{{'掌柜'}}</label>
          <label width="80" v-if="scope.row.level==2">{{'经理'}}</label>
        </template>
      </el-table-column>

      <el-table-column align="center" label="升级后等级" prop="level">
        <template slot-scope="scope">
          <label width="80" v-if="scope.row.level==0">{{'掌柜'}}</label>
          <label width="80" v-if="scope.row.level==1">{{'经理'}}</label>
          <label width="80" v-if="scope.row.level==2">{{'总监'}}</label>
        </template>
      </el-table-column>
      <el-table-column align="center" label="团队奖励百分比" prop="team"/>
      <el-table-column align="center" label="升级条件" prop="num">
          <template slot-scope="scope">
          <label width="80" v-if="scope.row.level==0">{{scope.row.num}}元</label>
          <label width="80" v-else>{{scope.row.num}}人</label>
        </template>
      </el-table-column>
      
       <el-table-column align="center" label="经理升级下级掌柜数" prop="level">
        <template slot-scope="scope">
          <label width="80">{{scope.row.under}}</label>
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作" min-width="100" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button v-permission="['POST /admin/promoteRebate/update']" type="primary" size="mini" @click="handleUpdate(scope.row)">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />

    <el-tooltip placement="top" content="返回顶部">
      <back-to-top :visibility-height="100" />
    </el-tooltip>

  </div>
</template>

<style>
*{
　touch-action: pan-y;
}
.el-dialog {
  width: 800px;
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
  width: 145px;
  height: 145px;
  display: block;
}
</style>

<script>
/* eslint-disable */
// document.write(document.compatMode == "CSS1Compat" ? "当前处于标准模式" : "当前处于混杂模式");

import { upgradeList } from '@/api/upgrade'
// import { listTopic, deleteTopic } from '@/api/card'


import BackToTop from '@/components/BackToTop'
import Pagination from '@/components/Pagination' // Secondary package based on el-pagination

export default {
  name: 'Topic',
  components: { BackToTop, Pagination },
  data() {
    return {

      list: [],
      total: 0,
      upTerm:'',
      upGrade:'',
      level:'',
      listLoading: true,
      listQuery: {
        page: 1,
        limit: 20,
        title: undefined,
        subtitle: undefined,
        sort: 'add_time',
        order: 'desc'
      },
      contentDetail: '',
      contentDialogVisible: false,
      downloadLoading: false
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      this.listLoading = true
      upgradeList(this.listQuery)
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
    // handleCreate() {
    //   this.$router.push({ path: '/user/upgrade-create' })
    // },
    handleUpdate(row) {
      this.$router.push({ path: '/user/upgrade-edit', query: { id: row.id }})
    },
    handleDelete(row) {
      deleteTopic(row)
        .then(response => {
          this.$notify.success({
            title: '成功',
            message: '删除银行卡成功'
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
    showContent(content) {
      this.contentDetail = content
      this.contentDialogVisible = true
    },
    handleDownload() {
      this.downloadLoading = true
      import('@/vendor/Export2Excel').then(excel => {
        const tHeader = [
          'ID',
          '银行名称',
          '银行卡logo'
        ]
        const filterVal = [
          'id',
          'cardName',
          'cardIcon'
        ]
        excel.export_json_to_excel2(tHeader, this.list, filterVal, '专题信息')
        this.downloadLoading = false
      })
    }
  }
}
</script>
