<script lang="ts" setup>
</script>

<template>
  <Navbar />

  <main font-sans h-full p="x-4 y-4" text="center gray-700">
    <router-view />
  </main>
</template>

<style scoped lang="scss">
.nav-links {
  display: block;
  position: fixed;
  top: 0;
  left: -24rem;
  width: 24rem;
  min-height: 100vh;
  z-index: 99;
  background-color: #c1e7ff;
  transition: .4s
}

.nav-links.active {
  left: 0;
}

.nav-list li {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: .4rem;
  cursor: pointer;
  padding: .2rem 0 .2rem 2rem;
}
</style>
