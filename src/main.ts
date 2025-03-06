import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import App from './App.vue'
import routes from './router'
import './assets/main.css'
import VueKeyCloak, { useKeycloak } from '@dsb-norge/vue-keycloak-js'
import instance from './api'

// Initialize Vue Keycloak before mounting the app
const router = createRouter({
  history: createWebHistory(),
  routes,
})

const app = createApp(App)
  .use(router)
  .use(VueKeyCloak, {
    config: {
      url: import.meta.env.VITE_KEYCLOAK_URL,
      realm: import.meta.env.VITE_KEYCLOAK_REALM,
      clientId: import.meta.env.VITE_KEYCLOAK_CLIENT_ID,
    },
    onReady: keycloak => {
      instance.interceptors.request.use(
        config => {
          config.headers.Authorization = `Bearer ${keycloak.token}`
          return config
        },
        error => {
          return Promise.reject(error)
        }
      )
      app.mount('#app')
    },
  })
