<script setup lang="ts">
import { motion } from "motion-v"
const colorMode = useColorMode()

const sunPath =
  "M238 332.667C290.283 332.667 332.667 290.283 332.667 238C332.667 185.717 290.283 143.333 238 143.333C185.717 143.333 143.333 185.717 143.333 238C143.333 290.283 185.717 332.667 238 332.667Z"

const moonPath =
  "M238 332.667C290.283 332.667 332.667 290.283 332.667 238C233.343 277.183 187.019 238.427 238 143.333C185.717 143.333 143.333 185.717 143.333 238C143.333 290.283 185.717 332.667 238 332.667Z"

const rayVariants = {
  hidden: {
    strokeOpacity: 0,
    transition: {
      staggerChildren: 0.05,
      staggerDirection: -1,
    },
  },
  visible: {
    strokeOpacity: 1,
    transition: {
      staggerChildren: 0.05,
    },
  },
}

const rayVariant = {
  hidden: {
    pathLength: 0,
    opacity: 0,
    scale: 0,
  },
  visible: {
    pathLength: 1,
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: "easeOut",
      pathLength: {
        duration: 0.3,
      },
      opacity: {
        duration: 0.2,
      },
      scale: {
        duration: 0.3,
      },
    },
  },
}

function changeColorMode() {
  colorMode.preference = colorMode.value === "dark" ? "light" : "dark"
  // localStorage.setItem("color-mode", colorMode.value)
}
</script>
<template>
  <motion.button
    @click="changeColorMode"
    class="p-1 dark:bg-secondary/10 bg-secondary-darker rounded-base md:static fixed top-4 left-4 z-50 cursor-pointer"
  >
    <motion.svg
      viewBox="0 0 476 476"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      class="w-7 h-7 stroke-[6]"
    >
      <motion.path
        :initial="{ fillOpacity: 0, strokeOpacity: 0 }"
        :animate="
          colorMode.value === 'dark'
            ? {
                fillOpacity: 0.35,
                strokeOpacity: 1,
                rotate: 360,
                stroke: 'var(--color-yellow-600)',
                fill: 'var(--color-yellow-600)',
                d: sunPath,
              }
            : {
                fillOpacity: 0.35,
                strokeOpacity: 1,
                rotate: 0,
                scale: 2,
                stroke: 'var(--color-blue-400)',
                fill: 'var(--color-blue-400)',
                d: moonPath,
              }
        "
        :d="sunPath"
      />

      <motion.g
        class="sun-rays stroke-[6] stroke-yellow-600"
        :variants="rayVariants"
        initial="hidden"
        :animate="colorMode.value === 'dark' ? 'visible' : 'hidden'"
      >
        <path d="M238 1.33333V48.6667" :variants="rayVariant" />
        <path d="M238 427.333V474.667" :variants="rayVariant" />
        <path d="M70.6767 70.6767L104.047 104.047" :variants="rayVariant" />
        <path d="M371.953 371.953L405.323 405.323" :variants="rayVariant" />
        <path d="M1.33333 238H48.6667" :variants="rayVariant" />
        <path d="M427.333 238H474.667" :variants="rayVariant" />
        <path d="M104.047 371.953L70.6767 405.323" :variants="rayVariant" />
        <path d="M405.323 70.6767L371.953 104.047" :variants="rayVariant" />
      </motion.g>
    </motion.svg>
  </motion.button>
</template>
<style scoped>
*:focus {
  outline: transparent;
}
</style>
