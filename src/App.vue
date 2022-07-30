<script setup>
import { useMeta } from 'vue-meta'

import NavBar from '@/components/NavBar.vue'
import PageFooter from '@/components/PageFooter.vue'
import globals from '@/globals'

useMeta({
  htmlAttrs: { lang: 'en', amp: true },
})
</script>

<template>
  <metainfo>
    <template v-slot:title="{ content }">
      {{ content ? `${content} - ${globals.name}` : `${globals.name}` }}
    </template>
  </metainfo>

  <NavBar />
  <router-view />
  <PageFooter />
</template>

<style>
@import '@/assets/base.css';
</style>
