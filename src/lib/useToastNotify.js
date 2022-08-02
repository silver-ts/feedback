import { useToast } from 'vue-toastification'

/**
 * Use customized toast notification
 * @param {string} message Toast content
 */
const useToastNotify = (message) => {
  const toast = useToast()

  return toast(message || 'Success', {
    position: 'top-center',
    timeout: 2500, // 2.5 sec
    closeOnClick: true,
    pauseOnFocusLoss: true,
    pauseOnHover: true,
    draggable: true,
    draggablePercent: 0.6,
    showCloseButtonOnHover: false,
    hideProgressBar: true,
    closeButton: 'button',
    icon: false,
    rtl: false,
  })
}

export default useToastNotify
