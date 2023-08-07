<script setup>
import {Close, Download, Search} from "@element-plus/icons-vue";
import {ElButton} from "element-plus";

const props = defineProps({
  reset: {
    type: Function,
    default: null
  },
  search: {
    type: Function,
    default: null
  },
  download: {
    type: Function,
    default: null
  }
})
function handleReset() {
  props.reset()
}

function handleSearch() {
  props.search()
}

function handleDownload() {
  props.download()
}
</script>

<template>
<div class="control-plane-container">
  <div class="filter-section">
    <slot />
  </div>
  <div class="control-btn-section">
    <ElButton v-if="reset" @click="handleReset" size="large" :icon="Close">重置</ElButton>
    <ElButton v-if="search" type="primary" @click="handleSearch" size="large" :icon="Search">搜尋</ElButton>
    <ElButton v-if="download" type="success" @click="handleDownload" size="large" :icon="Download">下載</ElButton>
  </div>
</div>
</template>

<style scoped lang="scss">
.control-plane-container {
  width: 100%;
  background-color: white;
  position: relative;
  padding: 16px;
  border-radius: 8px;
  margin-bottom: 16px;
  min-height: 120px;
  .filter-section {
    margin-top: 10px;
    :deep(.filter-item) {
      display: inline-flex;
      align-items:center;
      margin-bottom: 24px;
      .el-input {
        width: 200px;
      }
      .filter-item-title {
        display: inline-block;
        width: 100px;
        font-size: 14px;
        text-align: right;
      }
    }
  }
  .control-btn-section {
    display: flex;
    justify-content: right;
    margin-top: 8px;
  }
}
</style>
