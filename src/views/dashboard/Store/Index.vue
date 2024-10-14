<template>
  <div class="w-full">
    <div v-if="isLoading" class="flex justify-center items-center h-64">
      <SpinnerComponent class="w-12 h-12" />
    </div>
    <div v-else-if="store" class="space-y-6">
      <EditStoreDetails :store="store" @update-store="persistUpdateStore" />
      <StoreProducts :store="store" />
    </div>
    <div v-else class="text-center text-gray-500 dark:text-gray-400">No store data available.</div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed, defineComponent, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useStoresStore } from '@/stores/StoresStore'
import type { Store } from '@/stores/StoresStore'
import SpinnerComponent from '@/components/SpinnerComponent.vue'
import EditStoreDetails from './EditStoreDetails.vue'
import StoreProducts from './StoreProducts.vue'

defineComponent({
  name: 'StoreIndex'
})

const route = useRoute()
const storesStore = useStoresStore()

const store = ref<Store | null>(null)
const isLoading = computed(() => storesStore.loading)

const fetchStoreData = async () => {
  const storeId = Number(route.params.id)

  if (!isNaN(storeId)) {
    try {
      store.value = await storesStore.fetchStore(storeId)
    } catch (error) {
      console.error('Error fetching store:', error)
    }
  }
}

onMounted(fetchStoreData)

const persistUpdateStore = async (updatedStore: Store) => {
  try {
    await storesStore.persistUpdateStore(updatedStore)
    store.value = updatedStore
    // You can add a success message here if needed
  } catch (error) {
    console.error('Error updating store:', error)
    // You can add an error message here if needed
  }
}

watch(
  () => storesStore.stores,
  (newStores) => {
    const updatedStore = newStores.find((s) => s.id == Number(route.params.id))

    if (updatedStore) {
      store.value = updatedStore
    }
  },
  { deep: true }
)
</script>
