<script setup>
import { computed } from 'vue'
import { formatDistanceToNow, format } from 'date-fns'

import MetaHeader from '@/components/MetaHeader.vue'
import readTime from '@/utils/readTime'

const props = defineProps({
  postId: String,
  post: Object,
})

const readingTime = computed(() => {
  return readTime(props.post.content)
})
</script>

<template>
  <article class="mb-4">
    <router-link
      :to="`/${post.username}/${postId}`"
      class="block bg-white rounded-lg border border-gray-400/50 drop-shadow-sm p-4 sm:p-6"
    >
      <MetaHeader
        :username="post.username"
        :author="post.author"
        :createdAt="`${format(
          new Date(post.createdAt.seconds * 1000),
          'PP',
        )} (${formatDistanceToNow(new Date(post.createdAt.seconds * 1000), { addSuffix: true })})`"
      />
      <h3
        class="mt-4 sm:mt-6 sm:ml-10 font-semibold text-xl sm:text-2xl hover:text-indigo-500 transition"
      >
        {{ post.title }}
      </h3>
      <div class="mt-4 sm:mt-6 flex items-center justify-start sm:justify-end">
        <span class="text-xs mr-4">
          {{
            readingTime.wordCount === 1
              ? `${readingTime.wordCount} word.`
              : `${readingTime.wordCount} words.`
          }}
          {{ readingTime.readTime }} min read
        </span>
        <div class="flex items-center justify-center">
          <font-awesome-icon icon="fa-regular fa-heart" class="mr-2" />
          <span class="text-sm sm:text-base">
            {{
              post.heartCount === 1 ? `${post.heartCount} Reaction` : `${post.heartCount} Reactions`
            }}
          </span>
        </div>
      </div>
    </router-link>
  </article>
</template>
