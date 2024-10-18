import { ref, computed, watch } from 'vue'
import { defineStore } from 'pinia'
import type { Product } from '@/stores/ProductsStore'

export const useCart = defineStore('cart', () => {
  const products = ref<Product[]>([])

  // Load initial state from localStorage
  const storedProducts = localStorage.getItem('cartProducts')
  
  if (storedProducts) {
    products.value = JSON.parse(storedProducts)
  }

  // Watch for changes and update localStorage
  watch(
    products,
    (newProducts) => {
      localStorage.setItem('cartProducts', JSON.stringify(newProducts))
    },
    { deep: true }
  )

  const addProduct = (product: Product) => {
    const existingProduct = products.value.find(i => i.id === product.id)

    if (!existingProduct) {
      products.value.push(product)
    }
  }

  const removeProduct = (id: number) => {
    const index = products.value.findIndex(product => product.id === id)
    if (index !== -1) {
      products.value.splice(index, 1)
    }
  }

  const clearCart = () => {
    products.value = []
  }

  const totalProducts = computed(() => {
    return products.value.length
  })

  const totalPrice = computed(() => {
    return products.value.reduce((total, product) => total + Number(product.price), 0)
  })

  return {
    products,
    addProduct,
    removeProduct,
    clearCart,
    totalProducts,
    totalPrice,
  }
})
