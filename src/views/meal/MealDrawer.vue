<script setup>
import AppDrawer from '@/components/AppDrawer.vue'
import { reactive, ref } from 'vue'
import { Plus } from '@element-plus/icons-vue'
import AppUpload from '@/components/AppUpload.vue'
import BranchSelect from '@/components/BranchSelect.vue'

const props = defineProps({
  type: String
})

const branchId = ref(0)

const initForm = {
  branch_id: null,
  image: '',
  name: '',
  category_path: [],
  specs: [
    {
      spec: '',
      price: 1
    }
  ],
  is_enabled: 1,
  can_free: 0,
}

const form = reactive(JSON.parse(JSON.stringify(initForm)))

const MealDrawer = ref(null)
const MealForm = ref(null)
function show(id = 0) {
  if (props.type === 'create') {
    Object.assign(form, initForm)
  } else if (props.type === 'edit') {
    branchId.value = id
    // call api to get data
    const apiReturn = {
      id: 1,
      branch_id: 1,
      image:
        'https://res.cloudinary.com/enotria/image/upload/ar_16:9,c_fill,dpr_auto,w_auto/v1615282620/White_Lady_Banner_effeaf0fc0.jpg',
      name: '牛小牌',
      category_path: [1, 3],
      specs: [
        {
          spec: '大',
          price: 100
        },
        {
          spec: '小',
          price: 60
        }
      ],
      is_enabled: 1,
      can_free: 0,
    }
    Object.assign(form, apiReturn)
  }
  MealDrawer.value.show()
}

defineExpose({ show })

function handleConfirm() {
  MealForm.value.validate((valid, fields) => {
    if (valid) {
      if (props.type === 'create') {
        // call create api
      } else if (props.type === 'edit') {
        // call edit api with {branchId}
      }
      MealDrawer.value.close()
      console.log(form)
    } else {
      console.log('error submit!', fields)
    }
  })
}

function handleCancel() {
  if (props.type === 'create') {
    Object.assign(form, JSON.parse(JSON.stringify(initForm)))
  }
  MealDrawer.value.close()
}

const rules = reactive({
  branch_id: [{ required: true, message: '請選擇分店', trigger: 'change' }],
  name: [{ required: true, message: '請輸入名稱', trigger: 'blue' }],
  category_path: [{ required: true, message: '請選擇分類', trigger: 'change' }],
  capacity: [{ required: true, message: '請輸入單位容量', trigger: 'blue' }],
  quantity: [{ required: true, message: '請輸入數量', trigger: 'blue' }],
  cost: [{ required: true, message: '請輸入參考成本價', trigger: 'blue' }]
})

function handleSpecAdd() {
  form.specs.push({
    spec: '',
    price: 1
  })
}

const options = [
  {
    value: 1,
    label: '主食',
    children: [
      {
        value: 2,
        label: '排餐'
      },
      {
        value: 3,
        label: '套餐'
      },
      {
        value: 4,
        label: '單點'
      }
    ]
  },
  {
    value: 5,
    label: '甜點',
    children: [
      {
        value: 6,
        label: '蛋糕'
      },
      {
        value: 7,
        label: '飲品'
      }
    ]
  },
  {
    value: 8,
    label: '酒水'
  }
]
</script>

<template>
  <AppDrawer
    ref="MealDrawer"
    :title="type === 'create' ? '新增商品' : '編輯商品'"
    :confirm="handleConfirm"
    :cancel="handleCancel"
  >
    <ElForm
      ref="MealForm"
      :model="form"
      :rules="rules"
      require-asterisk-position="right"
      label-position="top"
      status-icon
    >
      <ElFormItem label="分店" required prop="branch_id">
        <BranchSelect v-model.number="form.branch_id" />
      </ElFormItem>
      <ElFormItem label="名稱" required prop="name">
        <ElInput v-model="form.name" />
      </ElFormItem>
      <ElFormItem label="圖片" prop="image">
        <AppUpload v-model="form.image" />
      </ElFormItem>
      <ElFormItem label="分類" required prop="category_path">
        <ElCascader v-model="form.category_path" :options="options" placeholder="請選擇" />
      </ElFormItem>
      <ElDivider style="margin-top: 30px">規格</ElDivider>
      <template v-for="(spec, idx) in form.specs" :key="idx">
        <ElFormItem :label="`規格 ${idx + 1}`" required>
          <ElRow :gutter="4">
            <ElCol :span="12">
              <ElInput v-model="spec.spec" placeholder="請輸入規格" />
            </ElCol>
            <ElCol :span="12">
              <ElInput
                v-model.number="spec.price"
                placeholder="請輸入價格"
                :formatter="(value) => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')"
                :parser="(value) => value.replace(/\$\s?|(,*)/g, '')"
              />
            </ElCol>
          </ElRow>
        </ElFormItem>
      </template>
      <ElButton :icon="Plus" plain @click="handleSpecAdd" />
      <ElDivider />
      <ElFormItem label="狀態" required prop="is_enabled">
        <ElSwitch v-model="form.is_enabled" :active-value="1" :inactive-value="0" />
      </ElFormItem>
      <ElFormItem label="可招待" required prop="can_free">
        <ElSwitch v-model="form.can_free" :active-value="1" :inactive-value="0" />
      </ElFormItem>
    </ElForm>
  </AppDrawer>
</template>

<style scoped lang="scss"></style>
