<template>
  <div class="bg-white dark:bg-slate-900">
    <Sidebar />

    <div
      class="ml-16 overflow-y-auto overflow-x-hidden text-gray-900 dark:text-gray-200 h-screen scrollbar-minimal"
    >
      <div class="py-6 shadow">
        <div class="lg:flex lg:items-center lg:justify-between sm:mx-auto sm:max-w-5xl px-2">
          <h2 class="text-2xl font-bold leading-7 sm:truncate sm:text-2xl sm:tracking-tight">
            {{ route.name }}
          </h2>
        </div>
      </div>
      <div class="lg:flex lg:items-center lg:justify-between sm:mx-auto sm:max-w-5xl py-6 px-4">
        <RouterView />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { RouterView, useRoute } from 'vue-router'

import Sidebar from '@/layouts/app/SideBar.vue'
import { useUserStore } from '@/services/userStore'
import { defineComponent } from 'vue'

defineComponent({
  name: 'DashboardIndex'
})

const user = useUserStore()
const route = useRoute()

user.loadFromLocalStorage()
</script>
