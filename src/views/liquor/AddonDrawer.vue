<script setup>
import AppDrawer from "@/components/AppDrawer.vue";
import {reactive, ref} from "vue";
import {getAddonCategory} from "@/composable/enums";

const category = ref({})
getAddonCategory(category)
const categoryIds = Object.keys(category).map((value) => Number(value))

const props = defineProps({
  type: String,
})

const branchId = ref(0)

const initForm = {
  branch_id: null,
  category_id: null,
  stock_id: null,
  price: 1,
}

const form = reactive({ ...initForm })

const AddonDrawer = ref(null)
const AddonForm = ref(null)
function show(id=0) {
  if (props.type === "create") {
    Object.assign(form, initForm);
  } else if (props.type === "edit") {
    branchId.value = id
    // call api to get data
    const apiReturn = {
        id: 1,
        branch_id: 1,
        category_id: 1,
        stock_id: 1,
        price: 350,
    }
    Object.assign(form, apiReturn);
  }
  AddonDrawer.value.show()
}

defineExpose({show});

function handleConfirm() {
  AddonForm.value.validate((valid, fields) => {
    if (valid) {
      if (props.type === "create") {
        // call create api
      } else if (props.type === "edit") {
        // call edit api with {branchId}
      }
      AddonDrawer.value.close()
      console.log(form)
    } else {
      console.log('error submit!', fields)
    }
  })
}

function handleCancel() {
  if (props.type === "create") {
    Object.assign(form, initForm)
  }
  AddonDrawer.value.close()
}

const rules = reactive({
  branch_id: [
    { required: true, message: '請選擇分店', trigger: 'change' },
  ],
  category_id: [
    { required: true, message: '請選擇分類', trigger: 'change' },
  ],
  stock_id: [
    { required: true, message: '請選擇酒品', trigger: 'change' },
  ],
  price: [
    { required: true, message: '請輸入價格', trigger: 'blue' },
  ],
})
</script>

<template>
  <AppDrawer
      ref="AddonDrawer"
      :title="type === 'create' ? '新增項目' : '編輯項目'"
      @confirm="handleConfirm"
      @cancel="handleCancel"
  >
    <ElForm
        ref="AddonForm"
        :model="form"
        :rules="rules"
        require-asterisk-position="right"
        label-position="top"
        status-icon
    >
      <ElFormItem label="分店" required prop="branch_id">
        <ElSelect v-model.number="form.branch_id" placeholder="請選擇">
          <ElOption label="中華一店" :value="1" />
          <ElOption label="成功二店" :value="2" />
        </ElSelect>
      </ElFormItem>
      <ElFormItem label="分類" required prop="category_id">
        <ElSelect v-model.number="form.category_id" placeholder="請選擇">
          <ElOption v-for="key in categoryIds" :key="key" :label="category[key]" :value="key" />
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

<style scoped lang="scss">

</style>
