<script setup lang="ts">
import * as echarts from 'echarts/core'
import type { EChartsOption } from 'echarts'

interface Props {
  option: EChartsOption
}

const props = defineProps<Props>()

const chart = $ref({} as HTMLDivElement)
let chartInstance: echarts.ECharts

tryOnMounted(() => {
  chartInstance = echarts.init(chart)
  chartInstance.setOption(props.option)
})

console.log(props.option)

watch(props.option, (newOptions) => {
  if (newOptions)
    chartInstance.setOption(newOptions)
})
</script>

<template>
  <div ref="chart" />
</template>
