<template>
  <div>
    <el-row :gutter="20" style="background:#fff;">
      <el-col :span="10">
        <div class="left_update">
          <el-upload
            class="upload-demo"
            drag
            action="https://jsonplaceholder.typicode.com/posts/"
            multiple
          >
            <i class="el-icon-upload"></i>
            <div class="el-upload__text">
              将文件拖到此处，或
              <em>点击上传</em>
            </div>
            <div class="el-upload__tip" slot="tip">请上传清晰无遮挡图像</div>
          </el-upload>
        </div>
      </el-col>
      <el-col :span="10">
        <h3>本次识别发票统计:0</h3>
        <el-row class="text_title">
          <el-col :span="3">已提交：</el-col>
          <el-col :span="8">8</el-col>
        </el-row>
        <el-row class="text_title">
          <el-col :span="3">待确认：</el-col>
          <el-col :span="8">8</el-col>
        </el-row>
        <el-row class="text_title">
          <el-col :span="3">禁止录入：</el-col>
          <el-col :span="8">9</el-col>
        </el-row>
      </el-col>
    </el-row>
    <div style="background:#fff;padding:20px;">
    <el-form :inline="true" :model="formInline" class="demo-form-inline search-input">
      <el-form-item label="审批人">
        <el-input v-model="formInline.user" placeholder="审批人"></el-input>
      </el-form-item>
      <el-button type="primary" @click="onSubmit">查询</el-button>
      <el-button @click="onSubmit">重置</el-button>
    </el-form>
    <el-table :data="tableData" border stripe style="width: 100%">
      <el-table-column prop="date" label="日期" width="180"></el-table-column>
      <el-table-column prop="name" label="姓名" width="180"></el-table-column>
      <el-table-column prop="address" label="地址"></el-table-column>
    </el-table>
    </div>
  </div>

</template>
<script>
export default {
  name: "iden_enery",
  data() {
    return {
      formInline: {
        user: ""
      },
      tableData: [
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1517 弄"
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1519 弄"
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄"
        }
      ]
    };
  },
  methods: {
      onSubmit(){
          console.log('124');
      }
  }
};
</script>

<style>
/* .left_update {
  padding: 30px;
}
.el-upload {
  width: 100% !important;
}
.el-upload-dragger {
  width: 100% !important;
}
.text_title {
  line-height: 50px;
}
.el-table {
  margin: 25px;
  width: 95% !important;
}
.search-input{
    float: right;
    margin-right:5%;

} */
</style>