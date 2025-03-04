import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import App from './App.vue'
import routes from './router'
import './assets/main.css'
import { vueKeycloak } from '@josempgon/vue-keycloak'

// Initialize Vue Keycloak before mounting the app
const router = createRouter({
  history: createWebHistory(),
  routes,
})

const app = createApp(App)

// Use vueKeycloak as a plugin
app.use(vueKeycloak, async () => {
  const silentCheckSsoRedirectUri = `${window.location.origin}/assets/silent-check-sso.html`
  return {
    config: {
      url: import.meta.env.VITE_KEYCLOAK_URL,
      realm: import.meta.env.VITE_KEYCLOAK_REALM,
      clientId: import.meta.env.VITE_KEYCLOAK_CLIENT_ID,
    },
    initOptions: {
      onLoad: 'check-sso',
      silentCheckSsoRedirectUri,
    },
  }
})

app.use(router)
app.mount('#app')
