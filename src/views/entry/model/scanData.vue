<template>
  <div class="container">
    <el-carousel :height="height" indicator-position="outside" arrow="always" :autoplay="false">
      <el-carousel-item v-for="(i,k) in imgData" :key="k">
        <div class="imgsome">
          <img :style="{width:imgwidth + 'px',height:'100%'}" :src="i.imgsrc" />
          <div
            class="imgborder"
            :style="{left:i.left+'px',top:i.top+'px',width:i.width+'px',height:i.height+'px'}"
          ></div>
        </div>
      </el-carousel-item>
    </el-carousel>
  </div>
</template>
<script>
const imgwidth = "500"; //缩放后的宽度
import oprationImg from "./operationImg";
export default {
  name: "scanData",
  data() {
    return {
      height: `${document.documentElement.clientHeight}` + "px",
      imgUrl: "",
      imgData: [],
      imgInfo: {}, // 存图片的宽高信息
      scaling: 1, //缩放比例
      borderInfo: [],
      imgwidth: imgwidth
    };
  },
  components: {
    oprationImg
  },
  created() {
    // 获取图片地址和图片信息
    // console.log(this.$route.params);
    this.imgUrl = this.$route.params.imgUrl;
    this.imgData = this.$route.params.imgData;
    console.log('获取到的参数',this.$route.params.imgData);
    if (!this.imgUrl || !this.imgData) {
      this.$router.go(-1);
    }
    // this.handleData();
  },
  methods: {
    handleData() {
      let val = this.imgData;
      console.log('val',val);
      if (val.length > 0) {
        for (let i = 0; i < val.length; i++) {
          let ret = val[i].ret;
        
          for(let j=0;j<ret.length;j++){
            // console.log('发票信息：',ret);
            val[i][ret[j].word_name] = ret[j].word
          }
          val[i].position = JSON.parse(val[i].receiptCoordinate);
        }
        console.log('处理后的val',val);
        this.getImgInfo(this.imgUrl, val);
      }
      this.imgData = val;
    },

    // 修改图片尺寸
    getImgInfo(imgUrl, imgData) {
      console.log(imgData.length);
      const vm = this;
      let img = new Image();
      // console.log("图片地址 ", imgUrl, JSON.stringify(imgData));
      img.src = imgUrl;
      img.onload = function() {
        // let imgData = this.imgData;
        for (let i = 0; i < imgData.length; i++) {
          // console.log("图片宽度", img.width);
          vm.$set(vm.imgInfo, "imgsrc", imgUrl);
          vm.scaling = img.width / imgwidth; // 缩放比例
          console.log(imgData[i]);
          vm.$set(vm.imgInfo, "width", (imgData[i].width / vm.scaling).toFixed(1));
          vm.$set(vm.imgInfo, "left", (imgData[i].left / vm.scaling).toFixed(1));
          vm.$set(vm.imgInfo, "top", (imgData[i].top / vm.scaling).toFixed(1));
          vm.$set(
            vm.imgInfo,
            "height",
            (imgData[i].height / vm.scaling).toFixed(1)
          );
          // console.log("第", i, "个值是：", vm.imgInfo[i]);
          vm.imgData[i] = vm.imgInfo;
          console.log(vm.imgData);
        }
      };
    }
  }
};
</script>

<style  lang="scss">
.el-carousel__item h3 {
  color: #475669;
  font-size: 14px;
  opacity: 0.75;
  line-height: 200px;
  margin: 0;
}

.el-carousel__item {
  background-color: #fff;
}

.el-carousel__arrow {
  height: 80px;
  width: 80px;
  background-color: rgba(27, 45, 116, 7.11);
  font-size: 31px;
  &:hover {
    background-color: rgba(27, 45, 116, 7.11);
  }
}
.imgborder {
  width: 100%;
  color: green;
  border: 5px solid #333;
  position: absolute;
}
</style>