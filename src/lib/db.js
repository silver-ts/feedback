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
 * Get `hearts` document reference from Firebase
 * @param {string} currentUserId User ID
 * @param {string} uid Post author ID
 * @param {string} slug Post ID
 * @returns {object} docRef
 */
export const getHeartDocRef = (currentUserId, uid, slug) => {
  return doc(db, `users/${uid}/posts/${slug}/hearts`, currentUserId)
}

/**
 * Get `posts` document reference from Firebase
 * @param {string} uid User ID
 * @param {string} slug Post ID
 * @returns {object} docRef
 */
export const getPostDocRef = (uid, slug) => {
  return doc(db, `users/${uid}/posts`, slug)
}

/**
 * Get `usernames` document reference from Firebase
 * @param {string} username
 * @returns {object} docRef
 */
export const getUsernameDocRef = (username) => {
  return doc(db, 'usernames', username)
}

/**
 * Get `users` document reference from Firebase
 * @param {string} uid User ID
 * @returns {object} docRef
 */
export const getUserDocRef = (uid) => {
  return doc(db, 'users', uid)
}

/**
 * Add user to the database
 * @param {object} user - User data
 * @returns {object} docRef
 */
export const createUser = async (user) => {
  await setDoc(getUserDocRef(user.uid), user, { merge: true })
}

/**
 * Check if username is already taken (or not exists)
 * @param {string} username
 * @returns {boolean}
 */
export const checkUsername = async (username) => {
  const usernameSnap = await getDoc(getUsernameDocRef(username))
  return usernameSnap.exists()
}

/**
 * Create refs for user & username documents & update both of them together
 * @param {string} uid
 * @param {string} username
 */
export const updateUsername = async (uid, username) => {
  const usernameRef = getUsernameDocRef(username)
  const userRef = getUserDocRef(uid)

  const batch = writeBatch(db)
  batch.set(usernameRef, { uid })
  batch.set(userRef, { username }, { merge: true })

  await batch.commit()
}

/**
 * Get username from the database
 * @param {string} uid
 * @returns {string | null} - username
 */
export const getUsername = async (uid) => {
  const userSnap = await getDoc(getUserDocRef(uid))
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
 * @param {string} uid User ID
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
 * Get user post data from URL
 * @param {string} uid User ID
 * @param {string} slug Post ID
 */
export const getUserPostContent = async (uid, slug) => {
  if (uid) {
    const postSnap = await getDoc(getPostDocRef(uid, slug))
    return postSnap.data() || null
  }
}

/**
 * Get the first subset of recent posts
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
 * Get the next subset of recent posts
 * @param {number} cursor - Date in milliseconds
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

/**
 * Create a new post
 * @param {object} data Post data
 */
export const createNewPost = async (data) => {
  await setDoc(getPostDocRef(data.uid, data.slug), data)
}

/**
 * Delete post by slug ID
 * @param {string} uid User ID
 * @param {string} slug Post ID
 */
export const deletePost = async (uid, slug) => {
  await deleteDoc(getPostDocRef(uid, slug))
}

/**
 * Increment heart counter for a given post
 * @param {string} currentUserId User ID
 * @param {string} uid Post author ID
 * @param {string} slug Post ID
 */
export const addHeart = async (currentUserId, uid, slug) => {
  const docRef = getHeartDocRef(currentUserId, uid, slug)
  const postRef = getPostDocRef(uid, slug)

  const batch = writeBatch(db)
  // 1. Increment heart counter
  batch.update(postRef, { heartCount: increment(1) })
  // 2. Add a new document to the heart collection
  batch.set(docRef, { uid })

  await batch.commit()
}

/**
 * Decrement heart counter for a given post
 * @param {string} currentUserId User ID
 * @param {string} uid Post author ID
 * @param {string} slug Post ID
 */
export const removeHeart = async (currentUserId, uid, slug) => {
  const docRef = getHeartDocRef(currentUserId, uid, slug)
  const postRef = getPostDocRef(uid, slug)

  const batch = writeBatch(db)
  // 1. Decrement heart counter
  batch.update(postRef, { heartCount: increment(-1) })
  // 2. Remove document from the heart collection
  batch.delete(docRef)

  await batch.commit()
}
