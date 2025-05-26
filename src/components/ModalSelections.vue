<template>
  <div class="relative">
    <button
      @click="$emit('close')"
      class="absolute -top-5 -right-5 cursor-pointer hover:opacity-80 hover:bg-gray-200 rounded-full p-1"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <path d="M18 6 6 18" />
        <path d="m6 6 12 12" />
      </svg>
    </button>
    <div class="p-6 min-w-[300px] grid grid-cols-1 gap-6">
      <div>
        <Dropdown
          v-if="shipOptions.length > 0"
          v-model="selectedShip"
          :content="shipOptions"
          label="Select Ship"
          :error="needToFillIn && !selectedShip"
        />
      </div>
      <div>
        <Dropdown
          v-model="selectedData"
          :content="dataOptions"
          label="Select Data"
          :error="needToFillIn && !selectedData"
        />
      </div>
      <div>
        <Dropdown
          v-model="selectedTimeframe"
          :content="timeframeOptions"
          label="Select Timeframe"
          :error="needToFillIn && !selectedTimeframe"
        />
      </div>
    </div>
    <div class="flex justify-center">
      <Button
        @click="confirmSelection"
        text="Confirm"
        :disabled="!selectedShip || !selectedData || !selectedTimeframe"
      ></Button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onBeforeMount, ref } from "vue"
import { Dropdown } from "@star-fleet/component-dropdowns"
import { fetchShips } from "@/utils/api-calls"
import { Button } from "@star-fleet/component-buttons"
import type { ChartData } from "@/stores/charts-store"
import { useChartsStore } from "@/stores/charts-store"

const chartsStore = useChartsStore()

const emit = defineEmits<{
  (e: "close"): void
  (e: "confirm", payload: ChartData): void
}>()

const needToFillIn = ref(false)

const selectedShip = ref<Content>("")
const selectedData = ref<Content>("")
const selectedTimeframe = ref<Content>("")

type Content =
  | string
  | number
  | {
      text: string | number
      value: any
    }

const dataOptions: Content[] = [
  { text: "Sum of sales", value: ["sales", "sum"] },
  { text: "Amount of sales", value: ["sales", "count"] },
  { text: "Average price per sale", value: ["sales", "average"] },
  { text: "Average usage", value: ["dataUsage", "average"] },
  { text: "Total usage", value: ["dataUsage", "sum"] },
]

const shipOptions = ref<Content[]>([])

const timeframeOptions: Content[] = [
  { text: "Hourly", value: "hourly" },
  { text: "Daily", value: "daily" },
]

onBeforeMount(async () => {
  try {
    const ships = await fetchShips()
    if (!ships || ships.length === 0) {
      console.warn("No ships found")
      return
    }
    shipOptions.value = [{ text: "Fleet", value: "" }].concat(
      ships.map((ship) => {
        return {
          text: ship.shipId,
          value: ship.shipId,
        }
      })
    )
  } catch (error) {
    console.error("Failed to fetch ships:", error)
  }
})

const confirmSelection = () => {
  if (!selectedShip.value || !selectedData.value || !selectedTimeframe.value) {
    console.warn("Please select all options before confirming")
    needToFillIn.value = true
    return
  }

  chartsStore.addChartData({
    shipId: selectedShip.value.value,
    dataType: selectedData.value.value[0],
    dataAction: selectedData.value.value[1],
    timeframe: selectedTimeframe.value.value,
  })
  // Reset selections after confirmation
  needToFillIn.value = false
  selectedData.value = ""
  selectedShip.value = ""
  selectedTimeframe.value = ""

  emit("close")
}
</script>
