<script setup>
import SidebarItem from '@/layout/Sidebar/SidebarItem.vue'
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import { useRoutesStore } from '@/stores/routes'

const route = useRoute()
const isCollapse = ref(false)

const store = useRoutesStore()
</script>

<template>
  <div class="sidebar-container">
    <ElMenu
      style="border-right: none"
      :default-active="route.path"
      :collapse="isCollapse"
      :router="true"
    >
      <template v-for="route in store.getRoutes">
        <SidebarItem
          v-if="!route.hidden"
          :key="route.path"
          :item="route"
          :path="route.path"
          :is-top="true"
        />
      </template>
    </ElMenu>
  </div>
</template>

<style lang="scss" scoped>
.sidebar-container {
  width: var(--sidebar-width) !important;
  height: calc(100vh - var(--topbar-height));
  position: fixed;
  top: var(--topbar-height);
  background-color: white;
  border-right: 1px solid rgb(233, 233, 233);
  z-index: 1001;
  overflow-y: auto;
  overflow-x: hidden;
  padding: 12px 20px;
  :deep(.el-menu--collapse) {
    .el-sub-menu > .el-sub-menu__title span,
    .el-sub-menu__icon-arrow {
      height: 0;
      width: 0;
      overflow: hidden;
      visibility: hidden;
      display: inline-block;
    }
  }
}
</style>
