<script setup>
import ControlPlane from '@/components/ControlPlane.vue'
import DataPlane from '@/components/DataPlane.vue'
import AppTable from '@/components/AppTable.vue'
import FilterItem from '@/components/FilterItem.vue'
import { h, reactive, ref } from 'vue'
import AppPagination from '@/components/AppPagination.vue'
import moment from 'moment/moment'
import { getInvoiceStatus, getPayStatus } from '@/composable/enums'
import { ElTag } from 'element-plus'
import DetailDialog from '@/views/bill/transaction/DetailDialog.vue'
import { formatAmount } from '@/utils/formatter'

const payStatus = ref({})
getPayStatus(payStatus)

const invoiceStatus = ref({})
getInvoiceStatus(invoiceStatus)

const tableColumn = [
  {
    prop: 'month',
    label: '月份'
  },
  {
    prop: 'amount',
    label: '付款金額',
    formatter: (data) => formatAmount(data.amount)
  },
  {
    prop: 'pay_status',
    label: '付款狀態',
    cellRender: (scope) =>
      h(
        ElTag,
        { type: payStatus.value[scope.row.pay_status].type },
        () => payStatus.value[scope.row.pay_status].text
      )
  },
  {
    prop: 'invoice_status',
    label: '發票狀態',
    cellRender: (scope) =>
      h(
        ElTag,
        { type: invoiceStatus.value[scope.row.invoice_status].type },
        () => invoiceStatus.value[scope.row.invoice_status].text
      )
  }
]
const tableData = [
  {
    month: '2023-07',
    amount: 1500,
    pay_status: 3,
    invoice_status: 1
  },
  {
    month: '2023-06',
    amount: 1500,
    pay_status: 2,
    invoice_status: 2
  },
  {
    month: '2023-05',
    amount: 1500,
    pay_status: 2,
    invoice_status: 2
  },
  {
    month: '2023-04',
    amount: 1500,
    pay_status: 1,
    invoice_status: 1
  },
  {
    month: '2023-03',
    amount: 1500,
    pay_status: 1,
    invoice_status: 1
  },
  {
    month: '2023-02',
    amount: 1500,
    pay_status: 1,
    invoice_status: 1
  },
  {
    month: '2023-01',
    amount: 1500,
    pay_status: 1,
    invoice_status: 1
  },
  {
    month: '2022-12',
    amount: 1500,
    pay_status: 1,
    invoice_status: 1
  }
]

const initSearchParams = {
  month: moment().format('YYYY-MM-01')
}

const searchParams = reactive({ ...initSearchParams })
function handleReset() {
  Object.assign(searchParams, initSearchParams)
}
function handleSearch() {
  console.log(searchParams)
}

const TransactionDetailDialog = ref(null)
function handleDetail(index, data) {
  TransactionDetailDialog.value.show(data)
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
      <FilterItem title="月份">
        <ElDatePicker
          v-model="searchParams.month"
          type="month"
          placeholder="請選擇"
          format="YYYY - MM"
          value-format="YYYY-MM-DD"
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
    <DetailDialog ref="TransactionDetailDialog" />
  </div>
</template>

<style lang="scss" scoped></style>
