<template>
  <Navbar />
  <div lg:min-h-28 md:min-h-20 min-h-12 />
  <main font-sans h-full max-h-full text="center gray-700">
    <router-view v-slot="{ Component }">
      <keep-alive :include="['drone']">
        <component :is="Component" :key="$route.fullPath" />
      </keep-alive>
    </router-view>
  </main>
</template>
