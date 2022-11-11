<script setup lang="ts">
import type { EChartsOption } from 'echarts'
import { GridComponent, LegendComponent, TitleComponent, ToolboxComponent, TooltipComponent } from 'echarts/components'
import { use } from 'echarts/core'
import { CanvasRenderer } from 'echarts/renderers'
import VChart from 'vue-echarts'

interface Props {
  option: EChartsOption
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
  <VChart :option="props.option" mx-4 my-4 />
</template>
