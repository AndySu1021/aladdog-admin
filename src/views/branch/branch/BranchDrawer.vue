<script setup>
import AppDrawer from '@/components/AppDrawer.vue'
import { reactive, ref } from 'vue'
import { getAddressData } from '@/composable/address.js'
import { useBranchStore } from '@/stores/branch'

const branchStore = useBranchStore()

const props = defineProps({
  type: String
})

const branchId = ref(0)

const initForm = {
  name: '',
  code: '',
  tax_id_number: '',
  city: '',
  district: '',
  address: '',
  start_time: '',
  end_time: '',
  zip_code: '',
  minimum_order: 0,
  support_shift_type: [],
  password: ''
}

const form = reactive({ ...initForm })

const BranchDrawer = ref(null)
const BranchForm = ref(null)
function show(id = 0) {
  if (props.type === 'create') {
    Object.assign(form, initForm)
  } else if (props.type === 'edit') {
    branchId.value = id
    // call api to get data
    const apiReturn = {
      id: 1,
      name: '中華一店',
      code: '123456',
      tax_id_number: '12345678',
      city: '台北市',
      district: '信義區',
      address: '大馬路50號',
      start_time: '20:00',
      end_time: '03:00',
      zip_code: '110',
      minimum_order: 300,
      support_shift_type: [1, 3]
    }
    Object.assign(form, apiReturn)
  }
  BranchDrawer.value.show()
}

defineExpose({ show })

function handleConfirm() {
  BranchForm.value.validate((valid, fields) => {
    if (valid) {
      if (props.type === 'create') {
        // call create api
      } else if (props.type === 'edit') {
        // call edit api with {branchId}
      }
      BranchDrawer.value.close()
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
  BranchDrawer.value.close()
}

const rules = reactive({
  name: [{ required: true, message: '請輸入名稱', trigger: 'blur' }],
  code: [{ required: true, message: '請輸入代號', trigger: 'blue' }],
  tax_id_number: [{ required: true, message: '請輸入統一編號', trigger: 'blue' }],
  address: [{ required: true, message: '請輸入地址', trigger: 'blue' }],
  start_time: [{ required: true, message: '請選擇開始時間', trigger: 'change' }],
  end_time: [{ required: true, message: '請選擇結束時間', trigger: 'change' }],
  minimum_order: [{ required: true, message: '請輸入低消', trigger: 'blue' }],
  password: [{ required: true, message: '請輸入密碼', trigger: 'blur' }]
})

const addressData = ref([])
getAddressData(addressData)

const cityId = ref(0)
function handleCity(val) {
  cityId.value = val.idx
  form.city = val.name
}
function handleDistrict(val) {
  form.district = val.name
  form.zip_code = addressData.value[cityId.value].districts[val.idx].zip_code
}
</script>

<template>
  <AppDrawer
    ref="BranchDrawer"
    :title="type === 'create' ? '新增分店' : '編輯分店'"
    :confirm="handleConfirm"
    :cancel="handleCancel"
  >
    <ElForm
      ref="BranchForm"
      :model="form"
      :rules="rules"
      require-asterisk-position="right"
      label-position="top"
      status-icon
    >
      <ElFormItem label="分店名稱" required prop="name">
        <ElInput v-model="form.name" />
      </ElFormItem>
      <ElFormItem label="分店代號" required prop="code">
        <ElInput
          v-model="form.code"
          :formatter="(value) => `${branchStore.getCodePrefix} - ${value}`"
          :parser="(value) => value.replace(new RegExp(branchStore.getCodePrefix + ' - ', 'g'), '')"
        />
      </ElFormItem>
      <ElFormItem label="班別" required prop="support_shift_type">
        <ElCheckboxGroup v-model="form.support_shift_type">
          <ElCheckbox :label="1">早班</ElCheckbox>
          <ElCheckbox :label="2">午班</ElCheckbox>
          <ElCheckbox :label="3">晚班</ElCheckbox>
        </ElCheckboxGroup>
      </ElFormItem>
      <ElFormItem label="統一編號" required prop="tax_id_number">
        <ElInput v-model="form.tax_id_number" />
      </ElFormItem>
      <ElFormItem label="地址" required prop="address">
        <ElSpace direction="vertical" alignment="normal">
          <ElRow :gutter="8" style="">
            <ElCol :sm="24" :md="12" :lg="8">
              <ElSelect
                v-model="form.city"
                value-key="name"
                placeholder="請選擇"
                @change="handleCity"
              >
                <ElOption
                  v-for="(city, idx) in addressData"
                  :key="idx"
                  :label="city.name"
                  :value="{ ...city, idx: idx }"
                />
              </ElSelect>
            </ElCol>
            <ElCol :sm="24" :md="12" :lg="8">
              <ElSelect
                v-model="form.district"
                value-key="name"
                placeholder="請選擇"
                @change="handleDistrict"
              >
                <ElOption
                  v-for="(district, idx) in addressData[cityId].districts"
                  :key="idx"
                  :label="district.name"
                  :value="{ ...district, idx: idx }"
                />
              </ElSelect>
            </ElCol>
            <ElCol :sm="24" :md="12" :lg="8">
              <ElTag v-if="form.zip_code === ''" type="info" size="large">郵遞區號 xxx</ElTag>
              <ElTag v-else type="info" size="large">郵遞區號 {{ form.zip_code }}</ElTag>
            </ElCol>
          </ElRow>
          <ElInput v-model="form.address" />
        </ElSpace>
      </ElFormItem>
      <ElFormItem label="營業時間" required>
        <ElRow>
          <ElCol :span="10">
            <ElFormItem prop="start_time">
              <ElTimePicker
                v-model="form.start_time"
                placeholder="開始時間"
                format="HH:mm"
                value-format="HH:mm"
              />
            </ElFormItem>
          </ElCol>
          <ElCol style="text-align: center" :span="4">
            <span>至</span>
          </ElCol>
          <ElCol :span="10">
            <ElFormItem prop="end_time">
              <ElTimePicker
                v-model="form.end_time"
                placeholder="結束時間"
                format="HH:mm"
                value-format="HH:mm"
              />
            </ElFormItem>
          </ElCol>
        </ElRow>
      </ElFormItem>
      <ElFormItem label="每人低消" required prop="minimum_order">
        <ElInput
          v-model.number="form.minimum_order"
          :formatter="(value) => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')"
          :parser="(value) => value.replace(/\$\s?|(,*)/g, '')"
          placeholder="請輸入"
        />
      </ElFormItem>
      <ElFormItem v-if="type === 'create'" label="密碼" required prop="password">
        <ElInput v-model="form.password" />
      </ElFormItem>
    </ElForm>
  </AppDrawer>
</template>

<style scoped lang="scss"></style>
