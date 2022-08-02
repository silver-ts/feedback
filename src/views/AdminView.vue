<script setup>
import { watchEffect, ref, inject } from 'vue'
import { useMeta } from 'vue-meta'

import AuthCheck from '@/components/AuthCheck.vue'
import PostItem from '@/components/PostItem.vue'
import PageLoader from '@/components/PageLoader.vue'
import { getAllUserPosts, getUserDocByUsername } from '@/lib/db'

const { username } = inject('auth')
const loading = ref(false)
const posts = ref([])

useMeta({ title: 'Dashboard' })

watchEffect(async () => {
  loading.value = true
  const userDoc = await getUserDocByUsername(username.value)

  if (userDoc) {
    const postDoc = await getAllUserPosts(userDoc.uid)
    posts.value = postDoc
  }

  loading.value = false
})
</script>

<template>
  <AuthCheck>
    <PageLoader :loading="loading" />

    <!-- Dashboard -->
    <main v-if="posts && !loading" class="relative flex flex-col items-center w-full max-w-4xl">
      <h2 class="w-full font-semibold text-lg sm:text-2xl mb-4 sm:mb-5">Posts</h2>
      <section
        v-if="posts.length !== 0"
        class="w-full bg-white rounded-lg border border-gray-400/50 drop-shadow-sm divide-y divide-gray-300/50"
      >
        <template v-for="post in posts" :key="post.slug">
          <PostItem
            :author="post.author"
            :slug="post.slug"
            :title="post.title"
            :createdAt="post.createdAt"
            :updatedAt="post.updatedAt"
            :published="post.published"
            :username="post.username"
          />
        </template>
      </section>

      <!-- No posts -->
      <section v-else class="w-full">
        <div>No Posts Yet!</div>
        <router-link
          to="/new"
          class="mt-4 w-fit block bg-transparent font-semibold py-2 px-4 rounded-md border border-indigo-500 hover:bg-indigo-500 text-indigo-500 hover:text-white transition-all"
        >
          Create Post
        </router-link>
      </section>
    </main>
  </AuthCheck>
</template>
