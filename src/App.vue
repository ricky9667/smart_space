<script lang="ts" setup>
const toggleDrawer = () => {
  const drawer = document.querySelector('.nav-links')
  drawer?.classList.toggle('active')
}

const reloadPage = () => {
  location.reload()
}

const scrollToElement = (id: string) => {
  const drawer = document.querySelector('.nav-links')
  drawer?.classList.toggle('active')

  document.getElementById(id)?.scrollIntoView()
}
</script>

<template>
  <Navbar />
  <nav class="nav-links">
    <img w-20 md:w-28 lg:w-40 mx-auto my-4 md:my-8 src="./assets/login.png" alt="Login">
    <ul text-base md:text-xl font-600 md:font-900 class="nav-list">
      <li :onclick="reloadPage">
        <img w-8 md:w-10 src="./assets/home.png" alt="Home">
        <div>首頁</div>
      </li>
      <li :onclick="toggleDrawer">
        <img w-8 md:w-10 src="./assets/dark.png" alt="Dark Mode">
        <div>深色主題</div>
      </li>
      <li :onclick="() => scrollToElement('uv-chart')">
        <img w-8 md:w-10 src="./assets/chart.png" alt="UV Chart">
        <div>紫外線指數</div>
      </li>
      <li :onclick="() => scrollToElement('temperature-chart')">
        <img w-8 md:w-10 src="./assets/chart.png" alt="Temperature Chart">
        <div>氣溫與水溫</div>
      </li>
      <li :onclick="() => scrollToElement('ocean-depth-chart')">
        <img w-8 md:w-10 src="./assets/chart.png" alt="Ocean Depth Chart">
        <div>水下深度</div>
      </li>
      <li :onclick="() => scrollToElement('wind-chart')">
        <img w-8 md:w-10 src="./assets/chart.png" alt="Wind Chart">
        <div>風向與風速</div>
      </li>
    </ul>
  </nav>

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
