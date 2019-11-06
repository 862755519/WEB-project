<template>
  <div class="app-container">
    <!-- 查询和其他操作 -->
    <div class="filter-container">
      <el-input
        v-model="listQuery.username"
        clearable
        class="filter-item"
        style="width: 200px;"
        placeholder="请输入用户名"
      />
      <el-select class="filter-item" v-model="listQuery.type" placeholder="请选择状态">
        <el-option label="全部" value="-1" />
        <el-option label="升级业务员" value="0" />
        <el-option label="商品复购" value="1" />
      </el-select>

      <el-button class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">查询</el-button>
      <!-- <el-button class="filter-item" type="primary" icon="el-icon-edit" @click="handleCreate">添加</el-button>
      <el-button :loading="downloadLoading" class="filter-item" type="primary" icon="el-icon-download" @click="handleDownload">导出</el-button>-->
    </div>

    <!-- 查询结果 -->
    <el-table
      v-loading="listLoading"
      :data="list"
      element-loading-text="正在查询中。。。"
      border
      fit
      highlight-current-row
    >
      <el-table-column align="center" label="收货姓名" prop="username" />

      <el-table-column align="center" label="电话号码" prop="mobile" />

      <el-table-column align="center" min-width="100" label="商品名称" prop="address" />

      <el-table-column align="center" label="购买时间" prop="paytime" />

      <el-table-column align="center" label="发放时间" prop="updatetime" />

      <el-table-column align="center" label="商品价格" prop="actprice" />

      <el-table-column align="center" label="发放状态">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.state === 0 && scope.row.otype === 1">未发放</el-tag>
          <el-tag type="info" v-else>已发放</el-tag>
        </template>
      </el-table-column>

      <el-table-column align="center" label="购买状态">
        <template slot-scope="scope">
          <el-tag type="info" v-if="scope.row.otype === 0">升级业务员</el-tag>
          <el-tag v-else>商品复购</el-tag>
        </template>
      </el-table-column>

      <el-table-column align="center" label="备注" prop="recRemark" />

      <el-table-column align="center" label="操作" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button  size="mini"  v-if ="scope.row.otype === 1 && scope.row.paystatus==0"> 
            未支付
          </el-button>  
          <el-button   size="mini"  v-if ="scope.row.otype === 1 && scope.row.paystatus==2"> 
            已超时
          </el-button>  
          <el-button
            type="primary"
            size="mini"
            @click="handleUpdate(scope.row)"
            v-if="scope.row.state ===  0 && scope.row.otype === 1 && scope.row.paystatus==1 "
          >发放</el-button>
          <el-button
            type="primary"
            size="mini"
            @click="onbutton(scope.row)"
            v-if="scope.row.state ===  1 && scope.row.otype === 1"
          >物流</el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination
      v-show="total>0"
      :total="total"
      :page.sync="listQuery.page"
      :limit.sync="listQuery.limit"
      @pagination="getList"
    />

    <el-tooltip placement="top" content="返回顶部">
      <back-to-top :visibility-height="100" />
    </el-tooltip>

    <!-- 遮挡层 编辑 -->
    <el-dialog :title="title" :visible.sync="editeShow" width="500px">
      <el-form ref="goodsNum" :rules="rules" :model="updataList">
        <el-form-item label="物流单号" prop="ordOddnum">
          <el-input v-model="updataList.ordOddnum" placeholder="请输入物流单号"></el-input>
        </el-form-item>
        <el-form-item label="快递公司" prop="ordIdentification">
          <el-select v-model="updataList.ordIdentification" placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
              </el-select>
        </el-form-item>

  
        <el-form-item label="请输入您的备注信息" prop="comDetails">
          <el-input type="textarea" :rows="2" placeholder="请输入内容" v-model="textarea"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="remove">取 消</el-button>
        <el-button type="primary" @click="edite">确 定</el-button>
      </div>
    </el-dialog>

    <!-- 点击button的对话框 -->
    <el-dialog title="订单详情" :visible.sync="dialogFormVisible">
      <div class="order_div" >
        <div class="row">
          <div class="order_num">订单编号:</div>
          <div class="order_text">{{shopkeeperOrder.orderno}}</div>
        </div>
          <div class="row">
          <div class="order_num">订单号:</div>
          <div class="order_text">{{indenMode.LogisticCode}}</div>
          <div class="order_num">配送公司:</div>
          <div class="order_text">{{indenMode.shipperName}}</div>
        </div>
        <div class="row">
          <div class="order_num">收货人:</div>
          <div class="order_text">{{shopkeeperOrder.username}}</div>
          <div class="order_num">电话:</div>
          <div class="order_text">{{shopkeeperOrder.mobile}}</div>
          <div class="order_num">地址:</div>
          <div class="order_addres">{{shopkeeperOrder.address}}</div>
        </div>
        <div class="row">
          <div class="order_num">物流信息:</div>
        </div>
        <div class="list">
            <el-steps direction="vertical" :active="expressInfo.length" >
                  <div v-for="(item,value) in expressInfo" :key="value"  style="height: 50px;">
                    <el-step :title="item.AcceptStation"></el-step>
                    
                  </div>
                  
                  
            </el-steps>
        </div>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>


