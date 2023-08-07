<script setup></script>

<template>
  <div class="logo-container">
    <img src="@/assets/logo.png" alt="logo" />
  </div>
</template>

<style scoped lang="scss">
.logo-container {
  background-color: white;
  width: var(--sidebar-width);
  height: var(--topbar-height);
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1001;
  border-bottom: 1px solid rgb(233, 233, 233);
  border-right: 1px solid rgb(233, 233, 233);
  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
    padding: 10px;
  }
}
</style>
