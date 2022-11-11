import type { EChartsOption } from 'echarts'
import { useRandom } from '~/composables'
import { defaultLocation, defaultPitch, defaultZoom, flightPlanHeight, labels } from '~/config/config'

export const createRandomBar3DData = (): Readonly<Array<Readonly<Array<Readonly<number>>>>> => {
  const data = []
  for (let i = 0; i < 5; i++) {
    for (let j = 0; j < 10; j++)
      data.push([i, j, useRandom(0, 30)])
  }
  return data
}

export interface Bar2DData {
  name: Readonly<string>
  value: Readonly<Array<Readonly<string>>>
}

export const create2DData = (value: string, dataTime: string): Readonly<Bar2DData> => ({
  name: dataTime,
  value: [
    dataTime,
    value,
  ],
})

export interface FlightPointsData {
  name: Readonly<string>
  value: Readonly<Array<Readonly<number>>>
  itemStyle: Readonly<Record<string, string | number>>
}

export const createFlightPointsData = (coords: Array<number>, value: number): Readonly<FlightPointsData> => ({
  name: '',
  value: [...coords, flightPlanHeight, value],
  itemStyle: {
    color: 'white',
    opacity: 0.8,
    borderWidth: 3,
    borderColor: 'green',
  },
})

export const get2DOption = (tempData: Array<any>, humidityData: Array<any>): EChartsOption => ({
  title: {
    text: '溫濕度折線圖',
  },
  tooltip: {
    trigger: 'axis',
    formatter: (params) => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      const _params = params[0]
      const date = new Date(_params.name)
      return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()} : ${_params.value[1]}`
    },
    axisPointer: {
      animation: false,
    },
  },
  xAxis: {
    type: 'time',
    splitLine: {
      show: true,
    },
  },
  yAxis: {
    type: 'value',
    boundaryGap: [0, '100%'],
    max: 100,
    min: 0,
    splitLine: {
      show: false,
    },
  },
  legend: {
    data: ['溫度', '濕度'],
  },
  series: [{
    name: '溫度',
    type: 'line',
    showSymbol: false,
    data: tempData,
  },
  {
    name: '濕度',
    type: 'line',
    showSymbol: false,
    data: humidityData,
  }],
})

export const createMap3DOption = (): EChartsOption => ({
  title: {
    text: '北科大上空PM2.5分佈圖',
    textStyle: {
      color: 'white',
    },
  },
  mapbox3D: {
    style: 'mapbox://styles/biabobo/cjha51jt70x802rqsorws3xqz',
    center: defaultLocation,
    zoom: defaultZoom,
    pitch: defaultPitch,
    altitudeScale: 1,
    shading: 'color',
    postEffect: {
      enable: true,
      SSAO: {
        enable: true,
        radius: 2,
      },
    },
    light: {
      main: {
        intensity: 1,
        shadow: true,
        shadowQuality: 'high',
      },
      ambient: {
        intensity: 0,
      },
    },
  },
  visualMap: {
    type: 'piecewise',
    pieces: [
      { gte: 150.5, label: '>= 150.5 μg/m3', color: '#660499', colorAlpha: 1 },
      { gt: 55.5, lt: 150.4, label: '55.5-150.4 μg/m3', color: '#CC0233', colorAlpha: 1 },
      { gt: 35.5, lt: 55.4, label: '35.5-55.4 μg/m3', color: '#FFA500', colorAlpha: 1 },
      { gt: 12.1, lte: 35.4, label: '12.1-35.4 μg/m3', color: '#FFDE34', colorAlpha: 1 },
      { lte: 12, label: '<= 12.0 μg/m3', color: '#009966', colorAlpha: 1 },
    ],
    dimension: 3,
    seriesIndex: [0, 1],
    itemWidth: 20,
    itemHeight: 16,
    itemGap: 12,
    hoverLink: false,
    left: 20,
    bottom: 50,
    textStyle: { color: 'white', fontSize: 12 },
  },
})

export const getFlightData3D = (data: any): EChartsOption => ({
  series: [
    {
      name: 'Flight Path Point',
      type: 'scatter',
      coordinateSystem: 'mapbox3D',
      symbol: 'circle',
      symbolSize: 6,
      animation: false,
      data,
      label: {
        show: false,
      },
      emphasis: {
        itemStyle: {
          borderWidth: 0.2,
          borderColor: 'white',
        },
      },
    }],
})

export const getRadarOption = (data: any): EChartsOption => ({
  title: {
    text: '空氣品質AQI雷達圖',
  },
  tooltip: {},
  legend: {
    data: ['無人機1', '無人機2'],
  },
  name: {
    textStyle: {
      color: '#fff',
      backgroundColor: '#999',
      borderRadius: 3,
      padding: [3, 5],
    },
  },
  radar: {
    indicator: [
      { name: '細懸浮微粒PM2.5(μg/m3)', max: 100 },
      { name: '懸浮微粒PM10(μg/m3)', max: 100 },
      { name: '臭氧O3(ppb)', max: 150 },
      { name: '一氧化碳CO(ppm)', max: 100 },
      { name: '二氧化硫SO2(ppb)', max: 100 },
      { name: '二氧化氮NO2(ppb)', max: 150 },
    ],
  },
  series: [{
    name: 'AQI Index',
    type: 'radar',
    data: [
      {
        value: data,
        name: '無人機1',
      },
    ],
  }],
})

export const getBar3DOption = (data: any): EChartsOption => ({
  title: {
    text: '開放思考',
  },
  tooltip: {},
  visualMap: {
    max: 20,
    show: false,
    inRange: {
      color: ['#313695', '#4575b4', '#74add1', '#abd9e9', '#e0f3f8', '#ffffbf', '#fee090', '#fdae61', '#f46d43', '#d73027', '#a50026'],
    },
  },
  xAxis3D: {
    name: 'x',
    type: 'category',
    data: labels,
  },
  yAxis3D: {
    name: 'y',
    type: 'category',
  },
  zAxis3D: {
    name: 'z',
    type: 'value',
  },
  grid3D: {
    boxWidth: 200,
    boxDepth: 80,
    viewControl: {
      projection: 'orthographic',
    },
    light: {
      main: {
        intensity: 1.2,
        shadow: true,
      },
      ambient: {
        intensity: 0.3,
      },
    },
  },
  series: [{
    type: 'bar',
    data: data.map((item: Array<any>) => {
      return {
        value: [item[1], item[0], item[2]],
      }
    }),
    emphasis: {
      itemStyle: {
        color: '#900',
      },
    },
  }],
})

export const getAirOption = (pm25: any, co: any): EChartsOption => ({
  title: {
    text: '天氣品質折線圖',
  },
  tooltip: {
    trigger: 'axis',
    formatter(params) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      const _params = params[0]
      const date = new Date(_params.name)
      return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()} : ${_params.value[1]}`
    },
    axisPointer: {
      animation: false,
    },
  },
  toolbox: {
    show: true,
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
  xAxis: {
    type: 'time',
    splitLine: {
      show: true,
    },
  },
  yAxis: {
    type: 'value',
    boundaryGap: [0, '100%'],
    max: 100,
    min: 0,
    splitLine: {
      show: false,
    },
  },
  series: [{
    name: 'pm25',
    type: 'line',
    data: pm25,
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
    name: 'co',
    type: 'line',
    data: co,
    markPoint: {
      data: [
        { type: 'max', name: 'Max' },
        { type: 'min', name: 'Min' },
      ],
    },
    markLine: {
      data: [{ type: 'average', name: 'Avg' }],
    },
  }],
})

const tempData = <any>[]
const humidityData = <any>[]
const pm25Data = <any>[]
const coData = <any>[]
const flightPathPointData = <any>[]

export const organizeData = (data: any): Array<EChartsOption> => {
  const pm25 = data.pm25
  const no2 = data.no2
  const so2 = data.so2
  const co = data.co
  const o3 = data.o3
  const pm100 = data.pm100
  const temperature = data.temperature
  const humidity = data.humidity
  const dataTime = data.time
  const coords = data.coords

  tempData.push(create2DData(temperature, dataTime))
  humidityData.push(create2DData(humidity, dataTime))
  pm25Data.push(create2DData(pm25, dataTime))
  coData.push(create2DData(co, dataTime))
  flightPathPointData.push(createFlightPointsData(coords, pm25))

  return [
    getRadarOption([pm25, pm100, o3, co, so2, no2]),
    get2DOption(tempData, humidityData),
    getFlightData3D(flightPathPointData),
    getAirOption(pm25Data, coData),
  ]
}
