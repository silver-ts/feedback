<script setup>
import globals from '@/globals'
</script>

<template>
  <footer class="p-2 sm:p-4 text-sm text-center">
    <span class="block">
      {{ globals.name }} is built with
      <a
        href="https://vuejs.org/"
        target="_blank"
        rel="noopener noreferrer"
        class="text-indigo-500 hover:text-indigo-500/80 transition-opacity"
      >
        Vue.js
      </a>
      and
      <a
        href="https://firebase.google.com/"
        target="_blank"
        rel="noopener noreferrer"
        class="text-indigo-500 hover:text-indigo-500/80 transition-opacity"
      >
        Firebase
      </a>
      .
    </span>
    <a
      :href="globals.githubSource"
      target="_blank"
      rel="noopener noreferrer"
      class="block text-indigo-500 hover:text-indigo-500/80 transition-opacity mt-1"
    >
      <font-awesome-icon icon="fa-brands fa-github" class="h-4 w-4 mr-2"></font-awesome-icon>
      <span>Source on Github</span>
    </a>
  </footer>
</template>
