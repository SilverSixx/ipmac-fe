import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import App from './App.vue'
import routes from './router'
import './assets/main.css'
import VueKeyCloak from '@dsb-norge/vue-keycloak-js'
import instance from './api'
import { getRuntimeConfig } from './runtime-config'

const config = getRuntimeConfig()

// Initialize Vue Keycloak before mounting the app
const router = createRouter({
  history: createWebHistory(),
  routes,
})

const app = createApp(App)
  .use(router)
  .use(VueKeyCloak, {
    config: {
      url: config.KEYCLOAK_URL,
      realm: config.KEYCLOAK_REALM,
      clientId: config.KEYCLOAK_CLIENT_ID,
      enableLogging: true, // Add this for debug logs
      checkLoginIframe: false,
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
