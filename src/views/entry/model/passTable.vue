<template>
  <div class="content">
    <div class="left">
      <div class="top">
        <h3>发票查验明细</h3>
        <p class="billTitle" style="text-align:center">{{ bill.invoiceTypeName }}</p>
        <div class="billinfo">
          <span>
            发票代码：
            <span class="purple">{{ bill.invoiceDataCode }}</span>
          </span>
          <span>
            发票号码：
            <span class="purple">{{ bill.invoiceNumber }}</span>
          </span>
          <span>
            开票日期：
            <span class="purple">{{ bill.billingTime }}</span>
          </span>
          <span>
            校验码：
            <span class="purple">{{ bill.checkCode }}</span>
          </span>
          <span>
            机器编号：
            <span class="purple">{{ bill.taxDiskCode }}</span>
          </span>
        </div>
      </div>

      <div class="box">
        <el-row type="flex" style="border: 1px solid #ccc">
          <el-col :span="1">
            <div class="topTitle" style="border-right:1px solid #ccc">
              购
              <br>买
              <br>方
            </div>
          </el-col>
          <el-col :span="16" style="border-right:1px solid #ccc">
            <div class="buyDetail">
              <el-row>
                <el-col :span="6">名称：</el-col>
                <el-col :span="18" class="purple">{{ bill.purchaserName }}</el-col>
              </el-row>
              <el-row>
                <el-col :span="6">纳税人识别号：</el-col>
                <el-col :span="18" class="purple">{{ bill.taxpayerNumber }}</el-col>
              </el-row>
              <el-row>
                <el-col :span="6">地址、电话：</el-col>
                <el-col :span="18" />
              </el-row>
              <el-row>
                <el-col :span="6">开户行及账号：</el-col>
                <el-col :span="18" />
              </el-row>
            </div>
          </el-col>
          <el-col :span="1">
            <div class="topTitle" style="border-right:1px solid #ccc">
              密
              <br>码
              <br>区
            </div>
          </el-col>
          <el-col :span="6" style="height:100%">
            <div />
          </el-col>
        </el-row>
        <br>
        <el-row type="flex" style="margin-top:-15px;" class="goodsDetail">
          <el-col :span="5">
            <el-row>
              <el-col>货物或应税劳务、服务名称</el-col>
            </el-row>
          </el-col>
          <el-col :span="3">
            <el-row>
              <el-col>车牌号</el-col>
            </el-row>
          </el-col>
          <el-col :span="4">
            <el-row>
              <el-col>通行日期起</el-col>
            </el-row>
          </el-col>
          <el-col :span="4">
            <el-row>
              <el-col>通行日期止</el-col>
            </el-row>
          </el-col>
          <el-col :span="3">
            <el-row>
              <el-col>金额</el-col>
            </el-row>
          </el-col>
          <el-col :span="1">
            <el-row>
              <el-col>税率</el-col>
            </el-row>
          </el-col>
          <el-col :span="4">
            <el-row>
              <el-col>税额</el-col>
            </el-row>
          </el-col>
        </el-row>
        <el-row v-for="item in bill.detailData" type="flex" class="goodsDetail">
          <el-col :span="5">
            <el-row>
              <el-col class="purple">{{ item.goodserviceName }}</el-col>
            </el-row>
          </el-col>
          <el-col :span="3">
            <el-row>
              <el-col class="purple">{{ item.plateNo }}</el-col>
            </el-row>
          </el-col>
          <el-col :span="4">
            <el-row>
              <el-col class="purple">{{ item.passStartDate }}</el-col>
            </el-row>
          </el-col>
          <el-col :span="4">
            <el-row>
              <el-col class="purple">{{ item.passEndDate }}</el-col>
            </el-row>
          </el-col>
          <el-col :span="4">
            <el-row>
              <el-col class="purple">{{ item.sum }}</el-col>
            </el-row>
          </el-col>
          <el-col :span="1">
            <el-row>
              <el-col class="purple">{{ item.taxRate }}</el-col>
            </el-row>
          </el-col>
          <el-col :span="4">
            <el-row>
              <el-col class="purple">{{ item.tax }}</el-col>
            </el-row>
          </el-col>
        </el-row>
        <el-row type="flex" class="goodsDetail">
          <el-col :span="5">
            <el-row>
              <el-col>合计</el-col>
            </el-row>
          </el-col>
          <el-col :span="3">
            <el-row>
              <el-col />
            </el-row>
          </el-col>
          <el-col :span="2">
            <el-row>
              <el-col />
            </el-row>
          </el-col>
          <el-col :span="2">
            <el-row>
              <el-col />
            </el-row>
          </el-col>
          <el-col :span="3">
            <el-row>
              <el-col />
            </el-row>
          </el-col>
          <el-col :span="4">
            <el-row>
              <el-col class="purple">￥{{ bill.totalAmount }}</el-col>
            </el-row>
          </el-col>
          <el-col :span="1">
            <el-row>
              <el-col />
            </el-row>
          </el-col>
          <el-col :span="4">
            <el-row>
              <el-col class="purple">￥{{ bill.totalTaxNum }}</el-col>
            </el-row>
          </el-col>
        </el-row>
        <el-row
          type="flex"
          style="border: 1px solid #ccc;height:40px;line-height:40px;text-align:center"
        >
          <el-col :span="5" style="border-right:1px solid #ccc">价格合计(大写)</el-col>
          <el-col :span="10" class="purple">六百五十体验版</el-col>
          <el-col :span="9">
            (小写)
            <span class="purple">￥{{ bill.totalTaxSum }}</span>
          </el-col>
        </el-row>
        <el-row type="flex" style="border: 1px solid #ccc">
          <el-col :span="1" style="border-right:1px solid #ccc">
            <div class="topTitle">
              销
              <br>售
              <br>方
            </div>
          </el-col>
          <el-col :span="16" style="border-right:1px solid #ccc">
            <div class="buyDetail">
              <el-row>
                <el-col :span="6">名称：</el-col>
                <el-col :span="18" class="purple">{{ bill.salesName }}</el-col>
              </el-row>
              <el-row>
                <el-col :span="6">纳税人识别号：</el-col>
                <el-col :span="18" class="purple">{{ bill.salesTaxpayerNum }}</el-col>
              </el-row>
              <el-row>
                <el-col :span="6">地址、电话：</el-col>
                <el-col :span="18" class="purple">{{ bill.salesTaxpayerAddress }}</el-col>
              </el-row>
              <el-row>
                <el-col :span="6">开户行及账号：</el-col>
                <el-col :span="18" class="purple">{{ bill.salesTaxpayerBankAccount }}</el-col>
              </el-row>
            </div>
          </el-col>
          <el-col :span="1">
            <div class="topTitle" style="border-right:1px solid #ccc">
              备
              <br>注
              <br>区
            </div>
          </el-col>
          <el-col :span="6" style="height:100%">
            <div class="purple">{{ bill.invoiceRemarks }}</div>
          </el-col>
        </el-row>
      </div>
    </div>

    <div class="right">
      <el-form ref="validForm" :label-position="labelPosition" label-width="120px" :model="form">
        <h2 style="text-align:center">发票录入</h2>
        <el-form-item
          label="发票归属部门"
          :rules="[
            { required: true, message: '请输入', trigger: 'blur' },
          ]"
        >
          <el-select v-model="form.fp_gsbm" filterable placeholder="所在部门">
            <el-option v-for="item in bmOptions" :key="item.id" :label="item.bmmc" :value="item.id" />
          </el-select>
        </el-form-item>
        <el-form-item
          label="发票归属人"
          :rules="[
            { required: true, message: '请输入', trigger: 'blur' },
          ]"
        >
          <el-select v-model="form.fp_gsr" filterable placeholder="发票归属人">
            <el-option
              v-for="item in userOptions"
              :key="item.id"
              :label="item.zymc"
              :value="item.id"
            />
          </el-select>
        </el-form-item>

        <el-form-item label="备注">
          <el-input v-model="form.fp_bz" type="textarea" :rows="2" placeholder="请输入内容" />
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
const dwbm = { dwbm: localStorage.getItem('dwbm') }
import { queryData } from '@/api/common'
export default {
  name: 'Bill',
  data() {
    return {
      labelPosition: 'right',
      form: {
        fp_gsr: '',
        fp_gsbm: '',
        fp_bz: ''
      },
      billResJSON: '',
      bill: {
        invoiceTypeName: '',
        invoiceDataCode: '', // 开票代码
        invoiceNumber: '', // 开票号码
        billingTime: '', // 开票时间
        checkCode: '', // 校验码
        taxDiskCode: '', // 机器编号
        purchaserName: '', // 名称
        taxpayerNumber: '', // 纳税人识别号
        salesName: '', // 销方名称
        salesTaxpayerNum: '', // 销方纳税人识别号
        salesTaxpayerBankAccount: '', // 销方银行账户
        salesTaxpayerAddress: '', // 销方地址
        totalTaxNum: '', // 税额
        totalTaxSum: '', // 价格总计
        totalAmount: '', // 不含税价(金额)
        invoiceRemarks: '', // 备注
        detailData: [
          {}
        ]
      },
      bmOptions: [],
      userOptions: []
    }
  },
  beforeMount() {
    if (!this.$route.params.scanStr) {
      this.$message.error('请先验证发票')
      this.$router.go(-1)
      return
    }
    this.getAllUser()
    this.getAllBm()
  },
  mounted() {
    this.handleBillInfo()
    this.handleUserInfo()
  },
  methods: {
    backJump() {
      this.$router.go(-1)
    },
    getAllBm() {
      const param = { dwbm: localStorage.getItem('dwbm') }
      queryData('/manager/queryAllBm', param, 'POST').then(res => {
        if (res.code == 0) {
          this.bmOptions = res.data.data
        }
      })
    },
    getAllUser() {
      const param = {
        dwbm: localStorage.getItem('dwbm'),
        bmbm: this.form.fp_gsbm
      }
      queryData('/manager/queryAllUser', param, 'POST').then(res => {
        if (res.code == 0) {
          this.userOptions = res.data
        }
      })
    },

    handleBillInfo() {
      if (this.$route.params.scanStr) {
        let detail = this.$route.params.scanStr
        if (this.$route.params.isHave) {
          this.$message.warning('发票已存在，请勿重复录入')
          detail = this.$route.params.scanStr.fp_detail.fp_detail
        }
        this.billResJSON = detail
        console.log('table:', detail)
        detail = JSON.parse(detail)
        this.bill.invoiceTypeName = detail.invoiceTypeName
        this.bill.invoiceDataCode = detail.invoiceDataCode // 发票代码
        this.bill.invoiceNumber = detail.invoiceNumber // 发票号码
        this.bill.billingTime = detail.billingTime // 开票时间
        this.bill.checkCode = detail.checkCode // 校验码
        this.bill.taxDiskCode = detail.taxDiskCode // 机器编号
        this.bill.purchaserName = detail.purchaserName // 名称
        this.bill.taxpayerNumber = detail.taxpayerNumber // 纳税人识别号

        this.bill.salesName = detail.salesName // 销方名称
        this.bill.salesTaxpayerNum = detail.salesTaxpayerNum // 销方纳税人识别号
        this.bill.salesTaxpayerBankAccount = detail.salesTaxpayerBankAccount // 销方银行账户
        this.bill.salesTaxpayerAddress = detail.salesTaxpayerAddress // 销方地址

        this.bill.totalTaxNum = detail.totalTaxNum
        this.bill.totalTaxSum = detail.totalTaxSum
        this.bill.totalAmount = detail.totalAmount
        this.bill.invoiceRemarks = detail.invoiceRemarks
        this.bill.detailData = detail.invoiceDetailData
      }
    },
    handleUserInfo() {
      if (this.$route.params.isHave) {
        const data = this.$route.params.scanStr
        console.log(data.fp_gsr)
        if (data.fp_gsr) {
          this.form.fp_gsr = data.fp_gsr
          this.form.fp_gsbm = data.fp_gsbm
          this.form.fp_bz = data.fp_bz
        }
      }
    },
    saveBill(formName) {
      console.log(formName)
      // 判断是否空对象 console.log(Object.keys(this.billResJSON).length);
      if (this.billResJSON == '') {
        this.$message.error('发票信息为空,请先验证发票')
        return
      }
      this.$refs[formName].validate(valid => {
        if (valid) {
          const param = Object.assign(
            this.form,
            { billInfo: this.billResJSON },
            { uid: localStorage.getItem('userId') },
            dwbm
          )
          console.log(param)
          queryData('/bill/saveBill', param, 'POST').then(res => {
            if (res.code == 0) {
              this.$message.success('操作成功')
              this.$router.go(-1)
            } else {
              this.$message.error(res.message)
            }
          })
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.purple {
  color: rgb(114, 66, 114);
}
.content {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
}
.left {
  padding: 10px;
  width: 60%;
  min-width: 820px;
}
.right {
  padding: 10px;
  width: 35%;
  .el-textarea {
    width: 80% !important;
  }
}
.el-form {
  border-radius: 2px;
  padding: 30px;
}
.el-select{
  width: 80% !important;
}
.el-textarea{
  width: 80% !important;
}
// .el-input--medium .el-input__inner {
//   width: 100%;
// }
.el-col {
  border-radius: 0;
}
.top {
  .billTitle {
    text-align: center;
    font-size: 20px;
    color: blue;
    font-weight: 400;
  }
  .billinfo {
    font-size: 13px;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
  }
  .titlebox {
    padding: 10px;
    background: #42b983;
    font-size: 14px;
    color: #fff;
  }
}

.box {
  width: 100%;
  font-size: 13px;
  .el-row {
    margin-bottom: 0 !important;
  }
  .buyDetail .el-row {
    line-height: 30px;
  }
  .goodsDetail {
    height: auto;
    border-left: 1px solid #ccc;
    border-right: 1px solid #ccc;
  }
  .goodsDetail .el-row {
    text-align: center;
    line-height: 30px;
    // border-bottom: 1px solid #ddd;
  }
  .topTitle {
    line-height: 39px;
    vertical-align: middle;
    text-align: center;
    height: 100%;
  }
  .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }
}
</style>
