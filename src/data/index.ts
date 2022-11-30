import { ref as firebaseRef, getDatabase, onValue } from 'firebase/database'
import type { FlightPathPointData, TemperatureData, UltraVioletData, WaterDepthData, WindData } from '~/data/chartDataTypes'
import { firebaseApp } from '~/config/firebase'
import { getOceanDepthChartOption } from '~/data/oceanDepthChart'
import { getWindChartOption } from '~/data/windChart'
import { getUltraVioletChartOption } from '~/data/uvChart'
import { getTemperatureChartOption } from '~/data/temperatureChart'

// firebase data.
const flightPathPointData = $ref<Array<FlightPathPointData>>([])
const ultraVioletData = $ref<Array<UltraVioletData>>([])
const temperatureData = $ref<Array<TemperatureData>>([])
const waterDepthData = $ref<Array<WaterDepthData>>([])
const windData = $ref<Array<WindData>>([])

// chart options
const ultraVioletChartOption = $computed(() => getUltraVioletChartOption(ultraVioletData))
const temperatureChartOption = $computed(() => getTemperatureChartOption(temperatureData))
const oceanDepthChartOption = $computed(() => getOceanDepthChartOption(waterDepthData))
const windChartOption = $computed(() => getWindChartOption(windData))

const addCurrentSnapshot = (data: any) => {
  flightPathPointData.push({ latitude: data.coordinate.latitude, longitude: data.coordinate.longitude })
  ultraVioletData.push({ amount: data.ultraviolet.amount, time: data.ultraviolet.time })
  temperatureData.push(data.temperature)
  waterDepthData.push({ depth: data.water_depth.value, time: data.water_depth.time })
  windData.push({ direction: data.wind.direction, speed: data.wind.speed })
}

export const listenFirebaseData = () => {
  const database = getDatabase(firebaseApp)
  const dataRef = firebaseRef(database, 'datas/')

  onValue(dataRef, (snapshot) => {
    addCurrentSnapshot(snapshot.val())
  })
}

export const options = $computed(() => [
  ultraVioletChartOption,
  temperatureChartOption,
  oceanDepthChartOption,
  windChartOption,
])
