<template>
  <teleport to="body">
    <!-- Use v-if so the element gets removed from the DOM after animation -->
    <transition
      enter-active-class="ease-out duration-300"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="ease-in duration-300"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div
        v-show="backdropVisible"
        class="fixed inset-0 z-[90] h-full w-full bg-gray-700/10 backdrop-blur-[2px] duration-300 ease-in-out"
      ></div>
    </transition>

    <transition
      enter-active-class="transition ease-out duration-300 transform"
      enter-from-class="-translate-y-full opacity-0"
      enter-to-class="translate-y-0 opacity-100"
      leave-active-class="transition ease-in duration-300 transform"
      leave-from-class="translate-y-0 opacity-100"
      leave-to-class="-translate-y-full opacity-0"
    >
      <div
        v-show="open"
        @mousedown="closeModal"
        class="fixed inset-0 z-[90] flex h-full w-full items-center justify-center"
      >
        <div
          @mousedown.stop
          class="fixed z-[100]  flex transform flex-row rounded-lg bg-white p-10 shadow-lg dark:bg-darkmode-600 dark:shadow-gray-800"
        >
          <slot></slot>
        </div>
      </div>
    </transition>
  </teleport>
</template>

<script setup lang="ts">
import { ref, watch } from "vue"

const model = defineModel({ type: Boolean, default: false })

const open = ref(false)
const backdropVisible = ref(false)

watch(
  () => model.value,
  () => {
    if (model.value) {
      open.value = true
      setTimeout(() => {
        backdropVisible.value = true
      }, 200) // Delay to allow the backdrop to fade in first
    } else {
      open.value = false
      backdropVisible.value = false
    }

    return open.value
  }
)

const closeModal = () => {
  model.value = false // Start the closing animation of the modal
  // Delay hiding the backdrop to allow the leave transition to complete
  setTimeout(() => {
    backdropVisible.value = false
  }, 300) // Delay matches the duration of the leave animation
}
</script>
