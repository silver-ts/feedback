<script setup>
import { watchEffect, ref, inject } from 'vue'

import AuthCheck from '@/components/AuthCheck.vue'
import PostItem from '@/components/PostItem.vue'
import LoaderSpinner from '@/components/LoaderSpinner.vue'
import { getAllUserPosts, getUserDocByUsername } from '@/lib/db'

const posts = ref(null)
const loading = ref(true)

const { username } = inject('auth')

watchEffect(async () => {
  loading.value = true
  const userDoc = await getUserDocByUsername(username.value)

  if (userDoc) {
    const postDoc = await getAllUserPosts(userDoc.uid)
    console.log(postDoc)

    posts.value = postDoc
    loading.value = false
  }

  loading.value = false
})
</script>

<template>
  <AuthCheck>
    <main v-if="loading">
      <LoaderSpinner />
    </main>

    <main v-if="posts && !loading" class="relative flex flex-col items-center w-full max-w-4xl">
      <h2 class="w-full font-semibold text-lg sm:text-2xl mb-4 sm:mb-5">Posts</h2>
      <section
        v-if="posts.length !== 0"
        class="w-full bg-white rounded-lg border border-gray-400/50 drop-shadow-sm divide-y divide-gray-300/50"
      >
        <template v-for="post in posts" :key="post.slug">
          <PostItem :post="post" />
        </template>
      </section>
      <div v-else>No Posts Yet!</div>
    </main>
  </AuthCheck>
</template>
