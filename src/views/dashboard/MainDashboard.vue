<script setup>
import {CaretBottom, CaretTop, Warning} from '@element-plus/icons-vue'
import LineChart from "@/components/LineChart.vue";

const chartData = [
  ['date', '中華一店', '成功二店', '西門三店'],
  ['07/20', 150, 150, 80],
  ['07/21', 300, 130, 100],
  ['07/22', 60, 170, 120],
  ['07/23', 250, 200, 150],
  ['07/24', 400, 250, 60],
  ['07/25', 234, 310, 90],
  ['07/26', 150, 279, 80],
]
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
      <LineChart :data-set="chartData" />
    </div>
  </div>
</template>

<style scoped>
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
