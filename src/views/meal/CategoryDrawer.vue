<script setup>
import {Plus} from "@element-plus/icons-vue";
import {reactive, ref} from "vue";
import {vDragable} from "element-plus-table-dragable";
import {ElMessage, ElMessageBox} from "element-plus";
import AppDrawer from "@/components/AppDrawer.vue";
import BranchSelect from "@/components/BranchSelect.vue";
import {useAdminStore} from "@/stores/admin";
import {useBranchStore} from "@/stores/branch";

const branchStore = useBranchStore()

const initSearchParams = {
  branch_id: branchStore.getBranches[0].id,
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
          sort: 1,
          editable: false,
        },
        {
          id:2,
          name: '琴酒',
          sort: 2,
          editable: false,
        },
        {
          id:3,
          name: '威士忌',
          sort: 3,
          editable: false,
        },
        {
          id:4,
          name: '經典',
          sort: 4,
          editable: false,
        }
      ]
      break
    }
    case 2: {
      tableData.data = [
        {
          id: 5,
          name: '特調',
          sort: 1,
          editable: false,
        },
        {
          id:6,
          name: '經典',
          sort: 2,
          editable: false,
        }
      ]
      break
    }
    case 3: {
      tableData.data = [
        {
          id:7,
          name: '琴酒',
          sort: 1,
          editable: false,
        },
        {
          id:8,
          name: '威士忌',
          sort: 2,
          editable: false,
        },
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

defineExpose({show})

const initForm = {
  branch_id: null,
  name: '',
}
const form = reactive({ ...initForm })
const rules = reactive({
  branch_id: [
    { required: true, message: '請選擇分店', trigger: 'change' },
  ],
  name: [
    { required: true, message: '請輸入名稱', trigger: 'blue' },
  ],
})
function handleAdd() {
  CategoryForm.value.validate((valid, fields) => {
    if (valid) {
      if (form.branch_id === searchParams.branch_id) {
        tableData.data.push({
          id: tableData.data.length + 1,
          name: form.name,
          sort: tableData.data.length + 1,
          editable: false,
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

const dataSource = ref([
  {
    id: 1,
    label: '主食',
    level: 1,
    children: [
      {
        id: 2,
        level: 2,
        label: '排餐',
      },
      {
        id: 3,
        level: 2,
        label: '套餐',
      },
      {
        id: 4,
        level: 2,
        label: '單點',
      },
    ],
  },
  {
    id: 5,
    level: 1,
    label: '甜點',
    children: [
      {
        id: 6,
        level: 2,
        label: '蛋糕',
      },
      {
        id: 7,
        level: 2,
        label: '飲品',
      },
    ],
  },
])

let id = 1000
function handleCreate(data) {
  ElMessageBox.prompt('請輸入分類名稱', '新增分類', {
    confirmButtonText: '確認',
    cancelButtonText: '取消',
  }).then((info) => {
    // call create api
    const newChild = { id: id++, label: info.value, level: 2 }
    if (!data.children) {
      data.children = []
    }
    data.children.push(newChild)
    ElMessage({
      type: 'success',
      message: `新增分類: ${info.value} 成功`,
    })
  }).catch(() => {
    ElMessage({
      type: 'info',
      message: '取消修改',
    })
  })
}

function handleEdit(data) {
  ElMessageBox.prompt('請輸入分類名稱', '編輯分類', {
    confirmButtonText: '確認',
    cancelButtonText: '取消',
    inputValue: data.label,
  }).then((info) => {
    // call edit api
    data.label = info.value
    ElMessage({
      type: 'success',
      message: `新增分類: ${info.value} 成功`,
    })
  }).catch(() => {
    ElMessage({
      type: 'info',
      message: '取消修改',
    })
  })
}

function handleDelete(node, data) {
  ElMessageBox.confirm(
      '是否刪除此分類？',
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
    const parent = node.parent
    const children = parent.data.children || parent.data
    const index = children.findIndex((d) => d.id === data.id)
    children.splice(index, 1)
    dataSource.value = [...dataSource.value]
    ElMessage({
      type: 'success',
      message: '刪除成功',
    })
  }).catch(() => {})
}
</script>

<template>
  <AppDrawer
      ref="CategoryDrawer"
      title="管理分類"
      size="40%"
  >
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
      <ElButton style="margin-top: 4px;" type="primary" :icon="Plus" @click="handleAdd">添加</ElButton>
    </ElForm>
    <div style="margin: 32px 0 16px;font-size: 16px;font-weight: 500;">當前分類</div>
    <ElTabs v-model="searchParams.branch_id" @tab-change="getTableData">
      <template v-for="(branch, idx) in branchStore.getBranches">
        <ElTabPane v-if="adminStore.getBranchId === 0 || adminStore.getBranchId === branch.id" :key="idx" :label="branch.name" :name="branch.id" />
      </template>
    </ElTabs>
    <ElTree
        :data="dataSource"
        node-key="id"
        default-expand-all
        :expand-on-click-node="false"
        draggable
    >
      <template #default="{ node, data }">
        <span class="custom-tree-node">
          <span>{{ node.label }}</span>
          <span>
            <ElButton v-if="node.level === 1" type="primary" size="small" @click="handleCreate(data)">新增</ElButton>
            <ElButton size="small" @click="handleSelect(data)">商品</ElButton>
            <ElButton type="primary" size="small" @click="handleEdit(data)">編輯</ElButton>
            <ElButton type="danger" size="small" style="margin-left: 8px" @click="handleDelete(node, data)">刪除</ElButton>
          </span>
        </span>
      </template>
    </ElTree>
  </AppDrawer>
</template>

<style scoped lang="scss">
.ff .cell{
  color: #000!important;
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
