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
              class="input input-bordered w-full"
              :class="{ 'input-error': errors.includes('name') }"
              @input="errors.splice(errors.indexOf('name'), 1)"
            />
          </div>
        </div>

        <!-- E-mail -->
        <div>
          <label for="email" class="label-text">Email address</label>
          <div class="mt-2">
            <input
              id="email"
              name="email"
              v-model="email"
              type="email"
              autocomplete="email"
              class="input input-bordered w-full"
              :class="{ 'input-error': errors.includes('email') }"
              @input="errors.includes('email') && errors.splice(errors.indexOf('email'), 1)"
            />
          </div>
        </div>

        <!-- Password -->
        <div>
          <div class="flex items-center justify-between">
            <label for="password" class="label-text">Password</label>
          </div>
          <div class="mt-2">
            <input
              id="password"
              name="password"
              v-model="password"
              type="password"
              autocomplete="current-password"
              class="input input-bordered w-full"
              :class="{ 'input-error': errors.includes('password') }"
              @input="errors.includes('password') && errors.splice(errors.indexOf('password'), 1)"
            />
          </div>
        </div>

        <div>
          <button
            type="submit"
            class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            :disabled="isLoading"
          >
            <template v-if="isLoading">
              Loading, please await :P
              <span class="loading loading-dots loading-xs m-1 mt-2"></span>
            </template>
            <template v-else> Register </template>
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
import { ref, type Ref } from 'vue'
import { useAxiosStore } from '@/services/axiosStore'
import { useRouter } from 'vue-router'

import AuthLayout from '@/layouts/AuthLayout.vue'
import { toast } from 'vue3-toastify'

import { type User } from '@/services/types/auth'
import { useUserStore } from '@/services/userStore'

const axiosStore = useAxiosStore()
const router = useRouter()
const userStore = useUserStore();

const name = ref('')
const email = ref('')
const password = ref('')

const isLoading = ref(false)
const errors: Ref<Array<string>> = ref([])

const submit = async () => {
  isLoading.value = true

  try {

    userStore.removeFromLocalStorage();

    const payload: User = {
      name: name.value,
      username: name.value,
      email: email.value,
      password: password.value,
      birthAt: new Date().toISOString().split('T')[0],
      about: '',
      photo: '',
      cover_photo : '',
    }

    const result: any = await axiosStore.post('/auth/register', payload)

    userStore.setUser(result.user);

    router.push('dashboard/edit-profile')

    isLoading.value = false
  } catch (error: any) {
    isLoading.value = false

    if (error.message && Array.isArray(error.message)) {
      return error.message.forEach((err: string) => {
        const field = err.split(' ')[0]

        if (errors.value.includes(field)) return

        errors.value.push(field)
        toast.error(err)
      })
    }

    toast.error(error.message)

    console.error('Error fetching data:', error)
  }
}
</script>
