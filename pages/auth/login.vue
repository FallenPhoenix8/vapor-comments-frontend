<script setup lang="ts">
definePageMeta({
  middleware: ["guest"],
})

useTitle().setPageTitle("Vapor Comments | Login")
</script>
<template>
  <main class="min-h-screen grid place-content-center">
    <FormLogin />
  </main>
</template>
