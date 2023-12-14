<template>
  <AuthLayout title="Sign in to your account">
    <template #form>
      <form class="space-y-6" action="#" method="POST">
        <div>
          <label for="email" class="label-text">Email address</label>
          <div class="mt-2">
            <input
              id="email"
              name="email"
              type="email"
              autocomplete="email"
              required
              class="input input-bordered w-full"
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

<script setup>
import AuthLayout from '@/layouts/AuthLayout.vue'
</script>
