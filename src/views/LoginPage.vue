<script setup>
import {reactive, ref} from "vue";
import {useAdminStore} from "@/stores/admin";
import {useRouter} from "vue-router";

const permissions = [
  'Branch',
  'Branch.List',
  'Branch.List.View',
  'Branch.List.Create',
  'Branch.List.Edit',
  'Branch.List.Delete',
  'Branch.List.Password',
  'Branch.Station',
  'Branch.Station.View',
  'Branch.Station.Create',
  'Branch.Station.Edit',
  'Branch.Station.Delete',
  'Branch.Table',
  'Branch.Table.View',
  'Branch.Table.Create',
  'Branch.Table.Edit',
  'Branch.Table.Delete',
  'Liquor',
  'Liquor.Stock',
  'Liquor.Stock.View',
  'Liquor.Stock.Create',
  'Liquor.Stock.Edit',
  'Liquor.Stock.Delete',
  'Liquor.Stock.Replenish',
  'Liquor.Recipe',
  'Liquor.Recipe.View',
  'Liquor.Recipe.Create',
  'Liquor.Recipe.Edit',
  'Liquor.Recipe.Delete',
  'Liquor.Recipe.Category',
  'Liquor.Addon',
  'Liquor.Addon.View',
  'Liquor.Addon.Create',
  'Liquor.Addon.Edit',
  'Liquor.Addon.Delete',
  'Meal',
  'Meal.View',
  'Meal.Create',
  'Meal.Edit',
  'Meal.Delete',
  'Meal.Category',
  'Order',
  'Report',
  'Report.Profit',
  'Report.Meal',
  'Staff',
  'Staff.List',
  'Staff.List.View',
  'Staff.List.Create',
  'Staff.List.Edit',
  'Staff.List.Delete',
  'Staff.AttendanceRecord',
  'System',
  'System.Role',
  'System.Role.View',
  'System.Role.Create',
  'System.Role.Edit',
  'System.Role.Delete',
  'System.Admin',
  'System.Admin.View',
  'System.Admin.Create',
  'System.Admin.Edit',
  'System.Admin.Delete',
  'System.Admin.Password',
  'System.Oplog',
  'System.Setting',
  'Bill',
  'Bill.Payment',
  'Bill.Transaction',
]

const router = useRouter()
const adminStore = useAdminStore()

const loading = ref(false)

const initForm ={
  company_no: '',
  account: '',
  password: '',
}

const form = reactive({ ...initForm })

const rules= reactive({
  company_no: [
    { required: true, message: '請輸入公司代號', trigger: 'blur' },
  ],
  account: [
      { required: true, message: '請輸入帳號', trigger: 'blur' },
  ],
  password: [
      { required: true, message: '請輸入密碼', trigger: 'blur' },
  ],
})

const LoginForm = ref(null)

function resolvePermission() {
  const permMap = permissions.reduce((a, v) => ({ ...a, [v]: true}), {})
  for (const [key] of Object.entries(permMap)) {
    const tmp = key.split('.')
    if (tmp.length === 3) {
      permMap[tmp[0]] = true
      permMap[`${tmp[0]}.${tmp[1]}`] = true
    }
  }

  return permMap
}

const LoginButton = ref(null)
function handleLogin() {
  LoginForm.value.validate((valid, fields) => {
    if (valid) {
      loading.value = true
      // call login api
      setTimeout(function () {
        adminStore.setAdmin({
          name: 'Andy',
          token: 'ca4c0bc59653558441aa14386978bd6f',
          branch_id: 1,
          permissions: resolvePermission(),
        })
        loading.value = false
        router.push('/dashboard')
      }, 1000)
      console.log(form)
    } else {
      console.log('error submit!', fields)
    }
  })
}

window.addEventListener('keyup', (event) => {
  if (event.key === 'Enter') {
    handleLogin()
  }
});
</script>

<template>
  <div class="login-container" v-loading="loading">
    <div class="login-container--form">
      <div class="login-container--title">管理後台</div>
      <ElForm
          ref="LoginForm"
          :model="form"
          :rules="rules"
          label-position="top"
          label-width="100px"
          hide-required-asterisk
      >
        <ElFormItem label="公司代號" prop="company_no">
          <ElInput v-model="form.company_no" placeholder="請輸入公司代號" size="large" />
        </ElFormItem>
        <ElFormItem label="帳號" prop="account">
          <ElInput v-model="form.account" placeholder="請輸入帳號" size="large" />
        </ElFormItem>
        <ElFormItem label="密碼" prop="password">
          <ElInput v-model="form.password" type="password" placeholder="請輸入密碼" show-password size="large" />
        </ElFormItem>
        <ElButton ref="LoginButton" style="width: 100%;margin-top: 12px;" type="primary" @click="handleLogin" size="large">登入</ElButton>
      </ElForm>
      <div class="login-container--footer">
        <p>Copyright ©{{ new Date().getFullYear() }} Aladdog. All rights reserved.</p>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.login-container {
  min-height: 100vh;
  width: 100%;
  background-color: var(--app-background-color);
  .login-container--form {
    width: 520px;
    position: absolute;
    top: 50%;
    left: 50%;
    margin-left: -260px;
    transform: translateY(-55%);
    .login-container--title {
      margin-bottom: 30px;
      color: #4c4c4c;
      font-weight: bold;
      font-size: 40px;
      text-align: center;
    }

    .login-container--footer {
      color: #4c4c4c;
      font-size: 12px;
      font-weight: 500;
      text-align: center;
      letter-spacing: 1px;
      margin-top: 24px;
    }
  }
}
</style>
