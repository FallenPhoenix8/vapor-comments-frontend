<script setup lang="ts">
definePageMeta({
  middleware: ["guest"],
})

useTitle().setPageTitle("Vapor Comments | Register")
</script>
<template>
  <main class="min-h-screen grid place-content-center">
    <FormRegister />
  </main>
</template>
