import { createApp } from 'vue'
import './style.css'

import vapour from 'vapour-ui'

import App from './App.vue'
import router from './router'

const app = createApp(App)
app.use(vapour)

app.use(router)

app.mount('#app')
