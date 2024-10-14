<template>
  <div
    v-if="isOpen"
    class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center"
    style="margin-top: 0 !important"
  >
    <div
      class="relative p-4 bg-white dark:bg-gray-800 w-full max-w-md m-auto rounded-xl shadow-lg text-center"
    >
      <h3 class="text-lg leading-6 font-medium text-gray-900 dark:text-gray-100">{{ title }}</h3>
      <div class="mt-2">
        <form @submit.prevent="handleSubmit">
          <div class="mb-4">
            <label
              for="productName"
              class="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >Product Name</label
            >
            <input
              v-model="product.name"
              type="text"
              id="productName"
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              required
            />
          </div>
          <div class="mb-4">
            <label
              for="productCategory"
              class="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >Category</label
            >
            <input
              v-model="product.category"
              type="text"
              id="productCategory"
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              required
            />
          </div>
          <div class="mb-4">
            <label
              for="productPrice"
              class="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >Price</label
            >
            <input
              v-model="product.price"
              type="number"
              id="productPrice"
              step="0.01"
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              required
            />
          </div>
          <div class="mb-4">
            <label
              for="productQuantity"
              class="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >Quantity Available</label
            >
            <input
              v-model="product.quantityAvailable"
              type="number"
              id="productQuantity"
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              required
            />
          </div>
          <div class="mb-4">
            <label
              for="productRating"
              class="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >Rating</label
            >
            <input
              v-model="product.rating"
              type="number"
              id="productRating"
              min="0"
              max="5"
              step="0.1"
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              required
            />
          </div>
          <div class="mb-4">
            <label
              for="productImage"
              class="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >Image Link</label
            >
            <input
              v-model="product.imgLink"
              type="text"
              id="productImage"
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />
          </div>
          <div class="flex justify-end mt-4">
            <button
              type="button"
              @click="closeModal"
              class="mr-2 px-4 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500"
            >
              Cancel
            </button>
            <button
              type="submit"
              class="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Product } from '@/stores/ProductsStore'
import { ref, defineProps, defineEmits, watch } from 'vue'

const props = defineProps<{
  isOpen: boolean
  title: string
  productToEdit: Product | null
}>()

const emit = defineEmits(['close', 'save'])

const product = ref<Partial<Product>>({
  name: '',
  category: '',
  price: '',
  quantityAvailable: 0,
  rating: 0,
  imgLink: ''
})

const closeModal = () => {
  emit('close')
}

const handleSubmit = () => {
  emit('save', {
    ...product.value
  })

  product.value = {
    name: '',
    category: '',
    price: '',
    quantityAvailable: 0,
    rating: 0,
    imgLink: ''
  }
}

watch(
  () => props.productToEdit,
  (newVal) => {
    if (newVal) product.value = { ...newVal }
    else
      product.value = {
        name: '',
        category: '',
        price: '',
        quantityAvailable: 0,
        rating: 0,
        imgLink: ''
      }
  }
)
</script>
