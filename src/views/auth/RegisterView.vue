<template>
  <AuthLayout title="Create an account">
    <template #form>
      <form @submit.prevent="submit" class="space-y-6" action="#" method="POST">
        <!-- Name -->
        <div>
          <label for="email" class="label-text">Name</label>
          <div class="mt-2">
            <input
              id="name"
              name="name"
              v-model="name"
              type="text"
              required
              class="input input-bordered w-full"
            />
          </div>
        </div>

        <!-- E-mail -->
        <div>
          <label for="email" class="label-text"
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
              class="input input-bordered w-full"
            />
          </div>
        </div>

        <!-- Password -->
        <div>
          <div class="flex items-center justify-between">
            <label for="password" class="label-text"
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
              class="input input-bordered w-full"
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
    </template>

    <template #bottom>
      <p class="mt-10 text-center text-sm text-gray-500">
        Already registered?
        <router-link
          to="login"
          class="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
          >Sign in</router-link
        >
      </p>
    </template>
  </AuthLayout>
</template>

<script setup lang="ts">
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
    const result: any = await axiosStore.post('/auth/register', {
      name: name.value,
      email: email.value,
      password: password.value,
      birthAt: new Date()
    });

    axiosStore.setToken(result.access_token)

    router.push('dashboard/complete-profile')
  } catch (error) {
    console.error('Error fetching data:', error)
  }
}
</script>
