<template>
  <div>
    <div class="container">
      <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="dwmc" label="单位名称" width="180"></el-table-column>
        <el-table-column prop="taxnum" label="税号" width="180"></el-table-column>
        <el-table-column prop="address" label="地址"></el-table-column>
        <el-table-column prop="bank" label="开户银行" width="180"></el-table-column>
        <el-table-column prop="account" label="账号"></el-table-column>
        <el-table-column prop="tel" label="电话" width="180"></el-table-column>
        <el-table-column prop="bz" label="备注"></el-table-column>
        <el-table-column fixed="right" label="操作" width="100">
          <template slot-scope="scope">
            <el-button @click="handleClick(scope.row)" type="text" size="small">修改</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-dialog title="修改" :visible.sync="dialog" width="30%">
        <el-form label-width="120px" ref="form" :model="form">
          <el-form-item
            label="单位名称"
            prop="dwmc"
            :rules="[
              { required: true, message: '不能为空'},
            ]"
          >
            <el-input v-model="form.dwmc"></el-input>
          </el-form-item>
          <el-form-item
            label="税号"
            prop="taxnum"
            :rules="[
              { required: true, message: '不能为空'},
            ]"
          >
            <el-input v-model="form.taxnum"></el-input>
          </el-form-item>
          <el-form-item label="地址">
            <el-input v-model="form.address"></el-input>
          </el-form-item>
          <el-form-item label="开户银行">
            <el-input v-model="form.bank"></el-input>
          </el-form-item>
          <el-form-item label="账号">
            <el-input v-model="form.account"></el-input>
          </el-form-item>
          <el-form-item label="电话">
            <el-input v-model="form.tel"></el-input>
          </el-form-item>
          <el-form-item label="备注">
            <el-input type="textarea" v-model="form.bz"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button @click="dialog=false">取消</el-button>
            <el-button type="primary" @click="save('form')">保存</el-button>
          </el-form-item>
        </el-form>
      </el-dialog>
    </div>
  </div>
</template>
<script>
import { queryData } from "@/api/common";
const dwbm = { dwbm: localStorage.getItem("dwbm") };
export default {
  name: "setting",
  data() {
    return {
      form: {
        account: "",
        address: "",
        bank: "",
        bz: "",
        check_dwmc: 0,
        check_taxnum: 0,
        dwmc: "",
        taxnum: "",
        tel: ""
      },
      dialog: false,
      tableData: []
    };
  },
  mounted() {
    this.getDwInfo();
  },
  methods: {
    getDwInfo() {
      queryData("/manager/getDwInfo", dwbm, "POST").then(res => {
        console.log(res);
        if (res.code == 0) {
          this.tableData = res.data;
        }
      });
    },
    handleClick(row) {
      this.dialog = true;
      console.log(row);
      this.form = row;
    },
    save(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          let param = Object.assign(dwbm, this.form);
          queryData("/manager/updateDw", param, "POST").then(res => {
            if (res.code == 0) {
              this.$message.success("操作成功");
              this.getDwInfo();
              this.dialog = false;
            } else {
              this.$message.error(res.message);
            }
          });
        } else {
          return false;
        }
      });
    }
  }
};
</script>

<style scoped>
.container {
  margin: 30px;
  padding: 20px;
  display: flex;
  justify-content: center;
}
</style>