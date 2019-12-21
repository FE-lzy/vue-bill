<template>
  <!-- <div
    class="container"
    :style="{backgroundImage:'url(http://localhost:3000/upload/1576565639508-193.jpg)'}"
  >-->
  <div class="container">
    <img ref="img" src="http://localhost:3000/upload/1576565639508-193.jpg" />
    <div
      class="imgborder"
      :style="{left:borderInfo.left+'px',top:borderInfo.top+'px',width:borderInfo.width+'px',height:borderInfo.height+'px'}"
    ></div>
    <!-- <div class="imgborder" :style="{left:'617px',top:'105px',width:'622px',height:'1289px'}"></!-->
    -->
  </div>
</template>
<script>
const imgwidth = "500"; //缩放后的宽度

var border = { left: "617", top: "150", width: "622", height: "1289" };
export default {
  name: "operationimg",
  data() {
    return {
      myImg: "http://localhost:3000/upload/1576565639508-193.jpg",
      imgInfo: {}, // 存图片的宽高信息
      scaling: 1, //缩放比例
      borderInfo: {}
    };
  },
  props: {
    imgUrl: String,
    imgData: Array
  },
  methods: {
    getImgInfo(imgUrl, imgData) {
      console.log("this.borderInfo");

      const vm = this;
      let img = new Image();
      console.log("图片地址 ", imgUrl, JSON.stringify(imgData));
      img.src = imgUrl;

      // img.onload = function() {
      // vm.$set(vm.imgInfo, "height", img.height);
      // 打印图片信息
      console.log("图片宽度", img.width);
      vm.scaling = img.width / imgwidth; // 缩放比例
      vm.$set(vm.imgInfo, "width", (img.width / vm.scaling).toFixed(1));
      vm.$set(vm.imgInfo, "height", (img.height / vm.scaling).toFixed(1));

      vm.$set(vm.borderInfo, "left", (imgData.left / vm.scaling).toFixed(1));
      vm.$set(vm.borderInfo, "top", (imgData.top / vm.scaling).toFixed(1));
      vm.$set(vm.borderInfo, "width", (imgData.width / vm.scaling).toFixed(1));
      vm.$set(
        vm.borderInfo,
        "height",
        (imgData.height / vm.scaling).toFixed(1)
      );
      console.log(vm.imgInfo, vm.borderInfo);
      vm.$refs.img.width = vm.imgInfo.width;
      // };
    }
  }
  // mounted() {
  //   this.getImgInfo();
  // }
};
</script>
<style scoped>
.container {
  width: 100%;
  height: 900px;
  background: no-repeat;
}
.imgborder {
  width: 100%;
  color: green;
  border: 5px solid #333;
  position: absolute;
}
</style>
