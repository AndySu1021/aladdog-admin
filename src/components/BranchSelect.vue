<script setup>
import {useAdminStore} from "@/stores/admin";
import {onMounted, reactive, watch} from "vue";

const props = defineProps({
  modelValue: Number,
  showAll: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits(['update:modelValue']);

const adminStore = useAdminStore()

const form = reactive({branch_id: null})

watch(
    () => form.branch_id,
    (newValue) => {
      emit('update:modelValue', newValue)
    }
)

onMounted(() => {
  console.log("call api!!!")
  if (props.showAll) {
    form.branch_id = adminStore.getBranchId
  }
  // emit('update:modelValue', adminStore.getBranchId)
})
</script>

<template>
  <ElSelect v-model.number="form.branch_id" placeholder="請選擇" :disabled="adminStore.getBranchId !== 0">
    <ElOption v-if="props.showAll" label="全部" :value="0"/>
    <ElOption label="中華一店" :value="1"/>
    <ElOption label="成功二店" :value="2"/>
  </ElSelect>
</template>

<style scoped lang="scss">

</style>
