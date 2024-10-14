<template>
  <ConfirmationModal
    :show="show"
    title="Delete product"
    message="Are you sure you want to delete this product? This action cannot be undone."
    confirm-button-text="Delete"
    :is-processing="isDeleting"
    type="danger"
    @confirm="confirmDelete"
    @cancel="cancel"
  />
</template>

<script setup lang="ts">
import ConfirmationModal from '@/components/ConfirmationModal.vue';

defineProps({
  show: Boolean,
  isDeleting: Boolean,
})

const emit = defineEmits(['confirm', 'cancel'])

const confirmDelete = () => {
  emit('confirm')
}

const cancel = () => {
  emit('cancel')
}
</script>
