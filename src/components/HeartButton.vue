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

onUnmounted(() => {
  unsubscribe()
})

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
    class="bg-transparent font-semibold py-2 px-4 mx-2 sm:mx-4 rounded-md border border-indigo-500 hover:bg-indigo-500 text-indigo-500 hover:text-white transition-all"
  >
    UnHeart
  </button>
  <button
    v-else
    @click="handleAddHeart"
    class="bg-transparent font-semibold py-2 px-4 mx-2 sm:mx-4 rounded-md border border-indigo-500 hover:bg-indigo-500 text-indigo-500 hover:text-white transition-all"
  >
    Heart
  </button>
</template>
