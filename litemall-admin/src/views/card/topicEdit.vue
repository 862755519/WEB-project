<template>
  <div class="app-container">

    <el-form ref="card" :rules="rules" :model="card" status-icon label-position="left" label-width="100px" style="width: 800px; margin-left:50px;">
      <el-form-item label="银行卡名称" prop="cardName">
        <el-input v-model="card.cardName"/>
      </el-form-item>
      <el-form-item label="银行卡logo" prop="cardIcon">
        <el-upload
          :headers="headers"
          :action="uploadPath"
          :show-file-list="false"
          :on-success="uploadPicUrl"
          class="avatar-uploader"
          accept=".jpg,.jpeg,.png,.gif">
          <img v-if="card.cardIcon" :src="card.cardIcon" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"/>
        </el-upload>
      </el-form-item><el-form-item label="银行卡背景图片" prop="cardBg">
        <el-upload
          :headers="headers"
          :action="uploadPath"
          :show-file-list="false"
          :on-success="uploadCardBg"
          class="avatar-uploader"
          accept=".jpg,.jpeg,.png,.gif">
          <img v-if="card.cardBg" :src="card.cardBg" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"/>
        </el-upload>
      </el-form-item>

    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="handleCancel">取消</el-button>
      <el-button type="primary" @click="handleConfirm">确定</el-button>
    </div>

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
import { readTopic, updateTopic } from '@/api/card'
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
      card: {
        cardBg: null
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
        cardName: [
          { required: true, message: '专题标题不能为空', trigger: 'blur' }
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

    this.id = this.$route.query.id
    this.getTopic()
  },
  methods: {
    getTopic() {
      this.listLoading = true
      readTopic({ id: this.id })
        .then(response => {
          this.card = response.data.data
          this.listLoading = false
        })
        .catch(() => {
          this.topic = {}
          this.listLoading = false
        })
    },
    handleFilter() {
      this.listQuery.page = 1
      this.getList()
    },
    handleSelectionChange(val) {
      this.selectedlist = val
    },
    uploadPicUrl: function(response) {
      this.card.cardIcon = response.data.url
    },
    uploadCardBg: function(response) {
      this.card.cardBg = response.data.url
      console.log(this.card)
    },
    handleCreate() {
      this.listQuery = {
        page: 1,
        limit: 5,
        id: undefined,
        name: undefined,
        sort: 'add_time',
        order: 'desc'
      }
      this.list = []
      this.total = 0
      this.selectedlist = []
      this.addVisiable = true
    },
    confirmAdd() {
      const newGoodsIds = []
      const newGoodsList = []
      this.selectedlist.forEach(item => {
        const id = item.id
        let found = false
        this.topic.goods.forEach(goodsId => {
          if (id === goodsId) {
            found = true
          }
        })
        if (!found) {
          newGoodsIds.push(id)
          newGoodsList.push(item)
        }
      })

      if (newGoodsIds.length > 0) {
        this.topic.goods = this.topic.goods.concat(newGoodsIds)
        this.goodsList = this.goodsList.concat(newGoodsList)
      }
      this.addVisiable = false
    },
    handleDelete(row) {
      for (var index = 0; index < this.topic.goods.length; index++) {
        if (row.id === this.topic.goods[index]) {
          this.topic.goods.splice(index, 1)
        }
      }
      for (var index2 = 0; index2 < this.goodsList.length; index2++) {
        if (row.id === this.goodsList[index2].id) {
          this.goodsList.splice(index2, 1)
        }
      }
    },
    handleCancel() {
      this.$router.push({ path: '/card/card' })
    },
    handleConfirm() {
      this.$refs['card'].validate(valid => {
        if (valid) {
          updateTopic(this.card).then(response => {
            this.$router.push({ path: '/card/card' })
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
