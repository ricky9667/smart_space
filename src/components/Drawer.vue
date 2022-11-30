<script lang="ts" setup>
interface Props {
  open: boolean
}

interface ChartDrawerItem {
  id: string
  name: string
}

const props = defineProps<Props>()

const drawer = ref({} as HTMLElement)

const toggleDrawer = () => {
  drawer.value.classList.toggle('active')
}

const reloadPage = () => {
  location.reload()
}

watch(
  () => props.open,
  (isDrawerOpen) => {
    if (isDrawerOpen)
      drawer.value.classList.add('active')
    else
      drawer.value.classList.remove('active')
  },
)
</script>

<template>
  <div ref="drawer" class="drawer">
    <img w-20 md:w-28 lg:w-40 mx-auto my-4 md:my-8 src="../assets/login.png" alt="Login">
    <ul text-base md:text-xl font-600 md:font-900 class="drawer-list">
      <li :onclick="reloadPage">
        <img w-8 md:w-10 src="../assets/home.png" alt="Home">
        <div>首頁</div>
      </li>
      <li :onclick="toggleDrawer">
        <img w-8 md:w-10 src="../assets/dark.png" alt="Dark Mode">
        <div>深色主題</div>
      </li>
      <a href="#uv-chart" :onclick="toggleDrawer">
        <li>
          <img w-8 md:w-10 src="../assets/chart.png" alt="紫外線指數">
          <div>紫外線指數</div>
        </li>
      </a>
      <a href="#temperature-chart" :onclick="toggleDrawer">
        <li>
          <img w-8 md:w-10 src="../assets/chart.png" alt="氣溫與水溫">
          <div>氣溫與水溫</div>
        </li>
      </a>
      <a href="#ocean-depth-chart" :onclick="toggleDrawer">
        <li>
          <img w-8 md:w-10 src="../assets/chart.png" alt="水下深度">
          <div>水下深度</div>
        </li>
      </a>
      <a href="#wind-chart" :onclick="toggleDrawer">
        <li>
          <img w-8 md:w-10 src="../assets/chart.png" alt="風向與風速">
          <div>風向與風速</div>
        </li>
      </a>
    </ul>
  </div>
</template>

<style lang="scss">
.drawer {
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

.drawer.active {
  left: 0;
}

.drawer-list li {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: .4rem;
  cursor: pointer;
  padding: .2rem 0 .2rem 2rem;
}
</style>
