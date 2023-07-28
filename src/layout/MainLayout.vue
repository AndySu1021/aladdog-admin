<template>
  <div class="main-layout">
    <MainLogo />
    <SideBar />
    <TopBar />
    <AppMain />
  </div>
</template>

<script setup>
import AppMain from "@/layout/AppMain.vue";
import SideBar from "@/layout/Sidebar/SidebarMenu.vue";
import TopBar from "@/layout/TopBar.vue";
import MainLogo from "@/layout/MainLogo.vue";
</script>

<style scoped>
.main-layout {
  position: relative;
  height: 100%;
  width: 100%;
}
</style>
