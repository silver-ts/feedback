<script setup>
import { format } from 'date-fns'

const props = defineProps({
  post: Object,
})
</script>

<template>
  <article
    class="flex flex-col sm:flex-row justify-between items-start sm:items-center hover:bg-gray-100/50 transition"
  >
    <router-link :to="`/${post.username}/${post.slug}`" class="group block p-4 sm:p-6 w-full">
      <div class="font-semibold text-xl sm:text-2xl group-hover:text-indigo-500 transition">
        {{ props.post.title }}
      </div>
      <span class="block sm:inline text-sm mr-2 mt-2 sm:mt-0">
        <span class="font-semibold">Published:</span>
        {{ format(new Date(post.createdAt.seconds * 1000), 'PP') }}
      </span>
      <span class="text-sm">
        <span class="font-semibold">Updated:</span>
        {{ format(new Date(post.updatedAt.seconds * 1000), 'PP') }}
      </span>
    </router-link>
    <div class="flex justify-between items-center p-4 sm:p-6">
      <span
        v-if="post.published"
        class="bg-indigo-100 text-indigo-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-indigo-200 dark:text-indigo-900"
      >
        Published
      </span>

      <span
        v-if="!post.published"
        class="bg-yellow-100 text-yellow-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-yellow-200 dark:text-yellow-900"
      >
        Draft
      </span>
      <button class="py-1 px-2 text-sm sm:text-base rounded hover:bg-gray-200/50 transition">
        Edit
      </button>
    </div>
  </article>
</template>
