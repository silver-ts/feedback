import { ref, watchEffect } from 'vue'
import { onAuthStateChanged, signInWithPopup, signOut } from '@firebase/auth'

import router from '@/router'
import { auth, providers } from '@/lib/firebase.js'

export const useAuth = () => {
  const user = ref(null)
  const loading = ref(false)

  const handleUser = (userRaw) => {
    if (userRaw) {
      user.value = formatUser(userRaw)
    } else {
      user.value = null
    }

    loading.value = false
  }

  watchEffect((onCleanup) => {
    const unsubscribe = onAuthStateChanged(auth, (userRaw) => {
      console.log('[onAuthStateChanged]')
      handleUser(userRaw)
    })

    onCleanup(unsubscribe)
  })

  const handleSignInWithGoogle = async (redirect) => {
    loading.value = true

    try {
      await signInWithPopup(auth, providers.googleProvider)
    } catch (error) {
      handleUser(null)
    }

    if (redirect) {
      await router.push(redirect)
    }
  }

  const handleSignOut = async () => {
    await signOut(auth)
  }

  return { user, loading, handleSignInWithGoogle, handleSignOut }
}

const formatUser = (user) => {
  return {
    uid: user.uid,
    displayName: user.displayName,
    photoURL: user.photoURL,
  }
}
