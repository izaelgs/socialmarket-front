<template>
  <main class="grid min-h-full w-full place-items-center px-6 py-24 sm:py-32 lg:px-8">
    <div class="text-center">
      <p class="text-base font-semibold text-red-600 dark:text-red-400">Order Cancelled</p>
      <h1 class="mt-4 text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-5xl">Your order has been cancelled</h1>
      <p class="mt-6 text-base leading-7 text-gray-600 dark:text-gray-400">We're sorry to see you go. If you have any questions or concerns, please don't hesitate to contact us.</p>
      <div class="mt-10 flex items-center justify-center gap-x-6">
        <a href="/dashboard" class="rounded-md bg-red-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600 dark:bg-red-700 dark:hover:bg-red-600">Return to Dashboard</a>
        <a href="/support" class="text-sm font-semibold text-gray-900 dark:text-white">Contact Support <span aria-hidden="true">&rarr;</span></a>
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
import { defineComponent } from 'vue';

defineComponent({
  name: 'OrderCancelComponent'
})
</script>

