<script setup>
import { defineProps, onUnmounted, watchEffect, ref, computed } from 'vue'
import { onSnapshot } from 'firebase/firestore'
import { marked } from 'marked'

import MetaHeader from '@/components/MetaHeader.vue'
import LoaderSpinner from '@/components/LoaderSpinner.vue'
import NotFound from '@/components/NotFound.vue'
import HeartButton from '@/components/HeartButton.vue'
import { getUserDocByUsername, getPostDocRef } from '@/lib/db'
import { displayDate } from '@/utils/formatDate'

const props = defineProps({
  username: String,
  postId: String,
})

const post = ref(null)
const loading = ref(true)

const markdownToHTML = computed(() => {
  return marked(post.value.content)
})

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

onUnmounted(() => {
  if (unsubscribe) {
    unsubscribe()
  }
})
</script>

<template>
  <main v-if="loading">
    <LoaderSpinner />
  </main>

  <NotFound v-if="!post && !loading" />

  <main v-if="post && !loading" class="flex relative flex-col sm:flex-row">
    <section
      class="flex-1 mr-0 sm:mr-4 mb-4 bg-white rounded-lg border border-gray-400/50 drop-shadow-sm p-4 sm:px-16 sm:py-8"
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
    <aside
      v-if="post && !loading"
      class="sticky max-w-xs w-full h-80 sm:top-[length:var(--aside-top)] right-0 bg-white rounded-lg border border-gray-400/50 drop-shadow-sm p-4 sm:p-5"
    >
      <div class="flex items-center justify-center">
        <font-awesome-icon icon="fa-regular fa-heart" class="mr-2" />
        <div class="text-sm sm:text-base">
          {{
            post.heartCount === 1 ? `${post.heartCount} Reaction` : `${post.heartCount} Reactions`
          }}
        </div>
      </div>

      <HeartButton :uid="post.uid" :slug="post.slug" />
    </aside>
  </main>
</template>
