<template>
  <div class="min-h-screen">
    <!-- Hero Section -->
    <div class="flex flex-col items-center justify-center min-h-screen px-4">
      <div class="w-full max-w-md">
        <!-- Logo and Branding -->
        <div class="text-center mb-8">
          <div class="mb-6">
            <img
              :src="logo"
              alt="Telenor Maritime Logo"
              class="h-16 w-auto mx-auto"
            />
          </div>
          <h1 class="text-3xl font-bold text-telenor-neutral-black mb-2">
            WiFi Analytics Dashboard
          </h1>
          <p class="text-telenor-neutral-shade-600 text-lg">Telenor Maritime</p>
        </div>

        <!-- Sign In Card -->
        <div class="bg-white rounded-2xl shadow-telenor-lg p-8">
          <div class="text-center mb-6">
            <h2 class="text-xl font-semibold text-telenor-neutral-black mb-2">
              Welcome Back
            </h2>
            <p class="text-telenor-neutral-shade-600">
              Sign in to access your WiFi analytics and insights
            </p>
          </div>

          <!-- Features List -->
          <div class="mb-6">
            <div class="space-y-3">
              <div class="flex items-center text-telenor-neutral-shade-700">
                <div class="w-2 h-2 bg-telenor rounded-full mr-3"></div>
                <span class="text-sm">Network analytics and insights</span>
              </div>
              <div class="flex items-center text-telenor-neutral-shade-700">
                <div class="w-2 h-2 bg-telenor rounded-full mr-3"></div>
                <span class="text-sm">Historical data trends</span>
              </div>
            </div>
          </div>

          <!-- Sign In Button -->
          <SignInButton
            class="w-full bg-telenor-cta-default cursor-pointer hover:bg-telenor-cta-hover text-white font-semibold py-4 px-6 rounded-full transition-all duration-300 transform hover:scale-[1.02] hover:shadow-lg focus:outline-none focus:ring-4 focus:ring-telenor-cta-focus/30"
          >
            <div class="flex items-center justify-center gap-2">
              <svg
                class="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
                />
              </svg>
              Sign In to Continue
            </div>
          </SignInButton>
        </div>

        <!-- Additional Info -->
        <div class="text-center mt-6">
          <p class="text-telenor-neutral-shade-600 text-sm">
            Secure authentication powered by industry-leading security standards
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { SignInButton } from "@clerk/vue"
import logo from "@/assets/images/tm_logo_black.svg"
</script>
