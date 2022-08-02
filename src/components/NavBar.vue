<script setup>
import { inject } from 'vue'

import NavMenu from '@/components/NavMenu.vue'
import EmptyNavBar from '@/components/EmptyNavBar.vue'
import globals from '@/globals'

const { username, loading } = inject('auth')
</script>

<template>
  <header
    class="fixed top-0 left-0 w-full bg-white border-b border-gray-400/50 drop-shadow-sm z-40"
  >
    <nav
      class="container h-[var(--header-height)] mx-auto max-w-7xl flex items-center justify-between"
    >
      <!-- Branding -->
      <router-link to="/" class="text-xl mx-2 sm:mx-4 font-light">
        {{ globals.appName }}
      </router-link>

      <ul class="flex items-center">
        <!-- Menu skeleton -->
        <li v-if="loading">
          <EmptyNavBar />
        </li>

        <!-- Menu -->
        <template v-if="username && !loading">
          <li>
            <router-link
              to="/new"
              class="hidden sm:block bg-transparent font-semibold py-2 px-4 rounded-md border border-indigo-500 hover:bg-indigo-500 text-indigo-500 hover:text-white transition-all"
            >
              Create Post
            </router-link>
          </li>
          <li>
            <NavMenu />
          </li>
        </template>
        <template v-if="!username && !loading">
          <li>
            <router-link
              to="/login"
              class="bg-transparent font-semibold py-2 px-4 mx-2 sm:mx-4 rounded-md border border-indigo-500 hover:bg-indigo-500 text-indigo-500 hover:text-white transition-all"
            >
              Log in
            </router-link>
          </li>
        </template>
      </ul>
    </nav>
  </header>
</template>
