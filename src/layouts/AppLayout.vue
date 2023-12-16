<template>
  <header class="flex">
    <Sidebar />
  </header>

  <RouterView />
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router';

import Sidebar from '@/layouts/app/Sidebar.vue';
</script>