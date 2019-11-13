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
          <el-option
            v-for="item in billType"
            :key="item.id"
            :label="item.type_name"
            :value="item.type_id"
          ></el-option>
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

        <el-select
          v-model="colOptions"
          multiple
          collapse-tags
          style="margin-left: 20px;"
          placeholder="请选择"
        >
          <el-option v-for="item in colSelect" :key="item" :label="item" :value="item"></el-option>
        </el-select>
        <el-button
          :loading="downloadLoading"
          style="margin:0 0 20px 20px;"
          type="primary"
          icon="el-icon-document"
          @click="handleDownload"
        >导出Excel</el-button>
      </el-form-item>
    </el-form>

    <el-table :data="tableData" border stripe style="width: 100%" ref="tableDataRef">
      <el-table-column prop="#" type="index" label="序号"></el-table-column>
      <el-table-column v-if="colData[0].istrue" prop="invoiceDataCode" label="发票序号"></el-table-column>
      <el-table-column
        v-if="colData[1].istrue"
        prop="invoiceTypeCode"
        label="发票类型"
        :formatter="formatBillType"
      ></el-table-column>
      <el-table-column v-if="colData[2].istrue" prop="salesName" label="销售方名称"></el-table-column>
      <el-table-column v-if="colData[3].istrue" prop="totalTaxSum" label="价税合计"></el-table-column>
      <el-table-column v-if="colData[4].istrue" prop="entryDate" label="录入时间"></el-table-column>
      <el-table-column v-if="colData[5].istrue" prop="zymc" label="归属人"></el-table-column>
      <el-table-column v-if="colData[6].istrue" prop="bmmc" label="归属部门"></el-table-column>
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
        if (cellValue == "01") {
          return "增值税专票";
        } else if (cellValue == "04") {
          return "增值税普通发票";
        } else if (cellValue == "10") {
          return "电子发票";
        } else if (cellValue == "11") {
          return "卷式普通发票";
        } else if (cellValue == "14") {
          return "电子普通[通行费]发票";
        } else {
          return cellValue;
        }
      },
      // 列名
      colData: [
        { title: "发票序号", istrue: true, prop: "invoiceDataCode" },
        { title: "发票类型", istrue: true, prop: "invoiceTypeCode" },
        { title: "销售方名称", istrue: true, prop: "salesName" },
        { title: "价税合计", istrue: true, prop: "totalTaxSum" },
        { title: "录入时间", istrue: true, prop: "entryDate" },
        { title: "归属人", istrue: true, prop: "zymc" },
        { title: "归属部门", istrue: true, prop: "bmmc" }
      ],
      colOptions: [],
      colSelect: [],
      selectArr:[],
      colProps:[],
      downloadLoading: false,
      filename: "发票列表",
      autoWidth: true,
      bookType: "xlsx"
    };
  },
  created() {
    // 加载table
    var _this = this;
    for (let i = 0; i < _this.colData.length; i++) {
      _this.colSelect.push(_this.colData[i].title);
      if (_this.colData[i].title == "名称") {
        //初始化不想展示的列可以放在这个条件里
        continue;
      }
      console.log(_this.colData[i].prop)
      _this.colOptions.push(_this.colData[i].title);
      _this.colProps.push(_this.colData[i].prop)
       _this.selectArr.push(_this.colData[i].title);
    }
    console.log(_this.selectArr);
    console.log('初始化',_this.colProps);
  },
  watch: {
    colOptions(valArr) {
      var arr = this.colSelect.filter(i => valArr.indexOf(i) < 0); // 未选中
      this.selectArr = this.colSelect.filter(i => valArr.indexOf(i) > -1); //选中
      this.colData.filter(i => {
        if (arr.indexOf(i.title) != -1) {
          i.istrue = false;
          this.$nextTick(() => {
            this.$refs.tableDataRef.doLayout();
          });
        } else {
          i.istrue = true;
          this.$nextTick(() => {
            this.$refs.tableDataRef.doLayout();
          });
        }
      });
      this.colProps = [];
      this.colData.filter(i =>{
         if(this.selectArr.indexOf(i.title) != -1 ){
          this.colProps.push(i.prop)
         } 
      })
    }
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
    getBillType() {
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
    },
    // 下载
    handleDownload() {
      this.downloadLoading = true;
      let _this = this;
      import("@/vendor/Export2Excel").then(excel => {
        const tHeader = _this.selectArr;
        const filterVal = _this.colProps;
        const list = this.tableData;
        const data = this.formatJson(filterVal, list);
        console.log(data);
        excel.export_json_to_excel({
          header: tHeader,
          data,
          filename: this.filename,
          autoWidth: this.autoWidth,
          bookType: this.bookType
        });
        this.downloadLoading = false;
      });
    },
    formatJson(filterVal, jsonData) {
      return jsonData.map(v =>
        filterVal.map(j => {
          if (j === "timestamp") {
            return parseTime(v[j]);
          } else {
            return v[j];
          }
        })
      );
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