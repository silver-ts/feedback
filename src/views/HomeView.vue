<script setup>
import { inject } from 'vue'
import { useMeta } from 'vue-meta'

import PostLink from '@/components/PostLink.vue'
import LoaderSpinner from '@/components/LoaderSpinner.vue'

useMeta({
  title: 'Home page',
})

const { posts, loading, getMorePosts, isPostsEnd } = inject('posts')
</script>

<template>
  <main class="relative flex flex-col sm:flex-row justify-center">
    <section class="flex-1 max-w-4xl">
      <!-- Post Links -->
      <template v-if="posts.length !== 0">
        <template v-for="post in posts" :key="post.slug">
          <PostLink :post="post" />
        </template>
        <!-- Load more -->
        <div class="flex items-center justify-center mt-4 sm:mt-8">
          <button
            v-if="!loading && !isPostsEnd"
            @click="getMorePosts"
            class="bg-transparent py-2 px-4 rounded-md border border-indigo-500 hover:bg-indigo-500 text-indigo-500 hover:text-white transition-all relative h-11"
          >
            <span class="font-semibold">Load more posts</span>
          </button>

          <div v-if="isPostsEnd">You have reached the end!</div>
        </div>
      </template>

      <!-- No posts -->
      <div v-if="posts.length === 0 && !loading" class="text-center text-base sm:text-xl">
        Log in to create a first feedback :)
      </div>

      <LoaderSpinner v-if="loading" />
    </section>
  </main>
</template>
