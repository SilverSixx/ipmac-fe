<template>
  <div class="min-h-screen bg-gradient-to-b from-red-50 via-white to-blue-50">
    <header
      class="bg-white shadow-sm border-b border-red-100 flex justify-between items-center"
    >
      <div
        class="container mx-auto px-4 py-4 flex justify-between items-center"
      >
        <div class="flex items-center gap-3">
          <div
            class="h-10 w-10 bg-red-600 rounded-lg flex items-center justify-center text-white font-bold"
          >
            IP
          </div>
          <h1 class="text-2xl font-bold text-gray-900">
            IPMAC<span class="text-red-600">Training</span>
          </h1>
        </div>
      </div>
    </header>

    <div class="container mx-auto px-4 py-8">
      <!-- Hero Section -->
      <div class="text-center mb-16">
        <div class="mb-8">
          <div
            class="mx-auto h-24 w-24 bg-red-600 rounded-full flex items-center justify-center shadow-lg"
          >
            <svg
              class="h-12 w-12 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
        </div>
        <h1 class="text-5xl font-bold text-gray-900 mb-4">
          Transform Your Career with
          <span class="text-red-600">IPMAC</span> IT Training
        </h1>
        <p class="text-xl text-gray-600 mb-6 max-w-3xl mx-auto">
          Comprehensive IT training solutions for corporations, trainers, and
          individuals. Trusted by industry leaders like
          <span class="font-semibold text-blue-600">Samsung</span>.
        </p>
        <div class="flex justify-center gap-4">
          <Button as-child size="lg" class="bg-red-600 hover:bg-red-700">
            <router-link to="/login">Get Started</router-link>
          </Button>
          <Button size="lg" variant="outline">Learn More</Button>
        </div>
      </div>

      <!-- User Role Sections -->
      <div class="grid md:grid-cols-3 gap-8 mb-16">
        <Card
          class="hover:shadow-xl transition-all duration-300 border-t-4 border-blue-500 overflow-hidden"
        >
          <CardHeader class="pb-2">
            <div
              class="h-14 w-14 bg-blue-100 rounded-full flex items-center justify-center mb-4"
            >
              <Building2 class="h-8 w-8 text-blue-600" />
            </div>
            <CardTitle class="text-2xl text-blue-800">For Partners</CardTitle>
          </CardHeader>
          <CardContent>
            <p class="text-gray-600 mb-4">
              Empower your workforce with targeted skill development
            </p>
            <ul class="space-y-2">
              <li class="flex items-start gap-2">
                <CheckCircle2 class="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                <span>Add and manage trainees in your organization</span>
              </li>
              <li class="flex items-start gap-2">
                <CheckCircle2 class="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                <span>Track employee progress with detailed analytics</span>
              </li>
              <li class="flex items-start gap-2">
                <CheckCircle2 class="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                <span>Bulk upload trainees using Excel templates</span>
              </li>
              <li class="flex items-start gap-2">
                <CheckCircle2 class="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                <span>Generate customized training reports</span>
              </li>
            </ul>
          </CardContent>
        </Card>

        <Card
          class="hover:shadow-xl transition-all duration-300 border-t-4 border-red-500 overflow-hidden"
        >
          <CardHeader class="pb-2">
            <div
              class="h-14 w-14 bg-red-100 rounded-full flex items-center justify-center mb-4"
            >
              <GraduationCap class="h-8 w-8 text-red-600" />
            </div>
            <CardTitle class="text-2xl text-red-800">For Trainers</CardTitle>
          </CardHeader>
          <CardContent>
            <p class="text-gray-600 mb-4">
              Deliver exceptional training experiences with powerful tools
            </p>
            <ul class="space-y-2">
              <li class="flex items-start gap-2">
                <CheckCircle2 class="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                <span>Upload and manage course materials</span>
              </li>
              <li class="flex items-start gap-2">
                <CheckCircle2 class="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                <span>View details of assigned courses and subjects</span>
              </li>
              <li class="flex items-start gap-2">
                <CheckCircle2 class="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                <span>Add or remove trainees from your courses</span>
              </li>
              <li class="flex items-start gap-2">
                <CheckCircle2 class="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                <span>Communicate with trainees effectively</span>
              </li>
            </ul>
          </CardContent>
        </Card>

        <Card
          class="hover:shadow-xl transition-all duration-300 border-t-4 border-green-500 overflow-hidden"
        >
          <CardHeader class="pb-2">
            <div
              class="h-14 w-14 bg-green-100 rounded-full flex items-center justify-center mb-4"
            >
              <UserCircle class="h-8 w-8 text-green-600" />
            </div>
            <CardTitle class="text-2xl text-green-800">For Trainees</CardTitle>
          </CardHeader>
          <CardContent>
            <p class="text-gray-600 mb-4">
              Accelerate your career with professional skills development
            </p>
            <ul class="space-y-2">
              <li class="flex items-start gap-2">
                <CheckCircle2 class="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                <span>Access your enrolled courses from anywhere</span>
              </li>
              <li class="flex items-start gap-2">
                <CheckCircle2 class="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                <span>Download training materials and resources</span>
              </li>
              <li class="flex items-start gap-2">
                <CheckCircle2 class="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                <span>Track your progress in real-time</span>
              </li>
              <li class="flex items-start gap-2">
                <CheckCircle2 class="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                <span>Earn industry-recognized certifications</span>
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>

      <!-- Featured Partners -->
      <div class="mb-16">
        <h2 class="text-3xl font-bold text-center mb-8">
          Trusted by Leading Companies
        </h2>
        <div class="flex flex-wrap justify-center items-center gap-12 py-4">
          <div class="text-center">
            <img
              :src="samsungLogo"
              alt="Samsung"
              class="h-18 grayscale hover:grayscale-0 transition-all duration-300"
            />
          </div>
          <div class="text-center">
            <img
              :src="lgLogo"
              alt="LG"
              class="h-12 w-auto grayscale hover:grayscale-0 transition-all duration-300"
            />
            <p class="mt-2 text-gray-600 text-sm">
              Enterprise Solutions Partner
            </p>
          </div>
          <div class="text-center">
            <img
              :src="hyundaiLogo"
              alt="Hyundai"
              class="h-12 w-auto grayscale hover:grayscale-0 transition-all duration-300"
            />
            <p class="mt-2 text-gray-600 text-sm">Corporate Training Partner</p>
          </div>
        </div>
      </div>

      <!-- About IPMAC -->
      <div
        class="bg-gradient-to-r from-red-600 to-red-800 rounded-2xl shadow-xl p-8 mb-16 text-white"
      >
        <div class="grid md:grid-cols-2 gap-8 items-center">
          <div>
            <h2 class="text-3xl font-bold mb-4">
              About IPMAC Training Solutions
            </h2>
            <p class="mb-4">
              IPMAC is a leading provider of comprehensive IT training
              solutions, specializing in corporate training programs,
              professional certifications, and skill development.
            </p>
            <p>
              Our mission is to bridge the skills gap in the IT industry by
              providing high-quality, accessible training that empowers
              professionals to excel in their careers and helps organizations
              build talented teams.
            </p>
          </div>
          <div class="grid grid-cols-2 gap-4">
            <div
              class="bg-white/10 p-4 rounded-lg text-center backdrop-blur-sm"
            >
              <div class="font-bold text-4xl mb-1">10+</div>
              <div>Years Experience</div>
            </div>
            <div
              class="bg-white/10 p-4 rounded-lg text-center backdrop-blur-sm"
            >
              <div class="font-bold text-4xl mb-1">500+</div>
              <div>Corporate Clients</div>
            </div>
            <div
              class="bg-white/10 p-4 rounded-lg text-center backdrop-blur-sm"
            >
              <div class="font-bold text-4xl mb-1">50k+</div>
              <div>Trainees</div>
            </div>
            <div
              class="bg-white/10 p-4 rounded-lg text-center backdrop-blur-sm"
            >
              <div class="font-bold text-4xl mb-1">99%</div>
              <div>Satisfaction Rate</div>
            </div>
          </div>
        </div>
      </div>

      <!-- Contact Section -->
      <div class="text-center mb-8">
        <h2 class="text-2xl font-bold mb-6">Get in Touch</h2>
        <div class="flex flex-wrap justify-center gap-8">
          <div class="flex items-center gap-2">
            <Mail class="h-5 w-5 text-red-600" />
            <a
              href="mailto:contact@ipmac.com"
              class="text-gray-600 hover:text-red-600"
            >
              contact@ipmac.com
            </a>
          </div>
          <div class="flex items-center gap-2">
            <Phone class="h-5 w-5 text-red-600" />
            <a href="tel:+1234567890" class="text-gray-600 hover:text-red-600">
              +1 (234) 567-890
            </a>
          </div>
          <div class="flex items-center gap-2">
            <MapPin class="h-5 w-5 text-red-600" />
            <span class="text-gray-600">Seoul, South Korea</span>
          </div>
        </div>
      </div>

      <!-- Footer -->
      <footer class="border-t border-gray-200 mt-16 py-8">
        <div class="grid md:grid-cols-4 gap-8">
          <div>
            <h3 class="font-bold mb-4">About Us</h3>
            <ul class="space-y-2 text-sm text-gray-600">
              <li><a href="#" class="hover:text-red-600">Our Story</a></li>
              <li><a href="#" class="hover:text-red-600">Team</a></li>
              <li><a href="#" class="hover:text-red-600">Careers</a></li>
              <li><a href="#" class="hover:text-red-600">Press Kit</a></li>
            </ul>
          </div>
          <div>
            <h3 class="font-bold mb-4">Resources</h3>
            <ul class="space-y-2 text-sm text-gray-600">
              <li><a href="#" class="hover:text-red-600">Blog</a></li>
              <li><a href="#" class="hover:text-red-600">Documentation</a></li>
              <li><a href="#" class="hover:text-red-600">Help Center</a></li>
              <li><a href="#" class="hover:text-red-600">API</a></li>
            </ul>
          </div>
          <div>
            <h3 class="font-bold mb-4">Legal</h3>
            <ul class="space-y-2 text-sm text-gray-600">
              <li><a href="#" class="hover:text-red-600">Privacy Policy</a></li>
              <li>
                <a href="#" class="hover:text-red-600">Terms of Service</a>
              </li>
              <li><a href="#" class="hover:text-red-600">Cookie Policy</a></li>
              <li><a href="#" class="hover:text-red-600">Security</a></li>
            </ul>
          </div>
          <div>
            <h3 class="font-bold mb-4">Connect</h3>
            <ul class="space-y-2 text-sm text-gray-600">
              <li><a href="#" class="hover:text-red-600">Twitter</a></li>
              <li><a href="#" class="hover:text-red-600">LinkedIn</a></li>
              <li><a href="#" class="hover:text-red-600">Facebook</a></li>
              <li><a href="#" class="hover:text-red-600">Instagram</a></li>
            </ul>
          </div>
        </div>
        <div class="text-center text-sm text-gray-600 mt-8">
          © 2025 IPMAC Training Solutions. All rights reserved.
        </div>
      </footer>
    </div>
  </div>
</template>

<script setup>
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

import hyundaiLogo from '../assets/huyndai-logo.jpg'
import lgLogo from '../assets/lg-logo.jpg'
import samsungLogo from '../assets/samsung-logo.jpg'
</script>
