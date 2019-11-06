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
      <!-- <el-button v-permission="['GET /admin/rebateSet/list']" class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">查询</el-button> -->
      <el-button v-permission="['POST /admin/rebateSet/create']" class="filter-item" type="primary" icon="el-icon-edit"  @click="findLevel">添加</el-button>
    </div>

    <!-- 查询结果 -->
    <el-table v-loading="listLoading" :data="list" element-loading-text="正在查询中。。。" border fit highlight-current-row>

      <el-table-column align="center" label="ID" prop="id">
      <!-- <template slot-scope="scope">
          <el-tag>{{ levels[scope.row.level] }}</el-tag>
        </template> -->
      </el-table-column>
      <el-table-column align="center" label="授奖励人姓名" prop="userName"/>
      <el-table-column align="center" label="地址" prop="address"/>
      <el-table-column align="center" label="代理奖励百分比" prop="scale"/>
      <el-table-column align="center" label="创建时间" prop="createtime"/>

        <!-- <template slot-scope="scope">
          <img v-for="item in scope.row.picUrls" :key="item" :src="item" width="40">
        </template> -->

    <el-table-column align="center" label="操作" prop="status">
        <template slot-scope="scope">
          <el-button   type="primary" size="mini" @click="findLevel(scope.row)">编辑</el-button>
          <el-button type="danger" size="mini" @click="deleteAgency(scope.row)">删除</el-button>
        </template>
      </el-table-column>
     
    </el-table>

    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />
     
     <!-- 点击添加时的对话框 -->
