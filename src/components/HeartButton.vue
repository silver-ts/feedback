<script setup>
import { ref, onUnmounted, onMounted } from 'vue'
import { onSnapshot } from 'firebase/firestore'

import { addHeart, removeHeart, getHeartDocRef } from '@/lib/db'

const props = defineProps({
  uid: String,
  slug: String,
})

const isHearted = ref(false)

// Listen to the `heart` document
const unsubscribe = onMounted(() => {
  return onSnapshot(
    getHeartDocRef(props.uid, props.slug),
    { includeMetadataChanges: true },
    (doc) => {
      isHearted.value = doc.exists()
    },
  )
})

// Stop db watcher
onUnmounted(() => unsubscribe())

const handleAddHeart = async () => {
  await addHeart(props.uid, props.slug)
}

const handleRemoveHeart = async () => {
  await removeHeart(props.uid, props.slug)
}
</script>

<template>
  <button
    v-if="isHearted"
    @click="handleRemoveHeart"
    class="flex items-center justify-center w-full bg-indigo-500 py-2 px-4 rounded-md border border-indigo-500 hover:bg-indigo-600 text-white transition-all"
  >
    <font-awesome-icon icon="fa-solid fa-heart-crack" class="mr-2" />
    Unheart
  </button>
  <button
    v-else
    @click="handleAddHeart"
    class="flex items-center justify-center w-full bg-indigo-500 py-2 px-4 rounded-md border border-indigo-500 hover:bg-indigo-600 text-white transition-all"
  >
    <font-awesome-icon icon="fa-regular fa-heart" class="mr-2" />
    Heart
  </button>
</template>
