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
  <div px-4 py-4 transform-gpu flex h-screen justify-center relative>
    <Chart v-for="(option, i) in chartOptions" :key="i" self-center :option="option" />
  </div>
</template>
