<script setup>
import { ref } from 'vue'

defineProps({
  title: {
    type: String,
    default: ''
  },
  size: {
    type: String,
    default: '35%'
  },
  cancel: {
    type: Function,
    default: null
  },
  confirm: {
    type: Function,
    default: null
  },
  opened: {
    type: Function,
    default: null
  }
})

const isShow = ref(false)

function show() {
  isShow.value = !isShow.value
}

const AppDrawer = ref(null)
function close() {
  AppDrawer.value.handleClose()
}

defineExpose({ show, close })
</script>

<template>
  <ElDrawer
    ref="AppDrawer"
    class="app-drawer-container"
    v-model="isShow"
    :destroy-on-close="true"
    direction="rtl"
    :size="size"
    @opened="opened"
  >
    <template #header>
      <span class="app-drawer-container--title">{{ title }}</span>
    </template>
    <template #default>
      <slot />
    </template>
    <template #footer>
      <div style="flex: auto">
        <ElButton v-if="cancel" @click="cancel">取消</ElButton>
        <ElButton v-if="confirm" type="primary" @click="confirm">確認</ElButton>
      </div>
    </template>
  </ElDrawer>
</template>

<style scoped lang="scss">
.app-drawer-container {
  .app-drawer-container--title {
    font-size: 20px;
    font-weight: 500;
    color: black;
  }
}
</style>
