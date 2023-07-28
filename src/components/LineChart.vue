<template>
  <div :id="chartId" :class="className" :style="{height:'500px',width:'100%'}"></div>
</template>

<script>
import {computed, onMounted, toRefs, watch} from "vue";
import * as echarts from "echarts";

export default {
  name: "line-chart",
  props: {
    chartId: {
      type: String,
      default: () => {
        return "line-chart";
      },
    },
    className: {
      type: String,
      default: () => {
        return "line-chart";
      },
    },
    height: {
      type: String,
      default: "100%",
    },
    width: {
      type: String,
      default: "100%",
    },
    xAxisData: {
      type: Array,
      default: () => {
        return [];
      },
    },
    seriesData: {
      type: Array,
      default: () => {
        return [];
      },
    },
  },
  setup(props) {
    const { xAxisData, seriesData } = toRefs(props);
    // 配置信息
    const setOptions = computed(() => {
      return {
        yAxis: {
          type: "value",
        },
        xAxis: {
          type: "category",
          data: xAxisData.value,
        },
        series: [
          {
            type: "line",
            data: seriesData.value,
          },
        ],
      };
    });
    // 创建图表
    function initChart() {
      let myChart = echarts.init(document.getElementById(props.chartId));
      myChart.setOption(setOptions.value);
      window.onresize = function () {
        //自适应大小
        myChart.resize();
      };
    }

    onMounted(() => {
      initChart();
    });
    // 监听传值，刷新图表
    watch([seriesData, xAxisData], () => {
      initChart();
    });

    return { setOptions, initChart };
  },
};
</script>
