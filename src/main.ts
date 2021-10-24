import { createApp } from 'vue'
import { createPinia } from 'pinia'
import './assets/tailwind.css'
import routes from './routes'
import App from './App.vue'

const app = createApp(App)

app.use(routes)
app.use(createPinia())
app.mount('#app')
