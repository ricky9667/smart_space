<script lang="ts" setup>
import type { EChartsOption } from 'echarts'
import { ref as firebaseRef, getDatabase, onValue } from 'firebase/database'
import { flightPlanHeight } from '~/config/config'
import { firebaseApp } from '~/config/firebase'
import options from '~/data'

const chartOptions = $shallowRef<Array<EChartsOption>>(options)

const chartIds = [
  'uv-chart',
  'temperature-chart',
  'ocean-depth-chart',
  'wind-chart',
]

var flightPathPointDatas = [];
var airDatas = [];
var waterDatas = [];
var ultravioletDatas = [];
var waterDepthDatas = [];
var windDatas = [];

const listenFirebaseData = () => {
  const database = getDatabase(firebaseApp)
  const dataRef = firebaseRef(database, 'datas/')

  onValue(dataRef, (snapshot) => {
    showData(snapshot.val());
  })
}

const showData = (data: any) => {
  var latitude = data["coordinate"]["latitude"]
  var longitude = data["coordinate"]["longitude"]
  flightPathPointDatas.push(createFlightPointsData(latitude, longitude))
  var air = data["temperature"]["air"]
  var time = data["temperature"]["time"]
  var water = data["temperature"]["water"]
  airDatas.push(create2DData(air, time))
  waterDatas.push(create2DData(water, time))
  var amount = data["ultraviolet"]["amount"]
  // var time = data["ultraviolet"]["time"]
  ultravioletDatas.push(create2DData(amount, time))
  // var time = data["water_depth"]["time"]
  var value = data["water_depth"]["value"]
  waterDepthDatas.push(create2DData(value, time))
  var direction = data["wind"]["direction"]
  var speed = data["wind"]["speed"]
  windDatas.push(create2DData(direction, speed))
}

const createFlightPointsData = (latitude, longitude, value = 0) => {
  var coordinateData = {
      name: '',
      value: [longitude, latitude, flightPlanHeight, value],
      itemStyle: { 'color': 'white', 'opacity': 0.8, 'borderWidth': 3, 'borderColor': 'green' }
    }
  return coordinateData;
}

const create2DData = (value, data_time) => {
  return {
    name: data_time,
    value: [
      data_time,
      value
    ]
  }
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