<el-dialog title="操作" :visible.sync="dialogFormVisible">
  <el-form :model="form">
     <el-form-item label="用户" :label-width="formLabelWidth" >
        <template>
            <el-select v-model="addRebate.userid" placeholder="请选择" :disabled="disFlag">
              <el-option
                v-for="item in userList"
                :key="item.value"
                :label="item.userName"
                :value="item.userid">
              </el-option>
            </el-select>
        </template>
    </el-form-item>
    <el-form-item label="地址" :label-width="formLabelWidth">
        <template>
            <el-select v-model="provinceValue" @change="changePro" placeholder="请选择">
              <el-option
                v-for="item in provinceList"
                :key="item.value"
                :label="item"
                :value="item">
              </el-option>
            </el-select>
        </template>
        <template>
            <el-select v-model="cityValue" placeholder="请选择">
              <el-option
                v-for="item in cityList"
                :key="item.value"
                :label="item"
                :value="item">
              </el-option>
            </el-select>
        </template>

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
import {listRebate,createRebate,findRebate,listUserName} from '@/api/agency'
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
        levels:['普通会员','掌柜','经理','总监'],
        options: [{
          value: '选项1',
          label: '黄金糕'
        }, {
          value: '选项2',
          label: '双皮奶'
        }, {
          value: '选项3',
          label: '蚵仔煎'
        }, {
          value: '选项4',
          label: '龙须面'
        }, {
          value: '选项5',
          label: '北京烤鸭'
        }],
        value: '',
        provinceValue:"",
        cityValue:"",
        provinceList:["北京市","天津市","上海市","重庆市","河北省","山西省","内蒙古",
                      "辽宁省","吉林省","黑龙江省","江苏省","浙江省","安徽省","福建省",
                      "江西省","山东省","河南省","湖北省","湖南省","广东省","广西","海南省",
                      "四川省","贵州省","云南省","西藏","陕西省","甘肃省","青海省","宁夏","新疆",
                      "香港","澳门","台湾省"],//省
        cityDataList:[
        ["东城区","西城区","崇文区","宣武区","朝阳区","丰台区","石景山区","海淀区","门头沟区","房山区","通州区","顺义区","昌平区","大兴区","怀柔区","平谷区","密云县","延庆县","延庆镇"],
        ["和平区","河东区","河西区","南开区","河北区","红桥区","塘沽区","汉沽区","大港区","东丽区","西青区","津南区","北辰区","武清区","宝坻区","蓟县","宁河县","芦台镇","静海县","静海镇"],
        ["黄浦区","卢湾区","徐汇区","长宁区","静安区","普陀区","闸北区","虹口区","杨浦区","闵行区","宝山区","嘉定区","浦东新区","金山区","松江区","青浦区","南汇区","奉贤区","崇明县","城桥镇"],
        ["渝中区","大渡口区","江北区","沙坪坝区","九龙坡区","南岸区","北碚区","万盛区","双桥区","渝北区","巴南区","万州区","涪陵区","黔江区","长寿区","合川市","永川区市","江津市","南川市","綦江县","潼南县","铜梁县","大足县","荣昌县","璧山县","垫江县","武隆县","丰都县","城口县","梁平县","开县","巫溪县","巫山县","奉节县","云阳县","忠县","石柱土家族自治县","彭水苗族土家族自治县","酉阳土家族苗族自治县","秀山土家族苗族自治县"],
        ["石家庄市","张家口市","承德市","秦皇岛市","唐山市","廊坊市","保定市","衡水市","沧州市","邢台市","邯郸市"],
        ["太原市","朔州市","大同市","阳泉市","长治市","晋城市","忻州市","晋中市","临汾市","吕梁市","运城市"],
        ["呼和浩特市","包头市","乌海市","赤峰市","通辽市","呼伦贝尔市","鄂尔多斯市","乌兰察布市","巴彦淖尔市","兴安盟","锡林郭勒盟","阿拉善盟"],
        ["沈阳市","朝阳市","阜新市","铁岭市","抚顺市","本溪市","辽阳市","鞍山市","丹东市","大连市","营口市","盘锦市","锦州市","葫芦岛市"],
        ["长春市","白城市","松原市","吉林市","四平市","辽源市","通化市","白山市","延边州"],
        ["哈尔滨市","齐齐哈尔市","七台河市","黑河市","大庆市","鹤岗市","伊春市","佳木斯市","双鸭山市","鸡西市","牡丹江市","绥化市","大兴安岭地区"],
        ["南京市","徐州市","连云港市","宿迁市","淮安市","盐城市","扬州市","泰州市","南通市","镇江市","常州市","无锡市","苏州市"],
        ["杭州市","湖州市","嘉兴市","舟山市","宁波市","绍兴市","衢州市","金华市","台州市","温州市","丽水市"],
        ["合肥市","宿州市","淮北市","亳州市","阜阳市","蚌埠市","淮南市","滁州市","马鞍山市","芜湖市","铜陵市","安庆市","黄山市","六安市","巢湖市","池州市","宣城市"],
        ["福州市","南平市","莆田市","三明市","泉州市","厦门市","漳州市","龙岩市","宁德市"],
        ["南昌市","九江市","景德镇市","鹰潭市","新余市","萍乡市","赣州市","上饶市","抚州市","宜春市","吉安市"],
        ["济南市","青岛市","聊城市","德州市","东营市","淄博市","潍坊市","烟台市","威海市","日照市","临沂市","枣庄市","济宁市","泰安市","莱芜市","滨州市","菏泽市"],
        ["郑州市","开封市","三门峡市","洛阳市","焦作市","新乡市","鹤壁市","安阳市","濮阳市","商丘市","许昌市","漯河市","平顶山市","南阳市","信阳市","周口市","驻马店市","济源市"],
        ["武汉市","十堰市","襄樊市","荆门市","孝感市","黄冈市","鄂州市","黄石市","咸宁市","荆州市","宜昌市","随州市","省直辖县级行政单位","恩施州"],
        ["长沙市","张家界市","常德市","益阳市","岳阳市","株洲市","湘潭市","衡阳市","郴州市","永州市","邵阳市","怀化市","娄底市","湘西州"],
        ["广州市","深圳市","清远市","韶关市","河源市","梅州市","潮州市","汕头市","揭阳市","汕尾市","惠州市","东莞市","珠海市","中山市","江门市","佛山市","肇庆市","云浮市","阳江市","茂名市","湛江市"],
        ["南宁市","桂林市","柳州市","梧州市","贵港市","玉林市","钦州市","北海市","防城港市","崇左市","百色市","河池市","来宾市","贺州市"],
        ["海口市","三亚市","省直辖行政单位"],
        ["成都市","广元市","绵阳市","德阳市","南充市","广安市","遂宁市","内江市","乐山市","自贡市","泸州市","宜宾市","攀枝花市","巴中市","达州市","资阳市","眉山市","雅安市","阿坝州","甘孜州","凉山州"],
        ["贵阳市","六盘水市","遵义市","安顺市","毕节地区","铜仁地区","黔东南州","黔南州","黔西南州"],
        ["昆明市","曲靖市","玉溪市","保山市","昭通市","丽江市","思茅市","临沧市","德宏州","怒江州","迪庆州","大理州","楚雄州","红河州","文山州","西双版纳州"],
        ["拉萨市","那曲地区","昌都地区","林芝地区","山南地区","日喀则地区","阿里地区"],
        ["西安市","延安市","铜川市","渭南市","咸阳市","宝鸡市","汉中市","榆林市","安康市","商洛市"],
        ["兰州市","嘉峪关市","白银市","天水市","武威市","酒泉市","张掖市","庆阳市","平凉市","定西市","陇南市","临夏州","甘南州"],
        ["西宁市","海东地区","海北州","海南州","黄南州","果洛州","玉树州","海西州"],
        ["银川市","石嘴山市","吴忠市","固原市","中卫市"],
        ["乌鲁木齐市","克拉玛依市","自治区直辖县级行政单位","喀什地区","阿克苏地区","和田地区","吐鲁番地区","哈密地区","克孜勒苏柯州","博尔塔拉州","昌吉州","巴音郭楞州","伊犁州","塔城地区","阿勒泰地区"],
        ["香港特别行政区"],
        ["澳门特别行政区"],
        ["台北","高雄","台中","花莲","基隆","嘉义","金门","连江","苗栗","南投","澎湖","屏东","台东","台南","桃园","新竹","宜兰","云林","彰化"]],//市
        userList:[],//用户
        cityList:[],
        disFlag:false,//判断是否可编辑用户
        acatyId:0,//保存用户Id
    }
  },

  created(){
    this.getList();
  },
 
  methods: {
    //城市联动
    changePro(obj){
        if(obj==null){
          this.cityValue="";
        }
        for(var i = 0 ; i < this.provinceList.length ;i++){
          if(this.provinceValue == this.provinceList[i]){
              this.cityList = this.cityDataList[i]
            break;
          }

        }
       
    },
    queryUserName(){
      listUserName().then(response =>{
                this.userList = response.data.data;
                this.$message({
                    message: response.data.errmsg,
                    type: 'success'
                  });
     
        })
    },
    award1Blur1(e){
      var reg=/\d+(\.\d+)?/;
      if(reg.test(e)){
        this.errorShow1 = false;
      }else{
        this.errorShow1 = true;
      }
    },
    findLevel(obj){
    if(obj.id!=null){
      this.disFlag = true;
      findRebate({id:obj.id}).then(response =>{
              this.addRebate = response.data.data;
              var address = this.addRebate.address.split(",");
              this.provinceValue =  address[0];
              this.cityValue =  address[1];
              this.changePro("不清除城市");
              this.dialogFormVisible=true;
              this.acatyId =  this.addRebate.userid;//保存Id
              this.addRebate.userid = obj.userName;
            })
    }else{
          this.addRebate={};
          this.provinceValue = "";
          this.cityValue = "";
          this.disFlag = false;
          this.queryUserName();
          this.dialogFormVisible=true;
    }
  
    },
    deleteAgency(obj){
        this.addRebate.delete = 1;
        this.addRebate.id = obj.id;
        var msg = "确定删除用户【"+obj.userName+"】, 是否继续?";
        this.$confirm(msg, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          createRebate(this.addRebate).then(response =>{
           this.$message({
              message: response.data.errmsg,
              type: 'success'
            });
          this.dialogFormVisible=false;
          this.getList();
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });




     
      })
    },
    //  确定按钮
    btn(){
      var that = this;
      if(this.addRebate.scale==''){
          return;
      }
      if(this.addRebate.userid==''){
        this.$message.error('请选择用户');
          return;
      }
      if(this.provinceValue==''){
           this.$message.error('请选择省份或者直辖市行政区');
          return;
      }
      if(this.cityValue==''){
           this.$message.error('请选择城市');
          return;
      }
      if(isNaN(this.addRebate.userid)){
        this.addRebate.userid = this.acatyId;
      }
      this.addRebate.address=this.provinceValue+","+this.cityValue;
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
    },
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
