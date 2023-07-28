<script setup>
import {RouterView, useRoute} from 'vue-router'

const key = useRoute().path
</script>

<template>
  <div class="app-main-container">
    <RouterView :key="key" v-slot="{ Component }">
      <Transition>
      <Component :is="Component" />
      </Transition>
    </RouterView>
  </div>
</template>

<style lang="scss" scoped>
.app-main-container {
  padding: 24px 32px;
  margin-top: var(--topbar-height);
  margin-left: var(--sidebar-width);
  min-height: calc(100vh - var(--topbar-height));
}
</style>
