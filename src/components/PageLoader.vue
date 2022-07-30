<script setup>
import LoaderSpinner from '@/components/LoaderSpinner.vue'

defineProps({
  loading: Boolean,
})
</script>

<template>
  <main v-if="loading">
    <LoaderSpinner />
  </main>
</template>
