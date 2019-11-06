<template>
  <div class="app-container">

    <!-- 查询和其他操作 -->
    <div class="filter-container">
      <!-- <el-input v-model="listQuery.goodsId" clearable class="filter-item" style="width: 200px;" placeholder="请输入商品编号"/>
      <el-button v-permission="['GET /admin/groupon/listRecord']" class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">查找</el-button> -->
      <el-button v-permission="['GET /admin/groupon/createGroupon']" class="filter-item" type="primary" @click="addTuan" icon="el-icon-edit">开团</el-button>
      <el-button
        :loading="downloadLoading"
        class="filter-item"
        type="primary"
        icon="el-icon-download"
        @click="handleDownload">导出
      </el-button>
    </div>

    <!-- 查询结果 -->
    <el-table v-loading="listLoading" :data="list" element-loading-text="正在查询中。。。" border fit highlight-current-row>

      <el-table-column type="expand">
        <template slot-scope="scope">
          <el-table :data="scope.row.subGroupons" border style="width: 100%">
            <el-table-column align="center" label="订单ID" prop="orderId"/>
            <el-table-column align="center" label="用户ID" prop="userId"/>
          </el-table>
        </template>
      </el-table-column>

      <el-table-column align="center" label="订单ID" prop="groupon.orderId"/>

      <el-table-column align="center" label="用户ID" prop="groupon.userId"/>

      <el-table-column align="center" label="参与人数" prop="subGroupons.length"/>

      <el-table-column align="center" label="团购折扣" prop="rules.discount"/>

      <el-table-column align="center" label="团购要求" prop="rules.discountMember"/>

      <el-table-column align="center" property="iconUrl" label="分享图片">
        <template slot-scope="scope">
          <img :src="scope.row.groupon.shareUrl" width="40">
        </template>
      </el-table-column>

      <el-table-column align="center" label="开始时间" prop="rules.addTime"/>

      <el-table-column align="center" label="结束时间" prop="rules.expireTime"/>
    </el-table>

    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />

    <el-tooltip placement="top" content="返回顶部">
      <back-to-top :visibility-height="100"/>
    </el-tooltip>
    <!-- 遮挡层 编辑 -->
    <el-dialog title="开团" :visible.sync="editeShow" width="500px">
        <el-form ref="goodsNum" :model="updataList">
        <el-form-item label="团购规则">
         <template>
            <el-select v-model="value" placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.goodsName"
                :value="item.id">
              </el-option>
            </el-select>
          </template>
        </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="remove">取 消</el-button>
            <el-button type="primary" @click="edite">确 定</el-button>
        </div>
      
    </el-dialog>
  </div>
</template>

<style>
  .table-expand {
    font-size: 0;
  }

  .table-expand label {
    width: 100px;
    color: #99a9bf;
  }

  .table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
  }

  .gallery {
    width: 80px;
    margin-right: 10px;
  }
</style>

<script>
import { listRecord,rulesList,createGroupon } from '@/api/groupon'
import BackToTop from '@/components/BackToTop'
import Pagination from '@/components/Pagination' // Secondary package based on el-pagination

export default {
  name: 'GrouponActivity',
  components: { BackToTop, Pagination },
  data() {
    return {
      list: [],
      total: 0,
      listLoading: true,
      listQuery: {
        page: 1,
        limit: 20,
        goodsId: undefined,
        sort: 'add_time',
        order: 'desc'
      },
      goodsDetail: '',
      downloadLoading: false,
      editeShow:false,
      options: [],
      value: '',
      updataList:{}
    }
  },
  created() {
    this.getList()
  },

  methods: {
    addTuan(){
      this.updataList={};
     rulesList().then(response => {
        this.options = response.data.data;
        this.editeShow =true;
      }).catch((ref) => {
        this.$message.error(ref.data.errmsg);
      })
        
    },
    remove(){
      this.editeShow =false;
     },
     edite(){
      var adminId = window.localStorage.getItem("adminId");
      console.log(this.value);
      if(this.value==null||this.value==''||this.value==undefined){
        this.$message.error('请选择开团规则~');
        return;
      }
      this.updataList = {rulesId:this.value,creatorUserId:adminId};
      createGroupon(this.updataList).then(response => {
       this.$message({
              message: response.data.errmsg,
              type: 'success'
            });
            this.editeShow =false;
            this.getList();
      }).catch((ref) => {
        this.$message.error(ref.data.errmsg);
      })
        
     },
    getList() {
      this.listLoading = true
      listRecord(this.listQuery).then(response => {
        this.list = response.data.data.list
        this.total = response.data.data.total
        this.listLoading = false
      }).catch(() => {
        this.list = []
        this.total = 0
        this.listLoading = false
      })
    },
    handleFilter() {
      this.listQuery.page = 1
      this.getList()
    },
    handleDownload() {
      this.downloadLoading = true
        import('@/vendor/Export2Excel').then(excel => {
          const tHeader = ['商品ID', '名称', '首页主图', '折扣', '人数要求', '活动开始时间', '活动结束时间']
          const filterVal = ['id', 'name', 'pic_url', 'discount', 'discountMember', 'addTime', 'expireTime']
          excel.export_json_to_excel2(tHeader, this.list, filterVal, '商品信息')
          this.downloadLoading = false
        })
    }
  }
}
</script>
