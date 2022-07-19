import { ref, watchEffect } from 'vue'
import { onAuthStateChanged, signInWithPopup, signInAnonymously, signOut } from 'firebase/auth'

import router from '@/router'
import { createUser, getUsername, updateUsername } from '@/lib/db'
import { auth, providers } from '@/lib/firebase'

export const useAuth = () => {
  const user = ref(null)
  const username = ref(null)
  const loading = ref(true)

  const handleUser = async (userRaw) => {
    if (userRaw) {
      const userData = formatUser(userRaw)

      // 1. Update user data in db with user
      await createUser(userData)

      // 2. `userRaw` doesn't provide a custom username, so we get it from the db
      username.value = await getUsername(userData.uid)
      user.value = userData
    } else {
      user.value = null
      username.value = null
    }

    loading.value = false
  }

  watchEffect((onCleanup) => {
    // The `onAuthStateChanged` observer is only triggered on sign-in or sign-out.
    const unsubscribe = onAuthStateChanged(auth, async (userRaw) => {
      console.log('[onAuthStateChanged]')
      await handleUser(userRaw)
    })

    onCleanup(unsubscribe)
  })

  const handleUsernameUpdate = async (newUsername) => {
    await updateUsername(user.value.uid, newUsername)
    username.value = newUsername
  }

  const handleSignInWithGoogle = async () => {
    loading.value = true

    try {
      await signInWithPopup(auth, providers.googleProvider)
    } catch (error) {
      handleUser(null)
    }
  }

  const handlesignInAnonymously = async () => {
    loading.value = true

    try {
      await signInAnonymously(auth)
    } catch (error) {
      handleUser(null)
    }
  }

  const handleSignOut = async () => {
    await signOut(auth)
    router.push('/')
  }

  return {
    user,
    username,
    loading,
    handleUsernameUpdate,
    handleSignInWithGoogle,
    handlesignInAnonymously,
    handleSignOut,
  }
}

const formatUser = (user) => {
  return {
    uid: user.uid,
    displayName: user.displayName,
    photoURL: user.photoURL,
  }
}
