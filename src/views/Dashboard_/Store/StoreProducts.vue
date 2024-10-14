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
        <path
          fill-rule="evenodd"
          d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
          clip-rule="evenodd"
        />
      </svg>
    </button>
    <div v-show="isProductsOpen" class="p-4 border-t border-gray-200 dark:border-gray-700">
      <div class="mb-4 flex justify-between items-center">
        <h3 class="text-lg font-medium text-gray-700 dark:text-gray-200">Product List</h3>
        <button
          @click="openAddProductModal"
          class="rounded-md bg-green-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
        >
          Add New Product
        </button>
      </div>
      <div class="space-y-4">
        <div
          v-for="product in store.products"
          :key="product.id"
          class="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-md"
        >
          <div>
            <h4 class="text-md font-medium text-gray-700 dark:text-gray-200">{{ product.name }}</h4>
            <p class="text-sm text-gray-500 dark:text-gray-400">
              Price:
              {{
                Number(product.price).toLocaleString(undefined, {
                  style: 'currency',
                  currency: 'BRL'
                })
              }}
            </p>
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

  <ProductModal
    :is-open="isModalOpen"
    :product-to-edit="productToEdit"
    title="Add New Product"
    @close="closeModal"
    @save="saveNewProduct"
  />

  <ConfirmationModal
    :show="isDeleteModalOpen"
    title="Delete Product"
    message="Are you sure you want to delete this product? This action cannot be undone."
    confirm-button-text="Delete"
    :is-processing="isDeletingProduct"
    icon="mdi:delete-forever-outline"
    type="danger"
    @confirm="confirmDeleteProduct"
    @cancel="cancelDeleteProduct"
  />
</template>

<script setup lang="ts">
import { ref, defineProps } from 'vue'
import { useStoresStore, type Store } from '@/stores/StoresStore'
import { useProductsStore, type Product } from '@/stores/ProductsStore'
import ProductModal from './modals/ProductModal.vue'
import ConfirmationModal from '@/components/ConfirmationModal.vue'

const props = defineProps<{
  store: Store
}>()

const productsStore = useProductsStore()
const storesStore = useStoresStore()

const isProductsOpen = ref(false)
const isModalOpen = ref(false)

const productToEdit = ref<Product | null>(null)

const toggleProductsDropdown = () => {
  isProductsOpen.value = !isProductsOpen.value
}

const openAddProductModal = () => {
  isModalOpen.value = true
}

const closeModal = () => {
  isModalOpen.value = false
}

const saveNewProduct = async (productData: Product) => {
  try {
    let updatedProduct: Product | undefined

    if (productToEdit.value && productToEdit.value.id) {
      updatedProduct = await productsStore.updateProduct({
        ...productToEdit.value,
        ...productData,
        price: Number(productData.price),
        rating: Number(productData.rating)
      })

      const updatedProducts = props.store.products?.map((p) =>
        p.id === updatedProduct?.id ? updatedProduct : p
      )
      storesStore.updateStore({ ...props.store, products: updatedProducts })
    } else {
      updatedProduct = await productsStore.addProduct({ ...productData, storeId: props.store.id })

      updatedProduct &&
        storesStore.updateStore({
          ...props.store,
          products: props.store.products
            ? [...props.store.products, updatedProduct]
            : [updatedProduct]
        })
    }
    closeModal()
    productToEdit.value = null // Reset productToEdit after saving
  } catch (error) {
    console.error('Error saving product:', error)
  }
}

const editProduct = (product: Product) => {
  productToEdit.value = { ...product } // Create a copy of the product
  isModalOpen.value = true
}

const deleteProduct = (product: Product) => {
  productToDelete.value = product
  isDeleteModalOpen.value = true
}

const isDeleteModalOpen = ref(false)
const isDeletingProduct = ref(false)
const productToDelete = ref<Product | null>(null)

const confirmDeleteProduct = async () => {
  if (productToDelete.value) {
    isDeletingProduct.value = true
    try {
      await productsStore.removeProduct(productToDelete.value.id)
      // Remove the product from the store's products array
      const updatedProducts = props.store.products?.filter(
        (p) => p.id !== productToDelete.value?.id
      )
      await storesStore.updateStore({ ...props.store, products: updatedProducts })
    } catch (error) {
      console.error('Error deleting product:', error)
    } finally {
      isDeletingProduct.value = false
      isDeleteModalOpen.value = false
      productToDelete.value = null
    }
  }
}

const cancelDeleteProduct = () => {
  isDeleteModalOpen.value = false
  productToDelete.value = null
}
</script>
