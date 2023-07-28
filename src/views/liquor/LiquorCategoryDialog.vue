<script setup>
import {Plus} from "@element-plus/icons-vue";
import {reactive, ref} from "vue";

const isShow = ref(false)
function show() {
  isShow.value = true
}

defineExpose({show})

const initForm = {
  label: '',
}

const form = reactive({ ...initForm })

const categories = ref([
  {
    id: 1,
    label: '調整',
  },
  {
    id: 2,
    label: '琴酒',
  },
  {
    id: 3,
    label: '威士忌',
  },
  {
    id: 4,
    label: '龍舌蘭',
  },
  {
    id: 5,
    label: '經典',
  },
])

function handleAdd() {
  categories.value.push({
    id: 3,
    label: form.label,
  })
  // call add api
  console.log(form)
  Object.assign(form, initForm)
}

function handleClose(idx) {
  categories.value.splice(idx, 1)
  console.log(idx)
}
</script>

<template>
  <ElDialog
      v-model="isShow"
      title="管理分類"
      width="35%"
      :close-on-click-modal="false"
      :destroy-on-close="true"
  >
    <div style="margin-bottom: 16px;">
      <ElInput style="width: 50%;margin-right: 8px;" v-model="form.label" placeholder="請輸入分類" />
      <ElButton type="primary" :icon="Plus" @click="handleAdd">添加</ElButton>
    </div>
    <div style="margin: 32px 0 16px;font-size: 16px;font-weight: 500;">當前分類</div>
    <ElSpace wrap>
      <ElTag
          style="margin-right: 8px;"
          v-for="(category, idx) in categories"
          :key="idx"
          type="warning"
          closable
          effect="dark"
          size="large"
          @close="handleClose(idx)"
      >
        {{ category.label}}
      </ElTag>
    </ElSpace>
  </ElDialog>
</template>

<style scoped lang="scss">

</style>
