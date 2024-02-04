<template>
  <div :class="darkMode ? 'dark' : null">
    <RouterView />
  </div>
</template>

<script setup lang="ts">
import useThemeStorage from '@/stores/ThemeStorage'
import { computed } from 'vue';

const darkMode = computed({
  get() { return useThemeStorage().darkMode },
  set(val) { useThemeStorage().darkMode = val }
})

import 'vue3-toastify/dist/index.css'
</script>
