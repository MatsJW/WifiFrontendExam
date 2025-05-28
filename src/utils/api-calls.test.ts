// Mock Clerk composable before module import
import { describe, it, expect, vi, beforeEach, beforeAll } from "vitest"
vi.mock("@clerk/vue", () => ({
  useAuth: () => ({ getToken: { value: () => Promise.resolve("fake-token") } }),
}))

import {
  apiWrapper,
  fetchShips,
  fetchData,
  type FetchDataParams,
  setBaseUrl,
} from "./api-calls"

// Define base URL for all API calls in tests
beforeAll(() => {
  setBaseUrl("http://localhost:8080")
})

// Mock global.fetch for all tests
describe("apiWrapper", () => {
  let fetchMock: ReturnType<typeof vi.fn>

  beforeEach(() => {
    fetchMock = vi.fn()
    // @ts-ignore
    global.fetch = fetchMock
  })

  it("calls fetch with correct URL and options for GET without params", async () => {
    fetchMock.mockResolvedValue({ ok: true, status: 200, json: async () => 42 })
    const result = await apiWrapper("http://example.com", {}, {}, "GET")
    expect(fetchMock).toHaveBeenCalledWith(
      "http://example.com",
      expect.objectContaining({
        method: "GET",
        headers: expect.objectContaining({
          "Content-Type": "application/json",
          Authorization: "Bearer fake-token",
        }),
      })
    )
    expect(result).toBe(42)
  })

  it("includes query parameters in URL for GET", async () => {
    fetchMock.mockResolvedValue({
      ok: true,
      status: 200,
      json: async () => ({}),
    })
    await apiWrapper("http://example.com", { a: "1", b: "two" }, {}, "GET")
    expect(fetchMock).toHaveBeenCalledWith(
      "http://example.com?a=1&b=two",
      expect.objectContaining({
        headers: expect.objectContaining({
          Authorization: "Bearer fake-token",
        }),
      })
    )
  })

  it("adds JSON body for POST requests", async () => {
    const body = { foo: "bar" }
    fetchMock.mockResolvedValue({
      ok: true,
      status: 200,
      json: async () => ({}),
    })
    await apiWrapper("http://example.com", {}, body, "POST")
    expect(fetchMock).toHaveBeenCalledWith(
      "http://example.com",
      expect.objectContaining({
        method: "POST",
        headers: expect.objectContaining({
          "Content-Type": "application/json",
          Authorization: "Bearer fake-token",
        }),
        body: JSON.stringify(body),
      })
    )
  })

  it("returns null on HTTP 204 No Content", async () => {
    fetchMock.mockResolvedValue({ ok: true, status: 204 })
    const result = await apiWrapper("http://example.com", {}, {}, "DELETE")
    expect(result).toBeNull()
  })

  it("returns error object on HTTP error status", async () => {
    fetchMock.mockResolvedValue({ ok: false, status: 404 })
    const result = await apiWrapper("http://example.com", {}, {}, "GET")
    expect(result).toHaveProperty("error")
    expect(result.error).toBeInstanceOf(Error)
    expect(result.error.message).toBe("HTTP error! status: 404")
  })

  // Tests for fetchShips
  it("fetchShips calls correct URL and returns ship list", async () => {
    const ships = [{ shipId: "S1" }, { shipId: "S2" }]
    fetchMock.mockResolvedValue({
      ok: true,
      status: 200,
      json: async () => ships,
    })
    const result = await fetchShips()
    expect(fetchMock).toHaveBeenCalledWith(
      "http://localhost:8080/Wifi/ShipIds",
      expect.objectContaining({
        method: "GET",
        headers: expect.objectContaining({
          Authorization: "Bearer fake-token",
        }),
      })
    )
    expect(result).toEqual(ships)
  })

  // Tests for fetchData
  it("fetchData builds URL with shipId and returns data", async () => {
    const data = { total: 100 }
    fetchMock.mockResolvedValue({
      ok: true,
      status: 200,
      json: async () => data,
    })
    const params: FetchDataParams = {
      shipId: 5,
      timeframe: "daily",
      dataType: "sales",
      dataAction: "sum",
      startDate: "2025-01-01",
      endDate: "2025-01-31",
    }
    const result = await fetchData(params)
    expect(fetchMock).toHaveBeenCalledWith(
      "http://localhost:8080/Wifi/sales/daily/sum?startDate=2025-01-01&endDate=2025-01-31&shipId=5",
      expect.objectContaining({
        method: "GET",
        headers: expect.objectContaining({
          Authorization: "Bearer fake-token",
        }),
      })
    )
    expect(result).toEqual(data)
  })

  it("fetchData builds URL without shipId and returns data", async () => {
    const data = { avg: 50 }
    fetchMock.mockResolvedValue({
      ok: true,
      status: 200,
      json: async () => data,
    })
    const params: FetchDataParams = {
      timeframe: "hourly",
      dataType: "dataUsage",
      dataAction: "average",
      startDate: "2025-02-01",
      endDate: "2025-02-28",
    }
    const result = await fetchData(params)
    expect(fetchMock).toHaveBeenCalledWith(
      "http://localhost:8080/Wifi/dataUsage/hourly/average?startDate=2025-02-01&endDate=2025-02-28",
      expect.objectContaining({
        method: "GET",
        headers: expect.objectContaining({
          Authorization: "Bearer fake-token",
        }),
      })
    )
    expect(result).toEqual(data)
  })
})
