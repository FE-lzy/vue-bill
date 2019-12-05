<template>
  <div class="box">
    <!-- <el-tabs v-model="activeName" @tab-click="handleClick"> -->
    <!-- <el-tab-pane label="增值税发票" name="first"> -->
    <el-form :inline="true" :model="form" class="demo-form-inline">
      <el-form-item label="发票代码">
        <el-input v-model="form.invoiceDataCode" placeholder="请输入发票代码" />
      </el-form-item>
      <el-form-item label="发票号码">
        <el-input v-model="form.invoiceNumber" placeholder="请输入发票号码" />
      </el-form-item>
      <el-form-item label="价税最低值">
        <el-input v-model="form.minPrice" placeholder="请输入最低值" />
      </el-form-item>
      <el-form-item label="价税最高值">
        <el-input v-model="form.maxPrice" placeholder="请输入最高值" />
      </el-form-item>
      <el-form-item label="发票类型">
        <el-select v-model="form.invoiceTypeCode" placeholder="请选择">
          <el-option
            v-for="item in billType"
            :key="item.id"
            :label="item.type_name"
            :value="item.type_id"
          />
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
        />
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
        />
      </el-form-item>
      <el-form-item label="销售方名称">
        <el-input v-model="form.salesName" placeholder="请输入销售方名称" />
      </el-form-item>
      <el-form-item label="归属部门">
        <el-select v-model="form.fp_gsbm" placeholder="请选择">
          <el-option v-for="item in bmOptions" :key="item.id" :label="item.bmmc" :value="item.id" />
        </el-select>
      </el-form-item>

      <el-form-item>
        <el-select
          v-model="colOptions"
          multiple
          collapse-tags
          style="margin-left: 20px;"
          placeholder="请选择"
        >
          <el-option v-for="item in colSelect" :key="item" :label="item" :value="item" />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="getData">查询</el-button>
        <el-button @click="resetForm()">重置</el-button>
        <el-button
          :loading="downloadLoading"
          style="margin:0 0 20px 20px;"
          type="primary"
          icon="el-icon-document"
          @click="handleDownload"
        >导出Excel</el-button>
      </el-form-item>
      <el-form-item v-if="showBtn">
        <el-button @click="deleteBills">批量删除</el-button>
      </el-form-item>
    </el-form>

    <el-table
      ref="tableDataRef"
      :data="tableData"
      v-loading="loading"
      :height="tableHeight"
      stripe
      style="width: 100%"
      :default-sort="{prop: 'entryDate', order: 'descending'}"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="55" />
      <el-table-column prop="#" type="index" label="序号" />
      <el-table-column v-if="colData[0].istrue" prop="invoiceDataCode" label="发票代码" />
      <el-table-column v-if="colData[1].istrue" prop="invoiceNumber" label="发票号码" />
      <el-table-column v-if="colData[2].istrue" prop="invoiceTypeCode" label="发票类型" />
      <el-table-column v-if="colData[3].istrue" prop="salesName" label="销售方名称" />
      <el-table-column v-if="colData[4].istrue" prop="salesTaxpayerNum" label="销售方税号" />
      <el-table-column v-if="colData[5].istrue" prop="salesTaxpayerAddress" label="销方地址，电话" />
      <el-table-column v-if="colData[6].istrue" prop="salesTaxpayerBankAccount" label="销方银行，账号" />

      <el-table-column v-if="colData[7].istrue" prop="totalTaxSum" label="价税合计" />
      <el-table-column v-if="colData[8].istrue" prop="billingTime" sortable label="开票日期" />
      <el-table-column v-if="colData[9].istrue" prop="bmmc" label="归属部门" />
      <el-table-column v-if="colData[10].istrue" prop="zymc" label="归属人" />
      <el-table-column v-if="colData[11].istrue" prop="invoiceTypeName" label="发票名称" />
      <el-table-column v-if="colData[12].istrue" prop="entryDate" sortable label="录入时间" />
      <el-table-column v-if="colData[13].istrue" prop="checkDate" label="查询日期" />
      <el-table-column v-if="colData[14].istrue" prop="checkCode" label="校验码" />
      <el-table-column v-if="colData[15].istrue" prop="taxDiskCode" label="机器码" />
      <el-table-column v-if="colData[16].istrue" prop="purchaserName" label="购方名称" />

      <el-table-column v-if="colData[17].istrue" prop="taxpayerNumber" label="购方纳税人识别号" />
      <el-table-column v-if="colData[18].istrue" prop="taxpayerBankAccount" label="购方银行账号" />
      <el-table-column v-if="colData[19].istrue" prop="taxpayerAddressOrId" label="购方地址，电话" />
      <el-table-column v-if="colData[20].istrue" prop="totalTaxNum" label="税额" />

      <el-table-column v-if="colData[21].istrue" prop="totalAmount" label="不含税价（金额）" />
      <el-table-column v-if="colData[22].istrue" prop="invoiceRemarks" label="备注" />
      <el-table-column v-if="colData[23].istrue" prop="isBillMark" label="是否为清单票" />
      <el-table-column v-if="colData[24].istrue" prop="voidMark" label="作废标志" />
      <el-table-column v-if="colData[25].istrue" prop="tollSignName" label="收费标志名称" />
      <el-table-column v-if="colData[26].istrue" prop="username" label="操作员" />
      <el-table-column fixed="right" label="操作" width="100">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="Billdetail(scope.row)">查看详情</el-button>
          <el-button type="text" size="small" @click="BillUpdate(scope.row)">修改</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div>
      <div style="float:left;width:50%;margin-top:20px;color:#24557E" v-if="showBtn">
        已勾选{{totalArr.selectIndex}}张,金额合计:￥{{totalArr.totalAmount.toFixed(2)}}
        <br />
        税额总计：￥{{totalArr.totalTaxNum.toFixed(2)}}
        <br />
        价税合计 总计：￥{{totalArr.totalTaxSum.toFixed(2)}}
      </div>
      <el-pagination
        style="text-align: right;margin-top:20px;float:right;width:50%;"
        :current-page.sync="current"
        :page-size="10"
        layout="total, prev, pager, next"
        :total="total"
        @current-change="handleCurrentChange"
      />
    </div>

    <el-dialog title="修改" :visible.sync="updateVisible" width="30%">
      <el-form
        ref="validForm"
        :label-position="labelPosition"
        label-width="120px"
        :model="updateForm"
      >
        <el-form-item
          label="发票归属部门"
          prop="fp_gsbm"
          :rules="[
            { required: true, message: '请输入', trigger: 'blur' },
          ]"
        >
          <el-select v-model="updateForm.fp_gsbm" filterable placeholder="所在部门">
            <el-option
              v-for="item in bmOptions"
              :key="item.id"
              :label="item.bmmc"
              :value="item.id"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="发票归属人">
          <el-select v-model="updateForm.fp_gsr" filterable placeholder="发票归属人">
            <el-option
              v-for="item in userOptions"
              :key="item.id"
              :label="item.zymc"
              :value="item.id"
            />
          </el-select>
        </el-form-item>

        <el-form-item label="备注">
          <el-input v-model="updateForm.fp_bz" type="textarea" :rows="2" placeholder="请输入内容" />
        </el-form-item>
        <div style="text-align:center">
          <el-button type="primary" @click="saveBill('validForm')">保存</el-button>
          <el-button @click="updateVisible = false">取消</el-button>
        </div>
      </el-form>
    </el-dialog>
    <el-dialog title="详情" :visible.sync="commonVisible" width="55%">
      <common :detail="detailData" />
    </el-dialog>
    <el-dialog title="详情" :visible.sync="passVisible" width="55%">
      <pass :detail="detailData" />
    </el-dialog>
    <el-dialog title="详情" :visible.sync="volumeVisible" width="55%">
      <volume :detail="detailData" />
    </el-dialog>
  </div>
