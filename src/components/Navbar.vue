<script lang="ts" setup>
let isDrawerOpen = $ref(false)

const toggleDrawer = () => {
  isDrawerOpen = !isDrawerOpen
}
</script>

<template>
  <div h-12 md:h-20 lg:h-28 flex flex-row justify-between items-center gap-2 lg:gap-4 mx-0 class="header">
    <button mx-4 md:mx-8 class="hamburger" @click="toggleDrawer" />

    <div flex flex-row items-center gap-2>
      <img w-8 md:w-12 lg:w-16 src="../assets/logo.png" alt="Logo">
      <h1 text-white text-xl md:text-3xl font-bold>
        超級智慧潛水
      </h1>
    </div>

    <div w-16 />
  </div>

  <Drawer :open="isDrawerOpen" />
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
