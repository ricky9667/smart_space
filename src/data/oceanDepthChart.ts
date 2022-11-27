import type { EChartsOption } from 'echarts'
import { graphic } from 'echarts'

let base = +new Date(1968, 9, 3)
const oneDay = 24 * 3600 * 1000
const date = []

const data = [Math.random() * 300]

for (let i = 1; i < 20000; i++) {
  const now = new Date((base += oneDay))
  date.push([now.getFullYear(), now.getMonth() + 1, now.getDate()].join('/'))
  data.push(Math.round((Math.random() - 0.5) * 20 + data[i - 1]))
}

export const oceanDepthChartOption: EChartsOption = {
  tooltip: {
    trigger: 'axis',
    position(pt) {
      return [pt[0], '10%']
    },
  },
  title: {
    text: '水下深度',
  },
  toolbox: {
    show: false,
    feature: {
      dataZoom: {
        yAxisIndex: 'none',
      },
      restore: {},
      saveAsImage: {},
    },
  },
  xAxis: {
    type: 'category',
    boundaryGap: false,
    data: date, // should change to our time interval
  },
  yAxis: {
    type: 'value',
    axisLabel: {
      formatter: '{value} m',
    },
    boundaryGap: [0, '100%'],
  },
  dataZoom: [
    {
      type: 'inside',
      start: 0,
      end: 10,
    },
    {
      start: 0,
      end: 10,
    },
  ],
  series: [
    {
      name: '水深',
      type: 'line',
      symbol: 'none',
      sampling: 'lttb',
      itemStyle: {
        color: '#1d4ed8',
      },
      areaStyle: {
        color: new graphic.LinearGradient(0, 0, 0, 1, [
          {
            offset: 0,
            color: '#3b82f6',
          },
          {
            offset: 1,
            color: '#60a5fa',
          },
        ]),
      },
      data, // should replace with firebase data
    },
  ],
}

