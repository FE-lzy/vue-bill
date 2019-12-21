<template>
  <div>
    <el-carousel :height="height" indicator-position="outside" arrow="always" :autoplay="false">
      <el-carousel-item v-for="(item,i) in 2" :key="i">
        <div>
          <opration-img :ref="`hello${i}`" :imgUrl="imgUrl" :imgData="imgData"></opration-img>
        </div>
      </el-carousel-item>
    </el-carousel>
  </div>
</template>
<script>
import oprationImg from "./operationImg";
import { watch } from "fs";
export default {
  name: "scanData",
  data() {
    return {
      height: `${document.documentElement.clientHeight}` + "px",
      imgUrl: "",
      imgData: []
    };
  },
  components: {
    oprationImg
  },
  mounted() {
    console.log("234324", this.$refs);
    this.imgUrl = this.$route.query.imgUrl;
    this.imgData = this.$route.query.imgData;
  },

  watch: {
    imgData: function(val) {
      console.log('imgUrl',val);
      this.$refs.hello0[0].getImgInfo(this.imgUrl,this.imgData[0].position);
      this.$refs.hello1[0].getImgInfo(this.imgUrl,this.imgData[1].position);
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
</style>