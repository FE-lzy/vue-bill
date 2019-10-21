<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="12">
        <div class="grid-content bg-purple">
          <img src="@/assets/404_images/404.png" style="width:100%" />
          <el-input
            type="textarea"
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
            label-width="100px"
            class="demo-ruleForm form-div"
          >
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
            <el-form-item label="税前金额">
              <el-input v-model.number="ruleForm.invoiceAmount" placeholder="输入税前金额"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="submitForm('validForm')">查验</el-button>
            </el-form-item>
          </el-form>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { queryData } from "@/api/common";
export default {
  name: "scan",
  data() {
    return {
      ruleForm: {
        invoiceCode: "",
        invoiceNumber: "",
        billTime: "",
        invoiceAmount: "",
        checkCode: "250185"
      },
      textarea3:''
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          let token = localStorage.getItem("token");
          let queryparam = Object.assign(this.ruleForm, { token: token });
          console.log(queryparam);
          queryData("/queryBill", "post", queryparam).then(res => {
            console.log(res);
          });
        } else {
          console.log("error submit!!");
          return false;
        }
        console.log(this.ruleForm);
      });
    },
    scanQuery(){
      let queryparam = {
        scanStr:this.textarea3,
        token:localStorage.getItem("token")
      }
      queryData("/queryBillByScan", "post", queryparam).then(res => {
            console.log(res);
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