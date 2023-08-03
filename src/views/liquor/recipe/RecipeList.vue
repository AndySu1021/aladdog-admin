<script setup>
import ControlPlane from "@/components/ControlPlane.vue";
import DataPlane from "@/components/DataPlane.vue";
import {Filter, Plus, Search} from "@element-plus/icons-vue";
import AppTable from "@/components/AppTable.vue";
import FilterItem from "@/components/FilterItem.vue";
import {h, reactive, ref} from "vue";
import {ElButton, ElMessage, ElMessageBox, ElTag} from "element-plus";
import AppPagination from "@/components/AppPagination.vue";
import RecipeDrawer from "@/views/liquor/recipe/RecipeDrawer.vue";
import CategoryDrawer from "@/views/liquor/recipe/CategoryDrawer.vue";
import BranchSelect from "@/components/BranchSelect.vue";

const tableColumn = [
  {
    key: 'id',
    title: '編號',
    dataKey: 'id',
    width: 80,
    align: 'center',
  },
  {
    key: 'branch',
    title: '分店',
    dataKey: 'branch',
    width: 150,
    align: 'center',
  },
  {
    key: 'image',
    title: '圖片',
    dataKey: 'image',
    width: 120,
    align: 'center',
    cellRenderer: function ({cellData: image}) {
      if (image !== '') {
        return h(
            'div',
            {
              style: {width: '100%', height: '100%', padding: '8px 0'},
            },
            [
              h(
                  'img',
                  {
                    src: image,
                    style: {width: '100%', height: '100%', objectFit: 'cover'},
                  },
                  []
              ),
            ]
        )
      }
      return null
    }
  },
  {
    key: 'name',
    title: '名稱',
    dataKey: 'name',
    width: 250,
    align: 'center',
  },
  {
    key: 'category_id',
    title: '分類',
    dataKey: 'category_id',
    width: 120,
    align: 'center',
  },
  {
    key: 'price',
    title: '售價',
    dataKey: 'price',
    width: 120,
    align: 'center',
    cellRenderer: ({cellData: price}) => new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'TWD',
      maximumFractionDigits: 0
    }).format(price)
  },
  {
    key: 'cost',
    title: '參考成本價',
    dataKey: 'cost',
    width: 150,
    align: 'center',
    cellRenderer: ({cellData: cost}) => new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'TWD',
      maximumFractionDigits: 0
    }).format(cost)
  },
  {
    key: 'is_enabled',
    title: '狀態',
    dataKey: 'is_enabled',
    width: 120,
    align: 'center',
    cellRenderer: ({cellData: is_enabled}) => is_enabled === 1 ? h(ElTag, {type: 'success'}, () => '已上架') : h(ElTag, {type: 'danger'}, () => '下架中'),
  },
]
const tableData = [
  {
    id: 1,
    branch: '中華一店',
    branch_id: 1,
    image: 'https://res.cloudinary.com/enotria/image/upload/ar_16:9,c_fill,dpr_auto,w_auto/v1615282620/White_Lady_Banner_effeaf0fc0.jpg',
    name: 'White Lady',
    category_id: '琴酒',
    price: 350,
    cost: 1200,
    is_enabled: 1,
  },
  {
    id: 2,
    branch: '成功二店',
    branch_id: 2,
    image: 'https://res.cloudinary.com/enotria/image/upload/ar_16:9,c_fill,dpr_auto,w_auto/v1615282620/White_Lady_Banner_effeaf0fc0.jpg',
    name: 'White Lady',
    category_id: '琴酒',
    price: 350,
    cost: 1200,
    is_enabled: 0,
  },
  {
    id: 3,
    branch: '信義三店',
    branch_id: 1,
    image: 'https://res.cloudinary.com/enotria/image/upload/ar_16:9,c_fill,dpr_auto,w_auto/v1615282620/White_Lady_Banner_effeaf0fc0.jpg',
    name: 'White Lady',
    category_id: '琴酒',
    price: 350,
    cost: 1200,
    is_enabled: 1,
  },
  {
    id: 4,
    branch: '中華一店',
    branch_id: 1,
    image: 'https://res.cloudinary.com/enotria/image/upload/ar_16:9,c_fill,dpr_auto,w_auto/v1615282620/White_Lady_Banner_effeaf0fc0.jpg',
    name: 'White Lady',
    category_id: '琴酒',
    price: 350,
    cost: 1200,
    is_enabled: 1,
  },
  {
    id: 5,
    branch: '中華一店',
    branch_id: 1,
    image: 'https://res.cloudinary.com/enotria/image/upload/ar_16:9,c_fill,dpr_auto,w_auto/v1615282620/White_Lady_Banner_effeaf0fc0.jpg',
    name: 'White Lady',
    category_id: '琴酒',
    price: 350,
    cost: 1200,
    is_enabled: 1,
  },
  {
    id: 6,
    branch: '中華一店',
    branch_id: 1,
    image: 'https://res.cloudinary.com/enotria/image/upload/ar_16:9,c_fill,dpr_auto,w_auto/v1615282620/White_Lady_Banner_effeaf0fc0.jpg',
    name: 'White Lady',
    category_id: '琴酒',
    price: 350,
    cost: 1200,
    is_enabled: 1,
  },
  {
    id: 7,
    branch: '中華一店',
    branch_id: 1,
    image: 'https://res.cloudinary.com/enotria/image/upload/ar_16:9,c_fill,dpr_auto,w_auto/v1615282620/White_Lady_Banner_effeaf0fc0.jpg',
    name: 'White Lady',
    category_id: '琴酒',
    price: 350,
    cost: 1200,
    is_enabled: 1,
  },
  {
    id: 8,
    branch: '中華一店',
    branch_id: 1,
    image: 'https://res.cloudinary.com/enotria/image/upload/ar_16:9,c_fill,dpr_auto,w_auto/v1615282620/White_Lady_Banner_effeaf0fc0.jpg',
    name: 'White Lady',
    category_id: '琴酒',
    price: 350,
    cost: 1200,
    is_enabled: 1,
  },
]

