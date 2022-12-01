import '@unocss/reset/tailwind.css'
import 'uno.css'
import routes from 'virtual:generated-pages'
import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import App from './App.vue'
import { liveChartDataListener } from '~/data'
import './styles/main.scss'

const app = createApp(App)
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

app.use(router)
  .use(liveChartDataListener)
  .mount('#app')
