import { defineStore } from 'pinia'
import { ref } from 'vue'
import { toast } from 'vue3-toastify'
import { useAxiosStore } from '@/services/axiosStore'
import type { UserState } from '@/services/types/auth'

export interface Post {
  id: number
  content?: string
  imageUrl?: string
  referencePostId?: number
  userId: number
  createdAt?: string
  updatedAt?: string
  user: UserState
}

export const usePostsStore = defineStore('posts', () => {
  const posts = ref<Post[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)

  const axios = useAxiosStore()

  const fetchPosts = async () => {
    loading.value = true
    error.value = null

    try {
      const response = await axios.get<Post[]>('post')
      posts.value = response
    } catch (err: any) {
      error.value = err.message
      toast.error('Error fetching posts. Please try again later.')
    } finally {
      loading.value = false
    }
  }

  const addPost = async (post: {
    content?: string
    imageUrl?: string
    image?: File
    referencePostId?: string
  }, user: UserState) => {
    const form = new FormData()

    Object.entries(post).forEach(([key, value]) => {
      if (value) {
        if (key === 'referencePostId' && typeof value === 'string') {
          form.append(key, parseInt(value).toString())
        } else {
          form.append(key, value)
        }
      }
    })

    const data = await axios.post<Post>('post', form, {
      headers: {
        'content-type': 'multipart/form-data'
      }
    })

    posts.value.unshift({...data, user})
  }

  const updatePost = async (updatedPost: Partial<Post> & { id: number }) => {
    const index = posts.value.findIndex(post => post.id === updatedPost.id)

    const data = await axios.patch<Post>('post/' + updatedPost.id, updatedPost, {
      headers: {
        'Content-Type': 'application/json; charset=utf-8'
      }
    })

    if (index !== -1) {
      posts.value[index] = {...posts.value[index], ...data}
    }
  }

  const removePost = async (postId: number) => {
    await axios.delete<Post>('post/' + postId)

    posts.value = posts.value.filter(post => post.id !== postId)
  }

  return {
    posts,
    loading,
    error,
    fetchPosts,
    addPost,
    updatePost,
    removePost,
  }
})