const initSearchParams = {
  branch_id: 0,
  name: '',
}
const searchParams = reactive({ ...initSearchParams })

function handleReset() {
  Object.assign(searchParams, initSearchParams)
}
function handleSearch() {
  console.log(searchParams)
}
function handleDownload() {
  ElMessage.success('下載成功')
}

const CreateRecipeDrawer = ref(null)
function handleCreate() {
  CreateRecipeDrawer.value.show()
}

const EditRecipeDrawer = ref(null)
function handleEdit(index, row) {
  EditRecipeDrawer.value.show(row.id)
}

const EditCategoryDrawer = ref(null)
function handleCategory() {
  EditCategoryDrawer.value.show()
}

function handleDelete(index, row) {
  ElMessageBox.confirm(
      '是否刪除此酒譜？',
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
        :download="handleDownload"
    >
      <FilterItem title="分店">
        <BranchSelect v-model="searchParams.branch_id" :show-all="true" />
      </FilterItem>
      <FilterItem title="名稱">
        <ElInput v-model="searchParams.name" size="default" placeholder="請輸入" :suffix-icon="Search" />
      </FilterItem>
    </ControlPlane>
    <DataPlane>
      <template #btn-group>
        <ElButton type="primary" :icon="Plus" size="large" @click="handleCreate">新增</ElButton>
        <ElButton type="warning" :icon="Filter" size="large" @click="handleCategory">分類</ElButton>
      </template>
      <template #main-data>
        <AppTable
            :data="tableData"
            :columns="tableColumn"
            :edit="handleEdit"
            :delete="handleDelete"
            :row-height="100"
        />
      </template>
      <template #page-data>
        <AppPagination :data="pagination" @change="handleChange" />
      </template>
    </DataPlane>
    <RecipeDrawer ref="CreateRecipeDrawer" type="create" />
    <RecipeDrawer ref="EditRecipeDrawer" type="edit" />
    <CategoryDrawer ref="EditCategoryDrawer" />
  </div>
</template>

<style lang="scss" scoped>
</style>
