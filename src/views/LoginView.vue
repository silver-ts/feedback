<script setup>
import { watch } from 'vue'
import { useRouter } from 'vue-router'
import { useMeta } from 'vue-meta'

import AuthContainer from '@/components/AuthContainer.vue'
import EnterNameView from '@/views/EnterNameView.vue'
import PageLoader from '@/components/PageLoader.vue'
import { useAuth } from '@/lib/useAuth'

useMeta({
  title: 'Login',
})

const { user, username, loading, handlesignInAnonymously, handleSignInWithGoogle } = useAuth()
const router = useRouter()

const handleRedirect = (username) => {
  if (username) {
    router.push('/')
  }
}

watch(username, handleRedirect)
</script>

<template>
  <PageLoader :loading="loading" />

  <AuthContainer v-if="!user && !loading" :title="'Welcome to Vue Feedback!'">
    <button
      @click="handleSignInWithGoogle"
      class="bg-transparent py-2 px-4 rounded-md border border-indigo-500 hover:bg-indigo-500 text-indigo-500 hover:text-white transition-all relative h-11"
    >
      <font-awesome-icon icon="fa-brands fa-google" class="absolute left-2 top-2.5 w-5 h-5" />
      <span class="font-semibold">Continue with Google</span>
    </button>
    <button
      @click="handlesignInAnonymously"
      class="bg-transparent font-semibold py-2 px-4 rounded-md border border-indigo-500 hover:bg-indigo-500 text-indigo-500 hover:text-white transition-all h-11 mt-4"
    >
      <span>Continue Anonymously</span>
    </button>
    <router-link to="/" class="mt-8 text-sm text-indigo-500 hover:text-indigo-500/80 transition">
      <font-awesome-icon icon="fa-solid fa-arrow-left" class="mr-2" />
      <span>Back to the Home page</span>
    </router-link>
  </AuthContainer>

  <EnterNameView v-else-if="user && !username && !loading" />
</template>
