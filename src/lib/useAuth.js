import { ref, watchEffect, watch } from 'vue'
import { onAuthStateChanged, signInWithPopup, signInAnonymously, signOut } from '@firebase/auth'
import { doc, onSnapshot } from 'firebase/firestore'

import router from '@/router'
import { createUser, getUsername } from '@/lib/db'
import { auth, db, providers } from '@/lib/firebase'

export const useAuth = () => {
  const user = ref(null)
  const username = ref(null)
  const loading = ref(true)

  const handleUser = async (userRaw) => {
    if (userRaw) {
      user.value = formatUser(userRaw)

      await createUser(user.value)
      username.value = await getUsername(user.value.uid)
    } else {
      user.value = null
    }

    loading.value = false
  }

  watchEffect((onCleanup) => {
    const unsubscribe = onAuthStateChanged(auth, (userRaw) => {
      handleUser(userRaw)
      console.log('[onAuthStateChanged]')
    })

    onCleanup(unsubscribe)
  })

  watch(user, (user) => {
    if (user && !username.value) {
      const userRef = doc(db, 'users', user.uid)

      onSnapshot(userRef, (userSnap) => {
        username.value = userSnap.data()?.username
        console.log('[onUserNameChanged]')
      })
    } else {
      username.value = null
    }
  })

  const handleSignInWithGoogle = async () => {
    try {
      await signInWithPopup(auth, providers.googleProvider)
    } catch (error) {
      handleUser(null)
    }
  }

  const handlesignInAnonymously = async () => {
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
