<script setup>
import ControlPlane from '@/components/ControlPlane.vue'
import DataPlane from '@/components/DataPlane.vue'
import AppTable from '@/components/AppTable.vue'
import FilterItem from '@/components/FilterItem.vue'
import { reactive, ref } from 'vue'
import AppPagination from '@/components/AppPagination.vue'
import moment from 'moment'
import BranchSelect from '@/components/BranchSelect.vue'
import { getShiftType } from '@/composable/enums'
import { formatAmount } from '@/utils/formatter'

const shiftType = ref({})
getShiftType(shiftType)

const tableColumn = [
  {
    prop: 'id',
    label: '編號'
  },
  {
    prop: 'branch',
    label: '分店'
  },
  {
    prop: 'shift_type',
    label: '班別',
    formatter: (data) => shiftType.value[data.shift_type]
  },
  {
    prop: 'shift_time',
    label: '交班時間'
  },
  {
    prop: 'settle_time',
    label: '小結時間'
  },
  {
    prop: 'petty_cash',
    label: '零用金',
    formatter: (data) => formatAmount(data.petty_cash)
  }
]
const tableData = [
  {
    id: 1,
    branch: '成功二店',
    shift_type: 3,
    shift_time: '2023-07-23 15:00:00',
    settle_time: '2023-07-23 15:00:00',
    petty_cash: 10000
  },
  {
    id: 2,
    branch: '成功二店',
    shift_type: 1,
    shift_time: '2023-07-23 15:00:00',
    settle_time: '2023-07-23 15:00:00',
    petty_cash: 10000
  },
  {
    id: 3,
    branch: '成功二店',
    shift_type: 1,
    shift_time: '2023-07-23 15:00:00',
    settle_time: '2023-07-23 15:00:00',
    petty_cash: 10000
  },
  {
    id: 4,
    branch: '成功二店',
    shift_type: 1,
    shift_time: '2023-07-23 15:00:00',
    settle_time: '2023-07-23 15:00:00',
    petty_cash: 10000
  },
  {
    id: 5,
    branch: '成功二店',
    shift_type: 1,
    shift_time: '2023-07-23 15:00:00',
    settle_time: '2023-07-23 15:00:00',
    petty_cash: 10000
  },
  {
    id: 6,
    branch: '成功二店',
    shift_type: 1,
    shift_time: '2023-07-23 15:00:00',
    settle_time: '2023-07-23 15:00:00',
    petty_cash: 10000
  },
  {
    id: 7,
    branch: '成功二店',
    shift_type: 1,
    shift_time: '2023-07-23 15:00:00',
    settle_time: '2023-07-23 15:00:00',
    petty_cash: 10000
  },
  {
    id: 8,
    branch: '成功二店',
    shift_type: 1,
    shift_time: '2023-07-23 15:00:00',
    settle_time: '2023-07-23 15:00:00',
    petty_cash: 10000
  }
]

const initSearchParams = {
  date_range: [moment().add(-1, 'd').format('YYYY-MM-DD'), moment().format('YYYY-MM-DD')],
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
  total: tableData.length
}

const pagination = reactive({ ...paginationParams })
function handleChange(value) {
  Object.assign(pagination, value)
  // call api to get new data
}
</script>

<template>
  <div class="dashboard-container">
    <ControlPlane :reset="handleReset" :search="handleSearch">
      <FilterItem title="分店">
        <BranchSelect v-model.number="searchParams.branch_id" :show-all="true" />
      </FilterItem>
      <FilterItem title="入座時間">
        <ElDatePicker
          v-model="searchParams.date_range"
          type="daterange"
          start-placeholder="開始時間"
          end-placeholder="結束時間"
          format="YYYY-MM-DD"
          value-format="YYYY-MM-DD"
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
