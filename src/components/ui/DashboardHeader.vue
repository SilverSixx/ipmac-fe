<script setup>
import { Button } from '@/components/ui/button'
import { useKeycloak } from '@dsb-norge/vue-keycloak-js'

defineProps({
  dashboardTitle: {
    type: String,
    required: true
  },
  userName: {
    type: String,
    default: 'User'
  }
})

const { keycloak } = useKeycloak()

const logout = async () => {
  await keycloak.logout()
}
</script>

<template>
  <header class="bg-white border-b border-gray-200 sticky top-0 z-10">
    <div class="container mx-auto px-4 py-3">
      <div class="flex items-center justify-between">
        <div class="flex items-center space-x-4">
          <!-- Company Logo/Icon -->
          <div
            class="w-10 h-10 rounded-full bg-red-600 flex items-center justify-center text-white font-bold"
          >
            TC
          </div>
          <!-- Dashboard Title -->
          <h1 class="text-xl font-semibold">{{ dashboardTitle }}</h1>
        </div>

        <div class="flex items-center space-x-4">
          <!-- User Avatar and Info -->
          <div class="flex items-center space-x-2">
            <div
              class="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-gray-600"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                <circle cx="12" cy="7" r="4"></circle>
              </svg>
            </div>
            <span class="text-sm font-medium hidden md:block">{{ userName }}</span>
          </div>
          <!-- Logout Button -->
          <Button
            variant="destructive"
            size="sm"
            class="bg-red-600 hover:bg-red-700"
            @click="logout"
          >
            Logout
          </Button>
        </div>
      </div>
    </div>
  </header>
</template>
