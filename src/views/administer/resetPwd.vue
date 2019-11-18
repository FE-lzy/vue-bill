<template>
  <div class="content">
    <el-form
      :model="ruleForm"
      :rules="rules"
      ref="ruleForm"
      label-width="100px"
      class="demo-ruleForm"
    >
      <el-form-item label="旧密码" prop="oldpwd">
        <el-input v-model="ruleForm.oldpwd" type="password"></el-input>
      </el-form-item>
      <el-form-item label="新密码" prop="newpwd">
        <el-input v-model="ruleForm.newpwd" type="password"></el-input>
      </el-form-item>
      <el-form-item label="新密码" prop="renewpwd">
        <el-input v-model="ruleForm.renewpwd" type="password"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">修改</el-button>
        <el-button @click="resetForm('ruleForm')">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { queryData } from "../../api/common";
export default {
  name: "resetPwd",
  data() {
    return {
      ruleForm: {
        oldpwd: "",
        newpwd: "",
        renewpwd: ""
      },
      rules: {
        oldpwd: [{ required: true, message: "请输入", trigger: "blur" }],
        newpwd: [{ required: true, message: "请输入", trigger: "blur" }],
        renewpwd: [{ required: true, message: "请输入", trigger: "blur" }]
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          if (this.ruleForm.newpwd != this.ruleForm.renewpwd) {
            this.$message.error("两次密码不一致");
            return;
          }
          let id = localStorage.getItem("userId");
          let _this = this;
          let param = {
            password: this.ruleForm.newpwd,
            id: id,
            oldpwd: this.ruleForm.oldpwd
          };
          queryData("/user/resetPwd", param, "POST").then(res => {
            if (res.code == 0) {
              this.$message.success("修改成功,请重新登录");
              this.$store.dispatch("user/logout");
              this.$router.push(`/login`);
            } else {
              this.$message.error("修改失败");
            }
          });
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

<style scoped>
.content {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 50px;
}
</style>