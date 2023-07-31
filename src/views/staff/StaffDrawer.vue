<script setup>
import AppDrawer from "@/components/AppDrawer.vue";
import {reactive, ref} from "vue";
import BranchSelect from "@/components/BranchSelect.vue";

const props = defineProps({
  type: String,
})

const staffId = ref(0)

const initForm = {
  name: '',
  branch_id: null,
  sex: null,
  mobile: '',
  staff_no: '',
}

const form = reactive({ ...initForm })

const StaffDrawer = ref(null)
const StaffForm = ref(null)
function show(id=0) {
  if (props.type === "create") {
    Object.assign(form, initForm);
  } else if (props.type === "edit") {
    staffId.value = id
    // call api to get data
    const apiReturn = {
      name: 'Andy',
      branch_id: 1,
      sex: 1,
      mobile: '0912345678',
      staff_no: '112056',
    }
    Object.assign(form, apiReturn);
  }
  StaffDrawer.value.show()
}

defineExpose({show});

function handleConfirm() {
  StaffForm.value.validate((valid, fields) => {
    if (valid) {
      if (props.type === "create") {
        // call create api
      } else if (props.type === "edit") {
        // call edit api with {staffId}
      }
      StaffDrawer.value.close()
    } else {
      console.log('error submit!', fields)
    }
  })
}

function handleCancel() {
  if (props.type === "create") {
    Object.assign(form, initForm);
  }
  StaffDrawer.value.close()
}

const rules = reactive({
  name: [
    { required: true, message: '請輸入姓名', trigger: 'blur' },
  ],
  branch_id: [
    { required: true, message: '請選擇分店', trigger: 'change' },
  ],
  sex: [
    { required: true, message: '請選擇性別', trigger: 'change' },
  ],
  mobile: [
    { required: true, message: '請輸入手機號', trigger: 'blur' },
  ],
  staff_no: [
    { required: true, message: '請輸入員工編號', trigger: 'blur' },
    { min: 6, max: 10, message: '員工編號長度 6-10', trigger: 'blur' },
  ],
})
</script>

<template>
  <AppDrawer
      ref="StaffDrawer"
      :title="type === 'create' ? '新增員工' : '編輯員工'"
      @confirm="handleConfirm"
      @cancel="handleCancel"
  >
    <ElForm
        ref="StaffForm"
        :model="form"
        :rules="rules"
        require-asterisk-position="right"
        label-position="top"
        status-icon
    >
      <ElFormItem label="分店" required prop="branch_id">
        <BranchSelect v-model="form.branch_id" />
      </ElFormItem>
      <ElFormItem label="姓名" required prop="name">
        <ElInput v-model="form.name" />
      </ElFormItem>
      <ElFormItem label="性別" required prop="sex">
        <ElRadioGroup v-model="form.sex">
          <ElRadio :label="1">男</ElRadio>
          <ElRadio :label="2">女</ElRadio>
        </ElRadioGroup>
      </ElFormItem>
      <ElFormItem label="手機號" required prop="mobile">
        <ElInput v-model="form.mobile" />
      </ElFormItem>
      <ElFormItem label="員工編號" required prop="staff_no">
        <ElInput v-model="form.staff_no" />
      </ElFormItem>
    </ElForm>
  </AppDrawer>
</template>

<style scoped lang="scss">

</style>
