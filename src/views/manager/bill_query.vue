<template>
  <div class="box">
    <!-- <el-tabs v-model="activeName" @tab-click="handleClick"> -->
    <!-- <el-tab-pane label="增值税发票" name="first"> -->
    <el-form :inline="true" :model="form" class="demo-form-inline">
      <el-form-item label="发票代码">
        <el-input v-model="form.invoiceDataCode" placeholder="请输入发票代码"></el-input>
      </el-form-item>
      <el-form-item label="发票号码">
        <el-input v-model="form.invoiceNumber" placeholder="请输入发票号码"></el-input>
      </el-form-item>
      <el-form-item label="价税最低值">
        <el-input v-model="form.minPrice" placeholder="请输入最低值"></el-input>
      </el-form-item>
      <el-form-item label="价税最高值">
        <el-input v-model="form.maxPrice" placeholder="请输入最高值"></el-input>
      </el-form-item>
      <el-form-item label="发票类型">
        <el-select v-model="form.invoiceTypeCode" placeholder="请选择">
          <el-option v-for="item in billType" :key="item.id" :label="item.type_name" :value="item.type_id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="开票日期">
        <el-date-picker
          v-model="form.billingTime"
          value-format="yyyy/MM/dd"
          type="daterange"
          align="right"
          unlink-panels
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          :picker-options="pickerOptions"
        ></el-date-picker>
      </el-form-item>
      <el-form-item label="录入日期">
        <el-date-picker
          v-model="form.entryDate"
          value-format="yyyy/MM/dd"
          type="daterange"
          align="right"
          unlink-panels
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          :picker-options="pickerOptions"
        ></el-date-picker>
      </el-form-item>
      <el-form-item label="销售方名称">
        <el-input v-model="form.salesName" placeholder="请输入销售方名称"></el-input>
      </el-form-item>
      <el-form-item label="归属部门">
        <el-select v-model="form.fp_gsbm" placeholder="请选择">
          <el-option v-for="item in bmOptions" :key="item.id" :label="item.bmmc" :value="item.id"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="getData">查询</el-button>
        <el-button @click="resetForm()">重置</el-button>
      </el-form-item>
    </el-form>

    <el-table :data="tableData" border stripe style="width: 100%">
      <el-table-column prop="#" type="index" label="序号" width="180"></el-table-column>
      <el-table-column prop="invoiceDataCode" label="发票序号" width="180"></el-table-column>
      <el-table-column prop="invoiceTypeCode" label="发票类型" width="180" :formatter="formatBillType"></el-table-column>
      <el-table-column prop="salesName" label="销售方名称" width="180"></el-table-column>
      <el-table-column prop="totalTaxSum" label="价税合计"></el-table-column>
      <el-table-column prop="entryDate" label="录入时间"></el-table-column>
      <el-table-column prop="zymc" label="归属人"></el-table-column>
      <el-table-column prop="bmmc" label="归属部门"></el-table-column>
    </el-table>
    <!-- </el-tab-pane>
      <el-tab-pane label="其他发票" name="second">其他发票</el-tab-pane>
    </el-tabs>-->
  </div>
</template>
<script>
const dwbm = { dwbm: localStorage.getItem("dwbm") };
import { queryData } from "../../api/common";
export default {
  data() {
    return {
      value2: "",
      pickerOptions: {
        shortcuts: [
          {
            text: "最近一周",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", [start, end]);
            }
          }
        ]
      },
      bmOptions: [], //所有部门
      billType: [], //发票类型
      form: {
        user: "",
        region: "",
        billingTime: "", //开票日期
        entryDate: "", //录入时间
        fp_gsbm: "", //所在部门
        invoiceTypeCode: "",
        maxPrice: "",
        minPrice: "",
        invoiceDataCode: "", //发票代码
        invoiceNumber: "", //发票号码
        salesName: "" //销售方名称
      },
      tableData: [],
      formatBillType: function(row, column, cellValue) {
        if(cellValue == '01'){
          return '增值税专票'
        } else if(cellValue == '04'){
          return '增值税普通发票'
        } else if(cellValue == '10'){
          return '电子发票'
        } else if(cellValue == '11'){
          return '卷式普通发票'
        } else if(cellValue == '14'){
          return '电子普通[通行费]发票'
        } else {
          return cellValue;
        }  
      }, 
    };
  },
  
  mounted() {
    this.getData();
    this.getAllBm();
    this.getBillType();
  },
  methods: {
    getAllBm() {
      queryData("/manager/queryAllBm", dwbm, "POST").then(res => {
        if (res.code == 0) {
          this.bmOptions = res.data.data;
        }
      });
    },
    getBillType(){
      queryData("/bill/getBillType", dwbm, "POST").then(res => {
        if (res.code == 0) {
          this.billType = res.data;
        }
      });
    },
    getData() {
      let param = Object.assign(this.form, dwbm);
      console.log("请求参数：", param);
      queryData("/bill/getBillList", param, "POST").then(res => {
        if (res.code == 0) {
          console.log(res);
          this.tableData = res.data;
        }
      });
    },
    handleClick(tab, event) {
      console.log(tab, event);
    },
    onSubmit() {
      console.log("submit!");
    },
    // 重置
    resetForm() {
      this.form = {};
      this.getData();
    }
  }
};
</script>
<style scoped>
.box {
  margin: 30px;
  background: #ffffff;
  padding: 20px;
}
.el-table .warning-row {
  background: oldlace;
}

.el-table .success-row {
  background: #f0f9eb;
}
</style>