<script setup>
import { inject, watchEffect } from 'vue'
import { useRouter } from 'vue-router'

import LoaderSpinner from '@/components/LoaderSpinner.vue'

const router = useRouter()
const { username, loading } = inject('auth')

watchEffect(() => {
  if (!username.value && !loading.value) {
    router.push('/login')
  }
})
</script>

<template>
  <div v-if="loading" class="w-full flex justify-center">
    <LoaderSpinner />
  </div>

  <template v-if="!loading && username">
    <slot></slot>
  </template>
</template>
