<script setup lang="ts">
import User from "./class/User"

const colorMode = useColorMode()
// onMounted(() => {
//   colorMode.preference = localStorage.getItem("color-mode") || "system"
// })
</script>

<template>
  <NavBar />
  <NuxtPage class="pt-14" />
</template>
