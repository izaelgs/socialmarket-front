<template>
  <div class="w-full">
    <CreatePostForm />
    <div v-if="postsStore.loading">
      <ul>
        <li v-for="n in 5" :key="n" class="mb-2">
          <SkeletonPostCard />
        </li>
      </ul>
    </div>
    <div v-else-if="postsStore.error">{{ postsStore.error }}</div>
    <ul v-else>
      <li v-for="post in postsStore.posts" :key="post.id" class="mb-2">
        <PostCard :post="post" />
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import CreatePostForm from './CreatePostForm.vue'
import { defineComponent, onMounted } from 'vue'
import { usePostsStore } from '@/stores/PostsStore'
import PostCard from './PostCard.vue'
import SkeletonPostCard from './SkeletonPostCard.vue'

defineComponent({
  name: 'HomeViewIndex'
})

const postsStore = usePostsStore()

onMounted(() => {
  postsStore.fetchPosts()
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
