<script setup>
import {ref} from "vue";

defineProps({
  title: String,
})

const emits = defineEmits(['cancel', 'confirm', 'opened'])

const isShow = ref(false)

function show() {
  isShow.value = !isShow.value
}

const AppDrawer = ref(null)
function close() {
  AppDrawer.value.handleClose()
}

function handleOpened() {
  emits('opened')
}

defineExpose({show, close});
</script>

<template>
  <ElDrawer
      ref="AppDrawer"
      class="app-drawer-container"
      v-model="isShow"
      :destroy-on-close="true"
      direction="rtl"
      size="35%"
      @opened="handleOpened"
  >
    <template #header>
      <span class="app-drawer-container--title">{{title}}</span>
    </template>
    <template #default>
      <slot />
    </template>
    <template #footer>
      <div style="flex: auto">
        <ElButton @click="$emit('cancel')">取消</ElButton>
        <ElButton type="primary" @click="$emit('confirm')">確認</ElButton>
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
