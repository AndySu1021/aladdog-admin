<script setup>
import ControlPlane from "@/components/ControlPlane.vue";
import DataPlane from "@/components/DataPlane.vue";
import {Plus, Search} from "@element-plus/icons-vue";
import AppTable from "@/components/AppTable.vue";
import FilterItem from "@/components/FilterItem.vue";
import {reactive, ref} from "vue";
import {ElButton, ElMessage, ElMessageBox} from "element-plus";
import StaffDrawer from "@/views/staff/StaffDrawer.vue";
import AppPagination from "@/components/AppPagination.vue";

const tableColumn = [
  {
    key: 'id',
    title: '編號',
    dataKey: 'id',
    width: 100,
    align: 'center',
  },
  {
    key: 'branch',
    title: '分店',
    dataKey: 'branch',
    width: 180,
    align: 'center',
  },
  {
    key: 'name',
    title: '姓名',
    dataKey: 'name',
    width: 180,
    align: 'center',
  },
  {
    key: 'sex',
    title: '性別',
    dataKey: 'sex',
    width: 80,
    align: 'center',
    cellRenderer: ({ cellData: sex }) => sex === 1 ? '男' : '女',
  },
  {
    key: 'mobile',
    title: '手機號',
    dataKey: 'mobile',
    width: 180,
    align: 'center',
  },
  {
    key: 'staff_no',
    title: '員工編號',
    dataKey: 'staff_no',
    width: 180,
    align: 'center',
  },
]
const tableData = [
  {
    id: 1,
    branch: '成功二店',
    name: 'Andy',
    sex: 1,
    mobile: '0912345678',
    staff_no: '112056',
  },
  {
    id: 2,
    branch: '中華一店',
    name: 'Andy',
    sex: 2,
    mobile: '0912345678',
    staff_no: '112056',
  },
  {
    id: 3,
    branch: '成功二店',
    name: 'Andy',
    sex: 1,
    mobile: '0912345678',
    staff_no: '112056',
  },
  {
    id: 4,
    branch: '成功二店',
    name: 'Andy',
    sex: 1,
    mobile: '0912345678',
    staff_no: '112056',
  },
  {
    id: 5,
    branch: '成功二店',
    name: 'Andy',
    sex: 1,
    mobile: '0912345678',
    staff_no: '112056',
  },
  {
    id: 6,
    branch: '成功二店',
    name: 'Andy',
    sex: 1,
    mobile: '0912345678',
    staff_no: '112056',
  },
  {
    id: 7,
    branch: '成功二店',
    name: 'Andy',
    sex: 1,
    mobile: '0912345678',
    staff_no: '112056',
  },
  {
    id: 8,
    branch: '成功二店',
    name: 'Andy',
    sex: 1,
    mobile: '0912345678',
    staff_no: '112056',
  },
]

const initSearchParams = {
  staff_no: "",
  branch_id: 0,
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
      '是否刪除此位員工？',
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

const EditStaffDrawer = ref(null)
function handleEdit(index, row) {
  EditStaffDrawer.value.show(row.id)
  console.log('edit', index, row.id)
}

const CreateStaffDrawer = ref(null)
function handleCreate() {
  CreateStaffDrawer.value.show()
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
      <FilterItem title="員工編號">
        <ElInput v-model="searchParams.staff_no" size="default" placeholder="請輸入" :suffix-icon="Search" />
      </FilterItem>
      <FilterItem title="性別">
        <ElSelect v-model="searchParams.branch_id" placeholder="請選擇">
          <ElOption label="全部" :value="0"/>
          <ElOption label="男" :value="1"/>
          <ElOption label="女" :value="2"/>
        </ElSelect>
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
    <StaffDrawer ref="CreateStaffDrawer" type="create" />
    <StaffDrawer ref="EditStaffDrawer" type="edit" />
  </div>
</template>

<style lang="scss" scoped>
</style>
