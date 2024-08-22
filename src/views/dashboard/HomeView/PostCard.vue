<template>
  <div
    :class="`flex flex-col justify-center w-full p-4 ${!isComment ? 'border rounded-lg shadow dark:border-gray-700 mb-8 pt-2' : 'py-0'}`"
  >
    <div class="space-y-12">
      <!-- Post Card -->
      <div class="grid grid-cols-1 gap-x-4 gap-y-4 sm:grid-cols-6">
        <!-- Content -->
        <div class="col-span-full">
          <div class="mt-2 relative">
            <div class="flex justify-between items-center">
              <div class="flex">
                <template v-if="props.post.user.photo">
                  <img
                    class="inline-block h-8 w-8 rounded-full ring-1 ring-white mr-2"
                    :src="props.post.user.photo"
                    alt="avatar"
                  />
                </template>
                <template v-else>
                  <Icon
                    icon="bi:person-circle"
                    class="inline-block h-8 w-8 rounded-full ring-white mr-2"
                  />
                </template>
                <div>
                  <p class="leading-3">{{ props.post.user.name }}</p>
                  <small class="leading-3">{{
                    props.post.createdAt
                      ? new Date(props.post.createdAt).toLocaleString()
                      : 'Date not found'
                  }}</small>
                </div>
              </div>
              <div class="relative">
                <button @click="() => toggleMenu()" class="focus:outline-none">
                  <Icon icon="mdi:dots-vertical" class="h-6 w-6 text-gray-700" />
                </button>
                <div
                  v-if="menuOpen"
                  class="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-20"
                  @mouseleave="toggleMenu(false)"
                >
                  <ul class="py-1">
                    <template v-if="user.username === props.post.user.username">
                      <li>
                        <button
                          @click="enableEditMode"
                          class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                        >
                          <Icon
                            icon="bi:pencil"
                            class="inline-block rounded-full ring-white mr-2"
                          />
                          Edit
                        </button>
                      </li>
                      <li>
                        <button
                          @click="showDeleteModal"
                          class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                        >
                          <Icon icon="bi:trash" class="inline-block rounded-full ring-white mr-2" />
                          Delete
                        </button>
                      </li>
                    </template>
                  </ul>
                </div>
              </div>
            </div>

            <template v-if="editMode">
              <textarea
                v-model="editedContent"
                rows="4"
                class="bg-transparent block w-full rounded-md border-0 py-1.5 text-light-900 shadow-sm ring-1 ring-inset dark:ring-gray-600 ring-gray-200 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6"
              ></textarea>
              <div class="flex items-center justify-end gap-x-6">
                <button @click="cancelEdit" class="text-sm font-semibold leading-6 text-light-900">
                  Cancel
                </button>
                <button
                  @click="submitEdit"
                  class="rounded-md bg-green-600 px-5 py-1 text-sm font-semibold text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
                  :class="isSaving ? 'cursor-not-allowed' : 'cursor-pointer'"
                  :disabled="isSaving"
                >
                  <template v-if="isSaving"><SpinnerComponent class="p-1" /></template>
                  <template v-else>Save</template>
                </button>
              </div>
            </template>

            <template v-else>
              <p>{{ props.post.content }}</p>

              <div class="relative w-full h-auto mt-2 min-h-20 mb-2" v-if="props.post.imageUrl">
                <SpinnerComponent v-if="imageLoading" class="absolute inset-0 m-auto" />
                <img
                  v-if="props.post.imageUrl"
                  :src="props.post.imageUrl"
                  alt="Post Image"
                  class="w-full h-auto mt-2 rounded max-h-96 object-cover"
                  @load="imageLoading = false"
                  @error="imageLoading = false"
                />
              </div>

              <ul>
                <li v-for="post in post.comments" :key="post.id">
                  <PostCard :post="post" isComment />
                </li>
              </ul>

              <form @submit.prevent="submitComment" class="flex gap-2 mt-2" v-if="!isComment || isCommenting">
                <textarea
                  id="content"
                  name="content"
                  v-model="comment.content"
                  rows="1"
                  ref="contentTextarea"
                  placeholder="Leave a comment"
                  class="bg-transparent block w-full rounded-md border-0 py-1.5 text-light-900 shadow-sm ring-1 ring-inset dark:ring-gray-600 ring-gray-200 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6"
                  @input="adjustTextareaHeight"
                ></textarea>

                <button
                  type="submit"
                  class="rounded-md bg-green-600 px-5 py-1 text-sm font-semibold text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
                  :class="isCreatingComment ? 'cursor-not-allowed' : 'cursor-pointer'"
                  :disabled="isCreatingComment"
                >
                  <template v-if="isCreatingComment"><SpinnerComponent class="p-1" /></template>
                  <template v-else>Post</template>
                </button>
              </form>

              <div class="flex gap-2 mb-2">
                <button
                  type="button"
                  @click="() => isCommenting = !isCommenting"
                  v-if="isComment"
                  class="text-sm font-semibold leading-6 text-light-900"
                >
                  {{isCommenting ? 'Cancel' : 'Reply'}}
                </button>
                <button
                  type="button"
                  @click="() => isCommenting = true"
                  v-if="isComment"
                  class="text-sm font-semibold leading-6 text-light-900"
                >
                  Like
                </button>
              </div>
            </template>
          </div>
        </div>
      </div>
    </div>

    <DeleteConfirmationModal
      :show="showModal"
      @confirm="confirmDelete"
      @cancel="closeModal"
      :isDeleting="isDeleting"
      :isComment="isComment"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { usePostsStore, type Post } from '@/stores/usePostsStore'
