<script setup>
import LineChart from "@/views/dashboard/components/LineChart.vue";
import StatisticCard from "@/views/dashboard/components/StatisticCard.vue";
import PieChart from "@/views/dashboard/components/PieChart.vue";
import StackBarChart from "@/views/dashboard/components/StackBarChart.vue";
import BranchSelect from "@/components/BranchSelect.vue";
import {useAdminStore} from "@/stores/admin";
import DashboardPanel from "@/views/dashboard/components/DashboardPanel.vue";
import {Warning} from "@element-plus/icons-vue";

const adminStore = useAdminStore()
const branchId = adminStore.getBranchId === 0 ? 1 : adminStore.getBranchId

const chartData = [
  ['date', '中華一店', '成功二店', '西門三店'],
  ['07/20', 15000, 15000, 8000],
  ['07/21', 8200, 13000, 10000],
  ['07/22', 25000, 17000, 12000],
  ['07/23', 30000, 20000, 15000],
  ['07/24', 10000, 25000, 6000],
  ['07/25', 7300, 31000, 9000],
  ['07/26', 8500, 27900, 7200],
]

const liquorData = [
  ['White Lady', 300],
  ['Gimlet', 200],
  ['Daiquiri', 60],
  ['Sangria', 250],
  ['Sidecar', 180],
]

const mealData = [
  ['牛排', 150],
  ['義大利麵', 300],
  ['生火腿', 200],
  ['松露薯條', 60],
  ['炸雞塊', 250],
]

const aovData = [
  ['date', '中華一店', '成功二店', '西門三店'],
  ['07/20', 340, 350, 380],
  ['07/21', 330, 330, 400],
  ['07/22', 350, 370, 420],
  ['07/23', 370, 500, 450],
  ['07/24', 400, 550, 360],
  ['07/25', 450, 310, 390],
  ['07/26', 300, 479, 372],
]
</script>

<template>
  <div>
    <ElRow :gutter="16">
      <ElCol :span="8">
        <DashboardPanel>
          <StatisticCard
              :value="43600"
              value-prefix="$"
              title="本日營業額"
              tooltip="所有分店本日營業額總和"
              has-footer
              :compared-value="12"
          />
        </DashboardPanel>
      </ElCol>
      <ElCol :span="8">
        <DashboardPanel>
          <StatisticCard
              :value="38"
              title="本日訂單數"
              tooltip="所有分店訂單數總和"
              has-footer
              greater
              :compared-value="24"
          />
        </DashboardPanel>
      </ElCol>
      <ElCol :span="8">
        <DashboardPanel>
          <StatisticCard
              :value="182"
              title="總顧客數"
              tooltip="所有分店顧客數總和"
              has-footer
              greater
              :compared-value="16"
          />
        </DashboardPanel>
      </ElCol>
    </ElRow>
    <DashboardPanel style="margin-top: 16px;">
      <StackBarChart chart-id="daily_sales" title="每日營業額" :data-set="chartData" />
    </DashboardPanel>
    <ElRow style="margin-top: 16px;" :gutter="16">
      <ElCol :span="12">
        <DashboardPanel>
          <div style="display: flex;justify-content: space-between;align-items: center;">
            <div style="display: inline-flex; align-items: center;font-size: 18px;font-weight: bold;">
              酒品排行 TOP5
              <ElTooltip
                  effect="dark"
                  content="一個月內酒品排行 TOP5"
                  placement="top"
              >
                <ElIcon style="margin-left: 8px;" :size="16">
                  <Warning />
                </ElIcon>
              </ElTooltip>
            </div>
            <BranchSelect v-model="branchId" />
          </div>
          <PieChart chart-id="liquor" :data-set="liquorData" />
        </DashboardPanel>
      </ElCol>
      <ElCol :span="12">
        <DashboardPanel>
          <div style="display: flex;justify-content: space-between;align-items: center;">
            <div style="display: inline-flex; align-items: center;font-size: 18px;font-weight: bold;">
              餐點排行 TOP5
              <ElTooltip
                  effect="dark"
                  content="一個月內餐點排行 TOP5"
                  placement="top"
              >
                <ElIcon style="margin-left: 8px;" :size="16">
                  <Warning />
                </ElIcon>
              </ElTooltip>
            </div>
            <BranchSelect v-model="branchId" />
          </div>
          <PieChart chart-id="meal" :data-set="mealData" />
        </DashboardPanel>
      </ElCol>
    </ElRow>
    <DashboardPanel style="margin-top: 16px;">
      <LineChart chart-id="daily_customer_average" title="平均客單價" :data-set="aovData" />
    </DashboardPanel>
  </div>
</template>

<style lang="scss" scoped>
</style>
