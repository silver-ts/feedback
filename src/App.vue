<script setup>
import NavBar from '@/components/NavBar.vue'
import PageFooter from '@/components/PageFooter.vue'
</script>

<template>
  <NavBar />
  <main class="container mx-auto max-w-7xl px-2 sm:px-4">
    <router-view />
  </main>
  <PageFooter />
</template>

<style>
@import '@/assets/base.css';
</style>
