import type { ChartData } from "@/stores/charts-store"
import { useAuth } from "@clerk/vue"

const baseUrl = "http://localhost:5085"

export type apiTypesT = "GET" | "DELETE" | "POST" | "PUT"
export interface FetchOptionsI {
  method: apiTypesT
  credentials?: "include"
  headers: {
    Authorization?: string
    "Content-Type": string
  }
  body?: string // optional body - not for get type methods
}

export async function apiWrapper(
  url: string,
  params: object,
  bodyArgs: object,
  method: apiTypesT
) {
  if (["GET", "DELETE", "POST", "PUT"].includes(method)) {
    //append parameters to the URL
    const queryParams = new URLSearchParams(params as any)
    if (queryParams.toString() !== "") {
      url = `${url}?${queryParams.toString()}`
    }
  }

  // Get the token from the auth store
  const auth = useAuth()
  const token = await auth.getToken.value()

  let fetchOptions: FetchOptionsI = {
    method: method,
    headers: {
      Authorization: token ? `Bearer ${token}` : "",
      "Content-Type": "application/json",
    },
  }

  if (["POST", "PUT", "DELETE"].includes(method)) {
    // conditional application of body - 'GET' will fail with body
    fetchOptions.body = JSON.stringify(bodyArgs)
  }
  // Use fetch API to get the data
  return fetch(url, fetchOptions)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      } else if (response.status === 204) {
        console.log("Update successful, no content returned")
        return null // for put requests
      }
      return response.json()
    })
    .catch((error) => {
      console.error("There was a problem with the fetch operation:", error)
      return { error: error }
    })
}

export const fetchShips = async (): Promise<{ shipId: string }[]> => {
  const response = await apiWrapper(`${baseUrl}/Wifi/ShipIds`, {}, {}, "GET")
  return response
}

type FetchDataParams = {
  shipId?: number
  timeframe: "daily" | "hourly"
  dataType: "sales" | "dataUsage"
  dataAction: "sum" | "average" | "count"
  startDate: string
  endDate: string
}

type FetchDataCallParams = {
  startDate: string
  endDate: string
  shipId?: number
}

export const fetchData = async ({
  shipId,
  timeframe,
  dataType,
  dataAction,
  startDate,
  endDate,
}: FetchDataParams): Promise<any> => {
  const params: FetchDataCallParams = {
    startDate,
    endDate,
  }
  if (shipId) {
    params.shipId = shipId
  }

  const response = await apiWrapper(
    `${baseUrl}/Wifi/${dataType}/${timeframe}/${dataAction}`,
    params,
    {},
    "GET"
  )
  return response
}
