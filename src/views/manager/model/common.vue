<template>
    <div>
        <el-row type="flex" style="margin-top:-15px;" class="goodsDetail">
          <el-col :span="5">
            <el-row>
              <el-col>货物或应税劳务、服务名称</el-col>
            </el-row>
          </el-col>
          <el-col :span="3">
            <el-row>
              <el-col>规格型号</el-col>
            </el-row>
          </el-col>
          <el-col :span="2">
            <el-row>
              <el-col>单位</el-col>
            </el-row>
          </el-col>
          <el-col :span="2">
            <el-row>
              <el-col>数量</el-col>
            </el-row>
          </el-col>
          <el-col :span="3">
            <el-row>
              <el-col>单价</el-col>
            </el-row>
          </el-col>
          <el-col :span="4">
            <el-row>
              <el-col>金额</el-col>
            </el-row>
          </el-col>
          <el-col :span="1">
            <el-row>
              <el-col>税率</el-col>
            </el-row>
          </el-col>
          <el-col :span="4">
            <el-row>
              <el-col>税额</el-col>
            </el-row>
          </el-col>
        </el-row>
       <el-row type="flex" class="goodsDetail" v-for="item in detail.invoiceDetailData">
          <el-col :span="5">
            <el-row>
              <el-col class="purple">{{item.goodserviceName}}</el-col>
            </el-row>
          </el-col>
          <el-col :span="3">
            <el-row>
              <el-col class="purple">{{item.model}}</el-col>
            </el-row>
          </el-col>
          <el-col :span="2">
            <el-row>
              <el-col class="purple">{{item.unit}}</el-col>
            </el-row>
          </el-col>
          <el-col :span="2">
            <el-row>
              <el-col class="purple">{{parseFloat(item.number).toFixed(2)}}</el-col>
            </el-row>
          </el-col>
          <el-col :span="3">
            <el-row>
              <el-col class="purple">{{parseFloat(item.price).toFixed(2)}}</el-col>
            </el-row>
          </el-col>
          <el-col :span="4">
            <el-row>
              <el-col class="purple">{{item.sum}}</el-col>
            </el-row>
          </el-col>
          <el-col :span="1">
            <el-row>
              <el-col class="purple">{{item.taxRate}}</el-col>
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
              <el-col class="purple">￥{{detail.totalAmount}}</el-col>
            </el-row>
          </el-col>
          <el-col :span="1">
            <el-row>
              <el-col></el-col>
            </el-row>
          </el-col>
          <el-col :span="4">
            <el-row>
              <el-col class="purple">￥{{detail.totalTaxNum}}</el-col>
            </el-row>
          </el-col>
        </el-row>
    
    </div>
</template>

<script>
export default {
    name:'common',
    props:{
        detail:Object,
        require:true
    },


}
</script>
<style lang="scss" scoped>
.goodsDetail {
    height: auto;
    border-left: 1px solid #eee;
    border-right: 1px solid #eee;
    border-bottom: 1px solid #eee;
    &:first-child{
        border-top:1px solid #eee;
        font-weight: bold;
    }
  }

  .goodsDetail .el-row {
    text-align: center;
    line-height: 40px;
    // border-bottom: 1px solid #ddd;
  }
</style>