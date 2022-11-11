<script setup lang="ts">
import type { EChartsOption } from 'echarts'
import { ref as firebaseRef, getDatabase, onValue } from 'firebase/database'
import { firebaseApp } from '~/config/firebase'
import options from '~/data'

const chartOptions = $shallowRef<Array<EChartsOption>>(options)

const listenFirebaseData = () => {
  const database = getDatabase(firebaseApp)
  const dataRef = firebaseRef(database, 'datas/')

  onValue(dataRef, (snapshot) => {
    // TODO: update chart's options.
  })
}

tryOnMounted(() => {
  listenFirebaseData()
})
</script>

<template>
  <div transform-gpu h-screen justify-center relative grid gap-4 grid-cols-2 grid-rows-2 class="chart__grid">
    <Chart v-for="(option, i) in chartOptions" :key="i" min-w-fit self-center max-h-screen :option="option" />
  </div>
</template>

<style scoped lang="scss">
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
