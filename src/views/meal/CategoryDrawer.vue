<script setup>
import { Plus } from '@element-plus/icons-vue'
import { reactive, ref } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import AppDrawer from '@/components/AppDrawer.vue'
import BranchSelect from '@/components/BranchSelect.vue'
import { useAdminStore } from '@/stores/admin'
import { useBranchStore } from '@/stores/branch'

const branchStore = useBranchStore()

const initSearchParams = {
  branch_id: branchStore.getBranches[0].id
}
const searchParams = reactive({ ...initSearchParams })

const adminStore = useAdminStore()

const CategoryForm = ref(null)
const CategoryDrawer = ref(null)
function show() {
  CategoryDrawer.value.show()
}

defineExpose({ show })

const initForm = {
  branch_id: null,
  name: ''
}
const form = reactive({ ...initForm })
const rules = reactive({
  branch_id: [{ required: true, message: '請選擇分店', trigger: 'change' }],
  name: [{ required: true, message: '請輸入名稱', trigger: 'blue' }]
})
function handleAdd() {
  CategoryForm.value.validate((valid, fields) => {
    if (valid) {
      if (form.branch_id === searchParams.branch_id) {
        tableData.data.push({
          id: tableData.data.length + 1,
          name: form.name,
          level: 1,
          sort: tableData.data.length + 1
        })
      }
      // call add api
      form.name = ''
      console.log(form)
    } else {
      console.log('error submit!', fields)
    }
  })
}

const tableData = reactive({
  data: [
    {
      id: 1,
      name: '主食',
      level: 1,
      sort: 1,
      sub: [
        {
          id: 2,
          level: 2,
          name: '排餐',
          sort: 1
        },
        {
          id: 3,
          level: 2,
          name: '套餐',
          sort: 2
        },
        {
          id: 4,
          level: 2,
          name: '單點',
          sort: 3
        }
      ]
    },
    {
      id: 5,
      level: 1,
      name: '甜點',
      sort: 2,
      sub: [
        {
          id: 6,
          level: 2,
          name: '蛋糕',
          sort: 1
        },
        {
          id: 7,
          level: 2,
          name: '飲品',
          sort: 2
        }
      ]
    }
  ]
})

let id = 1000
function handleSubCreate(data) {
  ElMessageBox.prompt('請輸入分類名稱', '新增分類', {
    confirmButtonText: '確認',
    cancelButtonText: '取消'
  })
    .then((info) => {
      // call create api
      const newChild = { id: id++, name: info.value, level: 2, sort: 5 }
      if (!data.sub) {
        data.sub = []
      }
      data.sub.push(newChild)
      ElMessage({
        type: 'success',
        message: `新增分類: ${info.value} 成功`
      })
    })
    .catch(() => {
      ElMessage({
        type: 'info',
        message: '取消修改'
      })
    })
}

function handleDelete(index, row) {
  ElMessageBox.confirm('是否刪除此分類？', '刪除', {
    confirmButtonText: '確認',
    cancelButtonText: '取消',
    type: 'error',
    center: false,
    showClose: false
  })
    .then(() => {
      // call delete api
      console.log('delete:', row.id)
      tableData.data.splice(index, 1)
      ElMessage({
        type: 'success',
        message: '移除成功'
      })
    })
    .catch(() => {})
}

function handleSubDelete(index, subIndex, row) {
  ElMessageBox.confirm('是否刪除此分類？', '刪除', {
    confirmButtonText: '確認',
    cancelButtonText: '取消',
    type: 'error',
    center: false,
    showClose: false
  })
    .then(() => {
      // call delete api
      console.log('delete:', row.id)
      tableData.data[index].sub.splice(subIndex, 1)
      ElMessage({
        type: 'success',
        message: '移除成功'
      })
    })
    .catch(() => {})
}

function handleBlur(index, id) {
  console.log(id)
  tableData.data[index].editable = false
}
</script>

<template>
  <AppDrawer ref="CategoryDrawer" title="管理分類" size="40%">
    <ElForm
      ref="CategoryForm"
      :model="form"
      :rules="rules"
      require-asterisk-position="right"
      label-position="top"
      status-icon
    >
      <ElFormItem label="分店" required prop="branch_id">
        <BranchSelect v-model.number="form.branch_id" />
      </ElFormItem>
      <ElFormItem label="名稱" required prop="name">
        <ElInput v-model="form.name" placeholder="請輸入分類" />
      </ElFormItem>
      <ElButton style="margin-top: 4px" type="primary" :icon="Plus" @click="handleAdd"
        >添加</ElButton
      >
    </ElForm>
    <div style="margin: 32px 0 16px; font-size: 16px; font-weight: 500">當前分類</div>
    <ElTabs v-model="searchParams.branch_id">
      <template v-for="(branch, idx) in branchStore.getBranches">
        <ElTabPane
          v-if="adminStore.getBranchId === 0 || adminStore.getBranchId === branch.id"
          :key="idx"
          :label="branch.name"
          :name="branch.id"
        />
      </template>
    </ElTabs>
    <ElTable row-key="id" :data="tableData.data" border>
      <ElTableColumn type="expand">
        <template #default="scope1">
          <div style="width: 90%; margin: auto">
            <ElTable row-key="id" :data="scope1.row.sub" border>
              <ElTableColumn label="子分類名稱" prop="name" align="center">
                <template #default="scope2">
                  <ElInput
                    v-model="scope2.row.name"
                    @blur="handleBlur(scope2.$index, scope2.row.id)"
                  />
                </template>
              </ElTableColumn>
              <ElTableColumn label="排序" prop="sort" align="center" sortable>
                <template #default="scope2">
                  <ElInput
                    v-model="scope2.row.sort"
                    @blur="handleBlur(scope2.$index, scope2.row.id)"
                  />
                </template>
              </ElTableColumn>
              <ElTableColumn prop="operations" label="操作" align="center">
                <template #default="scope2">
                  <ElButton
                    size="small"
                    type="danger"
                    @click.stop="handleSubDelete(scope1.$index, scope2.$index, scope2.row)"
                    >刪除</ElButton
                  >
                </template>
              </ElTableColumn>
            </ElTable>
          </div>
        </template>
      </ElTableColumn>
      <ElTableColumn label="分類名稱" prop="name" width="120" align="center">
        <template #default="scope">
          <ElInput v-model="scope.row.name" @blur="handleBlur(scope.$index, scope.row.id)" />
        </template>
      </ElTableColumn>
      <ElTableColumn label="排序" prop="sort" width="80" align="center" sortable>
        <template #default="scope">
          <ElInput v-model="scope.row.sort" @blur="handleBlur(scope.$index, scope.row.id)" />
        </template>
      </ElTableColumn>
      <ElTableColumn prop="operations" label="操作" align="center">
        <template #default="scope">
          <ElButton type="primary" size="small" @click.stop="handleSubCreate(scope.row)"
            >新增</ElButton
          >
          <ElButton size="small" type="danger" @click.stop="handleDelete(scope.$index, scope.row)"
            >刪除</ElButton
          >
        </template>
      </ElTableColumn>
    </ElTable>
  </AppDrawer>
</template>

<style scoped lang="scss">
.ff .cell {
  color: #000 !important;
}
.custom-tree-node {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 16px;
  padding-right: 8px;
}
</style>
