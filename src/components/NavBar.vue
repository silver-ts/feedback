<template>
  <header
    class="fixed top-0 left-0 w-full sm:px-4 bg-white border-b border-gray-400/50 drop-shadow-sm z-40"
  >
    <nav
      class="container h-[var(--header-height)] mx-auto max-w-7xl flex items-center justify-between"
    >
      <router-link to="/" class="text-xl mx-2 font-light">✨ Vue Feedback</router-link>
      <ul>
        <li>
          <router-link
            to="/login"
            class="bg-transparent font-semibold py-2 px-4 mx-2 rounded-md border border-indigo-500 hover:bg-indigo-500 text-indigo-500 hover:text-white transition-all"
          >
            Log in
          </router-link>
        </li>
      </ul>
    </nav>
  </header>
</template>
