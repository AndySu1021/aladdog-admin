<script setup>
import {computed, onMounted, toRefs, watch} from "vue";
import * as echarts from "echarts";

const props = defineProps({
  chartId: {
    type: String,
    default: 'line-chart',
  },
  className: {
    type: String,
    default: () => 'line-chart',
  },
  height: {
    type: String,
    default: "100%",
  },
  width: {
    type: String,
    default: "100%",
  },
  dataSet: {
    type: Array,
    default: () => {
      return [];
    },
  },
})

// 配置信息
const setOptions = computed(() => {
  return {
    title: {
      text: '每日營業額',
      textStyle: {
        color: 'black',
      },
    },
    tooltip: {
      trigger: 'axis',
      padding: [16],
    },
    dataset: {
      source: props.dataSet,
    },
    yAxis: {
      type: 'value',
      axisTick: {
        show: false
      },
    },
    xAxis: {
      type: "category",
      boundaryGap: false,
      axisTick: {
        show: false
      }
    },
    grid: {
      left: 50,
      right: 50,
      bottom: 30,
      top: 70,
      containLabel: true
    },
    series: [
      {type: "line"},
      {type: "line"},
      {type: "line"},
    ],
    legend: {}
  };
});

function initChart() {
  let myChart = echarts.init(document.getElementById(props.chartId));
  myChart.setOption(setOptions.value);
  window.onresize = function () {
    myChart.resize();
  };
  // myChart.showLoading()
  // setTimeout(function () {
  //   myChart.hideLoading()
  // }, 1500)
}

onMounted(() => {
  initChart();
});

// 监听传值，刷新图表
watch(props.dataSet, () => {
  initChart();
});
</script>

<template>
  <div :id="chartId" :class="className" :style="{height:'500px',width:'100%'}"></div>
</template>
