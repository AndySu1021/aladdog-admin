<script setup>
import ControlPlane from '@/components/ControlPlane.vue'
import DataPlane from '@/components/DataPlane.vue'
import AppTable from '@/components/AppTable.vue'
import FilterItem from '@/components/FilterItem.vue'
import { reactive } from 'vue'
import AppPagination from '@/components/AppPagination.vue'
import moment from 'moment'
import { ElMessage } from 'element-plus'
import BranchSelect from '@/components/BranchSelect.vue'

const tableColumn = [
  {
    key: 'date',
    title: '日期',
    dataKey: 'date',
    align: 'center',
    flexGrow: 1
  },
  {
    key: 'branch',
    title: '分店',
    dataKey: 'branch',
    align: 'center',
    flexGrow: 1
  },
  {
    key: 'total_amount',
    title: '總營收',
    dataKey: 'total_amount',
    align: 'center',
    flexGrow: 1,
    cellRenderer: ({ cellData: total_amount }) =>
      new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'TWD',
        maximumFractionDigits: 0
      }).format(total_amount)
  }
]
const tableData = [
  {
    date: '2023-07-23',
    branch: '成功二店',
    total_amount: 2000000
  },
  {
    date: '2023-07-23',
    branch: '成功二店',
    total_amount: 2000000
  },
  {
    date: '2023-07-23',
    branch: '成功二店',
    total_amount: 2000000
  },
  {
    date: '2023-07-23',
    branch: '成功二店',
    total_amount: 2000000
  },
  {
    date: '2023-07-23',
    branch: '成功二店',
    total_amount: 2000000
  },
  {
    date: '2023-07-23',
    branch: '成功二店',
    total_amount: 2000000
  },
  {
    date: '2023-07-23',
    branch: '成功二店',
    total_amount: 2000000
  },
  {
    date: '2023-07-23',
    branch: '成功二店',
    total_amount: 2000000
  }
]

const initSearchParams = {
  date_range: [moment().add(-4, 'd').format('YYYY-MM-DD'), moment().format('YYYY-MM-DD')],
  type: 1,
  branch_id: 0
}

const searchParams = reactive({ ...initSearchParams })
function handleReset() {
  Object.assign(searchParams, initSearchParams)
}
function handleSearch() {
  console.log(searchParams)
}

const paginationParams = {
  page: 1,
  page_size: 10,
  total: 40
}
const pagination = reactive({ ...paginationParams })
function handleChange(value) {
  Object.assign(pagination, value)
  // call api to get new data
  console.log(value)
}

function handleDownload() {
  ElMessage.success('下載成功')
}
</script>

<template>
  <div class="dashboard-container">
    <ControlPlane :reset="handleReset" :search="handleSearch" :download="handleDownload">
      <FilterItem title="分店">
        <BranchSelect v-model.number="searchParams.branch_id" :show-all="true" />
      </FilterItem>
      <FilterItem title="類型">
        <ElSelect v-model="searchParams.type" placeholder="請選擇">
          <ElOption label="每日" :value="1" />
          <ElOption label="每月" :value="2" />
        </ElSelect>
      </FilterItem>
      <FilterItem title="日期">
        <ElDatePicker
          v-model="searchParams.date_range"
          type="daterange"
          start-placeholder="開始日期"
          end-placeholder="結束日期"
          format="YYYY-MM-DD"
          value-format="YYYY-MM-DD"
        />
      </FilterItem>
    </ControlPlane>
    <DataPlane>
      <template #main-data>
        <AppTable :data="tableData" :columns="tableColumn" :fixed="false" />
      </template>
      <template #page-data>
        <AppPagination :data="pagination" @change="handleChange" />
      </template>
    </DataPlane>
  </div>
</template>

<style lang="scss" scoped></style>
