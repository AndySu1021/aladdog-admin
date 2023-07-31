<script setup>
import ControlPlane from "@/components/ControlPlane.vue";
import DataPlane from "@/components/DataPlane.vue";
import {Plus, Search} from "@element-plus/icons-vue";
import AppTable from "@/components/AppTable.vue";
import FilterItem from "@/components/FilterItem.vue";
import {h, reactive, ref} from "vue";
import {ElButton, ElMessage, ElMessageBox, ElTag} from "element-plus";
import AppPagination from "@/components/AppPagination.vue";
import RoleDrawer from "@/views/system/RoleDrawer.vue";

const tableColumn = [
  {
    key: 'id',
    title: '編號',
    dataKey: 'id',
    width: 80,
    align: 'center',
  },
  {
    key: 'name',
    title: '名稱',
    dataKey: 'name',
    width: 250,
    align: 'center',
  },
  {
    key: 'is_enabled',
    title: '狀態',
    dataKey: 'is_enabled',
    width: 120,
    align: 'center',
    cellRenderer: ({cellData: is_enabled}) => is_enabled === 1 ? h(ElTag, {type: 'success'}, () => '啟用') : h(ElTag, {type: 'danger'}, () => '停用'),
  },
]
const tableData = [
  {
    id: 1,
    name: '超級管理員',
    is_enabled: 1,
  },
  {
    id: 2,
    name: '分店主管',
    is_enabled: 0,
  },
  {
    id: 3,
    name: '分店主管',
    is_enabled: 0,
  },
  {
    id: 4,
    name: '分店主管',
    is_enabled: 0,
  },
  {
    id: 5,
    name: '分店主管',
    is_enabled: 0,
  },
  {
    id: 6,
    name: '分店主管',
    is_enabled: 0,
  },
  {
    id: 7,
    name: '分店主管',
    is_enabled: 0,
  },
  {
    id: 8,
    name: '分店主管',
    is_enabled: 0,
  },
]

const initSearchParams = {
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
      '是否刪除此角色？',
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

const EditRoleDrawer = ref(null)
function handleEdit(index, row) {
  EditRoleDrawer.value.show(row.id)
  console.log('edit', index, row.id)
}

const CreateRoleDrawer = ref(null)
function handleCreate() {
  CreateRoleDrawer.value.show()
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
      <FilterItem title="名稱">
        <ElInput v-model="searchParams.name" size="default" placeholder="請輸入" :suffix-icon="Search" />
      </FilterItem>
    </ControlPlane>
    <DataPlane>
      <template #btn-group>
        <ElButton type="primary" :icon="Plus" size="large" @click="handleCreate">新增</ElButton>
      </template>
      <template #main-data>
        <AppTable
            :data="tableData"
            :columns="tableColumn"
            :edit="handleEdit"
            :delete="handleDelete"
        />
      </template>
      <template #page-data>
        <AppPagination :data="pagination" @change="handleChange" />
      </template>
    </DataPlane>
    <RoleDrawer ref="CreateRoleDrawer" type="create" />
    <RoleDrawer ref="EditRoleDrawer" type="edit" />
  </div>
</template>

<style lang="scss" scoped>
</style>
