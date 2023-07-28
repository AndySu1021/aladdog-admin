<script setup>
import {BellFilled, CaretBottom, Setting, SwitchButton, Warning} from "@element-plus/icons-vue";
import {ref} from "vue";
import {useAdminStore} from "@/stores/admin";
import {ElMessage, ElMessageBox} from "element-plus";
import {removeToken} from "@/utils/storage";
import {useRoute, useRouter} from "vue-router";

const hasDot = ref(true)
const route = useRoute()
const router = useRouter()
const store = useAdminStore()

const notices = ref([
  {
    id: 1,
    content: '庫存告警通知: Campari'
  },
  {
    id: 2,
    content: '庫存告警通知: Campari'
  },
  {
    id: 3,
    content: '庫存告警通知: Campari'
  },
  {
    id: 4,
    content: '庫存告警通知: Campari'
  },
  {
    id: 5,
    content: '庫存告警通知: Campari'
  },
])
function handleNotice(noticeId) {
  console.log(noticeId)
}

const adminStore = useAdminStore()

function handleCommand(command) {
  switch (command) {
    case 'password': {
      ElMessageBox.prompt('請輸入新密碼', '修改密碼', {
        confirmButtonText: '確認',
        cancelButtonText: '取消',
        inputPattern: /^[a-zA-Z0-9]{8,20}$/,
        inputErrorMessage: '密碼長度為 8 - 20 英文數字',
      }).then(() => {
        ElMessage({
          type: 'success',
          message: '修改成功',
        })
      }).catch(() => {
        ElMessage({
          type: 'info',
          message: '取消修改',
        })
      })
      break;
    }
    case 'logout': {
      ElMessageBox.confirm(
          '確定登出嗎？',
          '登出',
          {
            confirmButtonText: '確認',
            cancelButtonText: '取消',
            type: 'warning',
            center: false,
            showClose: false,
          }
      ).then(() => {
        // TODO: call logout api
        adminStore.$reset()
        removeToken()
        ElMessage({
          type: 'success',
          message: '登出成功',
        })
        router.push('/login')
      }).catch(() => {})
      break;
    }
  }
}
</script>

<template>
<div class="top-bar-container">
  <div class="top-bar-title">
    <ElIcon class="top-bar-title--icon"><Component :is="route.meta.icon" /></ElIcon>
    <span class="top-bar-title--text">{{route.meta.title}}</span>
  </div>
  <div class="top-bar-operation">
    <ElDropdown trigger="click" @command="handleNotice" placement="bottom-end">
      <div style="position: relative;display: flex;align-items: center;margin-right: 24px;">
        <ElIcon class="top-bar-operation--notice"><BellFilled /></ElIcon>
        <span v-if="hasDot" style="display: inline-block;border-radius: 50%;position: absolute;top: -1px;left: 15px;border: 5px solid white;"></span>
        <span v-if="hasDot" style="display: inline-block;border-radius: 50%;position: absolute;top: 0;left: 16px;border: 4px solid #ea0909;"></span>
      </div>
      <template #dropdown>
        <ElDropdownMenu>
          <ElDropdownItem
              v-for="(notice, idx) in notices"
              :key="idx"
              :command="notice.id"
              size="large"
          >
            <div class="demo-notice">
              <ElIcon><Warning /></ElIcon>
              <span style="margin-left: 8px;">{{ notice.content }}</span>
            </div>
          </ElDropdownItem>
        </ElDropdownMenu>
      </template>
    </ElDropdown>
    <ElDropdown trigger="click" @command="handleCommand">
      <div class="top-bar-operation--drop">
        <el-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" />
        <span v-if="store.name !== ''">{{store.name}}</span>
        <ElIcon><CaretBottom /></ElIcon>
      </div>
      <template #dropdown>
        <ElDropdownMenu>
          <ElDropdownItem :icon="Setting" command="password">修改密碼</ElDropdownItem>
          <ElDropdownItem divided :icon="SwitchButton" command="logout">登出</ElDropdownItem>
        </ElDropdownMenu>
      </template>
    </ElDropdown>
  </div>
</div>
</template>

<style lang="scss" scoped>
.top-bar-container {
  width: calc(100% - var(--sidebar-width));
  height: var(--topbar-height);
  position: fixed;
  top: 0;
  right: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: white;
  border-bottom: 1px solid rgb(233, 233,233);
  padding: 10px 32px;
  z-index: 1001;
  .top-bar-title {
    display: flex;
    align-items: center;
    .top-bar-title--icon {
      font-size: 24px;
      margin-right: 12px;
    }
    .top-bar-title--text {
      font-size: 18px;
      font-weight: 500;
    }
    i {
      font-size: 24px;
    }
  }
  .top-bar-operation {
    display: flex;
    align-items: center;
    .top-bar-operation--notice {
      font-size: 24px;
      &:hover {
        cursor: pointer;
      }
    }
    .top-bar-operation--drop {
      display: flex;
      align-items: center;
      justify-content: space-between;
      width: 110px;
      cursor: pointer;
    }
  }
}
.demo-notice {
  width: 300px;
  height: 50px;
  display: flex;
  align-items: center;
  border-radius: 8px;
  padding: 16px;
}
</style>
