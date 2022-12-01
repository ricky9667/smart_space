export interface FlightPathPointData {
  latitude: number
  longitude: number
}

export interface UltraVioletData {
  amount: number
  time: Date
}

export interface TemperatureData {
  air: number
  water: number
  time: Date
}

export interface WaterDepthData {
  value: number
  time: Date
}

export interface WindData {
  direction: number
  speed: number
}

export interface ChartData {
  coordinate?: Readonly<FlightPathPointData>
  ultraviolet?: Readonly<UltraVioletData>
  temperature?: Readonly<TemperatureData>
  water_depth?: Readonly<WaterDepthData>
  wind?: Readonly<WindData>
}
