# Technical IT Training Center Management System - Frontend

Vue.js-based frontend for managing a technical IT training center, implementing role-based dashboards and integration with Keycloak authentication.

## 📋 Project Overview

### Key Features
- ✅ **Role-Based Interfaces**  
  Distinct dashboards for Trainees, Trainers, Partners, and Admins
- ✅ **Authentication Flow**  
  Keycloak integration for PKCE flow login
- ✅ **Responsive UI Components**  
  30+ Shadcn-vue components with Radix-vue primitives
- ✅ **API Integration**  
  Axios-based service layer with typed endpoints
- ✅ **Dockerized Deployment**  
  Production-ready Nginx configuration

## 🛠 Technologies Used
- **Core Framework**: Vue 3 + TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS + CSS Variables
- **UI Library**: Shadcn-vue
- **State Management**: Vue Router
- **API Client**: Axios
- **Infrastructure**: Docker, Nginx

## 🚀 Getting Started

### Prerequisites
- Node.js 20+
- Docker 20.10+
- Keycloak server (matching backend configuration)

### Installation
```bash
git clone https://your-repo/silversixx-ipmac-fe.git
cd silversixx-ipmac-fe
npm install
```

and an .env file and you are good to go.
```
VITE_KEYCLOAK_URL=http://localhost:8080
VITE_KEYCLOAK_REALM=training-realm
VITE_KEYCLOAK_CLIENT_ID=training-client
VITE_API_BASE_URL=http://localhost:8081/api
```