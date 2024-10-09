<template>
  <div class="w-full">
    <button
      @click="isCreateStoreModalVisible = true"
      class="rounded-md bg-green-600 px-5 py-1 text-sm font-semibold text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600 cursor-pointer mb-4"
    >
      Create
    </button>

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

    <CreateStoreModal :visible="isCreateStoreModalVisible" @close="isCreateStoreModalVisible = false" @create="isCreateStoreModalVisible = false" />
  </div>
</template>

<script setup lang="ts">
import { defineComponent, onMounted, ref } from 'vue'
import { useStoresStore } from '@/stores/StoresStore'
import StoreCard from './StoreCard.vue'
import SkeletonStoreCard from './SkeletonStoreCard.vue'
import CreateStoreModal from './CreateStoreModal.vue'

defineComponent({
  name: 'StoresIndex',
})

defineEmits(['close', 'create'])

const isCreateStoreModalVisible = ref(false)

const storesStore = useStoresStore()

onMounted(() => {
  storesStore.fetchStores()
})
</script>
