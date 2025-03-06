<template>
  <main>
    <router-view />
  </main>
</template>

<script>
import { defineComponent, computed, onMounted } from 'vue'
import { useKeycloak } from '@dsb-norge/vue-keycloak-js'

export default defineComponent({
  setup() {
    const { keycloak, isAuthenticated, token } = useKeycloak()

    // Log authentication state for debugging
    onMounted(async () => {

    })

    const username = computed(() => {
      if (!isAuthenticated.value) return ''
      return (
        keycloak.tokenParsed?.preferred_username ||
        keycloak.tokenParsed?.name ||
        'User'
      )
    })

    const logout = async () => {
      try {
        await keycloak.logout({ redirectUri: window.location.origin })
      } catch (error) {
        console.error('Logout error:', error)
      }
    }

    return {
      isAuthenticated,
      username,
      logout,
    }
  },
})
</script>
