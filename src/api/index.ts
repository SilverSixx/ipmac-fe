 import axios from 'axios'

const instance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    'X-Requested-With': import.meta.env.VITE_KEYCLOAK_CLIENT_ID,
  },
})

export default instance