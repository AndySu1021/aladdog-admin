<script setup>
import ControlPlane from '@/components/ControlPlane.vue'
import DataPlane from '@/components/DataPlane.vue'
import AppTable from '@/components/AppTable.vue'
import FilterItem from '@/components/FilterItem.vue'
import { reactive } from 'vue'
import AppPagination from '@/components/AppPagination.vue'
import moment from 'moment'
import { ElMessage } from 'element-plus'
import { Search } from '@element-plus/icons-vue'
import BranchSelect from '@/components/BranchSelect.vue'

const tableColumn = [
  {
    key: 'branch',
    title: '分店',
    dataKey: 'branch',
    width: 180,
    align: 'center'
  },
  {
    key: 'product_name',
    title: '商品',
    dataKey: 'product_name',
    width: 180,
    align: 'center'
  },
  {
    key: 'total_quantity',
    title: '總數量',
    dataKey: 'total_quantity',
    width: 180,
    align: 'center',
    cellRenderer: ({ cellData: total_quantity }) => new Intl.NumberFormat().format(total_quantity)
  },
  {
    key: 'total_amount',
    title: '總金額',
    dataKey: 'total_amount',
    width: 180,
    align: 'center',
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
    product_name: '牛小排',
    total_quantity: 3000,
    total_amount: 2000000
  },
  {
    date: '2023-07-23',
    branch: '成功二店',
    product_name: '牛小排',
    total_quantity: 3000,
    total_amount: 2000000
  },
  {
    date: '2023-07-23',
    branch: '成功二店',
    product_name: '牛小排',
    total_quantity: 3000,
    total_amount: 2000000
  },
  {
    date: '2023-07-23',
    branch: '成功二店',
    product_name: '牛小排',
    total_quantity: 3000,
    total_amount: 2000000
  },
  {
    date: '2023-07-23',
    branch: '成功二店',
    product_name: '牛小排',
    total_quantity: 3000,
    total_amount: 2000000
  },
  {
    date: '2023-07-23',
    branch: '成功二店',
    product_name: '牛小排',
    total_quantity: 3000,
    total_amount: 2000000
  },
  {
    date: '2023-07-23',
    branch: '成功二店',
    product_name: '牛小排',
    total_quantity: 3000,
    total_amount: 2000000
  },
  {
    date: '2023-07-23',
    branch: '成功二店',
    product_name: '牛小排',
    total_quantity: 3000,
    total_amount: 2000000
  }
]

const initSearchParams = {
  branch_id: 0,
  product_type: 1,
  date_range: [moment().add(-4, 'd').format('YYYY-MM-DD'), moment().format('YYYY-MM-DD')],
  product_name: '',
  sort_type: 1
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
      <FilterItem title="商品類型">
        <ElSelect v-model="searchParams.product_type" placeholder="請選擇">
          <ElOption label="酒品" :value="1" />
          <ElOption label="餐點" :value="2" />
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
      <FilterItem title="商品名稱">
        <ElInput
          v-model="searchParams.product_name"
          size="default"
          placeholder="請輸入"
          :suffix-icon="Search"
        />
      </FilterItem>
      <FilterItem title="排序">
        <ElSelect v-model="searchParams.sort_type" placeholder="請選擇">
          <ElOption label="總數量高到低" :value="1" />
          <ElOption label="總數量低到高" :value="2" />
          <ElOption label="總金額高到低" :value="3" />
          <ElOption label="總金額低到高" :value="4" />
        </ElSelect>
      </FilterItem>
    </ControlPlane>
    <DataPlane>
      <template #main-data>
        <AppTable :data="tableData" :columns="tableColumn" />
      </template>
      <template #page-data>
        <AppPagination :data="pagination" @change="handleChange" />
      </template>
    </DataPlane>
  </div>
</template>

<style lang="scss" scoped></style>
