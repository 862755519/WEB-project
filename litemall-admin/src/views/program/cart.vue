<template>
  <div class="app-container">

    <!-- 查询和其他操作 -->
    <div class="filter-container">
      <!-- <el-input v-model="listQuery.name" clearable class="filter-item" style="width: 200px;" placeholder="请输入广告标题"/> -->
      <el-input v-model="listQuery.bcName" clearable class="filter-item" style="width: 200px;" placeholder="请输入公司名称"/>
      <el-button v-permission="['GET /admin/business/list']" class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">查找</el-button>
      <el-button v-permission="['POST /admin/business/insertOrUpdate']" class="filter-item" type="primary" icon="el-icon-edit" @click="handleCreate">添加</el-button>
      <!-- <el-button :loading="downloadLoading" class="filter-item" type="primary" icon="el-icon-download" @click="handleDownload">导出</el-button> -->
    </div>

    <!-- 查询结果 -->
    <el-table v-loading="listLoading" :data="list" element-loading-text="正在查询中。。。" border fit highlight-current-row>

      <!-- <el-table-column align="center" label="广告ID" prop="id" sortable/> -->
      <el-table-column align="center" label="公司logo" prop="url">
        <template slot-scope="scope">
          <img v-if="scope.row.bcLogo" :src="scope.row.bcLogo" width="80">
        </template>
      </el-table-column>
      
      <el-table-column align="center" label="公司名称" prop="bcName"/>

      <el-table-column align="center" label="简介" prop="bcIntroduce"/>

      <el-table-column align="center" label="公司类型标签" prop="bcLabel">
        <template slot-scope="scope">
            <el-tag v-for="item in scope.row.bcLabel.split(',')" :key="item">{{item}}</el-tag>
        </template>
      </el-table-column>
      

      <el-table-column align="center" label="添加时间" prop="addTime"/>

      <el-table-column align="center" label="操作" width="200" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button v-permission="['POST /admin/business/insertOrUpdate']"  type="primary" size="mini" @click="handleUpdate(scope.row)">编辑</el-button>
          <el-button v-permission="['POST /admin/business/delete']" type="danger" size="mini" @click="handleDelete(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />

    <!-- 添加或修改对话框 -->
    <el-dialog class="dia"  :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
      <el-form  ref="dataForm" :rules="rules" :model="dataForm" status-icon label-position="center" label-width="80px" style="width: 700px; margin-left:50px;">
        <el-form-item label="公司名称" prop="bcName">
          <el-input v-model="dataForm.bcName"/>
        </el-form-item>
        <el-form-item label="公司简介" prop="bcIntroduce">
          <el-input v-model="dataForm.bcIntroduce"/>
        </el-form-item>
        <el-form-item label="公司logo" prop="bcLogo">
          <el-upload
            :headers="headers"
            :action="uploadPath"
            :show-file-list="false"
            :on-success="uploadUrl"
            :before-upload="checkFileSize"
            class="avatar-uploader"
            accept=".jpg,.jpeg,.png,.gif">
            <img v-if="dataForm.bcLogo" :src="dataForm.bcLogo" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"/>
            <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过1024kb</div>
          </el-upload>
        </el-form-item>
        <el-form-item label="宣传视频" prop="bcVideo">
          <el-upload
            :headers="headers"
            :action="uploadPath"
            :show-file-list="false"
            :on-success="uploadVideo"
            :before-upload="checkFileSize"
            class="avatar-uploader"
            accept=".mp4">
            <video  controls="controls" v-if="dataForm.bcVideo" :src="dataForm.bcVideo" class="avatar"/>
             <i v-else class="el-icon-plus avatar-uploader-icon"/> 
            <div slot="tip" class="el-upload__tip">只能上传j.mp4文件，且不超过100Mb</div>
          </el-upload>
        </el-form-item>
            <el-card>
                  <h3>公司标签</h3>
                  <el-button :plain="true" type="primary" @click="handleAttributeShow">添加</el-button>

                  <div class="add_com" v-if="show_add">
                    <el-select  @change="changeFather" v-model="valueFather" placeholder="请选择">
                      <el-option
                        v-for="item in tradeFatherList"
                        :key="item.id"
                        :label="item.name"
                        :value="item.id">
                      </el-option>
                    </el-select>

                    <el-select v-model="value" placeholder="请选择">
                      <el-option
                        v-for="item in tradeList"
                        :key="item.id"
                        :label="item.name"
                        :value="item.id">
                      </el-option>
                    </el-select>
                    <el-button :plain="true" size="mini" type="primary" @click="clickHandleAttributeShow">确定</el-button>
                    <el-button :plain="true" size="mini"  type="primary" @click="show_add = false">取消</el-button>
                  </div>
                  <hr>

                  <el-table :data="cardAllinone.cardAtrs">
                    <el-table-column property="bcaFatherName" label="父类标签"/>
                    <el-table-column property="bcaName" label="子类标签"/>
                    <el-table-column align="center" label="操作" width="100" class-name="small-padding fixed-width">
                      <template slot-scope="scope">
                        <el-button type="danger" size="mini" @click="handleAttributeDelete(scope.row)">删除</el-button>
                      </template>
                    </el-table-column>
                  </el-table>
                </el-card>
     
      
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取消</el-button>
        <el-button v-if="dialogStatus=='create'" type="primary" @click="createData">确定</el-button>
        <el-button v-else type="primary" @click="updateData">确定</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<style>
  .add_com{
    /* border:1px solid green; */
    width: 100%;
    /* height: 100px; */
    margin:20px 0px;
    padding: 0 10px;
    
    text-align: right;
  }
  .el-tag + .el-tag {
    margin-left: 10px;
  }
  .button-new-tag {
    margin-left: 10px;
    height: 32px;
    line-height: 30px;
    padding-top: 0;
    padding-bottom: 0;
  }
  .input-new-tag {
    width: 90px;
    margin-left: 10px;
    vertical-align: bottom;
  }

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
import { listCard, inserOrUpdate, readCard, deleteCard,listTrade} from '@/api/xcx_card'
import { getToken } from '@/utils/auth'
import {uploadPath } from '@/api/storage'
import Pagination from '@/components/Pagination' // Secondary package based on el-pagination

