<script setup>
import AppDrawer from '@/components/AppDrawer.vue'
import { reactive, ref } from 'vue'
import { getAddonCategory } from '@/composable/enums'
import BranchSelect from '@/components/BranchSelect.vue'

const category = ref({})
getAddonCategory(category)
const categoryIds = Object.keys(category.value).map((value) => Number(value))

const props = defineProps({
  type: String
})

const branchId = ref(0)

const initForm = {
  branch_id: null,
  category_id: null,
  stock_id: null,
  price: 1
}

const form = reactive({ ...initForm })

const ReplacementDrawer = ref(null)
const ReplacementForm = ref(null)
function show(id = 0) {
  if (props.type === 'create') {
    Object.assign(form, initForm)
  } else if (props.type === 'edit') {
    branchId.value = id
    // call api to get data
    const apiReturn = {
      id: 1,
      branch_id: 1,
      category_id: 1,
      stock_id: 1,
      price: 350
    }
    Object.assign(form, apiReturn)
  }
  ReplacementDrawer.value.show()
}

defineExpose({ show })

function handleConfirm() {
  ReplacementForm.value.validate((valid, fields) => {
    if (valid) {
      if (props.type === 'create') {
        // call create api
      } else if (props.type === 'edit') {
        // call edit api with {branchId}
      }
      ReplacementDrawer.value.close()
      console.log(form)
    } else {
      console.log('error submit!', fields)
    }
  })
}

function handleCancel() {
  if (props.type === 'create') {
    Object.assign(form, initForm)
  }
  ReplacementDrawer.value.close()
}

const rules = reactive({
  branch_id: [{ required: true, message: '請選擇分店', trigger: 'change' }],
  category_id: [{ required: true, message: '請選擇分類', trigger: 'change' }],
  stock_id: [{ required: true, message: '請選擇酒品', trigger: 'change' }],
  price: [{ required: true, message: '請輸入價格', trigger: 'blue' }]
})
</script>

<template>
  <AppDrawer
    ref="ReplacementDrawer"
    :title="type === 'create' ? '新增項目' : '編輯項目'"
    :confirm="handleConfirm"
    :cancel="handleCancel"
  >
    <ElForm
      ref="ReplacementForm"
      :model="form"
      :rules="rules"
      require-asterisk-position="right"
      label-position="top"
      status-icon
    >
      <ElFormItem label="分店" required prop="branch_id">
        <BranchSelect v-model.number="form.branch_id" />
      </ElFormItem>
      <ElFormItem label="分類" required prop="category_id">
        <ElSelect v-model.number="form.category_id" placeholder="請選擇">
          <ElOption
            v-for="(key, idx) in categoryIds"
            :key="idx"
            :label="category[key]"
            :value="key"
          />
        </ElSelect>
      </ElFormItem>
      <ElFormItem label="酒品" required prop="stock_id">
        <ElSelect filterable v-model.number="form.stock_id" placeholder="請選擇">
          <ElOption label="Campari" :value="1" />
          <ElOption label="山崎18" :value="2" />
        </ElSelect>
      </ElFormItem>
      <ElFormItem label="價格" required prop="price">
        <ElInput
          v-model.number="form.price"
          placeholder="請輸入價格"
          :formatter="(value) => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')"
          :parser="(value) => value.replace(/\$\s?|(,*)/g, '')"
        />
      </ElFormItem>
    </ElForm>
  </AppDrawer>
</template>

<style scoped lang="scss"></style>