import { Icon } from '@iconify/vue/dist/iconify.js'
import SpinnerComponent from '@/components/SpinnerComponent.vue'
import DeleteConfirmationModal from './DeleteConfirmationModal.vue'
import { useUserStore } from '@/services/userStore'
import { toast } from 'vue3-toastify'
import type { UserState } from '@/services/types/auth'
import { AxiosError } from 'axios'

interface Comment {
  content?: string
  imageUrl?: string
  image?: File
  referencePostId?: string
}

const props = defineProps<{
  post: Post,
  isComment?: boolean;
}>()

const user = useUserStore()
const postsStore = usePostsStore()

const editedContent = ref(props.post.content)
const comment = ref<Comment>({
  content: '',
  imageUrl: '',
  referencePostId: props.post.id.toString(),
})

const imageLoading = ref<boolean>(true)
const menuOpen = ref<boolean>(false)
const editMode = ref<boolean>(false)
const isSaving = ref<boolean>(false)
const showModal = ref<boolean>(false)
const isDeleting = ref<boolean>(false)
const isCommenting = ref<boolean>(false)
const isCreatingComment = ref<boolean>(false)

const contentTextarea = ref<HTMLTextAreaElement>()

const toggleMenu = (shouldBeOpened?: boolean) => {
  menuOpen.value = shouldBeOpened ?? !menuOpen.value
}

const enableEditMode = () => {
  editMode.value = true
  editedContent.value = props.post.content
  menuOpen.value = false
}

const submitEdit = async () => {
  try {
    isSaving.value = true
    await postsStore.updatePost({
      id: props.post.id,
      content: editedContent.value
    })
    isSaving.value = false
    editMode.value = false
  } catch (error) {
    console.error(error)
    isSaving.value = false
  }
}

const cancelEdit = () => {
  editMode.value = false
}

const submitComment = async () => {
  if (!comment.value.content) {
    toast.error('Comment content cannot be empty.')
    return
  }

  try {
    isCreatingComment.value = true
    await postsStore.addComment(comment.value, user as UserState)
    isCreatingComment.value = false
    isCommenting.value = false
    handleCleanCommentData()

    toast.success('Comment created successfully.')
  } catch (error: any) {
    isCreatingComment.value = false
    console.error('Error creating comment:', error)

    if (error instanceof AxiosError) {
      if (error.response?.data.message) return toast.error(error.response.data.message)
    }

    toast.error('Error creating comment. Please try again later.')
  }
}

const handleCleanCommentData = () => {
  comment.value.content = ''
  comment.value.imageUrl = ''
}

const adjustTextareaHeight = () => {
  const textarea = contentTextarea.value as HTMLTextAreaElement
  textarea.style.height = 'auto'
  textarea.style.height = `${textarea.scrollHeight}px`
}

const showDeleteModal = () => {
  showModal.value = true
  menuOpen.value = false
}

const closeModal = () => {
  showModal.value = false
}

const confirmDelete = async () => {
  try {
    isDeleting.value = true
    await postsStore.removePost(props.post.id)
    closeModal()
    isDeleting.value = false
  } catch (error) {
    console.error('Error deleting post:', error)
    isDeleting.value = false
  }
}

onMounted(() => {
  if (!props.post.imageUrl) {
    imageLoading.value = false
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
