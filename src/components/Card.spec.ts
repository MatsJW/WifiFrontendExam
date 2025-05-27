import { mount } from "@vue/test-utils"
import { describe, it, expect, vi, beforeEach } from "vitest"
import { defineComponent } from "vue"
import flushPromises from "flush-promises"
import Card from "@/components/Card.vue"
import { fetchData } from "@/utils/api-calls"

// Mock fetchData from api-calls
vi.mock("@/utils/api-calls", () => ({ fetchData: vi.fn() }))

describe("Card.vue", () => {
  const props = {
    title: "Test Chart",
    data: {
      shipId: 1,
      timeframe: "daily" as "daily" | "hourly",
      dataType: "sales" as "sales" | "dataUsage",
      dataAction: "sum" as "sum" | "average" | "count",
    },
    startDate: new Date("2025-01-01"),
    endDate: new Date("2025-01-02"),
  }

  beforeEach(() => {
    vi.clearAllMocks()
    // ensure fetchData returns an array to avoid undefined rawData
    ;(fetchData as any).mockResolvedValue([])
  })

  it("emits delete event when delete button is clicked", async () => {
    const wrapper = mount(Card, {
      props,
      global: {
        stubs: {
          highcharts: defineComponent({
            props: ["options"],
            template:
              '<div class="highcharts-stub">{{ options.title.text }}</div>',
          }),
        },
      },
    })
    await flushPromises()
    await wrapper.find("button").trigger("click")
    expect(wrapper.emitted()).toHaveProperty("delete")
  })

  it("calls fetchData and renders chart title", async () => {
    const mockRaw = [{ startDate: "2025-01-01T00:00:00", value: 10 }]
    // cast to any for mock
    ;(fetchData as any).mockResolvedValue(mockRaw)

    const wrapper = mount(Card, {
      props,
      global: {
        stubs: {
          highcharts: defineComponent({
            props: ["options"],
            template:
              '<div class="highcharts-stub">{{ options.title.text }}</div>',
          }),
        },
      },
    })
    await flushPromises()

    expect(fetchData).toHaveBeenCalledWith({
      ...props.data,
      startDate: "2025-01-01",
      endDate: "2025-01-02",
    })

    const chartStub = wrapper.find(".highcharts-stub")
    expect(chartStub.exists()).toBe(true)
    expect(chartStub.text()).toBe(props.title)
  })
})
