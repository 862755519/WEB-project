<template>
  <div class="app-container">

    <!-- 查询和其他操作 -->
    <div class="filter-container">
      <!-- <el-select v-model="listQuery.type" clearable style="width: 200px" class="filter-item" placeholder="请选择用户等级">
        <el-option v-for="type in statusOptions" :key="type.value" :label="type.label" :value="type.value"/>
      </el-select>
      <el-select v-model="listQuery.type" clearable style="width: 200px" class="filter-item" placeholder="请选择返利方式">
        <el-option v-for="type in rebateOptions" :key="type.value" :label="type.label" :value="type.value"/>
      </el-select> -->
      <!-- <el-button v-permission="['GET /admin/rebateSet/list']" class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">查询</el-button>
      <el-button v-permission="['POST /admin/rebateSet/create']" class="filter-item" type="primary" icon="el-icon-edit"  @click="findLevel">添加</el-button> -->
    </div>

    <!-- 查询结果 -->
    <el-table v-loading="listLoading" :data="list" element-loading-text="正在查询中。。。" border fit highlight-current-row>

      <el-table-column align="center" label="用户等级" prop="level">
      <template slot-scope="scope">
          <el-tag>{{ levels[scope.row.level] }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column align="center" label="奖励百分比" prop="scale"/>

        <!-- <template slot-scope="scope">
          <img v-for="item in scope.row.picUrls" :key="item" :src="item" width="40">
        </template> -->

    <el-table-column align="center" label="操作" prop="status">
        <template slot-scope="scope">
          <el-button   type="primary" size="mini" @click="findLevel(scope.row)">编辑</el-button>
        </template>
      </el-table-column>
     
    </el-table>

    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />
     
     <!-- 点击添加时的对话框 -->
<el-dialog title="返利信息添加" :visible.sync="dialogFormVisible">
  <el-form :model="form">
   
    <el-form-item label="用户等级" :label-width="formLabelWidth">
        <el-input v-model="levels[addRebate.level]" disabled="true"/>
    </el-form-item> 

    <el-form-item label="奖励百分比" :label-width="formLabelWidth" >   
  
      <el-input-number v-model="addRebate.scale" autocomplete="off" @blur="award1Blur1(addRebate.scale)"></el-input-number>
    </el-form-item>
    
     <el-row>
        <el-col :span="24"><div class="error" v-show="errorShow1">请输入数据,不能为字符或者汉字</div></el-col>
    </el-row>

  
    
  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="dialogFormVisible = false">取 消</el-button>
    <el-button type="primary" @click="btn">确 定</el-button>
  </div>
</el-dialog>
     
  </div>
</template>

<script>
import {listRebate,createRebate,findRebate} from '@/api/good'
import Pagination from '@/components/Pagination' // Secondary package based on el-pagination

export default {
  name: 'Feedback',
  components: { Pagination },
  data() {
   
    return {
        ruleForm: {
          pass: '',
          checkPass: '',
          age: ''
        },
        errorShow1:false,
        errorShow2:false,
        errorShow3:false,
    //   statusOptions: Object.assign({}, defaultStatusOptions),
    //   rebateOptions: Object.assign({}, defaultRebateOptions),
      list: [],
      total: 0,
      listLoading: true,
      listQuery: {
        page: 1,
        limit: 20,
        username: undefined,
        sort: 'add_time',
        order: 'desc'
      },
      addRebate:{},
      downloadLoading: false,
       dialogFormVisible: false,
        form: {
          region: '',
          delivery: false,
          type: [],
          award1:"",
          award2:"",
          award3:"",
        },
        formLabelWidth: '120px', 
        levels:['普通会员','掌柜','经理','总监']
    }
  },

  created(){
    this.getList();
  },
 
  methods: {
  
    award1Blur1(e){
      var reg=/\d+(\.\d+)?/;
      if(reg.test(e)){
        this.errorShow1 = false;
      }else{
        this.errorShow1 = true;
      }
    },
    findLevel(obj){
     findRebate({id:obj.id}).then(response =>{
        this.addRebate = response.data.data;
        this.dialogFormVisible=true;
      })

    },
    //  确定按钮
    btn(){
      var that = this;
      if(this.addRebate.scale==''){
          return;
      }
      createRebate(this.addRebate).then(response =>{
           that.$message({
              message: response.data.errmsg,
              type: 'success'
            });
          this.dialogFormVisible=false;
         this.getList();
      })
    },
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
      this.getList()
    },
     addList(){   
     }
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