export default {
  name: 'Ad',
  components: { Pagination},
  data() {
    return {
      tradeFatherList:[],//父亲
      tradeList:[],//儿子
      value: '',
      valueFather: '',
      bcaFatherName:'',
      bcaName:'',
      pid:'',
      uploadPath,
      cardAllinone:{
        businessCard:{},
        cardAtrs:[]
      },
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
      dataForm: {
        bcLogo:null,
        bcVideo:null,
            bcLabel:''
      },
      dialogFormVisible: false,
      dialogStatus: '',
      textMap: {
        update: '编辑',
        create: '创建'
      },
      rules: {
        bcLogo: [
          { required: true, message: 'logo不能为空', trigger: 'blur' }
        ],
        bcName: [
          { required: true, message: '标题不能为空', trigger: 'blur' }
        ],
        bcIntroduce: [
          { required: true, message: '简介不能为空', trigger: 'blur' }
        ]
      },
      downloadLoading: false,
      show_add:false
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
      listCard(this.listQuery)
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
    handleAttributeShow:function(){
      if( !this.show_add){
        this.show_add = true;
         this.bcaFatherName ='';
         this.bcaName ='';
         this.valueFather ='';
         this.value ='';
        this.tradeFatherList =[];
        this.tradeList =[];
        this.getListCard(0);

      }
    },
    handleAttributeDelete(row) {
      const index = this.cardAllinone.cardAtrs.indexOf(row)
      this.cardAllinone.cardAtrs.splice(index, 1)
    },
    clickHandleAttributeShow:function(){
        for(var i = 0;i<this.tradeList.length;i++){
              var fatherMode = this.tradeList[i];
          if(this.value==fatherMode.id){
              this.bcaName = fatherMode.name;
              this.pid =fatherMode.id;
                    break;
              }
        }
        this.cardAllinone.cardAtrs.push({bcaFatherName:this.bcaFatherName,bcaName:this.bcaName,pid:parseInt(this.pid)});
        this.show_add = false;
    },
    changeFather:function(){
        for(var i = 0;i<this.tradeFatherList.length;i++){
              var fatherMode = this.tradeFatherList[i];
              if(this.valueFather==fatherMode.id){
                  this.bcaFatherName = fatherMode.name;
                    break;
              }
        }
        this.getListCard(this.valueFather);
    },
    getListCard(pid) {
      this.listLoading = true
      listTrade({pid:pid})
        .then(response => {
          if(pid==0){
            this.tradeFatherList= response.data.data;
          }else{
            this.tradeList= response.data.data;
          }
        })
        .catch(() => {
          this.tradeFatherList = []
          this.listLoading = []
        })
    },
    handleFilter() {
      this.listQuery.page = 1
      this.getList()
    },
    resetForm() {
      this.dataForm = {
        bcLogo:null,
        bcVideo:null,
        bcLabel:''
      };
      this.cardAllinone.cardAtrs=[];
    },
    handleCreate() {
      this.resetForm()
      this.dialogStatus = 'create'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    uploadUrl: function(response) {
      this.dataForm.bcLogo = response.data.url;
    },
    uploadVideo: function(response) {
      this.dataForm.bcVideo = response.data.url;
    },
    checkFileSize: function(file) {
      if (file.size > 1048576) {
        this.$message.error(`${file.name}文件大于1024KB，请选择小于1024KB大小的图片`)
        return false
      }
      return true
    },
    createData() {
      var atr = this.cardAllinone.cardAtrs;
      var len = atr.length;
      if(len<=0){
          this.$notify.error({
                title: '失败',
                message: '公司标签最少选择一个'
          })
          return;
      }
      for(var i = 0 ;i<len ;i++){
          if(i==len-1&&len!=0){
              this.dataForm.bcLabel += atr[i].bcaName;
          }else{
              this.dataForm.bcLabel += atr[i].bcaName+',';
          }
      }
      this.cardAllinone.businessCard = this.dataForm;
      this.$refs['dataForm'].validate(valid => {
        if (valid) {
          inserOrUpdate(this.cardAllinone)
            .then(response => {
              this.handleFilter();
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
       readCard({id:row.id})
        .then(response => {
            this.dataForm= response.data.data.businessCard;
            this.cardAllinone.cardAtrs= response.data.data.cardAtrs;
        })
  
      this.dialogStatus = 'update'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })


    },


    updateData() {
      var atr = this.cardAllinone.cardAtrs;
      var len = atr.length;
      if(len<=0){
          this.$notify.error({
                title: '失败',
                message: '公司标签最少选择一个'
          })
          return;
      }
      this.dataForm.bcLabel = '';
      for(var i = 0 ;i<len ;i++){
          if(i==len-1&&len!=0){
              this.dataForm.bcLabel += atr[i].bcaName;
          }else{
              this.dataForm.bcLabel += atr[i].bcaName+',';
          }
      }
      this.cardAllinone.businessCard = this.dataForm;

      this.$refs['dataForm'].validate(valid => {

        if (valid) {
          inserOrUpdate(this.cardAllinone)
            .then(() => {
              // for (const v of this.list) {
              //   if (v.id === this.dataForm.id) {
              //     const index = this.list.indexOf(v)
              //     this.list.splice(index, 1, this.dataForm)
              //     break
              //   }
              // }
              this.handleFilter();
              this.dialogFormVisible = false
              this.$notify.success({
                title: '成功',
                message: '更新广告成功'
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
      deleteCard({id:row.id})
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
