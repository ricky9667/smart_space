<script lang="ts" setup>
import {
  MapboxDrawControl,
  MapboxFullscreenControl,
  MapboxGeogeometryPolygon,
  MapboxGeolocateControl,
  MapboxMap,
  MapboxNavigationControl,
  MapboxScaleControl,
} from 'vue-mapbox-ts'
import { accessT } from '~/config/mapBox'
import { flightPathPointData } from '~/data'

const defaultMapViewCenterPointLonLat = [121.5742689, 22.0505738]
const defaultMapViewZoom = 14
const defaultMapStyle = 'outdoors-v12'

const polygons = $computed((): [number, number][][] => {
  return [flightPathPointData.value.toArray().map((point) => {
    return [point.longitude, point.latitude]
  })]
})
</script>

<template>
  <MapboxMap
    :access-token="accessT" :center="defaultMapViewCenterPointLonLat" :zoom="defaultMapViewZoom" h-full
    :map-style="defaultMapStyle" w-full
  >
    <MapboxNavigationControl />
    <MapboxGeolocateControl />
    <MapboxScaleControl />
    <MapboxFullscreenControl />
    <MapboxDrawControl />
    <MapboxGeogeometryPolygon
      v-for="(path, i) in polygons" :key="i" :antialias="true" :path="path"
      fill-color="#ff0000"
    />
  </MapboxMap>
</template>
