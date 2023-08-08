<script setup>
import ControlPlane from '@/components/ControlPlane.vue'
import DataPlane from '@/components/DataPlane.vue'
import { Filter, Plus, Search } from '@element-plus/icons-vue'
import AppTable from '@/components/AppTable.vue'
import FilterItem from '@/components/FilterItem.vue'
import { h, reactive, ref } from 'vue'
import { ElMessage, ElMessageBox, ElTag } from 'element-plus'
import AppPagination from '@/components/AppPagination.vue'
import MealDrawer from '@/views/meal/MealDrawer.vue'
import BranchSelect from '@/components/BranchSelect.vue'
import CategoryDrawer from '@/views/meal/CategoryDrawer.vue'
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
    prop: 'image',
    label: '圖片',
    cellRender: function (scope) {
      if (scope.row.image !== '') {
        return h(
          'div',
          {
            style: { width: '100%', height: '100%', padding: '8px 0' }
          },
          [
            h(
              'img',
              {
                src: scope.row.image,
                style: { width: '100%', height: '100%', objectFit: 'cover' }
              },
              []
            )
          ]
        )
      }
      return null
    }
  },
  {
    prop: 'name',
    label: '名稱'
  },
  {
    prop: 'category',
    label: '分類'
  },
  {
    prop: 'prices',
    label: '售價',
    cellRender: function (scope) {
      const children = scope.row.prices.map((item) =>
        h('div', {}, `${formatAmount(item.price)} (${item.spec})`)
      )
      return h('div', {}, children)
    }
  },
  {
    prop: 'is_enabled',
    label: '狀態',
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
    image:
      'https://res.cloudinary.com/enotria/image/upload/ar_16:9,c_fill,dpr_auto,w_auto/v1615282620/White_Lady_Banner_effeaf0fc0.jpg',
    name: '牛小排',
    category: '主食',
    prices: [
      { spec: '大', price: 100 },
      { spec: '小', price: 60 }
    ],
    is_enabled: 1
  },
  {
    id: 2,
    branch: '成功二店',
    image:
      'https://res.cloudinary.com/enotria/image/upload/ar_16:9,c_fill,dpr_auto,w_auto/v1615282620/White_Lady_Banner_effeaf0fc0.jpg',
    name: '奶茶',
    category: '飲品',
    prices: [
      { spec: '大', price: 100 },
      { spec: '小', price: 60 }
    ],
    is_enabled: 0
  },
  {
    id: 3,
    branch: '信義三店',
    image:
      'https://res.cloudinary.com/enotria/image/upload/ar_16:9,c_fill,dpr_auto,w_auto/v1615282620/White_Lady_Banner_effeaf0fc0.jpg',
    name: '奶茶',
    category: '飲品',
    prices: [
      { spec: '大', price: 100 },
      { spec: '小', price: 60 }
    ],
    is_enabled: 0
  },
  {
    id: 4,
    branch: '中華一店',
    image:
      'https://res.cloudinary.com/enotria/image/upload/ar_16:9,c_fill,dpr_auto,w_auto/v1615282620/White_Lady_Banner_effeaf0fc0.jpg',
    name: '奶茶',
    category: '飲品',
    prices: [
      { spec: '大', price: 100 },
      { spec: '小', price: 60 }
    ],
    is_enabled: 0
  },
  {
    id: 5,
    branch: '中華一店',
    image:
      'https://res.cloudinary.com/enotria/image/upload/ar_16:9,c_fill,dpr_auto,w_auto/v1615282620/White_Lady_Banner_effeaf0fc0.jpg',
    name: '奶茶',
    category: '飲品',
    prices: [
      { spec: '大', price: 100 },
      { spec: '小', price: 60 }
    ],
    is_enabled: 0
  },
  {
    id: 6,
    branch: '中華一店',
    image:
      'https://res.cloudinary.com/enotria/image/upload/ar_16:9,c_fill,dpr_auto,w_auto/v1615282620/White_Lady_Banner_effeaf0fc0.jpg',
    name: '奶茶',
    category: '飲品',
    prices: [
      { spec: '大', price: 100 },
      { spec: '小', price: 60 }
    ],
    is_enabled: 0
  },
  {
    id: 7,
    branch: '中華一店',
    image:
      'https://res.cloudinary.com/enotria/image/upload/ar_16:9,c_fill,dpr_auto,w_auto/v1615282620/White_Lady_Banner_effeaf0fc0.jpg',
    name: '奶茶',
    category: '飲品',
    prices: [
      { spec: '大', price: 100 },
      { spec: '小', price: 60 }
    ],
    is_enabled: 0
  },
  {
    id: 8,
    branch: '中華一店',
    image:
      'https://res.cloudinary.com/enotria/image/upload/ar_16:9,c_fill,dpr_auto,w_auto/v1615282620/White_Lady_Banner_effeaf0fc0.jpg',
    name: '奶茶',
    category: '飲品',
    prices: [
      { spec: '大', price: 100 },
      { spec: '小', price: 60 }
    ],
    is_enabled: 0
  }
]

const initSearchParams = {
  branch_id: 0,
  category_path: [0],
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
  ElMessageBox.confirm('是否刪除此酒譜？', '刪除', {
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

const EditMealDrawer = ref(null)
function handleEdit(index, row) {
  EditMealDrawer.value.show(row.id)
  console.log('edit', index, row.id)
}

const CreateMealDrawer = ref(null)
function handleCreate() {
  CreateMealDrawer.value.show()
}

const EditCategoryDrawer = ref(null)
function handleCategory() {
  EditCategoryDrawer.value.show()
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

const options = [
  {
    value: 0,
    label: '全部'
  },
  {
    value: 1,
    label: '主食',
    children: [
      {
        value: 2,
        label: '排餐'
      },
      {
        value: 3,
        label: '套餐'
      },
      {
        value: 4,
        label: '單點'
      }
    ]
  },
  {
    value: 5,
    label: '甜點',
    children: [
      {
        value: 6,
        label: '蛋糕'
      },
      {
        value: 7,
        label: '飲品'
      }
    ]
  },
  {
    value: 8,
    label: '酒水'
  }
]
</script>

<template>
  <div class="dashboard-container">
    <ControlPlane :reset="handleReset" :search="handleSearch">
      <FilterItem title="分店">
        <BranchSelect v-model.number="searchParams.branch_id" :show-all="true" />
      </FilterItem>
      <FilterItem title="類型">
        <ElCascader
          :disabled="searchParams.branch_id === 0"
          v-model="searchParams.category_path"
          :options="options"
          placeholder="請選擇"
        />
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
        <PermButton :icon="Plus" perm-key="Meal.Create" @click="handleCreate">新增</PermButton>
        <PermButton type="warning" :icon="Filter" perm-key="Meal.Category" @click="handleCategory"
          >分類</PermButton
        >
      </template>
      <template #main-data>
        <AppTable
          :data="tableData"
          :columns="tableColumn"
          :on-edit="handleEdit"
          edit-key="Meal.Edit"
          :on-delete="handleDelete"
          delete-key="Meal.Delete"
          :row-height="100"
        />
      </template>
      <template #page-data>
        <AppPagination :data="pagination" @change="handleChange" />
      </template>
    </DataPlane>
    <MealDrawer ref="CreateMealDrawer" type="create" />
    <MealDrawer ref="EditMealDrawer" type="edit" />
    <CategoryDrawer ref="EditCategoryDrawer" />
  </div>
</template>

<style lang="scss" scoped></style>
