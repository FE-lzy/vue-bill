<template>
  <div class="content dashboard-container">
    <div class="left">
      <h3>发票录入设置</h3>
      <div>
        <p>发票抬头不一致禁止录入：</p>
        <el-radio-group v-model="dwmc" @change="updateSettingName">
          <p>
            <el-radio label="1">启用</el-radio>
          </p>
          <p>
            <el-radio label="2">不启用</el-radio>
          </p>
        </el-radio-group>
      </div>
      <div>
        <p>纳税人识别号不一致禁止录入：</p>
        <p>
          <el-radio v-model="taxnum" label="1">启用</el-radio>
        </p>
        <p>
          <el-radio v-model="taxnum" label="2">不启用</el-radio>
        </p>
      </div>
    </div>
    <!-- <div class="right">
      <h3>发票导出设置</h3>
      <p>已设置发票导出字段：</p>
      <el-tag v-for="item in fieldArr" class="tag">{{item}}</el-tag>
      <div>
        <el-button type="primary" @click="showDialog">修改字段设置</el-button>
      </div>
    </div>

    <el-dialog title="修改字段设置" :visible.sync="dialogVisible" width="50%" :before-close="handleClose">
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>-->
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
      dwmc: "2",
      taxnum: "2"
    };
  },
  methods: {
    updateSettingName(val) {
      this.setting("check_dwmc", val);
    },
    updateSettingTaxnum(val) {
      this.setting("check_taxnum", val);
    },
    setting(type, val) {
      
      let param = Object.assign({ type: type, val: val },dwbm);
      queryData("/manager/setNoEntry", param, "POST").then(res => {
        if (res.code == 0) {
          this.$message.success("设置成功");
        } else {
          this.$message.error(res.message)
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
  .left {
    height: 100%;
    box-sizing: border-box;
    padding: 15px;
    display: flex;
    flex-direction: column;
    margin: 25px;
    background: #eef;
    width: 50%;
    height: 353px;
  }
  .right {
    height: 100%;
    padding: 15px;
    margin: 25px;
    box-sizing: border-box;
    background: #eef;
    width: 50%;
    height: 353px;
  }
  .tag {
    margin: 10px;
  }
}
</style>