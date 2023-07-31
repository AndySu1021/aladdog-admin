<script setup>
import {CaretBottom, CaretTop, Warning} from '@element-plus/icons-vue'
import LineChart from "@/components/LineChart.vue";
import {reactive} from "vue";

const chartData = reactive({
  xAxisData: ["07/20", "07/21", "07/22", "07/23", "07/24", "07/25", "07/26"],
  seriesData: [150, 230, 224, 218, 135, 147, 260],
});
</script>

<template>
  <div>
    <ElRow :gutter="16">
    <ElCol :span="8">
      <div class="statistic-card">
        <ElStatistic :value="1589">
          <template #title>
            <div style="display: inline-flex; align-items: center">
              本日訂單數
              <ElTooltip
                  effect="dark"
                  content="所有分店訂單數總和"
                  placement="top"
              >
                <ElIcon style="margin-left: 4px" :size="12">
                  <Warning />
                </ElIcon>
              </ElTooltip>
            </div>
          </template>
        </ElStatistic>
        <div class="statistic-footer">
          <div class="footer-item">
            <span>相較昨日</span>
            <span class="red">
              24%
              <el-icon>
                <CaretTop />
              </el-icon>
            </span>
          </div>
        </div>
      </div>
    </ElCol>
    <ElCol :span="8">
      <div class="statistic-card">
        <ElStatistic :value="693700" prefix="$">
          <template #title>
            <div style="display: inline-flex; align-items: center">
              本日營業額
              <ElTooltip
                  effect="dark"
                  content="所有分店本日營業額總和"
                  placement="top"
              >
                <el-icon style="margin-left: 4px" :size="12">
                  <Warning />
                </el-icon>
              </ElTooltip>
            </div>
          </template>
        </ElStatistic>
        <div class="statistic-footer">
          <div class="footer-item">
            <span>相較昨日</span>
            <span class="green">
              12%
              <ElIcon>
                <CaretBottom />
              </ElIcon>
            </span>
          </div>
        </div>
      </div>
    </ElCol>
    <ElCol :span="8">
      <div class="statistic-card">
        <ElStatistic :value="6356">
          <template #title>
            <div style="display: inline-flex; align-items: center">
              總顧客數
              <ElTooltip
                  effect="dark"
                  content="所有分店顧客數總和"
                  placement="top"
              >
                <el-icon style="margin-left: 4px" :size="12">
                  <Warning />
                </el-icon>
              </ElTooltip>
            </div>
          </template>
        </ElStatistic>
        <div class="statistic-footer">
          <div class="footer-item">
            <span>相較昨日</span>
            <span class="red">
              16%
              <ElIcon>
                <CaretTop />
              </ElIcon>
            </span>
          </div>
        </div>
      </div>
    </ElCol>
  </ElRow>
    <div style="background-color: white;margin-top: 16px;border-radius: 8px;padding: 20px;">
      <span style="font-size: 16px;font-weight: 500;">每日營業額</span>
      <LineChart :xAxisData="chartData.xAxisData" :seriesData="chartData.seriesData" />
    </div>
  </div>
</template>

<style scoped>
:global(h2#card-usage ~ .example .example-showcase) {
  background-color: var(--el-fill-color) !important;
}

.el-statistic {
  --el-statistic-content-font-size: 28px;
}

.statistic-card {
  height: 100%;
  padding: 20px;
  border-radius: 8px;
  background-color: var(--el-bg-color-overlay);
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
