<script setup>
defineProps({
  title: String,
})
</script>

<template>
  <div class="filter-item">
    <span class="filter-item-title">{{title}}：</span>
    <slot />
  </div>
</template>

<style scoped lang="scss">
</style>
