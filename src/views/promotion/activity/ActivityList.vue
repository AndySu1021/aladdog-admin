<script setup>
import ControlPlane from '@/components/ControlPlane.vue'
import DataPlane from '@/components/DataPlane.vue'
import { Plus, Search } from '@element-plus/icons-vue'
import AppTable from '@/components/AppTable.vue'
import FilterItem from '@/components/FilterItem.vue'
import { h, reactive, ref } from 'vue'
import { ElMessage, ElMessageBox, ElTag } from 'element-plus'
import AppPagination from '@/components/AppPagination.vue'
import ActivityDrawer from '@/views/promotion/activity/ActivityDrawer.vue'
import { getActivityType } from '@/composable/enums'
import BranchSelect from '@/components/BranchSelect.vue'
import PermButton from '@/components/PermButton.vue'

const activityType = ref({})
getActivityType(activityType)

const tableColumn = [
  {
    prop: 'id',
    label: '編號',
    minWidth: 80
  },
  {
    prop: 'branch',
    label: '分店'
  },
  {
    prop: 'title',
    label: '標題',
    minWidth: 200
  },
  {
    prop: 'type',
    label: '類型',
    formatter: (row) => activityType.value[row.type]
  },
  {
    prop: 'start_time',
    label: '開始時間',
    minWidth: 200
  },
  {
    prop: 'end_time',
    label: '結束時間',
    minWidth: 200
  },
  {
    prop: 'headcount',
    label: '參與人數'
  },
  {
    prop: 'is_enabled',
    label: '狀態',
    minWidth: 120,
    cellRender: (scope) =>
      scope.row.is_enabled === 1
        ? h(ElTag, { type: 'success' }, () => '已上架')
        : h(ElTag, { type: 'danger' }, () => '下架中')
  }
]
const tableData = [
  {
    id: 1,
    branch: '中華一店',
    title: '8月滿額贈',
    type: 1,
    start_time: '2023-07-01 16:00:00',
    end_time: '2023-08-31 16:00:00',
    headcount: 50,
    is_enabled: 1
  },
  {
    id: 2,
    branch: '中華一店',
    title: '8月送shot',
    type: 2,
    start_time: '2023-07-01 16:00:00',
    end_time: '2023-08-31 16:00:00',
    headcount: 50,
    is_enabled: 2
  },
  {
    id: 3,
    branch: '中華一店',
    title: '8月滿額贈',
    type: 1,
    start_time: '2023-07-01 16:00:00',
    end_time: '2023-08-31 16:00:00',
    headcount: 50,
    is_enabled: 1
  },
  {
    id: 4,
    branch: '中華一店',
    title: '8月滿額贈',
    type: 1,
    start_time: '2023-07-01 16:00:00',
    end_time: '2023-08-31 16:00:00',
    headcount: 50,
    is_enabled: 1
  },
  {
    id: 5,
    branch: '中華一店',
    title: '8月滿額贈',
    type: 1,
    start_time: '2023-07-01 16:00:00',
    end_time: '2023-08-31 16:00:00',
    headcount: 50,
    is_enabled: 1
  },
  {
    id: 6,
    branch: '中華一店',
    title: '8月滿額贈',
    type: 1,
    start_time: '2023-07-01 16:00:00',
    end_time: '2023-08-31 16:00:00',
    headcount: 50,
    is_enabled: 1
  },
  {
    id: 7,
    branch: '中華一店',
    title: '8月滿額贈',
    type: 1,
    start_time: '2023-07-01 16:00:00',
    end_time: '2023-08-31 16:00:00',
    headcount: 50,
    is_enabled: 1
  },
  {
    id: 8,
    branch: '中華一店',
    title: '8月滿額贈',
    type: 1,
    start_time: '2023-07-01 16:00:00',
    end_time: '2023-08-31 16:00:00',
    headcount: 50,
    is_enabled: 1
  }
]

const initSearchParams = {
  branch_id: 0,
  type: 0,
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
  ElMessageBox.confirm('是否刪除此活動？', '刪除', {
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

const EditActivityDrawer = ref(null)
function handleEdit(index, row) {
  EditActivityDrawer.value.show(row.id)
  console.log('edit', index, row.id)
}

const CreateActivityDrawer = ref(null)
function handleCreate() {
  CreateActivityDrawer.value.show()
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
      <FilterItem title="類型">
        <ElSelect v-model.number="searchParams.type" placeholder="請選擇">
          <ElOption label="全部" :value="0" />
          <ElOption label="一般折扣" :value="1" />
          <ElOption label="一般贈送" :value="2" />
          <ElOption label="滿額折扣" :value="3" />
          <ElOption label="滿額贈送" :value="4" />
        </ElSelect>
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
        <PermButton :icon="Plus" perm-key="Promotion.Activity.Create" @click="handleCreate"
          >新增</PermButton
        >
      </template>
      <template #main-data>
        <AppTable
          :data="tableData"
          :columns="tableColumn"
          :on-edit="handleEdit"
          edit-key="Promotion.Activity.Edit"
          :on-delete="handleDelete"
          delete-key="Promotion.Activity.Delete"
        />
      </template>
      <template #page-data>
        <AppPagination :data="pagination" @change="handleChange" />
      </template>
    </DataPlane>
    <ActivityDrawer ref="CreateActivityDrawer" type="create" />
    <ActivityDrawer ref="EditActivityDrawer" type="edit" />
  </div>
</template>

<style lang="scss" scoped></style>
