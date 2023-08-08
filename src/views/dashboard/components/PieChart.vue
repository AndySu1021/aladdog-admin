<script setup>
import { computed, onMounted } from 'vue'
import * as echarts from 'echarts'

const props = defineProps({
  chartId: {
    type: String,
    default: 'line-chart'
  },
  className: {
    type: String,
    default: () => 'line-chart'
  },
  height: {
    type: String,
    default: '100%'
  },
  width: {
    type: String,
    default: '100%'
  },
  dataSet: {
    type: Array,
    default: () => {
      return []
    }
  },
  title: {
    type: String,
    default: ''
  }
})

// 配置信息
const setOptions = computed(() => {
  return {
    title: {
      text: props.title,
      textStyle: {
        color: 'black'
      }
    },
    tooltip: {
      trigger: 'axis',
      padding: [16]
    },
    dataset: {
      source: props.dataSet
    },
    grid: {
      left: 50,
      right: 50,
      bottom: 30,
      top: 70,
      containLabel: true
    },
    series: {
      name: '访问来源',
      type: 'pie',
      radius: '55%'
    }
  }
})

function initChart() {
  let myChart = echarts.init(document.getElementById(props.chartId))
  myChart.setOption(setOptions.value)
  window.onresize = function () {
    myChart.resize()
  }
  // myChart.showLoading()
  // setTimeout(function () {
  //   myChart.hideLoading()
  // }, 1500)
}

onMounted(() => {
  initChart()
})
</script>

<template>
  <div :id="chartId" :class="className" :style="{ height: '500px', width: '100%' }"></div>
</template>

<style scoped lang="scss"></style>
