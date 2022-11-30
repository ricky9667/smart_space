<script lang="ts" setup>
interface Props {
  open: boolean
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
    <img alt="Login" lg:w-40 md:my-8 md:w-28 mx-auto my-4 src="../assets/login.png" w-20>
    <ul class="drawer-list" font-600 md:font-900 md:text-xl text-base>
      <li @click.prevent.stop="reloadPage">
        <img alt="Home" md:w-10 src="../assets/home.png" w-8>
        <div>首頁</div>
      </li>
      <li @click.prevent.stop="toggleDrawer">
        <img alt="Dark Mode" md:w-10 src="../assets/dark.png" w-8>
        <div>深色主題</div>
      </li>
      <a href="#uv-chart" @click="toggleDrawer">
        <li>
          <img alt="紫外線指數" md:w-10 src="../assets/chart.png" w-8>
          <div>紫外線指數</div>
        </li>
      </a>
      <a href="#temperature-chart" @click="toggleDrawer">
        <li>
          <img alt="氣溫與水溫" md:w-10 src="../assets/chart.png" w-8>
          <div>氣溫與水溫</div>
        </li>
      </a>
      <a href="#ocean-depth-chart" @click="toggleDrawer">
        <li>
          <img alt="水下深度" md:w-10 src="../assets/chart.png" w-8>
          <div>水下深度</div>
        </li>
      </a>
      <a href="#wind-chart" @click="toggleDrawer">
        <li>
          <img alt="風向與風速" md:w-10 src="../assets/chart.png" w-8>
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
