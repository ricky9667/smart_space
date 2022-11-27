import type { EChartsOption } from 'echarts'

export const generalLineChartOption: EChartsOption = {
  tooltip: {
    trigger: 'axis',
  },
  legend: {},
  toolbox: {
    show: false,
    feature: {
      dataZoom: {
        yAxisIndex: 'none',
      },
      dataView: { readOnly: false },
      magicType: { type: ['line', 'bar'] },
      restore: {},
      saveAsImage: {},
    },
  },
}
