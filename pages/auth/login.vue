<script setup lang="ts">
definePageMeta({
  middleware: ["guest"],
})
</script>
<template>
  <main class="min-h-screen grid place-content-center">
    <FormLogin />
  </main>
</template>
