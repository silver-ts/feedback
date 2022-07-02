<script setup>
import { inject } from 'vue'
import { Menu, MenuButton, MenuItems, MenuItem } from '@headlessui/vue'
import UserAvatar from '@/components/UserAvatar.vue'

const { user, handleSignOut } = inject('auth')
</script>

<template>
  <Menu as="div" class="relative mx-2 sm:mx-4 flex items-center justify-center">
    <MenuButton v-slot="{ open }">
      <UserAvatar
        :photoURL="user.photoURL"
        class="ring-4 ring-white hover:ring-indigo-200/50 focus-visible:ring-indigo-200/50 transition"
        :class="{ 'ring-indigo-200/50': open }"
      />
    </MenuButton>
    <MenuItems
      class="absolute right-0 top-8 mt-2 w-60 origin-top-right flex flex-col rounded-md bg-white shadow-md border border-gray-400/50 focus:outline-none divide-y divide-gray-200"
    >
      <div class="p-2">
        <MenuItem
          class="px-4 py-2 rounded-md hover:text-indigo-500 hover:bg-indigo-200/50 text-left w-full transition cursor-pointer"
        >
          <div>
            <router-link to="/username">
              <span class="font-semibold block">{{ user.displayName }}</span>
              <span class="text-sm block">@jaiden</span>
            </router-link>
          </div>
        </MenuItem>
      </div>
      <div class="p-2">
        <MenuItem
          class="px-4 py-2 rounded-md hover:text-indigo-500 hover:bg-indigo-200/50 text-left w-full transition cursor-pointer"
        >
          <router-link to="/new" class="block">Create Post</router-link>
        </MenuItem>
      </div>
      <div class="p-2">
        <MenuItem
          class="px-4 py-2 rounded-md hover:text-indigo-500 hover:bg-indigo-200/50 text-left w-full transition cursor-pointer"
        >
          <button @click="handleSignOut">Sign out</button>
        </MenuItem>
      </div>
    </MenuItems>
  </Menu>
</template>
