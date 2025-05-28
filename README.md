# 📶 Wifi Exam Frontend

A Vue 3 + Vite frontend for visualizing and managing Wi-Fi data usage and sales per ship. Integrates with the WifiAPIExam .NET backend and uses Clerk for authentication.

## Table of Contents

- [🔧 Stack](#stack)
- [🎯 Purpose](#purpose)
- [📋 Requirements](#requirements)
- [⚙️ Setup](#setup)
  - [🛠️ Environment Variables](#environment-variables)
  - [📦 Telenor Maritime Component Library Setup](#telenor-maritime-component-library-setup)
  - [🚀 Installation](#installation)
- [▶️ Running the Application](#running-the-application)
  - [🐳 Docker (Preferred Method)](#docker-preferred-method)
  - [💻 Local Development](#local-development)
- [📁 Project Structure](#project-structure)
- [🛠️ Development](#development)
  - [📦 Run Tests](#run-tests)
  - [🔍 Type Checking](#type-checking)
- [📦 Dependencies](#dependencies)
- [🔧 Troubleshooting](#troubleshooting)

## 🔧 Stack

- ⚡ Framework: Vue 3 with Vite
- 🔒 Authentication: Clerk
- 🗄️ State Management: Pinia
- 🧭 Routing: Vue Router
- 🧩 UI Components: Telenor-Maritime library
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

### 📦 Telenor Maritime Component Library Setup

To use the Telenor Maritime component library, you need to configure npm to use the correct package registry. Create a `.npmrc` file in the project root:

```
@telenor-maritime:registry=https://npm.pkg.github.com/
//npm.pkg.github.com/:_authToken=${GITHUB_TOKEN}
```

**Requirements:**

- You need a valid GitHub Personal Access Token with `read:packages` permission
- The token must have access to the Telenor Maritime GitHub organization
- Contact your team lead for access to the GitHub organization if needed

**Note:** Without the correct `.npmrc` configuration, the `@telenor-maritime/*` packages will fail to install during `npm install`.

### 🚀 Installation

```powershell
npm install
```

## ▶️ Running the Application

### 🐳 Docker (Preferred Method)

The recommended way to run the application is using Docker:

```powershell
docker-compose up --build
```

- App runs on `http://localhost:3000`
- Includes all dependencies and consistent environment
- No need to install Node.js or configure npm registries locally

### 💻 Local Development

For local development with hot reloading:

```powershell
npm run dev
```

- App runs on `http://localhost:5173`
- Hot Module Replacement and Tailwind CSS enabled
- Requires proper `.npmrc` and environment setup

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
- @telenor-maritime component libraries (only works with the correct .npmrc config)
- highcharts-vue
- @vuepic/vue-datepicker
- vitest, jsdom, @vue/test-utils

## 🔧 Troubleshooting

### Common Issues

#### 🚫 Telenor-Maritime Components Not Installing

If you encounter errors with `@telenor-maritime/*` packages:

```powershell
# Clear npm cache and reinstall
npm cache clean --force
Remove-Item node_modules -Recurse -Force
Remove-Item package-lock.json -Force
npm install
```

**Note:** Ensure your GitHub token has the correct permissions and access to the Telenor Maritime organization.

#### 🔐 Authentication Errors

If Clerk authentication fails:

1. Verify your `.env` variables are correctly set
2. Check that `VITE_CLERK_PUBLISHABLE_KEY` starts with `pk_`
3. Ensure the backend API is running on `http://localhost:8080`

#### 📡 API Connection Issues

If you can't connect to the backend:

```powershell
# Test backend connectivity
curl http://localhost:8080/Wifi/ShipIds
```

- Ensure the WifiAPIExam backend is running
- Check that CORS is properly configured in the backend
- Verify the API base URL in your environment

#### 🧪 Test Failures

If tests are failing:

```powershell
# Run tests in watch mode for debugging
npm run test -- --watch
# Run specific test file
npm run test -- Card.test.ts
```

#### 🏗️ Build Issues

If the build fails:

```powershell
# Clear Vite cache
Remove-Item .vite -Recurse -Force
# Rebuild
npm run build
```

#### 🎨 Styling Issues

If Tailwind styles aren't applying:

```powershell
# Rebuild Tailwind
npx tailwindcss -i ./src/assets/main.css -o ./dist/output.css --watch
```

### Getting Help

- Check browser console for error messages
- Verify all environment variables are set correctly
- Ensure backend API is running and accessible
- Try running `npm run type-check` to catch TypeScript issues
