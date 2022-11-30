import { ref as firebaseRef, getDatabase, onValue } from 'firebase/database'
import type { FlightPathPointData, TemperatureData, UltraVioletData, WaterDepthData, WindData } from '~/data/chartDataTypes'
import { firebaseApp } from '~/config/firebase'
import { getOceanDepthChartOption } from '~/data/oceanDepthChart'
import { getWindChartOption } from '~/data/windChart'
import { getUltraVioletChartOption } from '~/data/uvChart'
import { getTemperatureChartOption } from '~/data/temperatureChart'

// firebase datas
const flightPathPointDatas = $ref<Array<FlightPathPointData>>([])
const ultraVioletDatas = $ref<Array<UltraVioletData>>([])
const temperatureDatas = $ref<Array<TemperatureData>>([])
const waterDepthDatas = $ref<Array<WaterDepthData>>([])
const windDatas = $ref<Array<WindData>>([])

// chart options
const ultraVioletChartOption = $computed(() => getUltraVioletChartOption(ultraVioletDatas))
const temperatureChartOption = $computed(() => getTemperatureChartOption(temperatureDatas))
const oceanDepthChartOption = $computed(() => getOceanDepthChartOption(waterDepthDatas))
const windChartOption = $computed(() => getWindChartOption(windDatas))

const addCurrentSnapshot = (data: any) => {
  flightPathPointDatas.push({ latitude: data.coordinate.latitude, longitude: data.coordinate.longitude })
  ultraVioletDatas.push({ amount: data.ultraviolet.amount, time: data.ultraviolet.time })
  temperatureDatas.push(data.temperature)
  waterDepthDatas.push({ depth: data.water_depth.value, time: data.water_depth.time })
  windDatas.push({ direction: data.wind.direction, speed: data.wind.speed })
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
