<template>
  <div class="container">
    <div class="tableBox">
      <el-form :inline="true" :model="form" class="demo-form-inline">
        <el-form-item label="员工名称">
          <el-input v-model="form.zymc" placeholder="员工名称"></el-input>
        </el-form-item>
        <el-form-item label="所在部门">
          <el-select v-model="form.bmbm" placeholder="所在部门">
            <el-option v-for="item in bmOptions" :key="item.id" :label="item.bmmc" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">查询</el-button>
          <el-button @click="resetForm()">重置</el-button>
          <el-button type="primary" @click="addForm" plain>新增</el-button>
        </el-form-item>
      </el-form>
      <el-table :data="tableData" style="width: 100%;">
        <el-table-column prop="id" label="员工编码" width="120"></el-table-column>
        <el-table-column prop="zymc" label="员工名称" width="180"></el-table-column>
        <el-table-column prop="bmmc" label="部门名称"></el-table-column>
        <el-table-column prop="dwmc" label="单位名称"></el-table-column>
        <el-table-column prop="bz" label="备注"></el-table-column>
        <el-table-column fixed="right" label="操作">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="UpdateForm(scope.row)">编辑</el-button>
            <el-button @click="deleteRow(scope.row)" type="text" size="small">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        style="text-align: center;"
        @current-change="handleCurrentChange"
        :current-page.sync="current"
        :page-size="10"
        layout="total, prev, pager, next"
        :total="total"
      ></el-pagination>
    </div>
    <!-- 修改新增弹出框 -->
    <el-dialog title="操作" :visible.sync="visible" width="20%">
      <el-form :model="dialogForm" ref="dialogForm">
        <el-form-item
          label="员工名称"
          :label-width="formLabelWidth"
          prop="zymc"
          :rules="[
              { required: true, message: '不能为空'},
            ]"
        >
          <el-input v-model="dialogForm.zymc" placeholder="请输入内容" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item
          label="所在部门"
          :label-width="formLabelWidth"
          prop="bmbm"
          :rules="[
              { required: true, message: '不能为空'},
            ]"
        >
          <el-select v-model="dialogForm.bmbm" placeholder="请选择所在部门">
            <el-option v-for="item in bmOptions" :key="item.id" :label="item.bmmc" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="备注" :label-width="formLabelWidth">
          <el-input type="textarea" :rows="2" placeholder="请输入内容" v-model="dialogForm.bz"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="visible = false">取 消</el-button>
        <el-button type="primary" @click="saveOrUpdate('dialogForm')" :loading="isSave">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
const dwbm = { dwbm: localStorage.getItem("dwbm") };
import { queryData } from "../../api/common";
export default {
  data() {
    return {
      form: {
        zymc: "",
        bmbm: ""
      },
      isSave: false,
      total: 1,
      current: 1,
      bmOptions: [],
      tableData: [],
      dialogForm: {
        zymc: "",
        bmmc: "",
        bmbm: "",
        bz: ""
      },
      visible: false,
      formLabelWidth: "80px"
    };
  },
  mounted() {
    this.getAllBm();
    this.onSubmit();
  },
  methods: {
    getAllBm() {
      let param = { dwbm: localStorage.getItem("dwbm") };
      queryData("/manager/queryAllBm", param, "POST").then(res => {
        if (res.code == 0) {
          console.log(res.data);
          this.bmOptions = res.data.data;
        }
      });
    },
    handleCurrentChange(val) {
      this.current = val;
      this.onSubmit();
    },
    resetForm() {
      this.form = {};
      this.onSubmit();
    },
    onSubmit() {
      let param = {};
      param.dwbm = localStorage.getItem("dwbm");
      param.current = this.current;
      if (this.form.bmbm) {
        param.bmbm = this.form.bmbm;
      }
      if (this.form.zymc) {
        param.zymc = this.form.zymc;
      }
      console.log(param);
      queryData("/manager/queryZyxx", param, "POST").then(res => {
        if (res.code == 0) {
          this.tableData = res.data.data;
          this.total = res.data.total;
        }
      });
    },
    UpdateForm(row) {
      console.log(row);
      this.visible = true;
      this.dialogForm.id = row.id;
      this.dialogForm.zymc = row.zymc;
      this.dialogForm.bmbm = row.bmbm;
      this.dialogForm.bz = row.bz;
    },
    addForm() {
      this.visible = true;
    },
    deleteRow(row) {
      this.$confirm("此操作将永久删除, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          queryData("/manager/deleteZy", row, "POST")
            .then(res => {
              if (res.code == 0) {
                this.$message({
                  type: "success",
                  message: "删除成功"
                });
                this.onSubmit();
              } else {
                this.$message.error(res.message);
              }
            })
            .catch(err => {
              this.$message({
                type: "error",
                message: err
              });
            });
        })
        .catch(err => {
          this.$message({
            type: "info",
            message: err
          });
        });
    },
    saveOrUpdate(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.isSave = true;
          let param = Object.assign(this.dialogForm, dwbm);
          if (this.dialogForm.id) {
            // 修改
            param.id = this.dialogForm.id;
          }
          queryData("/manager/saveOrUpdateZy", param, "POST")
            .then(res => {
              if (res.code == 0) {
                this.$message.success("操作成功");
                this.onSubmit();
                this.visible = false;
              } else {
                this.$message.error(res.err);
              }
              this.isSave = false;
            })
            .catch(err => {
              this.$message.error(err);
              this.isSave = false;
            });
        } else {
          return false;
        }
      });
    }
  }
};
</script>

<style>
.container {
  padding: 20px;
}
.tableBox {
  padding: 10px;
}
</style>