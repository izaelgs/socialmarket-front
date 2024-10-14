<template>
  <div class="recent-products">
    <h1>Recently Added Products</h1>
    <div v-if="loading" class="products-grid">
      <SkeletonProductCard v-for="n in 8" :key="n" />
    </div>
    <div v-else-if="error" class="error-message">{{ error }}</div>
    <div v-else class="products-grid">
      <ProductCard v-for="product in recentProducts" :key="product.id" :product="product" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineComponent, onMounted } from 'vue';
import { useProductsStore } from '@/stores/ProductsStore';
import { storeToRefs } from 'pinia';
import ProductCard from '@/components/ProductCard.vue';
import SkeletonProductCard from '@/components/SkeletonProductCard.vue';

const productsStore = useProductsStore();
const { recentProducts, loading, error } = storeToRefs(productsStore);

defineComponent({
  name: 'RecentProductsIndex'
})

onMounted(() => {
  productsStore.fetchRecentProducts();
});
</script>

<style scoped>
.recent-products {
  padding: 20px;
}

.products-grid {
  @apply grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4;
}

.error-message {
  color: #ff0000;
  font-weight: bold;
  text-align: center;
  margin-top: 20px;
}
</style>
