<template>
  <nav
    class="fixed top-0 left-0 h-screen w-16 m-0 flex flex-col justify-between items-center bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white shadow"
  >
    <ul>
      <SideBarIcon path="/dashboard" icon="material-symbols:house-rounded" tooltip="Home" />
      <SideBarIcon
        path="/dashboard/edit-profile"
        icon="material-symbols:manage-accounts-rounded"
        tooltip="Edit Profile"
      />
      <SideBarIcon path="/dashboard/manage-stores" icon="mdi:store-cog" tooltip="Manage Stores" />
      <SideBarIcon path="/dashboard/recent-products" icon="mdi:history" tooltip="Recent Products" />
    </ul>
    <div>
      <div class="sidebar-icon group cursor-pointer">
        <router-link to="/dashboard/cart" class="dark:text-gray-100 text-gray-900">
          <Icon icon="mdi:cart" />
        </router-link>
        <span v-if="cart.products.length > 0" class="absolute top-0 right-0 rounded-full bg-green-600 text-white text-xs w-5 h-5 flex items-center justify-center">
          {{ cart.products.length }}
        </span>
        <span class="sidebar-tooltip group-hover:scale-100">Cart</span>
      </div>
      <div class="sidebar-icon group cursor-pointer" @click="toggleDarkMode">
        <div class="dark:text-gray-100 text-gray-900">
          <Icon v-if="darkMode" icon="material-symbols:light-mode" />
          <Icon v-else icon="material-symbols:mode-night" />
        </div>
        <span class="sidebar-tooltip group-hover:scale-100">{{
          darkMode ? 'Ligth Mode' : 'Dark Mode'
        }}</span>
      </div>
      <div class="sidebar-icon group cursor-pointer" @click="handleLogout">
        <div class="dark:text-gray-100 text-gray-900">
          <Icon icon="material-symbols:logout" />
        </div>
        <span class="sidebar-tooltip group-hover:scale-100">Logout</span>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import SideBarIcon from '@/layouts/app/SideBarIcon.vue'
import useThemeStorage from '@/stores/ThemeStorage'
import { computed } from 'vue'
import { Icon } from '@iconify/vue'
import { useAxiosStore } from '@/services/axiosStore'
import { useUserStore } from '@/services/userStore'
import { useRouter } from 'vue-router'
import { useCart } from '@/composables/useCart'

const cart = useCart()
const axios = useAxiosStore()
const router = useRouter()
const { clearUser } = useUserStore()

const { toggleDarkMode } = useThemeStorage()
const darkMode = computed({
  get() {
    return useThemeStorage().darkMode
  },
  set(val) {
    useThemeStorage().darkMode = val
  }
})

const handleLogout = async () => {
  await axios.get('/auth/logout')
  clearUser()
  router.push('/')
}
</script>
