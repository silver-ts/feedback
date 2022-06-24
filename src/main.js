import { createApp } from 'vue'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faGithub } from '@fortawesome/free-brands-svg-icons'

import router from './router'
import App from './App.vue'

const app = createApp(App)

// Fontawesome icons
library.add(faGithub)
app.component('font-awesome-icon', FontAwesomeIcon)

app.use(router)
app.mount('#app')
