<script setup>
import AppDrawer from "@/components/AppDrawer.vue";
import {reactive, ref} from "vue";

const props = defineProps({
  type: String,
})

const branchId = ref(0)

const initForm = {
  branch_id: null,
  floor: 1,
  table_no: '',
  capacity: 0,
}

const form = reactive({ ...initForm })

const TableDrawer = ref(null)
const TableForm = ref(null)
function show(id=0) {
  if (props.type === "create") {
    Object.assign(form, initForm);
  } else if (props.type === "edit") {
    branchId.value = id
    // call api to get data
    const apiReturn = {
        id: 1,
        branch_id: 1,
        floor: 2,
        table_no: 'C22',
        capacity: 5,
    }
    Object.assign(form, apiReturn);
  }
  TableDrawer.value.show()
}

defineExpose({show});

function handleConfirm() {
  TableForm.value.validate((valid, fields) => {
    if (valid) {
      if (props.type === "create") {
        // call create api
      } else if (props.type === "edit") {
        // call edit api with {branchId}
      }
      TableDrawer.value.close()
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
  TableDrawer.value.close()
}

const checkFloor = (rule, value, callback) => {
  if (value === 0) {
    callback(new Error('樓層不可為 0'))
  } else {
    callback()
  }
}

const rules = reactive({
  branch_id: [
    { required: true, message: '請選擇分店', trigger: 'change' },
  ],
  floor: [
    { required: true, message: '請輸入樓層', trigger: 'blue' },
    { validator: checkFloor, trigger: 'blue' },
  ],
  table_no: [
    { required: true, message: '請輸入桌號', trigger: 'blue' },
  ],
  capacity: [
    { required: true, message: '請輸入人數', trigger: 'blue' },
  ],
})
</script>

<template>
  <AppDrawer
      ref="TableDrawer"
      :title="type === 'create' ? '新增桌位' : '編輯桌位'"
      @confirm="handleConfirm"
      @cancel="handleCancel"
  >
    <ElForm
        ref="TableForm"
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
      <ElFormItem label="樓層" required prop="floor">
        <ElInputNumber v-model.number="form.floor" />
      </ElFormItem>
      <ElFormItem label="桌號" required prop="table_no">
        <ElInput v-model="form.table_no" />
      </ElFormItem>
      <ElFormItem label="人數" required prop="capacity">
        <ElInputNumber v-model.number="form.capacity" :min="1" />
      </ElFormItem>
    </ElForm>
  </AppDrawer>
</template>

<style scoped lang="scss">

</style>
