<script setup>
import PostItem from '@/components/PostItem.vue'
</script>

<template>
  <main>
    <header class="text-center">
      <div class="w-14 sm:w-28 h-14 sm:h-28 mx-auto rounded-full bg-blue-500/50"></div>
      <h2 class="mt-4 sm:mt-5 text-xl sm:text-3xl font-semibold">Jaiden</h2>
      <span class="mt-1 sm:mt-2 block">@jaiden21</span>
    </header>

    <section class="mt-4 sm:mt-9">
      <template v-for="n in 5" :key="n">
        <PostItem :author="`username${n}`" :postId="`post${n}`" />
      </template>
    </section>
  </main>
</template>
