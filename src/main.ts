import "./assets/main.css"

import { createApp } from "vue"
import { createPinia } from "pinia"
import { clerkPlugin } from "@clerk/vue"

import App from "./App.vue"
import router from "./router"

import VueDatePicker from "@vuepic/vue-datepicker"
import "@vuepic/vue-datepicker/dist/main.css"
import HighchartsVue from "highcharts-vue"

const app = createApp(App)

// @ts-ignore
app.use(clerkPlugin, {
  publishableKey: import.meta.env.VITE_CLERK_PUBLISHABLE_KEY,
  frontendApi: import.meta.env.VITE_CLERK_FRONTEND_API,
})
app.use(createPinia())
app.use(router)
app.component("VueDatePicker", VueDatePicker)
app.use(HighchartsVue)
app.mount("#app")
