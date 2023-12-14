<template>
  <AuthLayout title="Create an account">
    <form @submit.prevent="submit" class="space-y-6" action="#" method="POST">
      <!-- Name -->
      <div>
        <label for="email" class="block text-sm font-medium leading-6 text-gray-900">Name</label>
        <div class="mt-2">
          <input
            id="name"
            name="name"
            v-model="name"
            type="text"
            required
            class="border px-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
        </div>
      </div>

      <!-- E-mail -->
      <div>
        <label for="email" class="block text-sm font-medium leading-6 text-gray-900"
          >Email address</label
        >
        <div class="mt-2">
          <input
            id="email"
            name="email"
            v-model="email"
            type="email"
            autocomplete="email"
            required
            class="border px-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
        </div>
      </div>

      <!-- Password -->
      <div>
        <div class="flex items-center justify-between">
          <label for="password" class="block text-sm font-medium leading-6 text-gray-900"
            >Password</label
          >
        </div>
        <div class="mt-2">
          <input
            id="password"
            name="password"
            v-model="password"
            type="password"
            autocomplete="current-password"
            required
            class="border px-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
        </div>
      </div>

      <div>
        <button
          type="submit"
          class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Register
        </button>
      </div>
    </form>
  </AuthLayout>
</template>

<script setup>
import { ref } from 'vue'
import { useAxiosStore } from '@/services/axios'
import { useRouter } from 'vue-router'

import AuthLayout from '@/layouts/AuthLayout.vue'

const axiosStore = useAxiosStore()
const router = useRouter()

const name = ref('')
const email = ref('')
const password = ref('')

const submit = async () => {
  try {
    const result = await axiosStore.post('/auth/register', {
      name: name.value,
      email: email.value,
      password: password.value,
      birthAt: new Date()
    })

    axiosStore.setToken(result.access_token)

    router.push('complete-profile')
  } catch (error) {
    console.error('Error fetching data:', error)
  }
}
</script>
