<template>
  <div class="app-container">

    <!-- 查询和其他操作 -->
    <div class="filter-container">
      <el-input v-model="listQuery.title" clearable class="filter-item" style="width: 200px;" placeholder="请输入专题标题"/>
      <!-- <el-input v-model="listQuery.subtitle" clearable class="filter-item" style="width: 200px;" placeholder="请输入专题子标题"/> -->
      <el-button v-permission="['GET /admin/topic/list']" class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">查找</el-button>
      <!-- <el-button v-permission="['POST /admin/topic/create']" class="filter-item" type="primary" icon="el-icon-edit" @click="handleCreate">添加</el-button>
      <el-button :loading="downloadLoading" class="filter-item" type="primary" icon="el-icon-download" @click="handleDownload">导出</el-button> -->
    </div>

    <!-- 查询结果 -->
    <el-table v-loading="listLoading" :data="list" element-loading-text="正在查询中。。。" border fit highlight-current-row>
     
      <el-table-column align="center" label="发起用户" prop="artName"/>

      <el-table-column align="center" label="标题" prop="artTitle"/>

      <el-table-column align="center" label="图片" prop="artIcon">
        <template slot-scope="scope">
          <img height="74px" width="85px"  :src="scope.row.artIcon"/>
        </template>
      </el-table-column>

      <el-table-column align="center" label="浏览次数" prop="artCount"/>

      <el-table-column align="center" label="点赞次数" prop="artSpotCount"/>

      <!-- <el-table-column align="center" label="审核原因" prop="artDetail"/> -->

      <el-table-column align="center" label="审核结果" prop="artState">
         <template slot-scope="scope">
          <el-tag v-show="scope.row.artState==0">未审核</el-tag>
          <el-tag v-show="scope.row.artState==1">审核通过</el-tag>
          <el-tag v-show="scope.row.artState==2">审核未通过</el-tag>
        </template>
      </el-table-column>

      <el-table-column align="center" label="时间" prop="addTime"/>

      <el-table-column align="center" label="内容详情" prop="content">
        <template slot-scope="scope">
          <el-dialog :visible.sync="contentDialogVisible" title="专题详情">
            <div v-html="contentDetail"/>
          </el-dialog>
          <el-button type="primary" size="mini" @click="showContent(scope.row.artContent)">查看</el-button>
        </template>
      </el-table-column>

      <el-table-column align="center" label="精选内容" min-width="80" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button v-permission="['POST /admin/article/updateSate']" v-show="scope.row.artRecommend == 1" type="warning" size="mini" @click="handleUpdate(scope.row,1)">是</el-button>
          <el-button v-permission="['POST /admin/article/updateSate']" v-show="scope.row.artRecommend == 0" type="warning" size="mini" @click="handleUpdate(scope.row,1)">否</el-button>
          <!-- <el-button v-permission="['POST /admin/topic/delete']" type="danger" size="mini" @click="handleDelete(scope.row)">删除</el-button> -->
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
import { listArticle, updateArticle } from '@/api/article'
import BackToTop from '@/components/BackToTop'
import Pagination from '@/components/Pagination' // Secondary package based on el-pagination

export default {
  name: 'Topic',
  components: { BackToTop, Pagination },
  data() {
    return {
      list: [],
      total: 0,
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
      downloadLoading: false,

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
    this.getList()
  },
  methods: {
    getList() {
      this.listLoading = true
      listArticle(this.listQuery)
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
    handleCreate() {
      this.$router.push({ path: '/promotion/topic-create' })
    },
    // 审核按钮 审核事件
    handleUpdate(row,stateId) {
        this.$confirm('您正在设置精彩内容', '精彩内容', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          updateArticle({id:row.id}).then(response =>{
            this.$message({
                type: 'success',
                message: '审核通过!'
            });
            this.getList();
          })
        }).catch(() => {
        });
    },
     // 未审核通过 提交事件
    Submission(){
        this.dialogFormVisible = false;
        this.listQuery.artDetail = this.textarea;
        this.listQuery.artState = '2';
        this.listQuery.id = this.shId;
        updateArticle(this.listQuery).then(response =>{
              this.getList();
        }).catch(() => {
              this.getList();
        });
    },

    cancel(row){
        this.dialogFormVisible = true
        this.id = row.id;
    },

    showContent(content) {
      this.contentDetail = content
      this.contentDialogVisible = true
    },
    
  }
}
</script>
