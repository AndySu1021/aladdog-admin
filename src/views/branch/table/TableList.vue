<script setup>
import ControlPlane from '@/components/ControlPlane.vue'
import DataPlane from '@/components/DataPlane.vue'
import { Plus } from '@element-plus/icons-vue'
import AppTable from '@/components/AppTable.vue'
import FilterItem from '@/components/FilterItem.vue'
import { reactive, ref } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import AppPagination from '@/components/AppPagination.vue'
import TableDrawer from '@/views/branch/table/TableDrawer.vue'
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
    prop: 'floor',
    label: '樓層',
    formatter: (data) => (data.floor < 0 ? `B ${-1 * data.floor}` : `${data.floor} F`)
  },
  {
    prop: 'table_no',
    label: '桌號'
  },
  {
    prop: 'capacity',
    label: '容納人數',
    formatter: (data) => `${data.capacity} 人`
  }
]
const tableData = [
  {
    id: 1,
    branch: '中華一店',
    floor: -1,
    table_no: 'A1',
    capacity: 5
  },
  {
    id: 2,
    branch: '成功二店',
    floor: 1,
    table_no: 'A8',
    capacity: 5
  },
  {
    id: 3,
    branch: '信義三店',
    floor: 2,
    table_no: 'C22',
    capacity: 5
  },
  {
    id: 4,
    branch: '中華一店',
    floor: 3,
    table_no: 'D5',
    capacity: 5
  },
  {
    id: 5,
    branch: '中華一店',
    floor: 4,
    table_no: 'D5',
    capacity: 5
  },
  {
    id: 6,
    branch: '中華一店',
    floor: 5,
    table_no: 'D5',
    capacity: 5
  },
  {
    id: 7,
    branch: '中華一店',
    floor: 6,
    table_no: 'D5',
    capacity: 5
  },
  {
    id: 8,
    branch: '中華一店',
    floor: 7,
    table_no: 'D5',
    capacity: 5
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
  ElMessageBox.confirm('是否刪除此桌位？', '刪除', {
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

const EditTableDrawer = ref(null)
function handleEdit(index, row) {
  EditTableDrawer.value.show(row.id)
  console.log('edit', index, row.id)
}

const CreateTableDrawer = ref(null)
function handleCreate() {
  CreateTableDrawer.value.show()
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
        <PermButton :icon="Plus" perm-key="Branch.Table.Create" @click="handleCreate"
          >新增</PermButton
        >
      </template>
      <template #main-data>
        <AppTable
          :data="tableData"
          :columns="tableColumn"
          :on-edit="handleEdit"
          edit-key="Branch.Table.Edit"
          :on-delete="handleDelete"
          delete-key="Branch.Table.Delete"
        />
      </template>
      <template #page-data>
        <AppPagination :data="pagination" @change="handleChange" />
      </template>
    </DataPlane>
    <TableDrawer ref="CreateTableDrawer" type="create" />
    <TableDrawer ref="EditTableDrawer" type="edit" />
  </div>
</template>

<style lang="scss" scoped></style>
