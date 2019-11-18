<template>
  <div class="content">
    <div class="left">
      <div class="toptitle">
        <div>{{bill.invoiceTypeName}}</div>
        <span>{{bill.tollSignName}}</span>
      </div>
      <!-- 1 -->
      <div class="flexCon">
        <div>价格</div>
        <span>￥{{bill.totalAmount}}</span>
      </div>
      <div class="flexCon">
        <div>税额</div>
        <span>￥{{bill.totalTaxNum}}</span>
      </div>
      <div class="flexCon blue">
        <div>价格合计</div>
        <span>￥{{bill.totalTaxSum}}</span>
      </div>
      <div class="br"></div>
      <!-- 2 -->
      <div class="flexCon">
        <div>发票代码</div>
        <span>{{bill.invoiceDataCode}}</span>
      </div>
      <div class="flexCon">
        <div>发票号码</div>
        <span>{{bill.invoiceNumber}}</span>
      </div>
      <div class="flexCon">
        <div>开票日期</div>
        <span>{{bill.billingTime}}</span>
      </div>
      <div class="flexCon">
        <div>校验码</div>
        <span>{{bill.checkCode}}</span>
      </div>
      <div class="br"></div>
      <!-- 3 -->
      <div class="flexCon">
        <div>销售方</div>
        <span>{{bill.salesName}}</span>
      </div>
      <div class="flexCon">
        <div>纳税人识别号</div>
        <span>{{bill.salesTaxpayerNum}}</span>
      </div>
      <div class="flexCon">
        <div>地址、电话</div>
        <span>{{bill.salesTaxpayerAddress}}</span>
      </div>
      <div class="flexCon">
        <div>开户行及账号</div>
        <span>{{bill.salesTaxpayerBankAccount}}</span>
      </div>
      <div class="br"></div>
      <!-- 4 -->
      <div class="flexCon red">
        <div>购买方</div>
        <span>{{bill.purchaserName}}</span>
      </div>
      <div class="flexCon red">
        <div>纳税人识别号</div>
        <span>{{bill.taxpayerNumber}}</span>
      </div>
      <div class="flexCon">
        <div>地址、电话</div>
        <span>{{bill.taxpayerAddressOrId}}</span>
      </div>
      <div class="flexCon">
        <div>开户行及账号</div>
        <span>{{bill.taxpayerBankAccount}}</span>
      </div>
    </div>
    <div class="middle">
      <div>详情</div>
      <div class="br"></div>
      <el-row class="detailTitle">
        <el-col :span="10">货物或应税劳务、服务</el-col>
        <el-col :span="4">单价(元)</el-col>
        <el-col :span="4">数量</el-col>
        <el-col :span="3">金额(元)</el-col>
        <el-col :span="3">税额(元)</el-col>
      </el-row>
      <el-row v-for="item in bill.detailData">
        <el-col :span="10">{{item.goodserviceName}}</el-col>
        <el-col :span="4">￥{{item.price | numFilter}}</el-col>
        <el-col :span="4">{{item.number | numFilter}}</el-col>
        <el-col :span="3">{{item.sum}}</el-col>
        <el-col :span="3">{{item.tax}}</el-col>
      </el-row>
      <el-row class="detailSum">
        <el-col :span="10">价格合计</el-col>
        <el-col :span="11">/</el-col>
        <el-col :span="3">${{bill.totalTaxSum}}</el-col>
      </el-row>
      <div class="br"></div>
      <div>备注</div>
      <div class="note">{{bill.invoiceRemarks}}</div>
    </div>
    <div class="right">
      <el-form
        style="width:60%;min-width:500px;"
        ref="validForm"
        :label-position="labelPosition"
        label-width="120px"
        :model="form"
      >
        <h2 style="text-align:center">发票录入</h2>
        <el-form-item
          label="发票归属部门"
          :rules="[
                  { required: true, message: '请输入', trigger: 'blur' },
                ]"
        >
          <el-select filterable v-model="form.fp_gsbm" placeholder="所在部门">
            <el-option v-for="item in bmOptions" :key="item.id" :label="item.bmmc" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item
          label="发票归属人"
          :rules="[
                  { required: true, message: '请输入', trigger: 'blur' },
                ]"
        >
          <el-select filterable v-model="form.fp_gsr" placeholder="发票归属人">
            <el-option
              v-for="item in userOptions"
              :key="item.id"
              :label="item.zymc"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="备注">
          <el-input type="textarea" :rows="2" placeholder="请输入内容" v-model="form.fp_bz"></el-input>
        </el-form-item>
        <div style="text-align:center">
          <el-button type="primary" @click="saveBill('validForm')">录入</el-button>
          <el-button @click="backJump">返回</el-button>
        </div>
      </el-form>
    </div>
  </div>
</template>

