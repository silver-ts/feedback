<script setup>
import { useMeta } from 'vue-meta'

import NavBar from '@/components/NavBar.vue'
import PageFooter from '@/components/PageFooter.vue'
import globals from '@/globals'

useMeta({
  htmlAttrs: { lang: 'en', amp: true },
  meta: [
    // Twitter
    { name: 'twitter:card', content: 'summary' },
    { name: 'twitter:title', content: 'Vue Feedback' },
    {
      name: 'twitter:description',
      content: '✒️ A public feedback board with user voting',
    },
    { name: 'twitter:image', content: 'https://vue-feedback-ryuuto829.netlify.app/og.png' },
    // Facebook OG
    { property: 'og:title', content: 'Vue Feedback' },
    { property: 'og:site_name', content: 'Vue Feedback' },
    { property: 'og:type', content: 'website' },
    { property: 'og:image', content: 'https://vue-feedback-ryuuto829.netlify.app/og.png' },
    {
      property: 'og:description',
      content: '✒️ A public feedback board with user voting',
    },
  ],
})
</script>

<template>
  <!-- SEO -->
  <metainfo>
    <template v-slot:title="{ content }">
      {{ content ? `${content} - ${globals.name}` : `${globals.name}` }}
    </template>
  </metainfo>

  <!-- Page Layout -->
  <NavBar />
  <router-view />
  <PageFooter />
</template>

<style>
@import '@/assets/base.css';
</style>
