<script setup>
import MetaHeader from '@/components/MetaHeader.vue'
</script>

<template>
  <main class="flex relative flex-col sm:flex-row">
    <section
      class="flex-1 mr-0 sm:mr-4 mb-4 bg-white rounded-lg border border-gray-400/50 drop-shadow-sm p-4 sm:px-16 sm:py-8"
    >
      <MetaHeader :author="`Jainden`" :createdAt="`Posted on Jun 25`" />
      <article class="mt-6 sm:mt-8">
        <h3 class="font-semibold text-xl sm:text-2xl">Post Title</h3>
        <p>Post content ...</p>
      </article>
    </section>
    <aside
      class="sticky max-w-xs w-full h-80 sm:top-[length:var(--aside-top)] right-0 bg-white rounded-lg border border-gray-400/50 drop-shadow-sm p-4 sm:p-5"
    >
      <div class="flex items-center justify-center">
        <font-awesome-icon icon="fa-regular fa-heart" class="mr-2" />
        <span class="text-sm sm:text-base">3 Reactions</span>
      </div>
    </aside>
  </main>
</template>
