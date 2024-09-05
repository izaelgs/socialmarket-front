<template>
  <div class="p-4 border rounded-lg shadow animate-pulse">
    <div class="h-6 bg-gray-300 rounded w-1/3 mb-4"></div>
    <div class="h-4 bg-gray-300 rounded w-full mb-2"></div>
    <div class="h-4 bg-gray-300 rounded w-5/6 mb-2"></div>
    <div class="h-4 bg-gray-300 rounded w-2/3"></div>
    <div class="mt-4 h-40 bg-gray-300 rounded"></div>
  </div>
</template>

<style scoped>
.animate-pulse {
  animation: pulse 1.5s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

@keyframes pulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
}
</style>
