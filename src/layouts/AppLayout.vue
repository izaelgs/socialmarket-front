<template>
  <Sidebar />

  <div class="ml-5 flex justify-center m-5">
    <RouterView />
  </div>

</template>

<script setup lang="ts">
import { RouterView } from 'vue-router';

import Sidebar from '@/layouts/app/Sidebar.vue';
</script>