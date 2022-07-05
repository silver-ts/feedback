import { doc, setDoc, getDoc, writeBatch } from 'firebase/firestore'
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
