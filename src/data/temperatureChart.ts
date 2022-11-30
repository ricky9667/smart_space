import type { EChartsOption } from 'echarts'
import type { TemperatureData } from './chartDataTypes'
import { generalLineChartOption } from '~/data/common/diagram'

export const getTemperatureChartOption = (temperatureData: readonly Readonly<TemperatureData>[]): Readonly<EChartsOption> => {
  return {
    title: {
      text: '氣溫與水溫',
    },
    ...generalLineChartOption,
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: temperatureData.map(data => data.time.toString()),
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
        data: temperatureData.map(data => Math.round(data.air * 10) / 10),
        markPoint: {
          data: [
            {
              type: 'max',
              name: 'Max',
            },
            {
              type: 'min',
              name: 'Min',
            },
          ],
        },
        markLine: {
          data: [{
            type: 'average',
            name: 'Avg',
          }],
        },
      },
      {
        name: '水溫',
        type: 'line',
        color: '#2563eb',
        data: temperatureData.map(data => Math.round(data.water * 10) / 10),
        markPoint: {
          data: [
            {
              type: 'max',
              name: 'Max',
            },
            {
              type: 'min',
              name: 'Min',
            },
          ],
        },
        markLine: {
          data: [
            {
              type: 'average',
              name: 'Avg',
            },
          ],
        },
      },
    ],
  }
}
