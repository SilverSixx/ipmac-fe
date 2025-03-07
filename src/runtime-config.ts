export interface RuntimeConfig {
  KEYCLOAK_URL: string
  KEYCLOAK_REALM: string
  KEYCLOAK_CLIENT_ID: string
  API_URL: string
}

declare global {
  interface Window {
    RUNTIME_CONFIG: RuntimeConfig
  }
}

const defaultConfig: RuntimeConfig = {
  KEYCLOAK_URL: (import.meta.env.VITE_KEYCLOAK_URL as string) || '',
  KEYCLOAK_REALM: (import.meta.env.VITE_KEYCLOAK_REALM as string) || '',
  KEYCLOAK_CLIENT_ID: (import.meta.env.VITE_KEYCLOAK_CLIENT_ID as string) || '',
  API_URL: (import.meta.env.VITE_API_URL as string) || '',
}

export const getRuntimeConfig = (): RuntimeConfig => {
  return window.RUNTIME_CONFIG || defaultConfig
}
