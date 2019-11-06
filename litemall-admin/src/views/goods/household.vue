<template>
  <div class="app-container">

    <!-- 查询和其他操作 -->
    <div class="filter-container">
      <!-- <el-input v-model="listQuery.goodsSn" clearable class="filter-item" style="width: 200px;" placeholder="请输入商品编号"/> -->
      <el-input v-model="goodsName" clearable class="filter-item" style="width: 200px;" placeholder="请输入商品名称"/>
      <el-button class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">查找</el-button>
      <el-button class="filter-item" type="primary" icon="el-icon-edit" @click="handleCreate">添加</el-button>
      <el-button :loading="downloadLoading" class="filter-item" type="primary" icon="el-icon-download" @click="handleDownload">导出</el-button>
    </div>

    <!-- 查询结果 -->
    <el-table v-loading="listLoading" :data="list" element-loading-text="正在查询中。。。" border fit highlight-current-row>


      <el-table-column align="center" min-width="100" label="名称" prop="comName"/>

      <el-table-column align="center" property="iconUrl" label="图片">
        <template slot-scope="scope">
          <img :src="scope.row.comIcon" width="40">
        </template>
      </el-table-column>

      <el-table-column align="center" label="价格" prop="comPrice"/>

      <el-table-column align="center" label="数量" prop="comNum"/>

      <el-table-column align="center" label="库存" prop="comStock"/>

      <el-table-column align="center" label="时间" prop="addTime"/>


      <el-table-column align="center" label="操作" width="200" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="handleUpdate(scope.row)">编辑</el-button>
          <el-button type="danger" size="mini" @click="handleDelete(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />

    <el-tooltip placement="top" content="返回顶部">
      <back-to-top :visibility-height="100" />
    </el-tooltip>

    <!-- 遮挡层 添加  -->
    <el-dialog :title="title" :visible.sync="dialogFormVisible" width="1000px">
        <el-form ref="goods" :rules="rules" :model="goods" >

            <el-form-item label="商品名称" prop="comName">
                <el-input v-model="goods.comName"/>
            </el-form-item>

            <el-form-item label="商品图片">
                <el-upload
                :action="uploadPath"
                :limit="1"
                :headers="headers"
                multiple
                accept=".jpg,.jpeg,.png,.gif"
                list-type="picture-card"
                :on-success="uploadPicUrl">
                    <i class="el-icon-plus"></i>
                </el-upload>
                <el-dialog :visible.sync="dialogVisible">
                    <img width="100%" :src="dialogImageUrl"  prop="comIcon" >
                </el-dialog>
            </el-form-item>

            <!-- <el-form-item label="商品图片">
              <el-upload
                :headers="headers"
                :action="uploadPath"
                :show-file-list="false"
                :on-success="uploadPicUrl"
                class="avatar-uploader"
                accept=".jpg,.jpeg,.png,.gif">
                <img v-if="goods.comIcon" :src="goods.comIcon" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon"/>
              </el-upload>
            </el-form-item> -->

            <el-form-item label="价格" prop="comPrice">
                <el-input v-model="goods.comPrice" placeholder="0.00">
                    <template slot="append">元</template>
                </el-input>
            </el-form-item>

            <el-form-item label="数量" prop="comNum">
                <el-input type="number" v-model="goods.comNum" placeholder="0">
                    <template slot="append">件</template>
                </el-input>
            </el-form-item>

            <el-form-item  label="库存" prop="comStock">
                <el-input type="number" v-model="goods.comStock" placeholder="0">
                    <template slot="append">件</template>
                </el-input>
            </el-form-item>

            <!-- <el-form-item  label="创建时间" prop="counterPrice">
                <el-input  v-model="goods.counterPrice" placeholder="2019年8月26日">
                </el-input>
            </el-form-item> -->

            <el-form-item label="商品详细介绍" prop="comDetails">
                <span>&nbsp;</span>
                <editor :init="editorInit" v-model="goods.comDetails"/>
            </el-form-item>

        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="determine">确 定</el-button>
        </div>
    </el-dialog>

    <!-- 遮挡层 编辑 -->
    <el-dialog :title="title" :visible.sync="editeShow" width="1000px">
        <el-form ref="goods"  :model="goods">

            <el-form-item label="商品名称" prop="comName">
                <el-input v-model="goods.comName"/>
            </el-form-item>

            <el-form-item label="商品图片">
              <el-upload
                :headers="headers"
                :action="uploadPath"
                :show-file-list="false"
                :on-success="uploadPicUrl"
                class="avatar-uploader"
                accept=".jpg,.jpeg,.png,.gif">
                <img v-if="goods.comIcon" :src="goods.comIcon" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon"/>
              </el-upload>
            </el-form-item>

            <el-form-item label="价格" prop="comPrice">
                <el-input v-model="goods.comPrice" placeholder="0.00">
                    <template slot="append">元</template>
                </el-input>
            </el-form-item>

            <el-form-item label="数量" prop="comNum">
                <el-input type="number" v-model="goods.comNum" placeholder="0">
                    <template slot="append">件</template>
                </el-input>
            </el-form-item>

            <el-form-item  label="库存" prop="comStock">
                <el-input type="number" v-model="goods.comStock" placeholder="0">
                    <template slot="append">件</template>
                </el-input>
            </el-form-item>


            <el-form-item label="商品详细介绍" prop="comDetails">
                <span>&nbsp;</span>
                <editor :init="editorInit" v-model="goods.comDetails"/>
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
</style>

<script>
import {  householdInfo,householdAdd,householdDelete,householdRaed } from '@/api/goods'
import { createStorage, uploadPath } from '@/api/storage'
import BackToTop from '@/components/BackToTop'
import Pagination from '@/components/Pagination' // Secondary package based on el-pagination
import Editor from '@tinymce/tinymce-vue'
import { MessageBox } from 'element-ui'
import { getToken } from '@/utils/auth'

