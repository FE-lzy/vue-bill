<template>
  <div>
    <div class="box">
      <el-row style="height:165px;">
        <el-col :span="1">
          <div class="grid-content bg-purple-dark topTitle">
            购
            <br />买
            <br />方
          </div>
        </el-col>
        <el-col :span="16">
          <div class="grid-content bg-purple-light buyDetail">
            <el-row>
              <el-col :span="6">名称：</el-col>
              <el-col :span="18">1212232</el-col>
            </el-row>
            <el-row>
              <el-col :span="6">纳税人识别号：</el-col>
              <el-col :span="18">1212232</el-col>
            </el-row>
            <el-row>
              <el-col :span="6">地址、电话：</el-col>
              <el-col :span="18">1212232</el-col>
            </el-row>
            <el-row>
              <el-col :span="6">开户行及账号：</el-col>
              <el-col :span="18">1212232</el-col>
            </el-row>
          </div>
        </el-col>
        <el-col :span="1">
          <div class="grid-content bg-purple-dark topTitle">
            密
            <br />码
            <br />区
          </div>
        </el-col>
        <el-col :span="6" style="height:100%">
          <div class="grid-content bg-purple-light"></div>
        </el-col>
      </el-row>
      <br />
      <el-row style="height:95px;margin-top:-17px;border:1px solid #ddd;" class="goodsDetail">
        <el-col :span="5">
          <el-row>
            <el-col>货物或应税劳务、服务名称</el-col>
          </el-row>
          <el-row>
            <el-col>墨盒</el-col>
          </el-row>
          <el-row>
            <el-col>合计</el-col>
          </el-row>
        </el-col>
        <el-col :span="3">
          <el-row>
            <el-col>规格型号</el-col>
            <el-col>3</el-col>
            <el-col>3</el-col>
          </el-row>
        </el-col>
        <el-col :span="2">
          <el-row>
            <el-col>单位</el-col>
            <el-col>3</el-col>
            <el-col>3</el-col>
          </el-row>
        </el-col>
        <el-col :span="2">
          <el-row>
            <el-col>数量</el-col>
            <el-col>3</el-col>
            <el-col>3</el-col>
          </el-row>
        </el-col>
        <el-col :span="3">
          <el-row>
            <el-col>单价</el-col>
            <el-col>34</el-col>
            <el-col>4</el-col>
          </el-row>
        </el-col>
        <el-col :span="4">
          <el-row>
            <el-col>金额</el-col>
            <el-col>3</el-col>
            <el-col>4</el-col>
          </el-row>
        </el-col>
        <el-col :span="1">
          <el-row>
            <el-col>税率</el-col>
            <el-col>1</el-col>
            <el-col>2</el-col>
          </el-row>
        </el-col>
        <el-col :span="4">
          <el-row>
            <el-col>税额</el-col>
            <el-col>3</el-col>
            <el-col>4</el-col>
          </el-row>
        </el-col>
      </el-row>
      <el-row style="height:40px;line-height:40px;text-align:center">
          <el-col :span="5">价格合计(大写)</el-col>
          <el-col :span="19">六百五十体验版</el-col>
      </el-row>
      <el-row style="height:165px;">
        <el-col :span="1">
          <div class="grid-content bg-purple-dark topTitle">
            销
            <br />售
            <br />方
          </div>
        </el-col>
        <el-col :span="16">
          <div class="grid-content bg-purple-light buyDetail">
            <el-row>
              <el-col :span="6">名称：</el-col>
              <el-col :span="18">1212232</el-col>
            </el-row>
            <el-row>
              <el-col :span="6">纳税人识别号：</el-col>
              <el-col :span="18">1212232</el-col>
            </el-row>
            <el-row>
              <el-col :span="6">地址、电话：</el-col>
              <el-col :span="18">1212232</el-col>
            </el-row>
            <el-row>
              <el-col :span="6">开户行及账号：</el-col>
              <el-col :span="18">1212232</el-col>
            </el-row>
          </div>
        </el-col>
        <el-col :span="1">
          <div class="grid-content bg-purple-dark topTitle">
            备
            <br />注
            <br/>区
          </div>
        </el-col>
        <el-col :span="6" style="height:100%">
          <div class="grid-content bg-purple-light"></div>
        </el-col>
      </el-row>
      <!-- <div style="height:100px;border:1px solid #ddd;width:100%;box-sizing:border-box">
        <span style="width:5%;display:inline-block">购<br/>买<br/>方</span>
        <span style="width:50%;display:inline-block">
          <div>
            <span style="width:25%;display:inline-block">12</span>
            <span style="width:70%;display:inline-block">2121</span>
          </div>
          <div>
            <span style="width:25%;display:inline-block">12</span>
            <span style="width:70%;display:inline-block">2121</span>
          </div>
          <div>
            <span style="width:25%;display:inline-block">12</span>
            <span style="width:70%;display:inline-block">2121</span>
          </div>
          <div>
            <span style="width:25%;display:inline-block">12</span>
            <span style="width:70%;display:inline-block">2121</span>
          </div>
        </span>
        <span style="width:5%;display:inline-block">3</span>
        <span style="width:30%;display:inline-block">4</span>
      </div>-->
    </div>
  </div>
</template>
<script>
export default {
  name: "bill"
};
</script>

<style >
.buyDetail .el-row {
  line-height: 40px;
}
.goodsDetail .el-row{
    text-align: center;
    line-height: 30px;
    border-left: 0.5px solid #dddddd;
    border-right: 0.5px solid #dddddd;
}
.goodsDetail .el-col{
    border: none
}
.topTitle {
  line-height: 55px;
  text-align: center;
  height: 100%;
}
.el-col {
  border: 0.5px solid #ddd;
}
.bg-purple-dark {
  background: #99a9bf;
}
.bg-purple {
  background: #d3dce6;
}
.bg-purple-light {
  background: #e5e9f2;
}
.grid-content {
  min-height: 36px;
}
.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}
.box {
  padding: 10px;
}
</style>