<style>
.line{
  width: 2px;
  height: 40px;
  background: red;
}
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
  height: 900px;
}
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
</style>

<script>
import { recordList, recordUpdate,readList } from "@/api/goods";
import { createStorage, uploadPath } from "@/api/storage";
import BackToTop from "@/components/BackToTop";
import Pagination from "@/components/Pagination"; // Secondary package based on el-pagination
import Editor from "@tinymce/tinymce-vue";
import { MessageBox } from "element-ui";
import { getToken } from "@/utils/auth";

export default {
  name: "GoodsList",
  components: { BackToTop, Pagination, Editor },
  data() {
    return {
      options: [{
          value: 'ZTO',
          label: '中通快递'
        }, {
          value: 'STO',
          label: '申通快递'
        }, {
          value: 'YD',
          label: '韵达快递'
        },
         {
          value: 'YTO',
          label: '圆通速递'
        }
        ],
      dialogFormVisible: false,
      uploadPath,
      list: [],
      total: 0,
      listLoading: true,
      textarea: "",
      goodsName: "",
      //   查询参数
      listQuery: {
        page: 1,
        limit: 20,
        username: "",
        type: "",
        states:0
      },
      //   更新参数
      updataList: {
        id: "",
        state: "",
        ordOddnum: "",
        ordIdentification: ""
      },
      editeShow: false,
      downloadLoading: false,

      // 表单遮挡层 属性
      title: "",
      goods: {
        comName: "",
        id: "",
        comIcon: "",
        comPrice: "",
        comNum: "",
        comStock: "",
        comDetails: ""
      },
      shopkeeperOrder:{},
      expressInfo:[],
      formLabelWidth: "200px",
      rules: {
        ordIdentification: [
          { required: true, message: "快递标识不能为空", trigger: "blur" }
        ],
        ordOddnum: [
          { required: true, message: "物流单号不能为空", trigger: "blur" }
        ]
      },
      value: "",
      indenMode:{}
    };
  },
  computed: {
    headers() {
      return {
        "X-Litemall-Admin-Token": getToken()
      };
    }
  },
  created() {
    this.getList();
  },
  methods: {
    // 获取 列表数据
    getList() {
      this.listLoading = true;
      recordList(this.listQuery)
        .then(response => {
          console.log(response.data.data.list);
          this.list = response.data.data.list;
          this.total = response.data.data.total;
          this.listLoading = false;
        })
        .catch(() => {
          this.list = [];
          this.total = 0;
          this.listLoading = false;
        });
    },
    // 编辑 确定
    edite() {
      this.updataList.state = 1;
      this.updataList.remark = this.textarea;

      this.$refs["goodsNum"].validate(valid => {
        if (valid) {
          recordUpdate(this.updataList).then(response => {
            this.getList();
            if (response.data.errno === 0) {
              this.$message({
                message: "恭喜你，发放成功了，哦耶！",
                type: "success"
              });
            } else {
              this.$message.error("发放失败了哦！哦嚯");
            }
            this.editeShow = false;
          });
        }
      });
    },
    // 编辑 取消
    remove() {
      this.editeShow = false;
      this.$message({
        message: "您取消了 发放操作",
        type: "warning"
      });
    },
    // 查找操作
    handleFilter() {
      this.listQuery.page = 1;
      this.listQuery.likeName = this.goodsName;
      this.getList();
    },
    // 点击操作 发放事件
    handleUpdate(row) {
      this.updataList = {};
      this.updataList.id = row.id;
      this.editeShow = true;
      this.title = "是否确定发放";
      
    },
    onbutton(obj) {
      this.dialogFormVisible = true;
      readList({id:obj.id})
        .then(response => {
          this.shopkeeperOrder = response.data.data.shopkeeperOrder;
          this.expressInfo = response.data.data.expressInfo.Traces;
          this.indenMode = response.data.data.expressInfo;
          console.log(this.indenMode)
        })
        .catch((response) => {
            this.$notify.error({
                title: '失败',
                message: response.data.errmsg
              })
        });
    },
    
  }
};
</script>
