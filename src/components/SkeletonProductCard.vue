<template>
  <div class="skeleton-product-card">
    <div class="skeleton-image"></div>
    <div class="skeleton-info">
      <div class="skeleton-text skeleton-title"></div>
      <div class="skeleton-text skeleton-store"></div>
      <div class="skeleton-text skeleton-price"></div>
      <div class="skeleton-text skeleton-date"></div>
    </div>
  </div>
</template>

<style scoped>
.skeleton-product-card {
  @apply rounded-lg overflow-hidden shadow-md transition-transform duration-200 cursor-pointer mb-4;
}

.skeleton-image {
  @apply w-52 h-48 object-cover rounded-lg bg-gray-300;
}

.skeleton-info {
  padding: 15px;
}

.skeleton-text {
  @apply h-4 bg-gray-300 rounded-md mb-2;
}

.skeleton-title {
  width: 80%;
}

.skeleton-store {
  width: 60%;
}

.skeleton-price {
  width: 40%;
}

.skeleton-date {
  width: 70%;
}

@keyframes shimmer {
  0% {
    background-position: -200% 0;
  }
  100% {
    background-position: 200% 0;
  }
}

.skeleton-text {
  background-image: linear-gradient(90deg, #e0e0e0 25%, #f0f0f0 50%, #e0e0e0 75%);
  background-size: 200% 100%;
  animation: shimmer 1.5s infinite;
}
</style>
