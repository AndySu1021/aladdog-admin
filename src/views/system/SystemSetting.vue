<script setup>
import {reactive} from "vue";
import {Box} from "@element-plus/icons-vue";

const initForm = {
  liquor_stock_warning_percent: 70
}

const form = reactive({ ...initForm })

const rules = reactive({
  liquor_stock_warning_percent: [
    { required: true, message: '請輸入', trigger: 'blue' },
  ],
})
</script>

<template>
  <div class="dashboard-container">
    <div style="background-color: white;padding: 32px;border-radius: 8px;">
      <ElForm
          ref="SystemSettingForm"
          :model="form"
          :rules="rules"
          require-asterisk-position="right"
          label-position="top"
          status-icon
      >
        <ElFormItem label="庫存告警比例 (%)" required prop="liquor_stock_warning_percent">
          <ElInputNumber
              v-model.number="form.liquor_stock_warning_percent"
              :min="0"
              :max="100"
          />
        </ElFormItem>
      </ElForm>
      <div style="margin-top: 32px;display: flex;justify-content: right;">
        <ElButton type="primary" :icon="Box" size="large">保存</ElButton>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
</style>
