<script setup>
import { onUnmounted, watchEffect, ref, computed, inject } from 'vue'
import { onSnapshot } from 'firebase/firestore'
import { marked } from 'marked'

import MetaHeader from '@/components/MetaHeader.vue'
import NotFound from '@/components/NotFound.vue'
import HeartButton from '@/components/HeartButton.vue'
import PageLoader from '@/components/PageLoader.vue'
import PostDetails from '@/components/PostDetails.vue'
import useReactiveMeta from '@/lib/useReactiveMeta'
import { getUserDocByUsername, getPostDocRef } from '@/lib/db'
import { displayDate } from '@/utils/formatDate'

const props = defineProps({
  username: String,
  postId: String,
})

const { user, username } = inject('auth')
const post = ref(null)
const loading = ref(true)

// Listen to the `post` document
const unsubscribe = watchEffect(async () => {
  loading.value = true
  const userDoc = await getUserDocByUsername(props.username)

  if (userDoc) {
    return onSnapshot(
      getPostDocRef(userDoc.uid, props.postId),
      { includeMetadataChanges: true },
      (doc) => {
        post.value = doc.data() || null

        loading.value = false
      },
    )
  }
})

// Stop db watcher
onUnmounted(() => {
  unsubscribe && unsubscribe()
})

// Dynamic page title
useReactiveMeta(() => {
  return post.value?.title
})

const markdownToHTML = computed(() => {
  return marked(post.value.content)
})
</script>

<template>
  <!-- Loading -->
  <PageLoader :loading="loading" />

  <!-- 404 -->
  <NotFound v-if="!post && !loading" />

  <main v-if="post && !loading" class="flex relative flex-col md:flex-row">
    <!-- Post content -->
    <section
      class="flex-1 mr-0 md:mr-4 mb-4 md:mb-0 bg-white rounded-lg border border-gray-400/50 drop-shadow-sm p-4 sm:px-16 sm:py-8"
    >
      <MetaHeader
        :author="post.author"
        :createdAt="displayDate(post.createdAt.seconds)"
        :username="post.username"
      />
      <article class="mt-6 sm:mt-8">
        <h3 class="font-semibold text-2xl sm:text-4xl">{{ post.title }}</h3>
        <div v-html="markdownToHTML" class="prose w-full max-w-none mt-5 sm:mt-8"></div>
      </article>
    </section>

    <!-- Toolbar -->
    <aside
      v-if="post && !loading"
      class="sticky max-w-xs w-full h-fit mx-auto sm:top-[length:var(--aside-top)] right-0 bg-white rounded-lg border border-gray-400/50 drop-shadow-sm p-4 sm:p-5 text-center divide-y divide-gray-300"
    >
      <HeartButton
        v-if="username"
        :uid="post.uid"
        :slug="post.slug"
        :heartCount="post.heartCount"
      />
      <router-link
        v-if="user?.uid === post.uid"
        :to="`/admin/${postId}`"
        class="mt-4 block w-full bg-indigo-500 py-2 px-4 rounded-md border border-indigo-500 hover:bg-indigo-600 text-white transition-all"
      >
        Edit
      </router-link>
      <PostDetails
        :createdAt="post.createdAt.seconds"
        :updatedAt="post.updatedAt.seconds"
        :content="post.content"
        class="mt-4 pt-4"
      />
    </aside>
  </main>
</template>
