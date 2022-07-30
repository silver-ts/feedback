<script setup>
import { ref, watchEffect } from 'vue'

import PostLink from '@/components/PostLink.vue'
import UserAvatar from '@/components/UserAvatar.vue'
import EmptyUserProfile from '@/components/EmptyUserProfile.vue'
import NotFound from '@/components/NotFound.vue'
import { getUserPosts, getUserDocByUsername } from '@/lib/db'
import useReactiveMeta from '@/lib/useReactiveMeta'
import globals from '@/globals'

const props = defineProps({
  username: String,
})

const user = ref(null)
const posts = ref([])
const loading = ref(true)

useReactiveMeta(() => {
  return user.value?.displayName || globals.defaultUserName
})

const getUserProfile = async () => {
  loading.value = true
  const userDoc = await getUserDocByUsername(props.username)

  if (userDoc) {
    const userData = await getUserPosts(userDoc.uid)

    user.value = userDoc
    posts.value = userData || []
  }

  loading.value = false
}

watchEffect(async () => {
  await getUserProfile()
})
</script>

<template>
  <EmptyUserProfile v-if="loading" />

  <main v-if="user && !loading">
    <header class="text-center">
      <UserAvatar
        class="w-14 sm:w-28 h-14 sm:h-28 mx-auto"
        :iconSize="`3x`"
        :photoURL="user.photoURL"
      />
      <h1 class="mt-4 sm:mt-5 text-xl sm:text-3xl font-semibold">
        {{ user.displayName || globals.defaultUserName }}
      </h1>
      <span class="mt-1 sm:mt-2 block">{{ `@${user.username}` }}</span>
    </header>
    <section
      v-if="posts.length !== 0"
      class="mt-4 sm:mt-9 max-w-4xl flex flex-col justify-center mx-auto"
    >
      <template v-for="post in posts" :key="post.slug">
        <PostLink :author="post.username" :postId="post.slug" :post="post" />
      </template>
    </section>
    <div v-else class="mt-4 sm:mt-9 text-center text-base sm:text-xl">
      User has not yet posted any feedback.
    </div>
  </main>

  <NotFound v-if="!user && !loading" />
</template>
