<template>
  <div class="app-container">

    <!-- 查询和其他操作 -->
    <div class="filter-container">
    <el-date-picker
      v-model="addTime"
      type="datetime"
      placeholder="选择日期时间">
    </el-date-picker>
      <el-button v-permission="['GET /admin/rebateSet/query']" class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">查找</el-button>
    </div>
    <!-- 查询结果 -->
    <!-- <el-table v-loading="listLoading" :data="list" element-loading-text="正在查询中。。。" border fit highlight-current-row> -->
    <el-table :data="list" >
      <el-table-column align="center" label="用户名" prop="nickname"/>
      <el-table-column align="center" label="电话" prop="mobile"/>
      <el-table-column align="center" label="金额" prop="rrPrice"/>
      <el-table-column align="center" label="备注" prop="rrDetali"/>
      <el-table-column align="center" label="返利时间" prop="addTime"/>
     
    </el-table>

    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />

    <el-tooltip placement="top" content="返回顶部">
      <back-to-top :visibility-height="100" />
    </el-tooltip>

        <!-- 点击添加时的对话框 -->
<el-dialog title="订单详情" :visible.sync="dialogFormVisible">
   
     <div class="order_div">
       <div class="row"> 
         <div class="order_num">订单编号:</div>
         <div class="order_text">2019031256</div>
        </div>
        <div class="row"> 
         <div class="order_num">收货人:</div>
         <div class="order_text">毛祥东</div>
         <div class="order_num">电话:</div>
         <div class="order_text">19956846502</div>
         <div class="order_num">地址:</div>
         <div class="order_addres">云南省昆明市官渡区</div>
        </div>
        <div class="row"> 
         <div class="order_num">物流信息:</div>
        </div>
        <div class="list" style="height: 160px;">
        <el-steps direction="vertical" :active="1">
    <el-step title="买家已下单，等待揽件"></el-step>
    <el-step title="包裹已出库"></el-step>
    <el-step title="快递到达昆明分拨中心，下一站官渡区经济开发区" description="这是一段很长很长很长的描述性文字"></el-step>
  </el-steps>
  </div>
     </div>
    
  <div slot="footer" class="dialog-footer">
    <el-button @click="dialogFormVisible = false">取 消</el-button>
    <el-button type="primary" @click="btn">确 定</el-button>
  </div> 
</el-dialog>
  </div>
</template>

<style>
.list{
  margin-top: 30px;
  margin-left: 13%;
}
.order_addres{
  width: 40%;
  height: 45px;
  float: left;
  font-size: 16px;
  line-height: 45px;
  padding-left: 15px;
}
.order_text{
  width: 15%;
  height: 45px;
  float: left;
  font-size: 16px;
  line-height: 45px;
  padding-left: 15px;
}
 .order_num{
   width:10%;
   height: 45px;
   font-size: 16px;
   line-height: 45px;
   float: left;
   text-align: right
 }
 .row{
   width: 100%;
   height: 45px;
   border-bottom: 1px solid #C0C0C0;
 } 
.order_div{
  width: 100%;
}
.filter-item{
    margin-top: 7px;
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
/*eslint-disable*/  
import {findRebateSetList} from '@/api/rebate'
import BackToTop from '@/components/BackToTop'
import Pagination from '@/components/Pagination' // Secondary package based on el-pagination

export default {
  name: 'Topic',
  components: { BackToTop, Pagination },
  data() {
    return {
      timevalue1:null,//选择查询时间
      list: [],
      addTime:null,
      total: 0,
      listLoading: true,
      listQuery: {
        page: 1,
        limit: 20,
        addTime:null,
      },
      contentDetail: '',
      contentDialogVisible: false,
      downloadLoading: false,
      dialogFormVisible: false,
    }
  },
  created() {
    this.getList();
  },
  methods: {
    onButton(){
       alert("点击按钮");
        this.dialogFormVisible=true;
       
    },
    getList() {
      this.listLoading = true
    //   console.log("对象为");
    //   console.log(this.listQuery);
      findRebateSetList(this.listQuery)
        
        .then(response => {
          this.list = response.data.data.list
          this.total = response.data.data.total
          this.listLoading = false
        console.log(response.data.data.list);
        })
        .catch(() => {
          this.list = []
          this.total = 0
          this.listLoading = false
        })
    },
    handleFilter() {
     
      var time = this.addTime;
      if(time == null){
            this.listQuery.page = 1;
            this.listQuery.limit = 20;
            this.getList();
      }else{
      // console.log(time);
      var starttime = time[0];
      alert(this.addTime )
      this.listQuery.addTime =this.setTime(this.addTime);
      this.listQuery.page = 1;
      this.listQuery.limit = 20;
      this.getList();

      }
     
      
    },
      strAciont(obj){
      if(obj<10){
         obj = "0"+obj;
      }
      return obj;
  },
    //时间格式化
    setTime(date){
      var year = date.getFullYear();
      var month = date.getMonth();
      month = this.strAciont((month+1))
      var day = date.getDate();
      var timeType = ""+year+"-"+month+"-"+this.strAciont(day);
      return timeType;
     }
 
  },


}
</script>
