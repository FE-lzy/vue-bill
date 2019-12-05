<template>
  <div>
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="根据开票日期统计" name="billingTime">
        <el-table :data="tableData" show-summary style="width: 100%">
          <el-table-column prop="name" label="发票类型" />
          <el-table-column prop="typeCount" label="统计张数" />
          <el-table-column prop="taxsum" label="金额合计" />
          <el-table-column prop="taxnum" label="税额合计" />
          <el-table-column prop="total" label="合计" />
        </el-table>
      </el-tab-pane>
      <el-tab-pane label="根据录入日期统计" name="entryDate">
        <el-table :data="tableData" show-summary style="width: 100%">
          <el-table-column prop="name" label="发票类型" />
          <el-table-column prop="typeCount" label="统计张数" />
          <el-table-column prop="taxsum" label="金额合计" />
          <el-table-column prop="taxnum" label="税额合计" />
          <el-table-column prop="total" label="合计" />
        </el-table>
      </el-tab-pane>
    </el-tabs>
    <div class="pickMonth">
      <el-date-picker v-model="pickMonth" type="month" placeholder="选择月" @change="changeMonth" />
    </div>
  </div>
</template>

<script>
import { transactionList } from '@/api/remote-search'
import { queryData } from '../../../../api/common'
const dwbm = { dwbm: localStorage.getItem('dwbm') }
export default {
  filters: {
    statusFilter(status) {
      const statusMap = {
        success: 'success',
        pending: 'danger'
      }
      return statusMap[status]
    },
    orderNoFilter(str) {
      return str.substring(0, 30)
    }
  },
  data() {
    return {
      list: null,
      activeName: 'billingTime',
      pickMonth: new Date(),
      tableData: []
    }
  },

  mounted() {
    this.getBillTypeCount()
  },
  methods: {
    changeMonth() {
      this.getBillTypeCount()
    },
    handleClick(tab, event) {
      this.getBillTypeCount()
    },
    getSummaries(param) {
      const { columns, data } = param
      const sums = []
      columns.forEach((column, index) => {
        if (index === 0) {
          sums[index] = '总价'
          return
        }
        const values = data.map(item => Number(item[column.property]))
        if (!values.every(value => isNaN(value))) {
          sums[index] = values.reduce((prev, curr) => {
            const value = Number(curr)
            if (!isNaN(value)) {
              return prev + curr
            } else {
              return prev
            }
          }, 0)
          sums[index] += ' 元'
        } else {
          sums[index] = 'N/A'
        }
      })

      return sums
    },
    getBillTypeCount() {
      const d = this.pickMonth
      const month = d.getFullYear() + '-' + (d.getMonth() + 1 < 10 ? '0' + (d.getMonth() + 1) : (d.getMonth() + 1))
      console.log(month)
      const param = Object.assign({ pickMonth: month, timeType: this.activeName }, dwbm)
      queryData('/manager/getBillTypeCount', param, 'POST').then(res => {
        console.log(res)
        if (res.code == 0) {
          this.tableData = res.data
        }
      })
    }
  }
}
</script>
<style scoped>
.el-tabs__item:hover {
  color: #1890ff !important;
  cursor: pointer !important;
}
.el-tabs__item.is-active {
  color: #1890ff !important;
}
.pickMonth {
  position: absolute;
  right: 30px;
  top: -7px;
}
</style>
