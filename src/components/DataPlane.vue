<script setup>

</script>

<template>
  <div class="data-plane-container">
    <div v-if="$slots['btn-group']" class="btn-group-section">
      <slot name="btn-group" />
    </div>
    <div class="main-data">
      <slot name="main-data"/>
    </div>
    <div v-if="$slots['page-data']" class="page-data">
      <slot name="page-data"/>
    </div>
  </div>
</template>

<style scoped lang="scss">
.data-plane-container {
  padding: 16px;
  background-color: white;
  border-radius: 8px;
  margin-bottom: 20px;
  .btn-group-section {
    margin-bottom: 24px;
  }
  .page-data {
    margin: 24px 0 16px;
    display: flex;
    justify-content: center;
  }
  .main-data {
    width: 100%;
  }
}
</style>
