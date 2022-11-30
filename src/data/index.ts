import { ref as firebaseRef, getDatabase, onValue } from 'firebase/database'
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

// firebase data.
const flightPathPointData = $ref<Array<Readonly<NonNullable<FlightPathPointData>>>>([])
const ultraVioletData = $ref<Array<Readonly<NonNullable<UltraVioletData>>>>([])
const temperatureData = $ref<Array<Readonly<NonNullable<TemperatureData>>>>([])
const waterDepthData = $ref<Array<Readonly<NonNullable<WaterDepthData>>>>([])
const windData = $ref<Array<Readonly<NonNullable<WindData>>>>([])

// chart options
const ultraVioletChartOption = $computed(() => getUltraVioletChartOption(ultraVioletData))
const temperatureChartOption = $computed(() => getTemperatureChartOption(temperatureData))
const oceanDepthChartOption = $computed(() => getOceanDepthChartOption(waterDepthData))
const windChartOption = $computed(() => getWindChartOption(windData))

const updateLiveStreamedData = (data?: Readonly<ChartData>) => {
  if (!data)
    return

  const { coordinate, ultraviolet, temperature, water_depth, wind } = data

  coordinate && flightPathPointData.push(coordinate)
  ultraviolet && ultraVioletData.push(ultraviolet)
  temperature && temperatureData.push(temperature)
  water_depth && waterDepthData.push(water_depth)
  wind && windData.push(wind)
}

export const listenFirebaseData = () => {
  const database = getDatabase(firebaseApp)
  const dataRef = firebaseRef(database, 'datas/')

  onValue(dataRef, (snapshot) => {
    updateLiveStreamedData(snapshot.val() as unknown as ChartData)
  })
}

export const options = $computed(() => [
  ultraVioletChartOption,
  temperatureChartOption,
  oceanDepthChartOption,
  windChartOption,
])
