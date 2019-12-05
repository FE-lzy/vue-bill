<template>
  <div>
    <el-form ref="validForm" :label-position="labelPosition" label-width="120px" :model="form">
      <h2 style="text-align:center">发票录入</h2>
      <el-form-item
        label="发票归属部门"
        prop="fp_gsbm"
        :rules="[
            { required: true, message: '请输入', trigger: 'blur' },
          ]"
      >
        <el-select v-model="form.fp_gsbm" filterable placeholder="所在部门" :disabled="isHave">
          <el-option v-for="item in bmOptions" :key="item.id" :label="item.bmmc" :value="item.id" />
        </el-select>
      </el-form-item>
      <el-form-item label="发票归属人">
        <el-select v-model="form.fp_gsr" filterable placeholder="发票归属人" :disabled="isHave">
          <el-option
            v-for="item in userOptions"
            :key="item.id"
            :label="item.zymc"
            :value="item.id"
          />
        </el-select>
      </el-form-item>

      <el-form-item label="备注">
        <el-input
          v-model="form.fp_bz"
          type="textarea"
          :rows="2"
          placeholder="请输入内容"
          :disabled="isHave"
        />
      </el-form-item>
      <div style="text-align:center">
        <el-button type="primary" @click="saveBill('validForm')" v-if="!isHave">录入</el-button>
        <el-button @click="backJump()">返回</el-button>
      </div>
    </el-form>
  </div>
</template>

<script>
const dwbm = { dwbm: localStorage.getItem("dwbm") };
export default {
  name: "entryUser",
  props: {
    form: Object,
    billResJSON:''
  },
  methods: {
    saveBill(formName) {
      console.log(formName);
      // 判断是否空对象 console.log(Object.keys(this.billResJSON).length);
      if (this.billResJSON == "") {
        this.$message.error("发票信息为空,请先验证发票");
        return;
      }
      this.$refs[formName].validate(valid => {
        if (valid) {
          const param = Object.assign(
            this.form,
            { billInfo: this.billResJSON },
            { uid: localStorage.getItem("userId") },
            dwbm
          );
          queryData("/bill/saveBill", param, "POST").then(res => {
            if (res.code == 0) {
              this.$message.success("操作成功");
              this.$emit('handleOk')
            //   this.$router.go(-1);
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