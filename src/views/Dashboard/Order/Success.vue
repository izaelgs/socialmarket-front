<template>
  <main class="grid min-h-full w-full place-items-center px-6 py-24 sm:py-32 lg:px-8">
    <div class="text-center">
      <p class="text-base font-semibold text-green-600">Order Successful</p>
      <h1 class="mt-4 text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-5xl">Thank you for your purchase!</h1>
      <p class="mt-6 text-base leading-7 text-gray-600 dark:text-gray-400">Your order has been successfully placed and is being processed.</p>
      <div class="mt-10 flex items-center justify-center gap-x-6">
        <a href="/dashboard" class="rounded-md bg-green-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600">Go to Dashboard</a>
        <a href="/orders" class="text-sm font-semibold text-gray-900 dark:text-white">View Orders <span aria-hidden="true">&rarr;</span></a>
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
import { defineComponent } from 'vue';

defineComponent({
  name: 'OrderSuccessComponent'
})
</script>
