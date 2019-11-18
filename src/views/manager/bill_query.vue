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
      stripe
      style="width: 100%"
      :default-sort="{prop: 'entryDate', order: 'descending'}"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="55" />
      <el-table-column prop="#" type="index" label="序号" />
      <el-table-column v-if="colData[0].istrue" prop="invoiceDataCode" label="发票序号" />
      <el-table-column
        v-if="colData[1].istrue"
        prop="invoiceTypeCode"
        label="发票类型"
        :formatter="formatBillType"
      />
      <el-table-column v-if="colData[2].istrue" prop="salesName" label="销售方名称" />
      <el-table-column v-if="colData[3].istrue" prop="totalTaxSum" label="价税合计" />
      <el-table-column v-if="colData[4].istrue" prop="entryDate" sortable label="录入时间" :formatter="formatEntryTime" />
      <el-table-column v-if="colData[5].istrue" prop="zymc" label="归属人" />
      <el-table-column v-if="colData[6].istrue" prop="bmmc" label="归属部门" />
      <el-table-column v-if="colData[7].istrue" prop="invoiceTypeName" label="发票名称" />
      <el-table-column v-if="colData[8].istrue" prop="billingTime" label="开票日期" />
      <el-table-column v-if="colData[9].istrue" prop="checkDate" label="查询日期" />
      <el-table-column v-if="colData[10].istrue" prop="checkCode" label="校验码" />
      <el-table-column v-if="colData[11].istrue" prop="taxDiskCode" label="机器码" />
      <el-table-column v-if="colData[12].istrue" prop="purchaserName" label="购方名称" />

      <el-table-column v-if="colData[13].istrue" prop="taxpayerNumber" label="购方纳税人识别号" />
      <el-table-column v-if="colData[14].istrue" prop="taxpayerBankAccount" label="购方银行账号" />
      <el-table-column v-if="colData[15].istrue" prop="taxpayerAddressOrId" label="购方地址，电话" />
      <el-table-column v-if="colData[16].istrue" prop="totalTaxNum" label="税额" />

      <el-table-column v-if="colData[17].istrue" prop="totalAmount" label="不含税价（金额）" />
      <el-table-column v-if="colData[18].istrue" prop="invoiceRemarks" label="备注" />
      <el-table-column
        v-if="colData[19].istrue"
        prop="isBillMark"
        label="是否为清单票"
        :formatter="isBillMark"
      />
      <el-table-column v-if="colData[20].istrue" prop="voidMark" label="作废标志" :formatter="voidMark" />
      <el-table-column v-if="colData[21].istrue" prop="tollSignName" label="收费标志名称" />
      <el-table-column fixed="right" label="操作" width="100">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="Billdetail(scope.row)">查看详情</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- </el-tab-pane>
      <el-tab-pane label="其他发票" name="second">其他发票</el-tab-pane>
    </el-tabs>-->
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
const dwbm = { dwbm: localStorage.getItem('dwbm') }
import common from './model/common'
import pass from './model/pass'
import volume from './model/volume'
import { queryData } from '../../api/common'
function formateDate(datetime) {
  function addDateZero(num) {
    return (num < 10 ? '0' + num : num)
  }
  const d = new Date(datetime)
  const formatdatetime = d.getFullYear() + '-' + addDateZero(d.getMonth() + 1) + '-' + addDateZero(d.getDate())
  return formatdatetime
}
export default {
  components: {
    common,
    pass,
    volume
  },
  data() {
    return {
      detailData: [],
      multipleSelection: [],
      showBtn: false,
      value2: '',
      commonVisible: false,
      passVisible: false,
      volumeVisible: false,
      pickerOptions: {
        shortcuts: [
          {
            text: '最近一周',
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
              picker.$emit('pick', [start, end])
            }
          }
        ]
      },
      bmOptions: [], // 所有部门
      billType: [], // 发票类型
      form: {
        user: '',
        region: '',
        billingTime: '', // 开票日期
        entryDate: '', // 录入时间
        fp_gsbm: '', // 所在部门
        invoiceTypeCode: '',
        maxPrice: '',
        minPrice: '',
        invoiceDataCode: '', // 发票代码
        invoiceNumber: '', // 发票号码
        salesName: '' // 销售方名称
      },
      tableData: [],
      formatBillType: function(row, column, cellValue) {
        if (cellValue == '01') {
          return '增值税专票'
        } else if (cellValue == '04') {
          return '增值税普通发票'
        } else if (cellValue == '10') {
          return '电子发票'
        } else if (cellValue == '11') {
          return '卷式普通发票'
        } else if (cellValue == '14') {
          return '电子普通[通行费]发票'
        } else {
          return cellValue
        }
      },
      formatEntryTime: function(row, column, cellValue) {
        return formateDate(cellValue)
      },
      isBillMark: function(row, column, cellValue) {
        return cellValue == 'Y' ? '是' : '否'
      },
      voidMark: function(row, column, cellValue) {
        return cellValue == '0' ? '正常' : '作废'
      },
      // 列名
      colData: [
        { title: '发票序号', istrue: true, prop: 'invoiceDataCode' },
        { title: '发票类型', istrue: true, prop: 'invoiceTypeCode' },
        { title: '销售方名称', istrue: true, prop: 'salesName' },
        { title: '价税合计', istrue: true, prop: 'totalTaxSum' },
        { title: '录入时间', istrue: true, prop: 'entryDate' },
        { title: '归属人', istrue: true, prop: 'zymc' },
        { title: '归属部门', istrue: true, prop: 'bmmc' },

        { title: '发票名称', istrue: false, prop: 'invoiceTypeName' },
        { title: '开票日期', istrue: false, prop: 'billingTime' },
        { title: '查询日期', istrue: false, prop: 'checkDate' },
        { title: '校验码', istrue: false, prop: 'checkCode' },
        { title: '机器码', istrue: false, prop: 'taxDiskCode' },
        { title: '购方名称', istrue: false, prop: 'purchaserName' },
        { title: '购方纳税人识别号', istrue: false, prop: 'taxpayerNumber' },
        { title: '购方银行账号', istrue: false, prop: 'taxpayerBankAccount' },
        { title: '购方地址，电话', istrue: false, prop: 'taxpayerAddressOrId' },

        { title: '税额', istrue: false, prop: 'totalTaxNum' },
        { title: '不含税价（金额）', istrue: false, prop: 'totalAmount' },
        { title: '备注', istrue: false, prop: 'invoiceRemarks' },
        { title: '是否为清单票', istrue: false, prop: 'isBillMark' },
        { title: '作废标志', istrue: false, prop: 'voidMark' },
        { title: '收费标志名称', istrue: false, prop: 'tollSignName' }
      ],
      colOptions: [],
      colSelect: [],
      selectArr: [],
      colProps: [],
      downloadLoading: false,
      filename: '发票列表',
      autoWidth: true,
      bookType: 'xlsx'
    }
  },
  watch: {
    colOptions(valArr) {
      var arr = this.colSelect.filter(i => valArr.indexOf(i) < 0) // 未选中
      this.selectArr = this.colSelect.filter(i => valArr.indexOf(i) > -1) // 选中
      this.colData.filter(i => {
        if (arr.indexOf(i.title) != -1) {
          i.istrue = false
          this.$nextTick(() => {
            this.$refs.tableDataRef.doLayout()
          })
        } else {
          i.istrue = true
          this.$nextTick(() => {
            this.$refs.tableDataRef.doLayout()
          })
        }
      })
      this.colProps = []
      this.colData.filter(i => {
        if (this.selectArr.indexOf(i.title) != -1) {
          this.colProps.push(i.prop)
        }
      })
    }
  },
  created() {
    // 加载table
    var _this = this
    for (let i = 0; i < _this.colData.length; i++) {
      _this.colSelect.push(_this.colData[i].title)
      if (i > 6) {
        // 初始化不想展示的列可以放在这个条件里
        continue
      }
      console.log(_this.colData[i].prop)
      _this.colOptions.push(_this.colData[i].title)
      _this.colProps.push(_this.colData[i].prop)
      _this.selectArr.push(_this.colData[i].title)
    }
    console.log(_this.selectArr)
    console.log('初始化', _this.colProps)
  },
  mounted() {
    this.getData()
    this.getAllBm()
    this.getBillType()
  },
  methods: {
    deleteBills() {
      const m = this.multipleSelection
      const selectId = []
      for (let i = 0; i < m.length; i++) {
        selectId.push(m[i].id)
      }
      this.$confirm('此操作将永久删除, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          queryData('/bill/deleteBills', { ids: selectId }, 'POST')
            .then(res => {
              if (res.code == 0) {
                this.$message.success('删除成功')
                this.getData()
              } else {
                this.$message.error(res.message)
              }
            })
            .catch(err => {
              this.$message.error(err)
            })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
      if (val.length > 0) {
        this.showBtn = true
      } else {
        this.showBtn = false
      }
      console.log(val)
    },
    Billdetail(row) {
      this.detailData = JSON.parse(row.fp_detail)
      const billType = this.detailData.invoiceTypeCode
      if (billType == '01' || billType == '04' || billType == '10') {
        this.commonVisible = true
      } else if (billType == '11') {
        this.volumeVisible = true
      } else if (billType == '14') {
        // 通行证
        this.passVisible = true
      }

      console.log('qwe', this.detailData)
    },
    getAllBm() {
      queryData('/manager/queryAllBm', dwbm, 'POST').then(res => {
        if (res.code == 0) {
          this.bmOptions = res.data.data
        }
      })
    },
    getBillType() {
      queryData('/bill/getBillType', dwbm, 'POST').then(res => {
        if (res.code == 0) {
          this.billType = res.data
        }
      })
    },
    getData() {
      const param = Object.assign(this.form, dwbm)
      console.log('请求参数：', param)
      queryData('/bill/getBillList', param, 'POST').then(res => {
        if (res.code == 0) {
          console.log(res)
          this.tableData = res.data
          for (let i = 0; i < res.data.length; i++) {
            const detail = JSON.parse(res.data[i].fp_detail)
            this.tableData[i].invoiceTypeName = detail.invoiceTypeName
            this.tableData[i].invoiceTypeCode = detail.invoiceTypeCode
            this.tableData[i].billingTime = detail.billingTime
            this.tableData[i].checkDate = detail.checkDate
            this.tableData[i].checkCode = detail.checkCode
            this.tableData[i].taxDiskCode = detail.taxDiskCode
            this.tableData[i].purchaserName = detail.purchaserName
            this.tableData[i].taxpayerNumber = detail.taxpayerNumber
            this.tableData[i].taxpayerBankAccount = detail.taxpayerBankAccount
            this.tableData[i].taxpayerAddressOrId = detail.taxpayerAddressOrId
            this.tableData[i].totalAmount = detail.totalAmount
            this.tableData[i].totalTaxSum = detail.totalTaxSum
            this.tableData[i].totalTaxNum = detail.totalTaxNum
            this.tableData[i].invoiceRemarks = detail.invoiceRemarks
            this.tableData[i].isBillMark = detail.isBillMark
            this.tableData[i].voidMark = detail.voidMark
            this.tableData[i].tollSignName = detail.tollSignName
          }
        }
        console.log(this.tableData)
      })
    },
    handleClick(tab, event) {
      console.log(tab, event)
    },
    onSubmit() {
      console.log('submit!')
    },
    // 重置
    resetForm() {
      this.form = {}
      this.getData()
    },
    // 下载
    handleDownload() {
      this.downloadLoading = true
      const _this = this
      import('@/vendor/Export2Excel').then(excel => {
        const tHeader = _this.selectArr
        const filterVal = _this.colProps
        const list = this.tableData
        const data = this.formatJson(filterVal, list)
        console.log(data)
        excel.export_json_to_excel({
          header: tHeader,
          data,
          filename: this.filename,
          autoWidth: this.autoWidth,
          bookType: this.bookType
        })
        this.downloadLoading = false
      })
    },
    formatJson(filterVal, jsonData) {
      return jsonData.map(v =>
        filterVal.map(j => {
          if (j === 'timestamp') {
            return parseTime(v[j])
          } else {
            return v[j]
          }
        })
      )
    }
  }
}
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
