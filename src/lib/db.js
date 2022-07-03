import { doc, setDoc, getDoc } from 'firebase/firestore'
import { db } from '@/lib/firebase'

/**
 * Add user to firestore database
 * @param {Object} user - user data
 */
export const createUser = async (user) => {
  const userRef = doc(db, 'users', user.uid)
  return await setDoc(userRef, user, { merge: true })
}
/**
 * Check if username is already taken (or not exists)
 * @param {string} username
 * @returns {boolean}
 */
export const checkUserName = async (username) => {
  const userNameRef = doc(db, 'usernames', username)
  const userNameSnap = await getDoc(userNameRef)

  return userNameSnap.exists()
}
