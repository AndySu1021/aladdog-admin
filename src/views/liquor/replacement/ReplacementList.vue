<script setup>
import ControlPlane from "@/components/ControlPlane.vue";
import DataPlane from "@/components/DataPlane.vue";
import {Plus, Search} from "@element-plus/icons-vue";
import AppTable from "@/components/AppTable.vue";
import FilterItem from "@/components/FilterItem.vue";
import {reactive, ref} from "vue";
import {ElMessage, ElMessageBox} from "element-plus";
import AppPagination from "@/components/AppPagination.vue";
import ReplacementDrawer from "@/views/liquor/replacement/ReplacementDrawer.vue";
import {getAddonCategory} from "@/composable/enums";
import BranchSelect from "@/components/BranchSelect.vue";
import PermButton from "@/components/PermButton.vue";

const category = ref({})
getAddonCategory(category)

const tableColumn = [
  {
    key: 'id',
    title: '編號',
    dataKey: 'id',
    width: 80,
    align: 'center',
  },
  {
    key: 'branch',
    title: '分店',
    dataKey: 'branch',
    width: 150,
    align: 'center',
  },
  {
    key: 'category_id',
    title: '分類',
    dataKey: 'category_id',
    width: 120,
    align: 'center',
    cellRenderer: ({cellData: category_id}) => category.value[category_id],
  },
  {
    key: 'liquor',
    title: '酒品',
    dataKey: 'liquor',
    width: 250,
    align: 'center',
  },
  {
    key: 'price',
    title: '價格',
    dataKey: 'price',
    width: 120,
    align: 'center',
    cellRenderer: ({cellData: price}) => new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'TWD',
      maximumFractionDigits: 0
    }).format(price)
  },
]
const tableData = [
  {
    id: 1,
    branch: '中華一店',
    category_id: 1,
    liquor: '山崎18',
    price: 350,
  },
  {
    id: 2,
    branch: '成功二店',
    category_id: 1,
    liquor: '山崎18',
    price: 350,
  },
  {
    id: 3,
    branch: '信義三店',
    category_id: 1,
    liquor: '山崎18',
    price: 350,
  },
  {
    id: 4,
    branch: '中華一店',
    category_id: 1,
    liquor: '山崎18',
    price: 350,
  },
  {
    id: 5,
    branch: '中華一店',
    category_id: 1,
    liquor: '山崎18',
    price: 350,
  },
  {
    id: 6,
    branch: '中華一店',
    category_id: 1,
    liquor: '山崎18',
    price: 350,
  },
  {
    id: 7,
    branch: '中華一店',
    category_id: 1,
    liquor: '山崎18',
    price: 350,
  },
  {
    id: 8,
    branch: '中華一店',
    category_id: 1,
    liquor: '山崎18',
    price: 350,
  },
]

const initSearchParams = {
  branch_id: 0,
  name: '',
}

const searchParams = reactive({ ...initSearchParams })
function handleReset() {
  Object.assign(searchParams, initSearchParams)
}
function handleSearch() {
  console.log(searchParams)
}

function handleDelete(index, row) {
  ElMessageBox.confirm(
      '是否刪除此加購項目？',
      '刪除',
      {
        confirmButtonText: '確認',
        cancelButtonText: '取消',
        type: 'error',
        center: false,
        showClose: false,
      }
  ).then(() => {
    // call delete api
    ElMessage({
      type: 'success',
      message: '刪除成功',
    })
  }).catch(() => {})
  console.log('delete', index, row.id)
}

const EditReplacementDrawer = ref(null)
function handleEdit(index, row) {
  EditReplacementDrawer.value.show(row.id)
  console.log('edit', index, row.id)
}

const CreateReplacementDrawer = ref(null)
function handleCreate() {
  CreateReplacementDrawer.value.show()
}

const paginationParams = {
  page: 1,
  page_size: 10,
  total: 40,
}
const pagination = reactive({ ...paginationParams })
function handleChange(value) {
  Object.assign(pagination, value)
  // call api to get new data
  console.log(value)
}
</script>

<template>
  <div class="dashboard-container">
    <ControlPlane
        :reset="handleReset"
        :search="handleSearch"
    >
      <FilterItem title="分店">
        <BranchSelect v-model="searchParams.branch_id" :show-all="true" />
      </FilterItem>
      <FilterItem title="類型">
        <ElSelect v-model.number="searchParams.category_id">
          <ElOption label="全部" :value="0" />
          <ElOption label="琴酒" :value="1" />
          <ElOption label="伏特加" :value="2" />
          <ElOption label="威士忌" :value="3" />
          <ElOption label="龍舌蘭" :value="4" />
          <ElOption label="白蘭地" :value="5" />
          <ElOption label="蘭姆酒" :value="6" />
          <ElOption label="葡萄酒" :value="7" />
          <ElOption label="其他" :value="8" />
        </ElSelect>
      </FilterItem>
      <FilterItem title="酒品名稱">
        <ElInput v-model="searchParams.name" size="default" placeholder="請輸入" :suffix-icon="Search" />
      </FilterItem>
    </ControlPlane>
    <DataPlane>
      <template #btn-group>
        <PermButton :icon="Plus" perm-key="Liquor.Replacement.Create" @click="handleCreate">新增</PermButton>
      </template>
      <template #main-data>
        <AppTable
            :data="tableData"
            :columns="tableColumn"
            :edit="handleEdit"
            edit-key="Liquor.Replacement.Edit"
            :delete="handleDelete"
            delete-key="Liquor.Replacement.Delete"
        />
      </template>
      <template #page-data>
        <AppPagination :data="pagination" @change="handleChange" />
      </template>
    </DataPlane>
    <ReplacementDrawer ref="CreateReplacementDrawer" type="create" />
    <ReplacementDrawer ref="EditReplacementDrawer" type="edit" />
  </div>
</template>

<style lang="scss" scoped>
</style>
