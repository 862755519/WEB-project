<template>
  <div class="app-container">

    <!-- 查询和其他操作 -->
    <div class="filter-container">
      <el-input v-model="title" clearable class="filter-item" style="width: 200px;" placeholder="请输入姓名"/>
      <!-- <el-input v-model="listQuery.subtitle" clearable class="filter-item" style="width: 200px;" placeholder="请选择状态"/> -->
     
      <el-select class="filter-item"  v-model="value" placeholder="请选择状态">
        <el-option label="全部"  value="-1"/>
        <el-option label="未审核" value="0"/>
        <el-option label="审核过" value="1"/>
        <el-option label="未通过" value="2"/>
        <el-option label="已打款" value="3"/>
      </el-select>
     
      <el-button v-permission="['POST /cast/list']" class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">查找</el-button>
    </div>

    <!-- 查询结果 -->
    <el-table v-loading="listLoading" :data="list" element-loading-text="正在查询中。。。" border fit highlight-current-row>
      <el-table-column align="center" label="收款人姓名" prop="username"/>
      <el-table-column align="center" label="汇款人姓名" prop="sysUsername"/>
      <el-table-column align="center" label="收款人电话" prop="mobile"/>
      <el-table-column align="center" label="开户行" prop="cardName"/>
      <el-table-column align="center" label="收款人账号" prop="bcdNum"/>
      <el-table-column align="center" label="提现方式" >
        <template slot-scope="scope">
            <el-tag v-if="scope.row.type === 1">银行卡</el-tag>
               <el-tag v-else>未知</el-tag>
        </template>
      </el-table-column>
      <el-table-column align="center" label="金额" prop="caMoney"/>
      <el-table-column align="center" label="扣除" prop="caActual"/>

      <el-table-column align="center" label="汇款时间" prop="updateTime"/>
      <el-table-column align="center" label="提现时间" prop="addTime"/>
      <el-table-column align="center" label="未通过原因" prop="caReason"/>
      <el-table-column align="center" label="状态" >
        <template slot-scope="scope">
            <el-tag v-if="scope.row.caState === -1">全部数据</el-tag>
            <el-tag v-else-if="scope.row.caState === 0">未审核 </el-tag>
            <el-tag v-else-if="scope.row.caState === 1">审核通过</el-tag>
            <el-tag v-else-if="scope.row.caState === 2">未通过审核</el-tag>
            <el-tag v-else>打款</el-tag>
        </template>
      </el-table-column>
      <el-table-column v-show="show" align="center" label="操作" min-width="100" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button  v-if="scope.row.caState === 0" v-permission="['POST /cast/update']" type="primary" size="mini" @click="handleUpdate(scope.row,1)">审核</el-button>
          <el-button  v-if="scope.row.caState === 1" v-permission="['POST /cast/update']" type="primary" size="mini" @click="Remittance(scope.row,3)">汇款</el-button>
          <!-- <el-button v-permission="['POST /litemallcard/delete']" type="danger" size="mini" @click="handleDelete(scope.row)">删除</el-button> -->
        </template>
      </el-table-column>
    </el-table>

    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />

    <el-tooltip placement="top" content="返回顶部">
      <back-to-top :visibility-height="100" />
    </el-tooltip>

    <!-- 遮道层 -->
    <el-dialog title="审核未通过原因" :visible.sync="dialogFormVisible">
      <el-form :model="form">
          <el-form-item  align="center">
          <!-- :label-width="formLabelWidth" <el-input v-model="form.name" autocomplete="off"></el-input> -->
              <el-input 
              type="textarea"
              :rows="10"
              placeholder="请输入内容"
              v-model="textarea">
              </el-input>
          </el-form-item>
          
      </el-form>
      <div slot="footer" class="dialog-footer">
          <!-- <el-button @click="dialogFormVisible = false">取 消</el-button> -->
          <el-button type="primary" @click="Submission">提 交</el-button>
      </div>
    </el-dialog>

   


  </div>
</template>

<style>
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
import { moneyList, moneyUpdate,text } from '@/api/money'
import BackToTop from '@/components/BackToTop'
import Pagination from '@/components/Pagination'


export default {
  components: { BackToTop, Pagination },
  name: 'Topic',
  data() {
    return {
      list: [],
      value: '',
      title:'',
      total: 0,
      listLoading: true,
      listQuery: {
        page: 1,
        username: '',
        limit: 10,
        caReason:'',
        caState: '',
        id:undefined
      },
      contentDetail: '',
      contentDialogVisible: false,
      downloadLoading: false,

    //操作显示隐藏
      show: true,

    // 遮挡层参数
       dialogFormVisible: false,
        form: {
          name: '',
          region: '',
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '',
          desc: ''
        },
        formLabelWidth: '80px',

        textarea:'这是文本内容',
        shId:undefined
    }
  },
  created() {
    const name = this.title
    
    this.getList();
  },
  methods: {
    getList(){
      this.listLoading = true
      this.listQuery.username = this.title
      this.listQuery.caState = this.value
      moneyList(this.listQuery).then(response => {
          this.list = response.data.data.list
          this.total = response.data.data.total
          this.limit = response.data.data.limit
          this.page = response.data.data.page
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
    cancel(row){
        this.dialogFormVisible = true
        this.id = row.id;
    },
    // 审核按钮 汇款事件
    Remittance(row,stateId){
        this.listQuery.id = row.id;
        this.$confirm('是否确定汇款', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          center: true
        }).then(() => {
          
          this.listQuery.caState = stateId;
        //   console.log(this.listQuery);
          moneyUpdate(this.listQuery).then(response =>{
            if( response.data.errno === 0){
                this.$message({
                    type: 'success',
                    message: '汇款成功!'
                });         
            }
            this.getList();
         
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '汇款失败'
          });
        });
    },
    // 审核按钮 审核事件
    handleUpdate(row,stateId) {
        this.listQuery.id = row.id;
        this.$confirm('是否审核通过', '状态审核', {
          confirmButtonText: '通过',
          cancelButtonText: '未通过',
          type: 'warning'
        }).then(() => {
          this.listQuery.caState = stateId;
        
          moneyUpdate(this.listQuery).then(response =>{
            this.$message({
                type: 'success',
                message: '审核通过!'
            });
            this.getList();
          })
        }).catch(() => {
         this.cancel(row);
         this.shId  = row.id;
        });
    },
    // 未审核通过 提交事件
    Submission(){
        this.dialogFormVisible = false;
        this.listQuery.caReason = this.textarea;
        this.listQuery.caState = '2';
        this.listQuery.id = this.shId;
        moneyUpdate(this.listQuery).then(response =>{
              this.getList();
        }).catch(() => {
              this.getList();
        });
    },

  }
}
</script>
