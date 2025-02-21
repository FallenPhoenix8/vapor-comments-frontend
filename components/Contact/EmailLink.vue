<script setup lang="ts">
const email = useRuntimeConfig().public.contactEmail

function isValidEmail(email: string) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return re.test(email)
}

if (!isValidEmail(email) || !email) {
  throw new Error(
    "Invalid email address. Please provide correct CONTACT_EMAIL as an environment variable."
  )
}
</script>
<template>
  <a
    href="mailto:{{ email }}"
    target="_blank"
    class="no-underline rounded-base gradient primary p-2"
    >Send us an email!</a
  >
</template>
