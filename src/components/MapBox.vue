<script lang="ts" setup>
import {
  MapboxFullscreenControl,
  MapboxGeolocateControl,
  MapboxMap,
  MapboxNavigationControl,
  MapboxScaleControl,
} from 'vue-mapbox-ts'
import { accessT } from '~/config/mapBox'
</script>

<template>
  <MapboxMap ref="theMap" :access-token="accessT" h-full w-full>
    <MapboxNavigationControl />
    <MapboxGeolocateControl />
    <MapboxScaleControl />
    <MapboxFullscreenControl />
  </MapboxMap>
</template>
