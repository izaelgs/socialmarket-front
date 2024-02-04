<template>
  <form @submit.prevent="submit" class="flex flex-col justify-center">
    <div class="space-y-12">
      <!-- Profile -->
      <div class="border-b border-gray-900/10 pb-12">
        <h2 class="text-base font-semibold leading-7 text-light-900">Profile</h2>
        <p class="mt-1 text-sm leading-6 text-gray-600">
          This information will be displayed publicly so be careful what you share.
        </p>

        <div class="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
          <!-- Username -->
          <div class="sm:col-span-4">
            <label for="username" class="block text-sm font-medium leading-6 text-light-900"
              >Username</label
            >
            <div class="mt-2">
              <div
                class="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-600 focus-within:ring-1 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md"
              >
                <span class="flex select-none items-center pl-3 text-gray-500 sm:text-sm"
                  >workcation.com/</span
                >
                <input
                  type="text"
                  name="username"
                  v-model="user.username"
                  id="username"
                  autocomplete="username"
                  class="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-light-900 focus:ring-0 sm:text-sm sm:leading-6"
                  placeholder="janesmith"
                />
              </div>
            </div>
          </div>

          <!-- About -->
          <div class="col-span-full">
            <label for="about" class="block text-sm font-medium leading-6 text-light-900"
              >About</label
            >
            <div class="mt-2">
              <textarea
                id="about"
                name="about"
                v-model="user.about"
                rows="3"
                class="bg-transparent block w-full rounded-md border-0 py-1.5 text-light-900 shadow-sm ring-1 ring-inset ring-gray-600 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              ></textarea>
            </div>
            <p class="mt-3 text-sm leading-6 text-gray-600">
              Write a few sentences about yourself.
            </p>
          </div>

          <!-- Photo -->
          <div class="col-span-full">
            <span for="photo" class="block text-sm font-medium leading-6 text-light-900"
              >Photo</span
            >
            <div class="mt-2 flex items-center gap-x-3">
              <template v-if="previewAvatarUrl || user.photo">
                <img
                  :src="previewAvatarUrl ? previewAvatarUrl : user.photo ?? ''"
                  alt="User avatar"
                  class="h-12 w-12 rounded-full object-cover object-center"
                />
              </template>
              <template v-else>
                <svg
                  class="h-12 w-12 text-gray-300"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fill-rule="evenodd"
                    d="M18.685 19.097A9.723 9.723 0 0021.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 003.065 7.097A9.716 9.716 0 0012 21.75a9.716 9.716 0 006.685-2.653zm-12.54-1.285A7.486 7.486 0 0112 15a7.486 7.486 0 015.855 2.812A8.224 8.224 0 0112 20.25a8.224 8.224 0 01-5.855-2.438zM15.75 9a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"
                    clip-rule="evenodd"
                  />
                </svg>
              </template>

              <input
                id="photo"
                type="file"
                @change="(e) => previweAvatarFile(e as InputFileEvent)"
                class="sr-only"
              />

              <label
                for="photo"
                role="button"
                class="rounded-md bg-gray-800 px-2.5 py-1.5 text-sm font-semibold text-light-900 shadow-sm ring-inset ring-0 hover:bg-gray-900"
              >
                Change
              </label>
            </div>
          </div>

          <!-- Cover Photo -->
          <div class="col-span-full">
            <span class="block text-sm font-medium leading-6 text-light-900">Cover photo</span>
            <label
              for="cover_photo"
              class="mt-2 flex justify-center rounded-lg border border-dashed border-gray-500 relative h-44"
              role="button"
              :style="
                user.cover_photo || perviewCoverPhotoUrl ? `background-image: url(${perviewCoverPhotoUrl ?? user.cover_photo});
                background-repeat: no-repeat;
                background-size: cover;` : ''
              "
            >
              <div
                class="text-center absolute w-full h-full flex flex-col items-center justify-center"
              >
                <svg
                  class="mx-auto h-12 w-12 text-gray-300"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fill-rule="evenodd"
                    d="M1.5 6a2.25 2.25 0 012.25-2.25h16.5A2.25 2.25 0 0122.5 6v12a2.25 2.25 0 01-2.25 2.25H3.75A2.25 2.25 0 011.5 18V6zM3 16.06V18c0 .414.336.75.75.75h16.5A.75.75 0 0021 18v-1.94l-2.69-2.689a1.5 1.5 0 00-2.12 0l-.88.879.97.97a.75.75 0 11-1.06 1.06l-5.16-5.159a1.5 1.5 0 00-2.12 0L3 16.061zm10.125-7.81a1.125 1.125 0 112.25 0 1.125 1.125 0 01-2.25 0z"
                    clip-rule="evenodd"
                  />
                </svg>
                <div class="mt-4 flex text-sm leading-6 text-gray-600">
                  <span
                    class="relative cursor-pointer rounded-md font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                  >
                    <span>Upload a file</span>
                  </span>
                  <p class="pl-1">or drag and drop</p>

                  <input
                    id="cover_photo"
                    type="file"
                    @change="(e) => previweCoverFile(e as InputFileEvent)"
                    class="sr-only"
                  />
                </div>
                <p class="text-xs leading-5 text-gray-600">PNG, JPG, GIF up to 10MB</p>
              </div>
            </label>
          </div>
        </div>
      </div>

      <!-- Personal Information -->
      <div class="border-b border-gray-900/10 pb-12">
        <h2 class="text-base font-semibold leading-7 text-light-900">Personal Information</h2>
        <p class="mt-1 text-sm leading-6 text-gray-600">
          Use a permanent address where you can receive mail.
        </p>

        <div class="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
          <!-- Name -->
          <div class="col-span-full">
            <label for="first-name" class="block text-sm font-medium leading-6 text-light-900"
              >Name</label
            >
            <div class="mt-2">
              <input
                type="text"
                name="first-name"
                v-model="user.name"
                id="first-name"
                autocomplete="given-name"
                class="bg-transparent block w-full rounded-md border-0 py-1.5 text-light-900 shadow-sm ring-1 ring-inset ring-gray-600 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <!-- Email -->
          <div class="col-span-full">
            <label for="email" class="block text-sm font-medium leading-6 text-light-900"
              >Email address</label
            >
            <div class="mt-2">
              <input
                id="email"
                name="email"
                v-model="user.email"
                type="email"
                autocomplete="email"
                class="bg-transparent block w-full rounded-md border-0 py-1.5 text-light-900 shadow-sm ring-1 ring-inset ring-gray-600 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <!-- Birth At-->
          <div class="sm:col-span-2 sm:col-start-1">
            <label for="birthAt" class="block text-sm font-medium leading-6 text-light-900"
              >Birth At</label
            >
            <div class="mt-2">
              <input
                type="date"
                name="birthAt"
                v-model="user.birthAt"
                id="birthAt"
                autocomplete="address-level2"
                class="bg-transparent block w-full rounded-md border-0 py-1.5 text-light-900 shadow-sm ring-1 ring-inset ring-gray-600 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
        </div>
      </div>

      <!-- Notifications -->
      <div class="border-b border-gray-900/10 pb-12">
        <h2 class="text-base font-semibold leading-7 text-light-900">Notifications</h2>
        <p class="mt-1 text-sm leading-6 text-gray-600">
          We'll always let you know about important changes, but you pick what else you want to hear
          about.
        </p>

        <div class="mt-10 space-y-10">
          <!-- By Email -->
          <fieldset>
            <legend class="text-sm font-semibold leading-6 text-light-900">By Email</legend>
            <div class="mt-6 space-y-6">
              <!-- Comments -->
              <div class="relative flex gap-x-3">
                <div class="flex h-6 items-center">
                  <input
                    id="comments"
                    name="comments"
                    v-model="user.comments"
                    type="checkbox"
                    class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                  />
                </div>
                <div class="text-sm leading-6">
                  <label for="comments" class="font-medium text-light-900">Comments</label>
                  <p class="text-gray-500">
                    Get notified when someones posts a comment on a posting.
                  </p>
                </div>
              </div>
            </div>
          </fieldset>
        </div>
      </div>
    </div>

    <div class="mt-6 flex items-center justify-end gap-x-6">
      <button type="button" class="text-sm font-semibold leading-6 text-light-900">Cancel</button>
      <button
        type="submit"
        class="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
      >
        Save
      </button>
    </div>
  </form>
