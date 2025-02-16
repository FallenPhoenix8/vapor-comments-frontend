<script setup lang="ts">
const route = useRoute()
</script>

<template>
  <div>
    <h1 class="text-red-500">Nuxt Routing set up successfully!</h1>
    <p>
      API_URL:
      <a :href="useRuntimeConfig().public.apiUrl">{{
        useRuntimeConfig().public.apiUrl
      }}</a>
    </p>
    <p>Current route: {{ route.path }}</p>
    <a href="https://nuxt.com/docs/getting-started/routing" target="_blank"
      >Learn more about Nuxt Routing</a
    >
    <TestMotion />

    <h1>Heading 1</h1>
    <h2>Heading 2</h2>
    <h3>Heading 3</h3>
  </div>
</template>
