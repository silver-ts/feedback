import { ref, watchEffect } from 'vue'
import { onAuthStateChanged, signInWithPopup, signInAnonymously, signOut } from '@firebase/auth'
// import { doc, onSnapshot } from 'firebase/firestore'
// import { db } from '@/lib/firebase'
import { createUser } from '@/lib/db'

import router from '@/router'
import { auth, providers } from '@/lib/firebase.js'

export const useAuth = () => {
  const user = ref(null)
  const username = ref(null)
  const loading = ref(false)

  const handleUser = async (userRaw) => {
    if (userRaw) {
      user.value = formatUser(userRaw, username.value)
      await createUser(user.value)
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

  // watchEffect((onCleanup) => {
  //   let unsubscribe

  //   if (user.value) {
  //     const userRef = doc(db, 'users', user.value.uid)
  //     unsubscribe = onSnapshot(userRef, (doc) => {
  //       username.value = doc.data()?.username
  //       console.log('[onSnapshot]', doc.data())
  //     })
  //   } else {
  //     username.value = null
  //   }

  //   // onCleanup(unsubscribe)
  // })

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

  const handlesignInAnonymously = async () => {
    await signInAnonymously(auth)
  }

  const handleSignOut = async () => {
    await signOut(auth)
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

const formatUser = (user, username) => {
  return {
    uid: user.uid,
    displayName: user.displayName,
    photoURL: user.photoURL,
    username,
  }
}
