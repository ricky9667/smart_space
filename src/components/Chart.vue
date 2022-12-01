<script setup lang="ts">
import type { EChartsOption } from 'echarts'
import { GridComponent, LegendComponent, TitleComponent, ToolboxComponent, TooltipComponent } from 'echarts/components'
import { use } from 'echarts/core'
import { CanvasRenderer } from 'echarts/renderers'
import VChart from 'vue-echarts'

interface Props {
  option: Readonly<EChartsOption>
}

const props = defineProps<Props>()

use([
  CanvasRenderer,
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  GridComponent,
  ToolboxComponent,
])
</script>

<template>
  <VChart :option="props.option" max-w-full max-h-full w-auto />
</template>
