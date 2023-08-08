<script setup>
import ControlPlane from '@/components/ControlPlane.vue'
import DataPlane from '@/components/DataPlane.vue'
import { Plus, Search } from '@element-plus/icons-vue'
import AppTable from '@/components/AppTable.vue'
import FilterItem from '@/components/FilterItem.vue'
import { reactive, ref } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import BranchDrawer from '@/views/branch/branch/BranchDrawer.vue'
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
    key: 'name',
    title: '名稱',
    dataKey: 'name',
    width: 150,
    align: 'center'
  },
  {
    key: 'code',
    title: '分店代號',
    dataKey: 'code',
    width: 150,
    align: 'center'
  },
  {
    key: 'tax_id_number',
    title: '統一編號',
    dataKey: 'tax_id_number',
    width: 150,
    align: 'center'
  },
  {
    key: 'address',
    title: '地址',
    dataKey: 'address',
    width: 250,
    align: 'center'
  },
  {
    key: 'time',
    title: '營業時間',
    dataKey: 'time',
    width: 250,
    align: 'center',
    cellRenderer: (data) => `${data.rowData.start_time} - ${data.rowData.end_time}`
  },
  {
    key: 'minimum_order',
    title: '每人低消',
    dataKey: 'minimum_order',
    width: 120,
    align: 'center',
    cellRenderer: ({ cellData: minimum_order }) =>
      new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'TWD',
        maximumFractionDigits: 0
      }).format(minimum_order)
  }
]
const tableData = [
  {
    id: 1,
    name: '中華一店',
    code: 'PX-112',
    tax_id_number: '53807129',
    address: '台北市大安區和平東路一段141巷7-2號',
    start_time: '19:00',
    end_time: '04:00',
    minimum_order: 450
  },
  {
    id: 2,
    name: '成功二店',
    code: 'PX-113',
    tax_id_number: '54386029',
    address: '台北市大安區仁愛路四段345巷4弄39號',
    start_time: '20:00',
    end_time: '03:00',
    minimum_order: 450
  },
  {
    id: 3,
    name: '西門三店',
    code: 'PX-114',
    tax_id_number: '86037452',
    address: '台北市大安區延吉街70巷5弄1號',
    start_time: '20:00',
    end_time: '03:00',
    minimum_order: 350
  },
  {
    id: 4,
    name: '信義四店',
    code: 'PX-115',
    tax_id_number: '18205364',
    address: '台北市大安區市民大道三段304號1樓',
    start_time: '19:00',
    end_time: '02:00',
    minimum_order: 400
  }
]

const initSearchParams = {
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
  ElMessageBox.confirm('是否刪除此間分店？', '刪除', {
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

const EditBranchDrawer = ref(null)
function handleEdit(index, row) {
  EditBranchDrawer.value.show(row.id)
  console.log('edit', index, row.id)
}

const CreateBranchDrawer = ref(null)
function handleCreate() {
  CreateBranchDrawer.value.show()
}
</script>

<template>
  <div>
    <ControlPlane :reset="handleReset" :search="handleSearch">
      <FilterItem title="分店名稱">
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
        <PermButton :icon="Plus" perm-key="Branch.List.Create" @click="handleCreate"
          >新增</PermButton
        >
      </template>
      <template #main-data>
        <AppTable
          :data="tableData"
          :columns="tableColumn"
          :password="handlePassword"
          password-key="Branch.List.Password"
          :edit="handleEdit"
          edit-key="Branch.List.Edit"
          :delete="handleDelete"
          delete-key="Branch.List.Delete"
        />
      </template>
    </DataPlane>
    <BranchDrawer ref="CreateBranchDrawer" type="create" />
    <BranchDrawer ref="EditBranchDrawer" type="edit" />
  </div>
</template>

<style lang="scss" scoped></style>
