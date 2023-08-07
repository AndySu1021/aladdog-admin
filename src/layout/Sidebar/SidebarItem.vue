<script setup>
defineProps({
  item: Object,
  path: String
})
</script>

<template>
  <div class="sidebar-item-container">
    <ElMenuItem v-if="!item.children || item.children.length <= 1" :index="item.path">
      <ElIcon><Component :is="item.meta.icon" /></ElIcon>
      <template #title>{{ item.meta.title }}</template>
    </ElMenuItem>
    <ElSubMenu v-else :index="item.path">
      <template #title>
        <ElIcon><Component :is="item.meta.icon" /></ElIcon>
        <span>{{ item.meta.title }}</span>
      </template>
      <SidebarItem
        style="margin-left: -8px"
        v-for="child in item.children"
        :key="child.path"
        :item="child"
        :path="child.path"
        :is-top="false"
      />
    </ElSubMenu>
  </div>
</template>

<style lang="scss" scoped>
.sidebar-item-container {
  font-weight: 500;
  font-size: 16px;
  i {
    font-size: 20px;
  }
}
</style>
