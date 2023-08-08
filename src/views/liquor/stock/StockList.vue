<script setup>
import ControlPlane from '@/components/ControlPlane.vue'
import DataPlane from '@/components/DataPlane.vue'
import { Plus, Search, Top } from '@element-plus/icons-vue'
import AppTable from '@/components/AppTable.vue'
import FilterItem from '@/components/FilterItem.vue'
import { reactive, ref } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import AppPagination from '@/components/AppPagination.vue'
import StockDrawer from '@/views/liquor/stock/StockDrawer.vue'
import StockDialog from '@/views/liquor/stock/StockDialog.vue'
import BranchSelect from '@/components/BranchSelect.vue'
import PermButton from '@/components/PermButton.vue'
import { formatAmount } from '@/utils/formatter'

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
    prop: 'name',
    label: '名稱'
  },
  {
    prop: 'capacity',
    label: '單位容量',
    formatter: (data) => `${data.capacity} ml`
  },
  {
    prop: 'unit',
    label: '預估剩餘',
    formatter: (data) => `${Math.round((data.remaining_capacity / data.capacity) * 10) / 10} 瓶`
  },
  {
    prop: 'remaining_capacity',
    label: '預估剩餘容量',
    formatter: (data) => `${data.remaining_capacity} ml`
  },
  {
    prop: 'cost',
    label: '參考成本價',
    formatter: (data) => formatAmount(data.cost)
  }
]
const tableData = [
  {
    id: 1,
    branch: '中華一店',
    name: 'Campari',
    capacity: 750,
    remaining_capacity: 2358,
    cost: 1200
  },
  {
    id: 2,
    branch: '成功二店',
    name: 'Bowmore',
    capacity: 750,
    remaining_capacity: 3000,
    cost: 1200
  },
  {
    id: 3,
    branch: '信義三店',
    name: '紫羅蘭(Bitter Truth)',
    capacity: 750,
    remaining_capacity: 3000,
    cost: 1200
  },
  {
    id: 4,
    branch: '中華一店',
    name: '煙燻紅茶利口酒(卡騰)',
    capacity: 750,
    remaining_capacity: 3000,
    cost: 1200
  },
  {
    id: 5,
    branch: '中華一店',
    name: 'Johnny Walker Black Label',
    capacity: 750,
    remaining_capacity: 3000,
    cost: 1200
  },
  {
    id: 6,
    branch: '中華一店',
    name: 'Campari',
    capacity: 750,
    remaining_capacity: 3000,
    cost: 1200
  },
  {
    id: 7,
    branch: '中華一店',
    name: 'Campari',
    capacity: 750,
    remaining_capacity: 3000,
    cost: 1200
  },
  {
    id: 8,
    branch: '中華一店',
    name: 'Campari',
    capacity: 750,
    remaining_capacity: 3000,
    cost: 1200
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
  ElMessageBox.confirm('是否刪除此庫存？', '刪除', {
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

const EditStockDrawer = ref(null)
function handleEdit(index, row) {
  EditStockDrawer.value.show(row.id)
  console.log('edit', index, row.id)
}

const CreateStockDrawer = ref(null)
function handleCreate() {
  CreateStockDrawer.value.show()
}

const ReplenishStockDialog = ref(null)
function handleReplenish() {
  ReplenishStockDialog.value.show()
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
        <BranchSelect v-model="searchParams.branch_id" :show-all="true" />
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
        <PermButton :icon="Plus" perm-key="Liquor.Stock.Create" @click="handleCreate"
          >新增</PermButton
        >
        <PermButton :icon="Top" perm-key="Liquor.Stock.Replenish" @click="handleReplenish"
          >補貨</PermButton
        >
      </template>
      <template #main-data>
        <AppTable
          :data="tableData"
          :columns="tableColumn"
          :on-edit="handleEdit"
          :on-delete="handleDelete"
        />
      </template>
      <template #page-data>
        <AppPagination :data="pagination" @change="handleChange" />
      </template>
    </DataPlane>
    <StockDrawer ref="CreateStockDrawer" type="create" />
    <StockDrawer ref="EditStockDrawer" type="edit" />
    <StockDialog ref="ReplenishStockDialog" />
  </div>
</template>

<style lang="scss" scoped></style>
