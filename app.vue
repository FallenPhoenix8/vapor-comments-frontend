<script setup lang="ts">
const colorMode = useColorMode()

// onMounted(() => {
//   colorMode.preference = localStorage.getItem("color-mode") || "system"
// })
</script>

<template>
  <NavBar />
  <NuxtPage />
</template>
