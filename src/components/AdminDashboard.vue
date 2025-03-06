<script setup>
import { ref, onMounted, computed } from 'vue'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import { Table, TableBody, TableRow, TableCell } from '@/components/ui/table'
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import DashboardHeader from '@/components/ui/DashboardHeader.vue'
import { endpoints } from '@/api/endpoints'
import instance from '@/api'

// Component props
const props = defineProps({
  dashboardTitle: {
    type: String,
    default: 'Admin Dashboard',
  },
  modelValue: String,
  errors: Object,
})

// Define props if needed
const emit = defineEmits(['user-created', 'update:modelValue', 'update:errors'])

// Form state
const dialogOpen = ref(false)
const newUser = ref({
  username: '',
  email: '',
  firstName: '',
  lastName: '',
  password: '',
  role: '',
})

// Validation state
const errors = ref({})

const validateForm = () => {
  const localErrors = {}
  if (!newUser.value.username) localErrors.username = 'Username is required'
  if (!newUser.value.email) {
    localErrors.email = 'Email is required'
  } else {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(newUser.value.email))
      localErrors.email = 'Email should be valid'
  }
  if (!newUser.value.firstName) localErrors.firstName = 'First name is required'
  if (!newUser.value.lastName) localErrors.lastName = 'Last name is required'
  if (!newUser.value.password) localErrors.password = 'Password is required'
  if (!newUser.value.role) localErrors.role = 'Role is required'

  emit('update:errors', localErrors)
  return Object.keys(localErrors).length === 0
}

// Handler for adding new user
const handleAddNewUser = async () => {
  if (validateForm()) {
    try {
      const response = await instance.post(endpoints.users, newUser.value)
      emit('user-created', response.data)
      newUser.value = {
        username: '',
        email: '',
        firstName: '',
        lastName: '',
        password: '',
        role: '',
      }
      dialogOpen.value = false
      const res = await instance.get(endpoints.users)
      userAccounts.value = res.data
    } catch (error) {
      console.error('Error creating user:', error)
    }
  }
}

// User data from API
const userAccounts = ref([])

onMounted(async () => {
  try {
    const response = await instance.get(endpoints.users)
    userAccounts.value = response.data
  } catch (error) {
    console.error('Error fetching users:', error)
  }
})

const trainingSessions = ref([
  {
    id: 1,
    title: 'Vue.js Fundamentals',
    date: '2024-08-15',
    time: '9:00 AM',
    trainerName: 'Jane Smith',
    traineeCount: 25,
    status: 'Upcoming',
  },
  {
    id: 2,
    title: 'Advanced CSS Techniques',
    date: '2024-08-22',
    time: '1:30 PM',
    trainerName: 'Jane Smith',
    traineeCount: 15,
    status: 'Upcoming',
  },
  {
    id: 3,
    title: 'Database Design Principles',
    date: '2024-09-01',
    time: '10:00 AM',
    trainerName: 'Jane Smith',
    traineeCount: 20,
    status: 'Planning',
  },
])

const handleDeleteUser = async userId => {
  try {
    await instance.delete(endpoints.users + '/' + userId)
    const r = await instance.get(endpoints.users)
    userAccounts.value = r.data
  } catch (error) {
    console.error('Error deleting user:', error)
  }
}

const handleScheduleNewSession = () => {
  alert('Schedule New Session functionality to be implemented')
}

const handleEditSession = sessionId => {
  alert(
    `Edit Session functionality for session ID: ${sessionId} to be implemented`
  )
}

const handleDeleteSession = sessionId => {
  alert(
    `Delete Session functionality for session ID: ${sessionId} to be implemented`
  )
}

const getRoleColor = role => {
  switch (role) {
    case 'trainee':
      return 'bg-blue-100 text-blue-800'
    case 'trainer':
      return 'bg-green-100 text-green-800'
    case 'partner':
      return 'bg-purple-100 text-purple-800'
    case 'admin':
      return 'bg-red-100 text-red-800'
    default:
      return 'bg-gray-100 text-gray-800'
  }
}

const getStatusColor = status => {
  switch (status) {
    case 'Upcoming':
      return 'bg-red-100 text-red-800'
    case 'Planning':
      return 'bg-yellow-100 text-yellow-800'
    case 'Completed':
      return 'bg-green-100 text-green-800'
    default:
      return 'bg-gray-100 text-gray-800'
  }
}

const userName = ref('Admin User')
</script>

