<template>
  <div v-if="show" class="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
    <div class="bg-gray-100 dark:bg-gray-900 rounded-lg p-6">
      <h2 class="text-lg font-semibold mb-4">{{ title }}</h2>
      <p class="mb-4">{{ message }}</p>
      <div class="flex justify-end">
        <button
          type="button"
          class="px-4 text-sm font-semibold leading-6 text-light-900"
          @click="onCancel"
        >
          Cancel
        </button>
        <button
          type="button"
          class="rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
          @click="onConfirm"
        >
          Confirm
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const show = ref(false)
const title = ref('')
const message = ref('')

function showModal(titleText: string, messageText: string): Promise<boolean> {
  return new Promise((resolve) => {
    title.value = titleText
    message.value = messageText
    show.value = true
    // Resolver a promessa com base na resposta do usuário
    const confirmListener = () => {
      resolve(true)
      hideModal()
    }
    const cancelListener = () => {
      resolve(false)
      hideModal()
    }
    document.addEventListener('confirm-modal', confirmListener)
    document.addEventListener('cancel-modal', cancelListener)
  })
}

function hideModal() {
  show.value = false
  title.value = ''
  message.value = ''
}

function onConfirm() {
  document.dispatchEvent(new Event('confirm-modal'))
}

function onCancel() {
  document.dispatchEvent(new Event('cancel-modal'))
}

defineExpose({
  showModal,
  hideModal
})
</script>

<style scoped>
/* Estilos do modal */
</style>
