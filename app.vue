<script setup lang="ts">
import User from "./class/User"

const colorMode = useColorMode()
// onMounted(() => {
//   colorMode.preference = localStorage.getItem("color-mode") || "system"
// })

const title = computed(() => {
  return useTitle().state
})

useHead({
  title: title,
})
</script>

<template>
  <NavBar />
  <!-- <main> -->
  <NuxtPage />
  <!-- </main> -->
</template>
