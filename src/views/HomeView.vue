<template>
  <main class="relative flex flex-col sm:flex-row">
    <section class="flex-1">
      <template v-for="n in 25" :key="n">
        <article class="mb-4">
          <router-link
            :to="`/users/username${n}/post${n}`"
            class="block bg-white rounded-lg border border-gray-300/50 drop-shadow-sm p-4 sm:p-5"
          >
            <div class="flex items-center">
              <div class="mr-2 w-8 h-8 rounded-full bg-blue-500/50"></div>
              <div>
                <router-link
                  to="/users/username1"
                  class="p-1 font-semibold rounded hover:bg-gray-200/50 transition"
                >
                  Jaiden
                </router-link>
                <div class="text-xs ml-1">Jun 25 (16 hours ago)</div>
              </div>
            </div>
            <h3
              class="mt-4 sm:mt-6 font-semibold text-xl sm:text-2xl hover:text-indigo-500 transition"
            >
              Post {{ n }} Title
            </h3>
            <div class="mt-4 sm:mt-6 flex items-center justify-end">
              <span class="text-xs mr-4">24 words. 1 min read</span>
              <div class="flex items-center justify-center">
                <font-awesome-icon icon="fa-regular fa-heart" class="mr-2" />
                <span class="text-sm sm:text-base">3 Reactions</span>
              </div>
            </div>
          </router-link>
        </article>
      </template>
    </section>
  </main>
</template>
