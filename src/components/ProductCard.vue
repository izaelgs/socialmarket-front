<template>
  <div class="product-card">
    <img :src="product.imgLink || '/default-product-image.jpg'" :alt="product.name" class="product-image">
    <div class="product-info">
      <h3>{{ product.name }}</h3>
      <p class="store-name">{{ product.store.name }}</p>
      <p class="price">{{ formatPrice(product.price) }}</p>
      <p class="date">Added: {{ formatDate(String(product.createdAt)) }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';
import type { Product } from '@/stores/ProductsStore';

defineProps<{
  product: Product;
}>();

const formatPrice = (price: string) => {
  return `$${parseFloat(price).toFixed(2)}`;
};

const formatDate = (date: string) => {
  return new Date(date).toLocaleString();
};
</script>

<style scoped>
.product-card {
  @apply rounded-lg overflow-hidden shadow-md transition-transform duration-200 cursor-pointer;
}

.product-card:hover {
  transform: translateY(-5px);
}

.product-image {
  @apply w-full h-48 object-cover rounded-lg;
}

.product-info {
  padding: 15px;
}

h3 {
  margin: 0 0 10px;
  font-size: 1.2em;
}

p {
  margin: 5px 0;
}

.store-name {
  font-style: italic;
  color: #666;
}

.price {
  font-weight: bold;
  color: #007bff;
}

.date {
  font-size: 0.9em;
  color: #888;
}
</style>
