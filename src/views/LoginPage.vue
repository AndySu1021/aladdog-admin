<script setup>
import {reactive, ref} from "vue";

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

const LoginButton = ref(null)
function handleLogin() {
  LoginForm.value.validate((valid, fields) => {
    if (valid) {
      // call login api
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
  <div class="login-container">
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
