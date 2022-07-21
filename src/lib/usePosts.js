import { ref, watchEffect } from 'vue'
import { getPostsDocs, getNextPostsDocs } from '@/lib/db'
import globals from '@/globals'

export const usePosts = () => {
  const posts = ref([])
  const isPostsEnd = ref(false)
  const loading = ref(true)

  const getPosts = async () => {
    console.log('[getPosts]')
    try {
      const postsSnap = await getPostsDocs()

      postsSnap.forEach((doc) => {
        posts.value.push(doc.data())
      })

      loading.value = false
    } catch (error) {
      posts.value = []
      loading.value = false
    }
  }

  const getMorePosts = async () => {
    loading.value = true

    const lastPost = posts.value[posts.value.length - 1]
    // Convert timestamp object to milliseconds
    // seconds * 1000 => milliseconds; nanoseconds / 1000000 => milliseconds
    const cursor = lastPost.createdAt.seconds * 1000 + lastPost.createdAt.nanoseconds / 1000000

    try {
      const newPostsSnap = await getNextPostsDocs(cursor)
      const newPosts = newPostsSnap.docs.map((doc) => doc.data())

      posts.value = posts.value.concat(newPosts)
      loading.value = false

      if (newPosts.length < globals.postsLimit) {
        isPostsEnd.value = true
      }
    } catch (error) {
      loading.value = false
    }
  }

  watchEffect(async () => {
    getPosts()
  })

  return {
    posts,
    loading,
    isPostsEnd,
    getMorePosts,
  }
}
