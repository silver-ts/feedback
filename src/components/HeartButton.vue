<script setup>
import { ref, onUnmounted, onMounted, inject } from 'vue'
import { onSnapshot } from 'firebase/firestore'

import { addHeart, removeHeart, getHeartDocRef } from '@/lib/db'

const props = defineProps({
  uid: String,
  slug: String,
  heartCount: Number,
})

const { user } = inject('auth')
const isHearted = ref(false)

// Listen to the `heart` document
const unsubscribe = onMounted(() => {
  return onSnapshot(
    getHeartDocRef(user.value.uid, props.uid, props.slug),
    { includeMetadataChanges: true },
    (doc) => {
      isHearted.value = doc.exists()
    },
  )
})

// Stop db watcher
onUnmounted(() => unsubscribe())

const handleAddHeart = async () => {
  await addHeart(user.value.uid, props.uid, props.slug)
}

const handleRemoveHeart = async () => {
  await removeHeart(user.value.uid, props.uid, props.slug)
}
</script>

<template>
  <div
    :class="`${isHearted ? 'text-indigo-600' : ''}`"
    class="flex items-center justify-center text-base font-semibold"
  >
    <font-awesome-icon icon="fa-regular fa-heart" class="mr-2" />
    <span>
      {{ heartCount === 1 ? `${heartCount} Reaction` : `${heartCount} Reactions` }}
    </span>
  </div>

  <button
    v-if="isHearted"
    @click="handleRemoveHeart"
    class="mt-4 flex items-center justify-center w-full bg-indigo-500 py-2 px-4 rounded-md border border-indigo-500 hover:bg-indigo-600 text-white transition-all"
  >
    <font-awesome-icon icon="fa-solid fa-heart-crack" class="mr-2" />
    <span>Unheart</span>
  </button>
  <button
    v-else
    @click="handleAddHeart"
    class="mt-4 flex items-center justify-center w-full bg-indigo-500 py-2 px-4 rounded-md border border-indigo-500 hover:bg-indigo-600 text-white transition-all"
  >
    <font-awesome-icon icon="fa-regular fa-heart" class="mr-2" />
    <span>Heart</span>
  </button>
</template>
