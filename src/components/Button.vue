<template>
  <button
    class="flex w-full justify-center rounded-md bg-green-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
    :class="classes"
    @click="onClick"
  >
    {{ text }}
  </button>
</template>

<script setup lang="ts">
import { defineComponent } from 'vue'

defineComponent({
  name: 'ButtonComponent'
})

defineProps<{
  text: string
  classes: string
}>()

const emit = defineEmits<{
  (e: 'click'): void
}>()

const onClick = () => {
  emit('click')
}
</script>
