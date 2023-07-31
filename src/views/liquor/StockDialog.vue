<script setup>
import {Plus} from "@element-plus/icons-vue";
import {reactive, ref} from "vue";
import BranchSelect from "@/components/BranchSelect.vue";

const isShow = ref(false)
function show() {
  isShow.value = true
}

const initForm = {
  branch_id: null,
  stocks: [{
    stock_id: null,
    quantity: 0,
  }],
}

const form = reactive(JSON.parse(JSON.stringify(initForm)))

function handleStockAdd() {
  form.stocks.push({
    stock_id: null,
    quantity: 0,
  })
}

defineExpose({show})

const rules = reactive({
  branch_id: [
    { required: true, message: '請選擇分店', trigger: 'change' },
  ],
})

const ReStockForm = ref(null)
function handleConfirm() {
  ReStockForm.value.validate((valid, fields) => {
    if (valid) {
      Object.assign(form, JSON.parse(JSON.stringify(initForm)))
      isShow.value = false
      console.log(form)
    } else {
      console.log('error submit!', fields)
    }
  })
}

function handleCancel() {
  Object.assign(form, JSON.parse(JSON.stringify(initForm)))
  isShow.value = false
}
</script>

<template>
  <ElDialog
      v-model="isShow"
      title="庫存補貨"
      width="40%"
      :close-on-click-modal="false"
      :destroy-on-close="true"
      center
  >
    <ElForm
        ref="ReStockForm"
        :model="form"
        :rules="rules"
        require-asterisk-position="right"
        label-position="right"
        status-icon
        label-width="120px"
    >
      <ElFormItem v-if="adminStore.getBranchId === 0" label="分店" required prop="branch_id">
        <BranchSelect v-model.number="form.branch_id" />
      </ElFormItem>
      <template v-for="(stock, idx) in form.stocks" :key="idx">
        <ElFormItem :label="`酒品 ${idx+1}`" required>
          <ElRow :gutter="4">
            <ElCol :span="12">
              <ElSelect filterable v-model.number="stock.stock_id" placeholder="請選擇">
                <ElOption label="Campari" :value="1" />
                <ElOption label="Bowmore" :value="2" />
              </ElSelect>
            </ElCol>
            <ElCol :span="8">
              <ElInput v-model.number="stock.quantity" placeholder="請輸入數量">
                <template #append>瓶</template>
              </ElInput>
            </ElCol>
          </ElRow>
        </ElFormItem>
      </template>
      <ElButton :icon="Plus" plain @click="handleStockAdd" style="margin-left: 58px;"/>
    </ElForm>
    <template #footer>
      <div style="flex: auto">
        <ElButton @click="handleCancel">取消</ElButton>
        <ElButton type="primary" @click="handleConfirm">確認</ElButton>
      </div>
    </template>
  </ElDialog>
</template>

<style scoped lang="scss">

</style>
