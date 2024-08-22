<template>
  <AuthLayout>
    <template #form>
      <form @submit.prevent="submit" class="space-y-6" action="#" method="POST">
        <div>
          <label
            for="email"
            class="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-100"
            >Password</label
          >
          <div class="mt-2">
            <input
              id="email"
              name="password"
              type="password"
              autocomplete="password"
              required
              class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6"
              placeholder="Enter your new password"
              v-model="password"
              :class="{ 'input-error': errors.includes('password') }"
              @input="errors.includes('password') && errors.splice(errors.indexOf('password'), 1)"
            />
          </div>
        </div>

        <div>
          <label
            for="email"
            class="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-100"
            >Confirm Password</label
          >
          <div class="mt-2">
            <input
              id="password-confirmation"
              name="password-confirmation"
              type="password"
              autocomplete="password-confirmation"
              required
              class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6"
              placeholder="Confirm your new password"
              v-model="passwordConfirmation"
              :class="{ 'input-error': errors.includes('passwordConfirmation') }"
              @input="errors.includes('passwordConfirmation') && errors.splice(errors.indexOf('passwordConfirmation'), 1)"
            />
          </div>
        </div>

        <div>
          <button
            type="submit"
            class="flex w-full justify-center rounded-md bg-green-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
            :disabled="isLoading"
          >
            Reset password
          </button>
        </div>
      </form>
    </template>
  </AuthLayout>
</template>

<script setup lang="ts">
import AuthLayout from '@/layouts/AuthLayout.vue'
import { useAxiosStore } from '@/services/axiosStore'
import { AxiosError } from 'axios'
import { ref, type Ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { toast } from 'vue3-toastify'

const axios = useAxiosStore()
const route = useRoute()
const router = useRouter()

const password = ref('')
const passwordConfirmation = ref('')

const isLoading = ref(false)
const errors: Ref<Array<string>> = ref([])

const submit = async () => {
  try {
    isLoading.value = true

    if (password.value.length < 8) {
      errors.value.push('password')
      isLoading.value = false
      return toast.error('Password must be larger than 8 digits.')
    }

    if(password.value !== passwordConfirmation.value) {
      errors.value.push('passwordConfirmation')
      isLoading.value = false
      return toast.error('Password and password confirmation must match.')
    }

    await axios.post('/auth/reset-password', { password: password.value, token: route.params.token})

    isLoading.value = false

    router.push('/login')
    toast.success('Password updated successfully.')
  } catch (error) {
    isLoading.value = false

    console.error(error)

    if (error instanceof AxiosError) {
      if(error.response?.status === 422) {
        errors.value.push(...['passwordConfirmation', 'password'])
        return toast.error('Invalid password, plase enter a valid password')
      } else if (error.response?.data.message) return toast.error(error.response.data.message)
    }
    toast.error('An error occurred. Please try again later.')
  }
}
</script>
