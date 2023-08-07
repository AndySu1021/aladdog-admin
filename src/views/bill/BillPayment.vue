<script setup>
import { reactive, ref } from 'vue'
import { Box, Plus } from '@element-plus/icons-vue'
import PaymentDialog from '@/views/bill/PaymentDialog.vue'
import { ElMessage, ElMessageBox } from 'element-plus'

const initForm = {
  company_name: '阿拉狗酒吧',
  tax_id_number: '12345678',
  contact_name: '王大名',
  contact_mobile: '0912345678',
  contact_email: 'example@gmail.com',
  payment_id: 1
}

const payments = [
  {
    id: 1,
    last_four: '0879',
    expired: '06/29'
  },
  {
    id: 2,
    last_four: '1836',
    expired: '08/29'
  }
]

const form = reactive({ ...initForm })

const rules = reactive({
  liquor_stock_warning_percent: [{ required: true, message: '請輸入', trigger: 'blue' }]
})

const AddPaymentDialog = ref(null)
function handleAddPayment() {
  AddPaymentDialog.value.show()
}

function handleRemove() {
  ElMessageBox.confirm('是否移除此付款方式？', '移除', {
    confirmButtonText: '確認',
    cancelButtonText: '取消',
    type: 'error',
    center: false,
    showClose: false
  })
    .then(() => {
      // call delete api
      ElMessage({
        type: 'success',
        message: '移除成功'
      })
    })
    .catch(() => {})
  console.log('delete')
}
</script>

<template>
  <div class="dashboard-container">
    <div style="background-color: white; padding: 32px; border-radius: 8px">
      <ElForm
        ref="SystemSettingForm"
        :model="form"
        :rules="rules"
        require-asterisk-position="right"
        label-position="top"
        status-icon
      >
        <ElDivider>公司資訊</ElDivider>
        <ElFormItem label="公司名稱" required prop="company_name">
          <ElInput style="max-width: 250px" v-model="form.company_name" placeholder="請輸入" />
        </ElFormItem>
        <ElFormItem label="統一編號" required prop="tax_id_number">
          <ElInput style="max-width: 250px" v-model="form.tax_id_number" placeholder="請輸入" />
        </ElFormItem>
        <ElDivider style="margin-top: 48px">聯絡人資訊</ElDivider>
        <ElFormItem label="姓名" required prop="contact_name">
          <ElInput style="max-width: 250px" v-model="form.contact_name" placeholder="請輸入" />
        </ElFormItem>
        <ElFormItem label="手機號" required prop="contact_mobile">
          <ElInput style="max-width: 250px" v-model="form.contact_mobile" placeholder="請輸入" />
        </ElFormItem>
        <ElFormItem label="信箱" required prop="contact_email">
          <ElInput style="max-width: 250px" v-model="form.contact_email" placeholder="請輸入" />
        </ElFormItem>
      </ElForm>
      <ElDivider style="margin-top: 48px; margin-bottom: 32px">付款方式</ElDivider>
      <ElRadioGroup v-model="form.payment_id">
        <ElRadio
          v-for="payment in payments"
          :key="payment.id"
          :label="payment.id"
          border
          style="padding: 16px; height: 110px"
        >
          <div style="margin-left: 8px">
            <div style="font-size: 16px">Visa •••• {{ payment.last_four }}</div>
            <div style="font-size: 12px; color: darkgrey">到期日: {{ payment.expired }}</div>
            <ElButton type="text" style="margin-top: 8px" @click="handleRemove">移除</ElButton>
          </div>
        </ElRadio>
        <ElButton :icon="Plus" style="height: 110px" @click="handleAddPayment"
          >新增付款方式</ElButton
        >
      </ElRadioGroup>
      <div style="margin-top: 32px; display: flex; justify-content: right">
        <ElButton type="primary" :icon="Box" size="large">保存</ElButton>
      </div>
    </div>
    <PaymentDialog ref="AddPaymentDialog" />
  </div>
</template>

<style lang="scss" scoped></style>
