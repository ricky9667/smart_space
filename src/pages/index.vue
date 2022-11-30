<script lang="ts" setup>
import type { EChartsOption } from 'echarts'
import { ref as firebaseRef, getDatabase, onValue } from 'firebase/database'
import { firebaseApp } from '~/config/firebase'
import options from '~/data'
import type { FlightPathPointData, TemperatureData, UltraVioletData, WaterDepthData, WindData } from '~/data/chartDataTypes'

const chartOptions = $shallowRef<Array<EChartsOption>>(options)

const chartIds = [
  'uv-chart',
  'temperature-chart',
  'ocean-depth-chart',
  'wind-chart',
]

const flightPathPointDatas = $ref<Array<FlightPathPointData>>([])
const ultraVioletDatas = $ref<Array<UltraVioletData>>([])
const temperatureDatas = $ref<Array<TemperatureData>>([])
const waterDepthDatas = $ref<Array<WaterDepthData>>([])
const windDatas = $ref<Array<WindData>>([])

const addCurrentSnapshot = (data: any) => {
  flightPathPointDatas.push({ latitude: data.coordinate.latitude, longitude: data.coordinate.longitude })
  ultraVioletDatas.push({ amount: data.ultraviolet.amount, time: data.ultraviolet.time })
  temperatureDatas.push({ air: data.temperature.air, water: data.temperature.water, time: data.temperature.time })
  waterDepthDatas.push({ depth: data.water_depth.value, time: data.water_depth.time })
  windDatas.push({ direction: data.wind.direction, speed: data.wind.speed })
}

const listenFirebaseData = () => {
  const database = getDatabase(firebaseApp)
  const dataRef = firebaseRef(database, 'datas/')

  onValue(dataRef, (snapshot) => {
    addCurrentSnapshot(snapshot.val())
  })
}

tryOnMounted(() => {
  listenFirebaseData()
})
</script>

<template>
  <Heading />
  <Chart v-for="(option, i) in chartOptions" :id="chartIds[i]" :key="i" :option="option" h-xs md:h-xl md:px-4 min-w-fit py-4 sm:h-lg />
</template>

<style lang="scss" scoped>
.chart {
  &__grid {
    grid-template-columns: repeat(auto-fit, minmax(min(100%, 40rem), 1fr));
    grid-template-rows: repeat(auto-fit, minmax(min(100%, 20rem), 1fr));
  }

  &__min-w {
    min-width: min(100%, 40rem);
  }
}
</style>
