<script setup lang="ts">
import { divePercentage } from '~/data'

const percentage = $shallowRef(divePercentage)
</script>

<template>
  <div my-16 class="info-section">
    <p text-2xl font-800>
      適合潛水率：<span inline-block text-8xl font-900>{{ percentage }}%</span>
    </p>
    <p text-xl font-700 py-2>
      (低於 80% 不建議下水)
    </p>
  </div>
</template>

<style scoped lang="scss">
.info-section {
  color: #00619D;
}
</style>
