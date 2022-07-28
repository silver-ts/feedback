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
  collectionGroup,
  startAfter,
  Timestamp,
  deleteDoc,
  increment,
} from 'firebase/firestore'

import { db } from '@/lib/firebase'
import globals from '@/globals'

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
  const userRef = collection(db, 'users')
  const userQuery = query(userRef, where('username', '==', username), limit(1))
  const userSnap = await getDocs(userQuery)

  return userSnap.docs.length !== 0 ? userSnap.docs[0].data() : null
}

/**
 * Get user public posts
 * @param {string} uid user id
 */
export const getUserPosts = async (uid) => {
  if (uid) {
    const posts = []

    const userPostsRef = query(
      collection(db, `users/${uid}/posts`),
      where('published', '==', true),
      orderBy('createdAt', 'desc'),
      limit(5),
    )

    const userPostsSnap = await getDocs(userPostsRef)
    userPostsSnap.forEach((doc) => posts.push(doc.data()))

    return posts
  }
}

/**
 * Get all user posts (published & drafts)
 * @param {string} uid user id
 */
export const getAllUserPosts = async (uid) => {
  if (uid) {
    const posts = []

    const userPostsRef = query(
      collection(db, `users/${uid}/posts`),
      orderBy('createdAt', 'desc'),
      limit(5),
    )

    const userPostsSnap = await getDocs(userPostsRef)
    userPostsSnap.forEach((doc) => posts.push(doc.data()))

    return posts
  }
}

/**
 * Get user post from url
 * @param {string} uid user id
 * @param {string} slug post url slug
 */
export const getUserPostContent = async (uid, slug) => {
  if (uid) {
    const postRef = doc(db, `users/${uid}/posts`, slug)
    const postSnap = await getDoc(postRef)

    return postSnap.data() || null
  }
}

/**
 * Get first subset of recent posts
 */
export const getPostsDocs = async () => {
  const firstPostsRef = query(
    collectionGroup(db, 'posts'),
    where('published', '==', true),
    orderBy('createdAt', 'desc'),
    limit(globals.postsLimit),
  )

  const postsSnap = await getDocs(firstPostsRef)
  return postsSnap
}

/**
 * Get next subset of recent posts
 * @param {number} cursor - milliseconds
 */
export const getNextPostsDocs = async (cursor) => {
  const nextPostsRef = query(
    collectionGroup(db, 'posts'),
    where('published', '==', true),
    orderBy('createdAt', 'desc'),
    startAfter(Timestamp.fromMillis(cursor)),
    limit(globals.postsLimit),
  )

  const postsSnap = await getDocs(nextPostsRef)
  return postsSnap
}

export const createNewPost = async (data) => {
  const docRef = doc(db, `users/${data.uid}/posts`, data.slug)
  await setDoc(docRef, data)
}

export const deletePost = async (uid, slug) => {
  const docRef = getPostDocRef(uid, slug)
  await deleteDoc(docRef)
}

export const getHeartDocRef = (uid, slug) => {
  return doc(db, `users/${uid}/posts/${slug}/hearts`, uid)
}

export const getPostDocRef = (uid, slug) => {
  return doc(db, `users/${uid}/posts`, slug)
}

export const addHeart = async (uid, slug) => {
  const docRef = getHeartDocRef(uid, slug)
  const postRef = getPostDocRef(uid, slug)

  const batch = writeBatch(db)
  // 1. Increment heart counter
  batch.set(postRef, { heartCount: increment(1) }, { merge: true })
  // 2. Add a new document to the heart collection
  batch.set(docRef, { uid })

  await batch.commit()
}

export const removeHeart = async (uid, slug) => {
  const docRef = getHeartDocRef(uid, slug)
  const postRef = getPostDocRef(uid, slug)

  const batch = writeBatch(db)
  // 1. Decrement heart counter
  batch.update(postRef, { heartCount: increment(-1) })
  // 2. Remove document from the heart collection
  batch.delete(docRef)

  await batch.commit()
}
