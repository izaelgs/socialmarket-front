<template>
  <form
    @submit.prevent="submit"
    class="flex flex-col justify-center w-full border rounded-lg p-4 pt-2 mb-8 dark:border-gray-700"
  >
    <div class="space-y-12">
      <!-- Post Card -->
      <div class="grid grid-cols-1 gap-x-4 gap-y-4 sm:grid-cols-6">
        <!-- Content -->
        <div class="col-span-full">
          <div class="mt-2 flex justify-start items-center">
            <template v-if="user.photo">
              <img
                class="inline-block h-8 w-8 rounded-full ring-1 ring-white mr-2"
                :src="user.photo"
                alt="avatar"
              />
            </template>
            <template v-else>
              <Icon
                icon="bi:person-circle"
                class="inline-block h-8 w-8 rounded-full ring-2 ring-white mr-2"
              />
            </template>
            <textarea
              id="content"
              name="content"
              v-model="post.content"
              rows="1"
              ref="contentTextarea"
              placeholder="What's on your mind?"
              class="bg-transparent block w-full rounded-md border-0 py-1.5 text-light-900 shadow-sm ring-1 ring-inset dark:ring-gray-600 ring-gray-200 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6"
              @input="adjustTextareaHeight"
            ></textarea>
          </div>
        </div>

        <!-- Image -->
        <div class="col-span-full" v-show="uploadImageEnabled">
          <label
            for="cover_photo"
            class="flex justify-center rounded-lg border border-dashed border-gray-500 relative h-44"
            role="button"
            :style="
              post.imageUrl || previewImageUrl
                ? `background-image: url(${previewImageUrl ?? post.imageUrl});
      background-repeat: no-repeat;
      background-size: cover;`
                : ''
            "
          >
            <div
              :class="`text-center absolute w-full h-full flex flex-col items-center justify-center ${previewImageUrl ? 'opacity-0' : ''}`"
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
                  class="relative cursor-pointer rounded-md font-semibold text-green-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-green-600 focus-within:ring-offset-2 hover:text-green-500"
                >
                  <span>Upload a file</span>
                </span>
                <p class="pl-1">or drag and drop</p>

                <input
                  id="cover_photo"
                  type="file"
                  @change="(e) => previewImageFile(e as InputFileEvent)"
                  class="sr-only"
                />
              </div>
              <p class="text-xs leading-5 text-gray-600">PNG, JPG, GIF up to 10MB</p>
            </div>
          </label>
        </div>

        <div class="col-span-full flex justify-between items-center">
          <Icon
            icon="bi:card-image"
            @click="handleToggleUploadImage"
            :class="`cursor-pointer ${uploadImageEnabled ? 'text-green-600' : null}`"
          />

          <div class="flex items-center justify-end gap-x-6">
            <button
              type="button"
              @click="handleCleanPostData"
              class="text-sm font-semibold leading-6 text-light-900"
              v-if="post.content || post.imageUrl || previewImageUrl"
            >
              Cancel
            </button>
            <button
              type="submit"
              class="rounded-md bg-green-600 px-5 py-1 text-sm font-semibold text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
              :class="isCreating ? 'cursor-not-allowed' : 'cursor-pointer'"
              :disabled="isCreating"
            >
              <template v-if="isCreating"><SpinnerComponent class="p-1" /></template>
              <template v-else>Post</template>
            </button>
          </div>
        </div>
      </div>
    </div>
  </form>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { toast } from 'vue3-toastify'
import { AxiosError } from 'axios'
import type { InputFileEvent } from '@/services/types/input'
import { Icon } from '@iconify/vue/dist/iconify.js'
import { useUserStore } from '@/services/userStore'
import { usePostsStore } from '@/stores/PostsStore'
import type { UserState } from '@/services/types/auth'
import SpinnerComponent from '@/components/SpinnerComponent.vue'

interface Post {
  content?: string
  imageUrl?: string
  image?: File
  referencePostId?: string
}

const postsStore = usePostsStore()

const post = ref<Post>({
  content: '',
  imageUrl: ''
})

const user = useUserStore()

const previewImageUrl = ref<string | null>(null)
const uploadImageEnabled = ref<boolean>(false)
const isCreating = ref<boolean>(false)

const submit = async () => {
  if (!post.value.content) {
    toast.error('Post content cannot be empty.')
    return
  }

  try {
    isCreating.value = true
    await postsStore.addPost(post.value, user as UserState)
    isCreating.value = false
    handleCleanPostData()

    toast.success('Post created successfully.')
  } catch (error: any) {
    isCreating.value = false
    console.error('Error creating post:', error)

    if (error instanceof AxiosError) {
      if (error.response?.data.message) return toast.error(error.response.data.message)
    }

    toast.error('Error creating post. Please try again later.')
  }
}

const previewImageFile = (event: Event) => {
  const input = event.target as HTMLInputElement
  if (!input.files || !input.files[0]) return

  const file = input.files[0]
  previewImageUrl.value = URL.createObjectURL(file)
  post.value.image = file
}

const adjustTextareaHeight = () => {
  const textarea = contentTextarea.value as HTMLTextAreaElement
  textarea.style.height = 'auto'
  textarea.style.height = `${textarea.scrollHeight}px`
}

const handleToggleUploadImage = () => {
  uploadImageEnabled.value = !uploadImageEnabled.value
}

const handleCleanPostData = () => {
  post.value.content = ''
  post.value.imageUrl = ''
  previewImageUrl.value = null
  uploadImageEnabled.value = false
}

const contentTextarea = ref<HTMLTextAreaElement>()

onMounted(() => {
  if (contentTextarea.value) {
    adjustTextareaHeight()
  }
})
</script>

<style scoped>
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
