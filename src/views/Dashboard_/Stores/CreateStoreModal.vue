<template>
  <div v-if="visible" class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
    <div class="bg-white dark:bg-slate-900 p-6 rounded-md shadow-md">
      <h2 class="text-lg font-semibold mb-4">Create Store</h2>
      <form @submit.prevent="createStore">
        <div class="mb-4">
          <label for="name" class="block text-sm font-medium text-gray-700 dark:text-gray-200"
            >Store Name</label
          >
          <input
            v-model="store.name"
            type="text"
            id="name"
            class="mt-1 transparent-input"
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
          <label
            for="description"
            class="block text-sm font-medium text-gray-700 dark:text-gray-200"
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
            type="button"
            @click="closeModal"
            class="mr-2 rounded-md bg-gray-300 px-4 py-2 text-sm font-semibold text-gray-700 dark:text-gray-200 shadow-sm hover:bg-gray-200"
          >
            Cancel
          </button>
          <button
            type="submit"
            class="rounded-md bg-green-600 px-5 py-1 text-sm font-semibold text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
            :class="isCreating ? 'cursor-not-allowed' : 'cursor-pointer'"
            :disabled="isCreating"
          >
            <template v-if="isCreating"><SpinnerComponent class="p-1" /></template>
            <template v-else>Create</template>
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useStoresStore } from '@/stores/StoresStore'
import { useUserStore } from '@/services/userStore'
import type { UserState } from '@/services/types/auth'
import { toast } from 'vue3-toastify'
import SpinnerComponent from '@/components/SpinnerComponent.vue'

defineProps<{ visible: boolean }>()
const emit = defineEmits(['close', 'create'])

const isCreating = ref<boolean>(false)

const store = ref({
  name: '',
  displayName: '',
  nameLink: '',
  description: '',
  cnpj: '',
  state: '',
  city: '',
  category: '',
  imgLink: ''
})

const storesStore = useStoresStore()
const user = useUserStore()

const closeModal = () => {
  emit('close')
}

const createStore = async () => {
  try {
    isCreating.value = true
    await storesStore.addStore(store.value, user as UserState)
    isCreating.value = false
    closeModal()

    store.value = {
      name: '',
      displayName: '',
      nameLink: '',
      description: '',
      cnpj: '',
      state: '',
      city: '',
      category: '',
      imgLink: ''
    }

    toast.success('Store created successfully.')
  } catch (error: any) {
    isCreating.value = false
    console.error('Error creating store:', error)

    if (Array.isArray(error.message)) {
      for (const message of error.message) {
        toast.error(message)
      }

      return
    }

    toast.error('Error creating store. Please try again later.')
  }
}

onMounted(() => {
  storesStore.fetchStores()
})
</script>
