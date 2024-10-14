import { defineStore } from 'pinia'
import { ref } from 'vue'
import { toast } from 'vue3-toastify'
import { useAxiosStore } from '@/services/axiosStore'
import type { UserState } from '@/services/types/auth'
import type { Product } from './ProductsStore'

export interface Store {
  id: number
  name: string
  displayName: string
  nameLink: string
  description?: string
  cnpj: string
  state: string
  city: string
  category: string
  imgLink?: string
  creatorId: number
  createdAt?: Date
  updatedAt?: Date
  creator: UserState
  // associates?: Associate[];
  products?: Product[]
}

export const useStoresStore = defineStore('stores', () => {
  const stores = ref<Store[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)

  const axios = useAxiosStore()

  const fetchStores = async () => {
    loading.value = true
    error.value = null

    try {
      const response = await axios.get<Store[]>('store/user')
      stores.value = response
    } catch (err: any) {
      error.value = err.message
      toast.error('Error fetching stores. Please try again later.')
    } finally {
      loading.value = false
    }
  }

  const fetchStore = async (storeId: number) => {
    try {
      loading.value = true
      const response = await axios.get<Store>(`store/${storeId}`)
      const fetchedStore = response

      // Update the store in the stores array if it exists
      const index = stores.value.findIndex((store) => store.id === storeId)
      if (index !== -1) {
        stores.value[index] = fetchedStore
      } else {
        // If the store doesn't exist in the array, add it
        stores.value.push(fetchedStore)
      }

      return fetchedStore
    } catch (err: any) {
      console.error('Error fetching store:', err)
      error.value = err.message
      toast.error('Error fetching store. Please try again later.')
      throw err
    } finally {
      loading.value = false
    }
  }

  const addStore = async (
    store: {
      name?: string
      displayName?: string
      nameLink?: string
      description?: string
      cnpj?: string
      state?: string
      city?: string
      category?: string
      imgLink?: string
    },
    creator: UserState
  ) => {
    const data = await axios.post<Store>('store', store)

    stores.value.unshift({ ...data, creator })

    return data
  }

  const persistUpdateStore = async (updatedStore: Partial<Store> & { id: number }) => {
    await axios.patch<Store>('store/' + updatedStore.id, updatedStore, {
      headers: {
        'Content-Type': 'application/json; charset=utf-8'
      }
    })

    stores.value = stores.value.map((store) =>
      store.id === updatedStore.id ? { ...store, ...updatedStore } : store
    )
  }

  const updateStore = (updatedStore: Partial<Store> & { id: number }) => {
    stores.value = stores.value.map((store) =>
      store.id == updatedStore.id ? { ...store, ...updatedStore } : store
    )
  }

  const removeStore = async (storeId: number) => {
    await axios.delete<Store>('store/' + storeId)

    stores.value = stores.value.filter((store) => store.id !== storeId)
  }

  return {
    stores,
    loading,
    error,
    fetchStores,
    fetchStore,
    addStore,
    updateStore,
    persistUpdateStore,
    removeStore
  }
})
