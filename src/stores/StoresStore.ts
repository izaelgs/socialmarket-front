import { defineStore } from 'pinia'
import { ref } from 'vue'
import { toast } from 'vue3-toastify'
import { useAxiosStore } from '@/services/axiosStore'
import type { User, UserState } from '@/services/types/auth'

export interface Store {
  id: number;
  name: string;
  displayName: string;
  nameLink: string;
  description?: string;
  cnpj: string;
  state: string;
  city: string;
  category: string;
  imgLink?: string;
  creatorId: number;
  createdAt?: Date;
  updatedAt?: Date;
  creator: UserState;
  // associates?: Associate[];
  // products?: Product[];
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

  const addStore = async (store: {
    name?: string
    displayName?: string
    nameLink?: string
    description?: string
    cnpj?: string
    state?: string
    city?: string
    category?: string
    imgLink?: string
  }, creator: UserState) => {
    const form = new FormData()

    Object.entries(store).forEach(([key, value]) => {
      if (value) {
        if (key === 'referenceStoreId' && typeof value === 'string') {
          form.append(key, parseInt(value).toString())
        } else {
          form.append(key, value)
        }
      }
    })

    const data = await axios.post<Store>('store', form, {
      headers: {
        'content-type': 'multipart/form-data'
      }
    })

    stores.value.unshift({ ...data, creator })
  }

  const updateStore = async (updatedStore: Partial<Store> & { id: number }) => {
    const data = await axios.patch<Store>('store/' + updatedStore.id, updatedStore, {
      headers: {
        'Content-Type': 'application/json; charset=utf-8'
      }
    })

    stores.value = stores.value
      .map(store => store.id === updatedStore.id ? { ...store, ...data } : store);
  }

  const removeStore = async (storeId: number) => {
    await axios.delete<Store>('store/' + storeId);

    stores.value = stores.value.filter(store => store.id !== storeId);
  }

  return {
    stores,
    loading,
    error,
    fetchStores,
    addStore,
    updateStore,
    removeStore,
  }
})
