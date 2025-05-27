<template>
  <div class="p-6 rounded-lg shadow-telenor-lg relative bg-white">
    <button
      @click="$emit('delete')"
      class="absolute top-2 z-50 right-2 cursor-pointer hover:opacity-80 hover:bg-gray-200 rounded-full p-1"
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

    <highcharts
      :options="chartOptions"
      :class="!loading && !error ? '' : 'invisible'"
    />
    <div
      v-if="loading && !error"
      class="top-1/2 left-1/2 -translate-x-1/2 text-gray-400 -translate-y-1/2 absolute"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        height="90"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        class="animate-spin"
      >
        <path d="M21 12a9 9 0 1 1-6.219-8.56" />
      </svg>
    </div>

    <div
      v-if="error"
      class="absolute top-1/2 left-1/2 z-50 w-full max-w-sm transform -translate-x-1/2 -translate-y-1/2"
    >
      <div class="bg-white rounded-lg p-6 text-center">
        <div
          class="mx-auto w-10 h-10 flex items-center justify-center bg-red-100 text-red-600 rounded-full mb-4"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="w-6 h-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="2"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>
        <h3 class="text-lg font-semibold text-gray-900 mb-2">
          Oops, something went wrong
        </h3>
        <p class="text-gray-600 mb-2">
          We couldn’t load data for <strong>{{ props.title }}</strong
          >.
        </p>
        <p class="text-gray-600">
          Please check your connection and try again later.
        </p>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onBeforeMount, ref, type PropType } from "vue"
import type { ChartData } from "@/stores/charts-store"
import { fetchData } from "@/utils/api-calls"

const emits = defineEmits(["delete"])
const props = defineProps({
  title: {
    type: String,
    required: true,
  },
  data: {
    type: Object as PropType<ChartData>,
    required: true,
  },
  endDate: {
    type: Date,
    required: true,
  },
  startDate: {
    type: Date,
    required: true,
  },
})

const loading = ref(true)
const error = ref(false)

const chartOptions = ref<Highcharts.Options>({
  chart: {
    type: "line",
    backgroundColor: "#ffff",
  },
  title: {
    text: props.title,
  },
  xAxis: {},
  yAxis: {
    title: {
      text: "Number of Users",
    },
  },
  series: [],
  tooltip: {
    headerFormat: "<b>{point.key}</b><br>",
    pointFormat: "{series.name}: {point.y}",
  },
  lang: {
    thousandsSep: ",",
    decimalPoint: ".",
  },
})

onBeforeMount(async () => {
  if (!props.data) return

  loading.value = true
  const start = formatDate(props.startDate)
  const end = formatDate(props.endDate)

  const rawData = await fetchData({
    ...props.data,
    startDate: start,
    endDate: end,
  })

  if (rawData?.error) {
    console.error("Error fetching data:", rawData.error)
    loading.value = false
    error.value = true
    return
  }

  const categories = rawData.map(
    (d) =>
      d.startDate.split("T")[0].slice(5).replace("-", "/") +
      " " +
      d.startDate.split("T")[1].slice(0, 5)
  )

  let series
  if (props.data.dataType === "dataUsage") {
    series = [
      {
        type: "line",
        name: "Data Sent (KB)",
        data: (rawData as DataUsageResponse[]).map((d) => d.DataSentKb),
      },
      {
        type: "line",
        name: "Data Received (KB)",
        data: (rawData as DataUsageResponse[]).map((d) => d.DataReceivedKb),
      },
      {
        type: "line",
        name: "Total Usage (KB)",
        data: (rawData as DataUsageResponse[]).map((d) => d.DataUsageKb),
      },
    ]
  } else {
    series = [
      {
        type: "line",
        name: String(props.data.dataAction),
        data: (rawData as SalesResponse[]).map((d) => d.value),
      },
    ]
  }

  chartOptions.value = {
    ...chartOptions.value,
    xAxis: {
      type: "category",
      categories,
    },
    series,
  }

  loading.value = false
})

const formatDate = (date: Date) => {
  const y = date.getFullYear()
  const m = String(date.getMonth() + 1).padStart(2, "0")
  const d = String(date.getDate()).padStart(2, "0")
  return `${y}-${m}-${d}`
}
</script>
