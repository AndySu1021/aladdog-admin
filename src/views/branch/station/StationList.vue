<script setup>
import ControlPlane from '@/components/ControlPlane.vue'
import DataPlane from '@/components/DataPlane.vue'
import { Plus } from '@element-plus/icons-vue'
import AppTable from '@/components/AppTable.vue'
import FilterItem from '@/components/FilterItem.vue'
import { reactive, ref } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import AppPagination from '@/components/AppPagination.vue'
import StationDrawer from '@/views/branch/station/StationDrawer.vue'
import BranchSelect from '@/components/BranchSelect.vue'
import PermButton from '@/components/PermButton.vue'

const tableColumn = [
  {
    key: 'id',
    title: '編號',
    dataKey: 'id',
    width: 80,
    align: 'center'
  },
  {
    key: 'branch',
    title: '分店',
    dataKey: 'branch',
    width: 180,
    align: 'center'
  },
  {
    key: 'name',
    title: '名稱',
    dataKey: 'name',
    width: 150,
    align: 'center'
  }
]
const tableData = [
  {
    id: 1,
    branch: '中華一店',
    name: '主吧'
  },
  {
    id: 2,
    branch: '中華一店',
    name: '廚房'
  },
  {
    id: 3,
    branch: '中華一店',
    name: '廚房'
  },
  {
    id: 4,
    branch: '中華一店',
    name: '廚房'
  },
  {
    id: 5,
    branch: '中華一店',
    name: '廚房'
  },
  {
    id: 6,
    branch: '中華一店',
    name: '廚房'
  },
  {
    id: 7,
    branch: '中華一店',
    name: '廚房'
  },
  {
    id: 8,
    branch: '中華一店',
    name: '廚房'
  }
]

const initSearchParams = {
  branch_id: 0
}

const searchParams = reactive({ ...initSearchParams })
function handleReset() {
  Object.assign(searchParams, initSearchParams)
}
function handleSearch() {
  console.log(searchParams)
}

function handleDelete(index, row) {
  ElMessageBox.confirm('是否刪除此崗位？', '刪除', {
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

const EditStationDrawer = ref(null)
function handleEdit(index, row) {
  EditStationDrawer.value.show(row.id)
  console.log('edit', index, row.id)
}

const CreateStationDrawer = ref(null)
function handleCreate() {
  CreateStationDrawer.value.show()
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
    </ControlPlane>
    <DataPlane>
      <template #btn-group>
        <PermButton :icon="Plus" perm-key="Branch.Station.Create" @click="handleCreate"
          >新增</PermButton
        >
      </template>
      <template #main-data>
        <AppTable
          :data="tableData"
          :columns="tableColumn"
          :edit="handleEdit"
          edit-key="Branch.Station.Edit"
          :delete="handleDelete"
          delete-key="Branch.Station.Delete"
        />
      </template>
      <template #page-data>
        <AppPagination :data="pagination" @change="handleChange" />
      </template>
    </DataPlane>
    <StationDrawer ref="CreateStationDrawer" type="create" />
    <StationDrawer ref="EditStationDrawer" type="edit" />
  </div>
</template>

<style lang="scss" scoped></style>
