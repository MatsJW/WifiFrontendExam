import { ref, computed } from "vue"
import { defineStore } from "pinia"
import { useLocalStorage } from "@vueuse/core"

export type ChartData = {
  shipId: number
  frequency: "daily" | "hourly"
  dataType: "sales" | "dataUsage"
  dataAction: "sum" | "average" | "count"
}

export const useChartsStore = defineStore("charts", {
  state: () => ({
    chartData: useLocalStorage<ChartData[]>("chartData", [] as ChartData[]),
  }),

  getters: {
    getChartData: (state) => state.chartData,
  },

  actions: {
    setChartData(data: ChartData[]) {
      this.chartData = data
    },

    addChartData(data: ChartData) {
      this.chartData.push(data)
    },

    clearChartData() {
      this.chartData = []
    },
  },
})
