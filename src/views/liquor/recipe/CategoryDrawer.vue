<script setup>
import { Plus } from '@element-plus/icons-vue'
import { reactive, ref } from 'vue'
import { vDragable } from 'element-plus-table-dragable'
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

const tableData = reactive({
  data: []
})
function getTableData() {
  switch (searchParams.branch_id) {
    case 1: {
      tableData.data = [
        {
          id: 1,
          name: '特調',
          sort: 1
        },
        {
          id: 2,
          name: '琴酒',
          sort: 2
        },
        {
          id: 3,
          name: '威士忌',
          sort: 3
        },
        {
          id: 4,
          name: '經典',
          sort: 4
        }
      ]
      break
    }
    case 2: {
      tableData.data = [
        {
          id: 5,
          name: '特調',
          sort: 1
        },
        {
          id: 6,
          name: '經典',
          sort: 2
        }
      ]
      break
    }
    case 3: {
      tableData.data = [
        {
          id: 7,
          name: '琴酒',
          sort: 1
        },
        {
          id: 8,
          name: '威士忌',
          sort: 2
        }
      ]
      break
    }
  }
}
getTableData()

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
          sort: tableData.data.length + 1,
          editable: false
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

function handleBlur(index, id) {
  console.log(id)
  tableData.data[index].editable = false
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

const dragOptions = [
  {
    selector: 'tbody', // add drag support for row
    option: {
      // sortablejs's option
      animation: 150,
      onEnd: (evt) => {
        if (evt.oldIndex > evt.newIndex) {
          const newSort = tableData.data[evt.newIndex].sort
          for (let i = evt.newIndex; i < evt.oldIndex; i++) {
            tableData.data[i].sort++
          }
          tableData.data[evt.oldIndex].sort = newSort
        } else if (evt.oldIndex < evt.newIndex) {
          const newSort = tableData.data[evt.newIndex].sort
          for (let i = evt.oldIndex + 1; i <= evt.newIndex; i++) {
            tableData.data[i].sort--
          }
          tableData.data[evt.oldIndex].sort = newSort
        }
        const currRow = tableData.data.splice(evt.oldIndex, 1)[0]
        tableData.data.splice(evt.newIndex, 0, currRow)
      }
    }
  }
]
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
    <ElTabs v-model="searchParams.branch_id" @tab-change="getTableData">
      <template v-for="(branch, idx) in branchStore.getBranches">
        <ElTabPane
          v-if="adminStore.getBranchId === 0 || adminStore.getBranchId === branch.id"
          :key="idx"
          :label="branch.name"
          :name="branch.id"
        />
      </template>
    </ElTabs>
    <ElTable row-key="id" v-dragable="dragOptions" :data="tableData.data" border>
      <ElTableColumn prop="name" label="名稱" width="180" align="center">
        <template #default="scope">
          <ElInput v-model="scope.row.name" @blur="handleBlur(scope.$index, scope.row.id)" />
        </template>
      </ElTableColumn>
      <ElTableColumn prop="sort" label="排序" width="100" align="center">
        <template #default="scope">
          <ElInput v-model="scope.row.sort" @blur="handleBlur(scope.$index, scope.row.id)" />
        </template>
      </ElTableColumn>
      <ElTableColumn prop="operations" label="操作" align="center">
        <template #default="scope">
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
</style>
