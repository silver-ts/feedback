<script setup>
import PostItem from '@/components/PostItem.vue'
</script>

<template>
  <main class="relative flex flex-col sm:flex-row">
    <section class="flex-1">
      <template v-for="n in 25" :key="n">
        <PostItem :author="`username${n}`" :postId="`post${n}`" />
      </template>
    </section>
  </main>
</template>
