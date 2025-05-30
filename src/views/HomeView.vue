<template>
  <SignedIn>
    <div class="py-10">
      <section class="mb-10 gap-4 flex items-center">
        <Button
          id="add-chart-button"
          text="Add Chart"
          @click="openAddModal"
          icon="r"
          size="sm"
          type="primary"
        >
          <template #icon="icon">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              :width="icon.size"
              :height="icon.size"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="3"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path d="M5 12h14" />
              <path d="M12 5v14" />
            </svg>
          </template>
        </Button>

        <VueDatePicker
          class="max-w-80"
          v-model="selectedDate"
          range
          :min-date="new Date('2025-04-01')"
          :max-date="new Date('2025-04-30')"
          :start-date="new Date('2025-04-01')"
          :focus-start-date="true"
          :enable-time-picker="false"
          prevent-min-max-navigation
        />
      </section>
      <section
        :key="`${selectedDate}-${organization?.id}`"
        class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
      >
        <Card
          v-for="(item, index) in chartsStore.chartData"
          :key="`${item.shipId}-${item.dataType}-${item.dataAction}-${item.frequency}`"
          :title="`Chart for ${
            item.shipId.toString() === '' ? 'Fleet' : item.shipId
          } - ${item.dataAction} ${item.dataType} (${item.frequency})`"
          :data="item"
          :start-date="selectedDate[0]"
          :end-date="selectedDate[1]"
          @delete="deleteChart(index)"
        />
      </section>
    </div>

    <Modal v-model="AddModal">
      <ModalSelections @close="AddModal = false" :key="`${organization?.id}`" />
    </Modal>
  </SignedIn>
  <SignedOut>
    <LoggedOutHomeView />
  </SignedOut>
</template>

<script lang="ts" setup>
import { Button } from "@telenor-maritime/npm-components-buttons"
import { ref } from "vue"
import Card from "@/components/Card.vue"
import Modal from "@/components/Modal.vue"
import ModalSelections from "@/components/ModalSelections.vue"
import { useChartsStore } from "@/stores/charts-store"
import type { ChartData } from "@/stores/charts-store"
import { SignedIn, SignedOut, useOrganization } from "@clerk/vue"
import LoggedOutHomeView from "@/components/LoggedOutHomeView.vue"

const chartsStore = useChartsStore()
const { organization } = useOrganization()

const selectedDate = ref([
  new Date("2025-04-01T00:00:00"),
  new Date("2025-04-30T23:59:59"),
])

const AddModal = ref(false)

const openAddModal = (val: boolean) => {
  console.log("Open Add Modal")
  AddModal.value = val !== undefined ? val : !AddModal.value
}

const deleteChart = (index: number) => {
  chartsStore.chartData.splice(index, 1)
  console.log(`Deleted chart at index ${index}`)
}
</script>
