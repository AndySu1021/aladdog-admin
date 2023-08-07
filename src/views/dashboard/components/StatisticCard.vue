<script setup>
import {CaretBottom, CaretTop, Warning} from "@element-plus/icons-vue";

defineProps({
  value: Number,
  valuePrefix: {
    type: String,
    default: ''
  },
  title: String,
  tooltip: {
    type: String,
    default: '',
  },
  hasFooter: {
    type: Boolean,
    default: false,
  },
  greater: {
    type: Boolean,
    default: false,
  },
  comparedValue: {
    type: Number,
    default: 0,
  }
})
</script>

<template>
  <div>
    <ElStatistic :value="value" :prefix="valuePrefix">
      <template #title>
        <div style="display: inline-flex; align-items: center">
          {{ title }}
          <ElTooltip
              v-if="tooltip !== ''"
              effect="dark"
              :content="tooltip"
              placement="top"
          >
            <el-icon style="margin-left: 4px" :size="12">
              <Warning />
            </el-icon>
          </ElTooltip>
        </div>
      </template>
    </ElStatistic>
    <div v-if="hasFooter" class="statistic-footer">
      <div class="footer-item">
        <span>相較昨日</span>
        <span :class="[greater ? 'red' : 'green']">
              {{ comparedValue }}%
              <ElIcon>
                <CaretBottom v-if="!greater" />
                <CaretTop v-else />
              </ElIcon>
            </span>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.el-statistic {
  --el-statistic-content-font-size: 28px;
}

.statistic-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  font-size: 12px;
  color: var(--el-text-color-regular);
  margin-top: 16px;
}

.statistic-footer .footer-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.statistic-footer .footer-item span:last-child {
  display: inline-flex;
  align-items: center;
  margin-left: 4px;
}

.green {
  color: var(--el-color-success);
}
.red {
  color: var(--el-color-error);
}
</style>
