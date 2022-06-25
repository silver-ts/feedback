<script setup>
import { ref } from 'vue'
import AuthLayout from '@/components/AuthLayout.vue'

const usernameText = ref('')
</script>

<template>
  <AuthLayout :title="`Choose your Username`">
    <form>
      <input
        type="text"
        v-model.trim="usernameText"
        maxlength="15"
        placeholder="your name is .."
        class="block w-full bg-white border rounded-md px-4 py-2"
      />
      <button
        class="w-full bg-transparent font-semibold py-2 px-4 rounded-md border border-indigo-500 hover:bg-indigo-500 text-indigo-500 hover:text-white transition-all h-11 mt-4"
      >
        <span>Sign in as {{ usernameText }}</span>
      </button>
    </form>
    <router-link
      to="/login"
      class="mt-8 text-sm text-indigo-500 hover:text-indigo-500/80 transition"
    >
      <font-awesome-icon icon="fa-solid fa-arrow-left" class="mr-2" />
      <span>Back to the Login page</span>
    </router-link>
  </AuthLayout>
</template>
