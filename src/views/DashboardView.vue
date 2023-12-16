<template>
  <Sidebar />

  <div class="ml-16">
    <div class="py-6 shadow">
      <div class="lg:flex lg:items-center lg:justify-between sm:mx-auto sm:max-w-2xl ">
        <h2 class="text-2xl font-bold leading-7 sm:truncate sm:text-2xl sm:tracking-tight">{{ pageTitle }}</h2>
      </div>
    </div>
    <div class="lg:flex lg:items-center lg:justify-between sm:mx-auto sm:max-w-2xl py-6">
      <RouterView />
    </div>
  </div>
</template>

<script setup lang="ts">
import { RouterView, useRoute } from 'vue-router';

import Sidebar from '@/layouts/app/SideBar.vue';
import { useUserStore } from '@/services/userStore';

const user = useUserStore();
const route = useRoute();

user.loadFromLocalStorage();

const pageTitle = route.name || 'Default Title';
</script>