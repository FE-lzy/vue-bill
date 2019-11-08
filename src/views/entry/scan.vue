<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="12">
        <div class="grid-content">
          <!-- <img src="@/assets/404_images/404.png" style="width:100%" /> -->
          <el-input
            type="textarea"
            ref="scanStr"
            :autosize="{ minRows: 2, maxRows: 4}"
            placeholder="请输入内容"
            v-model="textarea3"
          ></el-input>
          <el-button @click="scanQuery">查询</el-button>
        </div>
      </el-col>
      <el-col :span="12">
        <div class="grid-content">
          <h2 class="title">手动输入</h2>

          <el-form
            :model="ruleForm"
            status-icon
            ref="validForm"
            label-width="120px"
            class="demo-ruleForm form-div"
          >
            <el-form-item
              label="发票类型"
              prop="invoiceCode"
              :rules="[
                  { required: true, message: '请输入', trigger: 'blur' },
                ]"
            >
              <el-select v-model="billType" @change="getBillType" placeholder="请选择发票类型">
                <el-option
                  v-for="item in billOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item
              label="发票代码"
              prop="invoiceCode"
              :rules="[
                  { required: true, message: '请输入', trigger: 'blur' },
                ]"
            >
              <el-input type="text" v-model="ruleForm.invoiceCode" placeholder="输入发票代码"></el-input>
            </el-form-item>
            <el-form-item
              label="发票号码"
              prop="invoiceNumber"
              :rules="[
                  { required: true, message: '请输入', trigger: 'blur' },
                ]"
            >
              <el-input type="text" v-model="ruleForm.invoiceNumber" placeholder="输入发票号码"></el-input>
            </el-form-item>
            <el-form-item
              label="开票日期"
              prop="billTime"
              :rules="[
                  { required: true, message: '请输入', trigger: 'blur' },
                ]"
            >
              <el-date-picker
                v-model="ruleForm.billTime"
                type="date"
                placeholder="选择开票日期"
                value-format="yyyy-MM-dd"
              ></el-date-picker>
            </el-form-item>
            <el-form-item
              label="校验码后六位"
              v-if="billType == 1 ? true : false"
              :rules="[
                  { required: true, message: '请输入', trigger: 'blur' },
                ]"
            >
              <el-input v-model="ruleForm.checkCode" placeholder="输入校验码后六位"></el-input>
            </el-form-item>
            <el-form-item
              label="税前金额"
              v-if="billType == 2 ? true : false"
              :rules="[
                  { required: true, message: '请输入', trigger: 'blur' },
                ]"
            >
              <el-input v-model="ruleForm.invoiceAmount" placeholder="输入税前金额"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="submitForm('validForm')">查验</el-button>
            </el-form-item>
          </el-form>
        </div>
      </el-col>
    </el-row>
    <el-dialog title="结果" width="100%" :visible.sync="dialogTableVisible"></el-dialog>
  </div>
</template>

<script>
import { queryData } from "@/api/common";
export default {
  name: "scan",
  data() {
    return {
      ruleForm: {
        invoiceCode: "037001851107",
        invoiceNumber: "01947559",
        billTime: "2019-10-4",
        invoiceAmount: "",
        checkCode: "250185"
      },
      dialogTableVisible: false,
      textarea3: "01,04,1100162350,19452405,66.37,20190425,17832785219143376258,A8CC,\n",
      billType: "",
      billOptions: [
        {
          value: "1",
          label: "普通发票/增值税电子发票/卷式普通发票/电子普通[通行费]发票"
        },
        {
          value: "2",
          label: "xx增值税(机动车/二手车销售发票),专用发票"
        }
      ]
    };
  },
  mounted(){
    this.$refs.scanStr.focus();
  },
  methods: {
    getBillType(val) {
      this.billType = val;
      console.log("发票类型", this.billType);
    },
    submitForm(formName) {
      this.dialogTableVisible = true;
      // this.$refs[formName].validate(valid => {
      //   console.log('123');
      //   if (valid) {
      //     let token = localStorage.getItem("lsToken");
      //     let queryparam = Object.assign(this.ruleForm, { token: token });
      //     console.log(queryparam);
      //     queryData("/bill/queryBillByCode", queryparam, "post").then(res => {
      //       console.log(res);
      //     });
      //   } else {
      //     console.log("error submit!!");
      //     return false;
      //   }
      //   console.log(this.ruleForm);
      // });
    },
    scanQuery() {
      console.log('123');
      this.$router.push({
        name: "结果",
        params: { type: "scan", scanStr: this.textarea3 }
      });
    }
  }
};
</script>

<style>
.title {
  text-align: center;
  padding-top: 30px;
  padding-bottom: 20px;
}
.form-div {
  width: 466px;
  margin: 0 auto;
  border: 1px solid #eee;
  padding: 31px 40px 10px 20px;
  border-radius: 5px;
  background: #fff;
}
.el-row {
  margin-bottom: 20px;
}
.el-col {
  border-radius: 4px;
}
.bg-purple-dark {
  background: #99a9bf;
}
.bg-purple {
  background: #d3dce6;
}
.bg-purple-light {
  background: #e5e9f2;
}
.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}
.el-input__inner {
  width: 304px;
}
</style>