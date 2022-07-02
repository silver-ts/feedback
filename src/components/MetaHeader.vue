<script setup>
import UserAvatar from '@/components/UserAvatar.vue'

defineProps({
  photoURL: String,
  author: String,
  createdAt: String,
})
</script>

<template>
  <div class="flex items-center">
    <UserAvatar :photoURL="photoURL" class="mr-2" />
    <div>
      <router-link
        to="/username1"
        class="p-1 text-sm sm:text-base font-semibold rounded hover:bg-gray-200/50 transition"
      >
        {{ author }}
      </router-link>
      <div class="text-xs ml-1">{{ createdAt }}</div>
    </div>
  </div>
</template>
