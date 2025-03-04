<script setup>
import { ref, computed } from 'vue'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Tabs, TabsContent } from '@/components/ui/tabs'
import { useKeycloak } from '@josempgon/vue-keycloak'
import { Plus, Trash } from 'lucide-vue-next'
import { Table, TableBody, TableRow, TableCell } from '@/components/ui/table'
import DashboardHeader from '@/components/ui/DashboardHeader.vue'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'

// Keycloak integration
const { keycloak, decodedToken } = useKeycloak()

// Current tab
const currentTab = ref('trainees')

// Mock Data for Trainee Information
const trainees = ref([
  {
    id: 1,
    name: 'John Doe',
    email: 'john.doe@example.com',
    department: 'Engineering',
    courses: [
      {
        name: 'Web Development Fundamentals',
      },
      {
        name: 'Database Management Systems',
      },
    ],
  },
  {
    id: 2,
    name: 'Jane Smith',
    email: 'jane.smith@example.com',
    department: 'Design',
    courses: [
      {
        name: 'Web Development Fundamentals',
      },
      { name: 'UI/UX Design Principles' },
    ],
  },
  {
    id: 3,
    name: 'Robert Brown',
    email: 'robert.brown@example.com',
    department: 'Engineering',
    courses: [
      {
        name: 'Database Management Systems',
      },
    ],
  },
  
  {
    id: 4,
    name: 'Alice Johnson',
    email: 'alice.johnson@example.com',
    department: 'Product Management',
    courses: [
      {
        name: 'Web Development Fundamentals',
      },
      { name: 'UI/UX Design Principles' },
      {
        name: 'Database Management Systems',
      },
    ],
  },
  {
    id: 5,
    name: 'Michael Davis',
    email: 'michael.davis@example.com',
    department: 'Design',
    courses: [
      { name: 'UI/UX Design Principles' },
    ],
  },
])

// Form for new trainee
const newTrainee = ref({
  name: '',
  email: '',
  department: '',
})

// Selected trainee for editing
const selectedTrainee = ref(null)

// Search query
const searchQuery = ref('')

// Filter trainees based on search query
const filteredTrainees = computed(() => {
  if (!searchQuery.value) return trainees.value

  const query = searchQuery.value.toLowerCase()
  return trainees.value.filter(
    trainee =>
      trainee.name.toLowerCase().includes(query) ||
      trainee.email.toLowerCase().includes(query) ||
      trainee.department.toLowerCase().includes(query)
  )
})

// Methods
const addTrainee = () => {
  const id = Math.max(0, ...trainees.value.map(t => t.id)) + 1

  trainees.value.push({
    id,
    name: newTrainee.value.name,
    email: newTrainee.value.email,
    department: newTrainee.value.department,
    courses: [],
    overallProgress: 0,
  })

  // Reset form
  newTrainee.value = { name: '', email: '', department: '' }
}

const deleteTrainee = id => {
  if (confirm('Are you sure you want to remove this trainee?')) {
    trainees.value = trainees.value.filter(t => t.id !== id)
  }
}

const userName = ref('SilverSixx')
</script>

<template>
  <div class="min-h-screen bg-gray-50">
    <DashboardHeader
      dashboardTitle="Partner Dashboard"
      :userName="userName"
    />

    <main class="container mx-auto px-4 py-6">
      <Tabs v-model="currentTab" class="w-full">
        <!-- Overview Tab -->

        <!-- Manage Trainees Tab -->
        <TabsContent value="trainees">
          <div class="flex items-center justify-between mb-6">
            <h2 class="text-2xl font-bold">Manage Trainees</h2>

            <Dialog>
              <DialogTrigger asChild>
                <Button
                  class="bg-red-600 hover:bg-red-700 flex items-center gap-2"
                >
                  <Plus class="h-4 w-4" />
                  Add Trainee
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add New Trainee</DialogTitle>
                  <DialogDescription>
                    Enter the details for a new trainee. They will be added to
                    your organization.
                  </DialogDescription>
                </DialogHeader>
                <div class="space-y-4 py-4">
                  <div class="space-y-2">
                    <label for="name" class="text-sm font-medium"
                      >Full Name</label
                    >
                    <Input
                      id="name"
                      v-model="newTrainee.name"
                      placeholder="John Doe"
                    />
                  </div>
                  <div class="space-y-2">
                    <label for="email" class="text-sm font-medium"
                      >Email Address</label
                    >
                    <Input
                      id="email"
                      type="email"
                      v-model="newTrainee.email"
                      placeholder="john.doe@example.com"
                    />
                  </div>
                  <div class="space-y-2">
                    <label for="department" class="text-sm font-medium"
                      >Department</label
                    >
                    <Input
                      id="department"
                      v-model="newTrainee.department"
                      placeholder="Engineering"
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button @click="addTrainee">Add Trainee</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>

          <Card class="shadow-lg">
            <CardContent class="p-0">
              <Table>
                <TableBody>
                  <TableRow>
                    <TableCell>Name</TableCell>
                    <TableCell>Email</TableCell>
                    <TableCell>Department</TableCell>
                    <TableCell>Courses</TableCell>
                  </TableRow>
                </TableBody>
                <TableBody>
                  <TableRow
                    v-for="trainee in filteredTrainees"
                    :key="trainee.id"
                  >
                    <TableCell>{{ trainee.name }}</TableCell>
                    <TableCell>{{ trainee.email }}</TableCell>
                    <TableCell>{{ trainee.department }}</TableCell>
                    <TableCell>{{ trainee.courses.map(course => course.name).join(', ') }}</TableCell>
                    <TableCell class="text-right">
                      <Button
                        variant="ghost"
                        size="icon"
                        @click="deleteTrainee(trainee.id)"
                      >
                        <Trash class="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </main>
  </div>
</template>
