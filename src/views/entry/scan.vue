<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="12">
        <div class="grid-content">
          <h3 style="text-align:center;">扫描录入</h3>
          <h4 style="text-align:center;">(请确保扫描设备已连接到我的电脑)</h4>
          <div style="display:flex;justify-content: center;">
            <el-input
              ref="scanStr"
              v-model="scanStr"
              type="textarea"
              :autosize="{ minRows: 2, maxRows: 4}"
              placeholder="请使用扫描设备扫描发票二维码，扫描过程请保持输入框聚焦状态"
              style="text-align:center;"
              @input="changeT"
            />
          </div>

          <h5 />
          <img src="@/assets/scan1.png" style="width:100%" />

          <!-- <el-button @click="scanQuery">查询</el-button> -->
        </div>
      </el-col>
      <el-col :span="12">
        <div class="grid-content">
          <h2 class="title">手动输入</h2>

          <el-form
            ref="validForm"
            :model="ruleForm"
            status-icon
            label-width="120px"
            class="demo-ruleForm form-div"
          >
            <el-form-item
              label="发票类型"
              prop="invoiceCode"
              :rules="[
                  { required: true, message: '请输入', trigger: 'blur' },
                ]"
            >
              <el-select v-model="billType" @change="getBillType" placeholder="请选择发票类型">
                <el-option
                  v-for="item in billOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item
              label="发票代码"
              prop="invoiceCode"
              :rules="[
                { required: true, message: '请输入', trigger: 'blur' },
              ]"
            >
              <el-input v-model="ruleForm.invoiceCode" type="text" placeholder="输入发票代码" />
            </el-form-item>
            <el-form-item
              label="发票号码"
              prop="invoiceNumber"
              :rules="[
                { required: true, message: '请输入', trigger: 'blur' },
              ]"
            >
              <el-input v-model="ruleForm.invoiceNumber" type="text" placeholder="输入发票号码" />
            </el-form-item>
            <el-form-item
              style="width:100%;"
              label="开票日期"
              prop="billTime"
              :rules="[
                { required: true, message: '请输入', trigger: 'blur' },
              ]"
            >
              <el-date-picker
                v-model="ruleForm.billTime"
                type="date"
                placeholder="选择开票日期"
                value-format="yyyy-MM-dd"
              />
            </el-form-item>
            <el-form-item
              label="校验码后六位"
              prop="checkCode"
              v-if="billType == 1 ? true : false"
              :rules="[
                { required: true, message: '请输入', trigger: 'blur' },
              ]"
            >
              <el-input v-model="ruleForm.checkCode" placeholder="输入校验码后六位" />
            </el-form-item>
            <el-form-item
              label="税前金额"
              prop="invoiceAmount"
              v-if="billType == 2 ? true : false"
              :rules="[
                  { required: true, message: '请输入', trigger: 'blur' },
                ]"
            >
              <el-input v-model="ruleForm.invoiceAmount" placeholder="输入税前金额"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button
                type="primary"
                @click="submitForm('validForm')"
                v-loading.fullscreen.lock="fullscreenLoading"
              >查验</el-button>
            </el-form-item>
          </el-form>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
