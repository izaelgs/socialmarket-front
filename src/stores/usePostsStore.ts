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

    posts.value.unshift({ ...data, user, comments: [] })
  }

  const addComment = async (comment: {
    content?: string
    imageUrl?: string
    image?: File
    referencePostId?: string
  }, user: UserState) => {
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

    posts.value = posts.value
      .map(post => addPostComment(post, { ...data, user, comments: [] }));
  }

  const updatePost = async (updatedPost: Partial<Post> & { id: number }) => {
    const data = await axios.patch<Post>('post/' + updatedPost.id, updatedPost, {
      headers: {
        'Content-Type': 'application/json; charset=utf-8'
      }
    })

    posts.value = posts.value
      .map(post => updatePostComment(post, data));
  }

  const removePost = async (postId: number) => {
    await axios.delete<Post>('post/' + postId);

    posts.value = posts.value.filter(post => post.id !== postId)
      .map(post => deletePostComment(post, postId))
      .filter((post): post is Post => post !== null);
  }

  const addPostComment = (post: Post, addedPost: Post): Post => {
    if (post.id == addedPost.referencePostId) {
      return { ...post, comments: [...post.comments, { ...addedPost }] }
    }

    if (post.comments && post.comments.length > 0) {
      post.comments = post.comments
        .map(comment => addPostComment(comment, addedPost))
    }

    return post;
  }

  const updatePostComment = (post: Post, updatedPost: Post): Post => {
    if (post.id === updatedPost.id) {
      return { ...post, ...updatedPost };
    }

    if (post.comments && post.comments.length > 0) {
      post.comments = post.comments
        .map(comment => updatePostComment(comment, updatedPost))
    }

    return post;
  }

  const deletePostComment = (post: Post, postId: number): Post | null => {
    if (post.id === postId) {
      return null;
    }

    if (post.comments && post.comments.length > 0) {
      post.comments = post.comments
        .map(comment => deletePostComment(comment, postId))
        .filter((post): post is Post => post !== null);
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
