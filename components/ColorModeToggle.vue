<script setup lang="ts">
import { useTemplateRef } from "vue"
import { animate } from "motion"
const mounted = ref(false)

const colorMode = useColorMode()

const mainPath = useTemplateRef("main-path")
const sunRays = useTemplateRef("sun-rays")

const sunPath =
  "M238 332.667C290.283 332.667 332.667 290.283 332.667 238C332.667 185.717 290.283 143.333 238 143.333C185.717 143.333 143.333 185.717 143.333 238C143.333 290.283 185.717 332.667 238 332.667Z"

const moonPath =
  "M238 332.667C290.283 332.667 332.667 290.283 332.667 238C233.343 277.183 187.019 238.427 238 143.333C185.717 143.333 143.333 185.717 143.333 238C143.333 290.283 185.717 332.667 238 332.667Z"

const raysVariants = {
  hidden: {
    strokeOpacity: 0,
    transition: {
      staggerChildren: 0.25,
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

onMounted(() => {
  mounted.value = true
})

watch(mainPath, () => {
  animateMainMainPathChange(mainPath.value)
})

watch(sunRays, () => {
  if (sunRays.value) {
    animateRays()
  }
})

watch(colorMode, () => {
  if (mainPath) {
    animateMainMainPathChange(mainPath.value)
  }
  if (sunRays) {
    animateRays()
  }
})

function animateMainMainPathChange(mainPath: SVGPathElement) {
  animate(
    mainPath,
    colorMode.value === "dark"
      ? {
          fillOpacity: 0.35,
          strokeOpacity: 1,
          rotate: 0,
          stroke: "var(--color-yellow-600)",
          fill: "var(--color-yellow-600)",
          rotate: 360,
          scale: 1,
        }
      : {
          fillOpacity: 0.35,
          strokeOpacity: 1,
          rotate: 0,
          stroke: "var(--color-blue-400)",
          fill: "var(--color-blue-400)",
          scale: 2,
        }
  )
}

function changeColorMode() {
  colorMode.preference = colorMode.value === "dark" ? "light" : "dark"
  // localStorage.setItem("color-mode", colorMode.value)
}

function animateRays() {
  animate(
    sunRays.value,
    colorMode.value === "dark" ? raysVariants.visible : raysVariants.hidden
  )

  const rays = sunRays.value.querySelectorAll("path")

  for (const ray of rays) {
    animate(
      ray,
      colorMode.value === "dark" ? rayVariant.visible : rayVariant.hidden
    )
  }
}
</script>

<template>
  <ClientOnly>
    <button
      class="p-1 dark:bg-secondary/10 bg-secondary-darker rounded-base md:static fixed top-4 left-4 z-50 cursor-pointer"
      @click="changeColorMode"
    >
      <svg
        viewBox="0 0 476 476"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        class="w-7 h-7 stroke-[6]"
        v-if="mounted"
        :alt="
          'Change to ' + colorMode.value === 'dark' ? 'Light mode' : 'Dark mode'
        "
      >
        <Transition
          :css="false"
          @appear="
            (el, done) => {
              animate(el, { fillOpacity: 0, strokeOpacity: 0 })
              done()
            }
          "
        >
          <path
            :d="colorMode.value === 'dark' ? sunPath : moonPath"
            class="circle-main"
            ref="main-path"
          />
        </Transition>
        <Transition :css="false">
          <g class="sun-rays stroke-[6] stroke-yellow-600" ref="sun-rays">
            <path d="M238 1.33333V48.6667" />
            <path d="M238 427.333V474.667" />
            <path d="M70.6767 70.6767L104.047 104.047" />
            <path d="M371.953 371.953L405.323 405.323" />
            <path d="M1.33333 238H48.6667" />
            <path d="M427.333 238H474.667" />
            <path d="M104.047 371.953L70.6767 405.323" />
            <path d="M405.323 70.6767L371.953 104.047" />
          </g>
        </Transition>
      </svg>
    </button>
  </ClientOnly>
</template>
