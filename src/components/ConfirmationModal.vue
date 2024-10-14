<template>
  <div
    v-if="show"
    class="relative z-10"
    aria-labelledby="modal-title"
    role="dialog"
    aria-modal="true"
  >
    <div
      class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
      aria-hidden="true"
    ></div>
    <div class="fixed inset-0 z-10 w-screen overflow-y-auto">
      <div class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
        <div
          class="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg"
        >
          <div class="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
            <div class="sm:flex sm:items-start">
              <div
                class="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full sm:mx-0 sm:h-10 sm:w-10"
                :class="iconBackgroundClass"
              >
                <Icon :icon="icon" class="h-6 w-6" :class="iconColorClass" />
              </div>
              <div class="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                <h3 class="text-base font-semibold leading-6 text-gray-900" id="modal-title">
                  {{ title }}
                </h3>
                <div class="mt-2">
                  <p class="text-sm text-gray-500">{{ message }}</p>
                </div>
              </div>
            </div>
          </div>
          <div class="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
            <button
              @click="confirm"
              type="button"
              class="inline-flex w-full justify-center rounded-md px-3 py-2 text-sm font-semibold text-white shadow-sm sm:ml-3 sm:w-auto"
              :class="confirmButtonClass"
              :disabled="isProcessing"
            >
              <template v-if="isProcessing">
                <SpinnerComponent class="p-1" />
              </template>
              <template v-else>
                {{ confirmButtonText }}
              </template>
            </button>
            <button
              @click="cancel"
              type="button"
              class="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
            >
              {{ cancelButtonText }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import SpinnerComponent from '@/components/SpinnerComponent.vue'
import { Icon } from '@iconify/vue/dist/iconify.js'

const props = defineProps({
  show: Boolean,
  title: String,
  message: String,
  confirmButtonText: {
    type: String,
    default: 'Confirm'
  },
  cancelButtonText: {
    type: String,
    default: 'Cancel'
  },
  isProcessing: Boolean,
  type: {
    type: String,
    default: 'mdi:alert',
    validator: (value: string) => ['danger', 'warning', 'info'].includes(value)
  },
  icon: {
    type: String,
    default: 'trash'
  }
})

const emit = defineEmits(['confirm', 'cancel'])

const confirm = () => emit('confirm')
const cancel = () => emit('cancel')

const iconBackgroundClass = computed(() => {
  switch (props.type) {
    case 'danger':
      return 'bg-red-100'
    case 'warning':
      return 'bg-yellow-100'
    case 'info':
      return 'bg-blue-100'
    default:
      return 'bg-gray-100'
  }
})

const iconColorClass = computed(() => {
  switch (props.type) {
    case 'danger':
      return 'text-red-600'
    case 'warning':
      return 'text-yellow-600'
    case 'info':
      return 'text-blue-600'
    default:
      return 'text-gray-600'
  }
})

const confirmButtonClass = computed(() => {
  switch (props.type) {
    case 'danger':
      return 'bg-red-600 hover:bg-red-500'
    case 'warning':
      return 'bg-yellow-600 hover:bg-yellow-500'
    case 'info':
      return 'bg-blue-600 hover:bg-blue-500'
    default:
      return 'bg-gray-600 hover:bg-gray-500'
  }
})
</script>
