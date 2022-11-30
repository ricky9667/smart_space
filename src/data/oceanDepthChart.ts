import type { EChartsOption } from 'echarts'
import { graphic } from 'echarts'
import type { WaterDepthData } from '~/data/chartDataTypes'

export const getOceanDepthChartOption = (oceanDepthData: Array<WaterDepthData>): EChartsOption => {
  return {
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
      data: oceanDepthData.map(data => data.time.toString()),
    },
    yAxis: {
      type: 'value',
      axisLabel: {
        formatter: '{value} m',
      },
      boundaryGap: [0, '100%'],
    },
    dataZoom: [],
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
        data: oceanDepthData.map(data => -data.depth),
      },
    ],
  }
}