export default {
  name: 'GoodsList',
  components: { BackToTop, Pagination, Editor },
  data() {
    return {
      uploadPath,
      list: [],
      total: 0,
      listLoading: true,
      goodsName:'',
      listQuery: {
        page: 1,
        limit: 20,
        goodsSn: undefined,
        likeName: undefined,
        sort: 'add_time',
        order: 'desc'
      },
      goodsDetail: '',
      detailDialog: false,
      detailDialogVisible: false,
      editeShow: false,
      downloadLoading: false,
    // 图片上传
      dialogImageUrl: '',
      dialogVisible: false,
    // 表单遮挡层 属性
      title:'',
      dialogFormVisible: false,
      dialogFormEdit: false,
        goods: {
            comName: '',
            id: '' ,
            comIcon: '',
            comPrice: '',
            comNum: '',
            comStock: '',
            comDetails: '',
        },  
        formLabelWidth: '200px',
        // 商品添加
        goods: { picUrl: '', gallery: [] },
        // 
        rules: {
            // goodsSn: [{ required: true, message: '商品编号不能为空', trigger: 'blur' }],
            comName: [{ required: true, message: '商品名称不能为空', trigger: 'blur' }],
            comPrice: [{ required: true, message: '价格不能为空', trigger: 'blur' }],
            comNum: [{ required: true, message: '数量不能为空', trigger: 'blur' }],
            comStock: [{ required: true, message: '库存不能为空', trigger: 'blur' }]
        },
        
        editorInit: {
            language: 'zh_CN',
            convert_urls: false,
            plugins: ['advlist anchor autolink autosave code codesample colorpicker colorpicker contextmenu directionality emoticons fullscreen hr image imagetools importcss insertdatetime link lists media nonbreaking noneditable pagebreak paste preview print save searchreplace spellchecker tabfocus table template textcolor textpattern visualblocks visualchars wordcount'],
            toolbar: ['searchreplace bold italic underline strikethrough alignleft aligncenter alignright outdent indent  blockquote undo redo removeformat subscript superscript code codesample', 'hr bullist numlist link image charmap preview anchor pagebreak insertdatetime media table emoticons forecolor backcolor fullscreen'],
            images_upload_handler: function(blobInfo, success, failure) {
                const formData = new FormData()
                formData.append('file', blobInfo.blob())
                createStorage(formData).then(res => {
                success(res.data.data.url)
                }).catch(() => {
                failure('上传失败，请重新上传')
                })
            }
        }

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
    this. remove();
  },
  methods: {
    // 获取详情
    getInfo(id){
      householdRaed({id:id}).then(res => {
        if(res.data.errno === 0){
          this.goods = res.data.data;   
        }
      })
    },
    getList() {
      this.listLoading = true
      householdInfo(this.listQuery).then(response => {
          
        this.list = response.data.data.list
        this.total = response.data.data.total
        this.listLoading = false
      }).catch(() => {
        this.list = []
        this.total = 0
        this.listLoading = false
      })
    },
    // 表单提交
    determine(){
        
       this.$refs['goods'].validate(valid => {
        if (valid) {
              householdAdd(this.goods).then(res => {
                  if(res.data.errno === 0){
                      this.getList()
                      this.goods = {}
                      this.dialogFormVisible = false
                  }
              })
            .catch(response => {
               this.dialogFormVisible = false
              this.$notify.error({
                title: '失败',
                message: response.data.errmsg
              })
            })
        }
      })

      
   
      
    },
    // 编辑 确定按钮
    edite(){
        this.editeShow = false;
        householdAdd(this.goods).then(res => {
            if(res.data.errno === 0){
                this.getList()
                this.goods = {}
                
            }
        })
        
    },
    // 编辑弹出框 取消按钮 关闭窗口 清除表单数据
    remove(){
      this.editeShow = false;
      this.goods = {}
    },
    
    uploadPicUrl(response){
        
        this.goods.comIcon = response.data.url
         
    },

    // 查找
    handleFilter() {
      this.listQuery.page = 1
      this.listQuery.likeName = this.goodsName
      this.getList()
    },
    handleCreate() {
        this.remove();
        this.dialogFormVisible = true;
        this.title='掌柜中心添加'
    },
    handleUpdate(row) {
        this.goods.id = row.id;
        this.editeShow = true;
        this.title='掌柜中心编辑'
        this.getInfo(this.goods.id);
    },
    // 删除 操作
    handleDelete(row) {
        this.goods.id = row.id
      householdDelete({id:row.id}).then(response => {
        this.$notify.success({
          title: '成功',
          message: '删除成功'
        })
        this.getList();
        const index = this.list.indexOf(row)
        this.list.splice(index, 1)
      }).catch(response => {
        this.$notify.error({
          title: '失败',
          message: response.data.errmsg
        })
      })
    },
    handleDownload() {
      this.downloadLoading = true
      import('@/vendor/Export2Excel').then(excel => {
        const tHeader = ['商品ID', '商品编号', '名称', '专柜价格', '当前价格', '是否新品', '是否热品', '是否在售', '首页主图', '宣传图片列表', '商品介绍', '详细介绍', '商品图片', '商品单位', '关键字', '类目ID', '品牌商ID']
        const filterVal = ['id', 'goodsSn', 'name', 'counterPrice', 'retailPrice', 'isNew', 'isHot', 'isOnSale', 'listPicUrl', 'gallery', 'brief', 'detail', 'picUrl', 'goodsUnit', 'keywords', 'categoryId', 'brandId']
        excel.export_json_to_excel2(tHeader, this.list, filterVal, '商品信息')
        this.downloadLoading = false
      })
    }
  }
}
</script>
