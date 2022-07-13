<script setup>
import { onMounted, ref } from 'vue'

import PostItem from '@/components/PostItem.vue'
import UserAvatar from '@/components/UserAvatar.vue'
import EmptyUserProfile from '@/components/EmptyUserProfile.vue'
import NotFound from '@/components/NotFound.vue'
import { getUserPosts } from '@/lib/db'
import globals from '@/globals'

const props = defineProps({
  username: String,
})

const author = ref(null)
const posts = ref([])
const loading = ref(true)

onMounted(async () => {
  try {
    const userData = await getUserPosts(props.username)

    author.value = userData.author
    posts.value = userData.posts
    loading.value = false
  } catch (error) {
    loading.value = false
  }
})
</script>

<template>
  <template v-if="loading">
    <EmptyUserProfile />
  </template>

  <template v-else>
    <main v-if="author">
      <header class="text-center">
        <UserAvatar
          class="w-14 sm:w-28 h-14 sm:h-28 mx-auto"
          :iconSize="`3x`"
          :photoURL="author.photoURL"
        />
        <h2 class="mt-4 sm:mt-5 text-xl sm:text-3xl font-semibold">
          {{ author.displayName || globals.defaultUserName }}
        </h2>
        <span class="mt-1 sm:mt-2 block">{{ `@${author.username}` }}</span>
      </header>
      <template v-if="posts.length !== 0">
        <section class="mt-4 sm:mt-9">
          <template v-for="post in posts" :key="post.slug">
            <PostItem :author="post.username" :postId="post.slug" />
          </template>
        </section>
      </template>
    </main>

    <template v-if="!author && posts.length === 0">
      <NotFound />
    </template>
  </template>
</template>
