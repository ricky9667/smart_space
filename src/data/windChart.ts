import type { EChartsOption } from 'echarts'
import type { WindData } from '~/data/chartDataTypes'

const directions = ['N', 'NW', 'W', 'SW', 'S', 'SE', 'E', 'NE']

export const getWindChartOption = (windDatas: Array<WindData>): EChartsOption => {
  const lastWindData: WindData = windDatas.length > 0 ? windDatas[windDatas.length - 1] : { speed: 0, direction: 0 }

  return {
    title: {
      text: '風向與風速',
    },
    series: [
      {
        type: 'gauge',
        startAngle: 90,
        endAngle: 450,
        center: ['50%', '50%'],
        radius: '90%',
        min: 0,
        max: 1,
        splitNumber: 8,
        axisLine: {
          lineStyle: {
            width: 8,
            color: [
              [0.25, '#FF6E76'],
              [0.5, '#FDDD60'],
              [0.75, '#58D9F9'],
              [1, '#7CFFB2'],
            ],
          },
        },
        pointer: {
          icon: 'path://M12.8,0.7l12,40.1H0.7L12.8,0.7z',
          length: '12%',
          width: 20,
          offsetCenter: [0, '-60%'],
          itemStyle: {
            color: 'inherit',
          },
        },
        axisTick: {
          length: 12,
          lineStyle: {
            color: 'inherit',
            width: 2,
          },
        },
        splitLine: {
          length: 20,
          lineStyle: {
            color: 'inherit',
            width: 5,
          },
        },
        axisLabel: {
          color: '#464646',
          fontSize: 20,
          distance: -60,
          rotate: 'tangential',
          formatter: (value: number) => (value * 8 === Math.round(value * 8)) ? directions[value * 8] : '',
        },
        title: {
          offsetCenter: [0, '5%'],
          fontSize: 24,
        },
        detail: {
          fontSize: 56,
          offsetCenter: [0, '-10%'],
          valueAnimation: true,
          formatter: () => `${Math.round(lastWindData.speed * 100) / 100}`,
          color: 'inherit',
        },
        data: [
          {
            value: lastWindData.direction / 360,
            name: 'km/h',
          },
        ],
      },
    ],
  }
}
