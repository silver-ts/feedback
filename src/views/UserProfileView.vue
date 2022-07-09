<script setup>
import { onMounted, ref } from 'vue'

import PostItem from '@/components/PostItem.vue'
import UserAvatar from '@/components/UserAvatar.vue'
import { getUserPosts } from '@/lib/db'
import globals from '@/globals'

const props = defineProps({
  username: String,
})

const author = ref(null)
const posts = ref([])

onMounted(async () => {
  const userData = await getUserPosts(props.username)

  author.value = userData.author
  posts.value = userData.posts
})
</script>

<template>
  <main>
    <header v-if="author" class="text-center">
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

    <section class="mt-4 sm:mt-9">
      <template v-if="posts">
        <template v-for="post in posts" :key="post.slug">
          <PostItem :author="post.username" :postId="post.slug" />
        </template>
      </template>
      <template v-else>No posts</template>
    </section>
  </main>
</template>
