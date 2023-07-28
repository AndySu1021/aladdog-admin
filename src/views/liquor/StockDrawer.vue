<script setup>
import AppDrawer from "@/components/AppDrawer.vue";
import {reactive, ref} from "vue";

const props = defineProps({
  type: String,
})

const branchId = ref(0)

const initForm = {
  branch_id: null,
  name: '',
  capacity: 1,
  quantity: 1,
  cost: 1,
  stock_id: null,
}

const form = reactive({ ...initForm })

const StockDrawer = ref(null)
const StockForm = ref(null)
function show(id=0) {
  if (props.type === "create") {
    Object.assign(form, initForm);
  } else if (props.type === "edit") {
    branchId.value = id
    // call api to get data
    const apiReturn = {
        id: 1,
        branch_id: 1,
        name: 'Campari',
        capacity: 750,
        quantity: 3,
        cost: 1200,
    }
    Object.assign(form, apiReturn);
  }
  StockDrawer.value.show()
}

defineExpose({show});

function handleConfirm() {
  StockForm.value.validate((valid, fields) => {
    if (valid) {
      if (props.type === "create") {
        // call create api
      } else if (props.type === "edit") {
        // call edit api with {branchId}
      }
      StockDrawer.value.close()
      console.log(form)
    } else {
      console.log('error submit!', fields)
    }
  })
}

function handleCancel() {
  if (props.type === "create") {
    Object.assign(form, initForm);
  }
  StockDrawer.value.close()
}

const rules = reactive({
  branch_id: [
    { required: true, message: '請選擇分店', trigger: 'change' },
  ],
  name: [
    { required: true, message: '請輸入名稱', trigger: 'blue' },
  ],
  capacity: [
    { required: true, message: '請輸入單位容量', trigger: 'blue' },
  ],
  quantity: [
    { required: true, message: '請輸入數量', trigger: 'blue' },
  ],
  cost: [
    { required: true, message: '請輸入參考成本價', trigger: 'blue' },
  ],
})
</script>

<template>
  <AppDrawer
      ref="StockDrawer"
      :title="type === 'create' ? '新增庫存' : '編輯庫存'"
      @confirm="handleConfirm"
      @cancel="handleCancel"
  >
    <ElForm
        ref="StockForm"
        :model="form"
        :rules="rules"
        require-asterisk-position="right"
        label-position="top"
        status-icon
    >
      <ElFormItem label="分店" required prop="branch_id">
        <ElSelect v-model.number="form.branch_id" placeholder="請選擇">
          <ElOption label="中華一店" :value="1" />
          <ElOption label="成功二店" :value="2" />
        </ElSelect>
      </ElFormItem>
      <ElFormItem label="名稱" required prop="name">
        <ElInput v-model="form.name" />
      </ElFormItem>
      <ElFormItem label="單位容量" required prop="capacity">
        <ElInput v-model.number="form.capacity" placeholder="請輸入單位容量">
          <template #append>ml</template>
        </ElInput>
      </ElFormItem>
      <ElFormItem label="數量" required prop="quantity">
        <ElInput v-model="form.quantity" placeholder="請輸入數量">
          <template #append>瓶</template>
        </ElInput>
      </ElFormItem>
      <ElFormItem label="參考成本價" required prop="cost">
        <ElInput
            v-model.number="form.cost"
            placeholder="請輸入參考成本價"
            :formatter="(value) => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')"
            :parser="(value) => value.replace(/\$\s?|(,*)/g, '')"
        />
      </ElFormItem>
    </ElForm>
  </AppDrawer>
</template>

<style scoped lang="scss">

</style>
