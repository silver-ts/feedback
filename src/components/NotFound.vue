<script setup>
import { useMeta } from 'vue-meta'

useMeta({
  title: '404 Not Found',
})
</script>

<template>
  <main class="flex items-center justify-center flex-col">
    <h2 class="text-center text-2xl sm:text-6xl font-light">404</h2>
    <div class="text-center text-base sm:text-2xl font-light mt-2 sm:mt-4">
      That page does not seem to exist...
    </div>
    <router-link
      to="/"
      class="mt-4 sm:mt-8 bg-transparent py-2 px-4 rounded-md border border-indigo-500 hover:bg-indigo-500 text-indigo-500 hover:text-white transition-all relative h-11"
    >
      <span class="font-semibold">Go Home</span>
    </router-link>
  </main>
</template>
