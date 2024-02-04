<template>
  <nav class="
    fixed top-0 left-0 h-screen w-16 m-0 flex flex-col
    bg-gray-100 dark:bg-gray-900
    text-gray-900 dark:text-white
    shadow
  ">
    <ul>
      <SideBarIcon path="./" icon="material-symbols:house-rounded" tooltip="Home" />
      <SideBarIcon path="edit-profile" icon="material-symbols:manage-accounts-rounded" tooltip="Edit Profile" />
      <div class="sidebar-icon group cursor-pointer" @click="toggleDarkMode">
        <div class="dark:text-gray-100 text-gray-900">
          <Icon v-if="darkMode" icon="material-symbols:light-mode" />
          <Icon v-else icon="material-symbols:mode-night" />
        </div>
        <span class="sidebar-tooltip group-hover:scale-100">{{ darkMode ? 'Ligth Mode' : 'Dark Mode'}}</span>
      </div>
    </ul>
  </nav>
</template>

<script setup lang="ts">
import SideBarIcon from '@/layouts/app/SideBarIcon.vue';
import useThemeStorage from '@/stores/ThemeStorage';
import { computed } from 'vue';
import { Icon } from '@iconify/vue';

const { toggleDarkMode } = useThemeStorage();
const darkMode = computed({
  get() { return useThemeStorage().darkMode },
  set(val) { useThemeStorage().darkMode = val }
})
</script>