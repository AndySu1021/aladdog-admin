<script setup>
import {Delete, EditPen, Lock, View} from "@element-plus/icons-vue";
import {h, reactive} from "vue";
import {ElButton, TableV2FixedDir} from "element-plus";

const props = defineProps({
  detail: {
    type: Function,
    default: null,
  },
  password: {
    type: Function,
    default: null,
  },
  edit: {
    type: Function,
    default: null,
  },
  delete: {
    type: Function,
    default: null,
  },
  columns: Array,
  data: Array,
  fixed: {
    type: Boolean,
    default: true,
  },
  rowHeight: {
    type: Number,
    default: 58,
  }
})

let tmpColumns = reactive(props.columns)
let count = 0;
if (props.detail) {
  count++
}
if (props.password) {
  count++
}
if (props.edit) {
  count++
}
if (props.delete) {
  count++
}
if (props.detail || props.password || props.edit || props.delete) {
  tmpColumns.push({
    key: 'operations',
    title: '操作',
    width: count * 50 + 20,
    align: 'center',
    fixed: TableV2FixedDir.RIGHT,
    cellRenderer: (data) => (
        h(
            'div',
            {},
            [
              props.detail ? h(ElButton, {
                icon: View,
                onClick: () => props.detail(data.rowIndex, data.rowData),
                circle: true,
                color: '#eaeaea',
              }) : null,
              props.password ? h(ElButton, {
                type: 'warning',
                icon: Lock,
                onClick: () => props.password(data.rowIndex, data.rowData),
                circle: true,
              }) : null,
              props.edit ? h(ElButton, {
                icon: EditPen,
                onClick: () => props.edit(data.rowIndex, data.rowData),
                circle: true,
                color: '#eaeaea',
              }) : null,
              props.delete ? h(ElButton, {
                type: 'danger',
                icon: Delete,
                onClick: () => props.delete(data.rowIndex, data.rowData),
                circle: true
              }) : null,
            ]
        )
    ),
  })
}
tmpColumns = tmpColumns.map(function (value){
  return {...value, headerClass: 'app-table-cell-header'}
})
</script>

<template>
  <el-auto-resizer>
    <template #default="{ width }">
      <el-table-v2
          :columns="tmpColumns"
          :data="data"
          stripe
          :width="width"
          :height="rowHeight * data.length + rowHeight"
          :header-height="48"
          :row-height="rowHeight"
          header-class="app-table-header"
          :fixed="fixed"
      >
        <template #empty>
          <div class="flex items-center justify-center h-100%">
            <el-empty description="暫無數據" />
          </div>
        </template>
      </el-table-v2>
    </template>
  </el-auto-resizer>
</template>

<style lang="scss">
.app-table-header {
  background: rgb(249, 249, 249);
  color: rgb(124, 124, 124);
  font-weight: bold;
  font-size: 15px;
  border-radius: 8px 8px 0 0;
}
.app-table-cell-header {
  background: rgb(249, 249, 249);
  color: rgb(124, 124, 124);
  &:first-child {
    border-radius: 8px 0 0 0;
  }
  &:last-child {
    border-radius: 0 8px 0 0;
  }
}
</style>
