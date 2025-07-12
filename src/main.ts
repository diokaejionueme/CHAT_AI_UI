import { createApp } from 'vue'
import { createPinia } from 'pinia'
import piniaPluginPersistedSate from 'pinia-plugin-persistedstate'
import {router} from './router'
import './style.css'
import App from './App.vue'


const pinia = createPinia();
pinia.use(piniaPluginPersistedSate)

const app = createApp(App)
app.use(router);
app.use(pinia);
app.mount('#app')
