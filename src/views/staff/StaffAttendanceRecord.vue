<script setup>
import ControlPlane from '@/components/ControlPlane.vue'
import DataPlane from '@/components/DataPlane.vue'
import { Search } from '@element-plus/icons-vue'
import AppTable from '@/components/AppTable.vue'
import FilterItem from '@/components/FilterItem.vue'
import { reactive } from 'vue'
import AppPagination from '@/components/AppPagination.vue'
import moment from 'moment'
import BranchSelect from '@/components/BranchSelect.vue'

const tableColumn = [
  {
    prop: 'date',
    label: '日期'
  },
  {
    prop: 'branch',
    label: '分店'
  },
  {
    prop: 'name',
    label: '姓名'
  },
  {
    prop: 'start_time',
    label: '上班時間'
  },
  {
    prop: 'end_time',
    label: '下班時間'
  }
]
const tableData = [
  {
    date: '2023-07-23',
    branch: '成功二店',
    name: 'Andy',
    start_time: '2023-07-23 18:00:00',
    end_time: '2023-07-24 03:00:00'
  },
  {
    date: '2023-07-23',
    branch: '成功二店',
    name: 'Andy',
    start_time: '2023-07-23 18:00:00',
    end_time: '2023-07-24 03:00:00'
  },
  {
    date: '2023-07-23',
    branch: '成功二店',
    name: 'Andy',
    start_time: '2023-07-23 18:00:00',
    end_time: '2023-07-24 03:00:00'
  },
  {
    date: '2023-07-23',
    branch: '成功二店',
    name: 'Andy',
    start_time: '2023-07-23 18:00:00',
    end_time: '2023-07-24 03:00:00'
  },
  {
    date: '2023-07-23',
    branch: '成功二店',
    name: 'Andy',
    start_time: '2023-07-23 18:00:00',
    end_time: '2023-07-24 03:00:00'
  },
  {
    date: '2023-07-23',
    branch: '成功二店',
    name: 'Andy',
    start_time: '2023-07-23 18:00:00',
    end_time: '2023-07-24 03:00:00'
  },
  {
    date: '2023-07-23',
    branch: '成功二店',
    name: 'Andy',
    start_time: '2023-07-23 18:00:00',
    end_time: '2023-07-24 03:00:00'
  },
  {
    date: '2023-07-23',
    branch: '成功二店',
    name: 'Andy',
    start_time: '2023-07-23 18:00:00',
    end_time: '2023-07-24 03:00:00'
  }
]

const initSearchParams = {
  date: moment().format('YYYY-MM-DD'),
  branch_id: 0,
  name: ''
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
</script>

<template>
  <div class="dashboard-container">
    <ControlPlane :reset="handleReset" :search="handleSearch">
      <FilterItem title="分店">
        <BranchSelect v-model.number="searchParams.branch_id" :show-all="true" />
      </FilterItem>
      <FilterItem title="日期">
        <ElDatePicker
          v-model="searchParams.date"
          type="date"
          placeholder="請選擇日期"
          format="YYYY-MM-DD"
          value-format="YYYY-MM-DD"
        />
      </FilterItem>
      <FilterItem title="姓名">
        <ElInput
          v-model="searchParams.name"
          size="default"
          placeholder="請輸入"
          :suffix-icon="Search"
        />
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
