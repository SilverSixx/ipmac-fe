<script setup>
import { ref } from 'vue'
import { Download, FileText, Video, Code, ChevronLeft } from 'lucide-vue-next'

// Import shadcn components
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'
import { Table, TableBody, TableRow, TableCell } from '@/components/ui/table'
import DashboardHeader from '@/components/ui/DashboardHeader.vue'

// Current tab
const currentTab = ref('courses')

// Selected course for viewing details
const selectedCourse = ref(null)

// Sample data - enrolled courses
const enrolledCourses = ref([
  {
    id: 1,
    title: 'Web Development Fundamentals',
    instructor: 'Dr. Jane Smith',
    status: 'In Progress',
    completedModules: 13,
    totalModules: 20,
    description:
      'Learn the basics of web development including HTML, CSS, and JavaScript fundamentals.',
  },
  {
    id: 2,
    title: 'UI/UX Design Principles',
    instructor: 'Prof. Michael Johnson',
    status: 'Starting Soon',
    completedModules: 0,
    totalModules: 12,
    description:
      'Understand the core principles of creating effective and user-friendly interfaces.',
  },
  {
    id: 3,
    title: 'Database Management Systems',
    instructor: 'Dr. Robert Chen',
    status: 'In Progress',
    completedModules: 7,
    totalModules: 20,
    description:
      'Master database concepts, SQL, and best practices for data management.',
  },
])

// Learning materials by course
const learningMaterials = ref({
  1: [
    // Web Development Fundamentals
    {
      id: 101,
      title: 'HTML & CSS Fundamentals',
      type: 'document',
      format: 'PDF',
      size: '2.4 MB',
    },
    {
      id: 102,
      title: 'JavaScript Basics',
      type: 'document',
      format: 'PDF',
      size: '3.1 MB',
    },
    {
      id: 103,
      title: 'Responsive Design Workshop',
      type: 'video',
      format: 'MP4',
      size: '256 MB',
    },
    {
      id: 104,
      title: 'JavaScript Exercise Files',
      type: 'code',
      format: 'ZIP',
      size: '1.2 MB',
    },
  ],
  2: [
    // UI/UX Design Principles
    {
      id: 201,
      title: 'UX Research Methods',
      type: 'document',
      format: 'PDF',
      size: '4.5 MB',
    },
    {
      id: 202,
      title: 'Design System Fundamentals',
      type: 'document',
      format: 'PDF',
      size: '2.8 MB',
    },
    {
      id: 203,
      title: 'Figma Tutorial Series',
      type: 'video',
      format: 'MP4',
      size: '320 MB',
    },
  ],
  3: [
    // Database Management Systems
    {
      id: 301,
      title: 'Introduction to Databases',
      type: 'video',
      format: 'MP4',
      size: '185 MB',
    },
    {
      id: 302,
      title: 'SQL Query Guide',
      type: 'document',
      format: 'PDF',
      size: '1.7 MB',
    },
    {
      id: 303,
      title: 'Database Schema Examples',
      type: 'code',
      format: 'SQL',
      size: '0.5 MB',
    },
  ],
})

// Methods
const viewCourseDetails = course => {
  selectedCourse.value = course
  currentTab.value = 'materials'
}

const getFileIcon = type => {
  switch (type) {
    case 'document':
      return FileText
    case 'video':
      return Video
    case 'code':
      return Code
    default:
      return FileText
  }
}

const downloadMaterial = material => {
  alert(`Downloading ${material.title} (${material.format}, ${material.size})`)
}

const backToCourses = () => {
  selectedCourse.value = null
  currentTab.value = 'courses'
}

const userName = ref('SilverSixx')
</script>

<template>
  <div class="min-h-screen bg-gray-50">
    <DashboardHeader
      dashboardTitle="Trainee Dashboard"
      :userName="userName"
    />

    <main class="container mx-auto px-4 py-6">
      <Tabs v-model="currentTab" class="w-full">
        <!-- Enrolled Courses Tab -->
        <TabsContent value="courses">
          <h2 class="text-2xl font-bold mb-4">My Enrolled Courses</h2>
          <div class="grid gap-4 mt-4">
            <Card
              v-for="course in enrolledCourses"
              :key="course.id"
              class="hover:border-red-400 transition-colors cursor-pointer"
              @click="viewCourseDetails(course)"
            >
              <CardContent class="py-4">
                <div class="flex justify-between items-start mb-3">
                  <div>
                    <CardTitle class="text-red-600">{{
                      course.title
                    }}</CardTitle>
                    <p class="text-sm text-gray-600 mt-1">
                      Instructor: {{ course.instructor }}
                    </p>
                  </div>
                  <Badge
                    :class="{
                      'px-2 py-1 text-xs font-medium': true,
                      'bg-green-100 text-green-800':
                        course.status === 'In Progress',
                      'bg-blue-100 text-blue-800':
                        course.status === 'Starting Soon',
                    }"
                  >
                    {{ course.status }}
                  </Badge>
                </div>
                <p class="text-sm text-gray-600 mb-3">
                  {{ course.description }}
                </p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <!-- Learning Materials Tab -->
        <TabsContent value="materials" v-if="selectedCourse">
          <div class="flex justify-between items-center mb-6">
            <Button
              @click="backToCourses"
              variant="outline"
              class="flex items-center gap-1"
            >
              <ChevronLeft class="h-4 w-4" />
              Back to Courses
            </Button>
            <h2 class="text-2xl font-bold">
              {{ selectedCourse.title }} - Materials
            </h2>
            <div class="w-32"></div>
            <!-- Empty div for flex spacing -->
          </div>

          <Card class="shadow-lg mb-6">
            <CardHeader class="border-b">
              <CardTitle class="text-red-600">Course Information</CardTitle>
            </CardHeader>
            <CardContent class="p-4">
              <p class="font-medium">
                Instructor: {{ selectedCourse.instructor }}
              </p>
              <p class="text-gray-600 mb-4">{{ selectedCourse.description }}</p>
            </CardContent>
          </Card>

          <Card class="shadow-lg">
            <CardHeader class="border-b">
              <CardTitle class="text-red-600">Learning Materials</CardTitle>
              <p class="text-sm text-gray-500 mt-1">
                Download course materials to enhance your learning experience
              </p>
            </CardHeader>
            <CardContent class="p-0">
              <Table>
                <TableBody>
                  <TableRow>
                    <TableCell class="font-medium">Type</TableCell>
                    <TableCell class="font-medium">Title</TableCell>
                    <TableCell class="font-medium">Format</TableCell>
                    <TableCell class="font-medium">Size</TableCell>
                  </TableRow>
                </TableBody>
                <TableBody>
                  <TableRow
                    v-for="material in learningMaterials[selectedCourse.id]"
                    :key="material.id"
                    class="hover:bg-gray-50"
                  >
                    <TableCell>
                      <div class="flex items-center gap-2">
                        <component
                          :is="getFileIcon(material.type)"
                          class="h-4 w-4"
                          :class="{
                            'text-blue-600': material.type === 'document',
                            'text-red-600': material.type === 'video',
                            'text-green-600': material.type === 'code',
                          }"
                        />
                        <span class="capitalize">{{ material.type }}</span>
                      </div>
                    </TableCell>
                    <TableCell>{{ material.title }}</TableCell>
                    <TableCell>{{ material.format }}</TableCell>
                    <TableCell>{{ material.size }}</TableCell>
                    <TableCell class="text-right">
                      <Button
                        size="sm"
                        variant="outline"
                        class="flex items-center gap-1"
                        @click="downloadMaterial(material)"
                      >
                        <Download class="h-3 w-3" />
                        Download
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
