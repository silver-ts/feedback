import { createApp } from 'vue'
import { createMetaManager } from 'vue-meta'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faGithub, faGoogle } from '@fortawesome/free-brands-svg-icons'
import { faArrowLeft, faUser, faHeartBroken } from '@fortawesome/free-solid-svg-icons'
import { faHeart } from '@fortawesome/free-regular-svg-icons'

import App from '@/App.vue'
import router from '@/router'
import { useAuth } from '@/lib/useAuth'
import { usePosts } from '@/lib/usePosts'

const app = createApp(App)
const auth = useAuth()
const posts = usePosts()

// Global data values providers
app.provide('auth', auth)
app.provide('posts', posts)

// Fontawesome icons
library.add(faGithub, faGoogle, faArrowLeft, faHeart, faUser, faHeartBroken)
app.component('font-awesome-icon', FontAwesomeIcon)

// Vue Meta 3 (still in alpha)
// Read more: https://stackoverflow.com/questions/66228340/how-to-use-vue-3-meta-with-vue-js-3/67120044#67120044
app.use(createMetaManager())

// Router
app.use(router)

app.mount('#app')
