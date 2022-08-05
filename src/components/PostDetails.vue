<script setup>
import { computed } from 'vue'

import { formatReadTime, readTime } from '@/utils/readTime'
import { displayDate } from '@/utils/formatDate'

const props = defineProps({
  content: String,
  createdAt: Number,
  updatedAt: Number,
})

const readingTime = computed(() => readTime(props.content))
</script>

<template>
  <div class="text-left text-sm text-gray-600">
    <div><span class="font-semibold">Created:</span> {{ displayDate(createdAt) }}</div>
    <div><span class="font-semibold">Updated:</span> {{ displayDate(updatedAt) }}</div>
    <div class="mt-4 text-base text-gray-800">
      {{ formatReadTime(readingTime) }}
    </div>
  </div>
</template>
