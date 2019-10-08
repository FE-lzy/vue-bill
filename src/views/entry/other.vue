<template>
  <el-form
    :model="ruleForm"
    :rules="rules"
    ref="ruleForm"
    label-width="100px"
    class="demo-ruleForm form-div-inline"
    :label-position="labelPosition"
    :inline="true"
    style="background: #fff;padding: 40px;"
  >
    <el-row :gutter="20">
      <el-col :span="6" :offset="6">
        <el-form-item label="发票代码" prop="code">
          <el-input v-model="ruleForm.code" placeholder="输入发票代码"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="6">
        <el-form-item label="发票号码" prop="number">
          <el-input v-model="ruleForm.number" placeholder="输入发票号码"></el-input>
        </el-form-item>
      </el-col>
    </el-row>

    <el-row :gutter="20">
      <el-col :span="6" :offset="6">
        <el-form-item label="开票日期" prop="date">
          <el-date-picker v-model="ruleForm.date" type="date" placeholder="选择开票日期"></el-date-picker>
        </el-form-item>
      </el-col>
      <el-col :span="6">
        <el-form-item label="价税合计" prop="total">
          <el-input v-model="ruleForm.total" placeholder="输入价税合计"></el-input>
        </el-form-item>
      </el-col>
    </el-row>

    <el-row :gutter="20">
      <el-col :span="6" :offset="6">
        <el-form-item label="费用归属人" prop="name">
          <el-input v-model="ruleForm.name" placeholder="输入费用归属人"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="6">
        <el-form-item label="其他备注">
          <el-input v-model="ruleForm.note" placeholder="输入其他备注"></el-input>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="4" :offset="10">
        <el-button type="primary">录入</el-button>
        <el-button>重置</el-button>
      </el-col>
    </el-row>
  </el-form>
</template>

<script>
export default {
  data() {
    return {
      labelPosition: "top",
      ruleForm: {
        code: "",
        number: "",
        date: "",
        price: "",
        total: "",
        name: "",
        note: ""
      },
      rules: {
        code: [{ required: true, message: "请输入", trigger: "blur" }],
        number: [
          { required: true, message: "输入8位发票号码", trigger: "blur" }
        ],
        date: [
          {
            type: "date",
            required: true,
            message: "请选择日期",
            trigger: "blur"
          }
        ],
        total: [
          {
            required: true,
            message: "请输入",
            trigger: "blur"
          }
        ],
        name: [{ message: "请选择", trigger: "blur" }]
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          alert("submit!");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
};
</script>

<style>
.form-div-inline {
  margin: 40px;
}
.el-form-item__content {
  width: 300px;
}
.el-input__inner {
  width: 300px;
}
</style>