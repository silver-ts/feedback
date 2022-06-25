<script setup>
import NavBar from '@/components/NavBar.vue'
import PageFooter from '@/components/PageFooter.vue'
</script>

<template>
  <NavBar />
  <router-view />
  <PageFooter />
</template>

<style>
@import '@/assets/base.css';
</style>
