<template>
  <div
    class="flex flex-col justify-center w-full p-4 border rounded-lg shadow dark:border-gray-700 mb-8 pt-2"
  >
    <div class="lg:flex lg:items-center lg:justify-between">
      <router-link :to="{ path: `manage-store/${props.store.id}` }" class="min-w-0 flex-1">
        <h2 class="text-2xl font-bold leading-7 sm:truncate sm:text-3xl sm:tracking-tight">
          {{ props.store.name }}
        </h2>
        <div class="mt-1 flex flex-col sm:mt-0 sm:flex-row sm:flex-wrap sm:space-x-6">
          <div class="mt-2 flex items-center text-sm text-gray-500">
            <svg
              class="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fill-rule="evenodd"
                d="M6 3.75A2.75 2.75 0 018.75 1h2.5A2.75 2.75 0 0114 3.75v.443c.572.055 1.14.122 1.706.2C17.053 4.582 18 5.75 18 7.07v3.469c0 1.126-.694 2.191-1.83 2.54-1.952.599-4.024.921-6.17.921s-4.219-.322-6.17-.921C2.694 12.73 2 11.665 2 10.539V7.07c0-1.321.947-2.489 2.294-2.676A41.047 41.047 0 016 4.193V3.75zm6.5 0v.325a41.622 41.622 0 00-5 0V3.75c0-.69.56-1.25 1.25-1.25h2.5c.69 0 1.25.56 1.25 1.25zM10 10a1 1 0 00-1 1v.01a1 1 0 001 1h.01a1 1 0 001-1V11a1 1 0 00-1-1H10z"
                clip-rule="evenodd"
              />
              <path
                d="M3 15.055v-.684c.126.053.255.1.39.142 2.092.642 4.313.987 6.61.987 2.297 0 4.518-.345 6.61-.987.135-.041.264-.089.39-.142v.684c0 1.347-.985 2.53-2.363 2.686a41.454 41.454 0 01-9.274 0C3.985 17.585 3 16.402 3 15.055z"
              />
            </svg>
            {{ props.store.category }}
          </div>
          <div class="mt-2 flex items-center text-sm text-gray-500">
            <svg
              class="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fill-rule="evenodd"
                d="M9.69 18.933l.003.001C9.89 19.02 10 19 10 19s.11.02.308-.066l.002-.001.006-.003.018-.008a5.741 5.741 0 00.281-.14c.186-.096.446-.24.757-.433.62-.384 1.445-.966 2.274-1.765C15.302 14.988 17 12.493 17 9A7 7 0 103 9c0 3.492 1.698 5.988 3.355 7.584a13.731 13.731 0 002.273 1.765 11.842 11.842 0 00.976.544l.062.029.018.008.006.003zM10 11.25a2.25 2.25 0 100-4.5 2.25 2.25 0 000 4.5z"
                clip-rule="evenodd"
              />
            </svg>
            {{ props.store.state }} - {{ props.store.city }}
          </div>
          <div class="mt-2 flex items-center text-sm text-gray-500">
            <svg
              class="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fill-rule="evenodd"
                d="M5.75 2a.75.75 0 01.75.75V4h7V2.75a.75.75 0 011.5 0V4h.25A2.75 2.75 0 0118 6.75v8.5A2.75 2.75 0 0115.25 18H4.75A2.75 2.75 0 012 15.25v-8.5A2.75 2.75 0 014.75 4H5V2.75A.75.75 0 015.75 2zm-1 5.5c-.69 0-1.25.56-1.25 1.25v6.5c0 .69.56 1.25 1.25 1.25h10.5c.69 0 1.25-.56 1.25-1.25v-6.5c0-.69-.56-1.25-1.25-1.25H4.75z"
                clip-rule="evenodd"
              />
            </svg>
            Created at {{ new Date(props.store.createdAt ?? '').toLocaleString() }}
          </div>
        </div>
      </router-link>
      <div class="mt-5 flex lg:ml-4 lg:mt-0">
        <router-link :to="{ path: `manage-store/${props.store.id}` }" class="hidden sm:block">
          <button
            type="button"
            class="inline-flex items-center rounded-md px-3 py-2 text-sm font-semibold shadow-sm ring-1 ring-inset dark:ring-gray-700 ring-gray-300 hover:bg-gray-50"
          >
            <svg
              class="-ml-0.5 mr-1.5 h-5 w-5 text-gray-400"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                d="M2.695 14.763l-1.262 3.154a.5.5 0 00.65.65l3.155-1.262a4 4 0 001.343-.885L17.5 5.5a2.121 2.121 0 00-3-3L3.58 13.42a4 4 0 00-.885 1.343z"
              />
            </svg>
            Edit
          </button>
        </router-link>

        <span class="ml-3 hidden sm:block">
          <button
            type="button"
            class="inline-flex items-center rounded-md px-3 py-2 text-sm font-semibold shadow-sm ring-1 ring-inset dark:ring-gray-700 ring-gray-300 hover:bg-gray-50"
          >
            <svg
              class="-ml-0.5 mr-1.5 h-5 w-5 text-gray-400"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                d="M12.232 4.232a2.5 2.5 0 013.536 3.536l-1.225 1.224a.75.75 0 001.061 1.06l1.224-1.224a4 4 0 00-5.656-5.656l-3 3a4 4 0 00.225 5.865.75.75 0 00.977-1.138 2.5 2.5 0 01-.142-3.667l3-3z"
              />
              <path
                d="M11.603 7.963a.75.75 0 00-.977 1.138 2.5 2.5 0 01.142 3.667l-3 3a2.5 2.5 0 01-3.536-3.536l1.225-1.224a.75.75 0 00-1.061-1.06l-1.224 1.224a4 4 0 105.656 5.656l3-3a4 4 0 00-.225-5.865z"
              />
            </svg>
            View
          </button>
        </span>

        <span class="ml-3 hidden sm:block">
          <button
            type="button"
            @click="openDeleteConfirmationModal"
            class="inline-flex items-center rounded-md px-3 py-2 text-sm font-semibold shadow-sm ring-1 ring-inset dark:ring-gray-700 ring-gray-300 hover:bg-gray-50"
          >
            <svg
              class="-ml-0.5 mr-1.5 h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fill-rule="evenodd"
                d="M8.75 1A2.75 2.75 0 006 3.75v.443c-.795.077-1.584.176-2.365.298a.75.75 0 10.23 1.482l.149-.022.841 10.518A2.75 2.75 0 007.596 19h4.807a2.75 2.75 0 002.742-2.53l.841-10.52.149.023a.75.75 0 00.23-1.482A41.03 41.03 0 0014 4.193V3.75A2.75 2.75 0 0011.25 1h-2.5zM10 4c.84 0 1.673.025 2.5.075V3.75c0-.69-.56-1.25-1.25-1.25h-2.5c-.69 0-1.25.56-1.25 1.25v.325C8.327 4.025 9.16 4 10 4zM8.58 7.72a.75.75 0 00-1.5.06l.3 7.5a.75.75 0 101.5-.06l-.3-7.5zm4.34.06a.75.75 0 10-1.5-.06l-.3 7.5a.75.75 0 101.5.06l.3-7.5z"
                clip-rule="evenodd"
              />
            </svg>
            Delete
          </button>
        </span>

        <!-- Dropdown -->
        <div class="relative ml-3 sm:hidden">
          <button
            type="button"
            class="inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset dark:ring-gray-700 ring-gray-300 hover:ring-gray-400"
            id="mobile-menu-button"
            aria-expanded="false"
            aria-haspopup="true"
          >
            More
            <svg
              class="-mr-1 ml-1.5 h-5 w-5 text-gray-400"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fill-rule="evenodd"
                d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                clip-rule="evenodd"
              />
            </svg>
          </button>
          <!-- Add dropdown menu items -->
          <div
            class="absolute right-0 z-10 mt-2 -mr-1 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="mobile-menu-button"
            tabindex="-1"
          >
            <router-link
              :to="{ path: `manage-store/${props.store.id}` }"
              class="block px-4 py-2 text-sm text-gray-700"
              role="menuitem"
              tabindex="-1"
              >Edit</router-link
            >
            <a href="#" class="block px-4 py-2 text-sm text-gray-700" role="menuitem" tabindex="-1"
              >View</a
            >
            <a
              href="#"
              @click.prevent="openDeleteConfirmationModal"
              class="block px-4 py-2 text-sm"
              role="menuitem"
              tabindex="-1"
              >Delete</a
            >
          </div>
        </div>
      </div>
    </div>

    <DeleteConfirmationModal
      :show="showDeleteConfirmationModal"
      :isDeleting="isDeleting"
      :isComment="isComment"
      @confirm="confirmDelete"
      @cancel="closeDeleteConfirmationModal"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useStoresStore, type Store } from '@/stores/StoresStore'
import DeleteConfirmationModal from './DeleteConfirmationModal.vue'

const props = defineProps<{
  store: Store
  isComment?: boolean
}>()

const postsStore = useStoresStore()

const showDeleteConfirmationModal = ref<boolean>(false)

const isDeleting = ref<boolean>(false)

const closeDeleteConfirmationModal = () => {
  showDeleteConfirmationModal.value = false
}

const confirmDelete = async () => {
  try {
    isDeleting.value = true
    await postsStore.removeStore(props.store.id)
    closeDeleteConfirmationModal()
    isDeleting.value = false
  } catch (error) {
    console.error('Error deleting post:', error)
    isDeleting.value = false
  }
}

const openDeleteConfirmationModal = () => {
  showDeleteConfirmationModal.value = true
}
</script>

<style scoped>
.dz-preview {
  z-index: 9;
  width: 100%;
  height: 100%;
  overflow: hidden;
  position: relative;
}

.dz-image,
.dz-image img {
  width: 100%;
  position: absolute;
}
</style>
