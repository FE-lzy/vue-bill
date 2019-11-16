<template>
  <div class="content">
    <div class="left1">
      <h3>发票录入设置</h3>
      <div>
        <p>发票抬头不一致禁止录入：</p>
        <el-radio-group v-model="dwmc" @change="updateSettingName">
          <p>
            <el-radio :label=1>启用</el-radio>
          </p>
          <p>
            <el-radio :label=2>不启用</el-radio>
          </p>
        </el-radio-group>
      </div>
      <div>
        <p>纳税人识别号不一致禁止录入：</p>
        <el-radio-group v-model="taxnum" @change="updateSettingTaxnum">
          <p>
            <el-radio :label=1>启用</el-radio>
          </p>
          <p>
            <el-radio :label=2>不启用</el-radio>
          </p>
        </el-radio-group>
      </div>
    </div>
  </div>
</template>

<script>
const dwbm = { dwbm: localStorage.getItem("dwbm") };
import { queryData } from "../../api/common";
import { parse } from "path";
export default {
  name: "setting",
  data() {
    return {
      dwmc: 2,
      taxnum: 2
    };
  },
  mounted() {
    this.getSetting();
  },
  methods: {
    getSetting() {
      queryData("/manager/getSetting", dwbm, "POST").then(res => {
        console.log(res);
        if (res.code == 0) {
          this.dwmc = res.data.check_dwmc;
          this.taxnum = res.data.check_taxnum;
          console.log(this.taxnum);
        } else {
          this.$message.error(res.message);
        }
      });
    },
    updateSettingName(val) {
      this.setting("check_dwmc", val);
    },
    updateSettingTaxnum(val) {
      this.setting("check_taxnum", val);
    },
    setting(type, val) {
      let param = Object.assign({ type: type, val: val }, dwbm);
      queryData("/manager/setNoEntry", param, "POST").then(res => {
        if (res.code == 0) {
          this.$message.success("设置成功");
        } else {
          this.$message.error(res.message);
        }
      });
    }
  }
};
</script>

<style lang="scss">
.content {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  width: 100%;
  height: 100%;
  .left1 {
    height: 100%;
    box-sizing: border-box;
    padding: 15px;
    display: flex;
    flex-direction: column;
    margin: 25px;
    width: 100%;
    height: 353px;
  }
  .tag {
    margin: 10px;
  }
  .el-radio-group{
    line-height: 30px
  }
}
</style>