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
}

const form = reactive({ ...initForm })

const StationDrawer = ref(null)
const StationForm = ref(null)
function show(id=0) {
  if (props.type === "create") {
    Object.assign(form, initForm);
  } else if (props.type === "edit") {
    branchId.value = id
    // call api to get data
    const apiReturn = {
      id: 1,
      branch_id: 1,
      name: '廚房',
    }
    Object.assign(form, apiReturn);
  }
  StationDrawer.value.show()
}

defineExpose({show});

function handleConfirm() {
  StationForm.value.validate((valid, fields) => {
    if (valid) {
      if (props.type === "create") {
        // call create api
      } else if (props.type === "edit") {
        // call edit api with {branchId}
      }
      StationDrawer.value.close()
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
  StationDrawer.value.close()
}

const rules = reactive({
  branch_id: [
    { required: true, message: '請選擇分店', trigger: 'change' },
  ],
  name: [
    { required: true, message: '請輸入名稱', trigger: 'blue' },
  ],
})
</script>

<template>
  <AppDrawer
      ref="StationDrawer"
      :title="type === 'create' ? '新增崗位' : '編輯崗位'"
      @confirm="handleConfirm"
      @cancel="handleCancel"
  >
    <ElForm
        ref="StationForm"
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
      <ElFormItem label="崗位名稱" required prop="name">
        <ElInput v-model="form.name" />
      </ElFormItem>
    </ElForm>
  </AppDrawer>
</template>

<style scoped lang="scss">

</style>
