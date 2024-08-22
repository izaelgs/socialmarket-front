<template>
  <AuthLayout>
    <template #form>
      <form @submit.prevent="submit" class="space-y-6" action="#" method="POST">
        <div>
          <label
            for="email"
            class="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-100"
            >Email address</label
          >
          <div class="mt-2">
            <input
              id="email"
              name="email"
              type="email"
              autocomplete="email"
              required
              class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6"
              placeholder="Enter your email address"
              v-model="email"
              :class="{ 'input-error': errors.includes('email') }"
              @input="errors.includes('email') && errors.splice(errors.indexOf('email'), 1)"
            />
          </div>
        </div>

        <div>
          <button
            type="submit"
            class="flex w-full justify-center rounded-md bg-green-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
            :disabled="isLoading"
          >
            Send reset link
          </button>
        </div>
      </form>
    </template>
  </AuthLayout>
</template>

<script setup lang="ts">
import AuthLayout from '@/layouts/AuthLayout.vue'
import { useAxiosStore } from '@/services/axiosStore';
import { ref, type Ref } from 'vue'
import { useRouter } from 'vue-router';
import { toast } from 'vue3-toastify';

const axios = useAxiosStore()
const router = useRouter()

const email = ref('')

const isLoading = ref(false)
const errors: Ref<Array<string>> = ref([])

const submit = async () => {
  try {
    isLoading.value = true

    await axios.post('/auth/forgot-password', { email: email.value })

    isLoading.value = false

    toast.success('Password reset link sent. Please check your email.')
    router.push('/login')
  } catch (error) {
    isLoading.value = false
    console.error(error)
    toast.error('An error occurred. Please try again later.')
  }
}
</script>
