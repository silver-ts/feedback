<script setup>
defineProps({
  author: String,
  createdAt: String,
})
</script>

<template>
  <div class="flex items-center">
    <div class="mr-2 w-8 h-8 rounded-full bg-blue-500/50"></div>
    <div>
      <router-link
        to="/users/username1"
        class="p-1 font-semibold rounded hover:bg-gray-200/50 transition"
      >
        {{ author }}
      </router-link>
      <div class="text-xs ml-1">{{ createdAt }}</div>
    </div>
  </div>
</template>
