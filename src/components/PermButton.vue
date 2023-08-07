<script setup>
import {useAdminStore} from "@/stores/admin";

const store = useAdminStore()

defineProps({
  permKey: String,
  icon: {
    type: Object,
    default: null,
  },
  type: {
    type: String,
    default: 'primary',
  },
  size: {
    type: String,
    default: 'large',
  }
})

const emits = defineEmits(['click'])

function handleClick() {
  emits('click')
}
</script>

<template>
  <ElButton :type="type" :icon="icon" :size="size" @click="handleClick" :disabled="!store.checkPermission(permKey)">
    <slot />
  </ElButton>
</template>

<style scoped lang="scss">

</style>
