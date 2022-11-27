import type { EChartsOption } from 'echarts'
import { generalLineChartOption } from '~/data/common/diagram'

export const temperatureChartOption: EChartsOption = {
  title: {
    text: '氣溫與水溫',
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
      formatter: '{value} °C',
    },
  },
  series: [
    {
      name: '氣溫',
      type: 'line',
      color: '#38bdf8',
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
    {
      name: '水溫',
      type: 'line',
      color: '#2563eb',
      data: [1, -2, 2, 5, 3, 2, 0], // should replace with firebase data
      markPoint: {
        data: [{ name: '周最低', value: -2, xAxis: 1, yAxis: -1.5 }],
      },
      markLine: {
        data: [
          { type: 'average', name: 'Avg' },
          [
            {
              symbol: 'none',
              x: '90%',
              yAxis: 'max',
            },
            {
              symbol: 'circle',
              label: {
                position: 'start',
                formatter: 'Max',
              },
              type: 'max',
              name: '最高点',
            },
          ],
        ],
      },
    },
  ],
}
