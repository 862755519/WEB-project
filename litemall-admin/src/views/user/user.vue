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
      <el-input
        v-model="listQuery.mobile"
        clearable
        class="filter-item"
        style="width: 200px;"
        placeholder="请输入手机号"
      />
      <el-button class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">查找</el-button>
      <el-button
        :loading="downloadLoading"
        class="filter-item"
        type="primary"
        icon="el-icon-download"
        @click="handleDownload"
      >导出</el-button>
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
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-form label-position="left" class="table-expand">
            <el-form-item label="性别">
              <span>{{ genderDic[props.row.gender] }}</span>
            </el-form-item>
            <el-form-item label="生日">
              <span>{{ props.row.birthday }}</span>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>

      <el-table-column align="center" width="100px" label="用户ID" prop="id" sortable />

      <el-table-column align="center" label="用户名" prop="username" />

      <el-table-column align="center" label="手机号码" prop="mobile" />

      <!-- <el-table-column align="center" label="性别" prop="gender">
        <template slot-scope="scope">
          <el-tag >{{ genderDic[scope.row.gender] }}</el-tag>
        </template>
      </el-table-column>

      <el-table-column align="center" label="生日" prop="birthday"/>-->

      <el-table-column align="center" label="余额" prop="amount" />

      <el-table-column align="center" label="用户等级" prop="membershipRank">
        <template slot-scope="scope">
          <el-tag>{{ levelDic[scope.row.membershipRank] }}</el-tag>
        </template>
      </el-table-column>

      <el-table-column align="center" label="状态" prop="status">
        <template slot-scope="scope">
          <el-tag>{{ statusDic[scope.row.status] }}</el-tag>
        </template>
      </el-table-column>

      <el-table-column align="center" label="操作" prop="status">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="getReadUser(scope.row)">编辑</el-button>
          <el-button type="primary" size="mini" @click="upgradingUser(scope.row)">空升</el-button>
          <el-button
            type="primary"
            size="mini"
            v-show="scope.row.cardStatus==1"
            @click="cardListA(scope.row)"
          >银行卡</el-button>
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

    <el-dialog title="升级" :visible.sync="dialogVisible" width="30%">
      <el-radio v-model="radio" @change="select1" label="1">直接空升</el-radio>
      <el-radio v-model="radio" @change="select1" label="2">赠送名额</el-radio>
      <div class="box1">
         用户名： <el-input v-model="userMode.username" disabled="true"></el-input>
         手机号码： <el-input v-model="userMode.mobile" disabled="true"></el-input>
      </div>
      <div class="box1" v-if="show1">
      
        <div class="demo-input-suffix">
          选择等级
          <el-select v-model="valueLev" placeholder="请选择">
            <el-option
              v-for="item in optionsLev"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </div>
      </div>

      <div class="box1" v-if="show2">
        <el-row :gutter="20">
          <el-col :span="6">
            <div class="grid-content bg-purple">邀约手机号码：</div>
          </el-col>
          <el-col :span="18">
            <div class="grid-content bg-purple">
              <el-input
                class="input"
                placeholder="输入邀约手机号码"
                v-model="inputPhone"
              ></el-input>
            </div>
          </el-col>
        </el-row>
  
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisibleGive(userMode)">确 定</el-button>
      </span>
    </el-dialog>

    <el-dialog ref="dataForm" :title="title" :visible.sync="dialogFormVisible">
      <!-- 查询结果 -->
      <el-table
        v-loading="listLoading"
        :data="cardList"
        element-loading-text="正在查询中。。。"
        border
        fit
        highlight-current-row
      >
        <el-table-column align="center" width="100px" label="用户ID" prop="id" sortable />

        <el-table-column align="center" label="开户行" prop="cardName" />

        <el-table-column align="center" property="cardIcon" label="户行Logo">
          <template slot-scope="scope">
            <img :src="scope.row.cardIcon" width="80" />
          </template>
        </el-table-column>

        <el-table-column align="center" label="持卡人" prop="bcdName" />
        <el-table-column align="center" label="卡号" prop="bcdNum" />
      </el-table>
    </el-dialog>

    <el-dialog ref="dataUpdate" :title="titleUpdate" :visible.sync="dialogFormVisibleUpdate">
      <!-- 查询结果 -->

      <el-form
        ref="replyForm"
        status-icon
        label-position="left"
        label-width="100px"
        style="width: 400px; margin-left:50px;"
      >
        <el-form-item label="用户名称:" prop="content">
          <el-input v-model="userMode.username" disabled="true"></el-input>
        </el-form-item>
        
        <!-- <el-form-item label="等级选择:" prop="content">
          <el-select v-model="value" @change="chageUpdate(value)" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item> -->
        <el-form-item label="充值金额:" prop="amount">
          <el-input v-model="amount" type="number" placeholder="0">
            <template slot="append">元</template>
          </el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisibleUpdate = false">取消</el-button>
        <el-button type="primary" @click="clickUser">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<style>
