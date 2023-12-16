<template>
  <AuthLayout title="Sign in to your account">
    <template #form>
      <form
      @submit.prevent="submit" class="space-y-6" action="#" method="POST">
        <div>
          <label for="email" class="label-text">Email address</label>
          <div class="mt-2">
            <input
              id="email"
              name="email"
              v-model="email"
              type="email"
              autocomplete="email"
              required
              class="input input-bordered w-full"
              :class="{'input-error': errors.includes('email')}"
              @input="errors.includes('email') && errors.splice(errors.indexOf('email'),1)"
            />
          </div>
        </div>

        <div>
          <div class="flex items-center justify-between">
            <label for="password" class="label-text">Password</label>
            <div class="text-sm">
              <a href="#" class="font-semibold text-indigo-600 hover:text-indigo-500"
                >Forgot password?</a
              >
            </div>
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
              :class="{'input-error': errors.includes('password')}"
              @input="errors.includes('password') && errors.splice(errors.indexOf('password'),1)"
            />
          </div>
        </div>

        <div>
          <button
            type="submit"
            class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Sign in
          </button>
        </div>
      </form>
    </template>

    <template #bottom>
      <p class="mt-10 text-center text-sm text-gray-500">
        Not a member?
        <router-link
          to="register"
          class="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
          >Create an account</router-link
        >
      </p>
    </template>
  </AuthLayout>
</template>

<script setup lang="ts">
import { ref, type Ref } from 'vue';
import { useAxiosStore } from '@/services/axios';
import { useRouter } from 'vue-router';

import AuthLayout from '@/layouts/AuthLayout.vue';
import { toast } from 'vue3-toastify';

const axiosStore = useAxiosStore()
const router = useRouter()

const email = ref('')
const password = ref('')

const isLoading = ref(false);
const errors: Ref<Array<string>> = ref([]);

const submit = async () => {
  isLoading.value = true;

  try {
    const result: any = await axiosStore.post('/auth/login', {
      email: email.value,
      password: password.value,
    })

    axiosStore.setToken(result.access_token);

    router.push('dashboard/');

    isLoading.value = false;
  } catch (error: any) {
    isLoading.value = false;

    if(error.message && Array.isArray(error.message)) {
      return error.message.forEach((err: string) => {
        const field = err.split(' ')[0];

        if(errors.value.includes(field))
          return;

        errors.value.push(field);
        toast.error(err);
      });
    } else {
      errors.value.push(...['email', 'password']);
      toast.error(error.message);
    }

    console.error('Error fetching data:', error);
  }
}
</script>
