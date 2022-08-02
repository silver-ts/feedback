/**
 * Options for `vue-tostification`
 * Example: https://vue-toastification.maronato.dev/
 * Docs: https://github.com/Maronato/vue-toastification/
 */
export default {
  transition: 'Vue-Toastification__bounce',
  maxToasts: 5,
  newestOnTop: true,
  containerClassName: '',
  toastClassName:
    'bg-white text-gray-800 rounded-lg border border-gray-400/50 drop-shadow-sm py-2 px-4 text-sm',
  closeButtonClassName: 'text-gray-800',
  bodyClassName: 'flex items-center justify-between',
}
