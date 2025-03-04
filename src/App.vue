<template>
  <main>
    <router-view />
  </main>
</template>

<script>
import { defineComponent, computed, onMounted } from 'vue'
import { useKeycloak } from '@josempgon/vue-keycloak'

export default defineComponent({
  setup() {
    const { keycloak, isAuthenticated } = useKeycloak()

    // Log authentication state for debugging
    onMounted(() => {
      console.log('App mounted, isAuthenticated:', isAuthenticated.value)
      console.log('Keycloak status:', keycloak.authenticated)
      if (isAuthenticated.value) {
        console.log('Token parsed:', keycloak.tokenParsed)
      }
    })

    const username = computed(() => {
      console.log('Computing username, isAuthenticated:', isAuthenticated.value)
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
