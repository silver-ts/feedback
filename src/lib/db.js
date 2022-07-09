import {
  doc,
  setDoc,
  getDoc,
  writeBatch,
  collection,
  where,
  query,
  limit,
  orderBy,
  getDocs,
} from 'firebase/firestore'
import { db } from '@/lib/firebase'

/**
 * Add user to firestore database
 * @param {Object} user - user specific data
 */
export const createUser = async (user) => {
  const userRef = doc(db, 'users', user.uid)
  await setDoc(userRef, user, { merge: true })
}
/**
 * Check if username is already taken (or not exists)
 * @param {string} username
 * @returns {boolean}
 */
export const checkUsername = async (username) => {
  const userNameRef = doc(db, 'usernames', username)
  const userNameSnap = await getDoc(userNameRef)

  return userNameSnap.exists()
}

/**
 * Create refs for user & username documents & update both of them together
 * @param {string} uid
 * @param {string} username
 */
export const updateUsername = async (uid, username) => {
  const userNameRef = doc(db, 'usernames', username)
  const userRef = doc(db, 'users', uid)

  const batch = writeBatch(db)
  batch.set(userNameRef, { uid })
  batch.set(userRef, { username }, { merge: true })

  await batch.commit()
}

/**
 * Get username from the database
 * @param {string} uid
 * @returns {string | null} - username
 */
export const getUsername = async (uid) => {
  const userRef = doc(db, 'users', uid)
  const userSnap = await getDoc(userRef)

  return userSnap.data()?.username || null
}

/**
 * Get user document by username
 * @param {string} username
 */
export const getUserDocByUsername = async (username) => {
  try {
    const userRef = collection(db, 'users')
    const userQuery = query(userRef, where('username', '==', username), limit(1))
    const userSnap = await getDocs(userQuery)

    return userSnap.docs[0]
  } catch (error) {
    return null
  }
}

/**
 * Get user public posts
 * @param {string} username
 */
export const getUserPosts = async (username) => {
  const userDoc = await getUserDocByUsername(username)

  if (!userDoc) {
    return { author: null, posts: [] }
  }

  const author = userDoc.data()
  const posts = []

  if (author) {
    console.log('[getUserPosts]')

    const userPostsRef = query(
      collection(db, `users/${author.uid}/posts`),
      where('published', '==', true),
      orderBy('createdAt', 'desc'),
      limit(5),
    )

    const userPostsSnap = await getDocs(userPostsRef)
    userPostsSnap.forEach((doc) => posts.push(doc.data()))
  }

  return { author, posts }
}