</template>

<script setup lang="ts">
import { useAxiosStore } from '@/services/axiosStore'
import { useUserStore } from '@/services/userStore'
import { onMounted, ref } from 'vue'
import { type InputFileEvent } from '@/services/types/input'
import { AxiosError } from 'axios'
import { toast } from 'vue3-toastify'
import type { User } from '@/services/types/auth'

const user = useUserStore()
const axios = useAxiosStore()

const profileAvatarFile = ref<File>()
const coverPhotoFile = ref<File>()

const previewAvatarUrl = ref<string | null>(null)
const perviewCoverPhotoUrl = ref<string | null>(null)

const { setUser } = useUserStore()

const submit = async () => {
  try {
    const form = new FormData()

    Object.entries(user).forEach((entry) => {
      if (!['string', 'number'].includes(typeof entry[1]) && !(entry[1] instanceof File)) return
      if (typeof entry[1] === 'string' && entry[0].includes('$')) return

      if (entry[0] === 'birthAt') {
        form.append(entry[0], new Date(entry[1] as string).toISOString().split('T')[0])
      } else if (!entry[0].includes('photo')) {
        form.append(entry[0], entry[1])
      } else if (entry[0] === 'photo' && profileAvatarFile.value) {
        form.append('photo', profileAvatarFile.value)
      } else if (entry[0] === 'cover_photo' && coverPhotoFile.value) {
        form.append('cover_photo', coverPhotoFile.value)
      }
    })

    user.birthAt = new Date(user.birthAt as string | number).toISOString()

    const data = await axios.patch<User>('auth', form, {
      headers: {
        'content-type': 'multipart/form-data' // do not forget this
      }
    })

    setUser(data)

    user.birthAt = new Date(user.birthAt as string).toISOString().split('T')[0]

    toast.success('Profile updated successfully.')
  } catch (error: any) {
    console.error('Error fetching data:', error)

    if (error instanceof AxiosError) {
      if (error.response?.data.message) return toast.error(error.response.data.message)
    }

    toast.error('Error updating profile. Please try again later.')
  }
}

const previweAvatarFile = (event: InputFileEvent) => {
  if (!event.target.files) return

  const file = event.target.files[0]
  previewAvatarUrl.value = URL.createObjectURL(file)
  profileAvatarFile.value = file
}

const previweCoverFile = (event: InputFileEvent) => {
  if (!event.target.files) return

  const file = event.target.files[0]
  perviewCoverPhotoUrl.value = URL.createObjectURL(file)
  coverPhotoFile.value = file
}

onMounted(() => {
  user.birthAt = new Date(user.birthAt as string).toISOString().split('T')[0]
})
</script>

<style>
.dz-preview {
  z-index: 9;
  width: 100%;
  height: 100%;
  overflow: hidden;
  position: relative;
}

.dz-image,
.dz-image img {
  width: 100%;
  position: absolute;
}
</style>
@/services/types/input
