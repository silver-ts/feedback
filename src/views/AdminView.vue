<script setup>
import AuthCheck from '@/components/AuthCheck.vue'
import PostItem from '@/components/PostItem.vue'
</script>

<template>
  <main>
    <AuthCheck>
      <div>Admin page</div>

      <PostItem />
    </AuthCheck>
  </main>
</template>
