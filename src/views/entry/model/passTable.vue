<template>
  <div>{{scanStr}}</div>
</template>

<script>
export default {
  name: "passTable",
  props: {
    scanStr:String  
  },
  data(){
      return{

      }
  },
  watch:{
      "scanStr":function(){
          this.handleScanStr();
      }
  },
  methods:{
    handleScanStr(){
        console.log(this.scanStr);
    }
  }
};
</script>