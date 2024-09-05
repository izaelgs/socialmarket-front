<template>
  <div class="w-full">
    <div v-if="storesStore.loading">
      <ul>
        <li v-for="n in 5" :key="n" class="mb-2">
          <SkeletonStoreCard />
        </li>
      </ul>
    </div>
    <div v-else-if="storesStore.error">{{ storesStore.error }}</div>
    <ul v-else>
      <li v-for="store in storesStore.stores" :key="store.id" class="mb-2">
        <StoreCard :store="store" />
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useStoresStore } from '@/stores/StoresStore'
import StoreCard from './StoreCard.vue'
import SkeletonStoreCard from './SkeletonStoreCard.vue'

const storesStore = useStoresStore()

onMounted(() => {
  storesStore.fetchStores()
})
</script>
