<script setup lang="ts">
import type { EChartsOption } from 'echarts'
import { ref as firebaseRef, getDatabase, onValue } from 'firebase/database'
import { firebaseApp } from '~/config/firebase'
import { organizeData } from '~/utils/barData'

let chart1Options = $ref<EChartsOption>({})
let chart2Options = $ref<EChartsOption>({})
let chart3Options = $ref<EChartsOption>({})
let chart4Options = $ref<EChartsOption>({})

const listenFirebaseData = () => {
  const database = getDatabase(firebaseApp)
  const dataRef = firebaseRef(database, 'datas/')

  onValue(dataRef, (snapshot) => {
    const options = organizeData(snapshot.val())
    chart1Options = options[0]
    chart2Options = options[1]
    chart3Options = options[2]
    chart4Options = options[3]
  })
}

tryOnMounted(() => {
  listenFirebaseData()
})
</script>

<template>
  <div w-full h-full>
    <Chart :option="chart1Options" />
    <Chart :option="chart2Options" />
    <Chart :option="chart3Options" />
    <Chart :option="chart4Options" />
  </div>
</template>
