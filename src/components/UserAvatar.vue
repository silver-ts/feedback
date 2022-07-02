<script setup>
defineProps({
  photoURL: String,
  iconSize: String,
})
</script>

<template>
  <template v-if="photoURL">
    <img
      :src="photoURL"
      alt="Avatar"
      class="w-8 h-8 rounded-full bg-indigo-500/50"
      :class="$attrs.class"
    />
  </template>
  <template v-else>
    <div
      class="flex items-center justify-center w-8 h-8 rounded-full bg-indigo-500"
      :class="$attrs.class"
    >
      <font-awesome-icon
        icon="fa-solid fa-user"
        :size="iconSize"
        class="text-white drop-shadow-md"
      />
    </div>
  </template>
</template>
