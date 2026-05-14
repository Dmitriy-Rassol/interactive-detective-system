import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import { router } from './app/router'
import './app/styles.css'

document.documentElement.dataset.theme = 'dark'

createApp(App).use(createPinia()).use(router).mount('#app')
