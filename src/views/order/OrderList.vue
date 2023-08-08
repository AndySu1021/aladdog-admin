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
import { formatAmount } from '@/utils/formatter'

const shiftType = ref({})
getShiftType(shiftType)

const tableColumn = [
  {
    prop: 'order_no',
    label: '訂單號'
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
    prop: 'table_no',
    label: '桌號'
  },
  {
    prop: 'batch_no',
    label: '批次號'
  },
  {
    prop: 'start_time',
    label: '入座時間'
  },
  {
    prop: 'headcount',
    label: '用餐人數'
  },
  {
    prop: 'total_amount',
    label: '總金額',
    formatter: (data) => formatAmount(data.total_amount)
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
        <AppTable :data="tableData" :columns="tableColumn" :on-detail="handleDetail" />
      </template>
      <template #page-data>
        <AppPagination :data="pagination" @change="handleChange" />
      </template>
    </DataPlane>
    <DetailDialog ref="OrderDetailDialog" />
  </div>
</template>

<style lang="scss" scoped></style>
