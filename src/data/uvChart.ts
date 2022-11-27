import type { EChartsOption } from 'echarts'
import { generalLineChartOption } from '~/data/common/diagram'

export const uvChartOption: EChartsOption = {
  title: {
    text: '紫外線指數',
  },
  ...generalLineChartOption,
  xAxis: {
    type: 'category',
    boundaryGap: false,
    data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'], // should change to our time interval
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
      data: [10, 11, 13, 11, 12, 12, 9], // should replace with firebase data
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
