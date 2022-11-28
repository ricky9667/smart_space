<script lang="ts" setup>
const toggleDrawer = () => {
  const drawer = document.querySelector('.nav-links')
  drawer?.classList.toggle('active')
}
</script>

<template>
  <div h-12 md:h-20 lg:h-28 flex flex-row justify-between items-center gap-2 lg:gap-4 mx-0 class="header">
    <button mx-4 md:mx-8 class="hamburger" :onclick="toggleDrawer">
      <div class="bar" />
    </button>

    <div flex flex-row items-center gap-2>
      <img w-8 md:w-12 lg:w-16 src="../assets/logo.png" alt="Logo">
      <h1 text-white text-xl md:text-3xl font-bold>
        超級智慧潛水
      </h1>
    </div>

    <div w-16 />
  </div>
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
</style>
