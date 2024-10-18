<template>
  <div class="product-card">
    <img :src="product.imgLink || '/default-product-image.jpg'" :alt="product.name" class="product-image">
    <div class="product-info">
      <h3>{{ product.name }}</h3>
      <p class="store-name">{{ product.store.name }}</p>
      <p class="price">{{ formatPrice(product.price) }}</p>
      <p class="date">Added: {{ formatDate(String(product.createdAt)) }}</p>
    </div>
    <Button v-if="!isInCart" text="Add to Cart" classes="w-full" @click="() => cart.addProduct(product)" />
    <Button v-else text="Remove from Cart" classes="w-full" @click="() => cart.removeProduct(product.id)" />
  </div>
</template>

<script setup lang="ts">
import { computed, defineProps } from 'vue';
import type { Product } from '@/stores/ProductsStore';
import { useCart } from '@/composables/useCart';
import Button from '@/components/Button.vue';

const cart = useCart();

const props = defineProps<{
  product: Product;
}>();

const isInCart = computed(() => cart.products.some(p => p.id === props.product.id));

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
  @apply text-lg;
}

p {
  margin: 5px 0;
}

.store-name {
  @apply italic text-gray-500;
}

.price {
  @apply font-bold text-green-600;
}

.date {
  @apply text-sm text-gray-500;
}
</style>
