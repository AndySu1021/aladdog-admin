<script setup>
import ControlPlane from '@/components/ControlPlane.vue'
import DataPlane from '@/components/DataPlane.vue'
import { Plus, Search } from '@element-plus/icons-vue'
import AppTable from '@/components/AppTable.vue'
import FilterItem from '@/components/FilterItem.vue'
import { h, reactive, ref } from 'vue'
import { ElMessage, ElMessageBox, ElTag } from 'element-plus'
import AppPagination from '@/components/AppPagination.vue'
import AdminDrawer from '@/views/system/admin/AdminDrawer.vue'
import BranchSelect from '@/components/BranchSelect.vue'
import PermButton from '@/components/PermButton.vue'

const tableColumn = [
  {
    prop: 'id',
    label: '編號'
  },
  {
    prop: 'branch',
    label: '分店'
  },
  {
    prop: 'role',
    label: '角色'
  },
  {
    prop: 'name',
    label: '名稱'
  },
  {
    prop: 'sex',
    label: '性別',
    formatter: (data) => (data.sex === 1 ? '男' : '女')
  },
  {
    prop: 'mobile',
    label: '手機號'
  },
  {
    prop: 'is_enabled',
    label: '狀態',
    cellRender: (scope) =>
      scope.row.is_enabled === 1
        ? h(ElTag, { type: 'success' }, () => '啟用')
        : h(ElTag, { type: 'danger' }, () => '停用')
  }
]
const tableData = [
  {
    id: 1,
    branch: '中華一店',
    role: '超級管理員',
    name: 'Andy',
    sex: 1,
    mobile: '0912345678',
    is_enabled: 1
  },
  {
    id: 2,
    branch: '成功二店',
    role: '超級管理員',
    name: 'Andy',
    sex: 1,
    mobile: '0912345678',
    is_enabled: 1
  },
  {
    id: 3,
    branch: '信義三店',
    role: '超級管理員',
    name: 'Andy',
    sex: 1,
    mobile: '0912345678',
    is_enabled: 1
  },
  {
    id: 4,
    branch: '中華一店',
    role: '超級管理員',
    name: 'Andy',
    sex: 1,
    mobile: '0912345678',
    is_enabled: 1
  },
  {
    id: 5,
    branch: '中華一店',
    role: '超級管理員',
    name: 'Andy',
    sex: 1,
    mobile: '0912345678',
    is_enabled: 1
  },
  {
    id: 6,
    branch: '中華一店',
    role: '超級管理員',
    name: 'Andy',
    sex: 1,
    mobile: '0912345678',
    is_enabled: 1
  },
  {
    id: 7,
    branch: '中華一店',
    role: '超級管理員',
    name: 'Andy',
    sex: 1,
    mobile: '0912345678',
    is_enabled: 1
  },
  {
    id: 8,
    branch: '中華一店',
    role: '超級管理員',
    name: 'Andy',
    sex: 1,
    mobile: '0912345678',
    is_enabled: 1
  }
]

const initSearchParams = {
  branch_id: 0,
  name: ''
}

const searchParams = reactive({ ...initSearchParams })
function handleReset() {
  Object.assign(searchParams, initSearchParams)
}
function handleSearch() {
  console.log(searchParams)
}

function handleDelete(index, row) {
  ElMessageBox.confirm('是否刪除此管理員？', '刪除', {
    confirmButtonText: '確認',
    cancelButtonText: '取消',
    type: 'error',
    center: false,
    showClose: false
  })
    .then(() => {
      // call delete api
      ElMessage({
        type: 'success',
        message: '刪除成功'
      })
    })
    .catch(() => {})
  console.log('delete', index, row.id)
}

function handlePassword(idx, data) {
  console.log(idx, data)
  ElMessageBox.prompt('請輸入新密碼', '修改密碼', {
    confirmButtonText: '確認',
    cancelButtonText: '取消',
    inputPattern: /^[a-zA-Z0-9]{8,20}$/,
    inputErrorMessage: '密碼長度為 8 - 20 英文數字'
  })
    .then(() => {
      ElMessage({
        type: 'success',
        message: '修改成功'
      })
    })
    .catch(() => {
      ElMessage({
        type: 'info',
        message: '取消修改'
      })
    })
}

const EditAdminDrawer = ref(null)
function handleEdit(index, row) {
  EditAdminDrawer.value.show(row.id)
  console.log('edit', index, row.id)
}

const CreateAdminDrawer = ref(null)
function handleCreate() {
  CreateAdminDrawer.value.show()
}

const paginationParams = {
  page: 1,
  page_size: 10,
  total: 40
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
    <ControlPlane :reset="handleReset" :search="handleSearch">
      <FilterItem title="分店">
        <BranchSelect v-model.number="searchParams.branch_id" :show-all="true" />
      </FilterItem>
      <FilterItem title="名稱">
        <ElInput
          v-model="searchParams.name"
          size="default"
          placeholder="請輸入"
          :suffix-icon="Search"
        />
      </FilterItem>
    </ControlPlane>
    <DataPlane>
      <template #btn-group>
        <PermButton :icon="Plus" perm-key="System.Admin.Create" @click="handleCreate"
          >新增</PermButton
        >
      </template>
      <template #main-data>
        <AppTable
          :data="tableData"
          :columns="tableColumn"
          :on-password="handlePassword"
          password-key="System.Admin.Password"
          :on-edit="handleEdit"
          edit-key="System.Admin.Edit"
          :on-delete="handleDelete"
          delete-key="System.Admin.Delete"
        />
      </template>
      <template #page-data>
        <AppPagination :data="pagination" @change="handleChange" />
      </template>
    </DataPlane>
    <AdminDrawer ref="CreateAdminDrawer" type="create" />
    <AdminDrawer ref="EditAdminDrawer" type="edit" />
  </div>
</template>

<style lang="scss" scoped></style>
