<script setup>
import LineChart from "@/views/dashboard/components/LineChart.vue";
import StatisticCard from "@/views/dashboard/components/StatisticCard.vue";
import PieChart from "@/views/dashboard/components/PieChart.vue";
import StackBarChart from "@/views/dashboard/components/StackBarChart.vue";
import BranchSelect from "@/components/BranchSelect.vue";
import {useAdminStore} from "@/stores/admin";

const adminStore = useAdminStore()
const branchId = adminStore.getBranchId === 0 ? 1 : adminStore.getBranchId

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

const liquorData = [
  ['liquor', 'value'],
  ['White Lady', 300],
  ['Gimlet', 200],
  ['Daiquiri', 60],
  ['Sangria', 250],
  ['Sidecar', 180],
]

const mealData = [
  ['meal', 'value'],
  ['牛排', 150],
  ['義大利麵', 300],
  ['生火腿', 200],
  ['松露薯條', 60],
  ['炸雞塊', 250],
]
</script>

<template>
  <div>
    <ElRow :gutter="16">
      <ElCol :span="8">
        <StatisticCard
            :value="693700"
            value-prefix="$"
            title="本日營業額"
            tooltip="所有分店本日營業額總和"
            has-footer
            :compared-value="12"
        />
      </ElCol>
      <ElCol :span="8">
        <StatisticCard
            :value="1589"
            title="本日訂單數"
            tooltip="所有分店訂單數總和"
            has-footer
            greater
            :compared-value="24"
        />
      </ElCol>
      <ElCol :span="8">
        <StatisticCard
            :value="6356"
            title="總顧客數"
            tooltip="所有分店顧客數總和"
            has-footer
            greater
            :compared-value="16"
        />
      </ElCol>
    </ElRow>
    <div style="background-color: white;margin-top: 16px;border-radius: 8px;padding: 20px;">
      <StackBarChart chart-id="daily_sales" title="每日營業額" :data-set="chartData" />
    </div>
    <ElRow :gutter="16">
      <ElCol :span="12">
        <div style="background-color: white;margin-top: 16px;border-radius: 8px;padding: 20px;">
          <BranchSelect v-model="branchId" />
          <PieChart chart-id="liquor" title="酒品排行 TOP5" :data-set="liquorData" />
        </div>
      </ElCol>
      <ElCol :span="12">
        <div style="background-color: white;margin-top: 16px;border-radius: 8px;padding: 20px;">
          <BranchSelect v-model="branchId" />
          <PieChart chart-id="meal" title="餐點排行 TOP5" :data-set="mealData" />
        </div>
      </ElCol>
    </ElRow>
    <div style="background-color: white;margin-top: 16px;border-radius: 8px;padding: 20px;">
      <LineChart chart-id="daily_customer_average" title="平均客單價" :data-set="chartData" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
</style>
