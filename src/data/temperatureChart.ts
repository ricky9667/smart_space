import type { EChartsOption } from 'echarts'
import type { TemperatureData } from './chartDataTypes'
import { generalLineChartOption } from '~/data/common/diagram'

export const getTemperatureChartOption = (temperatureDatas: Array<TemperatureData>): EChartsOption => {
  return {
    title: {
      text: '氣溫與水溫',
    },
    ...generalLineChartOption,
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: temperatureDatas.map(data => data.time.toString()),
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
        data: temperatureDatas.map(data => data.air),
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
        data: temperatureDatas.map(data => data.water),
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
}
