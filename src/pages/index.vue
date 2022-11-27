<script lang="ts" setup>
import type { EChartsOption } from 'echarts'
import options from '~/data'

const chartOptions = $shallowRef<Array<EChartsOption>>(options)
</script>

<template>
  <Heading />
  <Chart v-for="(option, i) in chartOptions" :key="i" :option="option" h-xs md:h-xl md:px-4 min-w-fit py-4 sm:h-lg />
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
