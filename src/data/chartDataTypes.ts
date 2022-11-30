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
  depth: number
  time: Date
}

export interface WindData {
  direction: number
  speed: number
}
