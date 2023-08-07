<script setup>
import { Delete, Plus } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'
import { ref } from 'vue'

const props = defineProps({
  modelValue: String,
  multiple: {
    type: Boolean,
    default: false
  },
  limit: {
    type: Number,
    default: 1
  }
})
const emit = defineEmits(['update:modelValue'])

const hideUploadBtn = ref(false)
const Upload = ref(null)
const handleRemove = (file) => {
  Upload.value.handleRemove(file)
  console.log(file)
}

function beforeAvatarUpload(rawFile) {
  console.log(rawFile.type)
  if (rawFile.type !== 'image/jpeg' && rawFile.type !== 'image/png') {
    ElMessage.error('圖片格式錯誤')
    return false
  } else if (rawFile.size / 1024 / 1024 > 2) {
    ElMessage.error('圖片大小超過 2MB')
    return false
  }
  return true
}

function handleAvatarSuccess(response) {
  console.log(response)
  emit('update:modelValue', response.name)
}

function handleEditChange(file, files) {
  emit('update:modelValue', 'https://a.b.c/ddd')
  hideUploadBtn.value = files.length >= props.limit
}
</script>

<template>
  <ElUpload
    ref="Upload"
    action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
    list-type="picture-card"
    :multiple="multiple"
    accept="jpg"
    :before-upload="beforeAvatarUpload"
    :on-success="handleAvatarSuccess"
    :limit="limit"
    :auto-upload="false"
    :class="{ hide: hideUploadBtn }"
    :on-change="handleEditChange"
  >
    <ElIcon><Plus /></ElIcon>
    <template #tip>
      <div style="font-size: 12px; color: #909090">* 僅限 jpg 和 png，大小限制為 2MB</div>
    </template>
    <template #file="{ file }">
      <div>
        <img class="el-upload-list__item-thumbnail" :src="file.url" alt="" />
        <span class="el-upload-list__item-actions">
          <span class="el-upload-list__item-delete" @click="handleRemove(file)">
            <ElIcon><Delete /></ElIcon>
          </span>
        </span>
      </div>
    </template>
  </ElUpload>
</template>

<style scoped lang="scss">
.hide {
  :deep(.el-upload--picture-card) {
    display: none;
  }
}
</style>
