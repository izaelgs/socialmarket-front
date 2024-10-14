import { defineStore } from 'pinia'
import { ref } from 'vue'
import { toast } from 'vue3-toastify'
import { useAxiosStore } from '@/services/axiosStore'
import type { Store } from './StoresStore'
import { AxiosError } from 'axios'

export interface Product {
  id: number
  name: string
  category: string
  price: string
  quantityAvailable: number
  rating: number
  imgLink?: string
  storeId: number
  store: Store
  createdAt: Date
  updatedAt: Date
}

export interface ProductData {
  name: string
  category: string
  price: number
  quantityAvailable: number
  rating: number
  imgLink?: string
  storeId: number
}

export const useProductsStore = defineStore('products', () => {
  const products = ref<Product[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)

  const axios = useAxiosStore()

  const fetchProducts = async (storeId: number) => {
    loading.value = true
    error.value = null

    try {
      const response = await axios.get<Product[]>(`products/store/${storeId}`)
      products.value = response
    } catch (err: any) {
      error.value = err.message
      toast.error('Error fetching products. Please try again later.')
    } finally {
      loading.value = false
    }
  }

  const fetchProduct = async (productId: number) => {
    try {
      loading.value = true
      const response = await axios.get<Product>(`product/${productId}`)
      const fetchedProduct = response

      // Update the product in the products array if it exists
      const index = products.value.findIndex((product) => product.id === productId)
      if (index !== -1) {
        products.value[index] = fetchedProduct
      } else {
        // If the product doesn't exist in the array, add it
        products.value.push(fetchedProduct)
      }

      return fetchedProduct
    } catch (err: any) {
      console.error('Error fetching product:', err)
      error.value = err.message
      toast.error('Error fetching product. Please try again later.')
      throw err
    } finally {
      loading.value = false
    }
  }

  const addProduct = async (product: {
    name: string
    category: string
    price: string
    quantityAvailable: number
    rating: number
    imgLink?: string
    storeId: number
  }) => {
    try {
      const data = await axios.post<Product>('products', product)
      products.value.unshift(data)

      return data
    } catch (err: any) {
      error.value = err.message
      if (err instanceof AxiosError) {
        Array.isArray(err.response?.data.message)
          ? err.response?.data.message.forEach((message: string) => toast.error(message))
          : toast.error(err.response?.data.message)
      } else toast.error(err.message)
    }
  }

  const updateProduct = async (updatedProduct: Partial<ProductData> & { id: number }) => {
    const data = await axios.patch<Product>(`products/${updatedProduct.id}`, updatedProduct, {
      headers: {
        'Content-Type': 'application/json; charset=utf-8'
      }
    })

    products.value = products.value.map((product) =>
      product.id == updatedProduct.id ? { ...product, ...data } : product
    )

    return data
  }

  const removeProduct = async (productId: number) => {
    await axios.delete<Product>(`products/${productId}`)
    products.value = products.value.filter((product) => product.id !== productId)

    return productId
  }

  return {
    products,
    loading,
    error,
    fetchProducts,
    fetchProduct,
    addProduct,
    updateProduct,
    removeProduct
  }
})
