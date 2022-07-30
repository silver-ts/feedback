import { ref, computed, watchEffect } from 'vue'
import { useMeta } from 'vue-meta'

/**
 * Dynamic page title
 * Read more: https://github.com/nuxt/vue-meta/blob/next/examples/vue-router/Page.ts
 *
 * Provide update hook to change page title based on reactive data
 * @param {function} hook Page title with reactive data
 */
const useReactiveMeta = (hook) => {
  const pageTitle = ref('')

  const metaConfig = computed(() => ({
    title: pageTitle.value,
  }))

  watchEffect(() => {
    pageTitle.value = hook() || ''
  })

  useMeta(metaConfig)
}

export default useReactiveMeta
