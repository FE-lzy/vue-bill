<template>
  <div>
    <el-carousel :autoplay="false" arrow="always">
      <el-carousel-item v-for="(i , k)  in data" :key="k">
        <div class="scan-panel">
          <div class="scan-image">
            <h3>本次查验发票数量：{{data.length}}张，这是第{{k+1}}张</h3>
            
            <!-- <div :style="{background:'red', color:'green',border: '1px solid #333',position:'relative',
            top:i.position.top+'px',left:i.position.left+'px',width:i.position.width+'px',height:i.position.height+'px'}">
              
            </div>
            <img :src="img" /> -->
            <operation-img :imgurl="img" :position="i.position" style="width:320px;"></operation-img>
          </div>
          <div class="scan-form">
            <el-form
              ref="validForm"
              :label-position="labelPosition"
              label-width="120px"
              :model="form"
            >
              <h2 style="text-align:center">发票录入</h2>
              <el-form-item label="总价">
                <el-input v-model="i.TotalTax" placeholder="总价" :disabled="isHave" />
              </el-form-item>
              <el-form-item label="发票号码">
                <el-input v-model="i.InvoiceCode" placeholder="发票号码" :disabled="isHave" />
              </el-form-item>
              <el-form-item label="发票代码">
                <el-input v-model="i.InvoiceNum" placeholder="发票代码" :disabled="isHave" />
              </el-form-item>
              <el-form-item label="发票类型">
                <el-input v-model="i.InvoiceType" placeholder="发票类型" :disabled="isHave" />
              </el-form-item>
              <el-form-item
                label="发票归属部门"
                prop="fp_gsbm"
                :rules="[
            { required: true, message: '请输入', trigger: 'blur' },
          ]"
              >
                <el-select
                  v-model="form.fp_gsbm"
                  filterable
                  placeholder="所在部门"
                  @change="getUserByBm"
                  :disabled="isHave"
                >
                  <el-option
                    v-for="item in bmOptions"
                    :key="item.id"
                    :label="item.bmmc"
                    :value="item.id"
                  />
                </el-select>
              </el-form-item>
              <el-form-item label="发票归属人">
                <el-select v-model="form.fp_gsr" filterable placeholder="发票归属人" :disabled="isHave">
                  <el-option
                    v-for="item in userOptions"
                    :key="item.id"
                    :label="item.zymc"
                    :value="item.id"
                  />
                </el-select>
              </el-form-item>

              <el-form-item label="备注">
                <el-input
                  v-model="form.fp_bz"
                  type="textarea"
                  :rows="2"
                  placeholder="请输入内容"
                  :disabled="isHave"
                />
              </el-form-item>
              <div style="text-align:center">
                <el-button type="primary" @click="saveBill('validForm')" v-if="!isHave">录入</el-button>
              </div>
            </el-form>
          </div>
        </div>
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script>
import { relative } from 'path';
const { getAllBm, getAllUser } = require("@/views/entry/common");
import operationImg from '@/views/entry/model/operationImg';
const dwbm = { dwbm: localStorage.getItem("dwbm") };
export default {
  name: "scanData",
  props: {
    data: Array,
    img: ""
  },
  components:{
    operationImg
  },
  data() {
    return {
      labelPosition: "right",
      billResJSON: "",
      form: {
        fp_gsbm: "",
        fp_bz: "",
        fp_gsr: ""
      },
      isHave: false,
      userOptions: [],
      bmOptions: [],
     
    };
  },
  mounted() {
    getAllBm().then(res => {
      this.bmOptions = res;
    });
    getAllUser().then(res => {
      this.userOptions = res;
    });
  },
  methods: {
    confirm() {
      console.log(this.data);
      this.$emit("closeDialog");
    },
    getUserByBm(val) {
      getAllUser(val).then(res => {
        this.userOptions = res;
      });
    },
    saveBill(formName) {
       console.log(this.data);
      this.$refs[formName].validate(valid => {
        if (valid) {
          const param = Object.assign(
            this.form,
            { billInfo: this.billResJSON },
            { uid: localStorage.getItem("userId") },
            dwbm
          );
        }
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.el-carousel {
  width: 100%;
}
.el-carousel__container {
  min-height: 560px !important;
}
.el-carousel__item {
  background-color: #fff;
  height: auto !important;
}
.scan-panel {
  display: flex;
  padding: 20px;
  justify-content: space-around;
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  .scan-image {
    img {
      width: 320px;
      vertical-align: center;
    }
  }

}
</style>