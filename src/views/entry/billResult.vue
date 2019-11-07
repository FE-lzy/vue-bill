<template>
  <div class="content">
    <div class="left">
      <div class="top">
        <h3>发票查验明细</h3>
        <div class="titlebox">
          <el-row>
            <el-col :span="6">查验次数：第二次</el-col>
            <el-col :span="6">查验时间：2012.10.21</el-col>
          </el-row>
        </div>
        <p class="billTitle" style="text-align:center">xxx增值税电子发票</p>
        <div class="billinfo">
          <span>发票代码：154454112</span>
          <span>发票代码：154454112</span>
          <span>发票代码：154454112</span>
          <span>发票代码：154454112</span>
        </div>
      </div>

      <div class="box">
        <el-row type="flex" style="border: 1px solid #ccc">
          <el-col :span="1">
            <div class="topTitle" style="border-right:1px solid #ccc">
              购
              <br />买
              <br />方
            </div>
          </el-col>
          <el-col :span="16" style="border-right:1px solid #ccc">
            <div class="buyDetail">
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
            <div class="topTitle" style="border-right:1px solid #ccc">
              密
              <br />码
              <br />区
            </div>
          </el-col>
          <el-col :span="6" style="height:100%">
            <div></div>
          </el-col>
        </el-row>
        <br />
        <el-row
          type="flex"
          style="height:95px;margin-top:-15px;border: 1px solid #ccc"
          class="goodsDetail"
        >
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
        <el-row
          type="flex"
          style="border: 1px solid #ccc;height:40px;line-height:40px;text-align:center"
        >
          <el-col :span="5" style="border-right:1px solid #ccc">价格合计(大写)</el-col>
          <el-col :span="19">六百五十体验版</el-col>
        </el-row>
        <el-row type="flex" style="border: 1px solid #ccc">
          <el-col :span="1" style="border-right:1px solid #ccc">
            <div class="topTitle">
              销
              <br />售
              <br />方
            </div>
          </el-col>
          <el-col :span="16" style="border-right:1px solid #ccc">
            <div class="buyDetail">
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
            <div class="topTitle" style="border-right:1px solid #ccc">
              备
              <br />注
              <br />区
            </div>
          </el-col>
          <el-col :span="6" style="height:100%">
            <div></div>
          </el-col>
        </el-row>
      </div>
    </div>

    <div class="right">
      <h2 style="text-align:center">发票录入</h2>
      <el-form :label-position="labelPosition" label-width="100px" :model="formLabelAlign">
        <el-form-item label="发票归属人">
          <el-input v-model="formLabelAlign.name"></el-input>
        </el-form-item>
        <el-form-item label="发票归属部门">
          <el-input v-model="formLabelAlign.region"></el-input>
        </el-form-item>
        <el-form-item label="备注">
          <el-input type="textarea" :rows="2" placeholder="请输入内容" v-model="textarea"></el-input>
        </el-form-item>
        <div style="text-align:center">
          <el-button type="primary">录入</el-button>
          <el-button>返回</el-button>
        </div>
      </el-form>
    </div>
  </div>
</template>
<script>
export default {
  name: "bill",
  data() {
    return {
      labelPosition: "right",
      formLabelAlign: {
        name: "",
        region: "",
        type: ""
      }
    };
  }
};
</script>

<style lang="scss">

.content {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
}
.left {
  padding: 10px;
  width: 60%;
  min-width: 820px;
}
.right {
  padding: 10px;
  width: 35%;
  margin-top: 150px;
}
.el-form {
  border-radius: 2px;
  padding: 30px;
  max-width: 360px;
}
.el-input--medium .el-input__inner {
  width: 100%;
}
.top {
  .billTitle {
    text-align: center;
    font-size: 20px;
    color: blue;
    font-weight: 400;
  }
  .billinfo {
    font-size: 13px;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
  }
  .titlebox {
    padding: 10px;
    background: #42b983;
    font-size: 14px;
    color: #fff;
  }
}

.box {
  width: 100%;
  font-size: 13px;
  .buyDetail .el-row {
    line-height: 30px;
  }
  .buyDetail .el-row {
    border-bottom: 1px solid #ddd;
  }
  .goodsDetail {
    height: 124px;
  }
  .goodsDetail .el-row {
    text-align: center;
    line-height: 30px;
    border-right:1px solid #ccc;
  }
  .topTitle {
    line-height: 39px;
    vertical-align: middle;
    text-align: center;
    height: 100%;
  }
  .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }
}
</style>