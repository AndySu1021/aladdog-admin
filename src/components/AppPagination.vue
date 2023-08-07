<script setup>
import { reactive } from 'vue'

const props = defineProps({
  data: Object
})

const emits = defineEmits(['change'])

const paginationParams = {
  page: props.data.page,
  page_size: props.data.page_size,
  total: props.data.total
}
const pagination = reactive({ ...paginationParams })

function handleSizeChange(value) {
  pagination.page = 1
  pagination.page_size = value
  emits('change', pagination)
}
function handleCurrentChange(value) {
  pagination.page = value
  emits('change', pagination)
}
</script>

<template>
  <ElPagination
    :current-page="pagination.page"
    :page-size="pagination.page_size"
    :page-sizes="[10, 20, 50, 100]"
    layout="sizes, prev, pager, next, total"
    :total="pagination.total"
    @size-change="handleSizeChange"
    @current-change="handleCurrentChange"
  />
</template>

<style scoped lang="scss"></style>
