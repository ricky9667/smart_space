<script lang="ts" setup>
import type { EChartsOption } from 'echarts'
import { options } from '~/data'

const chartOptions = $shallowRef<Array<EChartsOption>>(options)

const chartIds = [
  'uv-chart',
  'temperature-chart',
  'ocean-depth-chart',
  'wind-chart',
]
</script>

<template>
  <Heading />
  <Chart v-for="(option, i) in chartOptions" :id="chartIds[i]" :key="i" :option="option" h-md sm:h-xl md:h-2xl md:px-4 min-w-fit py-4 my-4 />
</template>
