import type { EChartsOption } from 'echarts'
import { oceanDepthChartOption } from '~/data/oceanDepthChart'
import { uvChartOption } from '~/data/uvChart'
import { temperatureChartOption } from '~/data/temperatureChart'
import { windChartOption } from '~/data/windChart'

const options: Array<EChartsOption> = [
  uvChartOption,
  temperatureChartOption,
  oceanDepthChartOption,
  windChartOption,
]

export default options
