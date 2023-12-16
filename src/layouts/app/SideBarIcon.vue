<template>
  <RouterLink :to="{name: props.path}" class="sidebar-icon group">
    <Icon :icon="props.icon" />

    <span class="sidebar-tooltip group-hover:scale-100"> {{ props.tooltip }} </span>
  </RouterLink>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router';
import { Icon } from '@iconify/vue';

const props = defineProps({
  path: {
    type: String,
    required: true,
  },
  icon: {
    type: String,
    required: true,
  },
  tooltip: {
    type: String,
    required: true,
  }
})
</script>
