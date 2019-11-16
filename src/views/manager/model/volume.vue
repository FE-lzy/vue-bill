<template>
  <div>
    <el-row type="flex" style="margin-top:-15px;" class="goodsDetail">
      <el-col :span="7">
        <el-row>
          <el-col>货物或应税劳务、服务名称</el-col>
        </el-row>
      </el-col>
      <el-col :span="5">
        <el-row>
          <el-col>单价</el-col>
        </el-row>
      </el-col>
      <el-col :span="4">
        <el-row>
          <el-col>数量</el-col>
        </el-row>
      </el-col>
      <el-col :span="4">
        <el-row>
          <el-col>金额</el-col>
        </el-row>
      </el-col>
      <el-col :span="4">
        <el-row>
          <el-col>税额</el-col>
        </el-row>
      </el-col>
    </el-row>
    <el-row type="flex" class="goodsDetail" v-for="item in detail.invoiceDetailData">
      <el-col :span="7">
        <el-row>
          <el-col class="purple">{{item.goodserviceName}}</el-col>
        </el-row>
      </el-col>
      <el-col :span="5">
        <el-row>
          <el-col class="purple">￥{{item.price | numFilter}}</el-col>
        </el-row>
      </el-col>
      <el-col :span="4">
        <el-row>
          <el-col class="purple">{{item.number | numFilter}}</el-col>
        </el-row>
      </el-col>
      <el-col :span="4">
        <el-row>
          <el-col class="purple">{{item.sum}}</el-col>
        </el-row>
      </el-col>
      <el-col :span="4">
        <el-row>
          <el-col class="purple">{{item.tax}}</el-col>
        </el-row>
      </el-col>
    </el-row>
    <el-row type="flex" class="goodsDetail">
      <el-col :span="5">
        <el-row>
          <el-col>合计</el-col>
        </el-row>
      </el-col>
      <el-col :span="3">
        <el-row>
          <el-col></el-col>
        </el-row>
      </el-col>
      <el-col :span="2">
        <el-row>
          <el-col></el-col>
        </el-row>
      </el-col>
      <el-col :span="2">
        <el-row>
          <el-col></el-col>
        </el-row>
      </el-col>
      <el-col :span="3">
        <el-row>
          <el-col></el-col>
        </el-row>
      </el-col>
      <el-col :span="4">
        <el-row>
          <el-col></el-col>
        </el-row>
      </el-col>
      <el-col :span="1">
        <el-row>
          <el-col></el-col>
        </el-row>
      </el-col>
      <el-col :span="4">
        <el-row>
          <el-col class="purple">￥{{detail.totalTaxSum}}</el-col>
        </el-row>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: "common",
  props: {
    detail: Object,
    require: true
  },
  filters: {
    numFilter(value) {
      let realVal = "";
      if (value) {
        // 截取当前数据到小数点后两位
        realVal = parseFloat(value).toFixed(2);
      } else {
        realVal = "--";
      }
      return realVal;
    }
  }
};
</script>
<style lang="scss" scoped>
.goodsDetail {
  height: auto;
  border-left: 1px solid #eee;
  border-right: 1px solid #eee;
  border-bottom: 1px solid #eee;
  &:first-child {
    border-top: 1px solid #eee;
    font-weight: bold;
  }
}

.goodsDetail .el-row {
  text-align: center;
  line-height: 40px;
  // border-bottom: 1px solid #ddd;
}
</style>