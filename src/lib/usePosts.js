import { ref, watch } from 'vue'
import { db } from '@/lib/firebase'
import { limit, orderBy, query, where, getDocs, collection } from 'firebase/firestore'

export const usePosts = (user) => {
  const userPosts = ref(null)
  // const recentPosts = ref(null)

  const getUserPosts = async () => {
    if (user.value) {
      console.log('[getUserPosts]')
      const docs = []

      const userPostsRef = query(
        collection(db, `users/${user.value.uid}/posts`),
        where('published', '==', true),
        orderBy('createdAt', 'desc'),
        limit(5),
      )

      const userPostsSnap = await getDocs(userPostsRef)

      userPostsSnap.forEach((doc) => docs.push(doc.data()))
      userPosts.value = docs
    }
  }

  watch(user, getUserPosts)

  return { userPosts }
}
