<template>
  <div class="container">
    <div class="tableBox">
      <el-form :inline="true" :model="form" class="demo-form-inline">
        <el-form-item label="部门名称">
          <el-input v-model="form.bmmc" placeholder="部门名称" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="getAllBm">查询</el-button>
          <el-button @click="resetForm()">重置</el-button>

          <el-button type="primary" plain @click="addForm">新增</el-button>
        </el-form-item>
      </el-form>
      <el-table :data="tableData" style="width: 100%;">
        <el-table-column prop="id" label="部门编码" width="120" />
        <el-table-column prop="bmmc" label="部门名称" />
        <el-table-column prop="dwmc" label="单位名称" />
        <el-table-column prop="bz" label="备注" />
        <el-table-column fixed="right" label="操作">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="UpdateForm(scope.row)">编辑</el-button>
            <el-button type="text" size="small" @click="deleteRow(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        style="text-align: center;"
        :current-page.sync="current"
        :page-size="10"
        layout="total, prev, pager, next"
        :total="total"
        @current-change="handleCurrentChange"
      />
    </div>
    <!-- 修改新增弹出框 -->
    <el-dialog title="操作" :visible.sync="visible" width="20%">
      <el-form ref="dialogForm" :model="dialogForm">
        <el-form-item
          label="部门名称"
          :label-width="formLabelWidth"
          prop="bmmc"
          :rules="[
            { required: true, message: '不能为空'},
          ]"
        >
          <el-input v-model="dialogForm.bmmc" placeholder="请输入内容" autocomplete="off" />
        </el-form-item>
        <el-form-item label="备注" :label-width="formLabelWidth">
          <el-input v-model="dialogForm.bz" type="textarea" :rows="2" placeholder="请输入内容" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="visible = false">取 消</el-button>
        <el-button type="primary" @click="saveOrUpdate('dialogForm')">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { queryData } from '../../api/common'
export default {
  name: 'PartmentMan',
  data() {
    return {
      form: {
        bmmc: ''
      },
      dialogForm: {
        bmmc: '',
        bz: ''
      },
      visible: false,
      total: 1,
      current: 1,
      formLabelWidth: '80px',
      tableData: []
    }
  },
  mounted() {
    this.getAllBm()
  },
  methods: {
    getAllBm() {
      const param = { dwbm: localStorage.getItem('dwbm'), current: this.current }
      if (this.form.bmmc) {
        param.bmmc = this.form.bmmc
      }
      queryData('/manager/queryAllBm', param, 'POST').then(res => {
        console.log(res)
        if (res.code == 0) {
          this.tableData = res.data.data
          this.total = res.data.total
        }
      })
    },
    handleCurrentChange(val) {
      this.current = val
      this.getAllBm()
    },
    resetForm() {
      this.form = {}
      this.getAllBm()
    },
    UpdateForm(row) {
      this.visible = true
      this.dialogForm.id = row.id
      this.dialogForm.bmmc = row.bmmc
      this.dialogForm.bz = row.bz
    },
    addForm() {
      this.visible = true
    },
    saveOrUpdate(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          const param = this.dialogForm
          if (this.dialogForm.id) {
            // 修改
            param.id = this.dialogForm.id
          }

          param.dwbm = localStorage.getItem('dwbm')
          console.log(param)
          queryData('/manager/saveOrUpdatePart', param, 'POST')
            .then(res => {
              if (res.code == 0) {
                this.$message.success('操作成功')
                this.getAllBm()
                this.dialogForm = {}
                this.visible = false
              } else {
                this.$message.error(res.message)
              }
            })
            .catch(err => {
              this.$message.error(err)
            })
        } else {
          return false
        }
      })
    },
    deleteRow(row) {
      this.$confirm('此操作将永久删除, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          queryData('/manager/deletePart', row, 'POST')
            .then(res => {
              if (res.code == 0) {
                this.$message({
                  type: 'success',
                  message: '删除成功'
                })
                this.getAllBm()
              } else {
                this.$message.error(res.message)
              }
            })
            .catch(err => {
              this.$message({
                type: 'error',
                message: err
              })
            })
        })
        .catch(err => {
          this.$message({
            type: 'info',
            message: err
          })
        })
    }
  }
}
</script>
<style>
.container {
  padding: 20px;
}
.tableBox {
  padding: 10px;
}
</style>
