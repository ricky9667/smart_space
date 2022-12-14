import type { Unsubscribe } from 'firebase/database'
import { ref as firebaseRef, getDatabase, onValue } from 'firebase/database'
import type { Plugin } from 'vue'
import { firebaseApp } from '~/config/firebase'
import type {
  ChartData,
  FlightPathPointData,
  TemperatureData,
  UltraVioletData,
  WaterDepthData,
  WindData,
} from '~/data/chartDataTypes'
import { getOceanDepthChartOption } from '~/data/oceanDepthChart'
import { getTemperatureChartOption } from '~/data/temperatureChart'
import { getUltraVioletChartOption } from '~/data/uvChart'
import { getWindChartOption } from '~/data/windChart'

const MAX_STORED_CHART_DATA_AMOUNT = 20
const MAX_STORED_MAP_DATA_AMOUNT = 2000
const DEBOUNCE_TIME = 100

// firebase data.
export const flightPathPointData = shallowRef(useQueueWithSize<FlightPathPointData>(MAX_STORED_MAP_DATA_AMOUNT))
const ultraVioletData = shallowRef(useQueueWithSize<UltraVioletData>(MAX_STORED_CHART_DATA_AMOUNT))
const temperatureData = shallowRef(useQueueWithSize<TemperatureData>(MAX_STORED_CHART_DATA_AMOUNT))
const waterDepthData = shallowRef(useQueueWithSize<WaterDepthData>(MAX_STORED_CHART_DATA_AMOUNT))
const windData = shallowRef(useQueueWithSize<WindData>(MAX_STORED_CHART_DATA_AMOUNT))

// chart options
const ultraVioletChartOption = $computed(() => getUltraVioletChartOption(ultraVioletData.value.toArray()))
const temperatureChartOption = $computed(() => getTemperatureChartOption(temperatureData.value.toArray()))
const oceanDepthChartOption = $computed(() => getOceanDepthChartOption(waterDepthData.value.toArray()))
const windChartOption = $computed(() => getWindChartOption(windData.value.toArray()))

// heading dive percentage
export let divePercentage = $ref(0)

const updateLiveStreamedData = (data?: Readonly<ChartData>) => {
  if (!data)
    return

  const {
    coordinate,
    ultraviolet,
    temperature,
    water_depth,
    wind,
  } = data

  coordinate && (() => {
    flightPathPointData.value.enqueue(coordinate)
    triggerRef(flightPathPointData)
  })()

  ultraviolet && (() => {
    ultraVioletData.value.enqueue(ultraviolet)
    triggerRef(ultraVioletData)
  })()

  temperature && (() => {
    temperatureData.value.enqueue(temperature)
    triggerRef(temperatureData)
  })()

  water_depth && (() => {
    waterDepthData.value.enqueue(water_depth)
    triggerRef(waterDepthData)
  })()

  wind && (() => {
    windData.value.enqueue(wind)
    triggerRef(windData)
  })()

  divePercentage = useRandom(0, 100)
}

export const liveChartDataListener: Plugin = {
  install() {
    const unsubscribeFirebaseData = $ref<Unsubscribe>()

    const listenFirebaseData = (): Unsubscribe => {
      const database = getDatabase(firebaseApp)
      const dataRef = firebaseRef(database, 'datas/')

      return onValue(dataRef, useDebounceFn((snapshot) => {
        updateLiveStreamedData(snapshot.val() as unknown as ChartData)
      }, DEBOUNCE_TIME))
    }

    tryOnBeforeMount(() => {
      listenFirebaseData()
    })

    tryOnBeforeUnmount(() => {
      unsubscribeFirebaseData?.()
    })
  },
}

export const options = $computed(() => [
  ultraVioletChartOption,
  temperatureChartOption,
  oceanDepthChartOption,
  windChartOption,
])
