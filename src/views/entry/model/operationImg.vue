<template>
  <div
    class="container"
    :style="{backgroundImage:'url(http://localhost:3000/upload/1576565639508-193.jpg)'}"
  >
  <!-- <div class="container">
    <img src="http://localhost:3000/upload/1576565639508-193.jpg" /> -->
    <!-- <div
      class="imgborder"
      :style="{left:position.left+'px',top:position.top+'px',width:position.width+'px',height:position.height+'px'}"
    ></div>-->
    <div
      class="imgborder"
      :style="{left:'617px',top:'105px',width:'622px',height:'1289px'}"
    ></div>
  </div>
</template>
<script>
export default {
  name: "operationimg"
  //   props: {
  //     imgurl: String,
  //     position: Object
  //   }
};
</script>
<style scoped>
.container {
  width: 100%;
  height: 3000px;
  background: no-repeat;
}
.imgborder {
  width: 100%;
  color: green;
  border: 5px solid #333;
  position: absolute;
}
</style>
