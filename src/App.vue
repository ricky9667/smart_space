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
  <header h-12 md:h-20 lg:h-28 flex flex-row justify-between items-center gap-2 lg:gap-4 mx-0 class="header">
    <button mx-8 class="hamburger" :onclick="toggleDrawer">
      <div class="bar" />
    </button>

    <div flex flex-row items-center gap-2>
      <img w-8 md:w-12 lg:w-16 src="./assets/logo.png">
      <h1 text-white text-xl md:text-3xl font-bold>
        超級智慧潛水
      </h1>
    </div>

    <div />
  </header>

  <nav class="nav-links">
    <img w-20 md:w-28 lg:w-40 mx-auto my-4 md:my-8 src="./assets/login.png">
    <ul text-base md:text-xl font-600 md:font-900 class="nav-list">
      <li :onclick="onHomeClick">
        <img w-8 md:w-10 src="./assets/home.png">
        <div>首頁</div>
      </li>
      <li :onclick="toggleDrawer">
        <img w-8 md:w-10 src="./assets/dark.png">
        <div>深色主題</div>
      </li>
      <li :onclick="() => scrollToElement('uv-chart')">
        <img w-8 md:w-10 src="./assets/chart.png">
        <div>紫外線指數</div>
      </li>
      <li :onclick="() => scrollToElement('temperature-chart')">
        <img w-8 md:w-10 src="./assets/chart.png">
        <div>氣溫與水溫</div>
      </li>
      <li :onclick="() => scrollToElement('ocean-depth-chart')">
        <img w-8 md:w-10 src="./assets/chart.png">
        <div>水下深度</div>
      </li>
      <li :onclick="() => scrollToElement('wind-chart')">
        <img w-8 md:w-10 src="./assets/chart.png">
        <div>風向與風速</div>
      </li>
    </ul>
  </nav>

  <main font-sans h-full p="x-4 y-4" text="center gray-700">
    <router-view />
  </main>
</template>

<style scoped lang="scss">
.header {
  background-color: #303030;
}

.hamburger {
  position: relative;
  display: block;
  width: 35px;
  cursor: pointer;

  appearance: none;
  background: none;
  outline: none;
  border: none;
}

.hamburger .bar, .hamburger:after, .hamburger:before {
  content: '';
  display: block;
  width: 100%;
  height: 3px;
  background-color: #fff;
  margin: 6px 0px;
  transition: 0.4s;
}

.hamburger.active:before {
  transform: rotate(-45deg) translate(-8px, 6px);
}
.hamburger.active:after {
  transform: rotate(45deg) translate(-9px, -8px);
}

.hamburger.active .bar {
  opacity: 0;
}

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
