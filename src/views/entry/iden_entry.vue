<template>
  <div>
    <div class="iden-panel">
      <el-upload
        class="upload-demo"
        drag
        :limit="1"
        :headers="userToken"
        action="http://localhost:3000/scan/upload"
        :before-upload="beforeUpload"
        :on-success="onSuccess"
        multiple
      >
        <img v-if="imageUrl" :src="imageUrl" class="avatar" />
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">
          将文件拖到此处，或
          <em>点击上传</em>
        </div>
        <div class="el-upload__text" style="padding-top:5px;">请上传清晰无遮挡图像</div>
        <div class="el-upload__tip" slot="tip">
          <el-button type="primary">拍照上传</el-button>
        </div>
      </el-upload>
      <div style="width:40%">本次上传 4 张</div>
      <img ref="img" alt />
      <el-dialog title="查询结果" :visible.sync="resultVisible" width="60%">
        <scan-data :data="imgData" :img="imgUrl" />
      </el-dialog>
    </div>
    <div style="background:#fff;padding:20px;">
      <el-form :inline="true" :model="formInline" class="demo-form-inline search-input">
        <el-form-item label="审批人">
          <el-input v-model="formInline.user" placeholder="审批人"></el-input>
        </el-form-item>
        <el-button type="primary" @click="onSubmit">查询</el-button>
        <el-button @click="onSubmit">重置</el-button>
      </el-form>
      <el-table :data="tableData" stripe style="width: 100%">
        <el-table-column prop="date" label="日期" width="180"></el-table-column>
        <el-table-column prop="name" label="姓名" width="180"></el-table-column>
        <el-table-column prop="address" label="地址"></el-table-column>
      </el-table>
    </div>
  </div>
</template>
<script>
import { getToken } from "@/utils/auth";
import scanData from "./model/scanData";
export default {
  name: "iden_enery",
  components: {
    scanData
  },
  data() {
    return {
      imageUrl: "",
      resultVisible: false,
      imgData: [],
      imgUrl: "",
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
      ],
      userToken: {
        authorization: "Bearer " + getToken()
      }
    };
  },
  mounted() {
    console.log(this.$el.getElementsByClassName("el-upload-dragger"));
    let width = (`${document.documentElement.clientWidth}` - 300) / 2 + "px";
    console.log(this.$el.getElementsByClassName("el-upload-dragger")[0]);
    this.$el.getElementsByClassName("el-upload-dragger")[0].style.width = width;
    this.$refs.img.src = "http:localhost:3000/upload/1576306755480-815.jpg";
  },
  methods: {
    closeDialog() {
      this.resultVisible = false;
    },
    onSubmit() {
      console.log("124");
    },
    onSuccess(response, file, fileList) {
      if (response.code == 0) {
        let val = response.data.data.ret;
        console.log(val);
        let newdata = [];
        let newArr = {};
        for (let i = 0; i < val.length; i++) {
          val[i].ret.map(j => {
            newArr[j.word_name] = j.word;
          });
          newArr.position = JSON.parse(val[i].receiptCoordinate);
          newdata[i] = newArr
        }
        this.imgData = newdata;
        this.imgUrl = "http://localhost:3000/" + response.data.image;
        // this.imageUrl = response.data.image;
        this.resultVisible = true;
      }
      console.log(response, file, fileList);
    },
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
    },
    beforeUpload(file) {
      console.log(file.type);
      const isLt4M = file.size / 1024 / 1024 < 4;
      const isJPG =
        file.type === "image/jpeg" ||
        file.type === "image/png" ||
        file.type === "image/bmp";

      if (!isJPG) {
        this.$message.error("上传图片只能是 JPG/PNG/JPEG/BMP 格式!");
        this.imageUrl = "";
      }
      if (!isLt4M) {
        this.$message.error("上传图片大小不能超过 4MB!");
      }
      return isJPG && isLt4M;
    }
  }
};
</script>

<style lang="scss">
.iden-panel {
  padding: 10px;
  display: flex;
  justify-content: space-between;
}
// .el-upload-dragger{
//   width:
// }
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