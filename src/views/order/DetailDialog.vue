<script setup>
import {reactive, ref} from "vue";

const isVisible = ref(false)
const detailData = reactive({
  order_no: '202307231145',
  branch_id: 1,
  branch: '成功一店',
  table_no: 'A2',
  batch_no: 158,
  start_time: '2023-07-23 15:00:00',
  end_time: '2023-07-23 18:00:00',
  headcount: 5,
  total_amount: 2550,
  sub_orders: [
    {
      created_at: '2023-07-23 15:30:00',
      sub_total_quantity: 5,
      sub_total_amount: 1650,
      station: '廚房',
      products: [
        {
          name: '焗烤娃娃菜',
          quantity: 2,
          price: 300,
          total_amount: 600,
        },
        {
          name: '牛肝箘燉飯',
          quantity: 3,
          price: 350,
          total_amount: 1050,
        }
      ],
    },
    {
      created_at: '2023-07-23 16:30:00',
      sub_total_quantity: 1,
      sub_total_amount: 900,
      station: '吧台',
      products: [
        {
          name: '經典牛排',
          quantity: 1,
          price: 900,
          total_amount: 900,
        },
      ],
    },
  ],
})

function show(orderNo) {
  isVisible.value = true
  detailData.order_no = orderNo
  // call order detail api
}

defineExpose({show})

const formatter = new Intl.NumberFormat('en-US', {style: 'currency', currency: 'TWD', maximumFractionDigits: 0})
</script>

<template>
  <div class="dddd">
  <ElDialog
      v-model="isVisible"
      :title="`訂單詳情 #${detailData.order_no}`"
      width="60%"
  >
    <ElDescriptions
        class="margin-top"
        :column="2"
        size="large"
        border
    >
      <ElDescriptionsItem label="訂單號" label-align="center">{{detailData.order_no}}</ElDescriptionsItem>
      <el-descriptions-item label="分店" label-align="center">{{detailData.branch}}</el-descriptions-item>
      <el-descriptions-item label="桌號" label-align="center">{{detailData.table_no}}</el-descriptions-item>
      <el-descriptions-item label="批次號" label-align="center">{{detailData.batch_no}}</el-descriptions-item>
      <el-descriptions-item label="入桌時間" label-align="center">{{detailData.start_time}}</el-descriptions-item>
      <el-descriptions-item label="離桌時間" label-align="center">{{detailData.end_time}}</el-descriptions-item>
      <el-descriptions-item label="用餐人數" label-align="center">{{detailData.headcount}} 人</el-descriptions-item>
      <el-descriptions-item label="總金額" label-align="center">
        {{formatter.format(detailData.total_amount)}}
      </el-descriptions-item>
    </ElDescriptions>
    <ElTable
        style="margin-top: 24px;"
        :data="detailData.sub_orders"
        border
    >
      <ElTableColumn type="expand">
        <template #default="scope">
          <div style="width: 90%;margin: auto;">
            <ElTable
                row-key="id"
                :data="scope.row.products"
                border
            >
              <ElTableColumn label="商品名稱" prop="name" align="center" />
              <ElTableColumn label="數量" prop="quantity" align="center" />
              <ElTableColumn label="單價" prop="price" align="center">
                <template #default="scope">
                  {{formatter.format(scope.row.price)}}
                </template>
              </ElTableColumn>
              <ElTableColumn label="總金額" prop="total_amount" align="center">
                <template #default="scope">
                  {{formatter.format(scope.row.total_amount)}}
                </template>
              </ElTableColumn>
            </ElTable>
          </div>
        </template>
      </ElTableColumn>
      <ElTableColumn label="崗位" prop="station" align="center" />
      <ElTableColumn label="數量" prop="sub_total_quantity" align="center" />
      <ElTableColumn label="小計" prop="sub_total_quantity" align="center">
        <template #default="scope">
          {{formatter.format(scope.row.sub_total_amount)}}
        </template>
      </ElTableColumn>
      <ElTableColumn label="點單時間" prop="created_at" width="180" align="center" />
    </ElTable>
  </ElDialog>
  </div>
</template>

<style scoped lang="scss">

</style>
