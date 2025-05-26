<template>
  <header
    class="sticky top-0 z-50 flex items-center justify-between px-4 w-full h-16 bg-white border-b border-gray-400 shadow-md"
  >
    <div>
      <RouterLink to="/" class="flex items-center">
        <img :src="logo" alt="Logo" class="h-10" />
      </RouterLink>
    </div>
    <div>Log Inn</div>
  </header>
</template>

<script lang="ts" setup>
import logo from "@/assets/images/tm_logo_black.svg"
</script>
