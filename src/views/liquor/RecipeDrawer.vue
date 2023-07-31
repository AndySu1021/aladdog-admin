<script setup>
import AppDrawer from "@/components/AppDrawer.vue";
import {reactive, ref} from "vue";
import {Plus} from "@element-plus/icons-vue";
import AppUpload from "@/components/AppUpload.vue";
import BranchSelect from "@/components/BranchSelect.vue";

const props = defineProps({
  type: String,
})

const branchId = ref(0)

const initForm = {
  branch_id: null,
  image: '',
  name: '',
  category_id: null,
  price: 1,
  cost: 1,
  is_enabled: 1,
  stocks: [{
    stock_id: null,
    quantity: 0,
  }],
}

const form = reactive(JSON.parse(JSON.stringify(initForm)))

const RecipeDrawer = ref(null)
const RecipeForm = ref(null)
function show(id=0) {
  if (props.type === "create") {
    Object.assign(form, initForm);
  } else if (props.type === "edit") {
    branchId.value = id
    // call api to get data
    const apiReturn = {
        id: 1,
        branch_id: 1,
        name: 'Campari',
        capacity: 750,
        quantity: 3,
        cost: 1200,
    }
    Object.assign(form, apiReturn);
  }
  RecipeDrawer.value.show()
}

defineExpose({show});

function handleConfirm() {
  RecipeForm.value.validate((valid, fields) => {
    if (valid) {
      if (props.type === "create") {
        // call create api
      } else if (props.type === "edit") {
        // call edit api with {branchId}
      }
      RecipeDrawer.value.close()
      console.log(form)
    } else {
      console.log('error submit!', fields)
    }
  })
}

function handleCancel() {
  if (props.type === "create") {
    Object.assign(form, JSON.parse(JSON.stringify(initForm)))
  }
  RecipeDrawer.value.close()
}

const rules = reactive({
  branch_id: [
    { required: true, message: '請選擇分店', trigger: 'change' },
  ],
  name: [
    { required: true, message: '請輸入名稱', trigger: 'blue' },
  ],
  capacity: [
    { required: true, message: '請輸入單位容量', trigger: 'blue' },
  ],
  quantity: [
    { required: true, message: '請輸入數量', trigger: 'blue' },
  ],
  cost: [
    { required: true, message: '請輸入參考成本價', trigger: 'blue' },
  ],
})

function handleRecipeAdd() {
  form.stocks.push({
    stock_id: null,
    quantity: 0,
  })
}

const categories = ref([
  {
    id: 1,
    label: '琴酒',
  },
  {
    id: 2,
    label: '威士忌',
  }
])
</script>

<template>
  <AppDrawer
      ref="RecipeDrawer"
      :title="type === 'create' ? '新增酒譜' : '編輯酒譜'"
      @confirm="handleConfirm"
      @cancel="handleCancel"
  >
    <ElForm
        ref="RecipeForm"
        :model="form"
        :rules="rules"
        require-asterisk-position="right"
        label-position="top"
        status-icon
    >
      <ElFormItem v-if="adminStore.getBranchId === 0" label="分店" required prop="branch_id">
        <BranchSelect v-model.number="form.branch_id" />
      </ElFormItem>
      <ElFormItem label="圖片" prop="image">
        <AppUpload v-model="form.image" />
      </ElFormItem>
      <ElFormItem label="名稱" required prop="name">
        <ElInput v-model="form.name" />
      </ElFormItem>
      <ElFormItem label="分類" required prop="category_id">
        <ElSelect
            v-model.number="form.category_id"
            placeholder="請選擇"
        >
          <ElOption v-for="(item, idx) in categories" :key="idx" :label="item.label" :value="item.id" />
        </ElSelect>
      </ElFormItem>
      <ElDivider style="margin-top: 30px;">內容物</ElDivider>
      <template v-for="(stock, idx) in form.stocks" :key="idx">
        <ElFormItem :label="`酒品 ${idx+1}`" required>
          <ElRow :gutter="4">
            <ElCol :span="12">
              <ElSelect filterable v-model.number="stock.stock_id" placeholder="請選擇">
                <ElOption label="Campari" :value="1" />
                <ElOption label="Bowmore" :value="2" />
              </ElSelect>
            </ElCol>
            <ElCol :span="8">
              <ElInput v-model.number="stock.quantity" placeholder="請輸入數量">
                <template #append>ml</template>
              </ElInput>
            </ElCol>
          </ElRow>
        </ElFormItem>
      </template>
      <ElButton :icon="Plus" plain @click="handleRecipeAdd"/>
      <ElDivider />
      <ElFormItem label="參考成本價" required prop="cost">
        <ElInput
            v-model.number="form.cost"
            placeholder="請輸入單位容量"
            :formatter="(value) => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')"
            :parser="(value) => value.replace(/\$\s?|(,*)/g, '')"
            disabled
        />
      </ElFormItem>
      <ElFormItem label="售價" required prop="price">
        <ElInput
            v-model.number="form.price"
            placeholder="請輸入單位容量"
            :formatter="(value) => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')"
            :parser="(value) => value.replace(/\$\s?|(,*)/g, '')"
        />
      </ElFormItem>
      <ElFormItem label="狀態" required prop="is_enabled">
        <ElSwitch v-model="form.is_enabled" :active-value="1" :inactive-value="0" />
      </ElFormItem>
    </ElForm>
  </AppDrawer>
</template>

<style scoped lang="scss">

</style>
