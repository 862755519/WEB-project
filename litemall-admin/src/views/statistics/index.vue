<template>
  <div class="app-container">

    <!-- 查询和其他操作 -->
    <!-- <div class="filter-container">
      <el-input></el-input>
      <el-input></el-input>
      <el-select v-model="listQuery.type" clearable style="width: 200px" class="filter-item" placeholder="请选择返利方式">
        <el-option v-for="type in rebateOptions" :key="type.value" :label="type.label" :value="type.value"/>
      </el-select> 
       <el-button v-permission="['GET /admin/rebateSet/list']" class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">查询</el-button>
      <el-button v-permission="['POST /admin/rebateSet/create']" class="filter-item" type="primary" icon="el-icon-edit"  @click="findLevel">添加</el-button>  
    </div> -->

    <!-- 查询和其他操作 -->
    <div class="filter-container">
      <el-input v-model="listQuery.realName" clearable class="filter-item" style="width: 200px;" placeholder="请输入消费者名称"/>
      <el-input v-model="listQuery.mobile" clearable class="filter-item" style="width: 200px;" placeholder="请输入消费者联系方式"/>
          <el-select v-model="listQuery.amountType" clearable style="width: 200px" class="filter-item" placeholder="请选择消费方式">
        <el-option v-for="type in rebateOptions" :key="type.value" :label="type.label" :value="type.value"/>
      </el-select> 
      <el-button class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">查找</el-button>
    </div>

    <!-- 查询结果 -->
    <el-table v-loading="listLoading" :data="list" element-loading-text="正在查询中。。。" border fit highlight-current-row>

      <el-table-column align="center" label="消费者名称" prop="realName">
      </el-table-column>
      <el-table-column align="center" label="消费者联系方式" prop="mobile"/>
      <el-table-column align="center" label="金额" prop="amount"/>
      <el-table-column align="center" label="描述" prop="desribe"/>
      <el-table-column align="center" label="创建时间" prop="createtime"/>
     
    </el-table>

    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />
     
     
  </div>
</template>

<script>
import {listRebate} from '@/api/stinex'
import Pagination from '@/components/Pagination' // Secondary package based on el-pagination

export default {
  name: 'Feedback',
  components: { Pagination },
  data() {
   
    return {
      rebateOptions: [{label:"全部",value:-1},{label:"收入",value:1},{label:"支出",value:0}],
      list: [],
      total: 0,
      listLoading: true,
      listQuery: {
        page: 1,
        limit: 20,
        realName: null,
        mobile:null,
        amountType:-1
      },
    }
  },
  created(){
    this.getList();
  },
 
  methods: {
    getList() {
      this.listLoading = true
      listRebate(this.listQuery)
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
       this. getList();
    },
  }
}
</script>
<style scoped>
.error{
  width: 100%;
  height: 30px;
  color: red;
  padding-left: 17%;
  margin-top: -20px;
  line-height: 30px;
}
</style>
