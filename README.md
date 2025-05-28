# 📶 Wifi Exam Frontend

A Vue 3 + Vite frontend for visualizing and managing Wi-Fi data usage and sales per ship. Integrates with the WifiAPIExam .NET backend and uses Clerk for authentication.

## Table of Contents

- [🔧 Stack](#stack)
- [🎯 Purpose](#purpose)
- [📋 Requirements](#requirements)
- [⚙️ Setup](#setup)
  - [🛠️ Environment Variables](#environment-variables)
  - [🚀 Installation](#installation)
- [▶️ Running the Application](#running-the-application)
- [📁 Project Structure](#project-structure)
- [🛠️ Development](#development)
  - [📦 Run Tests](#run-tests)
  - [🔍 Type Checking](#type-checking)
- [📦 Dependencies](#dependencies)

## 🔧 Stack

- ⚡ Framework: Vue 3 with Vite
- 🔒 Authentication: Clerk
- 🗄️ State Management: Pinia
- 🧭 Routing: Vue Router
- 🧩 UI Components: Star-Fleet library
- 🎨 Styling: Tailwind CSS
- 📈 Charts: Highcharts (via highcharts-vue)
- 📅 Date Picker: @vuepic/vue-datepicker
- 🧪 Testing: Vitest & Vue Test Utils

## 🎯 Purpose

This application fetches ship IDs and time-series data (sales & data usage) from the backend, then displays interactive charts and tables for maritime Wi-Fi analytics over selectable date ranges.

## 📋 Requirements

- Node.js >= 18
- npm >= 8
- .NET 9.0 backend API (WifiAPIExam) running at `http://localhost:8080`
- Clerk publishable key and frontend API configured

## ⚙️ Setup

### 🛠️ Environment Variables

Create a `.env` file in the project root:

```powershell
VITE_CLERK_PUBLISHABLE_KEY=<your-publishable-key>
VITE_CLERK_FRONTEND_API=<your-frontend-api>
```

### 🚀 Installation

```powershell
npm install
```

## ▶️ Running the Application

```powershell
npm run dev
```

- App runs on `http://localhost:5173`
- Hot Module Replacement and Tailwind CSS enabled

## 📁 Project Structure

```
├── public/                  # Static assets
├── src/
│   ├── assets/              # CSS, images, fonts
│   ├── components/          # Vue components
│   ├── router/              # Vue Router setup
│   ├── stores/              # Pinia stores
│   ├── utils/               # api-calls.ts & tests
│   └── views/               # Page views
├── vite.config.ts           # Vite configuration
├── vitest.config.ts         # Test configuration
└── package.json             # Scripts & dependencies
```

## 🛠️ Development

### 📦 Run Tests

```powershell
npm run test
```

### 🔍 Type Checking

```powershell
npm run type-check
```

## 📦 Dependencies

See `package.json` for full dependency list. Key packages include:

- @clerk/vue
- vue, vue-router, pinia
- tailwindcss, postcss, autoprefixer
- @star-fleet component libraries
- highcharts-vue
- @vuepic/vue-datepicker
- vitest, jsdom, @vue/test-utils