<script>
const dwbm = { dwbm: localStorage.getItem("dwbm") };
import { queryData } from "@/api/common";
export default {
  name: "volume",
  data() {
    return {
      labelPosition: "right",
      form: {
        fp_gsr: "",
        fp_gsbm: "",
        fp_bz: ""
      },
      bill:{

      },
      bmOptions: [],
      userOptions: []
    };
  },

filters: {
  numFilter (value) {
    let realVal = ''
    if (value) {
      // 截取当前数据到小数点后两位
      realVal = parseFloat(value).toFixed(2)
    } else {
      realVal = '--'
    }
    return realVal
  },
},
  beforeMount() {
    if (!this.$route.params.scanStr) {
      this.$message.error("请先验证发票");
      this.$router.go(-1);
      return;
    }
    this.getAllUser();
    this.getAllBm();
  },
  mounted() {
    this.handleBillInfo();
    this.handleUserInfo();
  },
  methods: {
    backJump() {
      this.$router.go(-1);
    },
    getAllBm() {
      let param = { dwbm: localStorage.getItem("dwbm") };
      queryData("/manager/queryAllBm", param, "POST").then(res => {
        if (res.code == 0) {
          this.bmOptions = res.data.data;
        }
      });
    },
    getAllUser() {
      let param = {
        dwbm: localStorage.getItem("dwbm"),
        bmbm: this.form.fp_gsbm
      };
      queryData("/manager/queryAllUser", param, "POST").then(res => {
        if (res.code == 0) {
          this.userOptions = res.data;
        }
      });
    },
    handleBillInfo() {
      if (this.$route.params.scanStr) {
          let detail = this.$route.params.scanStr;
        if (this.$route.params.isHave) {
          this.$message.warning("发票已存在，请勿重复录入");
           detail = this.$route.params.scanStr.fp_detail.fp_detail;
        }
        this.billResJSON = detail;
        detail = JSON.parse(detail);
        this.bill.invoiceTypeName = detail.invoiceTypeName;
        this.bill.invoiceDataCode = detail.invoiceDataCode; //发票代码
        this.bill.invoiceNumber = detail.invoiceNumber; //发票号码
        this.bill.billingTime = detail.billingTime; // 开票时间
        this.bill.checkCode = detail.checkCode; //校验码
        this.bill.taxDiskCode = detail.taxDiskCode; //机器编号
        this.bill.purchaserName = detail.purchaserName; //名称
        this.bill.taxpayerNumber = detail.taxpayerNumber; //纳税人识别号

        this.bill.salesName = detail.salesName; //销方名称
        this.bill.salesTaxpayerNum = detail.salesTaxpayerNum; //销方纳税人识别号
        this.bill.salesTaxpayerBankAccount = detail.salesTaxpayerBankAccount; //销方银行账户
        this.bill.salesTaxpayerAddress = detail.salesTaxpayerAddress; //销方地址

        this.bill.totalTaxNum = detail.totalTaxNum;
        this.bill.totalTaxSum = detail.totalTaxSum;
        this.bill.totalAmount = detail.totalAmount;
        this.bill.invoiceRemarks = detail.invoiceRemarks;
        this.bill.detailData = detail.invoiceDetailData;
      }
    },
    handleUserInfo() {
      if (this.$route.params.isHave) {
        let data = this.$route.params.scanStr;
        console.log(data.fp_gsr);
        if (data.fp_gsr) {
          this.form.fp_gsr = data.fp_gsr;
          this.form.fp_gsbm = data.fp_gsbm;
          this.form.fp_bz = data.fp_bz;
        }
      }
    },
    saveBill(formName) {
      console.log(formName);
      //判断是否空对象 console.log(Object.keys(this.billResJSON).length);
      if (this.billResJSON == "" || this.billResJSON == undefined) {
        this.$message.error("发票信息为空,请先验证发票");
        return;
      }
      this.$refs[formName].validate(valid => {
        if (valid) {
          let param = Object.assign(
            this.form,
            { billInfo: this.billResJSON },
            { uid: localStorage.getItem("userId") },
            dwbm
          );
          console.log(param);
          queryData("/bill/saveBill", param, "POST").then(res => {
            if (res.code == 0) {
              this.$message.success("操作成功");
               this.$router.go(-1);
            } else {
              this.$message.error(res.message);
            }
          });
        }
      });
    }

  }
};
</script>

<style lang="scss" scoped>
.content {
  display: flex;
  justify-content: space-around;
  // flex-wrap: wrap;
  padding: 30px;
}
.left {
  padding: 10px;
  // min-width: 400px;
  background: #fff;
  border: 1px solid #eee;
}
.middle {
  padding: 23px;
  // min-width: 400px;
  background: #fff;
  border: 1px solid #eee;
  .el-row {
    margin: 15px;
    text-align: center;
  }
  .detailTitle {
    color: #3d3b3b;
  }
  .detailSum {
    color: blue;
  }
  .note {
    padding: 20px;
  }
  .el-form-item__content {
    width: 100%;
  }
}
.right {
  padding: 10px;
  // min-width: 300px;
}
.el-select{
  width: 80% !important;
}
.el-textarea{
  width: 80% !important;
}
.toptitle {
  text-align: center;
  margin: 20px;
  div {
    font-size: 24px;
    color: yellowgreen;
    margin: 10px;
    border-bottom: 6px double yellowgreen;
  }
  span {
    color: red;
    display: inline-block;
  }
}
.blue {
  div,
  span {
    color: blue !important;
  }
  font-size: 16px;
}
.red {
  div,
  span {
    color: red !important;
  }
  font-size: 16px;
}
.br {
  border: 1px dashed #eee;
  margin-top: 10px;
  margin-bottom: 10px;
}
.flexCon {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin: 8px;
  div {
    color: #555;
  }
  span {
    color: #444;
    width: 240px;
    text-align: right;
  }
}
</style>