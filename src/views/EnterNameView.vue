<script setup>
import { ref, watch } from 'vue'
import debounce from 'lodash.debounce'
import AuthContainer from '@/components/AuthContainer.vue'
import { checkUserName } from '@/lib/db'

const usernameText = ref('')
const usernameIsValid = ref(false)
const usernameIsUnique = ref(false)
const loading = ref(false)

const handleFormSubmit = async () => {
  // 1. Create create refs for user & username documents
  // 2. Update both documents together
  console.log('[handleFormSubmit]')
}

const handleInputChange = (e) => {
  // 1. Format username value
  const inputValue = e.target.value.toLowerCase()
  usernameText.value = inputValue

  // 2. Validate input
  if (inputValue.length < 3) {
    usernameIsValid.value = false
    usernameIsUnique.value = false
    loading.value = false
    return
  }

  // 3. Check if String contains only Letters and Numbers
  const inputIsValid = /^([A-Za-z0-9]{3,15})*$/.test(inputValue)

  if (!inputIsValid) {
    usernameIsValid.value = false
    usernameIsUnique.value = false
    loading.value = false
  } else {
    usernameIsValid.value = true
    usernameIsUnique.value = false
    loading.value = true
  }
}

const check = debounce(async (username) => {
  console.log('[debounce]')

  if (usernameIsValid.value) {
    const userNameRef = await checkUserName(username)
    usernameIsUnique.value = !userNameRef
    loading.value = false
  }
}, 1000)

watch(usernameText, check, { flush: 'post' })
</script>

<template>
  <AuthContainer :title="`Choose your Username`">
    <form @submit.prevent="handleFormSubmit">
      <!-- v-model.trim="usernameText" -->
      <input
        type="text"
        :value="usernameText"
        @input="handleInputChange"
        maxlength="15"
        placeholder="your name is .."
        class="block w-full bg-white border border-gray-400/50 rounded-md px-4 py-2 hover:border-indigo-500 focus:border-indigo-500 outline-none transition"
      />
      <div>isValid : {{ usernameIsValid }}</div>
      <div>loading : {{ loading }}</div>
      <div>unique : {{ usernameIsUnique }}</div>
      <button
        type="submit"
        :disabled="!usernameIsValid || !usernameIsUnique || loading"
        class="w-full bg-transparent font-semibold py-2 px-4 rounded-md border border-indigo-500 disabled:border-gray-400 hover:bg-indigo-500 disabled:hover:bg-transparent text-indigo-500 disabled:text-gray-500 hover:text-white disabled:hover:text-gray-500 transition-all h-11 mt-4"
      >
        <span>Sign in as {{ usernameText }}</span>
      </button>
    </form>
    <router-link
      to="/login"
      class="mt-8 text-sm text-indigo-500 hover:text-indigo-500/80 transition"
    >
      <font-awesome-icon icon="fa-solid fa-arrow-left" class="mr-2" />
      <span>Back to the Login page</span>
    </router-link>
  </AuthContainer>
</template>
