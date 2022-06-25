<script setup>
defineProps({
  title: String,
})
</script>

<template>
  <main class="flex items-center justify-center flex-col">
    <h2 class="text-center text-lg sm:text-2xl font-light">{{ title }}</h2>

    <div class="flex flex-col max-w-xs mx-auto py-8 w-full">
      <slot>Content of this page is not found.</slot>
    </div>
  </main>
</template>
