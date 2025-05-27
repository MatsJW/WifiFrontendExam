<template>
  <div class="flex items justify-center min-h-screen mt-20">
    <div class="flex flex-col items-center gap-4">
      <h1 class="text-2xl font-bold">Please sign in to view charts</h1>
      <SignInButton class="bg-telenor-mid text-white px-4 py-3 rounded-full" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { SignInButton } from "@clerk/vue"
</script>
