import { createApp } from 'vue'
import { createMetaManager } from 'vue-meta'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faGithub, faGoogle } from '@fortawesome/free-brands-svg-icons'
import {
  faArrowLeft,
  faUser,
  faHeartBroken,
  faCircleCheck,
} from '@fortawesome/free-solid-svg-icons'
import { faHeart } from '@fortawesome/free-regular-svg-icons'
import Toast from 'vue-toastification'
import 'vue-toastification/dist/index.css'

import App from '@/App.vue'
import router from '@/router'
import { useAuth } from '@/lib/useAuth'
import { usePosts } from '@/lib/usePosts'
import toastOption from '@/utils/toastOption'

const app = createApp(App)
const auth = useAuth()
const posts = usePosts()

// Global data values providers
app.provide('auth', auth)
app.provide('posts', posts)

// Fontawesome icons
library.add(faGithub, faGoogle, faArrowLeft, faHeart, faUser, faHeartBroken, faCircleCheck)
app.component('font-awesome-icon', FontAwesomeIcon)

// SEO using vue-meta (version 3 is still in alpha)
// Read more: https://stackoverflow.com/questions/66228340/how-to-use-vue-3-meta-with-vue-js-3/67120044#67120044
app.use(createMetaManager())

// Toast Notifications
app.use(Toast, toastOption)

// Router
app.use(router)

app.mount('#app')
