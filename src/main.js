import { createApp } from 'vue'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faGithub, faGoogle } from '@fortawesome/free-brands-svg-icons'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'

import router from './router'
import App from './App.vue'

const app = createApp(App)

// Fontawesome icons
library.add(faGithub, faGoogle, faArrowLeft)
app.component('font-awesome-icon', FontAwesomeIcon)

app.use(router)
app.mount('#app')
