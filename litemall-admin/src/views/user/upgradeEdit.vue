<template>
  <div class="app-container">
    <el-form ref="upgrade" :rules="rules" :model="upgrade"  size="medium" status-icon label-position="left" label-width="100px" style="width: 800px; margin-left:50px;">
      <el-form-item label="会员等级" prop="upDef">
        <el-select v-model="upgrade.level" disabled="true"  placeholder="请选择会员等级">
          <el-option label="普通用户" value="0"/>
          <el-option label="掌柜" value="1"/>
          <el-option label="经理" value="2"/>
        </el-select>
      </el-form-item>

      <el-form-item label="升级等级" placeholder="升级等级">
        <!-- <p>{{upgrade.upDef}}</p> -->
        <el-input class="size"   v-if="upgrade.level == '普通用户'" value="掌柜" :disabled="true"/>
        <el-input class="size"   v-else-if="upgrade.level == '掌柜'" value="经理" :disabled="true"/>
        <el-input class="size"    v-else-if="upgrade.level == '经理'" value="总监" :disabled="true"/>

        <el-input class="size"   v-if="upgrade.level == 0" value="掌柜" :disabled="true"/>
        <el-input class="size"   v-else-if="upgrade.level == 1" value="经理" :disabled="true"/>
        <el-input class="size"    v-else-if="upgrade.level == 2" value="总监" :disabled="true"/>

      </el-form-item>

      <el-form-item label="团队奖,百分数之分子"  prop="upTerm" >
        <!-- <el-input-number v-model="upgrade.upTerm"  /> -->
        <el-input v-model="upgrade.team" placeholder="请输入内容" type="number" style="width:200px;">
          <template  slot="append">%</template>
        </el-input>
      </el-form-item>

      <el-form-item label="升级条件，人数"  prop="upTerm" >
        <!-- <el-input-number v-model="upgrade.upTerm"  /> -->
        <el-input v-model="upgrade.num" placeholder="请输入内容" type="number" style="width:200px;">
          <template v-if="upgrade.level == 0 || upgrade.level == '普通用户'" slot="append">元</template>
          <template v-else slot="append">人</template>
          
        </el-input>
        <br/>
         <template v-if="upgrade.level == 1 || upgrade.level == '经理'">
        <el-input  type="text" v-enter-number2 v-model="upgrade.under"  placeholder="请输入内容"  style="width:200px;margin-top:10px;">
           <template slot="append">下掌柜人数</template>
        </el-input>
         </template>
      </el-form-item>
    </el-form>
    
    <div slot="footer" class="dialog-footer">
      <el-button @click="handleCancel">取消</el-button>
      <el-button type="primary" @click="handleConfirm">确定</el-button>
    </div>
  </div>
</template>

<style>
.size{
  width: 200px;
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
import { upgradeEdit,upgradeRead} from '@/api/upgrade'

import { createStorage, uploadPath } from '@/api/storage'
import BackToTop from '@/components/BackToTop'
import Editor from '@tinymce/tinymce-vue'
import Pagination from '@/components/Pagination' // Secondary package based on el-pagination
import { getToken } from '@/utils/auth'

export default {
  name: 'CardEdit',
  components: { BackToTop, Editor, Pagination },
  data() {
    return {
      uploadPath,
      upgrade: {
      },
      goodsList: [],
      addVisiable: false,
      list: [],
      total: 0,
      listLoading: false,

      listQuery: {
        
        id: undefined,
       
      },
      selectedlist: [],
      rules: {
        num: [
          { required: true, message: '升级条件人数不能为空', trigger: 'blur' }
        ],
        team: [
          { required: true, message: '团队奖励百分比不能为空', trigger: 'blur' }
        ]
      },
      editorInit: {
        language: 'zh_CN',
        convert_urls: false,
        height: 500,
        plugins: [
          'advlist anchor autolink autosave code codesample colorpicker colorpicker contextmenu directionality emoticons fullscreen hr image imagetools importcss insertdatetime link lists media nonbreaking noneditable pagebreak paste preview print save searchreplace spellchecker tabfocus table template textcolor textpattern visualblocks visualchars wordcount'
        ],
        toolbar: [
          'searchreplace bold italic underline strikethrough alignleft aligncenter alignright outdent indent  blockquote undo redo removeformat subscript superscript code codesample',
          'hr bullist numlist link image charmap preview anchor pagebreak insertdatetime media table emoticons forecolor backcolor fullscreen'
        ],
        images_upload_handler: function(blobInfo, success, failure) {
          const formData = new FormData()
          formData.append('file', blobInfo.blob())
          createStorage(formData)
            .then(res => {
              success(res.data.data.url)
            })
            .catch(() => {
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
    if (this.$route.query.id == null) {
      return
    }
    this.upgrade.id = this.$route.query.id
    this.listQuery.id = this.$route.query.id
    this.getList() ;
  },
  methods: {
    getList() {
      this.listLoading = true
      upgradeRead(this.listQuery).then(response => {
        
       this.upgrade = response.data.data;

         if(this.upgrade.level == 0){
           this.upgrade.level = '普通用户'
         }else if ( this.upgrade.level == 1) {
           this.upgrade.level = '掌柜'
         } else {
           this.upgrade.level = '经理'
         }
        
        this.listLoading = false

      }).catch(() => {
        this.total = 0
        this.listLoading = false
      })
    },
    // 弹出框 确认 取消
    handleCancel() {
      this.$router.push({ path: '/user/upgrade' })
    },
    handleConfirm() {
       if(this.upgrade.level == '普通用户'){
           this.upgrade.level = 0
         }else if ( this.upgrade.level == "掌柜") {
           this.upgrade.level = 1
         } else {
           this.upgrade.level = 2
         }

      this.$refs['upgrade'].validate(valid => {
        if (valid) {
          upgradeEdit(this.upgrade).then(response => {
            if(response.data.errno == 0){
                 this.$message({
                  message: response.data.errmsg,
                  type: 'success'
                });
            }
            this.$router.push({ path: '/user/upgrade' })
          })
            .catch(response => {
              this.$notify.error({
                title: '失败',
                message: response.data.errmsg
              })
            })
        }
      })
    }
  }
}
</script>
