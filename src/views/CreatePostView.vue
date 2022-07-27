<script setup>
import { computed, ref, inject, watchEffect } from 'vue'
import { useRouter } from 'vue-router'
import { serverTimestamp } from 'firebase/firestore'
import { Switch } from '@headlessui/vue'
import kebabCase from 'lodash.kebabcase'
import { marked } from 'marked'

import AuthCheck from '@/components/AuthCheck.vue'
import LoaderSpinner from '@/components/LoaderSpinner.vue'
import { createNewPost, getUserPostContent, getUserDocByUsername, deletePost } from '@/lib/db'

const props = defineProps({
  postId: String,
})

const isPreview = ref(false)
const isPublished = ref(false)
const titleInput = ref('')
const contentInput = ref('')
const post = ref(null)
const loading = ref(false)

const { user, username } = inject('auth')
const router = useRouter()

const slug = computed(() => {
  return encodeURI(kebabCase(titleInput.value))
})

const markdownToHTML = computed(() => {
  return marked(contentInput.value)
})

const handleCreateNewPost = async () => {
  console.log('[create a new post]')
  let data

  if (props.postId) {
    // Update data in existing post
    data = {
      ...post.value,
      published: isPublished.value,
      content: contentInput.value,
      updatedAt: serverTimestamp(),
    }
  } else {
    // Create a new post with user data
    data = {
      title: titleInput.value.trim(),
      slug: slug.value,
      uid: user.value.uid,
      username: username.value,
      author: user.value.displayName,
      published: isPublished.value,
      photoURL: user.value.photoURL,
      content: contentInput.value,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
      heartCount: 0,
    }
  }

  console.log(data)
  await createNewPost(data)

  router.push('/')
}

const handlePreview = () => {
  isPreview.value = !isPreview.value
}

const handleDeletePost = async () => {
  if (props.postId) {
    await deletePost(user.value.uid, props.postId)
  }

  router.push('/')
}

watchEffect(async () => {
  if (props.postId) {
    loading.value = true
    const userDoc = await getUserDocByUsername(username.value)

    if (userDoc) {
      const postDoc = await getUserPostContent(userDoc.uid, props.postId)

      if (postDoc) {
        // Update form inputs with fetched data
        post.value = postDoc
        isPublished.value = postDoc.published
        titleInput.value = postDoc.title
        contentInput.value = postDoc.content
      } else {
        // Initialize a blank form for a new post
        router.push('/new')
      }
    }

    loading.value = false
  }
})
</script>

<template>
  <main v-if="loading">
    <LoaderSpinner />
  </main>

  <AuthCheck>
    <main v-if="!loading" class="flex relative flex-col sm:flex-row">
      <section
        class="flex-1 mr-0 sm:mr-4 mb-4 bg-white rounded-lg border border-gray-400/50 drop-shadow-sm p-4 sm:px-16 sm:py-8"
      >
        <div v-if="isPreview" v-html="markdownToHTML" class="prose w-full"></div>
        <form v-if="!isPreview" class="flex flex-col h-full" @submit.prevent="handleCreateNewPost">
          <input
            type="text"
            placeholder="Your title ..."
            v-model="titleInput"
            class="w-full py-2 sm:py-4 font-semibold text-xl sm:text-2xl focus:outline-none"
          />
          <p>Post ID: {{ slug }}</p>
          <textarea
            v-model="contentInput"
            placeholder="Write your feedback here ..."
            oninput='this.style.height = "";this.style.height = this.scrollHeight + "px"'
            class="py-2 sm:py-4 h-full w-full resize-none overflow-hidden focus:outline-none"
          ></textarea>
          <div class="mt-2 sm:mt-4 flex flex-col sm:flex-row justify-between items-center">
            <div class="flex items-center mb-4 sm:mb-0">
              <span class="mr-2">Published</span>
              <Switch
                v-model="isPublished"
                :class="isPublished ? 'bg-indigo-700' : 'bg-gray-300'"
                class="relative inline-flex h-6 w-10 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
              >
                <span
                  aria-hidden="true"
                  :class="isPublished ? 'translate-x-4' : 'translate-x-0'"
                  class="pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out"
                ></span>
              </Switch>
            </div>
            <button
              type="submit"
              class="bg-transparent py-2 px-4 rounded-md border border-indigo-500 hover:bg-indigo-500 text-indigo-500 hover:text-white transition-all relative h-11"
            >
              Save changes
            </button>
          </div>
        </form>
      </section>
      <aside
        class="sticky max-w-xs w-full h-80 sm:top-[length:var(--aside-top)] right-0 p-4 sm:p-5"
      >
        <div class="flex flex-col">
          <button
            @click="handlePreview"
            class="bg-transparent py-2 px-4 rounded-md border border-indigo-500 hover:bg-indigo-500 text-indigo-500 hover:text-white transition-all relative h-11"
          >
            Preview
          </button>
          <button
            @click="handleDeletePost"
            class="mt-2 sm:mt-4 bg-transparent py-2 px-4 rounded-md border border-red-400 hover:bg-red-400 text-red-400 hover:text-white transition-all relative h-11"
          >
            Delete
          </button>
        </div>
      </aside>
    </main>
  </AuthCheck>
</template>
