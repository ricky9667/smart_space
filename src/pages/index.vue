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
  <div my-16 class="info-section">
    <p text-2xl font-800>
      適合潛水率：<span inline-block text-8xl font-900>95%</span>
    </p>
    <p text-xl font-700 py-2>
      (低於 80% 不建議下水)
    </p>
  </div>

  <Chart v-for="(option, i) in chartOptions" :key="i" min-w-fit h-xs sm:h-lg md:h-xl md:px-4 py-4 :option="option" />
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

.info-section {
  color: #00619D;
}
</style>
