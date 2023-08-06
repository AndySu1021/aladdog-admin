<script setup>
import AppDrawer from "@/components/AppDrawer.vue";
import {reactive, ref} from "vue";
import BranchSelect from "@/components/BranchSelect.vue";
import {getActivityType} from "@/composable/enums";

const props = defineProps({
  type: String,
})

const activityType = ref({})
getActivityType(activityType)

const branchId = ref(0)

const initForm = {
  branch_id: null,
  title: '',
  type: 1,
  date_range: [],
  is_enabled: 1,
  condition: {
    target_amount: 0,
    discount_type: 1,
    discount_amount: 0,
    freebie_type: 1,
    freebie_id: null,
    quantity: 0,
  },
}

const form = reactive(JSON.parse(JSON.stringify(initForm)))

const ActivityDrawer = ref(null)
const ActivityForm = ref(null)
function show(id=0) {
  if (props.type === "create") {
    Object.assign(form, initForm);
  } else if (props.type === "edit") {
    branchId.value = id
    // call api to get data
    const apiReturn = {
      id: 1,
      branch_id: 1,
      title: '8月滿額贈',
      type: 1,
      date_range: ['2023-07-01', '2023-08-31'],
      is_enabled: 1,
      condition: {
        target_amount: 0,
        discount_type: 1,
        discount_amount: 500,
        freebie_type: 1,
        freebie_id: null,
        quantity: 0,
      },
    }
    Object.assign(form, apiReturn);
  }
  ActivityDrawer.value.show()
}

defineExpose({show});

function handleConfirm() {
  ActivityForm.value.validate((valid, fields) => {
    if (valid) {
      if (props.type === "create") {
        // call create api
      } else if (props.type === "edit") {
        // call edit api with {branchId}
      }
      ActivityDrawer.value.close()
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
  ActivityDrawer.value.close()
}

const rules = reactive({
  branch_id: [
    { required: true, message: '請選擇分店', trigger: 'change' },
  ],
  title: [
    { required: true, message: '請輸入標題', trigger: 'blue' },
  ],
  type: [
    { required: true, message: '請選擇類型', trigger: 'change' },
  ],
  date_range: [
    { required: true, message: '請選擇日期', trigger: 'change' },
  ],
})
</script>

<template>
  <AppDrawer
      ref="ActivityDrawer"
      :title="type === 'create' ? '新增活動' : '編輯活動'"
      :confirm="handleConfirm"
      :cancel="handleCancel"
  >
    <ElForm
        ref="ActivityForm"
        :model="form"
        :rules="rules"
        require-asterisk-position="right"
        label-position="top"
        status-icon
    >
      <ElFormItem label="分店" required prop="branch_id">
        <BranchSelect v-model.number="form.branch_id" />
      </ElFormItem>
      <ElFormItem label="標題" required prop="title">
        <ElInput v-model="form.title" />
      </ElFormItem>
      <ElFormItem label="類型" prop="type">
        <ElSelect v-model.number="form.type" placeholder="請選擇">
          <ElOption label="一般折扣" :value="1" />
          <ElOption label="一般贈送" :value="2" />
          <ElOption label="滿額折扣" :value="3" />
          <ElOption label="滿額贈送" :value="4" />
        </ElSelect>
      </ElFormItem>
      <ElFormItem label="日期" required prop="date_range">
        <ElDatePicker
            v-model="form.date_range"
            type="daterange"
            start-placeholder="開始日期"
            end-placeholder="結束日期"
            format="YYYY-MM-DD"
            value-format="YYYY-MM-DD"
        />
      </ElFormItem>
      <ElFormItem label="狀態" required prop="is_enabled">
        <ElSwitch v-model="form.is_enabled" :active-value="1" :inactive-value="0" />
      </ElFormItem>
      <ElDivider>條件</ElDivider>
      <ElFormItem v-if="form.type === 3 || form.type === 4" label="目標金額" required prop="condition.target_amount">
        <ElInput
            v-model.number="form.condition.target_amount"
            :formatter="(value) => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')"
            :parser="(value) => value.replace(/\$\s?|(,*)/g, '')"
            placeholder="請輸入"
        />
      </ElFormItem>
      <ElFormItem v-if="form.type === 1 || form.type === 3" label="折扣類型" required prop="condition.discount_type">
        <ElRadioGroup v-model="form.condition.discount_type">
          <ElRadio :label="1" size="large">固定</ElRadio>
          <ElRadio :label="2" size="large">比例</ElRadio>
        </ElRadioGroup>
      </ElFormItem>
      <ElFormItem v-if="form.type === 1 || form.type === 3" label="折扣金額" required prop="condition.discount_amount">
        <ElInput
            v-model.number="form.condition.discount_amount"
            :formatter="(value) => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')"
            :parser="(value) => value.replace(/\$\s?|(,*)/g, '')"
            placeholder="請輸入"
        />
      </ElFormItem>
      <ElFormItem v-if="form.type === 2 || form.type === 4" label="贈品類型" required prop="condition.freebie_type">
        <ElRadioGroup v-model="form.condition.freebie_type">
          <ElRadio :label="1" size="large">酒品</ElRadio>
          <ElRadio :label="2" size="large">餐點</ElRadio>
        </ElRadioGroup>
      </ElFormItem>
      <ElFormItem v-if="form.type === 2 || form.type === 4" label="贈品" required prop="condition.freebie_id">
        <ElSelect v-model.number="form.freebie_id" placeholder="請選擇">
          <ElOption v-for="(value, key) in activityType" :key="key" :label="value" :value="key" />
        </ElSelect>
      </ElFormItem>
      <ElFormItem v-if="form.type === 2 || form.type === 4" label="數量" required prop="condition.quantity">
        <ElInputNumber
            v-model.number="form.condition.quantity"
            :min="0"
        />
      </ElFormItem>
    </ElForm>
  </AppDrawer>
</template>

<style scoped lang="scss">

</style>
