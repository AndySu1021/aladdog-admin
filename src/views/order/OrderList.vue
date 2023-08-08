<script setup>
import ControlPlane from '@/components/ControlPlane.vue'
import DataPlane from '@/components/DataPlane.vue'
import AppTable from '@/components/AppTable.vue'
import FilterItem from '@/components/FilterItem.vue'
import { reactive, ref } from 'vue'
import AppPagination from '@/components/AppPagination.vue'
import moment from 'moment'
import BranchSelect from '@/components/BranchSelect.vue'
import DetailDialog from '@/views/order/DetailDialog.vue'
import { getShiftType } from '@/composable/enums'

const shiftType = ref({})
getShiftType(shiftType)

const tableColumn = [
  {
    key: 'order_no',
    title: '訂單號',
    dataKey: 'order_no',
    width: 150,
    align: 'center'
  },
  {
    key: 'branch',
    title: '分店',
    dataKey: 'branch',
    width: 180,
    align: 'center'
  },
  {
    key: 'shift_type',
    title: '班別',
    dataKey: 'shift_type',
    width: 180,
    align: 'center',
    cellRenderer: ({ cellData: shift_type }) => shiftType.value[shift_type]
  },
  {
    key: 'table_no',
    title: '桌號',
    dataKey: 'table_no',
    width: 120,
    align: 'center'
  },
  {
    key: 'batch_no',
    title: '批次號',
    dataKey: 'batch_no',
    width: 120,
    align: 'center'
  },
  {
    key: 'start_time',
    title: '入座時間',
    dataKey: 'start_time',
    width: 200,
    align: 'center'
  },
  {
    key: 'headcount',
    title: '用餐人數',
    dataKey: 'headcount',
    width: 120,
    align: 'center'
  },
  {
    key: 'total_amount',
    title: '總金額',
    dataKey: 'total_amount',
    width: 150,
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
    order_no: '202307231145',
    table_no: 'A2',
    batch_no: 1,
    branch: '成功二店',
    shift_type: 1,
    start_time: '2023-07-23 15:00:00',
    headcount: 5,
    total_amount: 6500
  },
  {
    order_no: '202307231145',
    table_no: 'A2',
    batch_no: 1,
    branch: '成功二店',
    shift_type: 1,
    start_time: '2023-07-23 15:00:00',
    headcount: 5,
    total_amount: 6500
  },
  {
    order_no: '202307231145',
    table_no: 'A2',
    batch_no: 1,
    branch: '成功二店',
    shift_type: 1,
    start_time: '2023-07-23 15:00:00',
    headcount: 5,
    total_amount: 6500
  },
  {
    order_no: '202307231145',
    table_no: 'A2',
    batch_no: 1,
    branch: '成功二店',
    shift_type: 1,
    start_time: '2023-07-23 15:00:00',
    headcount: 5,
    total_amount: 6500
  },
  {
    order_no: '202307231145',
    table_no: 'A2',
    batch_no: 1,
    branch: '成功二店',
    shift_type: 1,
    start_time: '2023-07-23 15:00:00',
    headcount: 5,
    total_amount: 6500
  },
  {
    order_no: '202307231145',
    table_no: 'A2',
    batch_no: 1,
    branch: '成功二店',
    shift_type: 1,
    start_time: '2023-07-23 15:00:00',
    headcount: 5,
    total_amount: 6500
  },
  {
    order_no: '202307231145',
    table_no: 'A2',
    batch_no: 1,
    branch: '成功二店',
    shift_type: 1,
    start_time: '2023-07-23 15:00:00',
    headcount: 5,
    total_amount: 6500
  },
  {
    order_no: '202307231145',
    table_no: 'A2',
    batch_no: 1,
    branch: '成功二店',
    shift_type: 1,
    start_time: '2023-07-23 15:00:00',
    headcount: 5,
    total_amount: 6500
  }
]

const initSearchParams = {
  datetime_range: [
    moment().add(-4, 'd').format('YYYY-MM-DD HH:mm:ss'),
    moment().format('YYYY-MM-DD HH:mm:ss')
  ],
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
}

const OrderDetailDialog = ref(null)
function handleDetail(idx, data) {
  OrderDetailDialog.value.show(data.order_no)
  console.log(idx, data)
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
          v-model="searchParams.datetime_range"
          type="datetimerange"
          start-placeholder="開始時間"
          end-placeholder="結束時間"
          format="YYYY-MM-DD HH:mm:ss"
          value-format="YYYY-MM-DD HH:mm:ss"
        />
      </FilterItem>
    </ControlPlane>
    <DataPlane>
      <template #main-data>
        <AppTable :data="tableData" :columns="tableColumn" :detail="handleDetail" />
      </template>
      <template #page-data>
        <AppPagination :data="pagination" @change="handleChange" />
      </template>
    </DataPlane>
    <DetailDialog ref="OrderDetailDialog" />
  </div>
</template>

<style lang="scss" scoped></style>
