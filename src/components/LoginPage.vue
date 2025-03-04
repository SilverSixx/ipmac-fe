<script setup>
import { ref } from 'vue'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Label } from '@/components/ui/label'
import { useKeycloak } from '@josempgon/vue-keycloak'
import { roles } from '@/constants'
import { Lock, User, Building2, GraduationCap, UserCircle } from 'lucide-vue-next'

const loading = ref(false)
const error = ref('')
const selectedRole = ref('')
const { keycloak } = useKeycloak()

const handleKeycloakLogin = async () => {
  if (!keycloak) {
    error.value = 'Authentication service not available'
    return
  }

  if (!selectedRole.value) {
    error.value = 'Please select your role to continue'
    return
  }

  error.value = '' // Clear any previous error
  loading.value = true

  try {
    await keycloak.value.login({
      redirectUri: `${window.location.origin}/${selectedRole.value}`,
    })
  } catch (err) {
    console.error('Keycloak login error:', err)
    error.value = 'Login failed. Please try again later.'
    loading.value = false
  }
}

// Role icons mapping
const getRoleIcon = (roleValue) => {
  switch (roleValue) {
    case 'partner':
      return Building2
    case 'trainer':
      return GraduationCap
    case 'trainee':
      return UserCircle
    default:
      return User
  }
}
</script>

<template>
  <div class="min-h-screen bg-gradient-to-br from-red-50 via-white to-blue-50 py-12 px-4 sm:px-6 lg:px-8 relative">
    <!-- Background decoration elements -->
    <div class="absolute top-20 left-20 w-32 h-32 bg-red-200 rounded-full blur-3xl opacity-30"></div>
    <div class="absolute bottom-20 right-20 w-40 h-40 bg-blue-200 rounded-full blur-3xl opacity-30"></div>

    <div class="w-full max-w-md mx-auto space-y-8 relative z-10">
      <!-- Main card with subtle shadow and animation -->
      <Card class="overflow-hidden border-none shadow-xl transition-all hover:shadow-2xl">
        <div class="h-2 bg-gradient-to-r from-red-500 via-red-600 to-red-700"></div>
        <CardHeader class="space-y-1 pb-4">
          <CardTitle class="text-2xl font-bold text-center">Welcome Back</CardTitle>
          <CardDescription class="text-center">Sign in to continue to your dashboard</CardDescription>
        </CardHeader>

        <CardContent class="space-y-6">
          <!-- Error message -->
          <div 
            v-if="error" 
            class="p-3 rounded-md bg-red-50 border border-red-200 text-red-700 text-sm flex items-center space-x-2 animate-pulse"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd" />
            </svg>
            <span>{{ error }}</span>
          </div>

          <!-- Role Selection with better visual design -->
          <div class="space-y-4">
            <RadioGroup v-model="selectedRole" class="grid gap-3">
              <div 
                v-for="role in roles" 
                :key="role.value" 
                class="flex items-center space-x-3 p-3 rounded-lg border border-gray-200 hover:border-red-300 hover:bg-red-50 transition-colors cursor-pointer"
                :class="{'bg-red-50 border-red-300': selectedRole === role.value}"
                @click="selectedRole = role.value"
              >
                <RadioGroupItem :id="role.value" :value="role.value" class="border-red-600 text-red-600" />
                <div class="flex items-center space-x-3">
                  <div class="h-9 w-9 rounded-full flex items-center justify-center" 
                      :class="{
                        'bg-blue-100 text-blue-700': role.value === 'partner',
                        'bg-red-100 text-red-700': role.value === 'trainer',
                        'bg-green-100 text-green-700': role.value === 'trainee'
                      }">
                    <component :is="getRoleIcon(role.value)" class="h-5 w-5" />
                  </div>
                  <div>
                    <Label :for="role.value" class="text-base font-medium leading-none cursor-pointer">
                      {{ role.name }}
                    </Label>
                    <p class="text-xs text-gray-500 mt-1">
                      {{ role.description || `Access the ${role.name} dashboard` }}
                    </p>
                  </div>
                </div>
              </div>
            </RadioGroup>
          </div>

          <!-- Keycloak SSO Button with enhanced style -->
          <div class="pt-2">
            <Button
              @click="handleKeycloakLogin"
              class="w-full bg-gradient-to-r from-red-500 to-red-700 hover:from-red-600 hover:to-red-800 transition-all py-6 text-lg shadow-md"
              :class="{'opacity-80': !selectedRole}"
              :disabled="loading"
            >
              <span v-if="loading" class="absolute left-4">
                <svg
                  class="animate-spin h-5 w-5"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    class="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    stroke-width="4"
                  ></circle>
                  <path
                    class="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
              </span>
              <div class="flex items-center justify-center gap-3">
                <Lock class="h-5 w-5" />
                <span>{{ loading ? 'Signing in...' : 'Sign in with Keycloak' }}</span>
              </div>
            </Button>
          </div>

          <!-- Additional help link -->
          <div class="text-center text-sm text-gray-500 pt-2">
            Need help? <a href="#" class="text-red-600 hover:text-red-700 hover:underline">Contact support</a>
          </div>
        </CardContent>
      </Card>

      <!-- Back to home link -->
      <div class="text-center">
        <a href="/" class="text-sm text-gray-600 hover:text-red-600 flex items-center justify-center gap-1">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z" clip-rule="evenodd" />
          </svg>
          Back to home page
        </a>
      </div>
    </div>

    <!-- Footer note -->
    <div class="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-xs text-gray-400">
      © 2025 IPMAC Training Solutions. All rights reserved.
    </div>
  </div>
</template>