<template>
  <nav class="fixed top-0 left-0 h-screen w-16 m-0 flex flex-col bg-gray-900 text-white shadow">
    <ul>
      <SideBarIcon path="home" icon="material-symbols:house-rounded" tooltip="Home"/>
    </ul>
  </nav>
</template>

<script setup lang="ts">
import SideBarIcon from '@/layouts/app/SideBarIcon.vue';
</script>