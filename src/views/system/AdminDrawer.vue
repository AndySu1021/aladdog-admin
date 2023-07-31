<script setup>
import AppDrawer from "@/components/AppDrawer.vue";
import {reactive, ref} from "vue";
import BranchSelect from "@/components/BranchSelect.vue";

const props = defineProps({
  type: String,
})

const staffId = ref(0)

const initForm = {
  branch_id: null,
  role_id: null,
  name: '',
  sex: null,
  mobile: '',
  is_enabled: 1,
  password: '',
}

const form = reactive({ ...initForm })

const AdminDrawer = ref(null)
const AdminForm = ref(null)
function show(id=0) {
  if (props.type === "create") {
    Object.assign(form, initForm);
  } else if (props.type === "edit") {
    staffId.value = id
    // call api to get data
    const apiReturn = {
      branch_id: 1,
      role_id: 1,
      name: 'Andy',
      sex: 1,
      mobile: '0912345678',
      is_enabled: 1,
    }
    Object.assign(form, apiReturn);
  }
  AdminDrawer.value.show()
}

defineExpose({show});

function handleConfirm() {
  AdminForm.value.validate((valid, fields) => {
    if (valid) {
      if (props.type === "create") {
        // call create api
      } else if (props.type === "edit") {
        // call edit api with {staffId}
      }
      AdminDrawer.value.close()
    } else {
      console.log('error submit!', fields)
    }
  })
}

function handleCancel() {
  if (props.type === "create") {
    Object.assign(form, initForm);
  }
  AdminDrawer.value.close()
}

const rules = reactive({
  branch_id: [
    { required: true, message: '請選擇分店', trigger: 'change' },
  ],
  role_id: [
    { required: true, message: '請選擇角色', trigger: 'change' },
  ],
  name: [
    { required: true, message: '請輸入姓名', trigger: 'blur' },
  ],
  sex: [
    { required: true, message: '請選擇性別', trigger: 'change' },
  ],
  mobile: [
    { required: true, message: '請輸入手機號', trigger: 'blur' },
    { pattern: '^(09)[0-9]{8}$', message: '手機號格式錯誤', trigger: 'blur' },
  ],
  password: [
    { required: true, message: '請輸入密碼', trigger: 'blur' },
    { min: 8, max:20, message: '密碼長度 8 - 20', trigger: 'blur' },
  ],
})
</script>

<template>
  <AppDrawer
      ref="AdminDrawer"
      :title="type === 'create' ? '新增管理員' : '編輯管理員'"
      @confirm="handleConfirm"
      @cancel="handleCancel"
  >
    <ElForm
        ref="AdminForm"
        :model="form"
        :rules="rules"
        require-asterisk-position="right"
        label-position="top"
        status-icon
    >
      <ElFormItem label="分店" required prop="branch_id">
        <BranchSelect v-model.number="form.branch_id" :show-all="true" all-title="總店" />
      </ElFormItem>
      <ElFormItem label="角色" required prop="role_id">
        <ElSelect v-model="form.role_id" placeholder="請選擇">
          <ElOption label="超級管理員" :value="1" />
          <ElOption label="主管" :value="2" />
        </ElSelect>
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
      <ElFormItem label="狀態" required prop="is_enabled">
        <ElSwitch v-model="form.is_enabled" :active-value="1" :inactive-value="0" />
      </ElFormItem>
      <ElFormItem v-if="type === 'create'" label="密碼" required prop="password">
        <ElInput v-model="form.password" />
      </ElFormItem>
    </ElForm>
  </AppDrawer>
</template>

<style scoped lang="scss">

</style>
