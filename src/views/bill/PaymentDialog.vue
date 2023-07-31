<script setup>
import {reactive, ref} from "vue";
import {ElButton} from "element-plus";

const isShow = ref(false)
function show() {
  isShow.value = true
}

defineExpose({show})

const initForm = {
  card_no: '',
  expired: '',
  ccv: '',
}

const form = reactive({ ...initForm })

const rules = reactive({
  card_no: [
    { required: true, message: '請輸入卡號', trigger: 'blue' },
  ],
  expired: [
    { required: true, message: '請輸入到期日', trigger: 'blue' },
  ],
  ccv: [
    { required: true, message: '請輸入安全驗證碼', trigger: 'blue' },
  ],
})

function handleCancel() {
  isShow.value = false
}

function handleConfirm() {
  isShow.value = false
  console.log('confirm')
}
</script>

<template>
  <ElDialog
      v-model="isShow"
      title="新增付款方式"
      width="35%"
      :close-on-click-modal="false"
      :destroy-on-close="true"
  >
    <ElForm
        ref="SystemSettingForm"
        :model="form"
        :rules="rules"
        require-asterisk-position="right"
        label-position="top"
        status-icon
    >
      <ElFormItem label="卡號" required prop="card_no">
        <ElInput v-model="form.card_no" placeholder="請輸入卡號" />
      </ElFormItem>
      <ElFormItem label="到期日" required prop="expired">
        <ElInput v-model="form.expired" placeholder="請輸入到期日" />
      </ElFormItem>
      <ElFormItem label="安全驗證碼" required prop="ccv">
        <ElInput v-model="form.ccv" placeholder="請輸入安全驗證碼" />
      </ElFormItem>
    </ElForm>
    <template #footer>
      <ElButton size="large" @click="handleCancel">取消</ElButton>
      <ElButton type="primary" size="large" @click="handleConfirm">確認</ElButton>
    </template>
  </ElDialog>
</template>

<style scoped lang="scss">

</style>