.input {
  
}
.box1 {
  margin-top: 20px;
}
.box {
  width: 200px;
  height: 20px;
  border: 1px solid #ccc;
}
.drop_s {
  /* border: 1px solid #ccc; */
  width: 100px;
  text-align: center;
  margin-right: 20px;
  margin-left: 30px;
}
.el-dropdown-link {
  cursor: pointer;
  color: #409eff;
}
.el-icon-arrow-down {
  font-size: 12px;
}
</style>

<script>
/* eslint-disable */
import { fetchList, fetchCardList, readUser, updateUser,upCause,upCommerceChamber,upOperationCenter,findByMobie,giveQuota} from "@/api/user";
import Pagination from "@/components/Pagination"; // Secondary package based on el-pagination
import { log } from "util";
import { Message } from "element-ui";

export default {
  name: "User",
  components: { Pagination },
  data() {
    return {
      valueLev: "1",
      optionsLev: [
        {
          value: "1",
          label: "事业合伙人"
        },
        {
          value: "2",
          label: "华商汇合伙人"
        },
        {
          value: "3",
          label: "运营中心"
        }
      ],
      inputPhone:'',
      value: "",
      show1: true,
      show2: false,
      dialogVisible: false,
      radio: "1",
      dialogFormVisible: false,
      title: "详细信息",
      list: null,
      cardList: null,
      total: 0,
      listLoading: true,
      listQuery: {
        page: 1,
        limit: 20,
        username: undefined,
        mobile: undefined,
        sort: "add_time",
        order: "desc"
      },
      downloadLoading: false,
      genderDic: ["未知", "男", "女"],
      levelDic: ["普通用户", "事业合伙人", "华商汇合伙人", "运营中心"],
      statusDic: ["可用", "禁用", "注销"],
      statusCard: ["未绑定银行卡", "绑定银行卡"],
      options: [
        {
          value: "0",
          label: "普通用户"
        },
        {
          value: "1",
          label: "掌柜"
        },
        {
          value: "2",
          label: "经理"
        },
        {
          value: "3",
          label: "总监"
        },
        {
          value: "4",
          label: "市代"
        }
      ],
      value: "",
      titleUpdate: "编辑",
      dialogFormVisibleUpdate: false,
      userMode: {},
      amount: 0
    };
  },
  created() {
    this.getList();
  },
  methods: {
    getList() {
      this.listLoading = true;
      fetchList(this.listQuery)
        .then(response => {
          this.list = response.data.data.list;
          console.log(this.list);
          this.total = response.data.data.total;
          this.listLoading = false;
        })
        .catch(() => {
          this.list = [];
          this.total = 0;
          this.listLoading = false;
        });
    },
    //完成升级
    dialogVisibleGive(obj){
      if(this.show1){
        switch(this.valueLev){
          case "1":
              this.upCause(obj);
          break
          case "2":
              this.upCommerceChamber(obj);
          break
          case "3":
            this.upOperationCenter(obj)
          break
        }
      }

      if(this.show2){
        this.findByMobie(obj);
      }
     
    },
    upCause(obj) {
      var that = this;
      upCause({ usId: obj.id })
        .then(response => {
            that.$message({
              showClose: true,
              message: response.data.errmsg,
              type: "success"
            });
            this.getList();
             this.dialogVisible = false
        })
        .catch((res) => {
         that.$message({
            showClose: true,
            message: res.data.errmsg,
            type: "error"
          });
        });
    },
    giveQuota(obj) {
      var that = this;
      giveQuota({ usId: obj.id,mobile:obj.mobile})
        .then(response => {
            that.$message({
              showClose: true,
              message: response.data.errmsg,
              type: "success"
            });
            this.getList();
            this.dialogVisible = false
        })
        .catch((res) => {
         that.$message({
            showClose: true,
            message: res.data.errmsg,
            type: "error"
          });
        });
    },
    findByMobie(obj) {
      var that = this;
      findByMobie({ mobile: this.inputPhone })
        .then(response => {
            var dataMoel = response.data.data;
            that.$alert('您确定绑定的用户昵称为【'+dataMoel.nickname+'】电话号码为：'+this.inputPhone, '提示', {
            confirmButtonText: '确定',
            callback: action => {
                obj.mobile = that.inputPhone;
                that.giveQuota(obj);
            }
          });
        })
        .catch((res) => {
         that.$message({
            showClose: true,
            message: res.data.errmsg,
            type: "error"
          });
        });
    },
    upCommerceChamber(obj) {
      var that = this;
      upCommerceChamber({ usId: obj.id })
        .then(response => {
            that.$message({
              showClose: true,
              message: response.data.errmsg,
              type: "success"
            });
            this.getList();
             this.dialogVisible = false
        })
        .catch((res) => {
         that.$message({
            showClose: true,
            message: res.data.errmsg,
            type: "error"
          });
        });
    },
    upOperationCenter(obj) {
      var that = this;
      upOperationCenter({ usId: obj.id })
        .then(response => {
            that.$message({
              showClose: true,
              message: response.data.errmsg,
              type: "success"
            });
            this.getList();
             this.dialogVisible = false
        })
        .catch((res) => {
         that.$message({
            showClose: true,
            message: res.data.errmsg,
            type: "error"
          });
        });
    },
    //空升操作
    upgradingUser(obj) {
      readUser({ id: obj.id })
        .then(response => {
          this.userMode = response.data.data;
          this.value = this.levelDic[this.userMode.userLevel];
          console.log(this.userMode);
            this.dialogVisible = true;
          this.$nextTick(() => {});
        })
        .catch(() => {});
    },
    select1() {
      this.show1 = !this.show1;
      this.show2 = !this.show2;
    },
    getCardList(id) {
      fetchCardList(id)
        .then(response => {
          this.cardList = response.data.data;
          this.dialogFormVisible = true;
          this.$nextTick(() => {});
          console.log(this.cardList);
        })
        .catch(() => {
          this.cardList = [];
        });
    },
    getReadUser(obj) {
      this.amount = 0;
      readUser({ id: obj.id })
        .then(response => {
          this.userMode = response.data.data;
          this.value = this.levelDic[this.userMode.userLevel];
          console.log(this.userMode);
          this.dialogFormVisibleUpdate = true;
          this.$nextTick(() => {});
        })
        .catch(() => {});
    },
    clickUser() {
      var adminId = window.localStorage.getItem("adminId");
      var that = this;
      var amountM = parseFloat(this.userMode.amount) + parseFloat(this.amount);
      this.userMode.amount = amountM;
      this.userMode.amountEnd = this.amount;
      this.userMode.adminId = adminId;
      updateUser(this.userMode)
        .then(response => {
          if (response.data.errno == 0) {
            that.$message({
              showClose: true,
              message: response.data.errmsg,
              type: "success"
            });
          }
          that.getList();
          that.dialogFormVisibleUpdate = false;
          that.$nextTick(() => {});
        })
        .catch(response => {
          that.$message({
            showClose: true,
            message: response.data.errmsg,
            type: "error"
          });
          that.getList();
        });
    },
    chageUpdate(value) {
      this.userMode.userLevel = value;
    },
    cardListA(id) {
      this.getCardList({ uid: id.id });
    },
    handleFilter() {
      this.listQuery.page = 1;
      this.getList();
    },
    handleDownload() {
      this.downloadLoading = true;
      import("@/vendor/Export2Excel").then(excel => {
        const tHeader = ["用户名", "手机号码", "性别", "生日", "状态"];
        const filterVal = [
          "username",
          "mobile",
          "gender",
          "birthday",
          "status"
        ];
        excel.export_json_to_excel2(tHeader, this.list, filterVal, "用户信息");
        this.downloadLoading = false;
      });
    }
  }
};
</script>
