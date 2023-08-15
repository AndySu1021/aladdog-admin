<script setup>
import {ref} from "vue";

defineProps({
  title: {
    type: String,
    default: '',
  },
  width: {
    type: String,
    default: '50%',
  },
  center: {
    type: Boolean,
    default: false,
  }
})

const isVisible = ref(false)

function show() {
  isVisible.value = true
}

defineExpose({show})
</script>

<template>
<ElDialog
    v-model="isVisible"
    :title="title"
    :width="width"
    :center="center"
    destroy-on-close
>
  <slot />
</ElDialog>
</template>

<style scoped lang="scss">

</style>
