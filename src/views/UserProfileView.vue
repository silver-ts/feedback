<script setup>
import { inject } from 'vue'

import PostItem from '@/components/PostItem.vue'
import UserAvatar from '@/components/UserAvatar.vue'
import globals from '@/globals'

const { user, username } = inject('auth')
</script>

<template>
  <main>
    <header v-if="user" class="text-center">
      <UserAvatar
        class="w-14 sm:w-28 h-14 sm:h-28 mx-auto"
        :iconSize="`3x`"
        :photoURL="user.photoURL"
      />
      <h2 class="mt-4 sm:mt-5 text-xl sm:text-3xl font-semibold">
        {{ user.displayName || globals.defaultUserName }}
      </h2>
      <span class="mt-1 sm:mt-2 block">{{ `@${username}` }}</span>
    </header>

    <section class="mt-4 sm:mt-9">
      <template v-for="n in 5" :key="n">
        <PostItem :author="`username${n}`" :postId="`post${n}`" />
      </template>
    </section>
  </main>
</template>
