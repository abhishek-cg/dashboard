import { createApp } from 'vue'
import App from './App.vue'
import { createPinia } from 'pinia'
import router from './router'
import vuetify from './plugins/vuetify'

const app = createApp(App)
app.use(router)
app.use(vuetify)
app.use(createPinia())
app.mount('#app')
