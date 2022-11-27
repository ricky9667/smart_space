<script lang="ts" setup>
</script>

<template>
  <header h-12 md:h-20 lg:h-28 w-screen flex flex-row justify-center items-center gap-2 lg:gap-4 class="header">
    <img w-8 md:w-12 lg:w-16 src="./assets/logo.png">
    <h1 text-white text-xl md:text-3xl font-bold>
      超級智慧潛水
    </h1>
  </header>
  <main font-sans h-full p="x-4 y-4" text="center gray-700">
    <router-view />
  </main>
</template>

<style scoped lang="scss">
.header {
  background-color: #303030;
}
</style>
