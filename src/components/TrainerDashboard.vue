<script setup>
import { ref } from 'vue'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Tabs, TabsContent } from '@/components/ui/tabs'
import { Table, TableBody, TableRow, TableCell } from '@/components/ui/table'
import DashboardHeader from '@/components/ui/DashboardHeader.vue'

// Data
const currentTab = ref('subjects')

// Assigned training subjects
const assignedSubjects = ref([
  {
    id: 1,
    title: 'Introduction to Vue 3',
    description: 'Fundamentals of Vue 3, components, and reactivity',
    trainees: 12,
  },
  {
    id: 2,
    title: 'Advanced UI Components',
    description: 'Building and customizing UI components with Shadcn',
    trainees: 8,
  },
  {
    id: 3,
    title: 'State Management in Vue',
    description: 'Working with Pinia and Vuex for state management',
    trainees: 10,
  },
])

// Course materials
const courseMaterials = ref([
  {
    id: 1,
    subjectId: 1,
    title: 'Vue CLI Setup Guide',
    type: 'PDF',
  },
  {
    id: 2,
    subjectId: 1,
    title: 'Component Basics',
    type: 'Video',
  },
])

// Trainees
const trainees = ref([
  { id: 1, name: 'John Doe', email: 'john.doe@example.com', enrolled: true },
  {
    id: 2,
    name: 'Jane Smith',
    email: 'jane.smith@example.com',
    enrolled: true,
  },
  { id: 3, name: 'Mike Johnson', email: 'mike.j@example.com', enrolled: false },
  {
    id: 4,
    name: 'Sarah Williams',
    email: 'sarah.w@example.com',
    enrolled: false,
  },
])

// Selected subject for details view
const selectedSubject = ref(null)
const newMaterialFile = ref(null)
const searchTraineeQuery = ref('')

// Methods
const viewSubjectDetails = subject => {
  selectedSubject.value = subject
  currentTab.value = 'details'
}

const handleCourseUpload = () => {
  if (newMaterialFile.value) {
    // Logic to handle file upload
    alert('Course material uploaded successfully!')
    newMaterialFile.value = null
  } else {
    alert('Please select a file to upload')
  }
}

const handleFileSelected = event => {
  newMaterialFile.value = event.target.files[0]
}

const toggleTraineeEnrollment = trainee => {
  trainee.enrolled = !trainee.enrolled
}

const filterTrainees = () => {
  if (!searchTraineeQuery.value) return trainees.value

  return trainees.value.filter(
    trainee =>
      trainee.name
        .toLowerCase()
        .includes(searchTraineeQuery.value.toLowerCase()) ||
      trainee.email
        .toLowerCase()
        .includes(searchTraineeQuery.value.toLowerCase())
  )
}

const userName = ref('Trainer User')
</script>