<template>
  <div class="min-h-screen bg-gray-50">
    <DashboardHeader :dashboardTitle="dashboardTitle" :userName="userName" />

    <main class="container mx-auto px-4 py-6">
      <Tabs defaultValue="users" class="w-full">
        <div class="bg-white p-2 rounded-lg shadow-sm mb-4">
          <TabsList class="grid w-full grid-cols-2">
            <TabsTrigger
              value="users"
              class="data-[state=active]:bg-red-50 data-[state=active]:text-red-600 font-medium"
            >
              User Management
            </TabsTrigger>
            <TabsTrigger
              value="sessions"
              class="data-[state=active]:bg-red-50 data-[state=active]:text-red-600 font-medium"
            >
              Training Sessions Management
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="users">
          <Card class="border-none shadow-md">
            <CardHeader class="bg-gray-50 border-b pb-3">
              <div class="flex justify-between items-center">
                <Dialog v-model:open="dialogOpen">
                  <DialogTrigger as-child>
                    <Button class="bg-red-600 hover:bg-red-700">
                      <svg
                        class="mr-2 h-4 w-4"
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      >
                        <path d="M12 5v14M5 12h14"></path>
                      </svg>
                      Add New User
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Create New User</DialogTitle>
                      <DialogDescription>
                        Enter the details for the new user account.
                      </DialogDescription>
                    </DialogHeader>

                    <div class="grid gap-4 py-4">
                      <div class="grid grid-cols-4 items-center gap-4">
                        <Label class="text-right">Username</Label>
                        <Input
                          v-model="newUser.username"
                          class="col-span-3"
                          placeholder="johndoe"
                        />
                        <div
                          v-if="errors.username"
                          class="col-span-4 text-red-500 text-sm"
                        >
                          {{ errors.username }}
                        </div>
                      </div>

                      <div class="grid grid-cols-4 items-center gap-4">
                        <Label class="text-right">Email</Label>
                        <Input
                          v-model="newUser.email"
                          type="email"
                          class="col-span-3"
                          placeholder="john.doe@example.com"
                        />
                        <div
                          v-if="errors.email"
                          class="col-span-4 text-red-500 text-sm"
                        >
                          {{ errors.email }}
                        </div>
                      </div>

                      <div class="grid grid-cols-4 items-center gap-4">
                        <Label class="text-right">First Name</Label>
                        <Input
                          v-model="newUser.firstName"
                          class="col-span-3"
                          placeholder="John"
                        />
                        <div
                          v-if="errors.firstName"
                          class="col-span-4 text-red-500 text-sm"
                        >
                          {{ errors.firstName }}
                        </div>
                      </div>

                      <div class="grid grid-cols-4 items-center gap-4">
                        <Label class="text-right">Last Name</Label>
                        <Input
                          v-model="newUser.lastName"
                          class="col-span-3"
                          placeholder="Doe"
                        />
                        <div
                          v-if="errors.lastName"
                          class="col-span-4 text-red-500 text-sm"
                        >
                          {{ errors.lastName }}
                        </div>
                      </div>

                      <div class="grid grid-cols-4 items-center gap-4">
                        <Label class="text-right">Password</Label>
                        <Input
                          v-model="newUser.password"
                          type="password"
                          class="col-span-3"
                          placeholder="••••••••"
                        />
                        <div
                          v-if="errors.password"
                          class="col-span-4 text-red-500 text-sm"
                        >
                          {{ errors.password }}
                        </div>
                      </div>

                      <div class="grid grid-cols-4 items-center gap-4">
                        <Label class="text-right">Role</Label>
                        <Input
                          v-model="newUser.role"
                          class="col-span-3"
                          placeholder="admin, trainer, trainee, or partner"
                        />

                        <div
                          v-if="errors.role"
                          class="col-span-4 text-red-500 text-sm"
                        >
                          {{ errors.role }}
                        </div>
                      </div>
                    </div>

                    <DialogFooter>
                      <Button
                        type="submit"
                        @click="handleAddNewUser"
                        class="bg-red-600 hover:bg-red-700"
                      >
                        Create User
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
            </CardHeader>
            <CardContent class="p-0">
              <div class="overflow-x-auto">
                <Table>
                  <TableBody>
                    <TableRow>
                      <TableCell class="font-semibold">Roles</TableCell>
                      <TableCell class="font-semibold">Name</TableCell>
                      <TableCell class="font-semibold">Username</TableCell>
                      <TableCell class="font-semibold">Email</TableCell>
                    </TableRow>
                  </TableBody>
                  <TableBody>
                    <TableRow
                      v-for="user in userAccounts"
                      :key="user.id"
                      class="hover:bg-gray-50"
                    >
                      <TableCell>
                        <div class="flex gap-1">
                          <Badge
                            v-for="role in user.roles"
                            :key="role"
                            :class="getRoleColor(role)"
                            variant="outline"
                            class="font-medium"
                          >
                            {{ role }}
                          </Badge>
                        </div>
                      </TableCell>
                      <TableCell class="font-medium"
                        >{{ user.firstName }} {{ user.lastName }}</TableCell
                      >
                      <TableCell>{{ user.username }}</TableCell>
                      <TableCell>{{ user.email }}</TableCell>
                      <TableCell class="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger as-child>
                            <Button
                              variant="ghost"
                              size="sm"
                              class="h-8 w-8 p-0"
                            >
                              <span class="sr-only">Open menu</span>
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="16"
                                height="16"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                stroke-width="2"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                              >
                                <circle cx="12" cy="12" r="1"></circle>
                                <circle cx="12" cy="5" r="1"></circle>
                                <circle cx="12" cy="19" r="1"></circle>
                              </svg>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem
                              @click="handleDeleteUser(user.id)"
                              class="cursor-pointer text-red-600"
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="16"
                                height="16"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                stroke-width="2"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                class="mr-2"
                              >
                                <polyline points="3 6 5 6 21 6"></polyline>
                                <path
                                  d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"
                                ></path>
                              </svg>
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="sessions">
          <Card class="border-none shadow-md">
            <CardHeader class="bg-gray-50 border-b pb-3">
              <div class="flex justify-between items-center">
                <CardTitle class="text-lg"></CardTitle>
                <Button
                  @click="handleScheduleNewSession"
                  class="bg-red-600 hover:bg-red-700"
                >
                  <svg
                    class="mr-2 h-4 w-4"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <rect
                      x="3"
                      y="4"
                      width="18"
                      height="18"
                      rx="2"
                      ry="2"
                    ></rect>
                    <line x1="16" y1="2" x2="16" y2="6"></line>
                    <line x1="8" y1="2" x2="8" y2="6"></line>
                    <line x1="3" y1="10" x2="21" y2="10"></line>
                    <path d="M12 14v4M10 16h4"></path>
                  </svg>
                  Schedule New Session
                </Button>
              </div>
            </CardHeader>
            <CardContent class="p-0">
              <div class="overflow-x-auto">
                <Table>
                  <TableBody>
                    <TableCell class="font-semibold">Title</TableCell>
                    <TableCell class="font-semibold">Date</TableCell>
                    <TableCell class="font-semibold">Time</TableCell>
                    <TableCell class="font-semibold">Trainer</TableCell>
                    <TableCell class="font-semibold">Trainees</TableCell>
                    <TableCell class="font-semibold">Status</TableCell>
                  </TableBody>
                  <TableBody>
                    <TableRow
                      v-for="session in trainingSessions"
                      :key="session.id"
                      class="hover:bg-gray-50"
                    >
                      <TableCell class="font-medium">{{
                        session.title
                      }}</TableCell>
                      <TableCell>{{ session.date }}</TableCell>
                      <TableCell>{{ session.time }}</TableCell>
                      <TableCell>{{ session.trainerName }}</TableCell>
                      <TableCell>
                        <div class="flex items-center">
                          <span class="font-semibold text-red-600 mr-1">{{
                            session.traineeCount
                          }}</span>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          >
                            <path
                              d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"
                            ></path>
                            <circle cx="9" cy="7" r="4"></circle>
                            <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                            <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                          </svg>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge
                          :class="getStatusColor(session.status)"
                          variant="outline"
                          class="font-medium"
                        >
                          {{ session.status }}
                        </Badge>
                      </TableCell>
                      <TableCell class="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger as-child>
                            <Button
                              variant="ghost"
                              size="sm"
                              class="h-8 w-8 p-0"
                            >
                              <span class="sr-only">Open menu</span>
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="16"
                                height="16"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                stroke-width="2"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                              >
                                <circle cx="12" cy="12" r="1"></circle>
                                <circle cx="12" cy="5" r="1"></circle>
                                <circle cx="12" cy="19" r="1"></circle>
                              </svg>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem
                              @click="handleEditSession(session.id)"
                              class="cursor-pointer"
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="16"
                                height="16"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                stroke-width="2"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                class="mr-2"
                              >
                                <path
                                  d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"
                                ></path>
                                <path
                                  d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"
                                ></path>
                              </svg>
                              Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              @click="handleDeleteSession(session.id)"
                              class="cursor-pointer text-red-600"
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="16"
                                height="16"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                stroke-width="2"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                class="mr-2"
                              >
                                <polyline points="3 6 5 6 21 6"></polyline>
                                <path
                                  d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"
                                ></path>
                              </svg>
                              Delete
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem class="cursor-pointer">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="16"
                                height="16"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                stroke-width="2"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                class="mr-2"
                              >
                                <circle cx="12" cy="12" r="10"></circle>
                                <line x1="12" y1="8" x2="12" y2="16"></line>
                                <line x1="8" y1="12" x2="16" y2="12"></line>
                              </svg>
                              View Details
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </main>
  </div>
</template>
