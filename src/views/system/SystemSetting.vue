<script setup>
import { reactive } from 'vue'
import { Box } from '@element-plus/icons-vue'
import { useBranchStore } from '@/stores/branch'

const branchStore = useBranchStore()

const initForm = {
  liquor_stock_warning_percent: 70,
  branch_prefix: branchStore.getCodePrefix
}

const form = reactive({ ...initForm })

const rules = reactive({
  liquor_stock_warning_percent: [{ required: true, message: '請輸入', trigger: 'blue' }],
  branch_prefix: [{ required: true, message: '請輸入', trigger: 'blue' }]
})

function handleSave() {
  // call api
  branchStore.setCodePrefix(form.branch_prefix)
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
        <ElFormItem label="庫存告警比例 (%)" required prop="liquor_stock_warning_percent">
          <ElInputNumber v-model.number="form.liquor_stock_warning_percent" :min="0" :max="100" />
        </ElFormItem>
        <ElFormItem label="分店代號前綴" required prop="branch_prefix">
          <ElInput v-model="form.branch_prefix" placeholder="請輸入" style="width: 250px" />
        </ElFormItem>
      </ElForm>
      <div style="margin-top: 32px; display: flex; justify-content: right">
        <ElButton type="primary" :icon="Box" size="large" @click="handleSave">保存</ElButton>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
