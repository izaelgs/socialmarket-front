<template>
  <div class="w-full">
    <div v-if="isLoading" class="flex justify-center items-center h-64">
      <SpinnerComponent class="w-12 h-12" />
    </div>
    <form v-else-if="store" @submit.prevent="updateStore">
      <div class="mb-4">
        <label for="name" class="block text-sm font-medium text-gray-700 dark:text-gray-200"
          >Store Name</label
        >
        <input v-model="store.name" type="text" id="name" class="mt-1 transparent-input" required />
      </div>
      <div class="mb-4">
        <label for="displayName" class="block text-sm font-medium text-gray-700 dark:text-gray-200"
          >Display Name</label
        >
        <input
          v-model="store.displayName"
          type="text"
          id="displayName"
          class="mt-1 transparent-input"
          required
        />
      </div>
      <div class="mb-4">
        <label for="nameLink" class="block text-sm font-medium text-gray-700 dark:text-gray-200"
          >Name Link</label
        >
        <input
          v-model="store.nameLink"
          type="text"
          id="nameLink"
          class="mt-1 transparent-input"
          required
        />
      </div>
      <div class="mb-4">
        <label for="description" class="block text-sm font-medium text-gray-700 dark:text-gray-200"
          >Description</label
        >
        <textarea
          v-model="store.description"
          id="description"
          class="mt-1 transparent-input"
          required
        ></textarea>
      </div>
      <div class="mb-4 grid grid-flow-col gap-4">
        <div>
          <label for="cnpj" class="block text-sm font-medium text-gray-700 dark:text-gray-200"
            >CNPJ</label
          >
          <input
            v-model="store.cnpj"
            type="text"
            id="cnpj"
            class="mt-1 transparent-input"
            required
          />
        </div>
        <div>
          <label for="state" class="block text-sm font-medium text-gray-700 dark:text-gray-200"
            >State</label
          >
          <input
            v-model="store.state"
            type="text"
            id="state"
            class="mt-1 transparent-input"
            required
          />
        </div>
      </div>
      <div class="mb-4 grid grid-flow-col gap-4">
        <div>
          <label for="city" class="block text-sm font-medium text-gray-700 dark:text-gray-200"
            >City</label
          >
          <input
            v-model="store.city"
            type="text"
            id="city"
            class="mt-1 transparent-input"
            required
          />
        </div>
        <div>
          <label for="category" class="block text-sm font-medium text-gray-700 dark:text-gray-200"
            >Category</label
          >
          <input
            v-model="store.category"
            type="text"
            id="category"
            class="mt-1 transparent-input"
            required
          />
        </div>
      </div>
      <div class="mb-4">
        <label for="imgLink" class="block text-sm font-medium text-gray-700 dark:text-gray-200"
          >Image Link</label
        >
        <input
          v-model="store.imgLink"
          type="text"
          id="imgLink"
          class="mt-1 transparent-input"
          required
        />
      </div>
      <div class="flex justify-end">
        <button
          type="submit"
          class="rounded-md bg-green-600 px-5 py-1 text-sm font-semibold text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
          :class="isSaving ? 'cursor-not-allowed' : 'cursor-pointer'"
          :disabled="isSaving"
        >
          <template v-if="isSaving"><SpinnerComponent class="p-1" /></template>
          <template v-else>Save</template>
        </button>
      </div>
    </form>
    <div v-else class="text-center text-gray-500 dark:text-gray-400">
      No store data available.
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { useRoute } from 'vue-router'
import { useStoresStore } from '@/stores/StoresStore'
import type { Store } from '@/stores/StoresStore'
import SpinnerComponent from '@/components/SpinnerComponent.vue'

const route = useRoute()
const storesStore = useStoresStore()

const store = ref<Store | null>(null)
const isSaving = ref(false)

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

const updateStore = async () => {
  if (store.value) {
    isSaving.value = true
    try {
      await storesStore.updateStore(store.value)
      // You can add a success message here if needed
    } catch (error) {
      console.error('Error updating store:', error)
      // You can add an error message here if needed
    } finally {
      isSaving.value = false
    }
  }
}

console.log('route.params.id', route.params.id)
</script>
