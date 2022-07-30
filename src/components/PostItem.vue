<script setup>
import { displayDate } from '@/utils/formatDate'

defineProps({
  author: String,
  slug: String,
  title: String,
  createdAt: {
    seconds: Number,
    nanoseconds: Number,
  },
  updatedAt: {
    seconds: Number,
    nanoseconds: Number,
  },
  published: Boolean,
  username: String,
})
</script>

<template>
  <article
    class="flex flex-col sm:flex-row justify-between items-start sm:items-center hover:bg-gray-100/50 transition"
  >
    <!-- Post Link -->
    <router-link :to="`/${username}/${slug}`" class="group block p-4 sm:p-6 w-full">
      <h3 class="font-semibold text-xl sm:text-2xl group-hover:text-indigo-500 transition">
        {{ title }}
      </h3>
      <span class="block sm:inline text-sm mr-2 mt-2 sm:mt-0">
        <span class="font-semibold">Published:</span>
        {{ displayDate(createdAt.seconds) }}
      </span>
      <span class="text-sm">
        <span class="font-semibold">Updated:</span>
        {{ displayDate(updatedAt.seconds) }}
      </span>
    </router-link>

    <!-- Toolbar -->
    <div class="flex justify-between items-center p-4 sm:p-6">
      <span
        v-if="published"
        class="bg-indigo-100 text-indigo-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-indigo-200 dark:text-indigo-900"
      >
        Published
      </span>
      <span
        v-if="!published"
        class="bg-yellow-100 text-yellow-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-yellow-200 dark:text-yellow-900"
      >
        Draft
      </span>
      <router-link
        :to="`/admin/${slug}`"
        class="py-1 px-2 text-sm sm:text-base rounded hover:bg-gray-200/50 transition"
      >
        Edit
      </router-link>
    </div>
  </article>
</template>