</template>
<script>
const dwbm = { dwbm: localStorage.getItem("dwbm") };
const x = 420;
import common from "./model/common";
import pass from "./model/pass";
import volume from "./model/volume";
import { queryData } from "../../api/common";
import entryUser from "./model/entryUser";
function formateDate(datetime) {
  function addDateZero(num) {
    return num < 10 ? "0" + num : num;
  }
  const d = new Date(datetime);
  const formatdatetime =
    d.getFullYear() +
    "-" +
    addDateZero(d.getMonth() + 1) +
    "-" +
    addDateZero(d.getDate());
  return formatdatetime;
}
function formatvoidMark(value) {
  return value == "0" ? "正常" : "作废";
}
function formatisBillMark(value) {
  return value == "Y" ? "是" : "否";
}
export default {
  components: {
    common,
    pass,
    volume,
    entryUser
  },
  data() {
    return {
      loading: false,
      current: 1,
      total: 0,
      updateVisible: false,
      detailData: [],
      multipleSelection: [],
      showBtn: false,
      value2: "",
      commonVisible: false,
      passVisible: false,
      volumeVisible: false,
      updateForm: {
        fp_gsr: "",
        fp_gsbm: "",
        bz: "",
        id: ""
      },
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
      bmOptions: [], // 所有部门
      userOptions: [], // 人
      billType: [], // 发票类型
      form: {
        user: "",
        region: "",
        billingTime: "", // 开票日期
        entryDate: "", // 录入时间
        fp_gsbm: "", // 所在部门
        invoiceTypeCode: "",
        maxPrice: "",
        minPrice: "",
        invoiceDataCode: "", // 发票代码
        invoiceNumber: "", // 发票号码
        salesName: "" // 销售方名称
      },
      tableData: [],
      // 列名
      colData: [
        { title: "发票代码", istrue: true, prop: "invoiceDataCode" },
        { title: "发票号码", istrue: true, prop: "invoiceNumber" },
        { title: "发票类型", istrue: true, prop: "invoiceTypeCode" },
        { title: "销售方名称", istrue: true, prop: "salesName" },
        { title: "销售方税号", istrue: false, prop: "salesTaxpayerNum" },
        {
          title: "销方地址，电话",
          istrue: false,
          prop: "salesTaxpayerAddress"
        },
        {
          title: "销方银行，账号",
          istrue: false,
          prop: "salesTaxpayerBankAccount"
        },
        { title: "价税合计", istrue: true, prop: "totalTaxSum" },
        { title: "开票日期", istrue: true, prop: "billingTime" },
        { title: "归属部门", istrue: true, prop: "bmmc" },
        { title: "归属人", istrue: false, prop: "zymc" },
        { title: "发票名称", istrue: true, prop: "invoiceTypeName" },
        { title: "录入时间", istrue: true, prop: "entryDate" },

        { title: "查询日期", istrue: false, prop: "checkDate" },
        { title: "校验码", istrue: false, prop: "checkCode" },
        { title: "机器码", istrue: false, prop: "taxDiskCode" },
        { title: "购方名称", istrue: false, prop: "purchaserName" },
        { title: "购方纳税人识别号", istrue: false, prop: "taxpayerNumber" },
        { title: "购方银行账号", istrue: false, prop: "taxpayerBankAccount" },
        { title: "购方地址，电话", istrue: false, prop: "taxpayerAddressOrId" },

        { title: "税额", istrue: false, prop: "totalTaxNum" },
        { title: "不含税价（金额）", istrue: false, prop: "totalAmount" },
        { title: "备注", istrue: false, prop: "invoiceRemarks" },
        { title: "是否为清单票", istrue: false, prop: "isBillMark" },
        { title: "作废标志", istrue: false, prop: "voidMark" },
        { title: "收费标志名称", istrue: false, prop: "tollSignName" },
        { title: "操作员", istrue: false, prop: "username" }
      ],
      colOptions: [],
      colSelect: [],
      selectArr: [],
      colProps: [],
      downloadLoading: false,
      filename: "发票列表",
      autoWidth: true,
      bookType: "xlsx",
      labelPosition: "80px",
      tableAddData: [],
      tableHeight: `${document.documentElement.clientHeight}` - x,
      totalArr: {
        totalAmount: 0,
        totalTaxNum: 0,
        totalTaxSum: 0,
        selectIndex: 0
      }
    };
  },
  watch: {
    colOptions(valArr) {
      var arr = this.colSelect.filter(i => valArr.indexOf(i) < 0); // 未选中
      this.selectArr = this.colSelect.filter(i => valArr.indexOf(i) > -1); // 选中
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
      this.colData.filter(i => {
        if (this.selectArr.indexOf(i.title) != -1) {
          this.colProps.push(i.prop);
        }
      });
    }
  },
  created() {
    // 加载table
    var _this = this;
    for (let i = 0; i < _this.colData.length; i++) {
      _this.colSelect.push(_this.colData[i].title);
      if (i == 4 || i == 5 || i == 6 || i == 10 || i > 12) {
        // 初始化不想展示的列可以放在这个条件里
        continue;
      }
      console.log(_this.colData[i].prop);
      _this.colOptions.push(_this.colData[i].title);
      _this.colProps.push(_this.colData[i].prop);
      _this.selectArr.push(_this.colData[i].title);
    }
    console.log(_this.selectArr);
    console.log("初始化", _this.colProps);
  },
  mounted() {
    this.getData();
    this.getAllBm();
    this.getAllUser();
    this.getBillType();
  },
  methods: {
    getAllUser() {
      const param = {
        dwbm: localStorage.getItem("dwbm"),
        bmbm: this.form.fp_gsbm
      };
      queryData("/manager/queryAllUser", param, "POST").then(res => {
        if (res.code == 0) {
          this.userOptions = res.data;
        }
      });
    },
    deleteBills() {
      const m = this.multipleSelection;
      const selectId = [];
      for (let i = 0; i < m.length; i++) {
        selectId.push(m[i].id);
      }
      this.$confirm("此操作将永久删除, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          queryData("/bill/deleteBills", { ids: selectId }, "POST")
            .then(res => {
              if (res.code == 0) {
                this.$message.success("删除成功");
                this.getData();
              } else {
                this.$message.error(res.message);
              }
            })
            .catch(err => {
              this.$message.error(err);
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    BillUpdate(row) {
      console.log(row);
      this.updateForm.fp_gsbm = row.fp_gsbm;
      this.updateForm.fp_gsr = row.fp_gsr;
      this.updateForm.id = row.id;
      this.updateVisible = true;
    },
    saveBill() {
      queryData("/bill/updateMainBill", this.updateForm, "POST").then(res => {
        if (res.code == 0) {
          this.$message.success("修改成功");
          this.getData();
          this.updateVisible = false;
        } else {
          this.$message.error(res.message);
        }
      });
    },

    handleCurrentChange(val) {
      this.current = val;
      this.getData();
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
      console.log(val);
      if (val.length > 0) {
        console.log(val);
        this.totalArr.selectIndex = val.length;
        this.totalArr.totalAmount = 0;
        this.totalArr.totalTaxNum = 0;
        this.totalArr.totalTaxSum = 0;
        this.showBtn = true;

        let totalAmount = 0,
          totalTaxNum = 0,
          totalTaxSum = 0;
        for (let i = 0; i < val.length; i++) {
          totalAmount += parseFloat(val[i].totalAmount);
          totalTaxNum += parseFloat(val[i].totalTaxNum);
          totalTaxSum += parseFloat(val[i].totalTaxSum);
          console.log(totalAmount, totalTaxNum, totalTaxSum);
        }
        this.totalArr.totalAmount = totalAmount;
        this.totalArr.totalTaxNum = totalTaxNum;
        this.totalArr.totalTaxSum = totalTaxSum;
      } else {
        this.showBtn = false;
        this.totalArr.selectIndex = 0;
        this.totalArr.totalAmount = 0;
        this.totalArr.totalTaxNum = 0;
        this.totalArr.totalTaxSum = 0;
      }
      console.log(val);
    },
    Billdetail(row) {
      this.detailData = JSON.parse(row.fp_detail);
      const billType = this.detailData.invoiceTypeCode;
      if (billType == "01" || billType == "04" || billType == "10") {
        this.commonVisible = true;
      } else if (billType == "11") {
        this.volumeVisible = true;
      } else if (billType == "14") {
        // 通行证
        this.passVisible = true;
      }

      console.log("qwe", this.detailData);
    },
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
      this.loading = true;
      const param = Object.assign(this.form, dwbm, { current: this.current });
      console.log("请求参数：", param);
      queryData("/bill/getBillList", param, "POST")
        .then(res => {
          if (res.code == 0) {
            console.log(res);
            if (res.data.length != 0) {
              this.tableAddData = res.data.allData;
              this.tableData = res.data.data;
              this.total = res.data.total;
              for (let i = 0; i < res.data.data.length; i++) {
                const detail = JSON.parse(res.data.data[i].fp_detail);
                this.tableData[i].invoiceTypeName = detail.invoiceTypeName;
                this.tableData[i].invoiceTypeCode = res.data.data[i].type_name;
                this.tableData[i].invoiceNumber = detail.invoiceNumber;
                this.tableData[i].billingTime = detail.billingTime;
                this.tableData[i].checkDate = detail.checkDate;
                this.tableData[i].checkCode = detail.checkCode;
                this.tableData[i].taxDiskCode = detail.taxDiskCode;
                this.tableData[i].purchaserName = detail.purchaserName;
                this.tableData[i].taxpayerNumber = detail.taxpayerNumber;
                this.tableData[i].taxpayerBankAccount =
                  detail.taxpayerBankAccount;
                this.tableData[i].taxpayerAddressOrId =
                  detail.taxpayerAddressOrId;
                this.tableData[i].totalAmount = detail.totalAmount;
                this.tableData[i].totalTaxSum = detail.totalTaxSum;
                this.tableData[i].totalTaxNum = detail.totalTaxNum;
                this.tableData[i].invoiceRemarks = detail.invoiceRemarks;
                this.tableData[i].isBillMark = formatisBillMark(
                  detail.isBillMark
                );
                this.tableData[i].voidMark = formatvoidMark(detail.voidMark);
                this.tableData[i].tollSignName = detail.tollSignName;
                this.tableData[i].entryDate = formateDate(
                  res.data.data[i].entryDate
                );
                this.tableData[i].salesTaxpayerNum = detail.salesTaxpayerNum;

                this.tableData[i].username = res.data.data[i].username; //操作员
                this.tableData[i].salesTaxpayerAddress =
                  detail.salesTaxpayerAddress;
                this.tableData[i].salesTaxpayerBankAccount =
                  detail.salesTaxpayerBankAccount;
              }

              for (let i = 0; i < res.data.allData.length; i++) {
                let detail = JSON.parse(res.data.allData[i].fp_detail);
                this.tableAddData[i].invoiceTypeName = detail.invoiceTypeName;
                this.tableAddData[i].invoiceTypeCode =
                  res.data.allData[i].type_name;
                this.tableAddData[i].invoiceNumber = detail.invoiceNumber;
                this.tableAddData[i].billingTime = detail.billingTime;
                this.tableAddData[i].checkDate = detail.checkDate;
                this.tableAddData[i].checkCode = detail.checkCode;
                this.tableAddData[i].taxDiskCode = detail.taxDiskCode;
                this.tableAddData[i].purchaserName = detail.purchaserName;
                this.tableAddData[i].taxpayerNumber = detail.taxpayerNumber;
                this.tableAddData[i].taxpayerBankAccount =
                  detail.taxpayerBankAccount;
                this.tableAddData[i].taxpayerAddressOrId =
                  detail.taxpayerAddressOrId;
                this.tableAddData[i].totalAmount = detail.totalAmount;
                this.tableAddData[i].totalTaxSum = detail.totalTaxSum;
                this.tableAddData[i].totalTaxNum = detail.totalTaxNum;
                this.tableAddData[i].invoiceRemarks = detail.invoiceRemarks;
                this.tableAddData[i].isBillMark = formatisBillMark(
                  detail.isBillMark
                );
                this.tableAddData[i].voidMark = formatvoidMark(detail.voidMark);
                this.tableAddData[i].tollSignName = detail.tollSignName;
                this.tableAddData[i].entryDate = formateDate(
                  res.data.allData[i].entryDate
                );
                this.tableAddData[i].salesTaxpayerNum = detail.salesTaxpayerNum;

                this.tableAddData[i].username = res.data.allData[i].username; //操作员
                this.tableAddData[i].salesTaxpayerAddress =
                  detail.salesTaxpayerAddress;
                this.tableAddData[i].salesTaxpayerBankAccount =
                  detail.salesTaxpayerBankAccount;
              }
            } else {
              this.tableData = [];
              this.total = 0;
              this.tableAddData = [];
            }
          }
          this.loading = false;
        })
        .catch(err => {
          this.loading = false;
        });
    },
    handleClick(tab, event) {
      console.log(tab, event);
    },
    // 重置
    resetForm() {
      this.form = {};
      this.current = 1;
      this.getData();
    },
    // 下载
    handleDownload() {
      this.downloadLoading = true;
      const _this = this;
      import("@/vendor/Export2Excel").then(excel => {
        const tHeader = _this.selectArr;
        const filterVal = _this.colProps;
        const list = this.tableAddData;
        const data = this.formatJson(filterVal, list);
        console.log(data);
        excel.export_json_to_excel({
          header: tHeader,
          data,
          filename: this.filename,
          autoWidth: this.autoWidth,
          bookType: this.bookType
        });
        _this.downloadLoading = false;
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
