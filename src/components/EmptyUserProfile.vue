<template>
  <main class="animate-pulse">
    <div class="flex items-center flex-col text-center">
      <div class="w-14 sm:w-28 h-11 sm:h-28 mx-auto bg-indigo-200/50 rounded-full"></div>
      <div class="mt-4 sm:mt-5 w-56 h-11 bg-indigo-200/50"></div>
      <div class="mt-1 sm:mt-2 h-6 w-24 bg-indigo-200/50"></div>
    </div>

    <section class="mt-4 sm:mt-9">
      <template v-for="n in 2" :key="n">
        <div class="mb-4">
          <div class="bg-indigo-200/50 rounded-lg h-48 max-w-4xl mx-auto"></div>
        </div>
      </template>
    </section>
  </main>
</template>
