<script setup>
import { useAdminStore } from '@/stores/admin'
import { reactive, watch } from 'vue'
import { useBranchStore } from '@/stores/branch'

const branchStore = useBranchStore()

const props = defineProps({
  modelValue: Number,
  showAll: {
    type: Boolean,
    default: false
  },
  allTitle: {
    type: String,
    default: '全部'
  }
})

const emit = defineEmits(['update:modelValue'])

const adminStore = useAdminStore()

const form = reactive({ branch_id: props.modelValue })

watch(
  () => form.branch_id,
  (newValue) => {
    emit('update:modelValue', newValue)
  }
)

if (adminStore.getBranchId !== 0) {
  form.branch_id = adminStore.getBranchId
}
</script>

<template>
  <ElSelect
    v-model.number="form.branch_id"
    placeholder="請選擇"
    :disabled="adminStore.getBranchId !== 0"
  >
    <ElOption v-if="props.showAll" :label="allTitle" :value="0" />
    <ElOption
      v-for="(branch, idx) in branchStore.getBranches"
      :key="idx"
      :label="branch.name"
      :value="branch.id"
    />
  </ElSelect>
</template>

<style scoped lang="scss"></style>
