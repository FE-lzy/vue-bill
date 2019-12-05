<template>
  <div :class="className" :style="{height:height,width:width}" />
</template>

<script>
import echarts from "echarts";
require("echarts/theme/macarons"); // echarts theme
import resize from "./mixins/resize";
import { queryData } from "../../../../api/common";
const dwbm = { dwbm: localStorage.getItem("dwbm") };

export default {
  mixins: [resize],
  props: {
    className: {
      type: String,
      default: "chart"
    },
    width: {
      type: String,
      default: "100%"
    },
    height: {
      type: String,
      default: "300px"
    }
  },
  data() {
    return {
      chart: null,
      billType: [],
      billCount: []
    };
  },
  created() {
    this.getBillType();
    this.getBillCount();
  },
  mounted() {
    this.$nextTick(() => {
      this.initChart();
    });
  },
  watch:{
    billCount(val,newVal){
      this.initChart()
    }
  },
  beforeDestroy() {
    if (!this.chart) {
      return;
    }
    this.chart.dispose();
    this.chart = null;
  },
  methods: {
    getBillType() {
      queryData("/bill/getBillType", {}, "POST").then(res => {
        if (res.code == 0) {
          for (let i = 0; i < res.data.length; i++) {
            this.billType.push(res.data[i].type_name);

          }
        }
        console.log(this.billType);
      });
    },
    getBillCount() {
      queryData("/manager/getBillCount", dwbm, "POST").then(res => {
        if (res.code == 0) {
          console.log(res);
          this.billCount = res.data;
        }
        console.log(this.billCount);
      });
    },
    initChart() {
      this.chart = echarts.init(this.$el, "macarons");
      let _this = this;
      this.chart.setOption({
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        legend: {
          left: "center",
          bottom: "10",
          data: [
            "增值税专用发票",
            "机动车销售统一发票",
            "增值税普通发票",
            "增值税电子普通发票",
            "增值税普通发票(卷式)",
            "增值税电子普通发票(通行费)",
            "二手车销售统一发票"
          ]
        },
        series: [
          {
            name: "占比",
            type: "pie",
            roseType: "radius",
            radius: [15, 95],
            center: ["50%", "38%"],
            data: _this.billCount,
            animationEasing: "cubicInOut",
            animationDuration: 2600
          }
        ]
      });
    }
  }
};
</script>