<template>
  <div class="min-h-screen bg-gray-50">
    <DashboardHeader dashboardTitle="Trainer Dashboard" :userName="userName" />

    <main class="container mx-auto px-4 py-6">
      <Tabs v-model="currentTab" class="w-full">
        <!-- Assigned Training Subjects Tab -->
        <TabsContent value="subjects">
          <h2 class="text-2xl font-bold mb-4">Assigned Training Subjects</h2>
          <div class="grid gap-4 mt-4">
            <Card
              v-for="subject in assignedSubjects"
              :key="subject.id"
              class="hover:border-red-400 transition-colors cursor-pointer"
              @click="viewSubjectDetails(subject)"
            >
              <CardContent class="flex items-center justify-between py-4">
                <div>
                  <CardTitle class="text-red-600">{{
                    subject.title
                  }}</CardTitle>
                  <p class="text-sm text-gray-600 mt-2">
                    {{ subject.description }}
                  </p>
                  <p class="text-xs text-gray-400 mt-1">
                    {{ subject.trainees }} trainees enrolled
                  </p>
                </div>
                <Button class="hover:bg-red-700">View Details</Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <!-- Course Details Tab -->
        <TabsContent value="details" v-if="selectedSubject">
          <div class="flex justify-between items-center mb-6">
            <Button @click="currentTab = 'subjects'" variant="outline"
              >Back to Subjects</Button
            >
            <h2 class="text-2xl font-bold">{{ selectedSubject.title }}</h2>
            <Button @click="currentTab = 'trainees'" variant="outline"
              >Manage Trainees</Button
            >
          </div>

          <Card class="shadow-lg mb-6">
            <CardHeader class="border-b">
              <CardTitle class="text-red-600">Course Information</CardTitle>
            </CardHeader>
            <CardContent class="p-4">
              <p class="font-medium">Description:</p>
              <p class="text-gray-600 mb-4">
                {{ selectedSubject.description }}
              </p>
              <p class="font-medium">
                Enrolled Trainees: {{ selectedSubject.trainees }}
              </p>
            </CardContent>
          </Card>

          <Card class="shadow-lg">
            <CardHeader class="border-b">
              <CardTitle class="text-red-600">Course Materials</CardTitle>
              <div class="max-w-md flex items-center gap-2">
                <Input
                  type="file"
                  @change="handleFileSelected"
                  class="flex-grow"
                />
                <Button @click="handleCourseUpload" class="hover:bg-red-700">
                  Upload
                </Button>
              </div>
            </CardHeader>
            <CardContent class="space-y-4 p-4">
              <p class="font-medium">Existing Materials</p>
              <Table v-if="courseMaterials.length > 0">
                <TableBody>
                  <TableRow>
                    <TableCell>Title</TableCell>
                    <TableCell>Type</TableCell>
                  </TableRow>
                </TableBody>
                <TableBody>
                  <TableRow
                    v-for="material in courseMaterials.filter(
                      m => m.subjectId === selectedSubject.id
                    )"
                    :key="material.id"
                  >
                    <TableCell>{{ material.title }}</TableCell>
                    <TableCell>{{ material.type }}</TableCell>
                    <TableCell>
                      <Button variant="outline" size="sm" class="mr-2"
                        >View</Button
                      >
                      <Button variant="outline" size="sm" class="text-red-600"
                        >Delete</Button
                      >
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
              <p v-else class="text-gray-500 italic">
                No materials uploaded yet
              </p>
            </CardContent>
          </Card>
        </TabsContent>

        <!-- Manage Trainees Tab -->
        <TabsContent value="trainees" v-if="selectedSubject">
          <div class="flex justify-between items-center mb-6">
            <Button @click="currentTab = 'details'" variant="outline"
              >Back to Course Details</Button
            >
            <h2 class="text-2xl font-bold">
              Manage Trainees: {{ selectedSubject.title }}
            </h2>
            <Button @click="currentTab = 'subjects'" variant="outline"
              >Back to Subjects</Button
            >
          </div>

          <Card class="shadow-lg">
            <CardHeader class="border-b">
              <div class="flex justify-between items-center">
                <CardTitle class="text-red-600">All Trainees</CardTitle>
                <div>
                  <Input
                    v-model="searchTraineeQuery"
                    placeholder="Search trainee by name or partner name"
                    class="w-80"
                  />
                </div>
              </div>
            </CardHeader>
            <CardContent class="p-0">
              <Table>
                <TableBody>
                  <TableRow>
                    <TableCell>Name</TableCell>
                    <TableCell>Email</TableCell>
                    <TableCell>Status</TableCell>
                  </TableRow>
                </TableBody>
                <TableBody>
                  <TableRow
                    v-for="trainee in filterTrainees()"
                    :key="trainee.id"
                  >
                    <TableCell>{{ trainee.name }}</TableCell>
                    <TableCell>{{ trainee.email }}</TableCell>
                    <TableCell>
                      <span
                        :class="{
                          'px-2 py-1 rounded-full text-xs font-medium': true,
                          'bg-green-100 text-green-800': trainee.enrolled,
                          'bg-gray-100 text-gray-800': !trainee.enrolled,
                        }"
                      >
                        {{ trainee.enrolled ? 'Enrolled' : 'Not Enrolled' }}
                      </span>
                    </TableCell>
                    <TableCell class="text-right">
                      <Button
                        size="sm"
                        :class="{
                          'hover:bg-red-700': trainee.enrolled,
                          'hover:bg-green-700': !trainee.enrolled,
                        }"
                        @click="toggleTraineeEnrollment(trainee)"
                      >
                        {{ trainee.enrolled ? 'Remove' : 'Add' }}
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
