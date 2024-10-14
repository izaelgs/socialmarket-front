<template>
  <div class="border border-gray-200 dark:border-gray-700 rounded-md">
    <button
      @click="toggleDropdown"
      class="w-full flex justify-between items-center p-4 text-left focus:outline-none"
    >
      <span class="text-lg font-medium text-gray-700 dark:text-gray-200">Edit Store Details</span>
      <svg
        class="w-5 h-5 transition-transform duration-200"
        :class="{ 'transform rotate-180': isOpen }"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path
          fill-rule="evenodd"
          d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
          clip-rule="evenodd"
        />
      </svg>
    </button>
    <div v-show="isOpen" class="p-4 border-t border-gray-200 dark:border-gray-700">
      <form @submit.prevent="persistUpdateStore">
        <div class="mb-4">
          <label for="name" class="block text-sm font-medium text-gray-700 dark:text-gray-200"
            >Store Name</label
          >
          <input
            v-model="storeData.name"
            type="text"
            id="name"
            class="mt-1 transparent-input text-gray-700 dark:text-gray-200"
            required
          />
        </div>
        <div class="mb-4">
          <label
            for="displayName"
            class="block text-sm font-medium text-gray-700 dark:text-gray-200"
            >Display Name</label
          >
          <input
            v-model="storeData.displayName"
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
            v-model="storeData.nameLink"
            type="text"
            id="nameLink"
            class="mt-1 transparent-input"
            required
          />
        </div>
        <div class="mb-4">
          <label
            for="description"
            class="block text-sm font-medium text-gray-700 dark:text-gray-200"
            >Description</label
          >
          <textarea
            v-model="storeData.description"
            id="description"
            class="mt-1 transparent-input"
            required
          ></textarea>
        </div>
        <div class="mb-4 grid grid-cols-2 gap-4">
          <div>
            <label for="cnpj" class="block text-sm font-medium text-gray-700 dark:text-gray-200"
              >CNPJ</label
            >
            <input
              v-model="storeData.cnpj"
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
              v-model="storeData.state"
              type="text"
              id="state"
              class="mt-1 transparent-input"
              required
            />
          </div>
        </div>
        <div class="mb-4 grid grid-cols-2 gap-4">
          <div>
            <label for="city" class="block text-sm font-medium text-gray-700 dark:text-gray-200"
              >City</label
            >
            <input
              v-model="storeData.city"
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
              v-model="storeData.category"
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
            v-model="storeData.imgLink"
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
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, defineProps, defineEmits } from 'vue'
import type { Store } from '@/stores/StoresStore'
import SpinnerComponent from '@/components/SpinnerComponent.vue'

const props = defineProps<{
  store: Store
}>()

const emit = defineEmits<{
  (e: 'update-store', store: Store): void
}>()

const isOpen = ref(false)
const isSaving = ref(false)

const storeData = ref({ ...props.store })

const toggleDropdown = () => {
  isOpen.value = !isOpen.value
}

const persistUpdateStore = async () => {
  isSaving.value = true
  try {
    emit('update-store', storeData.value)
  } finally {
    isSaving.value = false
  }
}
</script>
