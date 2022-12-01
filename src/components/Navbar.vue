<script lang="ts" setup>
let isDrawerOpen = $ref(false)

const router = useRouter()
const currentRoute = $computed(() => router.currentRoute.value.path)

const droneMapNavigatorImgUrl = $computed(() => {
  if (currentRoute === '/drone')
    return 'https://i.imgur.com/Vdj11Fq.webp'
  else
    return 'https://i.imgur.com/bmeql98.webp'
})

let droneMapNavigatorDestination = $ref('')
const decideDroneMapNavigatorDestination = async () => {
  await router.isReady()
  droneMapNavigatorDestination = currentRoute === '/' ? '/drone' : '/'
}

const toggleDrawer = () => {
  isDrawerOpen = !isDrawerOpen
}

tryOnMounted(() => {
  decideDroneMapNavigatorDestination()
})
</script>

<template>
  <div
    class="header" fixed flex flex-row gap-2 h-12 items-center justify-between lg:gap-4 lg:h-28 md:h-20 mx-0 w-screen
    z-10
  >
    <button class="hamburger" md:mx-8 mx-4 @click="toggleDrawer" />

    <div flex flex-row gap-2 items-center>
      <img alt="Logo" lg:w-16 md:w-12 src="../assets/logo.png" w-8>
      <h1 font-bold md:text-3xl text-white text-xl>
        超級智慧潛水
      </h1>
    </div>

    <router-link :to="droneMapNavigatorDestination" h-full max-h-full relative>
      <img
        alt="" h-full max-h-full md:p-4 p-1 relative
        :src="droneMapNavigatorImgUrl" @click="decideDroneMapNavigatorDestination"
      >
    </router-link>
  </div>

  <div h-12 lg:h-28 md:h-20 />

  <Drawer :open="isDrawerOpen" :toggle-drawer="toggleDrawer" />
</template>

<style lang="scss" scoped>
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

  & .bar, &:after, &:before {
    content: '';
    display: block;
    width: 100%;
    height: 3px;
    background-color: #fff;
    margin: 6px 0;
    transition: 0.4s;
  }

  &.active {
    .bar {
      opacity: 0;
    }

    &:before {
      transform: rotate(-45deg) translate(-8px, 6px);
    }

    &:after {
      transform: rotate(45deg) translate(-9px, -8px);
    }
  }
}

.drawer.active {
  left: 0;
}
</style>
