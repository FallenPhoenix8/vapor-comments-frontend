<script setup lang="ts">
const colorMode = useColorMode()

watch(colorMode, (mode) => {
  console.log("Color mode changed to:", mode.value)
})
</script>

<template>
  <NavBar />
  <NuxtPage />
</template>