const dwbm = { dwbm: localStorage.getItem("dwbm") };
import { queryData } from "@/api/common";
export default {
  name: "Scan",
  data() {
    return {
      ruleForm: {
        invoiceCode: "",
        invoiceNumber: "",
        billTime: "",
        invoiceAmount: "",
        checkCode: ""
      },
      fullscreenLoading: false,
      beginInter: true,
      scanStr: "",
      billType: '1',
      billOptions: [
        {
          value: "1",
          label: "普通发票/增值税电子发票/卷式普通发票/电子普通[通行费]发票"
        },
        {
          value: "2",
          label: "xx增值税(机动车/二手车销售发票),专用发票"
        }
      ]
    };
  },
  mounted() {
    this.$refs.scanStr.focus();
  },
  methods: {
    getBillType(){
        4400192130
    },
    changeT(val) {
      console.log(val, this.beginInter);
      this.scanStr = val;
      const _this = this;
      if (this.beginInter) {
        this.beginInter = false;
        this.fullscreenLoading = true;
        setTimeout(function() {
          _this.beginInter = true;
          // _this.fullscreenLoading = false;
          _this.scanQuery();
        }, 800);
      }
    },
    // 扫码验证判断
    scanQuery() {
      if (this.scanStr) {
        // 是否存在
        this.fetchIsHave("scan");
      }
    },
    // 手动查验
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.fullscreenLoading = true;
          this.fetchIsHave("code");
        } else {
          return false;
        }
      });
    },
    // 判断是否录入
    fetchIsHave(type) {
      console.log(this.scanStr);
      const code =
        type == "scan" ? this.scanStr.split(",")[2] : this.ruleForm.invoiceCode;
      const number =
        type == "scan"
          ? this.scanStr.split(",")[3]
          : this.ruleForm.invoiceNumber;
      queryData(
        "/bill/getBillInfo",
        { code: code, number: number },
        "POST"
      ).then(res => {
        console.log(res);
        if (res.code == 0) {
          this.choiceModel(
            JSON.parse(res.data.fp_detail.fp_detail).invoiceTypeCode,
            res.data,
            true
          );
        } else {
          if (type == "scan") {
            this.queryByScan();
          } else {
            this.queryByCode();
          }
        }
      });
    },

    // 手动
    queryByCode() {
      const token = localStorage.getItem("lsToken");
      const queryparam = Object.assign(this.ruleForm, dwbm, { token: token });
      console.log("请求参数", queryparam);
      const _this = this;
      queryData("/bill/queryBillByCode", queryparam, "post")
        .then(result => {
          console.log(result);
          if (
            result.code == -1 &&
            result.data &&
            result.data.error == "token error"
          ) {
            queryData("/bill/getToken", {}, "POST").then(token => {
              localStorage.removeItem("lsToken");
              localStorage.setItem("lsToken", token.message);
              this.queryByCode();
            });
          }
          if (result.code == 0) {
            _this.choiceModel(
              JSON.parse(result.data.invoiceResult).invoiceTypeCode,
              result.data.invoiceResult,
              false
            );
          } else {
            _this.fullscreenLoading = false;
            _this.$message.error(result.message);
          }
        })
        .catch(err => {
          console.log("捕捉err", err);
          _this.fullscreenLoading = false;
        });
    },

    // 根据扫码验证
    queryByScan() {
      const queryparam = {
        scanStr: this.scanStr,
        token: localStorage.getItem("lsToken")
      };
      console.log(queryparam);
      let _this = this;
      queryData(
        "/bill/queryBillByScan",
        Object.assign(queryparam, dwbm),
        "post"
      )
        .then(res => {
          if (res) {
            console.log(res);
            if (res.code == -1 && res.data && res.data.error == "token error") {
              queryData("/bill/getToken", {}, "POST").then(token => {
                localStorage.removeItem("lsToken");
                localStorage.setItem("lsToken", token.message);
                this.queryByScan();
              });
            }
          }
          if (res.code == 0) {
            if (res.data.resultCode == "1000") {
              this.choiceModel(
                JSON.parse(res.data.invoiceResult).invoiceTypeCode,
                res.data.invoiceResult,
                false
              );
            } else {
              this.fullscreenLoading = false;
              _this.scanStr = "";
              _this.$message.error(res.message);
            }
          } else {
            this.fullscreenLoading = false;
            _this.scanStr = "";
             _this.$message.error(res.message);
          }
          
        })
        .catch(err => {
          this.fullscreenLoading = false;
          console.log("扫码捕捉err", err);
        });
    },
    // 选择模板
    choiceModel(billType, data, isHave) {
      this.fullscreenLoading = false;
      if (billType == "01" || billType == "04" || billType == "10") {
        this.$router.push({
          name: "普通发票结果",
          params: { type: "scan", scanStr: data, isHave: isHave }
        });
      } else if (billType == "11") {
        // 卷式发票
        this.$router.push({
          name: "卷式发票结果",
          params: { type: "scan", scanStr: data, isHave: isHave }
        });
      } else if (billType == "14") {
        // 卷式发票结果
        this.$router.push({
          name: "通行证发票结果",
          params: { type: "scan", scanStr: data, isHave: isHave }
        });
      } else {
        this.$message.warning(
          "目前仅支持查验普通发票/增值税电子发票/卷式普通发票/电子普通[通行费]发票"
        );
      }
    }
  }
};
</script>

<style scoped lang="scss">
.el-textarea__inner::-ms-input-placeholder {
  text-align: center;
}
.el-textarea__inner::-webkit-input-placeholder {
  text-align: center;
}
.el-date-editor.el-input,
.el-date-editor.el-input__inner {
  width: 100% !important;
}
.title {
  text-align: center;
  padding-top: 30px;
  padding-bottom: 20px;
}
.form-div {
  width: 466px;
  margin: 0 auto;
  border: 1px solid #eee;
  padding: 31px 40px 10px 20px;
  border-radius: 5px;
  background: #fff;
}
.el-select{
  width: 100% !important;
}
.el-row {
  margin-bottom: 20px;
}
.el-col {
  border-radius: 4px;
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
  border-radius: 4px;
  min-height: 36px;
  .el-textarea__inner {
    width: 80% !important;
  }
  .el-textarea {
    width: 80% !important;
  }
}
.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}
.el-input__inner {
  width: 304px;
}
</style>
