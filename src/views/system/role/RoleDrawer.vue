<script setup>
import AppDrawer from "@/components/AppDrawer.vue";
import {reactive, ref} from "vue";
import {getPermissionData} from "@/composable/permission";

const props = defineProps({
  type: String,
})

const staffId = ref(0)

const initForm = {
  name: '',
  is_enabled: 1,
  permissions: []
}

const form = reactive({ ...initForm })

const permissions = ref([])

const RoleDrawer = ref(null)
const RoleForm = ref(null)
const PermissionTree = ref(null)
function show(id=0) {
  if (props.type === "create") {
    Object.assign(form, initForm);
  } else if (props.type === "edit") {
    staffId.value = id
    // call api to get data
    const apiReturn = {
      name: '分店主管',
      is_enabled: 1,
      permissions: ['System.Role.Delete', 'System.Admin', 'System.Admin.Create']
    }
    permissions.value = apiReturn.permissions
    Object.assign(form, apiReturn);
  }
  RoleDrawer.value.show()
}

defineExpose({show});

function handleConfirm() {
  RoleForm.value.validate((valid, fields) => {
    if (valid) {
      var checkedKeys = PermissionTree.value.getCheckedKeys()
      console.log(checkedKeys)
      if (props.type === "create") {
        // call create api
      } else if (props.type === "edit") {
        // call edit api with {staffId}
      }
      RoleDrawer.value.close()
    } else {
      console.log('error submit!', fields)
    }
  })
}

function handleCancel() {
  if (props.type === "create") {
    Object.assign(form, initForm);
  }
  RoleDrawer.value.close()
}

const rules = reactive({
  name: [
    { required: true, message: '請輸入姓名', trigger: 'blur' },
  ],
})

function handleOpened() {
  console.log(permissions.value)
  PermissionTree.value.setCheckedKeys(permissions.value)
}

const permissionData = ref([])
getPermissionData(permissionData)
</script>

<template>
  <AppDrawer
      ref="RoleDrawer"
      :title="type === 'create' ? '新增角色' : '編輯角色'"
      :confirm="handleConfirm"
      :cancel="handleCancel"
      :opened="handleOpened"
  >
    <ElForm
        ref="RoleForm"
        :model="form"
        :rules="rules"
        require-asterisk-position="right"
        label-position="top"
        status-icon
    >
      <ElFormItem label="名稱" required prop="name">
        <ElInput v-model="form.name" />
      </ElFormItem>
      <ElFormItem label="狀態" required prop="is_enabled">
        <ElSwitch v-model="form.is_enabled" :active-value="1" :inactive-value="0" />
      </ElFormItem>
      <div style="font-size: 14px;margin-bottom: 8px;color: #606266;">權限</div>
      <ElTreeV2
          ref="PermissionTree"
          :data="permissionData"
          show-checkbox
          :height="500"
          :item-size="32"
          :default-expand-all="true"
      />
    </ElForm>
  </AppDrawer>
</template>

<style scoped lang="scss">

</style>
