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
      <el-table-column align="center" label="直接奖励" prop="push"/>

      <el-table-column align="center" label="间接奖励(掌柜)" prop="indirectZg"/>
      <el-table-column align="center" label="间接奖励(经理)" prop="indirect"/>

      <el-table-column align="center" label="平级奖励" prop="equalj"/>
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
   
    <el-form-item  label="用户等级" :label-width="formLabelWidth">
        <el-input v-model="levels[addRebate.level]" disabled="true"/>
    </el-form-item> 

    <el-form-item label="直接奖励" :label-width="formLabelWidth" >   
  
      <el-input type="number" min="0" precision='number' v-model="addRebate.push" autocomplete="off" @blur="award1Blur1(addRebate.push)"></el-input>
    </el-form-item>
    
     <el-row>
        <el-col :span="24"><div class="error" v-show="errorShow1">请输入正整数,不能为字符或者汉字</div></el-col>
    </el-row>

    <el-form-item label="间接奖励（掌柜）" :label-width="formLabelWidth" >
      <el-input type="number" min="0" precision='number'  v-model="addRebate.indirectZg" autocomplete="off" @blur="award1Blur4(addRebate.indirectZg)"></el-input>
    </el-form-item>

    <el-row>
        <el-col :span="24"><div class="error" v-show="errorShow4">请输入正整数,不能为字符或者汉字</div></el-col>
    </el-row>

    <el-form-item v-show="addRebate.level==3" label="间接奖励（经理）" :label-width="formLabelWidth" >
      <el-input type="number" min="0" precision='number'  v-model="addRebate.indirect" autocomplete="off" @blur="award1Blur2(addRebate.indirect)"></el-input>
    </el-form-item>

    <el-row>
        <el-col :span="24"><div class="error" v-show="errorShow2">请输入正整数,不能为字符或者汉字</div></el-col>
    </el-row>

    <el-form-item v-show="addRebate.level==3" label="平级奖励" :label-width="formLabelWidth">
      <el-input type="number" min="0" precision='number' v-model="addRebate.equalj" autocomplete="off"  @blur="award1Blur3(addRebate.equalj)"></el-input>
    </el-form-item>

    <el-row>
        <el-col :span="24"><div class="error" v-show="errorShow3">请输入正整数,不能为字符或者汉字</div></el-col>
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
import {listRebate,createRebate,findRebate} from '@/api/rebate'
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
        errorShow4:false,
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
        formLabelWidth: '150px', 
        levels:['普通会员','掌柜','经理','总监']
    }
  },

  created(){
    this.getList();
  },
 
  methods: {
  
    award1Blur1(e){

       var reg=/^([1-9]\d*|[0]{1,1})$/;
      var regNum=/^-?\d+$/;

      if(reg.test(e)&&regNum.test(e)){
        this.errorShow1 = false;
      }else{
        this.errorShow1 = true;
      }
    },
    award1Blur4(e){
      var reg=/^([1-9]\d*|[0]{1,1})$/;
      var regNum=/^-?\d+$/;

      if(reg.test(e)&&regNum.test(e)){
        this.errorShow4 = false;
      }else{
        this.errorShow4 = true;
      }
    },
    award1Blur2(e){
      var reg=/^([1-9]\d*|[0]{1,1})$/;
      var regNum=/^-?\d+$/;
      if(reg.test(e)&&regNum.test(e)){
        this.errorShow2 = false;
      }else{
        this.errorShow2 = true;
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
      if(this.errorShow1){
          return;
      }
      if(this.errorShow2){
          return;
      }
      if(this.errorShow3){
          return;
      }
      if(this.errorShow4){
          return;
      }
      if(this.addRebate.push==''){
            that.$message({
              message: "直接奖励输入错误！",
              type: 'warning'
            });
          return;
      }
      if(this.addRebate.indirect==''){
          that.$message({
                    message: "间接奖励输入错误！",
                    type: 'warning'
                  });
          return;
      }
      if(this.addRebate.level==3){
        if(this.addRebate.equalj==''){
            that.$message({
              message: "平级奖励输入错误！",
              type: 'warning'
            });
                return;
           }
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
    award1Blur3(e){
      var reg=/^([1-9]\d*|[0]{1,1})$/;
      var regNum=/^-?\d+$/;
     if(reg.test(e)&&regNum.test(e)){
       this.errorShow3 = false;
     }else{
       this.errorShow3 = true;
     }
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
