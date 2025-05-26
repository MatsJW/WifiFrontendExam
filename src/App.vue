<template>
  <Header />
  <div class="max-w-[1920px] min-h-[calc(100vh-64px)] mx-auto px-4">
    <RouterView />
  </div>
  <Footer />
</template>

<script setup lang="ts">
import { RouterLink, RouterView } from "vue-router"
import Header from "./components/Header.vue"
import Footer from "./components/Footer.vue"
</script>
