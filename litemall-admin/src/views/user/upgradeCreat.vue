<template>
  <div class="app-container">
    <el-form ref="upgrade" :rules="rules" :model="upgrade"  size="medium" status-icon label-position="left" label-width="100px" style="width: 800px; margin-left:50px;">
      <el-form-item label="会员等级" prop="upDef">
        <el-select v-model="upgrade.upDef" placeholder="请选择会员等级">
          <el-option label="普通用户" value="0"/>
          <el-option label="掌柜" value="1"/>
          <el-option label="经理" value="2"/>
        </el-select>
      </el-form-item>

      <!-- <el-form-item label="升级等级" placeholder="请输入升级等级">
        <el-input class="size" v-model="upgrade.upDef === '1'?'经理':'总监'"  :disabled="true"/>
      </el-form-item> -->

      <el-form-item label="升级等级" placeholder="请输入升级等级">
        <el-input class="size"   v-if="upgrade.upDef == 0" value="掌柜" :disabled="true"/>
        <el-input class="size"   v-else-if="upgrade.upDef == 1" value="经理" :disabled="true"/>
        <el-input class="size"    v-else-if="upgrade.upDef == 2" value="总监" :disabled="true"/>
      </el-form-item>

      <el-form-item label="升级条件"  prop="upTerm" >
        <!-- <el-input-number v-model="upgrade.upTerm"  /> -->
        <el-input v-model="upgrade.upTerm" placeholder="请输入内容" type="number" style="width:200px;">
          <template v-if="upgrade.upDef == 0 " slot="append">元</template>
          <template v-else slot="append">人</template>
        </el-input>
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
import { createTopic,upgradeCreate } from '@/api/upgrade'


import { listGoods } from '@/api/goods'
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
      id: 0,
      upgrade: {
        upDef:'0',
        upTerm:''
      },
      goodsList: [],
      addVisiable: false,
      list: [],
      total: 0,
      listLoading: false,
      listQuery: {
        page: 1,
        limit: 5,
        id: undefined,
        name: undefined,
        sort: 'add_time',
        order: 'desc'
      },
      selectedlist: [],
      rules: {
        upTerm: [
          { required: true, message: '升级条件不能为空', trigger: 'blur' }
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
  },
  methods: {
    
    handleCancel() {
      this.$router.push({ path: '/user/upgrade' })
    },
    handleConfirm() {
      this.$refs['upgrade'].validate(valid => {
        if (valid) {
          upgradeCreate(this.upgrade).then(response => {
            if(response.errno === 0){
              this.$router.push({ path: '/user/upgrade' })
            }
          }).catch(response => {
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
