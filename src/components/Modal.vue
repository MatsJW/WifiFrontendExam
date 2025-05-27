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
          ref="modalRef"
          @mousedown.stop
          class="fixed z-[100] flex transform flex-row rounded-lg bg-white p-10 shadow-lg dark:bg-darkmode-600 dark:shadow-gray-800"
        >
          <slot></slot>
        </div>
      </div>
    </transition>
  </teleport>
</template>

<script setup lang="ts">
import { createFocusTrap, type FocusTrap } from "focus-trap"
import { nextTick, onBeforeUnmount, ref, watch } from "vue"

const model = defineModel({ type: Boolean, default: false })

const open = ref(false)
const backdropVisible = ref(false)
const modalRef = ref<HTMLElement | null>(null)
let focusTrap: FocusTrap | null = null

watch(
  () => model.value,
  async (val) => {
    if (val) {
      open.value = true
      await nextTick()
      // initialize & activate focus-trap
      focusTrap = createFocusTrap(modalRef.value!, {
        fallbackFocus: modalRef.value!,
        escapeDeactivates: true,
        clickOutsideDeactivates: true,
        onDeactivate: () => {
          // when Esc is pressed, focus-trap deactivates, so close the modal
          closeModal()
        },
      })
      focusTrap.activate()
      setTimeout(() => (backdropVisible.value = true), 200)
    } else {
      // deactivate trap & start closing animation
      focusTrap?.deactivate()
      open.value = false
      backdropVisible.value = false
    }
  },
  { immediate: true }
)

onBeforeUnmount(() => {
  focusTrap?.deactivate()
})

const closeModal = () => {
  model.value = false // Start the closing animation of the modal
  // Delay hiding the backdrop to allow the leave transition to complete
  setTimeout(() => {
    backdropVisible.value = false
  }, 300) // Delay matches the duration of the leave animation
}
</script>
