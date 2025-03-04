import type Keycloak from 'keycloak-js'

declare module 'vue' {
  interface ComponentCustomProperties {
    $keycloak: Keycloak
  }
}

declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}
