<script setup>
import { reactive, ref } from 'vue'
import { getInvoiceStatus, getPayStatus } from '@/composable/enums'

const payStatus = ref({})
getPayStatus(payStatus)

console.log(payStatus.value[1])

const invoiceStatus = ref({})
getInvoiceStatus(invoiceStatus)

const isVisible = ref(false)
const detailData = reactive({
  id: 1,
  month: '2023-07',
  branch_id: 1,
  branch: '成功一店',
  total_amount: 1500,
  pay_status: 1,
  invoice_status: 1,
  invoice_no: 'PX-29268886',
  invoice_issued_at: '2023-07-23 15:00:00'
})

function show(id) {
  isVisible.value = true
  detailData.id = id
  // call transaction detail api
}

defineExpose({ show })

const formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'TWD',
  maximumFractionDigits: 0
})
</script>

<template>
  <div class="dddd">
    <ElDialog v-model="isVisible" title="交易詳情" width="60%">
      <ElDescriptions class="margin-top" :column="2" size="large" border>
        <ElDescriptionsItem label="月份" label-align="center">{{
          detailData.month
        }}</ElDescriptionsItem>
        <ElDescriptionsItem label="分店" label-align="center">{{
          detailData.branch
        }}</ElDescriptionsItem>
        <ElDescriptionsItem label="付款狀態" label-align="center">{{
          payStatus[detailData.pay_status].text
        }}</ElDescriptionsItem>
        <ElDescriptionsItem label="總金額" label-align="center">
          {{ formatter.format(detailData.total_amount) }}
        </ElDescriptionsItem>
      </ElDescriptions>
      <ElDivider style="margin-top: 24px">發票資訊</ElDivider>
      <ElDescriptions class="margin-top" :column="2" size="large" border>
        <ElDescriptionsItem label="開立狀態" label-align="center">{{
          payStatus[detailData.invoice_status].text
        }}</ElDescriptionsItem>
        <ElDescriptionsItem label="發票號碼" label-align="center">{{
          detailData.invoice_no
        }}</ElDescriptionsItem>
        <ElDescriptionsItem label="開立時間" label-align="center">{{
          detailData.invoice_issued_at
        }}</ElDescriptionsItem>
      </ElDescriptions>
    </ElDialog>
  </div>
</template>

<style scoped lang="scss"></style>
