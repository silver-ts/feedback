<script setup>
import MetaHeader from '@/components/MetaHeader.vue'

defineProps({
  author: String,
  postId: String,
})
</script>

<template>
  <article class="mb-4">
    <router-link
      :to="`/users/${author}/${postId}`"
      class="block bg-white rounded-lg border border-gray-400/50 drop-shadow-sm p-4 sm:p-6"
    >
      <MetaHeader :author="`Jainden`" :createdAt="`Jun 25 (16 hours ago)`" />
      <h3
        class="mt-4 sm:mt-6 sm:ml-10 font-semibold text-xl sm:text-2xl hover:text-indigo-500 transition"
      >
        Post {{ postId }} Title
      </h3>
      <div class="mt-4 sm:mt-6 flex items-center justify-start sm:justify-end">
        <span class="text-xs mr-4">24 words. 1 min read</span>
        <div class="flex items-center justify-center">
          <font-awesome-icon icon="fa-regular fa-heart" class="mr-2" />
          <span class="text-sm sm:text-base">3 Reactions</span>
        </div>
      </div>
    </router-link>
  </article>
</template>
