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

  comments: Post[]
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

    posts.value.unshift({ ...data, user })
  }

  const addComment = async (post: Post, comment: {
    content?: string
    imageUrl?: string
    image?: File
    referencePostId?: string
  }, user: UserState) => {
    const index = posts.value.findIndex(p => p.id === post.id)

    const form = new FormData()

    Object.entries(comment).forEach(([key, value]) => {
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

    if (index !== -1) {
      posts.value[index] = { ...posts.value[index], comments: [...posts.value[index].comments, { ...data, user }] }
    }
  }

  const updatePost = async (updatedPost: Partial<Post> & { id: number }) => {
    const index = posts.value.findIndex(post => post.id === updatedPost.id)

    const data = await axios.patch<Post>('post/' + updatedPost.id, updatedPost, {
      headers: {
        'Content-Type': 'application/json; charset=utf-8'
      }
    })

    if (index !== -1) {
      posts.value[index] = { ...posts.value[index], ...data }
    }
  }

  const removePost = async (postId: number) => {
    await axios.delete<Post>('post/' + postId);

    posts.value = posts.value
      .map(post => deletePostComment(post, postId))
      .filter(post => post !== null);
  }

  const deletePostComment = (post: Post, postId: number): Post | null => {
    // Caso base: se o post é o que deve ser removido, retorna null
    if (post.id === postId) {
      return null;
    }

    // Recursão: busca e remove o comentário dentro dos comentários do post
    if (post.comments && post.comments.length > 0) {
      post.comments = post.comments
        .map(comment => deletePostComment(comment, postId))
        .filter(comment => comment !== null);
    }

    return post;
  }

  return {
    posts,
    loading,
    error,
    fetchPosts,
    addPost,
    addComment,
    updatePost,
    removePost,
  }
})
