<template>
  <nav class="container flex items-center justify-between h-14 mx-auto max-w-7xl sm:px-4">
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
</template>
