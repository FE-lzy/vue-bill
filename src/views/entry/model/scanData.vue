<template>
  <div>
    <div class="scan-panel">
      <div class="scan-image">
        <img :src="img" />
      </div>
      <div class="scan-form">
        <el-form ref="validForm" :label-position="labelPosition" label-width="120px" :model="form">
          <h2 style="text-align:center">发票录入</h2>
          <el-form-item label="备注">
            <el-input
              v-model="form.fp_bz"
              type="textarea"
              :rows="2"
              placeholder="请输入内容"
              :disabled="isHave"
            />
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
          <el-form-item
            label="发票归属部门"
            prop="fp_gsbm"
            :rules="[
            { required: true, message: '请输入', trigger: 'blur' },
          ]"
          >
            <el-select
              v-model="form.fp_gsbm"
              filterable
              placeholder="所在部门"
              @change="getUserByBm"
              :disabled="isHave"
            >
              <el-option
                v-for="item in bmOptions"
                :key="item.id"
                :label="item.bmmc"
                :value="item.id"
              />
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
            <!-- <el-button @click="backJump()">返回</el-button> -->
          </div>
        </el-form>
      </div>
    </div>
    <el-button @click="confirm()">确认</el-button>
  </div>
</template>
<script>
const { getAllBm, getAllUser } = require("@/views/entry/common");
const dwbm = { dwbm: localStorage.getItem("dwbm") };
export default {
  name: "scanData",
  props: {
    data: Array,
    img: ""
  },
  data() {
    return {
      labelPosition: "right",
      billResJSON: "",
      form: {
        fp_gsbm: "",
        fp_bz: "",
        fp_gsr: ""
      },
      isHave: false,
      userOptions: [],
      bmOptions: []
    };
  },
  mounted() {
    getAllBm().then(res => {
      this.bmOptions = res;
    });
    getAllUser().then(res => {
      this.userOptions = res;
    });
  },
  methods: {
    confirm() {
      console.log(this.img);
      this.$emit("closeDialog");
    },
    getUserByBm(val) {
      getAllUser(val).then(res => {
        this.userOptions = res;
      });
    },
    saveBill(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          const param = Object.assign(
            this.form,
            { billInfo: this.billResJSON },
            { uid: localStorage.getItem("userId") },
            dwbm
          );
        }
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.scan-panel {
  display: flex;
  justify-content: space-around;
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  .scan-image {
    img {
      width: 320px;
    }
  }
  .scan-form {
  }
}
</style>