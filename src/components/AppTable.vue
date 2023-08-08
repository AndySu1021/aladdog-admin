<script setup>
import { Delete, EditPen, Lock, View } from '@element-plus/icons-vue'
import { ref } from 'vue'
import { ElButton } from 'element-plus'
import { useAdminStore } from '@/stores/admin'

const store = useAdminStore()

const props = defineProps({
  onDetail: {
    type: Function,
    default: null
  },
  passwordKey: {
    type: String,
    default: ''
  },
  onPassword: {
    type: Function,
    default: null
  },
  editKey: {
    type: String,
    default: ''
  },
  onEdit: {
    type: Function,
    default: null
  },
  deleteKey: {
    type: String,
    default: ''
  },
  onDelete: {
    type: Function,
    default: null
  },
  columns: Array,
  data: Array,
  fixed: {
    type: Boolean,
    default: true
  },
  rowHeight: {
    type: Number,
    default: 58
  }
})

const count = ref(0)
if (props.onDetail) {
  count.value += 1
}
if (props.onPassword) {
  count.value += 1
}
if (props.onEdit) {
  count.value += 1
}
if (props.onDelete) {
  count.value += 1
}
</script>

<template>
  <ElTable
    row-key="id"
    :data="data"
    style="width: 100%"
    stripe
    header-cell-class-name="app-table-cell-header"
  >
    <template v-for="(column, idx) in columns" :key="idx">
      <ElTableColumn
        v-if="column.cellRender"
        :prop="column.prop"
        :label="column.label"
        :min-width="column.minWidth"
        align="center"
      >
        <template #default="scope">
          <Component :is="column.cellRender(scope)" />
        </template>
      </ElTableColumn>
      <ElTableColumn
        v-else
        :prop="column.prop"
        :label="column.label"
        :min-width="column.minWidth"
        :formatter="column.formatter"
        align="center"
      />
    </template>
    <ElTableColumn
      v-if="count > 0"
      fixed="right"
      label="操作"
      :width="count * 50 + 20"
      align="center"
    >
      <template #default="scope">
        <ElButton
          v-if="onDetail"
          :icon="View"
          color="#eaeaea"
          circle
          @click="onDetail(scope.$index, scope.row)"
        />
        <ElButton
          v-if="onPassword"
          type="warning"
          :icon="Lock"
          circle
          @click="onPassword(scope.$index, scope.row)"
          :disabled="passwordKey === '' ? false : !store.checkPermission(passwordKey)"
        />
        <ElButton
          v-if="onEdit"
          :icon="EditPen"
          color="#eaeaea"
          circle
          @click="onEdit(scope.$index, scope.row)"
          :disabled="editKey === '' ? false : !store.checkPermission(editKey)"
        />
        <ElButton
          v-if="onDelete"
          type="danger"
          :icon="Delete"
          circle
          @click="onDelete(scope.$index, scope.row)"
          :disabled="deleteKey === '' ? false : !store.checkPermission(deleteKey)"
        />
      </template>
    </ElTableColumn>
    <template #empty>
      <div class="flex items-center justify-center h-100%">
        <ElEmpty description="暫無數據" />
      </div>
    </template>
  </ElTable>
</template>

<style lang="scss">
.app-table-cell-header {
  background: rgb(249, 249, 249) !important;
  color: rgb(124, 124, 124);
  height: 46px;
  &:first-child {
    border-radius: 8px 0 0 0;
  }
  &:last-child {
    border-radius: 0 8px 0 0;
  }
}
</style>
