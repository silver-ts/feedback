import { createApp } from 'vue'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faGithub, faGoogle } from '@fortawesome/free-brands-svg-icons'
import { faArrowLeft, faUser } from '@fortawesome/free-solid-svg-icons'
import { faHeart } from '@fortawesome/free-regular-svg-icons'

import App from './App.vue'
import router from './router'
import { useAuth } from '@/lib/useAuth'

const app = createApp(App)

// Global auth provider
const auth = useAuth()
app.provide('auth', auth)

// Fontawesome icons
library.add(faGithub, faGoogle, faArrowLeft, faHeart, faUser)
app.component('font-awesome-icon', FontAwesomeIcon)

// Router
app.use(router)

app.mount('#app')
