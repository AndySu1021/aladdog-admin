<script setup>
import {reactive, ref} from "vue";
import {ElMessage, ElMessageBox} from "element-plus";
import {useAdminStore} from "@/stores/admin";

const adminStore = useAdminStore()

const branches = [{id:1, name:'中華一店'}, {id:2, name: '成功二店'}, {id:3, name: '西門三店'}]

const initSearchParams = {
  branch_id: branches[0].id,
}

const searchParams = reactive({ ...initSearchParams })

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

function handleTabChange() {
  // call api to get category data
  console.log(searchParams)
}

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
  <div class="meal-category-container">
    <ElTabs v-model="searchParams.branch_id" class="demo-tabs" @tab-change="handleTabChange">
      <template v-for="(branch, idx) in branches">
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
  </div>
</template>

<style lang="scss" scoped>
.meal-category-container {
  background-color: white;
  border-radius: 8px;
  padding: 20px 40px 30px;
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
