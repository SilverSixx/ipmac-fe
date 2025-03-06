import type { RouteRecordRaw } from 'vue-router'
import Home from '@/components/Home.vue'
import LoginPage from '@/components/LoginPage.vue'
import AdminDashboard from '@/components/AdminDashboard.vue'
import PartnerDashboard from '@/components/PartnerDashboard.vue'
import TraineeDashboard from '@/components/TraineeDashboard.vue'
import TrainerDashboard from '@/components/TrainerDashboard.vue'
import { useKeycloak } from '@dsb-norge/vue-keycloak-js'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: Home,
  },
  {
    path: '/login',
    name: 'login',
    component: LoginPage,
  },
  {
    path: '/admin',
    name: 'admin',
    component: AdminDashboard,
    meta: { requiresAuth: true, roles: ['admin'] },
  },
  {
    path: '/partner',
    name: 'partner',
    component: PartnerDashboard,
    meta: { requiresAuth: true, roles: ['partner'] },
  },
  {
    path: '/trainee',
    name: 'trainee',
    component: TraineeDashboard,
    meta: { requiresAuth: true, roles: ['trainee'] },
  },
  {
    path: '/trainer',
    name: 'trainer',
    component: TrainerDashboard,
    meta: { requiresAuth: true, roles: ['trainer'] },
  },
  // Add a catch-all for unauthorized access
  {
    path: '/:pathMatch(.*)*',
    redirect: '/',
  },
]

export const setupRouterGuard = (router: any) => {
  router.beforeEach(async (to: any, from: any, next: any) => {
    const keycloak = useKeycloak()

    if (to.meta.requiresAuth) {
      if (!keycloak.authenticated) {
        return next({ name: 'login', query: { redirect: to.fullPath } })
      }

      // Get roles directly from keycloak instance
      const userRoles = keycloak.realmAccess?.roles || []
      const requiredRoles = to.meta.roles || []

      // Check if any required role exists in user's roles
      const hasRequiredRole = requiredRoles.some((role: string) =>
        userRoles.includes(role)
      )

      if (!hasRequiredRole) {
        return next({
          path: from.fullPath,
          query: {
            error: 'unauthorized',
            from: to.fullPath,
            required: requiredRoles.join(','),
          },
        })
      }
    }

    next()
  })
}

export default routes
