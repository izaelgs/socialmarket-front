<template>
  <AuthLayout title="Sign in to your account">
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
          <div class="flex items-center justify-between">
            <label
              for="password"
              class="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-100"
              >Password</label
            >
            <div class="text-sm">
              <button
                type="button"
                @click="handleResetPassword"
                class="font-semibold text-green-600 hover:text-green-500"
              >
                Forgot password?
              </button>
            </div>
          </div>
          <div class="mt-2">
            <input
              id="password"
              name="password"
              type="password"
              autocomplete="current-password"
              required
              class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6"
              :class="{ 'input-error': errors.includes('password') }"
              placeholder="Enter your password"
              v-model="password"
              @input="errors.includes('password') && errors.splice(errors.indexOf('password'), 1)"
            />
          </div>
        </div>

        <div>
          <button
            type="submit"
            class="flex w-full justify-center rounded-md bg-green-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
            :disabled="isLoading"
          >
            Sign in
          </button>
        </div>

        <div class="relative mt-4">
          <div class="absolute inset-0 flex items-center">
            <div class="w-full border-t border-gray-300 dark:border-gray-600"></div>
          </div>
          <div class="relative flex justify-center text-sm">
            <span class="bg-white dark:bg-gray-900 px-2 text-gray-500">Or continue with</span>
          </div>
        </div>

        <div>
          <button
            type="button"
            @click="handleGoogleLogin"
            class="flex w-full justify-center items-center gap-2 rounded-md bg-white px-3 py-1.5 text-sm font-semibold leading-6 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
            :disabled="isLoading"
          >
            <img
              src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/google/google-original.svg"
              alt="Google"
              class="w-5 h-5"
            />
            Sign in with Google
          </button>
        </div>
      </form>
    </template>

    <template #bottom>
      <p class="mt-10 text-center text-sm text-gray-500">
        Not a member?
        <router-link
          to="register"
          class="font-semibold leading-6 text-green-600 hover:text-green-500"
          >Create an account</router-link
        >
      </p>
    </template>
  </AuthLayout>
</template>

<script setup lang="ts">
import { ref, type Ref } from 'vue'
import { useAxiosStore } from '@/services/axiosStore'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/services/userStore'

import AuthLayout from '@/layouts/AuthLayout.vue'
import { toast } from 'vue3-toastify'

const axiosStore = useAxiosStore()
const router = useRouter()
const userStore = useUserStore()

const email = ref('')
const password = ref('')

const isLoading = ref(false)
const errors: Ref<Array<string>> = ref([])

const submit = async () => {
  isLoading.value = true

  try {
    const result: any = await axiosStore.post('/auth/login', {
      email: email.value,
      password: password.value
    })

    userStore.setUser(result.user)

    router.push('dashboard/')

    isLoading.value = false
  } catch (error: any) {
    isLoading.value = false

    console.error('Error fetching data:', error)

    if (error.message && Array.isArray(error.message)) {
      return error.message.forEach((err: string) => {
        const field = err.split(' ')[0]

        if (errors.value.includes(field)) return

        errors.value.push(field)
        toast.error(err)
      })
    } else if (error.message) {
      toast.error(error.message)
    } else {
      toast.error('An unknown error occurred. Please try again.')
    }

    errors.value.push(...['email', 'password'])
  }
}

const handleResetPassword = async () => {
  try {
    router.push('forgot-password')
  } catch (error) {
    console.error('Error fetching data:', error)
    toast.error('An unknown error occurred. Please try again.')
  }
}

const handleGoogleLogin = async () => {
  isLoading.value = true

  try {
    window.location.href = `${import.meta.env.VITE_BASE_URL}/auth/google`
  } catch (error: any) {
    console.error('Error initiating Google login:', error)
    toast.error('Failed to initiate Google login. Please try again.')
  } finally {
    isLoading.value = false
  }
}
</script>
