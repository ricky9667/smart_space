import type { EChartsOption } from 'echarts'
import type { UltraVioletData } from './chartDataTypes'
import { generalLineChartOption } from '~/data/common/diagram'

export const getUltraVioletChartOption = (ultraVioletData: Array<UltraVioletData>): EChartsOption => {
  return {
    title: {
      text: '紫外線指數',
    },
    ...generalLineChartOption,
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: ultraVioletData.map(data => data.time.toString()),
    },
    yAxis: {
      type: 'value',
      axisLabel: {
      },
    },
    series: [
      {
        name: '紫外線',
        type: 'line',
        color: '#7c3aed',
        data: ultraVioletData.map(data => data.amount),
        markPoint: {
          data: [
            { type: 'max', name: 'Max' },
            { type: 'min', name: 'Min' },
          ],
        },
        markLine: {
          data: [{ type: 'average', name: 'Avg' }],
        },
      },
    ],
  }
}
