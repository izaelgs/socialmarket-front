<template>
  <div class="border border-gray-200 dark:border-gray-700 rounded-md">
    <button
      @click="toggleProductsDropdown"
      class="w-full flex justify-between items-center p-4 text-left focus:outline-none"
    >
      <span class="text-lg font-medium text-gray-700 dark:text-gray-200">Store Products</span>
      <svg
        class="w-5 h-5 transition-transform duration-200"
        :class="{ 'transform rotate-180': isProductsOpen }"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
      </svg>
    </button>
    <div v-show="isProductsOpen" class="p-4 border-t border-gray-200 dark:border-gray-700">
      <div class="mb-4 flex justify-between items-center">
        <h3 class="text-lg font-medium text-gray-700 dark:text-gray-200">Product List</h3>
        <button
          @click="addNewProduct"
          class="rounded-md bg-green-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
        >
          Add New Product
        </button>
      </div>
      <div class="space-y-4">
        <div v-for="product in products" :key="product.id" class="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-md">
          <div>
            <h4 class="text-md font-medium text-gray-700 dark:text-gray-200">{{ product.name }}</h4>
            <p class="text-sm text-gray-500 dark:text-gray-400">Price: ${{ product.price.toFixed(2) }}</p>
          </div>
          <div class="space-x-2">
            <button
              @click="editProduct(product)"
              class="inline-flex items-center rounded-md px-3 py-2 text-sm font-semibold shadow-sm ring-1 ring-inset dark:ring-gray-700 ring-gray-300 hover:bg-gray-50"
            >
              Edit
            </button>
            <button
              @click="deleteProduct(product)"
              class="inline-flex items-center rounded-md px-3 py-2 text-sm font-semibold shadow-sm ring-1 ring-inset dark:ring-gray-700 ring-gray-300 hover:bg-gray-50"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, defineProps } from 'vue'

defineProps<{
  storeId: number
}>()

const isProductsOpen = ref(false)
const products = ref([
  { id: 1, name: 'Product 1', price: 19.99 },
  { id: 2, name: 'Product 2', price: 29.99 },
  { id: 3, name: 'Product 3', price: 39.99 },
])

const toggleProductsDropdown = () => {
  isProductsOpen.value = !isProductsOpen.value
}

const addNewProduct = () => {
  // Implement add new product logic
  console.log('Add new product')
}

const editProduct = (product) => {
  // Implement edit product logic
  console.log('Edit product', product)
}

const deleteProduct = (product) => {
  // Implement delete product logic
  console.log('Delete product', product)
}
</script>